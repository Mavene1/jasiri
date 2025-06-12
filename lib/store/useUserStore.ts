// store/useUserStore.ts
import { create } from 'zustand';

type User = {
  name: string;
  email: string;
  role: string;
};

type Store = {
  user: User | null;
  setUser: (user: User) => void;
  logout: () => void;
};

export const useUserStore = create<Store>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  logout: () => set({ user: null }),
}));
