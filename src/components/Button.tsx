type ButtonParams = {
  text: string;
};

export default function Button({ text }: ButtonParams) {
  return (
    <button
      type="button"
      className="w-[343px] h-[59px] bg-stone-500 rounded-[10px]"
    >
      {text}
    </button>
  );
}
