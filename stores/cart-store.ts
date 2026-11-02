import { createStore } from "zustand/vanilla";

export type Product = {
  id: string;
  name: string;
  price: number;
};

// 예제용 상품 데이터
export const products: Product[] = [
  { id: "notebook", name: "노트", price: 3000 },
  { id: "pen", name: "펜", price: 1500 },
  { id: "tumbler", name: "텀블러", price: 12000 },
];

export type CartStore = {
  // 상품 ID별 수량
  quantities: Record<string, number>;
  addItem: (id: string) => void;
  decreaseItem: (id: string) => void;
  clear: () => void;
};

export const selectTotalQuantity = (state: CartStore) =>
  Object.values(state.quantities).reduce((sum, quantity) => sum + quantity, 0);

export const selectTotalPrice = (state: CartStore) =>
  products.reduce(
    (sum, product) => sum + product.price * (state.quantities[product.id] ?? 0),
    0,
  );

// 저장 미들웨어 없이 메모리에만 유지하는 스토어 예제
export const createCartStore = () =>
  createStore<CartStore>()((set) => ({
    quantities: {},
    addItem: (id) =>
      set((state) => ({
        quantities: {
          ...state.quantities,
          [id]: (state.quantities[id] ?? 0) + 1,
        },
      })),
    decreaseItem: (id) =>
      set((state) => {
        const { [id]: quantity = 0, ...rest } = state.quantities;
        return {
          quantities: quantity > 1 ? { ...rest, [id]: quantity - 1 } : rest,
        };
      }),
    clear: () => set({ quantities: {} }),
  }));
