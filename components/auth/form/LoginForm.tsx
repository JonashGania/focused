"use client";

import { useState } from "react";
import { Eye, EyeOff, ArrowRight } from "lucide-react";
import { login } from "@/actions/auth";
import { LoginSchema } from "@/lib/schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import z from "zod";
import ContinueButton from "@/components/buttons/ContinueButton";
import Link from "next/link";
import { motion } from "motion/react";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [focusedInput, setFocusedInput] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const errorMessage = searchParams.get("message");

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof LoginSchema>) => {
    await login(data);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="max-w-[480px] w-full mx-auto"
    >
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/90 via-white/80 to-white/70 backdrop-blur-xl shadow-2xl border border-white/20">
        {/* Decorative gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 via-transparent to-purple-50/30 pointer-events-none" />

        {/* Animated background elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-indigo-200/30 to-transparent rounded-full blur-2xl" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-200/30 to-transparent rounded-full blur-2xl" />

        <div className="relative z-10 p-8 md:p-10">
          <div className="text-center mb-8">
            <motion.h1
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 bg-clip-text text-transparent mb-3"
            >
              Welcome back
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-gray-600 text-lg"
            >
              Sign in to continue your journey
            </motion.p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Email Field */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Email Address
              </label>
              <div className="relative group">
                <input
                  type="email"
                  id="email"
                  {...register("email")}
                  placeholder="name@example.com"
                  disabled={isSubmitting}
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
            </motion.div>

            {/* Password Field */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Password
              </label>
              <div className="relative group">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  {...register("password")}
                  placeholder="••••••••"
                  disabled={isSubmitting}
                  onFocus={() => setFocusedInput("password")}
                  onBlur={() => setFocusedInput(null)}
                  className={`w-full pl-4 pr-12 py-4 bg-white/60 backdrop-blur-sm border-2 rounded-xl transition-all duration-300 placeholder:text-gray-400 disabled:opacity-50 disabled:cursor-not-allowed ${
                    errors.password
                      ? "border-red-300 focus:border-red-400 focus:ring-red-100"
                      : focusedInput === "password"
                      ? "border-indigo-400 focus:border-indigo-500 focus:ring-indigo-100"
                      : "border-gray-200 hover:border-gray-300 focus:border-indigo-400 focus:ring-indigo-100"
                  } focus:outline-none focus:ring-4`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors duration-200 focus:outline-none"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2 text-sm text-red-600 flex items-center gap-1"
                >
                  <span className="w-1 h-1 bg-red-500 rounded-full" />
                  {errors.password.message}
                </motion.p>
              )}
            </motion.div>

            {/* Error Message */}
            {errorMessage && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-4 bg-red-50/80 backdrop-blur-sm border border-red-200 rounded-xl"
              >
                <p className="text-sm text-red-700 text-center font-medium">
                  {errorMessage}
                </p>
              </motion.div>
            )}

            {/* Submit Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="pt-4"
            >
              <ContinueButton
                type="submit"
                disabled={isSubmitting}
                className="w-full h-14 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none  flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Signing in...
                  </div>
                ) : (
                  <>
                    Sign In
                    <ArrowRight size={18} />
                  </>
                )}
              </ContinueButton>
            </motion.div>

            {/* Divider */}
            <div className="relative py-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white/80 text-gray-500 font-medium">
                  New to our platform?
                </span>
              </div>
            </div>

            {/* Register Link */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="text-center"
            >
              <Link
                href="/register"
                className="inline-flex items-center gap-2 px-6 py-3 text-indigo-600 font-semibold rounded-xl border-2 border-indigo-200 hover:border-indigo-300 hover:bg-indigo-50/50 transition-all duration-300 transform hover:scale-[1.02]"
              >
                Create an account
                <ArrowRight size={16} />
              </Link>
            </motion.div>
          </form>
        </div>
      </div>
    </motion.div>
  );
};

export default LoginForm;
