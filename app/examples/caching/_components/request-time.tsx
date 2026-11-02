import { connection } from "next/server";

import { formatDateTime } from "@/lib/format";

export async function RequestTime() {
  // 프리렌더링을 여기서 멈추고 실제 요청이 들어왔을 때 렌더링한다.
  await connection();

  return (
    <div className="rounded-lg border p-4">
      <p className="text-sm text-muted-foreground">
        요청 시각 (connection, Suspense)
      </p>
      <p className="font-medium tabular-nums">{formatDateTime(new Date())}</p>
    </div>
  );
}
