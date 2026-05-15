import fs from "node:fs";
import path from "node:path";
import projectsData from "@/data/projects.json";
import type { Project, ProjectCategory } from "@/lib/types";

function assertValidDate(value: string, projectTitle: string) {
  if (Number.isNaN(new Date(value).getTime())) {
    throw new Error(`Invalid completion date for project: ${projectTitle}`);
  }
}

function assertValidCategory(value: unknown, projectTitle: string): ProjectCategory {
  if (typeof value !== "string" || !value.trim()) {
    throw new Error(`Invalid project category for project: ${projectTitle}`);
  }

  return value.trim();
}

function assertPublicAssetExists(src: string, projectTitle: string) {
  if (!src.startsWith("/")) {
    throw new Error(`Asset path must start with / for project: ${projectTitle}`);
  }

  const assetPath = path.join(process.cwd(), "public", src.replace(/^\//, ""));

  if (!fs.existsSync(assetPath) && process.env.NODE_ENV !== "production") {
    throw new Error(`Missing public asset for project: ${projectTitle} (${src})`);
  }
}

function assertValidEvidenceUrl(url: string, projectTitle: string) {
  try {
    const parsed = new URL(url);

    if (!["http:", "https:"].includes(parsed.protocol)) {
      throw new Error("Unsupported protocol");
    }
  } catch {
    throw new Error(`Invalid evidence URL for project: ${projectTitle}`);
  }
}

function mapProject(project: (typeof projectsData)[number]): Project {
  assertValidDate(project.completionDate, project.title);

  if (project.imageSrc) {
    assertPublicAssetExists(project.imageSrc, project.title);
  }

  project.completionProofs?.forEach((proof) => {
    assertPublicAssetExists(proof.src, project.title);
  });

  project.evidence?.forEach((item) => {
    if ("url" in item && typeof item.url === "string") {
      assertValidEvidenceUrl(item.url, project.title);
    }
  });

  return {
    ...project,
    category: assertValidCategory(project.category, project.title),
  };
}

const projects: Project[] = projectsData.map(mapProject);
const projectSlugs = new Set<string>();

projects.forEach((project) => {
  if (projectSlugs.has(project.slug)) {
    throw new Error(`Duplicate project slug: ${project.slug}`);
  }

  projectSlugs.add(project.slug);
});

export function getProjects(): Project[] {
  return [...projects].sort(
    (a, b) =>
      new Date(b.completionDate).getTime() -
      new Date(a.completionDate).getTime(),
  );
}

export function getFeaturedProjects(): Project[] {
  return getProjects().filter((project) => project.featured);
}

export function getProjectBySlug(slug: string): Project {
  const project = projects.find((entry) => entry.slug === slug);

  if (!project) {
    throw new Error(`Project not found: ${slug}`);
  }

  return project;
}

export function getProjectSlugs(): string[] {
  return projects.map((project) => project.slug);
}

export function getProjectFilters(projectList: Project[]) {
  const categories = Array.from(
    new Set(projectList.map((project) => project.category)),
  ).sort();
  const techStack = Array.from(
    new Set(projectList.flatMap((project) => project.techStack)),
  ).sort();

  return { categories, techStack };
}
