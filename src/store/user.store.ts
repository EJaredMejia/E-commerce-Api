import { create } from "zustand";
import { getLocalStorageUser } from "@/utils/storage";

interface User {
  user: {
    firstName: string;
    lastName: string;
  };
}

interface UserState {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: getLocalStorageUser(),
  setUser: (user) => {
    localStorage.setItem("user", JSON.stringify(user));
    set({ user });
  },
  logout: () => {
    localStorage.removeItem("user");
    set({ user: null });
  },
}));
