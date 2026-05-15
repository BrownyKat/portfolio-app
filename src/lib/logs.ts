import fs from "node:fs";
import path from "node:path";
import type { LogEntry, LogFrontMatter } from "@/lib/types";

const contentDirectory = path.join(process.cwd(), "content");

function parseList(value: string): string[] {
  return value
    .replace(/^\[/, "")
    .replace(/\]$/, "")
    .split(",")
    .map((item) => item.trim().replace(/^"|"$/g, ""))
    .filter(Boolean);
}

function parseFrontMatter(markdown: string): {
  frontMatter: LogFrontMatter;
  content: string;
} {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/.exec(markdown);

  if (!match) {
    throw new Error("Log entry is missing front matter.");
  }

  const raw = match[1].split(/\r?\n/);
  const data = Object.fromEntries(
    raw.map((line) => {
      const [key, ...valueParts] = line.split(":");
      const value = valueParts.join(":").trim();
      return [key.trim(), value.replace(/^"|"$/g, "")];
    }),
  );

  if (!data.title || !data.date || !data.summary || !data.tags) {
    throw new Error("Log entry front matter is missing required fields.");
  }

  return {
    frontMatter: {
      title: data.title,
      date: data.date,
      summary: data.summary,
      tags: parseList(data.tags),
    },
    content: match[2].trim(),
  };
}

function estimateReadingTime(content: string): string {
  const words = content.split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min read`;
}

export function getLogSlugs(): string[] {
  return fs
    .readdirSync(contentDirectory)
    .filter((file) => file.endsWith(".md"))
    .map((file) => file.replace(/\.md$/, ""));
}

export function getLogBySlug(slug: string): LogEntry {
  const fullPath = path.join(contentDirectory, `${slug}.md`);
  const markdown = fs.readFileSync(fullPath, "utf8");
  const { frontMatter, content } = parseFrontMatter(markdown);

  return {
    slug,
    ...frontMatter,
    content,
    readingTime: estimateReadingTime(content),
  };
}

export function getLogs(): LogEntry[] {
  return getLogSlugs()
    .map(getLogBySlug)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export type MarkdownBlock =
  | { type: "h1" | "h2" | "p"; content: string }
  | { type: "ul"; items: string[] };

export function markdownToBlocks(markdown: string): MarkdownBlock[] {
  return markdown
    .split(/\n{2,}/)
    .map((block) => {
      if (block.startsWith("## ")) {
        return { type: "h2" as const, content: block.replace(/^## /, "") };
      }

      if (block.startsWith("# ")) {
        return { type: "h1" as const, content: block.replace(/^# /, "") };
      }

      if (block.startsWith("- ")) {
        return {
          type: "ul" as const,
          items: block.split(/\r?\n/).map((item) => item.replace(/^- /, "")),
        };
      }

      return { type: "p" as const, content: block.replace(/\n/g, " ") };
    });
}
