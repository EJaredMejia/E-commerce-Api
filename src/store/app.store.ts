import { create } from "zustand";

interface AppState {
  isLoading: boolean;
  loginMessage: string;
  setIsLoading: (isLoading: boolean) => void;
  setIsMessage: (loginMessage: string) => void;
}

export const useAppStore = create<AppState>((set) => ({
  isLoading: false,
  loginMessage: "",
  setIsLoading: (isLoading) => set({ isLoading }),
  setIsMessage: (loginMessage) => set({ loginMessage }),
}));
