import React from "react";

const Timers = () => {
  return (
    <div>
      <h1 className="text-3xl text-white font-bold">Focus Timer</h1>
      <h2 className="text-xl text-white font-bold mt-5">Timer Lengths</h2>
      <span className="text-neutral-400 font-base">
        Adjust your timer for maximum productivity.
      </span>
      <div className="flex mt-4 gap-6">
        <div className="flex flex-col space-y-1">
          <label htmlFor="focus-time" className="text-white text-lg">
            Focus
          </label>
          <div className="w-[115px] border-2 border-neutral-500 focus-within:border-white rounded-sm flex items-center justify-between gap-1 pl-2 pr-1 py-1.5">
            <input
              type="number"
              id="focus-time"
              min={1}
              max={1440}
              className="flex-1 text-white outline-none timer-input"
            />
            <span className="text-neutral-400 text-sm font-semibold mr-1">
              mins
            </span>
          </div>
        </div>
        <div className="flex flex-col space-y-1">
          <label htmlFor="break-time" className="text-white text-lg">
            Break
          </label>
          <div className="w-[115px] border-2 border-neutral-500 focus-within:border-white  rounded-sm flex items-center justify-between gap-1 pl-2 pr-1 py-1.5">
            <input
              type="number"
              id="break-time"
              min={1}
              max={1440}
              className="flex-1 text-white outline-none timer-input"
            />
            <span className="text-neutral-400 text-sm font-semibold mr-1">
              mins
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timers;
