type ButtonParams = {
  text: string;
  onclick?: () => void;
};

export default function Button({ text, onclick }: ButtonParams) {
  return (
    <button
      onClick={onclick}
      className="w-[343px] h-[59px] bg-stone-200 rounded-[10px] font-semibold text-[18px]"
    >
      {text}
    </button>
  );
}
