import React from "react";
import { UseFormRegister } from "react-hook-form";
import { RegisterSchema } from "@/lib/schema";
import { z } from "zod";

type StepOneProps = {
  children: React.ReactNode;
  register: UseFormRegister<z.infer<typeof RegisterSchema>>;
};

const StepOne = ({ children, register }: StepOneProps) => {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full gap-8">
      <h2 className="pt-4 font-bold text-4xl text-center text-zinc-800">
        Let&apos;s start with your <br /> name
      </h2>
      <input
        type="text"
        placeholder="First name"
        autoComplete="off"
        {...register("firstName")}
        className="text-2xl text-center border-b-2 placeholder:text-gray-500 border-gray-300 focus:border-indigo-300 focus:outline-none transition-all duration-500 px-2 py-2"
      />
      {children}
    </div>
  );
};

export default StepOne;
