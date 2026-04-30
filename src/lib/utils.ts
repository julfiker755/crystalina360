import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const PlaceholderImg = (
  width: number = 600,
  height: number = 400,
): string => {
  return `https://placehold.co/${width}x${height}.png`;
};
export const RandomImg = (
  width: number = 1000,
  height: number = 600,
): string => {
  return `https://picsum.photos/${width}/${height}`;
};

export const fakeZoom =
  "https://us05web.zoom.us/j/81803180144?pwd=EIj4sgJYUYWc8qJKD7ERKx1WxwjnHh.1";

export function limitWords({ str, count = 3 }: any) {
  const words = str?.split(" ");
  const firstThree = words?.slice(0, count);
  return firstThree?.join(" ");
}

export const formOpts = {
  shouldValidate: true,
  shouldDirty: true,
  shouldTouch: true,
};
