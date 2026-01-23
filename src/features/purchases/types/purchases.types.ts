import type { Product } from "@/features/products/types/products.types";

export interface Purchase {
  id: number;
  createdAt: string;
  cart: {
    id: number;
    productInCarts: {
      id: number;
      quantity: number;
      product: Product;
    }[];
  };
}

export interface PurchasesResponse {
  data: {
    orders: Purchase[];
  };
}
