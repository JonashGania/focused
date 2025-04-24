"use client";

import { useCallback, useEffect, useState, useRef } from "react";

type TimerMode = "focus" | "break";

const focusTime = 25;
const breakTime = 5;

export const useTimer = () => {
  const [mode, setMode] = useState<TimerMode>("focus");
  const [timeLeft, setTimeLeft] = useState(focusTime * 60);
  const [totalTime, setTotalTime] = useState(focusTime * 60);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [sessions, setSessions] = useState(0);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const expectedEndTimeRef = useRef<number | null>(null);

  const getDuration = useCallback((timerMode: TimerMode) => {
    return timerMode === "focus" ? focusTime * 60 : breakTime * 60;
  }, []);

  const toggleTimer = useCallback(() => {
    setIsActive((prev) => {
      if (!prev) {
        expectedEndTimeRef.current = Date.now() + timeLeft * 1000;
      }
      return !prev;
    });
  }, [timeLeft]);

  const resetTimer = useCallback(() => {
    setIsActive(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
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
      intervalRef.current = null;
    }

    setTimeLeft(getDuration(newMode));
    setTotalTime(getDuration(newMode));
    setIsActive(false);
    expectedEndTimeRef.current = null;
  }, [mode, getDuration]);

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
            const audio = new Audio("/alert/shine.mp3");
            audio.play().catch((e) => console.error("Error playing", e));
          } catch (error) {
            console.error("Error playing sound", error);
          }

          if (mode === "focus") {
            if (mode === "focus") {
              setSessions((prev) => prev + 1);
            }
          }

          switchMode();
        }
      }, 100);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isActive, mode, timeLeft, switchMode]);

  const progress =
    Math.max(0, Math.min(100, ((totalTime - timeLeft) / totalTime) * 100)) || 0;

  // const toggleTimer = () => {
  //   setIsActive((prev) => !prev);
  // };

  // const resetTimer = () => {
  //   setIsActive(false);
  //   setTimeLeft(getDuration(mode));
  // };

  // const switchMode = useCallback(() => {
  //   const newMode = mode === "focus" ? "break" : "focus";
  //   setMode(newMode);
  //   setTimeLeft(getDuration(newMode));
  //   setTotalTime(getDuration(newMode));
  //   setIsActive(false);
  // }, [mode, getDuration]);

  // useEffect(() => {
  //   let interval: NodeJS.Timeout | null = null;
  //   const startTime = Date.now();
  //   const expectedEndTime = startTime + timeLeft * 1000;

  //   if (isActive) {
  //     interval = setInterval(() => {
  //       const now = Date.now();
  //       const remaining = Math.max(
  //         0,
  //         Math.round((expectedEndTime - now) / 1000)
  //       );

  //       setTimeLeft(remaining);

  //       // setTimeLeft((prev) => {
  //       //   if (prev <= 1) {
  //       //     clearInterval(interval!);

  //       //     try {
  //       //       const audio = new Audio("/sounds/shine.mp3");
  //       //       audio.play().catch((e) => console.error("Error playing", e));
  //       //     } catch (error) {
  //       //       console.error("Error playing sound", error);
  //       //     }
  //       //   }
  //       //   return prev - 1;
  //       // });

  //       if (remaining === 0) {
  //         clearInterval(interval!);
  //         try {
  //           const audio = new Audio("/sounds/shine.mp3");
  //           audio.play().catch((e) => console.error("Error playing", e));
  //         } catch (error) {
  //           console.error("Error playing sound", error);
  //         }
  //       }
  //     }, 1000);
  //   } else if (interval) {
  //     clearInterval(interval);
  //   }

  //   return () => {
  //     if (interval) clearInterval(interval);
  //   };
  // }, [isActive, timeLeft]);

  // useEffect(() => {
  //   if (timeLeft === 0) {
  //     switchMode();

  //     if (mode === "focus") {
  //       setSessions((prev) => prev + 1);
  //     }
  //   }
  // }, [timeLeft, switchMode, mode]);

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
