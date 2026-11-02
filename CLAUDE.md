# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## 명령어

```bash
npm run dev        # 개발 서버 (Turbopack)
npm run build      # 프로덕션 빌드
npm run start      # 프로덕션 서버
npm run typecheck  # tsc --noEmit
npm run lint       # ESLint (lint:fix로 자동 수정)
npm run format     # Prettier
npx shadcn@latest add <컴포넌트>
```

테스트 프레임워크는 없습니다. 변경 후에는 `typecheck`, `lint`, `build`를 실행하고 서버를 띄워 동작을 확인합니다.

- `next build`는 린트를 실행하지 않으므로 `lint`를 따로 실행합니다.
- `next dev`와 `next build`는 `.next`를 함께 쓰므로 개발 서버를 끈 뒤 빌드합니다.
- 라우트를 삭제한 뒤 `.next/dev/types`의 이전 타입 때문에 타입 검사가 실패하면 `.next`를 지웁니다.

## 버전 고정

- **Next.js 16 + TypeScript 6을 사용합니다.** 전역 지침의 Next.js 15 지정과 다르지만 이 프로젝트에서 의도적으로 선택한 조합입니다.
- TypeScript 7로 올리지 않습니다. `typescript-eslint`와의 호환 문제가 보고되어 6에 고정했습니다.
- `global.d.ts`의 `declare module "*.css"`는 TypeScript 6에서 CSS import 타입 오류를 막기 위해 필요합니다.

## 아키텍처

### 렌더링과 캐싱

`next.config.ts`에서 `cacheComponents`와 `partialPrefetching`이 켜져 있어 현재 모든 라우트가 정적으로 프리렌더링됩니다. 요청마다 달라지는 데이터나 런타임 API를 쓰는 컴포넌트는 `<Suspense>`로 감싸고, 캐시할 데이터에는 `"use cache"`를 사용합니다. 관련 내용은 `node_modules/next/dist/docs/`에서 확인합니다.

`app/error.tsx`는 이 버전의 방식대로 `reset`이 아닌 `retry` prop을 사용합니다.

### UI 컴포넌트

`components/ui/`는 shadcn `base-nova` 프리셋으로 생성했으며 Radix가 아닌 Base UI 기반입니다.

- 다른 요소로 렌더링할 때는 `asChild`가 아닌 `render` prop을 사용합니다.
- 링크를 버튼처럼 보이게 할 때는 `<Link className={buttonVariants()}>`를 사용합니다.
- `cn`은 `lib/utils.ts` 또는 `cn` 패키지에서 가져옵니다. `clsx`와 `tailwind-merge`는 쓰지 않습니다.
- Tailwind CSS 4라 `tailwind.config`가 없습니다. 테마는 `app/globals.css`에서 관리합니다.
- `components/ui/`는 Prettier 대상에서 제외되어 있습니다.

### 터치 대상 44px

`button.tsx`, `input.tsx`, `dropdown-menu.tsx`의 기본 높이를 44px 이상으로 수정했습니다. `shadcn add --overwrite`로 다시 받으면 이 수정이 사라지므로 복구해야 합니다. 새로 추가한 컴포넌트의 클릭 영역도 `h-11` 또는 `min-h-11` 이상으로 맞춥니다.

### 상태 관리

서버의 동시 요청 간에 상태가 섞이지 않도록 전역 Zustand 스토어를 만들지 않습니다. `stores/counter-store.ts`와 `stores/counter-store-provider.tsx`의 패턴을 따릅니다.

1. `zustand/vanilla`의 `createStore`로 스토어 팩토리를 만듭니다.
2. 클라이언트 Provider에서 `useState`로 한 번만 생성해 Context로 전달합니다.
3. `persist`를 쓸 때는 `skipHydration: true`로 두고 Provider의 `useEffect`에서 `rehydrate()`를 호출합니다. hydration 불일치를 막기 위한 설정입니다.

서버 컴포넌트에서는 스토어를 읽거나 쓰지 않습니다.

### 폼

shadcn의 `form` 컴포넌트를 쓰지 않습니다. Zod 스키마를 `schemas/`에 두고 `zodResolver`, RHF `Controller`, `components/ui/field.tsx`의 `Field`, `FieldError`를 조합합니다. `app/examples/form/_components/contact-form.tsx`가 기준 예제입니다.

### 사이트 설정과 예제

- 사이트 이름, 설명, 내비게이션은 `config/site.ts`에서 관리하며 헤더, 모바일 메뉴, 메타데이터가 이 값을 사용합니다.
- 라우트 전용 컴포넌트는 해당 라우트의 `_components/`에 둡니다.
- `app/examples/`와 이 폴더가 쓰는 `schemas/contact.ts`, `stores/counter-*`는 삭제 가능한 예제입니다. 삭제 절차는 README를 따릅니다.

## 아이콘

lucide-react에서 `XxxIcon` 형태로 필요한 아이콘만 import합니다. 버튼 안 아이콘에는 `data-icon="inline-start|inline-end"`를 지정하고, 아이콘만 있는 버튼에는 아이콘이 아닌 버튼에 `aria-label`을 지정합니다.
