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
    <div className="max-w-[500px] w-full mx-auto p-4 shadow-md rounded-lg flex flex-col backdrop-blur-xl bg-white/50">
      <h2 className="text-4xl font-bold text-center py-4">Welcome back!</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="py-8 flex flex-col items-center"
      >
        <div className="flex flex-col gap-4 max-w-[300px] w-full">
          <div>
            <input
              type="email"
              {...register("email")}
              placeholder="name@example.com"
              className="text-lg w-full border-b-2 border-zinc-800/50 focus:border-zinc-900 focus:outline-none transition-all duration-500 pr-2 py-2"
            />
            {errors.email && (
              <span className="text-red-500 text-sm">
                {errors.email.message}
              </span>
            )}
          </div>
          <div>
            <div className="flex items-center gap-2 border-b-2 border-zinc-800/50 focus-within:border-zinc-900 pr-2 py-2 focus:outline-none transition-all duration-300">
              <input
                type={showPassword ? "text" : "password"}
                {...register("password")}
                placeholder="••••••••"
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
        {errorMessage && (
          <span className="text-red-500 text-sm text-center pt-4">
            {errorMessage}
          </span>
        )}
        <ContinueButton
          type="submit"
          disabled={isSubmitting}
          className="mt-8 disabled:bg-orange-800 disabled:cursor-default"
        >
          LOG IN
        </ContinueButton>
      </form>
      <div className="text-center">
        <Link
          href="/register"
          className=" text-zinc-950 hover:underline font-medium "
        >
          Create an account
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;
