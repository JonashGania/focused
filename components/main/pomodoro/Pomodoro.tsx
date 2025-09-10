"use client";

import { SemiCircularProgress } from "../../progress-bars/SemiCircularProgress";
import { Button } from "../../ui/button";
import { useTimer } from "@/hooks/use-timer";
import { useResponsiveSize } from "@/hooks/use-responsive-size";
import { formatTime } from "@/lib/utils";
import { motion, AnimatePresence } from "motion/react";
import {
  Play,
  Pause,
  RotateCcw,
  Coffee,
  Target,
  Zap,
  Award,
} from "lucide-react";

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

  const size = useResponsiveSize(480, 380, 430);

  const getModeConfig = () => {
    return mode === "focus"
      ? {
          icon: Target,
          title: "Focus Time",
          emoji: "🎯",
          gradientFrom: "from-orange-500/20",
          gradientTo: "to-red-500/20",
          accentColor: "text-orange-400",
        }
      : {
          icon: Coffee,
          title: "Break Time",
          emoji: "☕",
          gradientFrom: "from-green-500/20",
          gradientTo: "to-emerald-500/20",
          accentColor: "text-green-400",
        };
  };

  const config = getModeConfig();
  const ModeIcon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="flex flex-col justify-center items-center max-w-[500px] w-full mx-auto"
    >
      {/* Header Section */}
      <div className="w-full mb-12">
        <div className="flex justify-between items-center mb-6">
          {/* Mode Display */}
          <motion.div
            key={mode}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <div
              className={`relative p-3 rounded-2xl bg-gradient-to-br ${config.gradientFrom} ${config.gradientTo} backdrop-blur-sm border border-white/10`}
            >
              <ModeIcon className={`w-6 h-6 ${config.accentColor}`} />
            </div>
            <div>
              <h2 className="text-white text-xl min-[450px]:text-2xl font-bold tracking-wide">
                {config.title}
              </h2>
              <p className="text-white/70 text-sm">
                Stay focused and productive
              </p>
            </div>
          </motion.div>

          {/* Sessions Counter */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-right"
          >
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2 border border-white/10">
              <Award className="w-5 h-5 text-yellow-400" />
              <div>
                <p className="text-white/60 text-xs uppercase tracking-wider">
                  Sessions
                </p>
                <p className="text-white text-xl font-bold">{sessions}</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Progress Stats */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-3 gap-4 mb-8"
        >
          <div className="text-center p-3 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
            <Zap className="w-5 h-5 text-blue-400 mx-auto mb-1" />
            <p className="text-white/60 text-xs">Progress</p>
            <p className="text-white font-semibold">{Math.round(progress)}%</p>
          </div>
          <div className="text-center p-3 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
            <Target className="w-5 h-5 text-purple-400 mx-auto mb-1" />
            <p className="text-white/60 text-xs">Mode</p>
            <p className="text-white font-semibold">
              {mode === "focus" ? "Focus" : "Break"}
            </p>
          </div>
          <div className="text-center p-3 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
            <Coffee className="w-5 h-5 text-green-400 mx-auto mb-1" />
            <p className="text-white/60 text-xs">Status</p>
            <p className="text-white font-semibold">
              {isActive ? "Active" : "Paused"}
            </p>
          </div>
        </motion.div>
      </div>

      {/* Timer Circle */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="relative"
      >
        {/* Glow effect */}
        <div
          className={`absolute inset-0 rounded-full bg-gradient-to-r ${config.gradientFrom} ${config.gradientTo} blur-2xl opacity-50 scale-110`}
        />

        {/* Timer component */}
        <div className="relative">
          <SemiCircularProgress
            progress={progress}
            size={size}
            strokeWidth={22}
            circleColor="rgba(255, 255, 255, 0.1)"
            indicatorColor={
              mode === "focus"
                ? "oklch(64.5% 0.246 16.439)"
                : "oklch(64.8% 0.150 160.1)"
            }
            indicatorSize={16}
            label={formatTime(timeLeft)}
            showPercentage={false}
          />
        </div>
      </motion.div>

      {/* Control Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="flex items-center gap-4 mb-8"
      >
        {/* Play/Pause Button */}
        <motion.div whileTap={{ scale: 0.95 }}>
          <Button
            onClick={toggleTimer}
            className={`relative overflow-hidden h-14 w-32 text-lg font-semibold rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl ${
              isActive
                ? "bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white"
                : "bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white"
            }`}
          >
            <div className="absolute inset-0 bg-white/20 opacity-0 hover:opacity-100 transition-opacity duration-300" />
            <div className="relative flex items-center justify-center gap-2">
              <AnimatePresence mode="wait">
                {isActive ? (
                  <motion.div
                    key="pause"
                    initial={{ scale: 0, rotate: -90 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0, rotate: 90 }}
                    className="flex items-center gap-2"
                  >
                    <Pause size={20} />
                    <span>Pause</span>
                  </motion.div>
                ) : (
                  <motion.div
                    key="play"
                    initial={{ scale: 0, rotate: -90 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0, rotate: 90 }}
                    className="flex items-center gap-2"
                  >
                    <Play size={20} />
                    <span>Start</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Button>
        </motion.div>

        {/* Reset Button */}
        <motion.div whileTap={{ scale: 0.95 }}>
          <Button
            onClick={resetTimer}
            className="relative overflow-hidden bg-white/10 hover:bg-white/20 backdrop-blur-sm h-14 w-32 text-lg font-semibold text-white rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl border border-white/20"
          >
            <div className="absolute inset-0 bg-white/10 opacity-0 hover:opacity-100 transition-opacity duration-300" />
            <div className="relative flex items-center justify-center gap-2">
              <RotateCcw size={20} />
              <span>Reset</span>
            </div>
          </Button>
        </motion.div>
      </motion.div>

      {/* Mode Switch Button */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="w-full max-w-[420px]"
      >
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button
            onClick={switchMode}
            className="relative overflow-hidden w-full bg-gradient-to-r from-neutral-900/80 to-neutral-800/80 hover:from-neutral-800/90 hover:to-neutral-700/90 backdrop-blur-sm h-12 text-white font-medium rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl border border-white/10"
          >
            <div className="absolute inset-0 bg-white/5 opacity-0 hover:opacity-100 transition-opacity duration-300" />
            <div className="relative flex items-center justify-center gap-3">
              <motion.div
                animate={{ rotate: 180 }}
                transition={{ duration: 0.3 }}
              >
                {mode === "focus" ? <Coffee size={18} /> : <Target size={18} />}
              </motion.div>
              <span>Switch to {mode === "focus" ? "Break" : "Focus"} Mode</span>
              <motion.div
                animate={{ x: [0, 4, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                →
              </motion.div>
            </div>
          </Button>
        </motion.div>
      </motion.div>

      {/* Motivational Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="mt-8 text-center"
      >
        <p className="text-white/60 text-sm">
          {mode === "focus"
            ? "🚀 Deep work mode activated - eliminate distractions!"
            : "🌱 Take a breather - you've earned this break!"}
        </p>
      </motion.div>
    </motion.div>
  );
};

export default Pomodoro;
