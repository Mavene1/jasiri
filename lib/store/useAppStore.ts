import { create } from 'zustand';
import { createJSONStorage, persist, devtools } from 'zustand/middleware';
import type { User, Campaign, BlogPost } from '@/types';

interface AppState {
  // User state
  user: User | null;
  isAuthenticated: boolean;
  
  // Data state
  campaigns: Campaign[];
  blogPosts: BlogPost[];
  
  // UI state
  isLoading: boolean;
  error: string | null;
  
  // Actions
  setUser: (user: User | null) => void;
  logout: () => void;
  setCampaigns: (campaigns: Campaign[]) => void;
  setBlogPosts: (posts: BlogPost[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      // Initial state
      user: null,
      isAuthenticated: false,
      campaigns: [],
      blogPosts: [],
      isLoading: false,
      error: null,

      // Actions
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      logout: () => set({ user: null}),
      setCampaigns: (campaigns) => set({ campaigns }),
      setBlogPosts: (blogPosts) => set({ blogPosts }),
      setLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error }),
      clearError: () => set({ error: null }),
    }),
    {
      name: 'jasiri-store',
      storage: createJSONStorage(() => localStorage),
    }
  )
);