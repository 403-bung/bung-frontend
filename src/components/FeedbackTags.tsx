import { useState } from "react";

interface FeedbackTagProps {
  label: string;
  value: string;
  onClick: (label: string) => void;
}

export default function FeedBackTags({
  label,
  value,
  onClick,
}: FeedbackTagProps) {
  const [clicked, setClicked] = useState<boolean>(false);
  const handleToggleClick = () => {
    setClicked(!clicked);
    onClick(value);
  };
  return (
    <button
      className={`h-[31px] px-[14px] py-[6px] mt-[12px] rounded-lg border ${
        clicked
          ? "bg-violet-100 border-violet-900 text-violet-900"
          : "border-violet-300 text-violet-900"
      } flex justify-center items-center text-base font-normal`}
      onClick={handleToggleClick}
      value={value}
    >
      {label}
    </button>
  );
}
