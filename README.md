# Next.js Starter Kit

웹 개발을 빠르게 시작할 수 있는 Next.js 스타터킷입니다.

## 기술 스택

- Next.js 16 (App Router), React 19, TypeScript 6
- Tailwind CSS 4, shadcn/ui, lucide-react
- Zustand, React Hook Form, Zod
- next-themes, Noto Sans KR
- ESLint, Prettier

## 시작하기

Node.js 20.9 이상이 필요합니다. ESLint 10까지 사용하려면 `^20.19.0`, `^22.13.0` 또는 `24` 이상을 권장합니다.

```bash
npm install
npm run dev
```

브라우저에서 <http://localhost:3000>을 엽니다.

### 환경 변수

배포할 때는 `.env.local` 또는 배포 환경에 사이트 주소를 지정합니다. 지정하지 않으면 `http://localhost:3000`을 사용합니다.

```bash
NEXT_PUBLIC_SITE_URL=https://example.com
```

## 명령어

| 명령어              | 설명                 |
| ------------------- | -------------------- |
| `npm run dev`       | 개발 서버 실행       |
| `npm run build`     | 프로덕션 빌드        |
| `npm run start`     | 프로덕션 서버 실행   |
| `npm run lint`      | ESLint 검사          |
| `npm run lint:fix`  | ESLint 자동 수정     |
| `npm run format`    | Prettier 포맷 적용   |
| `npm run typecheck` | TypeScript 타입 검사 |

`next build`는 린트를 실행하지 않으므로 `npm run lint`를 별도로 실행합니다.

## 폴더 구조

```text
app/                 라우트, 레이아웃, 전역 스타일
app/examples/        폼, 상태 관리 예제 (삭제 가능)
components/ui/       shadcn/ui 컴포넌트
components/layout/   헤더, 푸터, 모바일 메뉴
components/common/   테마 전환 등 공통 컴포넌트
config/site.ts       사이트 이름, 설명, 내비게이션
hooks/               커스텀 훅
lib/                 유틸리티
schemas/             Zod 스키마
stores/              Zustand 스토어
```

## 사용 방법

### 컴포넌트 추가

```bash
npx shadcn@latest add dialog
```

이 프로젝트는 터치 대상을 높이 44px 이상으로 맞춥니다. 새로 추가한 컴포넌트의 클릭 영역도 `h-11` 또는 `min-h-11` 이상인지 확인하세요.

### 아이콘 사용

필요한 아이콘만 import합니다. 버튼 안의 아이콘에는 `data-icon`으로 위치를 지정하고, 아이콘만 있는 버튼에는 `aria-label`을 버튼에 지정합니다.

```tsx
import { PlusIcon, TrashIcon } from "lucide-react";

<Button>
  <PlusIcon data-icon="inline-start" />
  추가
</Button>

<Button size="icon" aria-label="삭제">
  <TrashIcon />
</Button>
```

### 상태 관리

서버에서 요청 간 상태가 섞이지 않도록 전역 스토어 대신 팩토리와 Context Provider를 사용합니다. 서버 컴포넌트에서는 스토어를 읽거나 쓰지 않습니다. `stores/`의 카운터 스토어를 참고하세요.

### 캐싱

`next.config.ts`에서 Cache Components가 켜져 있습니다. 요청마다 달라지는 데이터나 `cookies()` 같은 런타임 API를 쓰는 컴포넌트는 `<Suspense>`로 감싸고, 캐시할 데이터에는 `"use cache"`를 사용합니다.

## 예제 제거

1. `app/examples/` 폴더를 삭제합니다.
2. `schemas/contact.ts`, `stores/counter-store.ts`, `stores/counter-store-provider.tsx`를 삭제합니다.
3. `config/site.ts`의 `nav`에서 예제 항목을 지웁니다.
4. `app/page.tsx`에서 예제 링크를 지웁니다.
5. `.next` 폴더를 삭제합니다. 지운 라우트를 이전 타입 파일이 참조해 타입 검사가 실패할 수 있습니다.
