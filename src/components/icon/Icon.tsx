import Image from "next/image";
import * as Icons from "./index";

export interface IconProps {
  name: keyof typeof Icons;
  className?: string;
  size?: number;
  "aria-hidden"?: boolean;
}

const Icon = ({
  name,
  className,
  size = 24,
  "aria-hidden": ariaHidden,
}: IconProps) => {
  return (
    <Image
      src={Icons[name]}
      alt={ariaHidden ? "" : name}
      width={size}
      height={size}
      className={className}
      aria-hidden={ariaHidden}
    />
  );
};

export default Icon;
