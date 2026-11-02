import {
  ArrowRightIcon,
  BoxesIcon,
  ClipboardCheckIcon,
  ComponentIcon,
  LayersIcon,
  MoonIcon,
  PaletteIcon,
} from "lucide-react";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const features = [
  {
    icon: LayersIcon,
    title: "Next.js 16",
    description: "App Router, React 19, TypeScript 6 기반입니다.",
  },
  {
    icon: PaletteIcon,
    title: "Tailwind CSS 4",
    description: "별도 설정 파일 없이 CSS에서 테마를 관리합니다.",
  },
  {
    icon: ComponentIcon,
    title: "shadcn/ui",
    description: "터치 대상 44px 기준에 맞춘 컴포넌트를 제공합니다.",
  },
  {
    icon: ClipboardCheckIcon,
    title: "React Hook Form + Zod",
    description: "스키마 기반 폼 검증 예제가 포함되어 있습니다.",
  },
  {
    icon: BoxesIcon,
    title: "Zustand",
    description: "요청 간 상태가 섞이지 않는 스토어 구조를 사용합니다.",
  },
  {
    icon: MoonIcon,
    title: "다크 모드",
    description: "라이트, 다크, 시스템 테마를 전환할 수 있습니다.",
  },
];

export default function HomePage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-12 px-4 py-12 md:py-20">
      <section className="flex flex-col items-start gap-6">
        <h1 className="text-4xl font-bold tracking-tight text-balance md:text-5xl">
          설정은 끝났습니다.
          <br />
          바로 만들기 시작하세요.
        </h1>
        <p className="max-w-2xl text-lg text-muted-foreground">
          자주 쓰는 기술 스택과 공통 레이아웃, 예제를 갖춘 Next.js
          스타터킷입니다.
        </p>
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <Link
            href="/examples/form"
            className={buttonVariants({ size: "lg" })}
          >
            폼 예제 보기
            <ArrowRightIcon data-icon="inline-end" />
          </Link>
          <Link
            href="/examples/store"
            className={buttonVariants({ size: "lg", variant: "outline" })}
          >
            상태 관리 예제 보기
          </Link>
        </div>
      </section>

      <section
        aria-label="포함된 기술"
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {features.map(({ icon: Icon, title, description }) => (
          <Card key={title}>
            <CardHeader>
              <Icon className="mb-2 size-6 text-muted-foreground" />
              <CardTitle>{title}</CardTitle>
              <CardDescription>{description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </section>
    </div>
  );
}
