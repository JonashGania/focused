"use client";

import Image from "next/image";
import { themes, slugify } from "@/lib/utils";
import { motion, AnimatePresence } from "motion/react";
import { Palette, Sparkles, Check } from "lucide-react";

interface StepThreeProps {
  children: React.ReactNode;
  selectedTheme: string | null;
  setSelectedTheme: (theme: string | null) => void;
}

const StepThree = ({
  children,
  selectedTheme,
  setSelectedTheme,
}: StepThreeProps) => {
  const handleSelectTheme = (theme: string) => {
    const themeName = slugify(theme);
    setSelectedTheme(themeName);
  };

  return (
    <div className="px-4 pb-6 flex flex-col items-center justify-center h-full">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.6 }}
        className="text-center space-y-4 mb-8"
      >
        <div className="relative inline-block">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-3 -right-3"
          >
            <Palette className="w-7 h-7 text-indigo-500" />
          </motion.div>
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-800 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Choose Your Vibe
          </h2>
        </div>
        <p className="text-lg text-gray-600 max-w-md mx-auto leading-relaxed">
          Select a theme that matches your style and helps you stay focused 🌈
        </p>
      </motion.div>

      {/* Theme Grid */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8 w-full max-w-lg"
      >
        {themes.map((theme, index) => {
          const isSelected = selectedTheme === slugify(theme.name);

          return (
            <motion.div
              key={theme.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1, duration: 0.4 }}
              className="relative"
            >
              <label className="group cursor-pointer block">
                <input
                  type="radio"
                  name="theme"
                  value={theme.image}
                  onChange={() => handleSelectTheme(theme.name)}
                  className="sr-only"
                />

                <div className="relative overflow-hidden">
                  {/* Theme Image */}
                  <div
                    className={`relative aspect-video rounded-xl overflow-hidden transition-all duration-300 transform ${
                      isSelected
                        ? "ring-3 ring-indigo-500 scale-105 shadow-xl shadow-indigo-200/50"
                        : "ring-2 ring-transparent group-hover:ring-gray-300 group-hover:scale-102 shadow-lg hover:shadow-xl"
                    }`}
                  >
                    <Image
                      src={theme.image}
                      alt={theme.name.toLowerCase()}
                      fill
                      sizes="(max-width: 768px) 50vw, 33vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                    />

                    {/* Gradient overlay */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent transition-opacity duration-300 ${
                        isSelected
                          ? "opacity-30"
                          : "opacity-0 group-hover:opacity-20"
                      }`}
                    />

                    {/* Selection indicator */}
                    <AnimatePresence>
                      {isSelected && (
                        <motion.div
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0, opacity: 0 }}
                          className="absolute top-2 right-2 w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center shadow-lg"
                        >
                          <Check size={14} className="text-white" />
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Hover effect */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br from-indigo-500/0 via-purple-500/0 to-indigo-500/0 transition-all duration-300 ${
                        !isSelected
                          ? "group-hover:from-indigo-500/10 group-hover:via-purple-500/5 group-hover:to-indigo-500/10"
                          : ""
                      }`}
                    />
                  </div>

                  {/* Theme name */}
                  <motion.div
                    className="mt-3 text-center"
                    animate={isSelected ? { scale: 1.05 } : { scale: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <h4
                      className={`font-semibold transition-colors duration-200 ${
                        isSelected
                          ? "text-indigo-600 text-base"
                          : "text-gray-700 group-hover:text-gray-900 text-sm"
                      }`}
                    >
                      {theme.name}
                    </h4>
                    {isSelected && (
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="flex items-center justify-center gap-1 mt-1"
                      >
                        <Sparkles size={12} className="text-indigo-500" />
                        <span className="text-xs text-indigo-600 font-medium">
                          Selected
                        </span>
                      </motion.div>
                    )}
                  </motion.div>
                </div>
              </label>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Selection hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="text-center mb-6"
      >
        {!selectedTheme ? (
          <p className="text-sm text-gray-500 bg-gray-50/80 rounded-lg px-4 py-2">
            💡 Pick a theme that inspires you - you can change it later!
          </p>
        ) : (
          <motion.p
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="text-sm text-indigo-600 bg-indigo-50/80 rounded-lg px-4 py-2 font-medium"
          >
            ✨ Great choice! This theme will help create the perfect ambiance
          </motion.p>
        )}
      </motion.div>

      {/* Continue button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="w-full max-w-sm"
      >
        {children}
      </motion.div>

      {/* Decorative elements */}
      <div className="absolute top-20 left-8 w-2 h-2 bg-indigo-300 rounded-full opacity-60 animate-pulse" />
      <div
        className="absolute bottom-40 right-6 w-1.5 h-1.5 bg-purple-300 rounded-full opacity-40 animate-pulse"
        style={{ animationDelay: "2s" }}
      />
      <div
        className="absolute top-32 right-20 w-1 h-1 bg-indigo-400 rounded-full opacity-50 animate-pulse"
        style={{ animationDelay: "1s" }}
      />
    </div>
  );
};

export default StepThree;
