import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { exampleGroups } from "@/config/examples";

export default function HomePage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-12 px-4 py-12 md:py-20">
      <section className="flex flex-col items-start gap-6">
        <h1 className="text-4xl font-bold tracking-tight text-balance md:text-5xl">
          바로 시작하는 Next.js 스타터킷
        </h1>
        <p className="max-w-2xl text-lg text-muted-foreground">
          레이아웃, 폼, 상태 관리, 다크 모드를 미리 갖췄습니다. 설정 대신 기능
          개발부터 시작하세요.
        </p>
        <Link
          href="/examples"
          className={`${buttonVariants({ size: "lg" })} w-full sm:w-auto`}
        >
          예제 둘러보기
          <ArrowRightIcon data-icon="inline-end" />
        </Link>
      </section>

      <section
        aria-labelledby="getting-started"
        className="flex flex-col gap-3"
      >
        <h2 id="getting-started" className="text-xl font-semibold">
          시작하기
        </h2>
        <pre className="overflow-x-auto rounded-lg bg-muted p-4 text-sm">
          <code>{"npm install\nnpm run dev"}</code>
        </pre>
      </section>

      <section aria-labelledby="included" className="flex flex-col gap-4">
        <h2 id="included" className="text-xl font-semibold">
          포함된 기술
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {exampleGroups.map(
            ({ id, icon: Icon, title, description, items }) => (
              <Link
                key={id}
                href={`/examples#${id}`}
                className="rounded-xl outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
              >
                <Card className="h-full transition-colors hover:bg-muted/50">
                  <CardHeader>
                    <Icon className="mb-2 size-6 text-muted-foreground" />
                    <CardTitle>{title}</CardTitle>
                    <CardDescription>{description}</CardDescription>
                    <p className="mt-2 text-sm font-medium">
                      예제 {items.length}개
                    </p>
                  </CardHeader>
                </Card>
              </Link>
            ),
          )}
        </div>
      </section>
    </div>
  );
}
