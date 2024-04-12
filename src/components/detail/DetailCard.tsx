import { useState } from "react";
import { Cookies } from "react-cookie";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import getStatusText from "utils/getStatusText";
import ReactModal from "react-modal";
import { getArticle, getUser } from "../../api";
import ModalDeleteConfirm from "components/UI/ModalDeleteConfirm";
import OptionSelect from "components/UI/OptionSelect";
import ArticleInfo from "../UI/ArticleInfo";

export type Article = {
  articleNo: number; // 구인글 번호
  name: string; // 구인글 제목
  category: string; // 카테고리
  content: string; // 구인글 내용
  maxUserCount: number; // 모집 인원
  currentUserCount: number; // 현재 참여 인원
  recruitingStartTime: string; // 모집 시작 시간
  recruitingEndTime: string; // 모집 종료 시간
  partyStartTime: string; // 모임 시작 시간
  status: string; // 구인글 상태
  link: string; // 링크
  showLink: boolean; // 링크 공개 여부
  userNo: number; // 사용자 번호
  participants: Participant[]; // 참여 신청자 목록
};

type Participant = {
  participantUserNo: number; // 참여 신청자 사용자 번호
  state: string; // 참여 신청자 상태
};

export type UserInfo = {
  email: string;
  nickname: string;
  oauthType: string;
  privacyPolicy: boolean;
  profileImageUrl: string;
  pushEnable: boolean;
  termsOfService: boolean;
  userNo: number;
};

export const categories = new Map([
  ["GROUP_BUYING", "공동구매"],
  ["GAME", "게임"],
  ["EVENT", "이벤트"],
  ["STUDY", "스터디"],
  ["FREE", "자유"],
  ["PLEASE", "해주세요"],
  ["IDOL", "아이돌"],
]);

export const customModalStyle: ReactModal.Styles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 10,
  },
  content: {
    position: "absolute",
    width: "300px",
    height: "280px",
    top: "calc(50% - 140px)",
    left: "calc(50% - 150px)",
    backgroundColor: "white",
    padding: "40px 24px 28px 24px",
    transform: "translate(0%, 0%)",
    borderRadius: "10px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
  },
};

export default function DetailCard() {
  const cookies = new Cookies();
  const token = cookies.get("id");
  const userNo = cookies.get("userNo");
  const params = useParams();
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  const { data: article } = useQuery<Article>({
    queryKey: ["article", params.articleNo],
    queryFn: async () => await getArticle(Number(params.articleNo)),
  });

  const { data: userData } = useQuery<UserInfo>({
    queryKey: ["writer", article?.userNo],
    queryFn: async () => await getUser(article?.userNo as number),
  });

  const handleOptionChange = (selectedOption: string) => {
    const articleNo = article?.articleNo;
    if (selectedOption === "삭제하기") {
      setModalOpen(true);
    } else if (selectedOption === "수정하기") {
      navigate(`/detail/${articleNo}/edit`);
    }
  };

  const statusText = getStatusText(article?.status || "");

  return (
    <>
      <div className="bg-white w-80 z-[10] mt-[14px] pt-6 pb-7 px-6 rounded-[10px] border border-slate-200 ">
        {/* 모집전, 수정하기 */}
        <div className="flex justify-between items-center mb-2">
          <div className="text-[#4A25A9] text-[14px]">{statusText}</div>
          {userNo === article?.userNo && (
            <OptionSelect onChange={handleOptionChange} />
          )}
        </div>
        {/* 타이틀 */}
        <div className=" text-[#1F1F1F] text-xl font-bold mb-4">
          {article?.name}
        </div>
        {/* 텍스트 */}
        <div className="text-[#232323] text-base mb-12">{article?.content}</div>
        {article && (
          <ArticleInfo article={article} nickname={userData?.nickname || ""} />
        )}
      </div>
      <ModalDeleteConfirm
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        articleNo={article?.articleNo}
      />
    </>
  );
}
