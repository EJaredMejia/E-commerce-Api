import { getCategoriesQueryOptions } from "@/features/categories/queries/categories.queries";
import { getProductsQueryOptions } from "@/features/products/queries/products.queries";
import { getAllProducts } from "@/features/products/server/products.server";
import { useAppStore } from "@/store/app.store";
import {
  Query,
  QueryClient,
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
  return !query.queryKey.some(
    (key) =>
      key === getCategoriesQueryOptions(getAllCategories).queryKey[0] ||
      key === getProductsQueryOptions(getAllProducts).queryKey[0],
  );
}

function removeQueries(queryClient: QueryClient) {
  // remove for potentially showing info of another user
  queryClient.removeQueries({
    predicate: predicateRemoveQueries,
  });
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
      return logoutFn();
    },
    onMutate: () => {
      setIsLoading(true);
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
  const createUserFn = useServerFn(createUser);

  return useMutation({
    mutationFn: async (body: CreateUserPayload) => {
      setIsLoading(true);
      try {
        return await createUserFn({ data: body });
      } finally {
        setIsLoading(false);
      }
    },
  });
};

export function useCurrentUserQuery() {
  return useSuspenseQuery(getCurrentUserQueryOptions());
}
