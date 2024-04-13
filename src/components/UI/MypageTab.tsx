import { Link, useLocation } from "react-router-dom";

type MypageTabProps = {
  timelinePath: string;
  mannerPath: string;
};
export default function MypageTab({
  timelinePath,
  mannerPath,
}: MypageTabProps) {
  const location = useLocation();
  const isTimelineActive = location.pathname === timelinePath;
  const isMannerActive = location.pathname === mannerPath;

  return (
    <div className="w-full flex">
      <div className="w-1/2 px-[10px] pt-[10px] flex flex-col justify-center items-center gap-[10px]">
        <Link
          to={timelinePath}
          className={`text-lg ${
            isTimelineActive
              ? "font-semibold text-[#4A25A9]"
              : "font-normal text-[#595959]"
          }`}
        >
          타임라인
        </Link>
        {isTimelineActive ? (
          <div className=" w-16 h-[1px] bg-[#4a25a9]" />
        ) : (
          <div className=" w-16 h-[1px] bg-white" />
        )}
      </div>
      <div className="w-1/2 px-[10px] pt-[10px] flex flex-col justify-center items-center gap-[10px]">
        <Link
          to={mannerPath}
          className={`text-lg ${
            isMannerActive
              ? "font-semibold text-[#4A25A9]"
              : "font-normal text-[#595959]"
          }`}
        >
          매너
        </Link>
        {isMannerActive ? (
          <div className=" w-8 h-[1px] bg-[#4a25a9]" />
        ) : (
          <div className=" w-16 h-[1px] bg-white" />
        )}
      </div>
    </div>
  );
}
