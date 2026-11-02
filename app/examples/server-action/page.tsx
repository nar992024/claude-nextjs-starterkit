import type { Metadata } from "next";

import { ExampleShell } from "@/components/common/example-shell";
import { getExample } from "@/config/examples";

import { FeedbackForm } from "./_components/feedback-form";

const href = "/examples/server-action";

export const metadata: Metadata = { title: getExample(href).title };

export default function ServerActionExamplePage() {
  return (
    <ExampleShell href={href}>
      <FeedbackForm />
    </ExampleShell>
  );
}
