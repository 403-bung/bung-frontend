import users from "../icons/users.svg";
import newIcon from "../icons/new.svg";

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
  const truncatedTitle = name.length > 18 ? name.slice(0, 18) + "..." : name;
  const truncatedContent =
    content.length > 40 ? content.slice(0, 40) + "..." : content;

  switch (status) {
    case "READY":
      status = "모집 전";
      break;
    case "IN_COLLECT":
      status = "모집 중";
      break;
    case "IN_PLAY":
      status = "모집 마감";
      break;
  }
  return (
    <>
      <div className="w-[345px] h-[207px] p-5 bg-white rounded-lg border border-solid border-[#E4DEF2] flex flex-col gap-5">
        <div className="bg-[#4A25A9] w-[60px] px-2 py-1  text-white rounded-md  flex items-center gap-[2px] flex-shrink-0">
          <span className="text-[12px]">5:26</span>{" "}
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
              시간입력
            </span>
            <div className="w-[1px] h-3 bg-[#C7BBE4]"></div>
            <span className="text-base font-normal text-[#232323]">
              {status}
            </span>
          </div>
          <div className="flex items-center gap-1">
            {" "}
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
