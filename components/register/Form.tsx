"use client";

import { ChevronLeft } from "lucide-react";
import { Progress } from "../ui/progress";
import { useState } from "react";
import StepOne from "./steps/StepOne";
import Link from "next/link";

const RegisterForm = () => {
  return (
    <div className="max-w-[500px] h-[500px] w-full mx-auto p-4 shadow-md border border-black/10 rounded-lg flex flex-col">
      <div>
        <button className="flex items-center cursor-pointer">
          {" "}
          <ChevronLeft size={17} />
          <span className="text-zinc-700 font-medium">Back</span>
        </button>
      </div>

      <form action="" className="flex-1 flex justify-center items-center">
        <StepOne />
      </form>

      <Link
        href="/login"
        className="text-center text-zinc-700 hover:underline "
      >
        Already have an account
      </Link>

      {/* <div className="max-w-[100px] w-full flex flex-col items-end">
          <Progress
            value={33.33}
            className="w-full [&>*]:bg-neutral-600 mb-1"
            max={100}
          />
          <span className="text-sm text-zinc-600 justify-self-end">
            Step 1 of 3
          </span>
        </div> */}
    </div>
  );
};

export default RegisterForm;
