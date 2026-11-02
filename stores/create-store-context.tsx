"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { useStore, type StoreApi } from "zustand";

type AppStore<TState> = StoreApi<TState> & {
  persist?: { rehydrate: () => Promise<void> | void };
};

// 서버의 동시 요청 간에 상태가 섞이지 않도록 스토어를 Provider마다 하나씩 생성한다.
export function createStoreContext<TState>(
  createStore: () => AppStore<TState>,
  storeName: string,
) {
  const StoreContext = createContext<AppStore<TState> | null>(null);

  function StoreProvider({ children }: { children: ReactNode }) {
    const [store] = useState(createStore);

    // 서버와 첫 클라이언트 렌더링 결과를 맞추기 위해 복원은 마운트 후에 실행한다.
    useEffect(() => {
      void store.persist?.rehydrate();
    }, [store]);

    return (
      <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
    );
  }

  function useBoundStore<T>(selector: (state: TState) => T): T {
    const store = useContext(StoreContext);

    if (!store) {
      throw new Error(`${storeName} Provider 안에서 사용해야 합니다.`);
    }

    return useStore(store, selector);
  }

  return { StoreProvider, useBoundStore };
}
