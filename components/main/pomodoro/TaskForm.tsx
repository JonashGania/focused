"use client";

import { Button } from "@/components/ui/button";
import { addTask } from "@/actions/tasks";
import { useFormStatus } from "react-dom";
import { useState } from "react";

const TaskForm = () => {
  const [taskInput, setTaskInput] = useState("");
  const { pending } = useFormStatus();

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("task", taskInput);

    await addTask(formData);
    setTaskInput("");
  };

  return (
    <div className="mt-8">
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          name="task"
          value={taskInput}
          autoComplete="off"
          onChange={(e) => setTaskInput(e.target.value)}
          disabled={pending}
          placeholder="Type your task"
          className="w-full text-white border-b-2 border-b-gray-200/50 focus:border-b-gray-300 outline-none pb-2 transition-[border] duration-300"
        />
        <div className="mt-6 flex justify-center space-x-4">
          <Button
            type="submit"
            className="bg-transparent border border-white cursor-pointer w-[75px]"
            disabled={pending || taskInput.trim() === ""}
          >
            Add
          </Button>
          <Button className="bg-transparent border border-red-500 text-red-500 cursor-pointer w-[75px]">
            Clear
          </Button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
