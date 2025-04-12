"use client";

import { useState, useEffect } from "react";

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

  const normalizedProgress = Math.min(100, Math.max(0, progress));

  useEffect(() => {
    setProgressValue(normalizedProgress);
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

  const svgWidth = size + indicatorSize * 2;
  const svgHeight = size / 2 + strokeWidth + indicatorSize;

  return (
    <div className="flex flex-col items-center relative">
      <svg
        width={svgWidth}
        height={svgHeight}
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
      >
        <path
          d={`M ${indicatorSize + strokeWidth / 2}, ${center} 
             a ${radius} ${radius} 0 0 1 ${size - strokeWidth} 0`}
          fill="transparent"
          stroke={trailColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />

        <path
          d={`M ${indicatorSize + strokeWidth / 2}, ${center} 
              a ${radius} ${radius} 0 0 1 ${size - strokeWidth} 0`}
          fill="transparent"
          stroke={circleColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - progressValue / 100)}
          style={{
            transition: `stroke-dashoffset ${animationDuration}s ease-in-out`,
          }}
        />

        {progressValue > 0 && (
          <circle
            cx={indicatorX + indicatorSize}
            cy={indicatorY}
            r={indicatorSize}
            fill={indicatorColor}
            className="filter drop-shadow-md"
            style={{
              transition: `cx ${animationDuration}s ease-in-out, cy ${animationDuration}s ease-in-out`,
            }}
          />
        )}
      </svg>

      <div className="text-center absolute bottom-0">
        {showPercentage && (
          <div className="text-2xl font-bold" style={{ color: textColor }}>
            {Math.round(progressValue)}%
          </div>
        )}
        {label && (
          <div className="text-8xl font-bold " style={{ color: textColor }}>
            {label}
          </div>
        )}
      </div>
    </div>
  );
}
