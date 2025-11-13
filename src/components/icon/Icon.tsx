import Image from "next/image";
import * as Icons from "./index";

export interface IconProps {
  name: keyof typeof Icons;
  className?: string;
  size?: number;
}

const Icon = ({ name, className, size = 24 }: IconProps) => {
  return (
    <Image
      src={Icons[name]}
      alt={name}
      width={size}
      height={size}
      className={className}
    />
  );
};

export default Icon;
