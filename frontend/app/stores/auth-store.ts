import { create } from "zustand";

export type AuthState = { isConnected: boolean; username: string | null };

interface AuthStore {
  authState: AuthState;
  setAuthState: (authState: AuthState) => void;
}

const useAuthStore = create<AuthStore>((set) => ({
  authState: {
    isConnected: false,
    username: null,
  },
  setAuthState: (authState: {
    isConnected: boolean;
    username: string | null;
  }) => set({ authState }),
}));

export default useAuthStore;
