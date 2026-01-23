import api from "@/services/api";
import { useAppStore } from "@/store/app.store";
import type { PurchaseCart } from "@/types/cart.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useAddCartProductMutation = () => {
  const setIsLoading = useAppStore((state) => state.setIsLoading);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (body: { productId: number; quantity: number }) => {
      setIsLoading(true);
      try {
        await api.post("/cart/add-product", body);
      } finally {
        setIsLoading(false);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
};

export const useUpdateCartMutation = () => {
  const setIsLoading = useAppStore((state) => state.setIsLoading);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (body: { productId: number; newQty: number }) => {
      setIsLoading(true);
      try {
        await api.patch("/cart/update-cart", body);
      } finally {
        setIsLoading(false);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
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
