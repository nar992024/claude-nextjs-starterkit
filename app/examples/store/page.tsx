import type { Metadata } from "next";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CounterStoreProvider } from "@/stores/counter-store-provider";

import { Counter } from "./_components/counter";

export const metadata: Metadata = { title: "상태 관리 예제" };

export default function StoreExamplePage() {
  return (
    <div className="mx-auto w-full max-w-xl px-4 py-12">
      <Card>
        <CardHeader>
          <CardTitle>상태 관리 예제</CardTitle>
          <CardDescription>
            Zustand 스토어 값은 브라우저에 저장되어 새로고침해도 유지됩니다.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CounterStoreProvider>
            <Counter />
          </CounterStoreProvider>
        </CardContent>
      </Card>
    </div>
  );
}
