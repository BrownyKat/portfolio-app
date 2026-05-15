import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/atoms/Badge";
import { formatDate } from "@/lib/format";
import type { Project } from "@/lib/types";

export function ProjectCard({ project }: { project: Project }) {
  const titleId = `project-${project.slug}-title`;
  const descriptionId = `project-${project.slug}-description`;

  return (
    <Link
      href={`/work/${project.slug}`}
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
      className="arcane-card group block aspect-square overflow-hidden rounded-lg transition duration-300 hover:-translate-y-1 hover:border-[#48e2ff]/60 hover:shadow-[0_24px_70px_rgba(72,226,255,0.12)]"
    >
      <article className="relative flex h-full flex-col justify-between">
        {project.imageSrc ? (
          <Image
            src={project.imageSrc}
            alt={project.imageAlt ?? `${project.title} screenshot`}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover object-top opacity-40 transition duration-500 group-hover:scale-105 group-hover:opacity-56"
          />
        ) : (
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(72,226,255,0.18)_0_1px,transparent_1px_24px)] opacity-60" />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-[#071018]/40 via-[#071018]/76 to-[#071018]/96" />
        <div className="relative z-10 flex items-start justify-between gap-3 p-5">
          <Badge tone="accent">{project.category}</Badge>
          <time dateTime={project.completionDate} className="text-xs font-medium text-[#c5d6e2]">
            {project.dateLabel ?? formatDate(project.completionDate)}
          </time>
        </div>
        <div className="relative z-10 p-5 pt-0">
          <h3
            id={titleId}
            className="text-xl font-black leading-tight text-[#f5fbff]"
          >
            {project.title}
          </h3>
          <p
            id={descriptionId}
            className="mt-3 line-clamp-3 text-sm leading-6 text-[#c8d7e2]"
          >
            {project.description}
          </p>
          <div className="mt-4 flex items-center justify-between gap-3 border-t border-[#48e2ff]/18 pt-4">
            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#89a6b8]">
              {project.status ?? "View details"}
            </span>
            <span className="text-sm font-semibold text-[#9ff0ff] transition group-hover:text-[#b8ff6a]">
              Open
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
