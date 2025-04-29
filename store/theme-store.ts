import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type ThemeState = {
  backgroundTheme: string;
  setTheme: (theme: string) => void;
};

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      backgroundTheme: "snowy-winter-cabin",
      setTheme: (theme: string) => set({ backgroundTheme: theme }),
    }),
    {
      name: "focusd-theme",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
