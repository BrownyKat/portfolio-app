import Link from "next/link";
import { Badge } from "@/components/atoms/Badge";
import { formatDate } from "@/lib/format";
import type { LogEntry } from "@/lib/types";

export function LogPreview({ log }: { log: LogEntry }) {
  return (
    <article
      id={`log-${log.slug}`}
      className="arcane-card scroll-mt-28 rounded-lg p-5 transition duration-300 target:border-[#b8ff6a]/70 target:shadow-[0_0_34px_rgba(184,255,106,0.2)] hover:-translate-y-1 hover:border-[#48e2ff]/55"
    >
      <div className="flex flex-wrap items-center gap-3 text-sm text-[#89a6b8]">
        <time dateTime={log.date}>{formatDate(log.date)}</time>
        <span>{log.readingTime}</span>
      </div>
      <h3 className="mt-3 text-xl font-semibold text-[#f5fbff]">
        <Link
          href={`/logs/${log.slug}`}
          className="inline-flex min-h-11 items-center hover:text-[#9ff0ff]"
        >
          {log.title}
        </Link>
      </h3>
      <p className="mt-2 text-sm leading-6 text-[#b8c8d6]">{log.summary}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {log.tags.map((tag) => (
          <Badge key={tag}>{tag}</Badge>
        ))}
      </div>
    </article>
  );
}
