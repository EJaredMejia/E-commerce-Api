import { getCategoriesQueryOptions } from "@/features/categories/queries/categories.queries";
import { getProductsQueryOptions } from "@/features/products/queries/products.queries";
import { getAllProducts } from "@/features/products/server/products.server";
import { api } from "@/services/api";
import { useAppStore } from "@/store/app.store";
import {
  QueryClient,
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { getCurrentUserQueryOptions } from "../queries/auth.queries";
import { login, logout } from "../server/auth.server";

interface LoginPayload {
  email: string;
  password: string;
}

interface CreateUserPayload {
  name: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  role: "normal";
}

function removeQueries(queryClient: QueryClient) {
  queryClient.removeQueries({
    predicate: (query) =>
      !query.queryKey.some(
        (key) =>
          key === getCategoriesQueryOptions().queryKey[0] ||
          key === getProductsQueryOptions(getAllProducts).queryKey[0],
      ),
  });
}

export const useLoginMutation = () => {
  const setIsLoading = useAppStore((state) => state.setIsLoading);

  const queryClient = useQueryClient();

  const navigate = useNavigate();
  const loginFn = useServerFn(login);
  return useMutation({
    mutationFn: async (body: LoginPayload) => {
      setIsLoading(true);
      try {
        const user = await loginFn({ data: body });
        return user;
      } finally {
        setIsLoading(false);
      }
    },
    onSuccess: () => {
      removeQueries(queryClient);
      navigate({ to: "/" });
    },
  });
};

export const useLogoutMutation = () => {
  const setIsLoading = useAppStore((state) => state.setIsLoading);

  const queryClient = useQueryClient();

  const logoutFn = useServerFn(logout);
  return useMutation({
    mutationFn: () => {
      setIsLoading(true);
      return logoutFn();
    },
    onSettled: () => {
      setIsLoading(false);
    },
    onSuccess: () => {
      removeQueries(queryClient);
    },
  });
};

// TODO create signup
export const useCreateUserMutation = () => {
  const setIsLoading = useAppStore((state) => state.setIsLoading);

  return useMutation({
    mutationFn: async (body: CreateUserPayload) => {
      setIsLoading(true);
      try {
        const res = await api.post("/users", body);
        return res.data;
      } finally {
        setIsLoading(false);
      }
    },
  });
};

export function useCurrentUserQuery() {
  return useSuspenseQuery(getCurrentUserQueryOptions());
}
