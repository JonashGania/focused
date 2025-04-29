"use client";

import { ReactNode, useEffect, useState } from "react";

const Hydrated = ({ children }: { children: ReactNode }) => {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) return null;

  return <>{children}</>;
};

export default Hydrated;
