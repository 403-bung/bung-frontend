import { useNavigate, useParams } from "react-router-dom";
import GoBackBtn from "../components/GoBackBtn";
import StatusBar from "../components/StatusBar";
import { useQuery } from "@tanstack/react-query";
import { Cookies } from "react-cookie";
import {
  Article,
  categories,
  customModalStyle,
} from "../components/DetailCard";
import { deleteArticle, getArticle, getUser } from "../api";
import getStatusText from "../utils/getStatusText";
import useRemainingTime from "../hooks/useRemainingTime";
import { useEffect, useState } from "react";
import Title from "../components/Title";
import Modal from "react-modal";

type ParticipantInfo = {
  profileImageUrl: string;
  nickname: string;
  state: string;
  userNo: number;
};
export default function Activity() {
  const navigate = useNavigate();
  const cookies = new Cookies();
  const userNo = cookies.get("userNo");
  const params = useParams();
  const [modalOpen, setModalOpen] = useState(false);
  const [userInfo, setUserInfo] = useState<ParticipantInfo[]>();

  const { data: article } = useQuery<Article>({
    queryKey: ["article", params.articleNo],
    queryFn: async () => await getArticle(Number(params.articleNo)),
  });

  const { data: userData } = useQuery({
    queryKey: ["writer", article?.userNo],
    queryFn: async () => await getUser(article?.userNo as number),
  });

  useEffect(() => {
    const participantDetails: ParticipantInfo[] = [];
    article?.participants.map(async (value) => {
      if (value.participantUserNo !== article.userNo) {
        const user = await getUser(value.participantUserNo);
        console.log(user.profileImageUrl, user.nickname);
        const item = {
          profileImageUrl: user.profileImageUrl,
          nickname: user.nickname,
          state: value.state,
          userNo: value.participantUserNo,
        };
        participantDetails.push(item);
        // setUserInfo(() => [...(userInfo + item)]);
      }
      setUserInfo(participantDetails);
    });
  }, [article, userNo]);

  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = event.target.value;
    const articleNo = article?.articleNo;
    if (selectedOption === "삭제하기") {
      setModalOpen(true); // 모달 열기
    }
    if (selectedOption === "수정하기") {
      navigate(`/detail/${articleNo}/edit`);
    } else {
      event.target.value = "더보기";
    }
  };

  const statusText = getStatusText(article?.status || "");
  const remainingTime = useRemainingTime(article?.partyStartTime || "");

  useEffect(() => {
    console.log(article);
  }, [article]);

  return (
    <>
      <div className="bg-[#F2F2F6] w-[375px] h-screen">
        <div className="bg-white">
          <StatusBar />
          <div className="ml-[9px] py-[18px] ">
            <GoBackBtn onClick={() => navigate("/my/timeline")} />
          </div>
          <div className="px-4 py-6">
            <div className="flex justify-between items-center mb-2">
              <div className="text-[#4A25A9] text-[14px]">{statusText}</div>
              {userNo === article?.userNo && (
                <select
                  className="text-[#BABABA] text-[14px] font-normal"
                  onChange={handleOptionChange}
                >
                  <option>더보기</option>
                  <option>수정하기</option>
                  <option>삭제하기</option>
                  <option>닫기</option>
                </select>
              )}

              <Modal
                isOpen={modalOpen}
                style={customModalStyle}
                onRequestClose={() => setModalOpen(false)}
              >
                <Title text={"벙개를 삭제하시겠어요?"} />
                <div className="w-full flex flex-col items-center gap-5">
                  <button
                    className="bg-[#4A25A9] w-full text-white text-base font-semibold py-5 rounded-[10px]"
                    onClick={() => {
                      /* 삭제되면 true, 실패하면 false */
                      const result = deleteArticle(article?.articleNo || 0);
                      window.location.href = "/home";
                    }}
                  >
                    삭제하기
                  </button>

                  <button onClick={() => setModalOpen(false)}>취소하기</button>
                </div>
              </Modal>
            </div>
            <div className=" text-[#1F1F1F] text-xl font-bold mb-4">
              {article?.name}
            </div>
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
                <span className="min-h-5">{userData?.nickname}</span>
                <span className="min-h-5">
                  {article?.showLink ? article?.link : "비공개"}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full  pt-5">
          <div className="bg-white w-full flex flex-col items-center p-4 gap-7">
            <span className=" font-semibold text-lg text-[#1f1f1f]">
              사용자 정보
            </span>
            {/* <span className="w-full">참여자를 모집하기 전이에요</span> */}
            <div className="w-full grid grid-flow-col auto-cols-max gap-6 justify-start flex-wrap">
              <div className="flex flex-col gap-2 items-center">
                <div className="w-[100px] h-[100px] rounded-full overflow-hidden border-[3px] border-solid border-[#6E51BA]">
                  <img
                    src={userData?.profileImageUrl}
                    className="w-full h-full object-cover"
                    width="100px"
                    height="100px"
                    alt="profile"
                  />
                </div>
                <div className="w-full flex items-center justify-evenly">
                  {/* READY, ACCEPT, DENY */}

                  <div className="w-[37px] font-semibold text-xs text-[#1F1F1F] flex justify-center items-center bg-[#EDE9F6] rounded-lg py-[2px]">
                    방장
                  </div>
                  <span className=" font-normal text-sm text-[#1F1F1F]">
                    {userData?.nickname}
                  </span>
                </div>
              </div>

              {userInfo?.map((user) => (
                <>
                  <div className="flex flex-col gap-2 items-center">
                    <div className="w-[100px] h-[100px] rounded-full overflow-hidden">
                      <img
                        src={user.profileImageUrl}
                        className="w-full h-full object-cover"
                        width="100px"
                        height="100px"
                        alt="profile"
                      />
                    </div>

                    <div className="w-full flex items-center justify-evenly">
                      {/* READY, ACCEPT, DENY */}
                      {user.state === "READY" && (
                        <div className="w-[37px] font-semibold text-xs text-[#4A25A9] flex justify-center items-center bg-[#EDE9F6] rounded-lg py-[2px]">
                          대기
                        </div>
                      )}
                      {user.state === "ACCEPT" && (
                        <div className="w-[37px] font-semibold text-xs text-white flex justify-center items-center bg-[#A492D4] rounded-lg py-[2px]">
                          수락
                        </div>
                      )}
                      {user.state === "DENY" && (
                        <div className="w-[37px] font-semibold text-xs text-[#F24242] flex justify-center items-center bg-[#F242421A] rounded-lg py-[2px]">
                          거절
                        </div>
                      )}

                      <span className=" font-normal text-sm text-[#1F1F1F]">
                        {user.nickname}
                      </span>
                    </div>
                  </div>
                </>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
