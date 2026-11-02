"use client";

import { MinusIcon, PlusIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { formatWon } from "@/lib/format";
import { products, type Product } from "@/stores/cart-store";
import { useCartStore } from "@/stores/cart-store-provider";

function ProductRow({ product }: { product: Product }) {
  const quantity = useCartStore((state) => state.quantities[product.id] ?? 0);
  const addItem = useCartStore((state) => state.addItem);
  const decreaseItem = useCartStore((state) => state.decreaseItem);

  return (
    <li className="flex items-center justify-between gap-3 py-2">
      <div className="min-w-0">
        <p className="font-medium">{product.name}</p>
        <p className="text-sm text-muted-foreground">
          {formatWon(product.price)}
        </p>
      </div>
      <div className="flex shrink-0 items-center gap-1">
        <Button
          variant="outline"
          size="icon"
          aria-label={`${product.name} 수량 줄이기`}
          disabled={quantity === 0}
          onClick={() => decreaseItem(product.id)}
        >
          <MinusIcon />
        </Button>
        <span
          aria-label={`${product.name} 수량`}
          className="w-8 text-center tabular-nums"
        >
          {quantity}
        </span>
        <Button
          variant="outline"
          size="icon"
          aria-label={`${product.name} 수량 늘리기`}
          onClick={() => addItem(product.id)}
        >
          <PlusIcon />
        </Button>
      </div>
    </li>
  );
}

export function ProductList() {
  return (
    <ul className="flex flex-col divide-y">
      {products.map((product) => (
        <ProductRow key={product.id} product={product} />
      ))}
    </ul>
  );
}
