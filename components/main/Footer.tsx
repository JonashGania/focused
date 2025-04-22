import React from "react";
import { Music, Settings, LogOut } from "lucide-react";
import { signout } from "@/actions/auth";

const Footer = () => {
  return (
    <footer className="px-12 pb-8">
      <div className="flex gap-3 justify-start items-end">
        <button className="bg-neutral-900 p-3 rounded-md cursor-pointer border border-white/30 transform active:scale-90 transition-all duration-150 hover:bg-neutral-800">
          <Settings size={20} strokeWidth={2} className="text-white" />
        </button>
        <button className="bg-neutral-900 p-3 rounded-md cursor-pointer border border-white/30 transform active:scale-90 transition-all duration-150 hover:bg-neutral-800">
          <Music size={20} strokeWidth={2} className="text-white" />
        </button>
        <form action={signout}>
          <button className="bg-neutral-900 p-3 rounded-md cursor-pointer border border-white/30 transform active:scale-90 transition-all duration-150 hover:bg-neutral-800">
            <LogOut size={20} strokeWidth={2} className="text-white" />
          </button>
        </form>
        <div className="relative  pointer-events-none">
          <div className="absolute left-[-140px] bottom-[70px] bg-black/70  min-w-[500px] h-[500px] rounded-3xl"></div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
