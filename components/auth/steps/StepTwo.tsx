"use client";

import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { RegisterSchema } from "@/lib/schema";
import z from "zod";

type StepTwoProps = {
  children: React.ReactNode;
  register: UseFormRegister<z.infer<typeof RegisterSchema>>;
  errors: FieldErrors<z.infer<typeof RegisterSchema>>;
};

const StepTwo = ({ children, register, errors }: StepTwoProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center gap-8 h-full w-full">
      <h2 className="pt-4 font-bold text-3xl text-zinc-800 text-center">
        Create the perfect environment to get in the zone 🚀
      </h2>
      <div className="flex flex-col gap-4 max-w-[350px] w-full">
        <div>
          <div className="flex flex-col">
            <label htmlFor="email" className="text-zinc-700 pb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="name@example.com"
              {...register("email")}
              className="rounded-sm px-2 py-2 border border-gray-300 focus:outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-300/30 transition-all duration-300"
            />
          </div>
          {errors.email && (
            <span className="text-red-500 text-sm">{errors.email.message}</span>
          )}
        </div>
        <div>
          <div className="flex flex-col">
            <label htmlFor="password" className="text-zinc-700 pb-1">
              Password
            </label>
            <div className="flex items-center gap-2 rounded-sm px-2 py-2 pr-2 border border-gray-300 focus-within:border-indigo-300 focus-within:ring-2 focus-within:ring-indigo-300/30 transition-all duration-300">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="••••••••"
                {...register("password")}
                className="w-full focus:outline-none"
              />
              {showPassword ? (
                <Eye
                  size={22}
                  className="text-zinc-400 cursor-pointer"
                  onClick={() => setShowPassword((prev) => !prev)}
                />
              ) : (
                <EyeOff
                  size={22}
                  className="text-zinc-400 cursor-pointer"
                  onClick={() => setShowPassword((prev) => !prev)}
                />
              )}
            </div>
          </div>
          {errors.password && (
            <span className="text-red-500 text-sm">
              {errors.password.message}
            </span>
          )}
        </div>
      </div>

      {children}
    </div>
  );
};

export default StepTwo;
