import type { Metadata } from "next";

import { ExampleShell } from "@/components/common/example-shell";
import { getExample } from "@/config/examples";

import { ThemeSwitcher } from "./_components/theme-switcher";

const href = "/examples/theme-switcher";

export const metadata: Metadata = { title: getExample(href).title };

export default function ThemeSwitcherExamplePage() {
  return (
    <ExampleShell href={href}>
      <ThemeSwitcher />
    </ExampleShell>
  );
}
