# CLAUDE.md

@AGENTS.md

스택은 `package.json`, 구조와 예제 삭제 절차는 `README.md`, 코드 스타일과 Git 규칙은 `.claude/rules/`를 봅니다.

## 검증

테스트 프레임워크는 없습니다. 변경 후 `npm run typecheck`, `npm run lint`, `npm run build`를 실행하고 서버를 띄워 동작을 확인합니다.

- `next dev`와 `next build`는 `.next`를 함께 쓰므로 개발 서버를 끈 뒤 빌드합니다.
- 라우트 삭제 후 `.next/dev/types` 때문에 타입 검사가 실패하면 `.next` 삭제를 사용자에게 요청합니다. 재귀 강제 삭제는 차단되어 있습니다.

## Hook (`.claude/hooks/`)

- 수정한 파일에 ESLint와 Prettier가 적용되어 내용이 바뀔 수 있습니다. 타입 오류가 전달되면 바로 고칩니다.
- `.env*`는 읽거나 수정할 수 없고, `package-lock.json`은 직접 수정할 수 없습니다. `.env*`는 사용자에게 요청하고, 잠금 파일은 npm 명령으로 갱신합니다.
- `sudo`, 재귀 강제 삭제, 강제 푸시는 차단되며, 다른 명령으로 우회하지 않습니다.
- `npm run typecheck`는 `.claude/`를 검사하지 않으므로 hook 스크립트는 파일을 지정해 검사합니다.

## 버전 고정

- Next.js 16 + TypeScript 6은 의도한 조합이며, 전역 지침의 Next.js 15보다 우선합니다.
- TypeScript 7로 올리지 않습니다. `typescript-eslint` 호환 문제가 보고되었습니다.
- `global.d.ts`의 `declare module "*.css"`는 TypeScript 6의 CSS import 오류를 막으므로 지우지 않습니다.

## 렌더링

`cacheComponents`와 `partialPrefetching`이 켜져 있습니다. 문서는 `node_modules/next/dist/docs/`에 있습니다.

- 요청마다 달라지는 데이터나 런타임 API는 `<Suspense>`로 감싸고, 캐시할 데이터에는 `"use cache"`를 씁니다. 기준 예제는 `app/examples/caching/`입니다.
- 클라이언트 이동 시 이전 라우트가 `<Activity>`로 숨겨진 채 남아 상태와 폼 입력값이 유지됩니다. 초기화는 명시적으로 처리하고, DOM은 보이는 요소만 검사합니다.
- hydration 불일치를 막기 위해 날짜는 시간대를 고정한 `lib/format.ts`로 표시하고, 브라우저에서만 아는 값은 `hooks/use-mounted.ts`로 마운트 후 표시합니다.
- `app/error.tsx`는 `reset`이 아닌 `retry` prop을 씁니다.

## UI

`components/ui/`는 shadcn `base-nova` 프리셋이며 Radix가 아닌 Base UI 기반입니다.

- 다른 요소로 렌더링할 때는 `asChild`가 아닌 `render` prop을 씁니다. 버튼 모양 링크는 `<Link className={buttonVariants()}>`입니다.
- 클래스 병합은 `lib/utils.ts`의 `cn`을 씁니다. `clsx`와 `tailwind-merge`를 대체하므로 추가하지 않습니다.
- Tailwind CSS 4라 `tailwind.config`가 없고 테마는 `app/globals.css`에서 관리합니다.
- 아이콘은 lucide-react의 `XxxIcon`을 개별 import합니다. 버튼 안 아이콘에는 `data-icon="inline-start|inline-end"`를, 아이콘만 있는 버튼에는 버튼에 `aria-label`을 지정합니다.

### 터치 대상 44px

`button`, `input`, `checkbox`, `tabs`, `DropdownMenuItem`은 44px 이상으로 수정되어 있습니다.

- `DropdownMenuSubTrigger`, `DropdownMenuCheckboxItem`, `DropdownMenuRadioItem`은 미수정이므로 사용할 때 `min-h-11`을 추가합니다.
- 새 컴포넌트의 클릭 영역도 `h-11` 또는 `min-h-11` 이상으로 맞춥니다.
- `npx shadcn@latest add`가 기존 파일 덮어쓰기를 물으면 거부합니다. 비대화형 실행에서는 `n`을 입력으로 넘깁니다. `--overwrite`를 쓰면 이 수정이 사라집니다.

## 상태 관리

요청 간 상태가 섞이지 않도록 전역 Zustand 스토어를 만들지 않고, 서버 컴포넌트에서 스토어를 쓰지 않습니다. `stores/todo-store.ts`와 `stores/todo-store-provider.ts`를 따릅니다.

1. `zustand/vanilla`의 `createStore`로 스토어 팩토리를 만듭니다.
2. `stores/create-store-context.tsx`의 `createStoreContext`로 Provider와 훅을 만듭니다.
3. `persist`는 `skipHydration: true`로 두고 저장값을 `merge`에서 검증합니다.

## 폼

shadcn `form`을 쓰지 않습니다. `schemas/`의 Zod 스키마, `zodResolver`, RHF `Controller`, `components/ui/field.tsx`의 `Field`, `FieldError`를 조합합니다. 기준 예제는 `app/examples/contact-form/_components/contact-form.tsx`입니다.

서버 검증은 `app/examples/server-action/`처럼 `useActionState`와 서버 액션을 쓰고, 액션 안에서 Zod로 다시 검증합니다.

## 구조

- 라우트 전용 컴포넌트는 해당 라우트의 `_components/`에 둡니다.
- 예제는 `config/examples.ts`에 등록하면 첫 페이지, `/examples` 목록, `components/common/example-shell.tsx`에 반영됩니다. 경로는 상위 경로 404가 생기지 않게 `/examples/<이름>` 한 단계로 유지합니다.
