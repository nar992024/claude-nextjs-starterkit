import { z } from "zod";
import { persist } from "zustand/middleware";
import { createStore } from "zustand/vanilla";

const todoSchema = z.object({
  id: z.number().int(),
  title: z.string(),
  completed: z.boolean(),
});

export type Todo = z.infer<typeof todoSchema>;
export type TodoFilter = "all" | "active" | "completed";

export type TodoStore = {
  todos: Todo[];
  filter: TodoFilter;
  addTodo: (title: string) => void;
  toggleTodo: (id: number) => void;
  removeTodo: (id: number) => void;
  clearCompleted: () => void;
  setFilter: (filter: TodoFilter) => void;
};

const persistedTodoSchema = z.object({ todos: z.array(todoSchema) });

export const createTodoStore = () =>
  createStore<TodoStore>()(
    persist(
      (set) => ({
        todos: [],
        filter: "all",
        addTodo: (title) =>
          set((state) => ({
            todos: [
              ...state.todos,
              {
                id: Math.max(0, ...state.todos.map((todo) => todo.id)) + 1,
                title,
                completed: false,
              },
            ],
          })),
        toggleTodo: (id) =>
          set((state) => ({
            todos: state.todos.map((todo) =>
              todo.id === id ? { ...todo, completed: !todo.completed } : todo,
            ),
          })),
        removeTodo: (id) =>
          set((state) => ({
            todos: state.todos.filter((todo) => todo.id !== id),
          })),
        clearCompleted: () =>
          set((state) => ({
            todos: state.todos.filter((todo) => !todo.completed),
          })),
        setFilter: (filter) => set({ filter }),
      }),
      {
        name: "todo-storage",
        skipHydration: true,
        // 필터는 화면 상태이므로 할 일 목록만 저장한다.
        partialize: (state) => ({ todos: state.todos }),
        // 브라우저 저장값은 변조되거나 이전 형식일 수 있으므로 검증 후 복원한다.
        merge: (persisted, current) => {
          const result = persistedTodoSchema.safeParse(persisted);
          return result.success
            ? { ...current, todos: result.data.todos }
            : current;
        },
      },
    ),
  );
