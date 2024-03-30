type ButtonParams = {
  text: string;
  onClick?: () => void;
};

export default function KaKaoLoginBtn({ text, onClick }: ButtonParams) {
  return (
    <button
      type="button"
      className="w-[343px] h-[59px] bg-[#FEE500] rounded-[10px] font-semibold text-[18px] text-[#1F1F1F]"
      onClick={onClick}
    >
      {text}
    </button>
  );
}
