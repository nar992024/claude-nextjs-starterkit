import {
  BoxesIcon,
  ClipboardCheckIcon,
  ComponentIcon,
  DatabaseIcon,
  LayersIcon,
  LayoutGridIcon,
  ListChecksIcon,
  ListPlusIcon,
  MessageSquareWarningIcon,
  MoonIcon,
  PaintbrushIcon,
  PaletteIcon,
  PanelTopIcon,
  SendIcon,
  ShoppingCartIcon,
  SunMoonIcon,
  SwatchBookIcon,
  UserPlusIcon,
  type LucideIcon,
} from "lucide-react";

export type Example = {
  href: string;
  title: string;
  description: string;
  icon: LucideIcon;
  // 프로젝트로 복사해 쓸 때 함께 가져가야 하는 파일
  files: string[];
};

export type ExampleGroup = {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  items: Example[];
};

// 새 예제는 여기에 추가하면 첫 페이지, 목록, 상세 화면에 함께 반영된다.
export const exampleGroups: ExampleGroup[] = [
  {
    id: "nextjs",
    title: "Next.js 16",
    description: "App Router, React 19, TypeScript 6 기반입니다.",
    icon: LayersIcon,
    items: [
      {
        href: "/examples/caching",
        title: "캐싱과 스트리밍",
        description:
          "캐시된 데이터와 요청마다 새로 만드는 데이터를 비교합니다.",
        icon: DatabaseIcon,
        files: [
          "app/examples/caching/_components/cached-time.tsx",
          "app/examples/caching/_components/request-time.tsx",
        ],
      },
      {
        href: "/examples/server-action",
        title: "서버 액션",
        description: "서버에서 입력값을 검증하고 결과를 폼에 표시합니다.",
        icon: SendIcon,
        files: [
          "app/examples/server-action/actions.ts",
          "app/examples/server-action/_components/feedback-form.tsx",
          "schemas/feedback.ts",
        ],
      },
    ],
  },
  {
    id: "tailwind",
    title: "Tailwind CSS 4",
    description: "별도 설정 파일 없이 CSS에서 테마를 관리합니다.",
    icon: PaletteIcon,
    items: [
      {
        href: "/examples/responsive-layout",
        title: "반응형 레이아웃",
        description: "화면 폭에 따라 그리드와 배치를 바꿉니다.",
        icon: LayoutGridIcon,
        files: ["app/examples/responsive-layout/page.tsx"],
      },
      {
        href: "/examples/theme-tokens",
        title: "테마 토큰",
        description: "globals.css에 정의한 색상 토큰을 확인합니다.",
        icon: SwatchBookIcon,
        files: ["app/examples/theme-tokens/page.tsx", "app/globals.css"],
      },
    ],
  },
  {
    id: "shadcn",
    title: "shadcn/ui",
    description: "터치 대상 44px 기준에 맞춘 컴포넌트를 제공합니다.",
    icon: ComponentIcon,
    items: [
      {
        href: "/examples/dialog",
        title: "확인 다이얼로그",
        description: "되돌릴 수 없는 작업 전에 한 번 더 확인합니다.",
        icon: MessageSquareWarningIcon,
        files: [
          "app/examples/dialog/_components/delete-dialog.tsx",
          "components/ui/dialog.tsx",
        ],
      },
      {
        href: "/examples/tabs",
        title: "탭",
        description: "관련 내용을 한 화면에서 나눠 보여 줍니다.",
        icon: PanelTopIcon,
        files: ["app/examples/tabs/page.tsx", "components/ui/tabs.tsx"],
      },
    ],
  },
  {
    id: "forms",
    title: "React Hook Form + Zod",
    description: "스키마 기반 폼 검증을 바로 쓸 수 있습니다.",
    icon: ClipboardCheckIcon,
    items: [
      {
        href: "/examples/contact-form",
        title: "문의 폼",
        description: "기본 입력 필드와 스키마 검증을 사용합니다.",
        icon: ClipboardCheckIcon,
        files: [
          "app/examples/contact-form/_components/contact-form.tsx",
          "schemas/contact.ts",
        ],
      },
      {
        href: "/examples/signup-form",
        title: "회원가입 폼",
        description: "비밀번호 확인과 약관 동의를 검증합니다.",
        icon: UserPlusIcon,
        files: [
          "app/examples/signup-form/_components/signup-form.tsx",
          "schemas/signup.ts",
        ],
      },
      {
        href: "/examples/dynamic-form",
        title: "동적 입력 폼",
        description: "참가자 입력란을 추가하고 삭제합니다.",
        icon: ListPlusIcon,
        files: [
          "app/examples/dynamic-form/_components/dynamic-form.tsx",
          "schemas/event-registration.ts",
        ],
      },
    ],
  },
  {
    id: "zustand",
    title: "Zustand",
    description: "요청 간 상태가 섞이지 않는 스토어 구조를 사용합니다.",
    icon: BoxesIcon,
    items: [
      {
        href: "/examples/counter",
        title: "카운터",
        description: "값을 브라우저에 저장해 새로고침해도 유지합니다.",
        icon: BoxesIcon,
        files: [
          "app/examples/counter/_components/counter.tsx",
          "stores/counter-store.ts",
          "stores/counter-store-provider.ts",
          "stores/create-store-context.tsx",
        ],
      },
      {
        href: "/examples/todo",
        title: "할 일 목록",
        description: "항목을 추가, 완료, 삭제하고 상태별로 걸러 봅니다.",
        icon: ListChecksIcon,
        files: [
          "app/examples/todo/_components/todo-list.tsx",
          "stores/todo-store.ts",
          "stores/todo-store-provider.ts",
          "stores/create-store-context.tsx",
        ],
      },
      {
        href: "/examples/cart",
        title: "장바구니",
        description: "여러 컴포넌트가 상태를 공유하고 합계를 계산합니다.",
        icon: ShoppingCartIcon,
        files: [
          "app/examples/cart/_components/product-list.tsx",
          "app/examples/cart/_components/cart-summary.tsx",
          "stores/cart-store.ts",
          "stores/cart-store-provider.ts",
          "stores/create-store-context.tsx",
          "lib/format.ts",
        ],
      },
    ],
  },
  {
    id: "dark-mode",
    title: "다크 모드",
    description: "라이트, 다크, 시스템 테마를 전환할 수 있습니다.",
    icon: MoonIcon,
    items: [
      {
        href: "/examples/theme-switcher",
        title: "테마 선택기",
        description: "테마를 바꾸고 현재 적용된 값을 안전하게 표시합니다.",
        icon: SunMoonIcon,
        files: [
          "app/examples/theme-switcher/_components/theme-switcher.tsx",
          "hooks/use-mounted.ts",
          "components/theme-provider.tsx",
        ],
      },
      {
        href: "/examples/theme-styling",
        title: "테마별 스타일",
        description: "토큰과 dark: 접두사로 테마별 스타일을 적용합니다.",
        icon: PaintbrushIcon,
        files: ["app/examples/theme-styling/page.tsx"],
      },
    ],
  },
];

export const exampleCount = exampleGroups.reduce(
  (count, group) => count + group.items.length,
  0,
);

export function getExample(href: string): Example {
  const example = exampleGroups
    .flatMap((group) => group.items)
    .find((item) => item.href === href);

  if (!example) {
    throw new Error(`등록되지 않은 예제입니다: ${href}`);
  }

  return example;
}
