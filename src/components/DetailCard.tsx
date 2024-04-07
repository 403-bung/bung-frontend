import axios from "axios";
import { useState } from "react";
import { Cookies } from "react-cookie";
import { SERVER_URL } from "../data/url";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import getStatusText from "../utils/getStatusText";
import Modal from "react-modal";
import ReactModal from "react-modal";
import Title from "./Title";

type Article = {
  articleNo: number; // 구인글 번호
  name: string; // 구인글 제목
  category: string; // 카테고리
  content: string; // 구인글 내용
  maxUserCount: number; // 모집 인원
  currentUserCount: number; // 현재 참여 인원
  recruitingStartTime: Date; // 모집 시작 시간
  recruitingEndTime: Date; // 모집 종료 시간
  partyStartTime: Date; // 모임 시작 시간
  status: string; // 구인글 상태
  link: string; // 링크
  showLink: boolean; // 링크 공개 여부
  userNo: number; // 사용자 번호
  participants: Participant[]; // 참여 신청자 목록
};

type Participant = {
  participantUserNo: number; // 참여 신청자 사용자 번호
  state: number; // 참여 신청자 상태
};

const customModalStyle: ReactModal.Styles = {
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

  async function getArticle(articleNo: string) {
    const response = await axios.get(`${SERVER_URL}/articles/${articleNo}`, {
      headers: { Authorization: `Bearer ${token}` },
      params: { userNo: userNo, articleNo: articleNo },
    });

    return response.data;
  }

  async function getUser(userNo: number) {
    const response = await axios.get(`${SERVER_URL}/users/${userNo}/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  }

  async function deleteArticle(articleNo: number) {
    const response = await axios.delete(`${SERVER_URL}/articles/${articleNo}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(response.data);
  }

  const { data: article } = useQuery<Article>({
    queryKey: ["article", params.articleNo],
    queryFn: async () => await getArticle(params.articleNo as string),
  });

  const { data: userData } = useQuery({
    queryKey: ["writer", article?.userNo],
    queryFn: async () => await getUser(article?.userNo as number),
  });

  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = event.target.value;
    if (selectedOption === "삭제하기") {
      setModalOpen(true); // 모달 열기
    }
  };

  const time = new Date(article?.partyStartTime || "");
  const statusText = getStatusText(article?.status || "");
  return (
    <>
      <div className="bg-white w-80 z-[10] mt-[14px] pt-6 pb-7 px-6 rounded-[10px] border border-slate-200 ">
        {/* 모집전, 수정하기 */}
        <div className="flex justify-between items-center mb-2">
          <div className="text-[#4A25A9] text-[14px]">{statusText}</div>
          {/* {Number(userNo) === article?.userNo && (
            <select className="text-[#BABABA] text-[14px] font-normal">
              더보기
              <option>수정하기</option>
              <option>삭제하기</option>
              <option>닫기</option>
            </select>
          )} */}
          <select
            className="text-[#BABABA] text-[14px] font-normal"
            onChange={handleOptionChange}
          >
            <option>더보기</option>
            <option>수정하기</option>
            <option onSelect={() => setModalOpen(true)}>삭제하기</option>
            <option>닫기</option>
          </select>
          <Modal isOpen={modalOpen} style={customModalStyle}>
            <Title text={"벙개를 삭제하시겠어요?"} />
            <div className="w-full flex flex-col items-center gap-5">
              <button
                className="bg-[#4A25A9] w-full text-white text-base font-semibold py-5 rounded-[10px]"
                onClick={() => {
                  deleteArticle(article?.articleNo || 0);
                }}
              >
                삭제하기
              </button>
              <button onClick={() => setModalOpen(false)}>취소하기</button>
            </div>
          </Modal>
        </div>
        {/* 타이틀 */}
        <div className=" text-[#1F1F1F] text-xl font-bold mb-4">
          {article?.name}
        </div>
        {/* 텍스트 */}
        <div className="text-[#232323] text-base mb-12">{article?.content}</div>

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
            <span className="text-[#4A25A9]">{article?.maxUserCount}명</span>
            <span>{article?.currentUserCount}명</span>
            <span> {`${time.getMinutes()}:${time.getSeconds()}`}</span>
            <span>{article?.category}</span>
            <span>{userData?.nickname}</span>

            <span>{article?.showLink ? article?.link : "비공개"}</span>
          </div>
        </div>
      </div>
    </>
  );
}
