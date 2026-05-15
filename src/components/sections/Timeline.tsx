import { formatDate } from "@/lib/format";
import type { TimelineEntry } from "@/lib/types";

const monthFormatter = new Intl.DateTimeFormat("en", {
  month: "short",
  year: "numeric",
});

const focusStyles: Record<string, string> = {
  MIH: "border-[#ffd166]/35 bg-[#ffd166]/12 text-[#ffe6a3]",
  Learning: "border-[#b8ff6a]/35 bg-[#b8ff6a]/12 text-[#dcffae]",
  Hack4Mapandan: "border-[#48e2ff]/40 bg-[#48e2ff]/12 text-[#9ff0ff]",
  DeskDine: "border-[#ff4fd8]/35 bg-[#ff4fd8]/12 text-[#ffb4ee]",
  PromptGraph: "border-[#8ea8ff]/35 bg-[#8ea8ff]/12 text-[#c9d4ff]",
  "Page Creation": "border-[#ffd166]/35 bg-[#ffd166]/12 text-[#ffe6a3]",
  "Product Ideation": "border-[#b8ff6a]/35 bg-[#b8ff6a]/12 text-[#dcffae]",
};

function getMonthKey(date: string) {
  return monthFormatter.format(new Date(`${date}T00:00:00`));
}

function groupByMonth(entries: TimelineEntry[]) {
  return entries.reduce<Array<{ month: string; entries: TimelineEntry[] }>>(
    (groups, entry) => {
      const month = getMonthKey(entry.date);
      const current = groups[groups.length - 1];

      if (current?.month === month) {
        current.entries.push(entry);
      } else {
        groups.push({ month, entries: [entry] });
      }

      return groups;
    },
    [],
  );
}

export function Timeline({ entries }: { entries: TimelineEntry[] }) {
  const groupedEntries = groupByMonth(entries);
  const latestEntry = entries[entries.length - 1];
  const focusCount = new Set(entries.map((entry) => entry.focus)).size;

  return (
    <section className="space-y-5" aria-label="Daily internship timeline">
      <div className="grid gap-3 sm:grid-cols-3">
        <div className="rounded-lg border border-[#48e2ff]/20 bg-white/[0.045] p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#89a6b8]">
            Entries
          </p>
          <p className="mt-2 text-2xl font-black text-[#f5fbff]">
            {entries.length}
          </p>
        </div>
        <div className="rounded-lg border border-[#48e2ff]/20 bg-white/[0.045] p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#89a6b8]">
            Tracks
          </p>
          <p className="mt-2 text-2xl font-black text-[#f5fbff]">
            {focusCount}
          </p>
        </div>
        <div className="rounded-lg border border-[#48e2ff]/20 bg-white/[0.045] p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#89a6b8]">
            Latest
          </p>
          <p className="mt-2 text-lg font-black text-[#f5fbff]">
            {latestEntry ? formatDate(latestEntry.date) : "No entries"}
          </p>
        </div>
      </div>

      <div className="max-h-[44rem] overflow-y-auto rounded-lg border border-[#48e2ff]/22 bg-[#071018]/56 p-3 shadow-[inset_0_0_35px_rgba(72,226,255,0.06)]">
        <ol className="space-y-6">
          {groupedEntries.map((group) => (
            <li key={group.month} className="space-y-3">
              <div className="sticky top-0 z-10 -mx-3 border-y border-[#48e2ff]/14 bg-[#071018]/92 px-3 py-2 backdrop-blur-xl">
                <p className="text-xs font-black uppercase tracking-[0.22em] text-[#48e2ff]">
                  {group.month}
                </p>
              </div>
              <ol className="relative space-y-3 border-l border-[#48e2ff]/20 pl-5">
                {group.entries.map((entry) => (
                  <li
                    key={`${entry.date}-${entry.title}`}
                    className="relative rounded-lg border border-[#48e2ff]/16 bg-white/[0.04] p-4 transition duration-300 hover:-translate-y-0.5 hover:border-[#48e2ff]/45 hover:bg-white/[0.065]"
                  >
                    <span className="absolute -left-[1.68rem] top-5 h-3 w-3 rounded-full border-2 border-[#071018] bg-[#48e2ff] shadow-[0_0_18px_rgba(72,226,255,0.7)]" />
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div className="min-w-0">
                        <time
                          dateTime={entry.date}
                          className="text-xs font-semibold uppercase tracking-[0.14em] text-[#89a6b8]"
                        >
                          {formatDate(entry.date)}
                        </time>
                        <h3 className="mt-1 text-base font-semibold text-[#f5fbff]">
                          {entry.title}
                        </h3>
                      </div>
                      <span
                        className={`inline-flex min-h-7 shrink-0 items-center rounded-full border px-3 py-1 text-xs font-semibold ${
                          focusStyles[entry.focus] ??
                          "border-[#48e2ff]/30 bg-[#48e2ff]/10 text-[#9ff0ff]"
                        }`}
                      >
                        {entry.focus}
                      </span>
                    </div>
                    <p className="mt-3 text-sm leading-6 text-[#b8c8d6]">
                      {entry.summary}
                    </p>
                  </li>
                ))}
              </ol>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
