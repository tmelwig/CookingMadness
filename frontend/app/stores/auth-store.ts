import { toast } from 'sonner';
import { create } from 'zustand';

export type AuthState = { isConnected: boolean; username: string | null };

interface AuthStore {
  authState: AuthState;
  setAuthState: (authState: AuthState) => void;
  connect: (token: string) => void;
  disconnect: () => void;
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
  connect: (token: string) => {
    localStorage.setItem('token', token);
    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    const username = decodedToken.username;
    set({ authState: { isConnected: true, username: username } });
    const expirationTime = decodedToken.exp * 1000 - Date.now();
    setTimeout(() => {
      localStorage.removeItem('token');
      set({ authState: { isConnected: false, username: null } });
      toast.error('Votre session a expiré. Veuillez vous reconnecter.');
    }, expirationTime / 2);
  },
  disconnect: () => {
    localStorage.removeItem('token');
    set({ authState: { isConnected: false, username: null } });
  },
}));

export default useAuthStore;
