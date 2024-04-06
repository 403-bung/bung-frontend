import sticker1 from "../icons/sticker1.svg";

export default function MannerArea() {
  return (
    <>
      <div className="w-[335px] h-40 bg-[#EDE9F6] px-10 py-5 rounded-lg flex justify-between m-5">
        <img src={sticker1} alt="sticker" />
        <div className="font-semibold text-sm flex flex-col gap-2">
          <span className="text-[#1f1f1f]">전체 평균</span>
          <span className="text-[#4A25A9]">매우 좋음 2.3/3</span>
        </div>
      </div>
      <div className="bg-[#F2F2F6] w-full h-screen">
        <div className="w-full flex flex-col px-5 pt-5 pb-7 bg-white">
          <div className="text-base font-semibold text-[#1f1f1f] flex gap-[10px]">
            <span>받은 매너 평가</span>
            <span>20</span>
          </div>
          <div className="flex flex-col gap-1">
            <div className="p-[10px] flex justify-between">
              <span>친절해요</span>
              <span>11명</span>
            </div>
            <div className=" h-px self-stretch bg-[#EDE9F6]" />
            <div className="p-[10px] flex justify-between">
              <span>열심히 참여해요</span>
              <span>6명</span>
            </div>
            <div className=" h-px self-stretch bg-[#EDE9F6]" />
            <div className="p-[10px] flex justify-between">
              <span>시간 약속을 잘지켜요</span>
              <span>3명</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
