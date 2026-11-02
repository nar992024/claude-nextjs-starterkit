import type { Metadata } from "next";

import { ExampleShell } from "@/components/common/example-shell";
import { getExample } from "@/config/examples";

import { DeleteDialog } from "./_components/delete-dialog";

const href = "/examples/dialog";

export const metadata: Metadata = { title: getExample(href).title };

export default function DialogExamplePage() {
  return (
    <ExampleShell href={href}>
      <DeleteDialog />
    </ExampleShell>
  );
}
