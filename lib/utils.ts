import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const slugify = (str: string) => {
  return str
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "");
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
