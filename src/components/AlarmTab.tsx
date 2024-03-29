import right_arrow from "../icons/right_arrow_black.svg";
export default function AlarmTab() {
  return (
    <div className="w-full p-5 flex flex-col gap-2 bg-[#F2F2F6]">
      <div className="flex items-center w-full">
        <span className="text-base font-semibold">알림</span>
        <img src={right_arrow} alt=""></img>
      </div>
      <div className="bg-white text-base font-normal w-full h-full border border-solid border-[#E4DEF2] rounded-lg flex flex-col  p-5 gap-3">
        <div className="flex gap-2 items-center">
          <div className="w-[18px] h-[18px] bg-[#E4DEF2] rounded-sm"></div>
          <span className="text-[#1F1F1F] font-semibold text-base text-nowrap">
            닉네임님, 모집이 완료되었어요!
          </span>
        </div>
        <div className="text-base font-normal text-[#232323]">
          지금 당장 벙개를 만들어보세요!
        </div>
        <span className="text-[#BABABA] text-[14px] font-normal">
          mmdd 오후 06:23
        </span>
      </div>
    </div>
  );
}
