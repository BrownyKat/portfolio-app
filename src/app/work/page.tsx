import type { Metadata } from "next";
import { WorkGallery } from "@/components/sections/WorkGallery";
import { getProjectFilters, getProjects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Work",
  description:
    "A filterable gallery of compact project cards with detailed project pages for contributions, tools, evidence, and status.",
};

export default function WorkPage() {
  const projects = getProjects();
  const { categories } = getProjectFilters(projects);

  return (
    <main className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
      <header className="mb-10 max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#48e2ff]">
          Work
        </p>
        <h1 className="mt-3 text-4xl font-black leading-tight text-[#f5fbff] sm:text-5xl">
          Systems, pages, and shipped interfaces.
        </h1>
        <p className="mt-4 text-lg leading-8 text-[#b8c8d6]">
          A focused gallery of compact project previews. Open any card for the
          complete project idea, task involvement, evidence, and tools.
        </p>
      </header>
      <WorkGallery
        projects={projects}
        categories={categories}
      />
    </main>
  );
}
