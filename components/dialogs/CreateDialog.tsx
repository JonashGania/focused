"use client";

import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";
import { Input } from "../ui/input";

const CreateDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex mt-6 max-w-[500px] mx-auto">
          <p className="flex-1 text-white text-center font-bold text-3xl cursor-pointer">
            Add your priorities for the day ✏️
          </p>
        </div>
      </DialogTrigger>
      <DialogContent className="bg-black border-0 px-8">
        <DialogHeader className="pb-4">
          <DialogTitle className="text-center text-white text-3xl font-bold">
            Your Priorities
          </DialogTitle>
          <DialogDescription className="text-center text-gray-200 text-base">
            What do you want to work on for the day?
          </DialogDescription>
        </DialogHeader>
        <Input
          type="text"
          placeholder="Type your task"
          className="text-white text-2xl py-3 focus-visible:ring-0 focus-visible:ring-white"
        />
      </DialogContent>
    </Dialog>
  );
};

export default CreateDialog;
