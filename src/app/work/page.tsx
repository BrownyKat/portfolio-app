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
        <p className="section-kicker uppercase tracking-[0.2em]">
          Work
        </p>
        <h1 className="section-title mt-3 text-[#fff7ec]">
          Systems, pages, and shipped interfaces.
        </h1>
        <p className="mt-4 text-xl font-semibold leading-9 text-[#c8ded7]">
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
