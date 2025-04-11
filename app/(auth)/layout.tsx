import React, { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <section className="w-full min-h-svh flex justify-center items-center bg-gray-100">
      {children}
    </section>
  );
};

export default layout;
