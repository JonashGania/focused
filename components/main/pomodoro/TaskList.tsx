import { startTransition } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { updateTaskCompletion, deleteTask } from "@/actions/tasks";
import { Trash, Grip } from "lucide-react";
import { Tasks, TaskAction } from "@/types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface TasklistProp {
  task: Tasks;
  updateOptimisticTasks: (action: TaskAction) => void;
}

const TaskList = ({ task, updateOptimisticTasks }: TasklistProp) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      className="w-full flex py-4 px-4 bg-gray-200 rounded-lg "
      style={style}
    >
      <div className="flex items-center flex-1 gap-2">
        <Checkbox
          checked={task.is_complete}
          onCheckedChange={async (value) => {
            if (value === "indeterminate") return;
            const updateTask = { ...task, is_complete: Boolean(value) };

            startTransition(() => {
              updateOptimisticTasks({
                action: "updateTask",
                task: updateTask,
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
      <div className="flex items-center gap-2">
        <button
          {...attributes}
          {...listeners}
          className="cursor-grab active:cursor-grabbing"
        >
          <Grip size={20} className="text-neutral-800" />
        </button>
        <button
          onClick={async () => {
            startTransition(() => {
              updateOptimisticTasks({ action: "delete", task: task });
            });
            await deleteTask(task.id);
          }}
          className="cursor-pointer"
        >
          <Trash size={20} className="text-red-400" />
        </button>
      </div>
    </div>
  );
};

export default TaskList;
