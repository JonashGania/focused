"use client";

import { useAnimate } from "@/hooks/use-animate";
import { X } from "lucide-react";
import Timers from "./Timers";
import AlertSounds from "./AlertSounds";
import AmbientThemes from "./AmbientThemes";

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
        className={`fixed left-0 top-0 bottom-0 h-svh bg-black w-[400px] z-50 transition-transform duration-200 ease-in-out py-6 pr-6 ${
          isAnimating ? "translate-x-[0px]" : "translate-x-[-100%]"
        }`}
      >
        <div className="relative h-full">
          <button
            onClick={onClose}
            className="absolute -top-8 -right-1 cursor-pointer"
          >
            <X size={25} className="text-white/60 hover:text-white" />
          </button>
          <div className="mt-6 pl-6 overflow-y-auto scrollbar-thin scrollbar-thumb-neutral-700 scrollbar-track-black h-full pr-2">
            <Timers />
            <AlertSounds />
            <AmbientThemes />
          </div>
        </div>
      </aside>
    </>
  );
};

export default SettingsSidebar;
