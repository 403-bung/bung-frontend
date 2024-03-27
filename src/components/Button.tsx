type ButtonParams = {
  text: string;
  onClick: () => void;
};

export default function Button({ text, onClick }: ButtonParams) {
  return (
    <button
      type="button"
      className="w-[343px] h-[59px] bg-[#4A25A9] rounded-[10px] font-semibold text-[18px] text-white"
      onClick={onClick}
    >
      {text}
    </button>
  );
}
