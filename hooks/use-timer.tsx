"use client";

import { useCallback, useEffect, useState, useRef } from "react";
import { usePomodoroStore } from "@/store/pomodoro-store";

type TimerMode = "focus" | "break";

export const useTimer = () => {
  const focusTimer = usePomodoroStore((state) => state.focusTimer);
  const breakTimer = usePomodoroStore((state) => state.breakTimer);
  const alertSound = usePomodoroStore((state) => state.alertSound);
  const alertVolume = usePomodoroStore((state) => state.alertVolume);

  const [mode, setMode] = useState<TimerMode>("focus");
  const [timeLeft, setTimeLeft] = useState(focusTimer * 10);
  const [totalTime, setTotalTime] = useState(focusTimer * 10);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [sessions, setSessions] = useState(0);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const expectedEndTimeRef = useRef<number | null>(null);

  const getDuration = useCallback(
    (timerMode: TimerMode) => {
      return timerMode === "focus" ? focusTimer * 10 : breakTimer * 10;
    },
    [focusTimer, breakTimer]
  );

  const toggleTimer = useCallback(() => {
    setIsActive((prev) => {
      if (!prev) {
        if (timeLeft === 0 || expectedEndTimeRef.current == null) {
          const duration = getDuration(mode);
          setTimeLeft(duration);
          setTotalTime(duration);
          expectedEndTimeRef.current = Date.now() + duration * 1000;
        } else {
          expectedEndTimeRef.current = Date.now() + timeLeft * 1000;
        }
      }
      return !prev;
    });
  }, [mode, getDuration, timeLeft]);

  const resetTimer = useCallback(() => {
    setIsActive(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    const duration = getDuration(mode);
    setTimeLeft(duration);
    setTotalTime(duration);
    expectedEndTimeRef.current = null;
  }, [mode, getDuration]);

  const switchMode = useCallback(() => {
    const newMode = mode === "focus" ? "break" : "focus";
    setMode(newMode);

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    const duration = getDuration(newMode);
    setTimeLeft(duration);
    setTotalTime(duration);
    setIsActive(false);
    expectedEndTimeRef.current = null;
  }, [mode, getDuration]);

  useEffect(() => {
    const duration = getDuration(mode);
    setTimeLeft(duration);
    setTotalTime(duration);
  }, [focusTimer, breakTimer, mode, getDuration]);

  useEffect(() => {
    if (isActive) {
      if (expectedEndTimeRef.current === null) {
        expectedEndTimeRef.current = Date.now() + timeLeft * 1000;
      }

      intervalRef.current = setInterval(() => {
        const now = Date.now();
        const remaining = Math.max(
          0,
          Math.round((expectedEndTimeRef.current! - now) / 1000)
        );

        setTimeLeft(remaining);

        if (remaining === 0) {
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
          try {
            const audio = new Audio(`/alerts/${alertSound}.mp3`);
            audio.volume = alertVolume;
            audio.play();
          } catch (error) {
            console.error("Audio failed", error);
          }

          if (mode === "focus") {
            setSessions((prev) => prev + 1);
          }

          switchMode();
        }
      }, 100);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    return () => clearInterval(intervalRef.current!);
  }, [
    isActive,
    mode,
    timeLeft,
    switchMode,
    focusTimer,
    breakTimer,
    alertSound,
    alertVolume,
  ]);

  const progress =
    Math.max(0, Math.min(100, ((totalTime - timeLeft) / totalTime) * 100)) || 0;

  return {
    mode,
    timeLeft,
    totalTime,
    toggleTimer,
    resetTimer,
    switchMode,
    isActive,
    sessions,
    progress,
  };
};
