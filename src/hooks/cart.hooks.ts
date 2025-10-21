import { useGetCartQuery } from "@/store/slices/cart.slice";

export function useGetCart() {
  const cart = useGetCartQuery();

  const data = cart.isError ? [] : cart.data?.data.cart.productInCarts || [];
  return { ...cart, data };
}
