import Icon from "../../Icon/Icon";

interface ModalHeaderProps {
  onClose: () => void;
}

// 모달 헤더 컴포넌트
const ModalHeader = ({ onClose }: ModalHeaderProps) => {
  return (
    <div className="h-[56px] flex justify-end items-center pr-[16px]">
      <button aria-label="닫기" onClick={onClose} className="cursor-pointer">
        <Icon name="X" size={28} className="md:size-8" />
      </button>
    </div>
  );
};

export default ModalHeader;
