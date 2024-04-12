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
import OptionSelect from "components/UI/OptionSelect";
import ModalDeleteConfirm from "components/UI/ModalDeleteConfirm";
import ArticleInfo from "components/UI/ArticleInfo";

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
      }
      setUserInfo(participantDetails);
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
              <ArticleInfo article={article} nickname={userData?.nickname} />
            )}
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
      <ModalDeleteConfirm
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        articleNo={article?.articleNo}
      />
    </>
  );
}
