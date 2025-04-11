"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { themes, slugify } from "@/lib/utils";

const StepThree = ({ children }: { children: React.ReactNode }) => {
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) setSelectedTheme(storedTheme);
  }, []);

  const handleSelectTheme = (theme: string) => {
    const themeName = slugify(theme);
    localStorage.setItem("theme", themeName);
    setSelectedTheme(themeName);
  };

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
              onClick={() => handleSelectTheme(theme.name)}
              className="sr-only"
            />
            <Image
              src={theme.image}
              alt={theme.name.toLowerCase()}
              width={150}
              height={100}
              className={`object-cover aspect-video rounded-lg ring-3 transition-all ${
                selectedTheme === slugify(theme.name)
                  ? " ring-indigo-400 "
                  : "ring-transparent "
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
