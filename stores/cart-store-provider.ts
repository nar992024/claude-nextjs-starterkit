"use client";

import { createCartStore } from "@/stores/cart-store";
import { createStoreContext } from "@/stores/create-store-context";

export const { StoreProvider: CartStoreProvider, useBoundStore: useCartStore } =
  createStoreContext(createCartStore, "CartStore");
