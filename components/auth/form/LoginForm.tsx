"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { login } from "@/actions/auth";
import { LoginSchema } from "@/lib/schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import z from "zod";
import ContinueButton from "@/components/buttons/ContinueButton";
import Link from "next/link";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);

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
    <div className="max-w-[450px] w-full mx-auto px-8 pt-8 pb-4 shadow-md rounded-lg flex flex-col backdrop-blur-xl bg-white/50">
      <h2 className="text-4xl font-bold text-center py-4">Welcome back!</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="pt-8 flex flex-col">
        <div className="flex flex-col gap-4 w-full">
          <div>
            <div className="flex flex-col">
              <label htmlFor="email" className="pb-1">
                Email
              </label>
              <input
                type="email"
                {...register("email")}
                placeholder="name@example.com"
                className="rounded-sm px-2 py-2 border border-gray-300 focus:outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-300/30 transition-all duration-300"
              />
            </div>

            {errors.email && (
              <span className="text-red-500 text-sm">
                {errors.email.message}
              </span>
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
        {errorMessage && (
          <span className="text-red-500 text-sm text-center pt-4">
            {errorMessage}
          </span>
        )}
        <div className="flex items-center mt-8 gap-4 justify-end">
          <Link href="/register" className=" text-zinc-950 underline ">
            Create an account
          </Link>
          <ContinueButton
            type="submit"
            disabled={isSubmitting}
            className=" disabled:bg-indigo-900 disabled:cursor-default text-sm py-2.5 rounded-md"
          >
            LOG IN
          </ContinueButton>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
