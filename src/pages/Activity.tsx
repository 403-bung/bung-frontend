import { useNavigate, useParams } from "react-router-dom";
import GoBackBtn from "components/UI/GoBackBtn";
import StatusBar from "components/UI/StatusBar";
import { useQuery } from "@tanstack/react-query";
import { Cookies } from "react-cookie";
import { Article, UserInfo } from "components/detail/DetailCard";
import { changeArticleStatus, getArticle, getUser } from "api";
import getStatusText from "utils/getStatusText";
import { useEffect, useState } from "react";
import OptionSelect from "components/UI/OptionSelect";
import ModalDeleteConfirm from "components/UI/ModalDeleteConfirm";
import ArticleInfo from "components/UI/ArticleInfo";
import Button from "components/UI/Button";
import ProfileModal from "components/activity/ProfileModal";

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
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [firstModal, setFirstModal] = useState(false);
  // 참여자 정보
  const [participantInfo, setParticipantInfo] = useState<ParticipantInfo[]>();

  const { data: article } = useQuery<Article>({
    queryKey: ["article", params.articleNo],
    queryFn: async () => await getArticle(Number(params.articleNo)),
  });

  const { data: userData } = useQuery<UserInfo>({
    queryKey: ["writer", article?.userNo],
    queryFn: async () => await getUser(article?.userNo as number),
  });

  useEffect(() => {
    console.log(userData);
  }, [userData]);

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
      }
      setParticipantInfo(participantDetails);
    });
  }, [article, userNo]);

  const handleOptionChange = (selectedOption: string) => {
    const articleNo = article?.articleNo;
    if (selectedOption === "삭제하기") {
      setModalOpen(true);
    } else if (selectedOption === "수정하기") {
      navigate(`/detail/${articleNo}/edit`);
    }
  };

  const statusText = getStatusText(article?.status || "");

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
                <OptionSelect onChange={handleOptionChange} />
              )}
            </div>
            <div className=" text-[#1F1F1F] text-xl font-bold mb-4">
              {article?.name}
            </div>
            {article && (
              <ArticleInfo
                article={article}
                nickname={userData?.nickname || ""}
              />
            )}
          </div>
        </div>
        <div className="w-full pt-5">
          <div className="bg-white w-full flex flex-col items-center p-4 gap-7">
            <span className=" font-semibold text-lg text-[#1f1f1f]">
              참여자 정보
            </span>

            {article?.status === "READY" && (
              <span className="w-full">참여자를 모집하기 전이에요</span>
            )}
            {article?.status !== "READY" && (
              <div className="w-full grid grid-flow-col auto-cols-max gap-6 justify-start flex-wrap">
                {/* 방장 정보 */}
                <div className="flex flex-col gap-2 items-center">
                  <div
                    className="w-[100px] h-[100px] rounded-full overflow-hidden border-[3px] border-solid border-[#6E51BA]"
                    onClick={() => {
                      setFirstModal(true);
                      navigate(`/activity/${article?.articleNo}/timeline`);
                    }}
                  >
                    <img
                      src={userData?.profileImageUrl}
                      className="w-full h-full object-cover"
                      width="100px"
                      height="100px"
                      alt="profile"
                    />
                  </div>
                  <div className="w-full flex items-center justify-evenly">
                    <div className="w-[37px] font-semibold text-xs text-[#1F1F1F] flex justify-center items-center bg-[#EDE9F6] rounded-lg py-[2px]">
                      방장
                    </div>
                    <span className=" font-normal text-sm text-[#1F1F1F]">
                      {userData?.nickname}
                    </span>
                  </div>
                </div>
                <ProfileModal
                  isOpen={firstModal}
                  onClose={() => {
                    setFirstModal(false);
                    navigate(`/activity/${article?.articleNo}`);
                  }}
                  articleNo={article?.articleNo}
                  userNo={userData?.userNo || 0}
                  isParticipant={false}
                  isHost={true}
                />
                {participantInfo?.map((participant) => (
                  <>
                    <div className="flex flex-col gap-2 items-center">
                      <div
                        className="w-[100px] h-[100px] rounded-full overflow-hidden"
                        onClick={() => {
                          navigate(`/activity/${article?.articleNo}/timeline`);
                          setProfileModalOpen(true);
                        }}
                      >
                        <img
                          src={participant.profileImageUrl}
                          className="w-full h-full object-cover"
                          width="100px"
                          height="100px"
                          alt="profile"
                        />
                      </div>

                      <div className="w-full flex items-center justify-evenly">
                        {/* READY, ACCEPT, DENY */}
                        {/* 방장은 상태를 볼 수 있음, 참여자는 자신의 상태만 볼 수 있음 */}
                        {(article?.userNo === userNo ||
                          participant.userNo === userNo) && (
                          <div
                            className={`w-[37px] font-semibold text-xs  flex justify-center items-center rounded-lg py-[2px] ${
                              participant.state === "READY"
                                ? "text-[#4A25A9] bg-[#EDE9F6]"
                                : participant.state === "ACCEPT"
                                ? "text-white bg-[#A492D4]"
                                : "text-[#F24242] bg-[#F242421A]"
                            }`}
                          >
                            {participant.state === "READY"
                              ? "대기"
                              : participant.state === "ACCEPT"
                              ? "수락"
                              : "거절"}
                          </div>
                        )}
                        <span className=" font-normal text-sm text-[#1F1F1F]">
                          {participant.nickname}
                        </span>
                      </div>
                    </div>
                    <ProfileModal
                      isOpen={profileModalOpen}
                      onClose={() => {
                        setProfileModalOpen(false);
                        navigate(`/activity/${article?.articleNo}`);
                      }}
                      articleNo={article?.articleNo}
                      userNo={participant.userNo}
                      isParticipant={true}
                      isHost={article?.userNo === userNo}
                    />
                  </>
                ))}
              </div>
            )}
          </div>
        </div>
        {article?.status === "IN_COLLECT" && (
          <div className="absolute bottom-0 z-[1] w-[375px] flex flex-col items-center py-14 bg-white">
            <Button
              text="시작하기"
              onClick={() => changeArticleStatus("IN_PLAY", article.articleNo)}
            />
          </div>
        )}
        {article?.status === "IN_PLAY" && (
          <div className="absolute bottom-0 z-[1] w-[375px] flex flex-col items-center py-14 bg-white">
            <Button
              text="종료하기"
              onClick={() =>
                changeArticleStatus("COMPLETE_PLAY", article.articleNo)
              }
            />
          </div>
        )}
        {article?.status === "COMPLETE_PLAY" && (
          <div className="absolute bottom-0 z-[1] w-[375px] flex flex-col justify-center items-center pt-[30px] pb-[72px] bg-white text-lg">
            종료된 벙개입니다
          </div>
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
