import { create } from 'zustand'

type Theme = 'light' | 'dark'

type UIState = {
  theme: Theme
  setTheme: (t: Theme) => void
  toggleTheme: () => void
}

export const useUIStore = create<UIState>((set) => ({
  theme: 'light',
  setTheme: (t) => set({ theme: t }),
  toggleTheme: () => set((s) => ({ theme: s.theme === 'light' ? 'dark' : 'light' }))
}))
