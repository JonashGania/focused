import React, { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <section className="w-full min-h-svh flex justify-center items-center bg-[url(/images/auth-bg.jpg)] bg-center bg-no-repeat bg-cover relative">
      <div className="absolute inset-0 bg-black/15 z-0"></div>
      {children}
    </section>
  );
};

export default layout;
