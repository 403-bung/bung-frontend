type ButtonParams = {
  text: string;
  onClick?: () => void;
  disabled?: boolean;
};

export default function Button({ text, onClick, disabled }: ButtonParams) {
  return (
    <button
      type="button"
      className="w-[343px] h-[59px] bg-[#4A25A9] disabled:bg-[#727272] rounded-[10px] font-semibold text-[18px] text-white"
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
}
