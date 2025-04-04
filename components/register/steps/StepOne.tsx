import React from "react";
import ContinueButton from "@/components/buttons/ContinueButton";

const StepOne = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-8">
      <h2 className="pt-4 font-bold text-3xl text-zinc-700">
        Let&apos;s start with your name
      </h2>
      <input
        type="text"
        placeholder="First name"
        className="text-2xl text-center border border-gray-400/30 rounded-md focus:outline-none px-1 py-2"
      />
      <ContinueButton />
    </div>
  );
};

export default StepOne;
