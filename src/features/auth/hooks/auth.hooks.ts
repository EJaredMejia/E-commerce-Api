import { useMutation } from "@tanstack/react-query";
import api from "@/services/api";
import { useAppStore } from "@/store/app.store";

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

  return useMutation({
    mutationFn: async (body: LoginPayload) => {
      setIsLoading(true);
      try {
        const res = await api.post("/users/login", body);
        localStorage.setItem("user", JSON.stringify(res.data.data));
        return res.data;
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
