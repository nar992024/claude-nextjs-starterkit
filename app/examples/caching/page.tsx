import type { Metadata } from "next";
import { Suspense } from "react";

import { ExampleShell } from "@/components/common/example-shell";
import { getExample } from "@/config/examples";

import { CachedTime } from "./_components/cached-time";
import { RequestTime } from "./_components/request-time";

const href = "/examples/caching";

export const metadata: Metadata = { title: getExample(href).title };

export default function CachingExamplePage() {
  return (
    <ExampleShell href={href}>
      <div className="flex flex-col gap-4">
        <CachedTime />
        {/* 요청 시점 데이터는 Suspense로 감싸야 나머지 화면을 먼저 보낼 수 있다. */}
        <Suspense
          fallback={
            <div
              role="status"
              className="rounded-lg border p-4 text-sm text-muted-foreground"
            >
              요청 시각을 불러오는 중입니다.
            </div>
          }
        >
          <RequestTime />
        </Suspense>
        <p className="text-sm text-muted-foreground">
          프로덕션 빌드에서 새로고침하면 요청 시각은 매번 바뀌고, 캐시된 시각은
          캐시가 갱신될 때까지 유지됩니다.
        </p>
      </div>
    </ExampleShell>
  );
}
