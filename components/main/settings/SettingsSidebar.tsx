"use client";

import React from "react";
import { useAnimate } from "@/hooks/use-animate";
import { X } from "lucide-react";
import Timers from "./Timers";

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const SettingsSidebar = ({ isOpen, onClose }: DialogProps) => {
  const { shouldRender, isAnimating } = useAnimate(isOpen, 200);

  if (!shouldRender) return null;
  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-200 ease-out ${
          isAnimating ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      ></div>
      <aside
        className={`fixed left-0 top-0 bottom-0 h-svh bg-black w-[400px] z-50 transition-transform duration-200 ease-in-out p-6 ${
          isAnimating ? "translate-x-[0px]" : "translate-x-[-100%]"
        }`}
      >
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute top-0 right-0 cursor-pointer"
          >
            <X size={25} className="text-white/60 hover:text-white" />
          </button>
          <Timers />
        </div>
      </aside>
    </>
  );
};

export default SettingsSidebar;
