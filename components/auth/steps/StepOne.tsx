import React, { useState } from "react";
import { UseFormRegister } from "react-hook-form";
import { RegisterSchema } from "@/lib/schema";
import { z } from "zod";
import { motion } from "motion/react";
import { User, Sparkles } from "lucide-react";

type StepOneProps = {
  children: React.ReactNode;
  register: UseFormRegister<z.infer<typeof RegisterSchema>>;
};

const StepOne = ({ children, register }: StepOneProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState("");

  return (
    <div className="flex flex-col items-center justify-center h-full w-full space-y-8">
      {/* Header with animation */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="text-center space-y-4"
      >
        <div className="relative inline-block">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -top-2 -right-2"
          >
            <Sparkles className="w-6 h-6 text-indigo-400" />
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-800 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Let&apos;s get started
          </h2>
        </div>
        <p className="text-xl text-gray-600 max-w-md mx-auto leading-relaxed">
          Tell us your name so we can create a personalized experience just for
          you
        </p>
      </motion.div>

      {/* Input field with enhanced styling */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="relative w-full max-w-sm"
      >
        <div className="relative group">
          <div
            className={`absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-all duration-300 ${
              isFocused || inputValue
                ? "text-indigo-500 scale-110"
                : "text-gray-400"
            }`}
          >
            <User size={20} />
          </div>

          <input
            type="text"
            placeholder="Enter your first name"
            autoComplete="given-name"
            {...register("firstName", {
              onChange: (e) => setInputValue(e.target.value),
            })}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className={`w-full pl-12 pr-6 py-4 text-lg text-center bg-white/70 backdrop-blur-sm border-2 rounded-2xl transition-all duration-300 placeholder:text-gray-400 focus:outline-none ${
              isFocused
                ? "border-indigo-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 shadow-lg transform scale-105"
                : "border-gray-200 hover:border-gray-300 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
            }`}
          />

          {/* Animated border effect */}
          <div
            className={`absolute inset-0 rounded-2xl transition-all duration-500 pointer-events-none ${
              isFocused
                ? "bg-gradient-to-r from-indigo-400/20 via-purple-400/20 to-indigo-400/20 opacity-100"
                : "opacity-0"
            }`}
            style={{
              background: isFocused
                ? "linear-gradient(45deg, rgba(99, 102, 241, 0.1), rgba(139, 92, 246, 0.1), rgba(99, 102, 241, 0.1))"
                : undefined,
            }}
          />
        </div>
      </motion.div>

      {/* Motivational text */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="text-center max-w-md"
      >
        <p className="text-gray-500 text-sm leading-relaxed">
          This will help us personalize your experience and make everything feel
          just right for you ✨
        </p>
      </motion.div>

      {/* Continue button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="w-full max-w-sm pt-4"
      >
        {children}
      </motion.div>

      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-2 h-2 bg-indigo-300 rounded-full opacity-60 animate-pulse" />
      <div
        className="absolute bottom-20 right-16 w-1.5 h-1.5 bg-purple-300 rounded-full opacity-40 animate-pulse"
        style={{ animationDelay: "1s" }}
      />
      <div
        className="absolute top-32 right-8 w-1 h-1 bg-indigo-400 rounded-full opacity-50 animate-pulse"
        style={{ animationDelay: "2s" }}
      />
    </div>
  );
};

export default StepOne;
