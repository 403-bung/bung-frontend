import { Link, useLocation } from "react-router-dom";

export default function MypageTab() {
  const location = useLocation();
  const isTimelineActive = location.pathname === "/my/timeline";
  const isMannerActive = location.pathname === "/my/manner";

  return (
    <div className="w-full flex">
      <div className="w-1/2 flex flex-col items-center">
        <Link
          to="/my/timeline"
          className={`text-lg ${
            isTimelineActive
              ? "font-semibold text-[#4A25A9]"
              : "font-normal text-[#595959]"
          }`}
        >
          타임라인
        </Link>
        {isTimelineActive && <div className=" w-16 h-[1px] bg-[#4a25a9]" />}
      </div>
      <div className="w-1/2 flex flex-col items-center">
        <Link
          to="/my/manner"
          className={`text-lg ${
            isMannerActive
              ? "font-semibold text-[#4A25A9]"
              : "font-normal text-[#595959]"
          }`}
        >
          매너
        </Link>
        {isMannerActive && <div className=" w-8 h-[1px] bg-[#4a25a9]" />}
      </div>
    </div>
  );
}
