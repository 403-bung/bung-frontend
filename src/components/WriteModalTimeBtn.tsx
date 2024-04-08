interface ITimeButton {
  name: string;
  className?: string;
  onClick?: any;
  clicked?: boolean;
}

function ModalTimeButton({ name, className, onClick, clicked }: ITimeButton) {
  return (
    <div
      className={`rounded-md border justify-center items-center flex text-[16px] font-[500] h-[39px] w-[80px]
        ${className} ${
        clicked
          ? "bg-violet-100 border-violet-300 text-[#4A25A9]"
          : "border-neutral-400 text-neutral-400"
      }`}
      onClick={onClick}
    >
      ​​​​​​{name}
      ​​​​
    </div>
  );
}
export default ModalTimeButton;
