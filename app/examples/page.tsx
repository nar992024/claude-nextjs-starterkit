import type { Metadata } from "next";
import Link from "next/link";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { exampleCount, exampleGroups } from "@/config/examples";

export const metadata: Metadata = { title: "예제" };

export default function ExamplesPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 px-4 py-12">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">예제</h1>
        <p className="text-muted-foreground">
          기술별 예제 {exampleCount}개를 확인하고, 안내된 파일을 복사해
          프로젝트에 맞게 수정하세요.
        </p>
      </div>
      {exampleGroups.map(
        ({ id, title, description, icon: GroupIcon, items }) => (
          <section
            key={id}
            id={id}
            className="flex scroll-mt-20 flex-col gap-4"
          >
            <div>
              <h2 className="flex items-center gap-2 text-xl font-semibold">
                <GroupIcon className="size-5 text-muted-foreground" />
                {title}
              </h2>
              <p className="text-sm text-muted-foreground">{description}</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-xl outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
                >
                  <Card className="h-full transition-colors hover:bg-muted/50">
                    <CardHeader>
                      <item.icon className="mb-2 size-6 text-muted-foreground" />
                      <CardTitle>{item.title}</CardTitle>
                      <CardDescription>{item.description}</CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        ),
      )}
    </div>
  );
}
