"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { useStore } from "zustand";

import {
  createCounterStore,
  type CounterStore,
  type CounterStoreApi,
} from "@/stores/counter-store";

const CounterStoreContext = createContext<CounterStoreApi | null>(null);

export function CounterStoreProvider({ children }: { children: ReactNode }) {
  const [store] = useState(createCounterStore);

  useEffect(() => {
    void store.persist.rehydrate();
  }, [store]);

  return (
    <CounterStoreContext.Provider value={store}>
      {children}
    </CounterStoreContext.Provider>
  );
}

export function useCounterStore<T>(selector: (state: CounterStore) => T): T {
  const store = useContext(CounterStoreContext);

  if (!store) {
    throw new Error(
      "useCounterStore는 CounterStoreProvider 안에서 사용해야 합니다.",
    );
  }

  return useStore(store, selector);
}
