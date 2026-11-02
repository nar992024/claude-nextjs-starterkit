import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getExample } from "@/config/examples";

export function ExampleShell({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  const example = getExample(href);

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-4 px-4 py-8">
      <Link
        href="/examples"
        className="inline-flex min-h-11 w-fit items-center gap-1.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground"
      >
        <ArrowLeftIcon className="size-4" />
        예제 목록
      </Link>
      <Card>
        <CardHeader>
          <CardTitle>
            <h1>{example.title}</h1>
          </CardTitle>
          <CardDescription>{example.description}</CardDescription>
        </CardHeader>
        <CardContent>{children}</CardContent>
      </Card>
      <section aria-labelledby="example-files" className="px-1 text-sm">
        <h2 id="example-files" className="font-medium">
          복사해서 쓸 파일
        </h2>
        <ul className="mt-2 flex flex-col gap-1 text-muted-foreground">
          {example.files.map((file) => (
            <li key={file}>
              <code className="text-xs break-all">{file}</code>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
