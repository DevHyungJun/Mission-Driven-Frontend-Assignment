import Image from "next/image";
import * as Icons from "./index";

/**
 * 아이콘 컴포넌트
 * @param name - 아이콘 이름(필수)
 * @param className - 추가 스타일 클래스(선택)
 * @param size - 크기(선택)
 * @param aria-hidden - 접근성 라벨(선택)
 *
 * @example
 * <Icon name="chevron-left" />
 *
 * @description
 * - name은 아이콘 이름을 나타냅니다. 아이콘 이름 타입은 Icon/index.ts에 정의된 이름 중 하나를 선택할 수 있습니다.
 */

export interface IconProps {
  name: keyof typeof Icons;
  className?: string;
  size?: number;
  ariaHidden?: boolean;
}

const Icon = ({
  name,
  className,
  size = 24,
  ariaHidden: ariaHidden,
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
