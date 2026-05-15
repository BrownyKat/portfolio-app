import type { Metadata } from "next";
import { LogPreview } from "@/components/molecules/LogPreview";
import { getLogs } from "@/lib/logs";

export const metadata: Metadata = {
  title: "Logs",
  description:
    "Weekly internship logs covering foundations, SEO work, frontend systems, SVS-MDRRMO, DeskDine, and the daily timeline.",
};

export default function LogsPage() {
  const logs = getLogs();

  return (
    <main className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
      <header className="mb-10 max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#48e2ff]">
          Logs
        </p>
        <h1 className="mt-3 text-4xl font-black leading-tight text-[#f5fbff] sm:text-5xl">
          Weekly notes and timeline records.
        </h1>
        <p className="mt-4 text-lg leading-8 text-[#b8c8d6]">
          Internship progress, implementation notes, and daily report history.
        </p>
      </header>

      <section aria-label="Log entries" className="grid gap-5 md:grid-cols-2">
        {logs.map((log) => (
          <LogPreview key={log.slug} log={log} />
        ))}
      </section>
    </main>
  );
}
