import { useEffect, useState } from "react";
import users from "../icons/users.svg";
import newIcon from "../icons/new.svg";

const title = "제목을 써주세요";
const content =
  "설명글을 써주세요.텍스트더미 텍스트더미텍스트텍스트더미텍스트텍스트더미텍스트더미 최대 20자입니다...";
export default function ContentCard() {
  const [formattedTitle, setFormattedTitle] = useState(title);
  const [formattedContent, setFormattedContent] = useState(content);

  useEffect(() => {
    // 제목이 20자를 초과하는 경우, 초과 부분을 자르고 "..."을 추가하여 표시
    if (title.length > 20) {
      setFormattedTitle(title.slice(0, 20) + "...");
    }

    // 본문이 40자를 초과하는 경우, 초과 부분을 자르고 "..."을 추가하여 표시
    if (content.length > 40) {
      setFormattedContent(content.slice(0, 40) + "...");
    }
  }, []);

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
              {formattedTitle}
            </span>
            <img src={newIcon} alt="new"></img>
          </div>
          <div className="text-base font-normal text-[#232323]">
            {formattedContent}
          </div>
        </div>
        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <span className="text-base font-normal text-[#232323]">
              시간입력
            </span>
            <div className="w-[1px] h-3 bg-[#C7BBE4]"></div>
            <span className="text-base font-normal text-[#232323]">
              모집 유무
            </span>
          </div>
          <div className="flex items-center gap-1">
            {" "}
            <img src={users} alt="users" />
            <div>
              <span className="text-[#4A25A9]">50</span>
              <span className="text-base font-normal text-[#232323]">/1명</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
