import type { Metadata } from "next";

import { ExampleShell } from "@/components/common/example-shell";
import { getExample } from "@/config/examples";

const href = "/examples/theme-tokens";

export const metadata: Metadata = { title: getExample(href).title };

// Tailwind가 클래스를 찾을 수 있도록 전체 이름을 문자열로 적는다.
const tokens = [
  { name: "background", className: "bg-background text-foreground" },
  { name: "card", className: "bg-card text-card-foreground" },
  { name: "primary", className: "bg-primary text-primary-foreground" },
  { name: "secondary", className: "bg-secondary text-secondary-foreground" },
  { name: "muted", className: "bg-muted text-muted-foreground" },
  { name: "accent", className: "bg-accent text-accent-foreground" },
  { name: "destructive", className: "bg-destructive text-white" },
  { name: "popover", className: "bg-popover text-popover-foreground" },
];

export default function ThemeTokensExamplePage() {
  return (
    <ExampleShell href={href}>
      <div className="flex flex-col gap-4">
        <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {tokens.map(({ name, className }) => (
            <li
              key={name}
              className={`${className} rounded-lg border p-3 text-sm font-medium`}
            >
              {name}
            </li>
          ))}
        </ul>
        <p className="text-sm text-muted-foreground">
          색상은 <code>app/globals.css</code>의 <code>:root</code>와{" "}
          <code>.dark</code>에서 정의합니다. 값을 바꾸면 이 토큰을 쓰는 모든
          컴포넌트에 반영됩니다.
        </p>
      </div>
    </ExampleShell>
  );
}
