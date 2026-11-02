import { persist } from "zustand/middleware";
import { createStore } from "zustand/vanilla";

export type CounterStore = {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
};

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
        // 브라우저 저장값은 변조되거나 이전 형식일 수 있으므로 검증 후 복원한다.
        merge: (persisted, current) => {
          const count = (persisted as { count?: unknown } | null | undefined)
            ?.count;
          return typeof count === "number" && Number.isFinite(count)
            ? { ...current, count }
            : current;
        },
      },
    ),
  );
