import { create } from "zustand";
import { ALL_PRODUCTS } from "@/constants/products.constants";

interface FiltersState {
  category: typeof ALL_PRODUCTS | number;
  price: {
    from: number;
    to: number;
  };
  setCategory: (category: FiltersState["category"]) => void;
  setPrice: (price: Partial<FiltersState["price"]>) => void;
}

export const useFiltersStore = create<FiltersState>((set) => ({
  category: ALL_PRODUCTS,
  price: { from: Number.NEGATIVE_INFINITY, to: Number.POSITIVE_INFINITY },
  setCategory: (category) => set({ category }),
  setPrice: (newPrice) =>
    set((state) => ({
      price: { ...state.price, ...newPrice },
    })),
}));
