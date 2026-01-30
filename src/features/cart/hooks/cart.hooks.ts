import { useCurrentUserQuery } from "@/features/auth/hooks/auth.hooks";
import { api } from "@/services/api";
import { useAppStore } from "@/store/app.store";
import type { PurchaseCart } from "@/types/cart.types";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import {
  addProductToCart,
  getCartProductsUser,
  updateCartProduct,
} from "../server/cart.server";
import { getCartQueryOptions } from "../queries/cart.queries";

export const useAddCartProductMutation = () => {
  const setIsLoading = useAppStore((state) => state.setIsLoading);
  const queryClient = useQueryClient();
  const { data: user } = useCurrentUserQuery();

  const addProductFn = useServerFn(addProductToCart);

  return useMutation({
    mutationFn: async (body: Parameters<typeof addProductFn>[0]["data"]) => {
      return await addProductFn({ data: body });
    },
    onMutate: () => {
      setIsLoading(true);
    },
    onSettled: () => {
      setIsLoading(false);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: getCartQueryOptions({
          queryFn: getCartProductsUser,
          userId: user?.id,
        }).queryKey,
      });
    },
  });
};

export const useUpdateCartMutation = () => {
  const setIsLoading = useAppStore((state) => state.setIsLoading);
  const queryClient = useQueryClient();
  const { data: user } = useCurrentUserQuery();

  const updateCartFn = useServerFn(updateCartProduct);

  return useMutation({
    mutationFn: async (data: Parameters<typeof updateCartFn>[0]["data"]) => {
      return await updateCartFn({ data });
    },
    onMutate: () => {
      setIsLoading(true);
    },
    onSettled: () => {
      setIsLoading(false);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: getCartQueryOptions({
          queryFn: getCartProductsUser,
          userId: user?.id,
        }).queryKey,
      });
    },
  });
};

export const useDeleteCartMutation = () => {
  const setIsLoading = useAppStore((state) => state.setIsLoading);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      setIsLoading(true);
      try {
        await api.delete(`/cart/${id}`);
      } finally {
        setIsLoading(false);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
};

export const usePurchaseCartMutation = () => {
  const setIsLoading = useAppStore((state) => state.setIsLoading);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (body: PurchaseCart) => {
      setIsLoading(true);
      try {
        await api.post("/cart/purchase", body);
      } finally {
        setIsLoading(false);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      queryClient.invalidateQueries({ queryKey: ["purchases"] });
      alert("your purchase was Successful");
    },
  });
};

export function useCartUserSuspenseQuery() {
  const { data: user } = useCurrentUserQuery();

  const serverFn = useServerFn(getCartProductsUser);
  return useSuspenseQuery(
    getCartQueryOptions({
      queryFn: async () => {
        return await serverFn();
      },
      userId: user?.id,
    }),
  );
}
