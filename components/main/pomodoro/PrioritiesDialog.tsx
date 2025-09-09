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
import { motion, AnimatePresence } from "motion/react";
import { ListTodo, Plus, Sparkles, Target, ArrowRight } from "lucide-react";

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

  const hasActiveTasks = orderedTasks.length > 0;
  const currentTask = hasActiveTasks ? orderedTasks[0].task : null;

  return (
    <>
      {/* Priority Display Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="mt-12 max-w-[600px] mx-auto"
      >
        <div className="text-center mb-8">
          <motion.h3
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-white/80 text-lg mb-4 flex items-center justify-center gap-2"
          >
            <Target className="w-5 h-5" />
            Today&apos;s Main Priority
          </motion.h3>

          <motion.div
            onClick={() => setIsOpen(true)}
            className="relative group cursor-pointer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Background glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-white/10 to-white/5 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative bg-gradient-to-r from-white/10 via-white/15 to-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20 group-hover:border-white/30 transition-all duration-300">
              <AnimatePresence mode="wait">
                {hasActiveTasks ? (
                  <motion.div
                    key="has-tasks"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center justify-between"
                  >
                    <div className="flex-1 text-left">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full animate-pulse" />
                        <span className="text-white/60 text-sm font-medium uppercase tracking-wider">
                          Focus on
                        </span>
                      </div>
                      <h2 className="text-white font-bold text-2xl min-[450px]:text-3xl leading-tight">
                        {currentTask}
                      </h2>
                      <p className="text-white/60 text-sm mt-2">
                        {orderedTasks.length > 1 &&
                          `+${orderedTasks.length - 1} more task${
                            orderedTasks.length > 2 ? "s" : ""
                          } waiting`}
                      </p>
                    </div>

                    <div className="flex flex-col items-center gap-2 ml-6">
                      <motion.div
                        animate={{ x: [0, 5, 0] }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                        className="text-white/40 group-hover:text-white/60 transition-colors"
                      >
                        <ArrowRight size={24} />
                      </motion.div>
                      <span className="text-white/40 text-xs group-hover:text-white/60 transition-colors">
                        Click to edit
                      </span>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="no-tasks"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-center"
                  >
                    <div className="flex items-center justify-center gap-3 mb-4">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 20,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      >
                        <Plus className="w-8 h-8 text-white/60" />
                      </motion.div>
                      <Sparkles className="w-6 h-6 text-white/40" />
                    </div>
                    <h2 className="text-white font-bold text-2xl min-[450px]:text-3xl mb-2">
                      Add your priorities here
                    </h2>
                    <p className="text-white/60 text-base">
                      Start by adding what you want to accomplish today
                    </p>

                    <motion.div
                      animate={{ y: [0, -5, 0] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="mt-6"
                    >
                      <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 rounded-full border border-white/20">
                        <span className="text-white/80 text-sm font-medium">
                          Click to get started
                        </span>
                        <ArrowRight size={16} className="text-white/60" />
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        {/* Quick Stats */}
        {hasActiveTasks && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="grid grid-cols-2 gap-4 max-w-md mx-auto"
          >
            <div className="text-center p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
              <ListTodo className="w-5 h-5 text-blue-400 mx-auto mb-2" />
              <p className="text-white font-semibold text-lg">
                {orderedTasks.length}
              </p>
              <p className="text-white/60 text-sm">Total Tasks</p>
            </div>
            <div className="text-center p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
              <Target className="w-5 h-5 text-purple-400 mx-auto mb-2" />
              <p className="text-white font-semibold text-lg">1</p>
              <p className="text-white/60 text-sm">Active Focus</p>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Enhanced Dialog */}
      <Dialog isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="h-full flex flex-col"
        >
          {/* Dialog Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20">
                <ListTodo className="w-6 h-6 text-white" />
              </div>
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Sparkles className="w-5 h-5 text-white/70" />
              </motion.div>
            </div>
            <h2 className="text-white text-3xl font-bold mb-2">
              Your Priorities
            </h2>
            <p className="text-gray-200 text-base leading-relaxed">
              What do you want to work on today?
              <br />
              <span className="text-white/60 text-sm">
                Drag to reorder by importance
              </span>
            </p>
          </div>

          {/* Tasks List */}
          <div className="flex-1 max-h-[280px] mb-6">
            <AnimatePresence>
              {orderedTasks.length > 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col gap-3 overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-neutral-700 scrollbar-track-transparent pr-2"
                >
                  <DndContext
                    modifiers={[restrictToVerticalAxis]}
                    onDragEnd={handleDragEnd}
                  >
                    <SortableContext items={orderedTasks}>
                      {orderedTasks.map((task, index) => (
                        <motion.div
                          key={task.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <TaskList
                            task={task}
                            updateOptimisticTasks={updateOptimisticTasks}
                          />
                        </motion.div>
                      ))}
                    </SortableContext>
                  </DndContext>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center h-full py-12"
                >
                  <div className="text-center">
                    <motion.div
                      animate={{ y: [-5, 5, -5] }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="mb-6"
                    >
                      <div className="w-16 h-16 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/20">
                        <ListTodo className="w-8 h-8 text-white/60" />
                      </div>
                    </motion.div>
                    <h3 className="text-white font-semibold text-xl mb-2">
                      No tasks yet
                    </h3>
                    <p className="text-white/60 text-sm max-w-xs">
                      Add your first priority below to get started with focused
                      work sessions
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Task Form */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <TaskForm updateOptimisticTasks={updateOptimisticTasks} />
          </motion.div>
        </motion.div>
      </Dialog>
    </>
  );
};

export default PrioritiesDialog;
