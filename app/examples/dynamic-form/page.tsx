import type { Metadata } from "next";

import { ExampleShell } from "@/components/common/example-shell";
import { getExample } from "@/config/examples";

import { DynamicForm } from "./_components/dynamic-form";

const href = "/examples/dynamic-form";

export const metadata: Metadata = { title: getExample(href).title };

export default function DynamicFormExamplePage() {
  return (
    <ExampleShell href={href}>
      <DynamicForm />
    </ExampleShell>
  );
}
