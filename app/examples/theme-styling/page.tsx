import type { Metadata } from "next";

import { ExampleShell } from "@/components/common/example-shell";
import { getExample } from "@/config/examples";

const href = "/examples/theme-styling";

export const metadata: Metadata = { title: getExample(href).title };

function TokenPreview({ title }: { title: string }) {
  return (
    <div className="rounded-lg border bg-background p-4 text-foreground">
      <p className="font-medium">{title}</p>
      <p className="text-sm text-muted-foreground">
        토큰을 쓰면 테마에 따라 색상이 자동으로 바뀝니다.
      </p>
    </div>
  );
}

export default function ThemeStylingExamplePage() {
  return (
    <ExampleShell href={href}>
      <div className="flex flex-col gap-6">
        <section className="flex flex-col gap-2">
          <h2 className="font-medium">방법 1. 색상 토큰 (권장)</h2>
          <div className="grid gap-2 sm:grid-cols-2">
            <TokenPreview title="현재 테마" />
            {/* .dark 클래스를 감싸면 이 영역만 항상 다크 토큰을 사용한다. */}
            <div className="dark">
              <TokenPreview title="항상 다크" />
            </div>
          </div>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="font-medium">방법 2. dark: 접두사</h2>
          <p className="rounded-lg bg-amber-100 p-4 text-sm text-amber-950 dark:bg-amber-950 dark:text-amber-100">
            토큰에 없는 색은 <code>dark:</code> 접두사로 테마별 값을 직접
            지정합니다.
          </p>
        </section>
      </div>
    </ExampleShell>
  );
}
