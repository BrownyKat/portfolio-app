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
      <h2 className="text-sm font-black uppercase tracking-[0.18em] text-[#47d7c4]">
        {title}
      </h2>
      <ul className="mt-4 space-y-3 text-sm leading-7 text-[#e4f1eb]">
        {items.map((item) => (
          <li key={item} className="flex gap-3">
            <span className="mt-2.5 h-2 w-2 shrink-0 rounded-full bg-[#47d7c4] shadow-[0_0_14px_rgba(71,215,196,0.7)]" />
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
      <h2 className="text-sm font-black uppercase tracking-[0.18em] text-[#47d7c4]">
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
              className="inline-flex min-h-11 items-center rounded-full border border-[#47d7c4]/28 bg-[#47d7c4]/9 px-4 py-2 text-sm font-semibold text-[#d8f8ff] transition hover:border-[#47d7c4]/70 hover:text-white"
            >
              {item.label}
            </Link>
          ) : (
            <span
              key={item.label}
              className="inline-flex min-h-11 items-center rounded-full border border-[#93b8b1]/22 bg-white/[0.045] px-4 py-2 text-sm font-semibold text-[#d6e7df]"
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
        className="inline-flex min-h-11 items-center text-sm font-semibold text-[#9df3e7] transition hover:text-[#ffd166]"
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
                className="text-sm font-semibold text-[#93b8b1]"
              >
                {project.dateLabel ?? formatDate(project.completionDate)}
              </time>
            </div>
            <div>
              <h1 className="section-title text-[#fff7ec]">
                {project.title}
              </h1>
              <p className="mt-4 max-w-3xl text-xl font-semibold leading-9 text-[#c8ded7]">
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
                <div className="absolute inset-0 bg-gradient-to-t from-[#102b2f]/38 to-transparent" />
              </div>
            </div>
          ) : null}

          <section className="arcane-card rounded-lg p-5">
            <h2 className="text-sm font-black uppercase tracking-[0.18em] text-[#ffb199]">
              Impact
            </h2>
            <p className="mt-3 text-lg font-semibold leading-8 text-[#e4f1eb]">
              {project.impact}
            </p>
          </section>

          <DetailList title="Detailed Task Involvement" items={project.keyContributions} />
          <DetailList title="Tools and Technologies" items={project.tools ?? project.techStack} />
          <EvidencePanel project={project} />
        </div>

        <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          <section className="arcane-card rounded-lg p-5">
            <h2 className="text-sm font-black uppercase tracking-[0.18em] text-[#47d7c4]">
              Project Summary
            </h2>
            <dl className="mt-4 space-y-4 text-sm">
              <div>
                <dt className="text-[#93b8b1]">Name</dt>
                <dd className="mt-1 font-semibold text-[#fff7ec]">
                  Embuido, Franz Joseph M.
                </dd>
              </div>
              <div>
                <dt className="text-[#93b8b1]">Status</dt>
                <dd className="mt-1 font-semibold text-[#fff7ec]">
                  {project.status ?? "Documented"}
                </dd>
              </div>
              {project.collaborators?.length ? (
                <div>
                  <dt className="text-[#93b8b1]">Collaborators</dt>
                  <dd className="mt-1 font-semibold text-[#fff7ec]">
                    {project.collaborators.join(", ")}
                  </dd>
                </div>
              ) : null}
            </dl>
          </section>

          <section className="arcane-card rounded-lg p-5">
            <h2 className="text-sm font-black uppercase tracking-[0.18em] text-[#47d7c4]">
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
