"use client";

import { PlusIcon, Trash2Icon } from "lucide-react";
import { useState, type FormEvent } from "react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import type { TodoFilter } from "@/stores/todo-store";
import { useTodoStore } from "@/stores/todo-store-provider";

const filters: { value: TodoFilter; label: string }[] = [
  { value: "all", label: "전체" },
  { value: "active", label: "진행 중" },
  { value: "completed", label: "완료" },
];

export function TodoList() {
  const [title, setTitle] = useState("");
  const todos = useTodoStore((state) => state.todos);
  const filter = useTodoStore((state) => state.filter);
  const addTodo = useTodoStore((state) => state.addTodo);
  const toggleTodo = useTodoStore((state) => state.toggleTodo);
  const removeTodo = useTodoStore((state) => state.removeTodo);
  const clearCompleted = useTodoStore((state) => state.clearCompleted);
  const setFilter = useTodoStore((state) => state.setFilter);

  const visibleTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });
  const hasCompleted = todos.some((todo) => todo.completed);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmedTitle = title.trim();
    if (!trimmedTitle) return;
    addTodo(trimmedTitle);
    setTitle("");
  }

  return (
    <div className="flex flex-col gap-4">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="할 일을 입력하세요"
          aria-label="새 할 일"
          autoComplete="off"
        />
        <Button type="submit" disabled={!title.trim()}>
          <PlusIcon data-icon="inline-start" />
          추가
        </Button>
      </form>

      <div className="flex flex-wrap gap-1" role="group" aria-label="목록 필터">
        {filters.map(({ value, label }) => (
          <Button
            key={value}
            variant={filter === value ? "secondary" : "ghost"}
            aria-pressed={filter === value}
            onClick={() => setFilter(value)}
          >
            {label}
          </Button>
        ))}
      </div>

      {visibleTodos.length === 0 ? (
        <p className="py-6 text-center text-sm text-muted-foreground">
          표시할 할 일이 없습니다.
        </p>
      ) : (
        <ul className="flex flex-col divide-y">
          {visibleTodos.map((todo) => (
            <li key={todo.id} className="flex items-center gap-1 py-1">
              <label className="flex min-h-11 min-w-0 flex-1 items-center gap-3 pl-1">
                <Checkbox
                  checked={todo.completed}
                  onCheckedChange={() => toggleTodo(todo.id)}
                />
                <span
                  className={
                    todo.completed
                      ? "break-words text-muted-foreground line-through"
                      : "break-words"
                  }
                >
                  {todo.title}
                </span>
              </label>
              <Button
                variant="ghost"
                size="icon"
                aria-label={`${todo.title} 삭제`}
                onClick={() => removeTodo(todo.id)}
              >
                <Trash2Icon />
              </Button>
            </li>
          ))}
        </ul>
      )}

      <div className="flex items-center justify-between gap-2 text-sm text-muted-foreground">
        <span>
          남은 할 일 {todos.filter((todo) => !todo.completed).length}개
        </span>
        <Button
          variant="ghost"
          disabled={!hasCompleted}
          onClick={clearCompleted}
        >
          완료 항목 삭제
        </Button>
      </div>
    </div>
  );
}
