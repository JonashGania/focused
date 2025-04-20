"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export const addTask = async (formData: FormData) => {
  const supabase = await createClient();
  const taskInput = formData.get("task") as string | null;

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User is not logged in");
  }

  const { error } = await supabase
    .from("todos")
    .insert({ user_id: user.id, task: taskInput });

  if (error) {
    throw new Error("Error adding task");
  }

  revalidatePath("/");
};

export const deleteTask = async (taskId: number) => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User is not logged in");
  }

  const { error } = await supabase
    .from("todos")
    .delete()
    .match({ user_id: user.id, id: taskId });

  if (error) {
    throw new Error("Error deleting task");
  }

  revalidatePath("/");
};

export const updateTaskCompletion = async (
  taskId: number,
  isComplete: boolean
) => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User is not logged in");
  }

  const { error } = await supabase
    .from("todos")
    .update({ is_complete: isComplete })
    .eq("id", taskId)
    .eq("user_id", user.id);

  if (error) {
    throw new Error("Error updating task completion");
  }

  revalidatePath("/");
};

// export const updateTaskPositions = async (
//   taskUpdates: { id: number; position: number }[]
// ) => {
//   const supabase = await createClient();

//   const {
//     data: { user },
//   } = await supabase.auth.getUser();

//   if (!user) {
//     throw new Error("User is not logged in");
//   }

//   const promises = taskUpdates.map(({ id, position }) => {
//     return supabase
//       .from("todos")
//       .update({ position })
//       .eq("id", id)
//       .eq("user_id", user.id);
//   });

//   try {
//     await Promise.all(promises);
//   } catch (error) {
//     console.error("Error reordering tasks", error);
//     throw new Error("Failed to reorder task positions");
//   }
// };
