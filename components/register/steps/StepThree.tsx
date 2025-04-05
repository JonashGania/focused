import React from "react";

const StepThree = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <h2 className="pt-4 font-bold text-2xl text-zinc-800 text-center">
        Lastly, select a theme of your <br /> choice 🌈
      </h2>
      {children}
    </div>
  );
};

export default StepThree;
