import { useMutation } from "@tanstack/react-query";
import api from "@/services/api";
import { useAppStore } from "@/store/app.store";
import { useUserStore } from "@/store/user.store";
import { useServerFn } from "@tanstack/react-start";
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

export const useLoginMutation = () => {
  const setIsLoading = useAppStore((state) => state.setIsLoading);
  const setUser = useUserStore((state) => state.setUser);

  const loginFn = useServerFn(login);
  return useMutation({
    mutationFn: async (body: LoginPayload) => {
      setIsLoading(true);
      try {
        const user = await loginFn({ data: body });
        setUser(user);
        return user;
      } finally {
        setIsLoading(false);
      }
    },
  });
};

export const useLogoutMutation = () => {
  const setIsLoading = useAppStore((state) => state.setIsLoading);
  const setUser = useUserStore((state) => state.setUser);

  const logoutFn = useServerFn(logout);
  return useMutation({
    mutationFn: async () => {
      setIsLoading(true);
      try {
        await logoutFn();
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    },
  });
};

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
