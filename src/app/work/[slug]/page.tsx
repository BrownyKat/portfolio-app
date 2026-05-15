import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Badge } from "@/components/atoms/Badge";
import { formatDate } from "@/lib/format";
import { getProjectBySlug, getProjectSlugs } from "@/lib/projects";
import type { Project } from "@/lib/types";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

function DetailList({
  title,
  items,
}: {
  title: string;
  items?: string[];
}) {
  if (!items?.length) {
    return null;
  }

  return (
    <section className="arcane-card rounded-lg p-5">
      <h2 className="text-sm font-black uppercase tracking-[0.18em] text-[#48e2ff]">
        {title}
      </h2>
      <ul className="mt-4 space-y-3 text-sm leading-7 text-[#d8e8f2]">
        {items.map((item) => (
          <li key={item} className="flex gap-3">
            <span className="mt-2.5 h-2 w-2 shrink-0 rounded-full bg-[#48e2ff] shadow-[0_0_14px_rgba(72,226,255,0.7)]" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function EvidencePanel({ project }: { project: Project }) {
  if (!project.evidence?.length) {
    return null;
  }

  return (
    <section className="arcane-card rounded-lg p-5">
      <h2 className="text-sm font-black uppercase tracking-[0.18em] text-[#48e2ff]">
        Evidence of Work
      </h2>
      <div className="mt-4 flex flex-wrap gap-2">
        {project.evidence.map((item) =>
          item.url ? (
            <Link
              key={`${item.label}-${item.url}`}
              href={item.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-11 items-center rounded-full border border-[#48e2ff]/28 bg-[#48e2ff]/9 px-4 py-2 text-sm font-semibold text-[#d8f8ff] transition hover:border-[#48e2ff]/70 hover:text-white"
            >
              {item.label}
            </Link>
          ) : (
            <span
              key={item.label}
              className="inline-flex min-h-11 items-center rounded-full border border-[#89a6b8]/22 bg-white/[0.045] px-4 py-2 text-sm font-semibold text-[#c9dae6]"
            >
              {item.label}
            </span>
          ),
        )}
      </div>
    </section>
  );
}

export function generateStaticParams() {
  return getProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;

  try {
    const project = getProjectBySlug(slug);

    return {
      title: project.title,
      description: project.description,
      openGraph: {
        title: project.title,
        description: project.description,
        type: "article",
      },
    };
  } catch {
    return {
      title: "Project not found",
    };
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const slugs = getProjectSlugs();

  if (!slugs.includes(slug)) {
    notFound();
  }

  const project = getProjectBySlug(slug);

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <Link
        href="/work"
        className="inline-flex min-h-11 items-center text-sm font-semibold text-[#9ff0ff] transition hover:text-[#b8ff6a]"
      >
        Back to work
      </Link>

      <article className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,1fr)_22rem]">
        <div className="space-y-8">
          <header className="space-y-5">
            <div className="flex flex-wrap items-center gap-3">
              <Badge tone="accent">{project.category}</Badge>
              <time
                dateTime={project.completionDate}
                className="text-sm font-semibold text-[#89a6b8]"
              >
                {project.dateLabel ?? formatDate(project.completionDate)}
              </time>
            </div>
            <div>
              <h1 className="text-4xl font-black leading-tight text-[#f5fbff] sm:text-5xl">
                {project.title}
              </h1>
              <p className="mt-4 max-w-3xl text-lg leading-8 text-[#b8c8d6]">
                {project.description}
              </p>
            </div>
          </header>

          {project.imageSrc ? (
            <div className="arcane-card overflow-hidden rounded-lg">
              <div className="relative aspect-[16/9]">
                <Image
                  src={project.imageSrc}
                  alt={project.imageAlt ?? `${project.title} screenshot`}
                  fill
                  priority
                  sizes="(min-width: 1024px) 66vw, 100vw"
                  className="object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071018]/38 to-transparent" />
              </div>
            </div>
          ) : null}

          <section className="arcane-card rounded-lg p-5">
            <h2 className="text-sm font-black uppercase tracking-[0.18em] text-[#ffb4ee]">
              Impact
            </h2>
            <p className="mt-3 text-base leading-8 text-[#d8e8f2]">
              {project.impact}
            </p>
          </section>

          <DetailList title="Detailed Task Involvement" items={project.keyContributions} />
          <DetailList title="Tools and Technologies" items={project.tools ?? project.techStack} />
          <EvidencePanel project={project} />
        </div>

        <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          <section className="arcane-card rounded-lg p-5">
            <h2 className="text-sm font-black uppercase tracking-[0.18em] text-[#48e2ff]">
              Project Summary
            </h2>
            <dl className="mt-4 space-y-4 text-sm">
              <div>
                <dt className="text-[#89a6b8]">Name</dt>
                <dd className="mt-1 font-semibold text-[#f5fbff]">
                  Embuido, Franz Joseph M.
                </dd>
              </div>
              <div>
                <dt className="text-[#89a6b8]">Status</dt>
                <dd className="mt-1 font-semibold text-[#f5fbff]">
                  {project.status ?? "Documented"}
                </dd>
              </div>
              {project.collaborators?.length ? (
                <div>
                  <dt className="text-[#89a6b8]">Collaborators</dt>
                  <dd className="mt-1 font-semibold text-[#f5fbff]">
                    {project.collaborators.join(", ")}
                  </dd>
                </div>
              ) : null}
            </dl>
          </section>

          <section className="arcane-card rounded-lg p-5">
            <h2 className="text-sm font-black uppercase tracking-[0.18em] text-[#48e2ff]">
              Stack
            </h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <Badge key={tech}>{tech}</Badge>
              ))}
            </div>
          </section>
        </aside>
      </article>
    </main>
  );
}
