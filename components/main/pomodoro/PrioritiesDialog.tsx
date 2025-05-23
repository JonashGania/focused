"use client";

import Dialog from "../../dialogs/Dialog";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import { useState, useOptimistic } from "react";
import { Tasks } from "@/types";
import { taskReducer } from "@/lib/utils";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { useTaskOrder } from "@/hooks/use-task-order";
import { motion } from "motion/react";

const PrioritiesDialog = ({ tasks }: { tasks: Tasks[] | null }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [optimisticTasks, updateOptimisticTasks] = useOptimistic(
    tasks,
    taskReducer
  );

  const { orderedTasks, setOrderedIdsCallback } = useTaskOrder(optimisticTasks);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const oldIndex = orderedTasks.findIndex((task) => task.id === active.id);
    const newIndex = orderedTasks.findIndex((task) => task.id === over.id);

    if (oldIndex === -1 || newIndex === -1) return;

    const reorderedTasks = arrayMove(orderedTasks, oldIndex, newIndex);
    const ids = reorderedTasks.map((task) => task.id);

    setOrderedIdsCallback(ids);
  };

  return (
    <>
      <div
        className="flex justify-center mt-6 max-w-[500px] mx-auto"
        onClick={() => setIsOpen(true)}
      >
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.3, ease: "easeInOut" }}
          className="text-white text-center font-bold text-2xl min-[450px]:text-3xl cursor-pointer"
        >
          {orderedTasks.length > 0
            ? orderedTasks[0].task
            : "Add your priorities here"}{" "}
          ✏️
        </motion.p>
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
            <SortableContext items={orderedTasks}>
              {orderedTasks.map((task) => (
                <TaskList
                  key={task.id}
                  task={task}
                  updateOptimisticTasks={updateOptimisticTasks}
                />
              ))}
            </SortableContext>
          </DndContext>
        </div>

        <TaskForm updateOptimisticTasks={updateOptimisticTasks} />
      </Dialog>
    </>
  );
};

export default PrioritiesDialog;
