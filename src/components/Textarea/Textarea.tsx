interface TextareaProps {
  placeholder: string;
}

const Textarea = ({ placeholder }: TextareaProps) => {
  return (
    <div className="w-full">
      <textarea
        className="resize-none w-full min-h-[80px] leading-[130%] placeholder:text-[#8F8F8F]"
        placeholder={placeholder}
      />
      <p className="min-h-[38px] text-right text-[#8F8F8F] text-sm">
        0/80자 (최소 8자)
      </p>
    </div>
  );
};

export default Textarea;
