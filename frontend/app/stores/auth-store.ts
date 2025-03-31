import { create } from 'zustand';

interface AuthStore {
    isConnected: boolean;
    setIsConnected: (status: boolean) => void;
}

const useAuthStore = create<AuthStore>((set) => ({
    isConnected: false,
    setIsConnected: (status: boolean) => set({ isConnected: status }),
}));

export default useAuthStore;