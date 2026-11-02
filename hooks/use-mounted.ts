import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

// 브라우저에서만 알 수 있는 값을 hydration 이후에 표시할 때 사용한다.
export function useMounted() {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}
