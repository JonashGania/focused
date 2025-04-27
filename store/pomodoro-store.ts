import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type PomodoroState = {
  focusTimer: number;
  breakTimer: number;
  setFocusTimer: (time: number) => void;
  setBreakTimer: (time: number) => void;
};

export const usePomodoroStore = create<PomodoroState>()(
  persist(
    (set) => ({
      focusTimer: 25,
      breakTimer: 5,
      setFocusTimer: (time: number) => set({ focusTimer: time }),
      setBreakTimer: (time: number) => set({ breakTimer: time }),
    }),
    {
      name: "pomodoro-settings",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
