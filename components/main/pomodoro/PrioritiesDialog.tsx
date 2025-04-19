"use client";

import Dialog from "../../dialogs/Dialog";
import TaskForm from "./TaskForm";
import { Checkbox } from "@/components/ui/checkbox";
import { useState, useOptimistic, startTransition } from "react";
import { Trash } from "lucide-react";
import { updateTaskCompletion, deleteTask } from "@/actions/tasks";
import { Tasks } from "@/types";
import { taskReducer } from "@/lib/utils";

const PrioritiesDialog = ({ tasks }: { tasks: Tasks[] | null }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [optimisticTasks, updateOptimisticTasks] = useOptimistic(
    tasks,
    taskReducer
  );

  return (
    <>
      <div
        className="flex mt-6 max-w-[500px] mx-auto"
        onClick={() => setIsOpen(true)}
      >
        <p className="flex-1 text-white text-center font-bold text-3xl cursor-pointer">
          Add your priorities here ✏️
        </p>
      </div>
      <Dialog isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <h2 className="text-center text-white text-3xl font-bold mt-4">
          Your Priorities
        </h2>
        <h4 className="text-center text-gray-200 text-base">
          What do you want to work on for the day?
        </h4>

        <div className="flex-1 max-h-[200px] mt-8 flex flex-col gap-3 overflow-y-auto scrollbar-thin scrollbar-thumb-neutral-700 scrollbar-track-black pr-2">
          {optimisticTasks?.map((task) => (
            <div
              key={task.id}
              className="w-full flex py-4 px-4 bg-gray-200 cursor-pointer rounded-lg"
            >
              <div className="flex items-center flex-1 gap-2">
                <Checkbox
                  checked={task.is_complete}
                  onCheckedChange={async (value) => {
                    if (value === "indeterminate") return;
                    startTransition(() => {
                      updateOptimisticTasks({
                        id: task.id,
                        is_complete: Boolean(value),
                      });
                    });
                    await updateTaskCompletion(task.id, value);
                  }}
                  className="rounded-full border-2 size-5 data-[state=checked]:bg-red-500 data-[state=checked]:border-red-500 border-neutral-600"
                />
                <span
                  className={` font-medium ${
                    task.is_complete
                      ? "line-through text-neutral-900/60"
                      : "text-neutral-900"
                  }`}
                >
                  {task.task}
                </span>
              </div>
              <button
                onClick={async () => {
                  await deleteTask(task.id);
                }}
                className="cursor-pointer"
              >
                <Trash size={20} className="text-red-500" />
              </button>
            </div>
          ))}
        </div>

        <TaskForm />
      </Dialog>
    </>
  );
};

export default PrioritiesDialog;
