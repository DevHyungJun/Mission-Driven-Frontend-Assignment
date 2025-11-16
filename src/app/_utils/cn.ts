import clsx from "clsx";
import { twMerge } from "tailwind-merge";

// clsx와 tailwind-merge를 사용하여 클래스 병합
export const cn = (...classes: (string | undefined | boolean)[]) => {
  return twMerge(clsx(...classes));
};
