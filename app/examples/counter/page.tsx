import type { Metadata } from "next";

import { ExampleShell } from "@/components/common/example-shell";
import { getExample } from "@/config/examples";
import { CounterStoreProvider } from "@/stores/counter-store-provider";

import { Counter } from "./_components/counter";

const href = "/examples/counter";

export const metadata: Metadata = { title: getExample(href).title };

export default function CounterExamplePage() {
  return (
    <ExampleShell href={href}>
      <CounterStoreProvider>
        <Counter />
      </CounterStoreProvider>
    </ExampleShell>
  );
}
