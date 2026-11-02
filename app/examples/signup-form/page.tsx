import type { Metadata } from "next";

import { ExampleShell } from "@/components/common/example-shell";
import { getExample } from "@/config/examples";

import { SignupForm } from "./_components/signup-form";

const href = "/examples/signup-form";

export const metadata: Metadata = { title: getExample(href).title };

export default function SignupFormExamplePage() {
  return (
    <ExampleShell href={href}>
      <SignupForm />
    </ExampleShell>
  );
}
