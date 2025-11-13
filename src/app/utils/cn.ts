import clsx from "clsx";

export const cn = (...classes: (string | undefined | boolean)[]) => {
  return clsx(...classes);
};
