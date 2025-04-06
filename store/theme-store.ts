import { create } from "zustand";
import { persist } from "zustand/middleware";

type ThemeState = {
  backgroundTheme: string;
  setTheme: (theme: string) => void;
};

export const useThemeStore = create<ThemeState>((set) => ({
  backgroundTheme: "/themes/snowy-winter-cabin.jpg",
  setTheme: (theme: string) => set({ backgroundTheme: theme }),
}));
