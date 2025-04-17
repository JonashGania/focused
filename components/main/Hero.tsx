"use client";

import Pomodoro from "./Pomodoro";
import Dialog from "../dialogs/Dialog";
import { Check } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";
import { Pencil } from "lucide-react";

const Hero = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full px-8">
      <Pomodoro />
      <div
        className="flex mt-6 max-w-[500px] mx-auto"
        onClick={() => setIsOpen(true)}
      >
        <p className="flex-1 text-white text-center font-bold text-3xl cursor-pointer">
          Create your priorities for the day ✏️
        </p>
      </div>
      <Dialog isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <h2 className="text-center text-white text-3xl font-bold mt-4">
          Your Priorities
        </h2>
        <h4 className="text-center text-gray-200 text-base">
          What do you want to work on for the day?
        </h4>
        {/* <div className="mt-8 flex flex-col gap-3">
          <div className="w-full flex py-4 px-4 bg-gray-200 cursor-pointer rounded-lg">
            <div className="flex items-center flex-1 gap-2">
              <div className="w-6 h-6 border rounded-full bg-red-500 flex justify-center items-center">
                <Check
                  size={15}
                  strokeWidth={4}
                  className="text-gray-200 mt-0.5"
                />
              </div>
              <span className="text-neutral-900 font-medium ">
                Take out garbage
              </span>
            </div>
            <button className="cursor-pointer">
              <Pencil size={20} className="text-zinc-700" />
            </button>
          </div>
        </div> */}
        <div className="mt-8">
          <input
            type="text"
            placeholder="Type your task"
            className="w-full text-white border-b-2 border-b-gray-200/50 focus:border-b-gray-300 outline-none pb-2 transition-[border] duration-300"
          />
          <div className="mt-6 flex justify-center space-x-4">
            <Button className="bg-transparent border border-white cursor-pointer w-[75px]">
              Add
            </Button>
            <Button className="bg-transparent border border-red-500 text-red-500 cursor-pointer w-[75px]">
              Clear
            </Button>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default Hero;
