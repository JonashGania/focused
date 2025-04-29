import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type PomodoroState = {
  focusTimer: number;
  breakTimer: number;
  alertSound: string;
  alertVolume: number;
  setFocusTimer: (time: number) => void;
  setBreakTimer: (time: number) => void;
  setAlertSound: (sound: string) => void;
  setAlertVolume: (volume: number) => void;
};

export const usePomodoroStore = create<PomodoroState>()(
  persist(
    (set) => ({
      focusTimer: 25,
      breakTimer: 5,
      alertSound: "shine",
      alertVolume: 0.5,
      setFocusTimer: (time: number) => set({ focusTimer: time }),
      setBreakTimer: (time: number) => set({ breakTimer: time }),
      setAlertSound: (sound: string) => set({ alertSound: sound }),
      setAlertVolume: (volume: number) => set({ alertVolume: volume }),
    }),
    {
      name: "focusd-pomodoro-settings",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
