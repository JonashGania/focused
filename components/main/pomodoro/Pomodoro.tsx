"use client";

import { SemiCircularProgress } from "../../progress-bars/SemiCircularProgress";
import { Button } from "../../ui/button";
import { useTimer } from "@/hooks/use-timer";
import { formatTime } from "@/lib/utils";

const Pomodoro = () => {
  const {
    mode,
    timeLeft,
    isActive,
    sessions,
    toggleTimer,
    resetTimer,
    switchMode,
    progress,
  } = useTimer();

  return (
    <div className="flex flex-col justify-center items-center max-w-[400px] w-full mx-auto">
      <div className="flex justify-between items-center w-full mb-8">
        <span className="text-white text-2xl font-medium">
          {mode === "focus" ? "🎯 Focus" : "☕ Break"} Time
        </span>
        <span className="text-xl text-gray-200 font-medium">
          Sessions: {sessions}
        </span>
      </div>
      <SemiCircularProgress
        progress={progress}
        size={400}
        strokeWidth={20}
        circleColor="oklch(81% 0.117 11.638)"
        indicatorColor="oklch(64.5% 0.246 16.439)"
        indicatorSize={15}
        label={formatTime(timeLeft)}
        showPercentage={false}
      />
      <div className="flex items-center gap-4 mt-8">
        <Button
          onClick={toggleTimer}
          className={`${
            isActive
              ? "bg-yellow-500 hover:bg-yellow-500"
              : "bg-rose-500 hover:bg-rose-500"
          } h-11 w-28 text-lg cursor-pointer text-white rounded-md transform active:scale-95 transition-transform duration-150`}
        >
          {isActive ? "Pause" : "Start"}
        </Button>
        <Button
          onClick={resetTimer}
          className="bg-gray-200 hover:bg-gray-200 h-11 w-28 text-lg cursor-pointer text-black rounded-md transform active:scale-95 transition-transform duration-150"
        >
          Reset
        </Button>
      </div>
      <div className="mt-4">
        <Button
          onClick={switchMode}
          className="w-[400px] bg-neutral-900/70 hover:bg-neutral-900 h-10 text-white cursor-pointer"
        >
          Switch to {mode === "focus" ? "Break" : "Focus"}
        </Button>
      </div>
    </div>
  );
};

export default Pomodoro;
