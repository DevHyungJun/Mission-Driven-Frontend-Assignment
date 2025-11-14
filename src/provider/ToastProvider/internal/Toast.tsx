interface ToastProps {
  message: string;
}

const Toast = ({ message }: ToastProps) => {
  return (
    <div className="w-full px-[16px] py-[16px] bg-white border border-[#E5E5E5] rounded-[8px] shadow-lg">
      <p className="text-[16px] text-[#121212] leading-[130%] tracking-[-0.02em]">
        {message}
      </p>
    </div>
  );
};

export default Toast;
