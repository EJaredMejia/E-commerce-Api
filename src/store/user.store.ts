import type { getCurrentUser } from "@/features/auth/server/auth.server";
import { create } from "zustand";

type User = Awaited<ReturnType<typeof getCurrentUser>>;

interface UserState {
  user: User;
  setUser: (user: User) => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => {
    set({ user });
  },
}));
