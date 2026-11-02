"use client";

import { MinusIcon, PlusIcon, RotateCcwIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useCounterStore } from "@/stores/counter-store-provider";

export function Counter() {
  const count = useCounterStore((state) => state.count);
  const increment = useCounterStore((state) => state.increment);
  const decrement = useCounterStore((state) => state.decrement);
  const reset = useCounterStore((state) => state.reset);

  return (
    <div className="flex flex-col items-center gap-6">
      <output
        aria-live="polite"
        aria-label="현재 값"
        className="text-6xl font-bold tabular-nums"
      >
        {count}
      </output>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          aria-label="1 감소"
          onClick={decrement}
        >
          <MinusIcon />
        </Button>
        <Button size="icon" aria-label="1 증가" onClick={increment}>
          <PlusIcon />
        </Button>
        <Button variant="ghost" onClick={reset}>
          <RotateCcwIcon data-icon="inline-start" />
          초기화
        </Button>
      </div>
    </div>
  );
}
