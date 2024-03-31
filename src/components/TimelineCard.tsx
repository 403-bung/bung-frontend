type TimelineCardProps = {
  status: string;
  title: string;
  time: string;
  category: string;
  tag: string;
  date?: string;
};

export default function TimelineCard({
  status,
  title,
  time,
  category,
  tag,
  date,
}: TimelineCardProps) {
  return (
    <div className="flex gap-[14px]">
      <span className="w-10 font-semibold text-base text-nowrap">{date}</span>
      <div className="w-full p-4 bg-white border border-solid border-[#E4DEF2] rounded-lg flex flex-col gap-5">
        <span className=" font-semibold text-[14px] text-[#4A25A9]">
          {status}
        </span>
        <div>
          <span className=" font-semibold text-base">{title}</span>
          <div className="flex items-center gap-2">
            <span className=" font-normal text-base">{time}</span>
            <div className="w-[1px] h-3 bg-[#BABABA]"></div>
            <span className=" font-normal text-base">{category}</span>
          </div>
        </div>
        <div className="h-px self-stretch bg-[#E4DEF2]"></div>
        <div className="flex flex-col gap-2">
          <div className="flex gap-4">
            <span className="text-[14px] font-semibold">받은평가</span>
            <span className="text-[14px] font-semibold">평가 태그</span>
          </div>
          <div className="w-full flex justify-center">
            <div className="w-auto">
              <span className="flex justify-center items-center px-[14px] py-[6px] bg-[#EDE9F6] border-[0.5px] border-solid border-[#4A25A9] rounded-lg text-[#4A25A9] font-normal text-base">
                {tag}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
