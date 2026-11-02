import { persist } from "zustand/middleware";
import { createStore } from "zustand/vanilla";

export type CounterStore = {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
};

// 서버의 동시 요청 간에 상태가 섞이지 않도록 전역 스토어 대신 팩토리로 생성한다.
// 서버와 첫 클라이언트 렌더링 결과를 맞추기 위해 복원은 마운트 후 Provider에서 실행한다.
export const createCounterStore = () =>
  createStore<CounterStore>()(
    persist(
      (set) => ({
        count: 0,
        increment: () => set((state) => ({ count: state.count + 1 })),
        decrement: () => set((state) => ({ count: state.count - 1 })),
        reset: () => set({ count: 0 }),
      }),
      {
        name: "counter-storage",
        skipHydration: true,
      },
    ),
  );

export type CounterStoreApi = ReturnType<typeof createCounterStore>;
