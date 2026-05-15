import type { Project } from "@/lib/types";

export function filterProjects(
  projects: Project[],
  activeFilter: string,
): Project[] {
  if (activeFilter === "All") {
    return projects;
  }

  return projects.filter(
    (project) =>
      project.category === activeFilter || project.techStack.includes(activeFilter),
  );
}
