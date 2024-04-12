interface ITimeButton {
  name: string;
  className?: string;
  onClick?: any;
  clicked?: boolean;
}

function TimeButton({ name, className, onClick, clicked }: ITimeButton) {
  return (
    <div
      className={`rounded-md border justify-center items-center flex text-[14px] font-[600] p-[8px] h-[33px]
        ${className} ${
        clicked
          ? "bg-violet-100 border-violet-300 text-[#4A25A9]"
          : "border-neutral-400 text-neutral-400"
      }`}
      onClick={onClick}
    >
      ​​​​​​{name}
    </div>
  );
}
export default TimeButton;
