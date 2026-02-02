import { useCurrentUserQuery } from "@/features/auth/hooks/auth.hooks";
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
  deleteCartProduct,
  getCartProductsUser,
  purchaseCartFn,
  updateCartProduct,
} from "../server/cart.server";
import { getCartQueryOptions } from "../queries/cart.queries";
import { getPurchasesQueryOptions } from "@/features/purchases/queries/purchases.types";
import { getUserPurchases } from "@/features/purchases/server/purchases.server";

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
  const { data: user } = useCurrentUserQuery();

  const deleteCartFn = useServerFn(deleteCartProduct);

  return useMutation({
    mutationFn: async (productInCartId: number) => {
      return await deleteCartFn({ data: { productInCartId } });
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

export const usePurchaseCartMutation = () => {
  const setIsLoading = useAppStore((state) => state.setIsLoading);
  const queryClient = useQueryClient();
  const { data: user } = useCurrentUserQuery();

  const purchaseFn = useServerFn(purchaseCartFn);

  return useMutation({
    mutationFn: async (data: PurchaseCart) => {
      return await purchaseFn({ data });
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
      queryClient.invalidateQueries({
        queryKey: getPurchasesQueryOptions(getUserPurchases).queryKey,
      });
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
        const res = await serverFn();

        if (Array.isArray(res)) {
          return res;
        }

        return [];
      },
      userId: user?.id,
    }),
  );
}
