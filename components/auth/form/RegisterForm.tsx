"use client";

import { ChevronLeft } from "lucide-react";
import { Progress } from "../../ui/progress";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { RegisterSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "motion/react";
import { signup } from "@/actions/auth";
import { toast } from "sonner";
import StepOne from "../steps/StepOne";
import StepTwo from "../steps/StepTwo";
import StepThree from "../steps/StepThree";
import ContinueButton from "../../buttons/ContinueButton";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const steps = [
  { id: "Step 1", name: "First Name" },
  { id: "Step 2", name: "Personal Information" },
  { id: "Step 3", name: "Background Theme" },
];

const RegisterForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [previousStep, setPreviousStep] = useState(0);
  const delta = currentStep - previousStep;

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
          setPreviousStep(currentStep);
          setCurrentStep((prev) => prev + 1);
        })();
        return;
      }
      setPreviousStep(currentStep);
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prev = () => {
    if (currentStep > 0) {
      setPreviousStep(currentStep);
      setCurrentStep((prev) => prev - 1);
    }
  };

  const formSubmit = async (data: z.infer<typeof RegisterSchema>) => {
    await signup(data);
  };

  const searchParams = useSearchParams();
  const errorMessage = searchParams.get("message");

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage, {
        position: "top-center",
      });
    }
  }, [errorMessage]);

  return (
    <>
      <div className="max-w-[500px] h-[550px] w-full mx-auto p-4 shadow-md rounded-lg flex flex-col backdrop-blur-xl bg-white/50">
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

        <div className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-thin  scrollbar-thumb-zinc-500 scrollbar-track-zinc-400/30">
          <form
            onSubmit={handleSubmit(formSubmit)}
            className=" flex flex-col  h-full"
          >
            {currentStep === 0 && (
              <motion.div
                initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="h-full"
              >
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
              </motion.div>
            )}
            {currentStep === 1 && (
              <motion.div
                initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="h-full"
              >
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
              </motion.div>
            )}
            {currentStep === 2 && (
              <motion.div
                initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="h-full"
              >
                <StepThree>
                  <ContinueButton type="submit" className="justify-self-end">
                    Finish Setup
                  </ContinueButton>
                </StepThree>
              </motion.div>
            )}
          </form>
        </div>

        <div className="text-center">
          <Link
            href="/login"
            className="text-zinc-950 hover:underline font-medium "
          >
            Already have an account
          </Link>
        </div>
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
