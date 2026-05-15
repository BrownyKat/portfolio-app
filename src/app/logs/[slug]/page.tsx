import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/atoms/Badge";
import { LogPreview } from "@/components/molecules/LogPreview";
import { formatDate } from "@/lib/format";
import { getLogBySlug, getLogs, getLogSlugs, markdownToBlocks } from "@/lib/logs";

interface LogPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getLogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: LogPageProps): Promise<Metadata> {
  const { slug } = await params;

  try {
    const log = getLogBySlug(slug);
    return {
      title: log.title,
      description: log.summary,
      openGraph: {
        title: log.title,
        description: log.summary,
        type: "article",
        publishedTime: log.date,
      },
    };
  } catch {
    return {
      title: "Log not found",
    };
  }
}

export default async function LogPage({ params }: LogPageProps) {
  const { slug } = await params;
  const slugs = getLogSlugs();

  if (!slugs.includes(slug)) {
    notFound();
  }

  const log = getLogBySlug(slug);
  const blocks = markdownToBlocks(log.content);
  const relatedLogs = getLogs()
    .filter((entry) => entry.slug !== log.slug)
    .slice(0, 2);

  return (
    <main className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[minmax(0,1fr)_22rem] lg:px-8">
      <article>
        <header className="border-b border-[#47d7c4]/18 pb-8">
          <Link
            href={`/logs#log-${log.slug}`}
            className="mb-6 inline-flex min-h-11 items-center rounded-full border border-[#47d7c4]/35 bg-[#47d7c4]/10 px-4 text-sm font-semibold text-[#9df3e7] transition hover:-translate-y-0.5 hover:border-[#ffd166]/70 hover:text-[#fff7ec]"
          >
            Back to selected log
          </Link>
          <div className="flex flex-wrap items-center gap-3 text-sm text-[#93b8b1]">
            <time dateTime={log.date}>{formatDate(log.date)}</time>
            <span>{log.readingTime}</span>
          </div>
          <h1 className="section-title mt-4 text-[#fff7ec]">
            {log.title}
          </h1>
          <p className="mt-4 text-xl font-semibold leading-9 text-[#c8ded7]">
            {log.summary}
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {log.tags.map((tag) => (
              <Badge key={tag} tone="accent">
                {tag}
              </Badge>
            ))}
          </div>
        </header>
        <div className="prose-log mt-8">
          {blocks.map((block, index) => {
            const key = `${block.type}-${index}`;

            if (block.type === "h1") {
              return <h1 key={key}>{block.content}</h1>;
            }

            if (block.type === "h2") {
              return <h2 key={key}>{block.content}</h2>;
            }

            if (block.type === "ul") {
              return (
                <ul key={key}>
                  {block.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              );
            }

            return <p key={key}>{block.content}</p>;
          })}
        </div>
      </article>

      <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
        <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-[#47d7c4]">
          More Logs
        </h2>
        {relatedLogs.map((entry) => (
          <LogPreview key={entry.slug} log={entry} />
        ))}
      </aside>
    </main>
  );
}
