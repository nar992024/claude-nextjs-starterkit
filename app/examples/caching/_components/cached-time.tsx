import { cacheLife } from "next/cache";

import { formatDateTime } from "@/lib/format";

async function getCachedTime() {
  "use cache";
  cacheLife("minutes");
  return formatDateTime(new Date());
}

export async function CachedTime() {
  const time = await getCachedTime();

  return (
    <div className="rounded-lg border p-4">
      <p className="text-sm text-muted-foreground">
        캐시된 시각 (use cache, cacheLife)
      </p>
      <p className="font-medium tabular-nums">{time}</p>
    </div>
  );
}
