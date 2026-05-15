import dailyTimelineData from "@/data/daily-timeline.json";
import type { TimelineEntry } from "@/lib/types";

export function getTimelineEntries(): TimelineEntry[] {
  return [...dailyTimelineData].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}
