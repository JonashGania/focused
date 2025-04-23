"use client";

import { Music, Settings, LogOut } from "lucide-react";
import { signout } from "@/actions/auth";
import { useState } from "react";
import SoundscapeWrapper from "./soundscape/SoundscapeWrapper";

const Footer = () => {
  const [openSounds, setOpenSounds] = useState(false);

  return (
    <footer className="px-12 pb-8">
      <div className="flex gap-3 justify-start items-end">
        <button className="bg-neutral-900 p-3 rounded-md cursor-pointer border border-white/30 transform active:scale-90 transition-all duration-150 hover:bg-neutral-800">
          <Settings size={20} strokeWidth={2} className="text-white" />
        </button>
        <button
          onClick={() => setOpenSounds((prev) => !prev)}
          className="bg-neutral-900 p-3 rounded-md cursor-pointer border border-white/30 transform active:scale-90 transition-all duration-150 hover:bg-neutral-800"
        >
          <Music size={20} strokeWidth={2} className="text-white" />
        </button>
        <form action={signout}>
          <button className="bg-neutral-900 p-3 rounded-md cursor-pointer border border-white/30 transform active:scale-90 transition-all duration-150 hover:bg-neutral-800">
            <LogOut size={20} strokeWidth={2} className="text-white" />
          </button>
        </form>
        <SoundscapeWrapper isOpen={openSounds} />
      </div>
    </footer>
  );
};

export default Footer;
