import clsx from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...classes: (string | undefined | boolean)[]) => {
  return twMerge(clsx(...classes));
};
