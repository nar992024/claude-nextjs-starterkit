"use client";

import { createStoreContext } from "@/stores/create-store-context";
import { createTodoStore } from "@/stores/todo-store";

export const { StoreProvider: TodoStoreProvider, useBoundStore: useTodoStore } =
  createStoreContext(createTodoStore, "TodoStore");
