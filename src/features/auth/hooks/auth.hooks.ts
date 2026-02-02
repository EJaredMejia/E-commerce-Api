import { getCategoriesQueryOptions } from "@/features/categories/queries/categories.queries";
import { getProductsQueryOptions } from "@/features/products/queries/products.queries";
import { getAllProducts } from "@/features/products/server/products.server";
import { useAppStore } from "@/store/app.store";
import {
  type Query,
  type QueryClient,
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { getCurrentUserQueryOptions } from "../queries/auth.queries";
import { createUser, login, logout } from "../server/auth.server";
import { getAllCategories } from "@/features/categories/server/categories.server";

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
}

function predicateRemoveQueries(query: Query) {
  const shouldRemove = !query.queryKey.some(
    (key) =>
      key === getCategoriesQueryOptions(getAllCategories).queryKey[0] ||
      key === getProductsQueryOptions(getAllProducts).queryKey[0],
  );
  return shouldRemove;
}

async function removeQueries(queryClient: QueryClient) {
  queryClient.invalidateQueries({
    predicate: predicateRemoveQueries,
  });
}

export const useLoginMutation = () => {
  const setIsLoading = useAppStore((state) => state.setIsLoading);

  const queryClient = useQueryClient();

  const navigate = useNavigate();
  const loginFn = useServerFn(login);
  return useMutation({
    mutationFn: async (body: LoginPayload) => {
      const user = await loginFn({ data: body });
      return user;
    },
    onMutate: () => {
      setIsLoading(true);
    },
    onSettled: () => {
      setIsLoading(false);
    },
    onSuccess: async () => {
      await removeQueries(queryClient);
      navigate({ to: "/" });
    },
  });
};

export const useLogoutMutation = () => {
  const setIsLoading = useAppStore((state) => state.setIsLoading);

  const queryClient = useQueryClient();

  const logoutFn = useServerFn(logout);
  return useMutation({
    mutationFn: async () => {
      return await logoutFn();
    },
    onMutate: () => {
      setIsLoading(true);
    },
    onSettled: () => {
      setIsLoading(false);
    },
    onSuccess: async () => {
      await removeQueries(queryClient);
    },
  });
};

export const useCreateUserMutation = () => {
  const setIsLoading = useAppStore((state) => state.setIsLoading);
  const createUserFn = useServerFn(createUser);

  return useMutation({
    mutationFn: async (body: CreateUserPayload) => {
      return await createUserFn({ data: body });
    },
    onMutate: () => {
      setIsLoading(true);
    },
    onSettled: () => {
      setIsLoading(false);
    },
  });
};

export function useCurrentUserQuery() {
  return useSuspenseQuery(getCurrentUserQueryOptions());
}
