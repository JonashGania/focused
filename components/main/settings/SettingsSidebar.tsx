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
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-200 ease-out ${
          isAnimating ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      ></div>
      <aside
        className={`fixed left-0 top-0 bottom-0 h-svh  bg-gradient-to-b from-gray-900 via-gray-900 to-black w-[400px] z-50 transition-transform duration-200 ease-in-out py-6 pr-6 ${
          isAnimating ? "translate-x-[0px]" : "translate-x-[-100%]"
        }`}
      >
        <div className="relative pl-6 pr-2 pb-4 border-b border-white/10">
          <button
            onClick={onClose}
            className="absolute right-0 top-0 p-2 rounded-lg bg-white/10 hover:bg-white/20 
                     text-white/60 hover:text-white transition-all duration-200 cursor-pointer"
          >
            <X size={20} />
          </button>
          <h1 className="text-2xl font-bold text-white">Pomodoro Settings</h1>
          <p className="text-white/60 mt-1">Customize your focus experience</p>
        </div>
        <div className="mt-6 pl-6 pr-2 h-full overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent pb-32">
          <Timers />
          <AlertSounds />
          <AmbientThemes />
        </div>
      </aside>
    </>
  );
};

export default SettingsSidebar;
