interface TextareaProps {
  placeholder: string;
}

const Textarea = ({ placeholder }: TextareaProps) => {
  return (
    <div className="w-full rounded-lg border border-gray-300 focus-within:border-[#03C124]">
      <textarea
        className="resize-none w-full min-h-[80px] leading-[130%] placeholder:text-[#8F8F8F] focus:outline-none px-[16px] py-[12px] text-[#121212]"
        placeholder={placeholder}
      />
      <p className="min-h-[38px] text-right text-[#8F8F8F] text-sm">
        0/80자 (최소 8자)
      </p>
    </div>
  );
};

export default Textarea;
