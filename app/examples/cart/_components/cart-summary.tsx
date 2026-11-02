"use client";

import { ShoppingCartIcon, Trash2Icon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { formatWon } from "@/lib/format";
import { selectTotalPrice, selectTotalQuantity } from "@/stores/cart-store";
import { useCartStore } from "@/stores/cart-store-provider";

export function CartSummary() {
  const totalQuantity = useCartStore(selectTotalQuantity);
  const totalPrice = useCartStore(selectTotalPrice);
  const clear = useCartStore((state) => state.clear);

  return (
    <div className="flex flex-col gap-3 rounded-lg bg-muted/50 p-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3">
        <ShoppingCartIcon className="size-5 text-muted-foreground" />
        <p aria-live="polite">
          총 <span className="font-medium tabular-nums">{totalQuantity}</span>개
          ·{" "}
          <span className="font-semibold tabular-nums">
            {formatWon(totalPrice)}
          </span>
        </p>
      </div>
      <Button variant="ghost" disabled={totalQuantity === 0} onClick={clear}>
        <Trash2Icon data-icon="inline-start" />
        비우기
      </Button>
    </div>
  );
}
