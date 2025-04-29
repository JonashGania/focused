import { useCallback, useEffect, useMemo, useState } from "react";
import { Tasks } from "@/types";

export const useTaskOrder = (optimisticTasks: Tasks[] | null) => {
  const [orderedIds, setOrderedIds] = useState<number[]>([]);

  const setOrderedIdsCallback = useCallback((ids: number[]) => {
    setOrderedIds(ids);
    localStorage.setItem("focusd-task-order", JSON.stringify(ids));
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem("focusd-task-order");
    if (stored) {
      setOrderedIds(JSON.parse(stored));
    }
  }, []);

  const orderedTasks = useMemo(() => {
    if (!optimisticTasks) return [];
    const taskMap = new Map(optimisticTasks.map((task) => [task.id, task]));

    const sorted = orderedIds
      .map((id) => taskMap.get(id))
      .filter(Boolean) as Tasks[];

    const remainingTasks = optimisticTasks.filter(
      (task) => !orderedIds.includes(task.id)
    );
    return [...sorted, ...remainingTasks];
  }, [optimisticTasks, orderedIds]);

  return {
    orderedTasks,
    setOrderedIdsCallback,
  };
};
