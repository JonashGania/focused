"use client";

import Dialog from "../../dialogs/Dialog";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import { useState, useOptimistic, startTransition } from "react";
import { Tasks } from "@/types";
import { taskReducer } from "@/lib/utils";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";

const PrioritiesDialog = ({ tasks }: { tasks: Tasks[] | null }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [optimisticTasks, updateOptimisticTasks] = useOptimistic(
    tasks,
    taskReducer
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id && optimisticTasks) {
      const oldIndex = optimisticTasks.findIndex(
        (task) => task.id === active.id
      );
      const newIndex = optimisticTasks.findIndex((task) => task.id === over.id);

      const reorderedTask = arrayMove(optimisticTasks, oldIndex, newIndex);

      startTransition(() => {
        updateOptimisticTasks({
          action: "reorderTasks",
          tasks: reorderedTask,
        });
      });
    }
  };

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

        <div className="flex-1 max-h-[230px] mt-8 flex flex-col gap-3 overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-neutral-700 scrollbar-track-black pr-2">
          <DndContext
            modifiers={[restrictToVerticalAxis]}
            onDragEnd={handleDragEnd}
          >
            <SortableContext items={optimisticTasks ?? []}>
              {optimisticTasks?.map((task) => (
                <TaskList
                  key={task.id}
                  task={task}
                  updateOptimisticTasks={updateOptimisticTasks}
                />
              ))}
            </SortableContext>
          </DndContext>
        </div>

        <TaskForm />
      </Dialog>
    </>
  );
};

export default PrioritiesDialog;
