"use client";

import { useCallback, useEffect, useState } from "react";

type TimerMode = "focus" | "break";

const focusTime = 25;
const breakTime = 5;

export const useTimer = () => {
  const [mode, setMode] = useState<TimerMode>("focus");
  const [timeLeft, setTimeLeft] = useState(focusTime * 60);
  const [totalTime, setTotalTime] = useState(focusTime * 60);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [sessions, setSessions] = useState(0);

  const getDuration = useCallback((timerMode: TimerMode) => {
    return timerMode === "focus" ? focusTime * 60 : breakTime * 60;
  }, []);

  const toggleTimer = () => {
    setIsActive((prev) => !prev);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(getDuration(mode));
  };

  const switchMode = useCallback(() => {
    const newMode = mode === "focus" ? "break" : "focus";
    setMode(newMode);
    setTimeLeft(getDuration(newMode));
    setTotalTime(getDuration(newMode));
    setIsActive(false);
  }, [mode, getDuration]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(interval!);

            try {
              const audio = new Audio("/sounds/shine.mp3");
              audio.play().catch((e) => console.error("Error playing", e));
            } catch (error) {
              console.error("Error playing sound", error);
            }
          }
          return prev - 1;
        });
      }, 1000);
    } else if (interval) {
      clearInterval(interval);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive]);

  useEffect(() => {
    if (timeLeft === 0) {
      switchMode();

      if (mode === "focus") {
        setSessions((prev) => prev + 1);
      }
    }
  }, [timeLeft, switchMode, mode]);

  return {
    mode,
    timeLeft,
    totalTime,
    toggleTimer,
    resetTimer,
    switchMode,
    isActive,
    sessions,
  };
};
