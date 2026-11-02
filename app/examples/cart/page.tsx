import type { Metadata } from "next";

import { ExampleShell } from "@/components/common/example-shell";
import { getExample } from "@/config/examples";
import { CartStoreProvider } from "@/stores/cart-store-provider";

import { CartSummary } from "./_components/cart-summary";
import { ProductList } from "./_components/product-list";

const href = "/examples/cart";

export const metadata: Metadata = { title: getExample(href).title };

export default function CartExamplePage() {
  return (
    <ExampleShell href={href}>
      <CartStoreProvider>
        <div className="flex flex-col gap-6">
          <ProductList />
          <CartSummary />
        </div>
      </CartStoreProvider>
    </ExampleShell>
  );
}
