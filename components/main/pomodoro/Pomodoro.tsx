"use client";

import { SemiCircularProgress } from "../../progress-bars/SemiCircularProgress";
import { Button } from "../../ui/button";
import { useTimer } from "@/hooks/use-timer";
import { useResponsiveSize } from "@/hooks/use-responsive-size";
import { formatTime } from "@/lib/utils";
import { motion } from "motion/react";

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

  const size = useResponsiveSize(450, 350, 400);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.3, ease: "easeInOut" }}
      className="flex flex-col justify-center items-center max-w-[400px] w-full mx-auto"
    >
      <div className="flex justify-between items-center w-full mb-20 min-[450px]:mb-8">
        <span className="text-white text-xl min-[450px]:text-2xl font-medium">
          {mode === "focus" ? "🎯 Focus" : "☕ Break"} Time
        </span>
        <span className="text-lg min-[450px]:text-xl text-gray-200 font-medium">
          Sessions: {sessions}
        </span>
      </div>
      <SemiCircularProgress
        progress={progress}
        size={size}
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
          className="w-[350px] min-[450px]:w-[400px] bg-neutral-900/70 hover:bg-neutral-900 h-10 text-white cursor-pointer"
        >
          Switch to {mode === "focus" ? "Break" : "Focus"}
        </Button>
      </div>
    </motion.div>
  );
};

export default Pomodoro;
