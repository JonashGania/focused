"use client";

import { Eye, EyeOff, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { RegisterSchema } from "@/lib/schema";
import z from "zod";
import { motion } from "motion/react";

type StepTwoProps = {
  children: React.ReactNode;
  register: UseFormRegister<z.infer<typeof RegisterSchema>>;
  errors: FieldErrors<z.infer<typeof RegisterSchema>>;
};

const StepTwo = ({ children, register, errors }: StepTwoProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [focusedInput, setFocusedInput] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Password strength checker
  const getPasswordStrength = (pwd: string) => {
    let strength = 0;
    if (pwd.length >= 8) strength++;
    if (/[A-Z]/.test(pwd)) strength++;
    if (/[a-z]/.test(pwd)) strength++;
    if (/[0-9]/.test(pwd)) strength++;
    if (/[^A-Za-z0-9]/.test(pwd)) strength++;
    return strength;
  };

  const passwordStrength = getPasswordStrength(password);
  const strengthColors = [
    "bg-red-500",
    "bg-orange-500",
    "bg-yellow-500",
    "bg-blue-500",
    "bg-green-500",
  ];
  const strengthLabels = ["Very Weak", "Weak", "Fair", "Good", "Strong"];

  return (
    <div className="flex flex-col items-center justify-center gap-8 h-full w-full">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.6 }}
        className="text-center space-y-4"
      >
        <p className="text-lg text-gray-600 max-w-md mx-auto leading-relaxed">
          Create your credentials to access your personalized workspace 🚀
        </p>
      </motion.div>

      {/* Form Fields */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="flex flex-col gap-6 max-w-[380px] w-full"
      >
        {/* Email Field */}
        <div className="space-y-2">
          <label
            htmlFor="email"
            className="block text-sm font-semibold text-gray-700"
          >
            Email Address
          </label>
          <div className="relative group">
            <input
              type="email"
              id="email"
              placeholder="name@example.com"
              {...register("email", {
                onChange: (e) => setEmail(e.target.value),
              })}
              onFocus={() => setFocusedInput("email")}
              onBlur={() => setFocusedInput(null)}
              className={`w-full pl-4 pr-4 py-4 bg-white/60 backdrop-blur-sm border-2 rounded-xl transition-all duration-300 placeholder:text-gray-400 disabled:opacity-50 disabled:cursor-not-allowed ${
                errors.email
                  ? "border-red-300 focus:border-red-400 focus:ring-red-100"
                  : focusedInput === "email"
                  ? "border-indigo-400 focus:border-indigo-500 focus:ring-indigo-100"
                  : "border-gray-200 hover:border-gray-300 focus:border-indigo-400 focus:ring-indigo-100"
              } focus:outline-none focus:ring-4`}
            />

            {/* Email validation indicator */}
            {email && !errors.email && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute inset-y-0 right-0 pr-4 flex items-center"
              >
                <CheckCircle2 size={20} className="text-green-500" />
              </motion.div>
            )}
          </div>

          {errors.email && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-2 text-sm text-red-600 flex items-center gap-1"
            >
              <span className="w-1 h-1 bg-red-500 rounded-full" />
              {errors.email.message}
            </motion.p>
          )}
        </div>

        {/* Password Field */}
        <div className="space-y-2">
          <label
            htmlFor="password"
            className="block text-sm font-semibold text-gray-700"
          >
            Password
          </label>
          <div className="relative group">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="••••••••"
              {...register("password", {
                onChange: (e) => setPassword(e.target.value),
              })}
              onFocus={() => setFocusedInput("password")}
              onBlur={() => setFocusedInput(null)}
              className={`w-full pl-4 pr-12 py-4 bg-white/70 backdrop-blur-sm border-2 rounded-xl transition-all duration-300 placeholder:text-gray-400 focus:outline-none ${
                errors.password
                  ? "border-red-300 focus:border-red-400 focus:ring-red-100"
                  : focusedInput === "password"
                  ? "border-indigo-400 focus:border-indigo-500 focus:ring-indigo-100 shadow-lg"
                  : "border-gray-200 hover:border-gray-300 focus:border-indigo-400 focus:ring-indigo-100"
              } focus:ring-4`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors duration-200 focus:outline-none"
              tabIndex={-1}
            >
              <motion.div
                animate={{ rotate: showPassword ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </motion.div>
            </button>
          </div>

          {/* Password Strength Indicator */}
          {password && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-600">
                  Password strength:
                </span>
                <span
                  className={`text-xs font-medium ${
                    passwordStrength >= 4
                      ? "text-green-600"
                      : passwordStrength >= 3
                      ? "text-blue-600"
                      : passwordStrength >= 2
                      ? "text-yellow-600"
                      : passwordStrength >= 1
                      ? "text-orange-600"
                      : "text-red-600"
                  }`}
                >
                  {strengthLabels[passwordStrength]}
                </span>
              </div>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${
                      i < passwordStrength
                        ? strengthColors[passwordStrength]
                        : "bg-gray-200"
                    }`}
                  />
                ))}
              </div>

              {/* Password requirements */}
              <div className="space-y-1 text-xs">
                <div
                  className={`flex items-center gap-2 ${
                    password.length >= 8 ? "text-green-600" : "text-gray-500"
                  }`}
                >
                  <div
                    className={`w-1 h-1 rounded-full ${
                      password.length >= 8 ? "bg-green-500" : "bg-gray-300"
                    }`}
                  />
                  At least 8 characters
                </div>
                <div
                  className={`flex items-center gap-2 ${
                    /[A-Z]/.test(password) && /[a-z]/.test(password)
                      ? "text-green-600"
                      : "text-gray-500"
                  }`}
                >
                  <div
                    className={`w-1 h-1 rounded-full ${
                      /[A-Z]/.test(password) && /[a-z]/.test(password)
                        ? "bg-green-500"
                        : "bg-gray-300"
                    }`}
                  />
                  Mixed case letters
                </div>
                <div
                  className={`flex items-center gap-2 ${
                    /[0-9]/.test(password) ? "text-green-600" : "text-gray-500"
                  }`}
                >
                  <div
                    className={`w-1 h-1 rounded-full ${
                      /[0-9]/.test(password) ? "bg-green-500" : "bg-gray-300"
                    }`}
                  />
                  Contains numbers
                </div>
              </div>
            </motion.div>
          )}

          {errors.password && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm text-red-600 flex items-center gap-2"
            >
              <span className="w-1 h-1 bg-red-500 rounded-full" />
              {errors.password.message}
            </motion.p>
          )}
        </div>
      </motion.div>

      {/* Continue button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="w-full max-w-sm pt-2"
      >
        {children}
      </motion.div>

      {/* Decorative elements */}
      <div
        className="absolute bottom-32 left-8 w-1.5 h-1.5 bg-purple-300 rounded-full opacity-40 animate-pulse"
        style={{ animationDelay: "1.5s" }}
      />
    </div>
  );
};

export default StepTwo;
