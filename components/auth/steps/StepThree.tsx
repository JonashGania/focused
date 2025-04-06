"use client";

import React from "react";
import Image from "next/image";
import { themes } from "@/lib/utils";
import { useThemeStore } from "@/store/theme-store";

const StepThree = ({ children }: { children: React.ReactNode }) => {
  const backgroundTheme = useThemeStore((state) => state.backgroundTheme);
  const setTheme = useThemeStore((state) => state.setTheme);

  return (
    <div className="px-2 pb-6 flex flex-col items-center justify-center">
      <h2 className="pt-4 font-bold text-3xl text-zinc-800 text-center">
        Lastly, select a theme of your <br /> choice 🌈
      </h2>
      <div className="grid grid-cols-3 gap-4 my-8">
        {themes.map((theme) => (
          <label key={theme.name} className="flex flex-col">
            <input
              type="radio"
              name="theme"
              value={theme.image}
              onChange={() => setTheme(theme.image)}
              className="sr-only"
            />
            <Image
              src={theme.image}
              alt={theme.name.toLowerCase()}
              width={150}
              height={100}
              className={`object-cover aspect-video rounded-lg ring-4 transition-all ${
                backgroundTheme === theme.image
                  ? "ring-white"
                  : "ring-transparent"
              }`}
            />
            <h4 className="text-zinc-800 font-semibold text-center pt-2 leading-5">
              {theme.name}
            </h4>
          </label>
        ))}
      </div>
      {children}
    </div>
  );
};

export default StepThree;
