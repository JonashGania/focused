"use client";

import { ChevronLeft } from "lucide-react";
import { Progress } from "../ui/progress";
import { useState } from "react";
import StepOne from "./steps/StepOne";
import StepTwo from "./steps/StepTwo";
import StepThree from "./steps/StepThree";
import ContinueButton from "../buttons/ContinueButton";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { RegisterSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";

const steps = [
  { id: "Step 1", name: "First Name" },
  { id: "Step 2", name: "Personal Information" },
  { id: "Step 3", name: "Background Theme" },
];

const RegisterForm = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      firstName: "",
      email: "",
      password: "",
    },
  });

  const progressValue = ((currentStep + 1) / steps.length) * 100;
  const firstName = watch("firstName");
  const email = watch("email");
  const password = watch("password");

  const next = () => {
    if (currentStep < steps.length - 1) {
      if (currentStep === 1) {
        handleSubmit(() => {
          setCurrentStep((prev) => prev + 1);
        })();
        return;
      }
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prev = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  return (
    <>
      <div className="max-w-[500px] h-[500px] w-full mx-auto p-4 shadow-md rounded-lg flex flex-col backdrop-blur-xl bg-white/50">
        <div>
          <button
            className={`${
              currentStep === 0 ? "hidden" : "flex"
            } items-center cursor-pointer `}
            onClick={prev}
          >
            {" "}
            <ChevronLeft size={17} />
            <span className="text-zinc-700 font-medium">Back</span>
          </button>
        </div>

        <form className="flex-1 flex justify-center items-center">
          {currentStep === 0 && (
            <StepOne register={register}>
              <ContinueButton
                onClick={next}
                disabled={!firstName}
                onKeyDown={(e) => e.key === "Enter" && next()}
                className={`disabled:bg-orange-800 disabled:cursor-default`}
              >
                Continue
              </ContinueButton>
            </StepOne>
          )}
          {currentStep === 1 && (
            <StepTwo register={register} errors={errors}>
              <ContinueButton
                type="button"
                onClick={next}
                disabled={!email || !password}
                className={`disabled:bg-orange-800 disabled:cursor-default`}
              >
                Continue
              </ContinueButton>
            </StepTwo>
          )}
          {currentStep === 2 && (
            <StepThree>
              <ContinueButton>Finish Setup</ContinueButton>
            </StepThree>
          )}
        </form>

        <Link
          href="/login"
          className="text-center text-zinc-950 hover:underline font-medium "
        >
          Already have an account
        </Link>
      </div>
      <div className="w-full max-w-[150px] mx-auto mt-4 flex flex-col gap-2 items-center">
        <Progress
          value={progressValue}
          max={100}
          className="[&>*]:bg-gray-200 bg-gray-900/50"
        />
        <span className="text-white font-medium ">
          Step {currentStep + 1} of 3
        </span>
      </div>
    </>
  );
};

export default RegisterForm;
