import right_arrow from "../icons/right_arrow_black.svg";
export default function AlarmTab() {
  return (
    <div className="w-full p-5 flex flex-col gap-2">
      <div className="flex items-center w-full">
        <span className="text-base font-semibold">알림</span>
        <img src={right_arrow} alt=""></img>
      </div>
      <div className="text-base font-normal w-full h-full border border-solid border-[#E4DEF2] rounded-lg flex items-center p-4">
        알림
      </div>
    </div>
  );
}
