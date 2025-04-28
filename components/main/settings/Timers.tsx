"use client";

import React, { useEffect, useState } from "react";
import { usePomodoroStore } from "@/store/pomodoro-store";

const Timers = () => {
  const focusTimer = usePomodoroStore((state) => state.focusTimer);
  const breakTimer = usePomodoroStore((state) => state.breakTimer);
  const updateFocusTimer = usePomodoroStore((state) => state.setFocusTimer);
  const updateBreakTimer = usePomodoroStore((state) => state.setBreakTimer);

  const [focusInput, setFocusInput] = useState(focusTimer.toString());
  const [breakInput, setBreakInput] = useState(breakTimer.toString());

  useEffect(() => {
    setFocusInput(focusTimer.toString());
    setBreakInput(breakTimer.toString());
  }, [focusTimer, breakTimer]);

  const handleFocusBlur = () => {
    const parsedValue = parseInt(focusInput);
    const validValue =
      !isNaN(parsedValue) && parsedValue >= 0 ? parsedValue : 1;

    updateFocusTimer(validValue);
    setFocusInput(validValue.toString());
  };

  const handleBreakBlur = () => {
    const parsedValue = parseInt(breakInput);
    const validValue =
      !isNaN(parsedValue) && parsedValue >= 0 ? parsedValue : 1;

    updateBreakTimer(validValue);
    setBreakInput(validValue.toString());
  };

  return (
    <div>
      <h1 className="text-3xl text-white font-bold">Pomodoro Settings</h1>
      <h2 className="text-xl text-white font-bold mt-5">Timer Lengths</h2>
      <span className="text-neutral-400 font-base">
        Adjust your timer for maximum productivity.
      </span>
      <div className="flex mt-4 gap-6">
        <div className="flex flex-col space-y-1">
          <label htmlFor="focus-time" className="text-white text-lg">
            Focus
          </label>
          <div className="w-[115px] border-2 border-neutral-500 focus-within:border-white rounded-sm flex items-center justify-between gap-1 pl-2 pr-1 py-1.5">
            <input
              type="number"
              id="focus-time"
              min={1}
              max={1440}
              value={focusInput}
              onChange={(e) => setFocusInput(e.target.value)}
              onBlur={handleFocusBlur}
              className="flex-1 text-white outline-none timer-input max-w-[50px] w-full"
            />
            <span className="text-neutral-400 text-sm font-semibold mr-1">
              mins
            </span>
          </div>
        </div>
        <div className="flex flex-col space-y-1">
          <label htmlFor="break-time" className="text-white text-lg">
            Break
          </label>
          <div className="w-[115px] border-2 border-neutral-500 focus-within:border-white  rounded-sm flex items-center justify-between gap-1 pl-2 pr-1 py-1.5">
            <input
              type="number"
              id="break-time"
              min={1}
              max={1440}
              value={breakInput}
              onChange={(e) => setBreakInput(e.target.value)}
              onBlur={handleBreakBlur}
              className="flex-1 text-white outline-none timer-input  max-w-[50px] w-full"
            />
            <span className="text-neutral-400 text-sm font-semibold mr-1">
              mins
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timers;
