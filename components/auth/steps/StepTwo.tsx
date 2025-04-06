"use client";

import React from "react";
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
      <div className="flex flex-col gap-2 max-w-[300px] w-full">
        <div>
          <input
            type="email"
            placeholder="name@example.com"
            {...register("email")}
            className="text-lg w-full border-b-2 border-zinc-800/50 focus:border-zinc-900 focus:outline-none transition-all duration-500 pr-2 py-2"
          />
          {errors.email && (
            <span className="text-red-500 text-sm">{errors.email.message}</span>
          )}
        </div>
        <div>
          <div className="flex items-center gap-2 border-b-2 border-zinc-800/50 focus-within:border-zinc-900 pr-2 py-2 focus:outline-none transition-all duration-300">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="create password"
              {...register("password")}
              className="text-lg w-full focus:outline-none"
            />
            {showPassword ? (
              <Eye
                size={22}
                className="text-zinc-500 cursor-pointer"
                onClick={() => setShowPassword((prev) => !prev)}
              />
            ) : (
              <EyeOff
                size={22}
                className="text-zinc-500 cursor-pointer"
                onClick={() => setShowPassword((prev) => !prev)}
              />
            )}
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
