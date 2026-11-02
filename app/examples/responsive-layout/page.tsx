import type { Metadata } from "next";

import { ExampleShell } from "@/components/common/example-shell";
import { getExample } from "@/config/examples";

const href = "/examples/responsive-layout";

export const metadata: Metadata = { title: getExample(href).title };

const breakpoints = [
  { label: "기본 (640px 미만)", className: "sm:hidden" },
  { label: "sm (640px 이상)", className: "hidden sm:block md:hidden" },
  { label: "md (768px 이상)", className: "hidden md:block lg:hidden" },
  { label: "lg (1024px 이상)", className: "hidden lg:block" },
];

const gridItems = ["항목 1", "항목 2", "항목 3", "항목 4", "항목 5", "항목 6"];

export default function ResponsiveLayoutExamplePage() {
  return (
    <ExampleShell href={href}>
      <div className="flex flex-col gap-6">
        <section className="flex flex-col gap-2">
          <h2 className="font-medium">현재 구간</h2>
          {breakpoints.map(({ label, className }) => (
            <p
              key={label}
              className={`${className} rounded-lg bg-muted px-3 py-2 text-sm font-medium`}
            >
              {label}
            </p>
          ))}
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="font-medium">그리드: 1열 → 2열 → 3열</h2>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {gridItems.map((item) => (
              <div
                key={item}
                className="rounded-lg border p-3 text-center text-sm"
              >
                {item}
              </div>
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="font-medium">배치: 세로 → 가로</h2>
          <div className="flex flex-col gap-2 md:flex-row">
            <aside className="rounded-lg bg-muted p-3 text-sm md:w-1/3">
              사이드바
            </aside>
            <div className="rounded-lg border p-3 text-sm md:flex-1">본문</div>
          </div>
        </section>
      </div>
    </ExampleShell>
  );
}
