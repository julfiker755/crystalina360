import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const PlaceholderImg = (
  width: number = 600,
  height: number = 400
): string => {
  return `https://placehold.co/${width}x${height}.png`;
};
export const RandomImg = (
  width: number = 1000,
  height: number = 600
): string => {
  return `https://picsum.photos/${width}/${height}`;
};
