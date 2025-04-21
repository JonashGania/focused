import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Tasks, TaskAction } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const slugify = (str: string) => {
  return str
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "");
};

export const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
};

export const themes = [
  { name: "Snowy Winter Cabin", image: "/themes/snowy-winter-cabin.jpg" },
  { name: "Countryside Afternoon", image: "/themes/countryside-afternoon.jpg" },
  { name: "Rainy Street Night", image: "/themes/rainy-street-night.jpg" },
  { name: "Sakura Street", image: "/themes/sakura-street.jpg" },
  { name: "Sunset Fall Season", image: "/themes/sunset-fall-season.jpg" },
  { name: "Sunset Valley", image: "/themes/sunset-valley.jpg" },
  { name: "Wisdom Forest", image: "/themes/wisdom-forest.jpg" },
];

export const taskReducer = (state: Tasks[] | null, action: TaskAction) => {
  if (!state) return [];

  switch (action.action) {
    case "delete":
      return state.filter((task) => task.id !== action.task.id);
    case "updateTask":
      return state.map((task) =>
        task.id === action.task.id ? action.task : task
      );
    default:
      return state;
  }
};
