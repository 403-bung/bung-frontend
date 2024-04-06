import users from "../icons/users.svg";
import newIcon from "../icons/new.svg";
import summaryText from "../utils/summaryText";
import getStatusText from "../utils/getStatusText";
import getRemainingTime from "../utils/getRemainingTime";
import getFormatTime from "../utils/getFormatTime";

export type ContentCardProps = {
  articleNo: number;
  category: string;
  content: string;
  currentUserCount: string;
  maxUserCount: string;
  name: string;
  partyStartTime: string;
  recruitingEndTime: string;
  status: string;
};

export default function ContentCard({
  articleNo,
  category,
  content,
  currentUserCount,
  maxUserCount,
  name,
  partyStartTime,
  recruitingEndTime,
  status,
}: ContentCardProps) {
  const truncatedTitle = summaryText(name, 18);
  const truncatedContent = summaryText(content, 50);
  const formattedStartTime = getFormatTime(partyStartTime);
  const remainingTime = getRemainingTime(recruitingEndTime);
  const statusText = getStatusText(status);

  return (
    <>
      <div className="w-[345px] p-5 bg-white rounded-lg border border-solid border-[#E4DEF2] flex flex-col gap-5">
        <div className="bg-[#4A25A9] w-min px-2 py-1  text-white rounded-md flex items-center gap-[2px] flex-shrink-0 text-nowrap">
          <span className="text-[12px]">{remainingTime}</span>
          <span className="text-[10px]">남음</span>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-1">
            <span className="text-lg font-medium text-[#1F1F1F]">
              {truncatedTitle}
            </span>
            <img src={newIcon} alt="new"></img>
          </div>
          <div className="text-base font-normal text-[#232323]">
            {truncatedContent}
          </div>
        </div>
        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <span className="text-base font-normal text-[#232323]">
              {formattedStartTime}
            </span>
            <div className="w-[1px] h-3 bg-[#C7BBE4]"></div>
            <span className="text-base font-normal text-[#232323]">
              {statusText}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <img src={users} alt="users" />
            <div>
              <span className="text-[#4A25A9]">{currentUserCount}</span>
              <span className="text-base font-normal text-[#232323]">
                /{maxUserCount}명
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
