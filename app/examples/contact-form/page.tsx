import type { Metadata } from "next";

import { ExampleShell } from "@/components/common/example-shell";
import { getExample } from "@/config/examples";

import { ContactForm } from "./_components/contact-form";

const href = "/examples/contact-form";

export const metadata: Metadata = { title: getExample(href).title };

export default function ContactFormExamplePage() {
  return (
    <ExampleShell href={href}>
      <ContactForm />
    </ExampleShell>
  );
}
