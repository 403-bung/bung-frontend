import { Article, categories } from "components/detail/DetailCard";
import useRemainingTime from "hooks/useRemainingTime";

export default function ArticleInfo({
  article,
  nickname,
}: {
  article: Article;
  nickname: string;
}) {
  const remainingTime = useRemainingTime(article?.partyStartTime || "");

  return (
    <div className="flex gap-5">
      <div className="flex flex-col text-[#727272] font-normal text-sm text-nowrap gap-2">
        <span>모집 인원수</span>
        <span>신청 인원수</span>
        <span>벙개 시작</span>
        <span>카테고리</span>
        <span>작성자</span>
        <span>참여 링크</span>
      </div>
      <div className="flex flex-col text-[#1F1F1F] font-normal text-sm  gap-2 break-all">
        <span className="text-[#4A25A9] min-h-5">
          {article?.maxUserCount}명
        </span>
        <span className="min-h-5">{article?.currentUserCount}명</span>
        <span className="min-h-5">{remainingTime}</span>
        <span className="min-h-5">
          {categories.get(article?.category || " ")}
        </span>
        <span className="min-h-5">{nickname}</span>
        <span className="min-h-5">
          {article?.showLink ? article?.link : "비공개"}
        </span>
      </div>
    </div>
  );
}
