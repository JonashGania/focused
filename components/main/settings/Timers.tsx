"use client";

import React, { useEffect, useState } from "react";
import { usePomodoroStore } from "@/store/pomodoro-store";
import { Clock, Pause } from "lucide-react";

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
      <div className="flex items-center gap-4">
        <div className="p-2 bg-purple-500/20 rounded-md">
          <Clock size={20} className="text-purple-400" />
        </div>
        <h2 className="text-xl font-semibold text-white">Timer Lengths</h2>
      </div>
      <div className="flex mt-4 gap-6">
        <div className="flex flex-col space-y-2">
          <label htmlFor="focus-time" className="flex items-center gap-2">
            <Clock size={18} className="text-gray-200" />
            <span className="text-sm text-gray-200 font-medium">
              Focus Time
            </span>
          </label>
          <div className="w-[115px] bg-white/10 border border-white/20 rounded-lg focus-within:border-purple-500   flex items-center justify-between gap-1 px-3 py-3">
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
        <div className="flex flex-col space-y-2">
          <label htmlFor="break-time" className="flex items-center gap-2">
            <Pause size={18} className="text-gray-200" />
            <span className="text-sm text-gray-200 font-medium">
              Break Time
            </span>
          </label>
          <div className="w-[115px] bg-white/10 border border-white/20 rounded-lg focus-within:border-purple-500   flex items-center justify-between gap-1 px-3 py-3">
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
