interface TextareaProps {
  placeholder: string;
  errorMessage?: string;
  currentMessageLength?: number;
}

const Textarea = ({
  placeholder,
  errorMessage,
  currentMessageLength = 0,
}: TextareaProps) => {
  return (
    <>
      <div className="px-[16px] w-full rounded-lg border border-gray-300 focus-within:border-[#03C124]">
        <textarea
          className="resize-none w-full min-h-[80px] leading-[130%] placeholder:text-[#8F8F8F] focus:outline-none py-[12px] text-[#121212]"
          placeholder={placeholder}
        />
        <label className="flex justify-end items-center min-h-[38px] text-[#8F8F8F] text-sm">
          {currentMessageLength}/80자 (최소 8자)
        </label>
      </div>
      {errorMessage && (
        <span className="mt-1 block text-[#E82929]">{errorMessage}</span>
      )}
    </>
  );
};

export default Textarea;
