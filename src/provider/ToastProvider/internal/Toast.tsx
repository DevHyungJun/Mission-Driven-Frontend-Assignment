import { cn } from "@/app/_utils/cn";

interface ToastProps {
  message: string;
}

const Toast = ({ message }: ToastProps) => {
  return (
    <div
      className={cn(
        "w-full px-[16px] py-[16px] bg-[#323232] border border-[#E5E5E5] rounded-[8px] shadow-lg mx-auto text-center",
        "md:max-w-[520px]"
      )}
    >
      <p className="text-[16px] text-white leading-[130%] tracking-[-0.02em]">
        {message}
      </p>
    </div>
  );
};

export default Toast;
