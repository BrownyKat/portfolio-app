"use client";

import { useMemo, useState } from "react";
import { ProjectCard } from "@/components/molecules/ProjectCard";
import { filterProjects } from "@/lib/filters";
import type { Project } from "@/lib/types";

interface WorkGalleryProps {
  projects: Project[];
  categories: string[];
}

export function WorkGallery({
  projects,
  categories,
}: WorkGalleryProps) {
  const [activeFilter, setActiveFilter] = useState("All");
  const filters = useMemo(
    () => Array.from(new Set(["All", ...categories])),
    [categories],
  );
  const filterCounts = useMemo(
    () =>
      filters.reduce<Record<string, number>>((counts, filter) => {
        counts[filter] =
          filter === "All"
            ? projects.length
            : projects.filter((project) => project.category === filter).length;
        return counts;
      }, {}),
    [filters, projects],
  );
  const filteredProjects = useMemo(
    () => filterProjects(projects, activeFilter),
    [activeFilter, projects],
  );

  return (
    <section aria-labelledby="work-gallery" className="space-y-8">
      <div className="space-y-4">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 id="work-gallery" className="text-2xl font-bold text-[#fff7ec]">
              Project Gallery
            </h2>
            <p className="mt-1 text-sm text-[#c8ded7]">
              Compact project squares. Open one to see the full task involvement,
              tools, status, and evidence.
            </p>
          </div>
          <p
            role="status"
            aria-live="polite"
            aria-atomic="true"
            className="text-sm font-semibold text-[#9df3e7]"
          >
            {filteredProjects.length} shown
          </p>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2" aria-label="Work filters">
          {filters.map((filter) => {
            const isActive = activeFilter === filter;

            return (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                aria-pressed={isActive}
                className={`min-h-11 shrink-0 rounded-full border px-4 text-sm font-semibold transition ${
                  isActive
                    ? "border-[#47d7c4]/60 bg-[#47d7c4]/14 text-[#9df3e7] shadow-[0_0_20px_rgba(71,215,196,0.14)]"
                    : "border-[#47d7c4]/22 bg-white/6 text-[#c8ded7] hover:border-[#47d7c4]/60 hover:text-[#fff7ec]"
                }`}
              >
                {filter}
                <span className="ml-2 rounded-full bg-white/10 px-2 py-0.5 text-[0.68rem]">
                  {filterCounts[filter]}
                </span>
              </button>
            );
          })}
        </div>
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filteredProjects.map((project) => (
          <div
            id={project.slug}
            key={project.slug}
            className="animate-rise scroll-mt-24"
          >
            <ProjectCard project={project} />
          </div>
        ))}
      </div>
    </section>
  );
}
