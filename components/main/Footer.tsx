"use client";

import { Music, Settings, LogOut, User } from "lucide-react";
import { signout } from "@/actions/auth";
import { useRef, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import SoundscapeWrapper from "./soundscape/SoundscapeWrapper";
import SettingsSidebar from "./settings/SettingsSidebar";

const Footer = () => {
  const [openSounds, setOpenSounds] = useState(false);
  const [openSettings, setOpenSettings] = useState(false);
  const musicButtonRef = useRef<HTMLButtonElement | null>(null);

  return (
    <footer className="px-4 min-[450px]:px-12 pb-8">
      <div className="flex gap-3 justify-start items-end">
        <button
          onClick={() => setOpenSettings((prev) => !prev)}
          className="bg-neutral-900 p-3 rounded-md cursor-pointer border border-white/30 transform active:scale-90 transition-all duration-150 hover:bg-neutral-800"
        >
          <Settings size={20} strokeWidth={2} className="text-white" />
        </button>
        <button
          ref={musicButtonRef}
          onClick={() => setOpenSounds((prev) => !prev)}
          className="bg-neutral-900 p-3 rounded-md cursor-pointer border border-white/30 transform active:scale-90 transition-all duration-150 hover:bg-neutral-800"
        >
          <Music size={20} strokeWidth={2} className="text-white" />
        </button>
        <Popover>
          <PopoverTrigger asChild>
            <button className="bg-neutral-900 p-3 rounded-md cursor-pointer border border-white/30 transform active:scale-90 transition-all duration-150 hover:bg-neutral-800">
              <User size={20} strokeWidth={2} className="text-white" />
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-[180px] p-0 py-3 mb-2">
            <div className="grid gap-2">
              <h4 className="text-black font-medium px-3">My Account</h4>
              <form action={signout}>
                <button className="flex items-center gap-2 group cursor-pointer hover:bg-red-500/10 w-full py-1 px-3">
                  <LogOut size={18} strokeWidth={2} className="text-red-500" />
                  <span className="text-red-500">Log out</span>
                </button>
              </form>
            </div>
          </PopoverContent>
        </Popover>

        <SoundscapeWrapper
          isOpen={openSounds}
          setOpen={setOpenSounds}
          musicButtonRef={musicButtonRef}
        />
        <SettingsSidebar
          isOpen={openSettings}
          onClose={() => setOpenSettings(false)}
        />
      </div>
    </footer>
  );
};

export default Footer;
