"use client";

import { createCounterStore } from "@/stores/counter-store";
import { createStoreContext } from "@/stores/create-store-context";

export const {
  StoreProvider: CounterStoreProvider,
  useBoundStore: useCounterStore,
} = createStoreContext(createCounterStore, "CounterStore");
