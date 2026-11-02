import type { Metadata } from "next";

import { ExampleShell } from "@/components/common/example-shell";
import { getExample } from "@/config/examples";
import { TodoStoreProvider } from "@/stores/todo-store-provider";

import { TodoList } from "./_components/todo-list";

const href = "/examples/todo";

export const metadata: Metadata = { title: getExample(href).title };

export default function TodoExamplePage() {
  return (
    <ExampleShell href={href}>
      <TodoStoreProvider>
        <TodoList />
      </TodoStoreProvider>
    </ExampleShell>
  );
}
