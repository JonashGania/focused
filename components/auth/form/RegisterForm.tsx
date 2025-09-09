"use client";

import { ChevronLeft, CheckCircle } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { RegisterSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "motion/react";
import { signup } from "@/actions/auth";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useThemeStore } from "@/store/theme-store";
import StepOne from "../steps/StepOne";
import StepTwo from "../steps/StepTwo";
import StepThree from "../steps/StepThree";
import ContinueButton from "../../buttons/ContinueButton";
import Link from "next/link";

const steps = [
  { id: "Step 1", name: "Personal Details", description: "Tell us your name" },
  {
    id: "Step 2",
    name: "Account Setup",
    description: "Create your credentials",
  },
  { id: "Step 3", name: "Personalization", description: "Choose your theme" },
];

const RegisterForm = () => {
  const setTheme = useThemeStore((state) => state.setTheme);

  const [currentStep, setCurrentStep] = useState(0);
  const [previousStep, setPreviousStep] = useState(0);
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const delta = currentStep - previousStep;

  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
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
          setCompletedSteps((prev) => [...prev, currentStep]);
          setPreviousStep(currentStep);
          setCurrentStep((prev) => prev + 1);
        })();
        return;
      }
      setCompletedSteps((prev) => [...prev, currentStep]);
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
    const res = await signup(data);

    if (!res.success) {
      toast.error(res.message, {
        position: "top-center",
        style: {
          background: "#ffffff",
          borderColor: "#ffffff",
          color: "#fb2c36",
        },
      });
    } else {
      if (selectedTheme) {
        setTheme(selectedTheme);
      }
      router.push(`/verify?message=${res.email}`);
    }
  };

  return (
    <div className="w-full max-w-[550px] mx-auto py-8">
      {/* Progress Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between mb-4">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div className="relative">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-500 ${
                    completedSteps.includes(index)
                      ? "bg-green-500 text-white"
                      : index === currentStep
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {completedSteps.includes(index) ? (
                    <CheckCircle size={16} />
                  ) : (
                    index + 1
                  )}
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`absolute top-4 left-8 w-16 h-0.5 transition-colors duration-500 ${
                      completedSteps.includes(index)
                        ? "bg-green-500"
                        : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
              {index < steps.length - 1 && <div className="w-16" />}
            </div>
          ))}
        </div>
        <div className="text-center">
          <h3 className="text-xl font-bold text-gray-800">
            {steps[currentStep].name}
          </h3>
          <p className="text-gray-600">{steps[currentStep].description}</p>
        </div>
      </motion.div>

      {/* Main Form Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/95 via-white/90 to-white/85 backdrop-blur-xl shadow-2xl border border-white/20"
      >
        {/* Decorative elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/30 via-transparent to-purple-50/20 pointer-events-none" />
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-indigo-200/20 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-200/20 to-transparent rounded-full blur-2xl" />

        <div className="relative z-10">
          {/* Header with back button */}
          <div className="p-6 pb-0">
            <AnimatePresence>
              {currentStep > 0 && (
                <motion.button
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  disabled={isSubmitting}
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors duration-200 disabled:opacity-50"
                  onClick={prev}
                >
                  <ChevronLeft size={20} />
                  <span className="font-medium">Back</span>
                </motion.button>
              )}
            </AnimatePresence>
          </div>

          {/* Form Content */}
          <div className="min-h-[500px] p-6 pt-4">
            <form onSubmit={handleSubmit(formSubmit)} className="h-full">
              <AnimatePresence mode="wait">
                {currentStep === 0 && (
                  <motion.div
                    key="step-1"
                    initial={{ x: delta >= 0 ? "100%" : "-100%", opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: delta >= 0 ? "-100%" : "100%", opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.4, 0.0, 0.2, 1] }}
                    className="h-full"
                  >
                    <StepOne register={register}>
                      <ContinueButton
                        type="button"
                        onClick={next}
                        disabled={!firstName}
                        onKeyDown={(e) => e.key === "Enter" && next()}
                        className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02]"
                      >
                        Continue
                      </ContinueButton>
                    </StepOne>
                  </motion.div>
                )}

                {currentStep === 1 && (
                  <motion.div
                    key="step-2"
                    initial={{ x: delta >= 0 ? "100%" : "-100%", opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: delta >= 0 ? "-100%" : "100%", opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.4, 0.0, 0.2, 1] }}
                    className="h-full"
                  >
                    <StepTwo register={register} errors={errors}>
                      <ContinueButton
                        type="button"
                        onClick={next}
                        disabled={!email || !password}
                        className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02]"
                      >
                        Continue
                      </ContinueButton>
                    </StepTwo>
                  </motion.div>
                )}

                {currentStep === 2 && (
                  <motion.div
                    key="step-3"
                    initial={{ x: delta >= 0 ? "100%" : "-100%", opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: delta >= 0 ? "-100%" : "100%", opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.4, 0.0, 0.2, 1] }}
                    className="h-full"
                  >
                    <StepThree
                      selectedTheme={selectedTheme}
                      setSelectedTheme={setSelectedTheme}
                    >
                      <ContinueButton
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full h-12 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] flex items-center justify-center gap-2"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Setting up your account...
                          </>
                        ) : (
                          "Complete Setup"
                        )}
                      </ContinueButton>
                    </StepThree>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </div>

          {/* Footer */}
          <div className="p-6 pt-0 border-t border-gray-100/50">
            <div className="text-center mb-4">
              <Link
                href="/login"
                className="text-indigo-600 hover:text-indigo-700 font-semibold transition-colors duration-200"
              >
                Already have an account? Sign in
              </Link>
            </div>

            {/* Enhanced Progress Bar */}
            <div className="space-y-2">
              <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progressValue}%` }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
              </div>
              <div className="text-center">
                <span className="text-sm font-medium text-gray-600">
                  Step {currentStep + 1} of {steps.length}
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default RegisterForm;
