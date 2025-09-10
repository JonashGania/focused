"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

export function SemiCircularProgress({
  progress = 0,
  size = 200,
  strokeWidth = 15,
  circleColor = "#3b82f6",
  trailColor = "#e5e7eb80",
  indicatorColor = "#3b82f6",
  textColor = "#FFFFFF",
  showPercentage = true,
  animationDuration = 0.5,
  label = "",
  indicatorSize = 12,
}) {
  const [progressValue, setProgressValue] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const normalizedProgress = Math.min(100, Math.max(0, progress));

  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => {
      setProgressValue(normalizedProgress);
      setIsAnimating(false);
    }, 100);

    return () => clearTimeout(timer);
  }, [normalizedProgress]);

  // Calculate dimensions
  const radius = (size - strokeWidth) / 2;
  const center = size / 2;
  const circumference = Math.PI * radius;

  // Calculate the position of the indicator dot
  const angle = (progressValue / 100) * 180;
  const angleInRadians = (angle - 180) * (Math.PI / 180);

  // Calculate the coordinates of the indicator
  const indicatorX = center + radius * Math.cos(angleInRadians);
  const indicatorY = center + radius * Math.sin(angleInRadians);

  const svgWidth = size + indicatorSize * 4;
  const svgHeight = size / 2 + strokeWidth + indicatorSize * 2;

  // Create gradient IDs based on colors to avoid conflicts
  const gradientId = `gradient-${circleColor.replace("#", "")}-${Date.now()}`;
  const glowId = `glow-${indicatorColor.replace("#", "")}-${Date.now()}`;

  return (
    <div className="flex flex-col items-center relative">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative"
      >
        {/* Background glow effect */}
        <div
          className="absolute inset-0 rounded-full opacity-30 blur-2xl"
          style={{
            background: `radial-gradient(circle, ${circleColor}40 0%, transparent 70%)`,
          }}
        />

        <svg
          width={svgWidth}
          height={280}
          viewBox={`0 0 ${svgWidth} ${svgHeight + 50}`}
          className="drop-shadow-xl"
        >
          {/* Gradient definitions */}
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={circleColor} stopOpacity="0.8" />
              <stop offset="50%" stopColor={circleColor} stopOpacity="1" />
              <stop
                offset="100%"
                stopColor={indicatorColor}
                stopOpacity="0.9"
              />
            </linearGradient>

            <filter id={glowId} x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow
                dx="0"
                dy="4"
                stdDeviation="8"
                floodColor={circleColor}
                floodOpacity="0.3"
              />
            </filter>
          </defs>

          {/* Background trail with enhanced styling */}
          <path
            d={`M ${indicatorSize * 2 + strokeWidth / 2}, ${
              center + indicatorSize
            } 
               a ${radius} ${radius} 0 0 1 ${size - strokeWidth} 0`}
            fill="transparent"
            stroke={trailColor}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            className="opacity-60"
          />

          {/* Inner glow trail */}
          <path
            d={`M ${indicatorSize * 2 + strokeWidth / 2}, ${
              center + indicatorSize
            } 
               a ${radius} ${radius} 0 0 1 ${size - strokeWidth} 0`}
            fill="transparent"
            stroke="rgba(255, 255, 255, 0.1)"
            strokeWidth={strokeWidth - 4}
            strokeLinecap="round"
          />

          {/* Main progress path with gradient */}
          <path
            d={`M ${indicatorSize * 2 + strokeWidth / 2}, ${
              center + indicatorSize
            } 
                a ${radius} ${radius} 0 0 1 ${size - strokeWidth} 0`}
            fill="transparent"
            stroke={`url(#${gradientId})`}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference * (1 - progressValue / 100)}
            filter={`url(#${glowId})`}
            style={{
              transition: `stroke-dashoffset ${animationDuration}s cubic-bezier(0.4, 0, 0.2, 1)`,
            }}
          />

          {/* Progress indicator dot with enhanced styling */}
          {progressValue > 0 && (
            <g>
              {/* Outer glow ring */}
              <circle
                cx={indicatorX + indicatorSize * 2}
                cy={indicatorY + indicatorSize}
                r={indicatorSize + 4}
                fill="none"
                stroke={indicatorColor}
                strokeWidth="2"
                opacity="0.4"
                className="animate-pulse"
                style={{
                  transition: `cx ${animationDuration}s cubic-bezier(0.4, 0, 0.2, 1), cy ${animationDuration}s cubic-bezier(0.4, 0, 0.2, 1)`,
                }}
              />

              {/* Main indicator dot */}
              <circle
                cx={indicatorX + indicatorSize * 2}
                cy={indicatorY + indicatorSize}
                r={indicatorSize}
                fill={indicatorColor}
                filter="url(#shadow)"
                style={{
                  transition: `cx ${animationDuration}s cubic-bezier(0.4, 0, 0.2, 1), cy ${animationDuration}s cubic-bezier(0.4, 0, 0.2, 1)`,
                }}
              />

              {/* Inner highlight */}
              <circle
                cx={indicatorX + indicatorSize * 2}
                cy={indicatorY + indicatorSize}
                r={indicatorSize - 3}
                fill="rgba(255, 255, 255, 0.3)"
                style={{
                  transition: `cx ${animationDuration}s cubic-bezier(0.4, 0, 0.2, 1), cy ${animationDuration}s cubic-bezier(0.4, 0, 0.2, 1)`,
                }}
              />
            </g>
          )}

          {/* Decorative end caps */}
          <circle
            cx={indicatorSize * 2 + strokeWidth / 2}
            cy={center + indicatorSize}
            r={strokeWidth / 2 + 1}
            fill={trailColor}
            opacity="0.8"
          />
          <circle
            cx={indicatorSize * 2 + size - strokeWidth / 2}
            cy={center + indicatorSize}
            r={strokeWidth / 2 + 1}
            fill={trailColor}
            opacity="0.8"
          />
        </svg>

        {/* Floating particles animation */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            animate={{
              y: [-5, -15, -5],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-4 left-1/4 w-1 h-1 bg-white/40 rounded-full"
          />
          <motion.div
            animate={{
              y: [-8, -18, -8],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
            className="absolute top-8 right-1/3 w-1.5 h-1.5 bg-white/30 rounded-full"
          />
          <motion.div
            animate={{
              y: [-3, -12, -3],
              opacity: [0.4, 0.7, 0.4],
            }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
            className="absolute top-6 right-1/4 w-0.5 h-0.5 bg-white/50 rounded-full"
          />
        </div>
      </motion.div>

      {/* Enhanced text display */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <AnimatePresence mode="wait">
          <motion.div
            key={label}
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -10 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="text-center"
          >
            {showPercentage && (
              <motion.div
                animate={{ scale: isAnimating ? 1.1 : 1 }}
                className="text-2xl font-bold mb-2 text-white/80"
                style={{ color: textColor }}
              >
                {Math.round(progressValue)}%
              </motion.div>
            )}

            {label && (
              <div className="relative">
                {/* Text glow effect */}
                <div
                  className="absolute inset-0 text-7xl min-[450px]:text-8xl font-bold blur-sm opacity-30"
                  style={{ color: circleColor }}
                >
                  {label}
                </div>

                {/* Main text */}
                <motion.div
                  animate={{ scale: isAnimating ? 1.05 : 1 }}
                  transition={{ duration: 0.2 }}
                  className="relative text-7xl min-[450px]:text-8xl font-bold tracking-tight"
                  style={{ color: textColor }}
                >
                  {label}
                </motion.div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Progress status indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex justify-center mt-4"
        >
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  scale: progressValue > (i + 1) * 20 ? 1 : 0.7,
                  opacity: progressValue > (i + 1) * 20 ? 1 : 0.3,
                }}
                transition={{ delay: i * 0.1, duration: 0.3 }}
                className="w-2 h-2 rounded-full"
                style={{
                  backgroundColor:
                    progressValue > (i + 1) * 20 ? circleColor : trailColor,
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
