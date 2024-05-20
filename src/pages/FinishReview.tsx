import { Link, useNavigate, useParams } from "react-router-dom";
import closeBtn from "../icons/closeBtn.svg";
import profile from "../icons/profile.svg";
import { useQuery } from "@tanstack/react-query";
import { getArticle, getUser } from "../api";
import { useEffect, useState } from "react";
import { Cookies } from "react-cookie";
import { Article } from "components/detail/DetailCard";
import StatusBar from "components/UI/StatusBar";

type ParticipantInfo = {
  profileImageUrl: string;
  nickname: string;
  state: string;
  userNo: number;
};

export default function FinishReview() {
  const navigate = useNavigate();
  const cookies = new Cookies();
  const userNo = cookies.get("userNo");
  const params = useParams();
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
  useEffect(() => {
    console.log(article);
  }, [article]);
  const articleNo = article?.articleNo;
  return (
    <>
      <div className="w-[375px] h-dvh bg-white flex flex-col">
        <StatusBar />
        <div className="w-[375px] h-[60px]  pl-[135px] pr-[15px] pt-[20px] pb-[16px] flex justify-end items-start gap-24">
          <div className="text-cente text-stone-900 font-semibold">
            팀원 후기 보내기
          </div>
          <Link to="/home">
            <img src={closeBtn} alt="close" />
          </Link>
        </div>
        {/* 추가 멘트 */}
        <div className="w-[375px] h-[97px] bg-violet-100 flex flex-col justify-center items-center">
          <div className="text-stone-900 text-lg font-semibold">
            다른 팀원에게도 후기를
          </div>
          <div className="text-stone-900 text-lg font-semibold">
            보내보는거 어때요?
          </div>
        </div>
        {/* 참여자정보 */}
        <div className="flex flex-col items-center justify-center">
          <div className="mt-[14px] w-[344px] text-center text-stone-900 text-lg font-semibold">
            참여자 정보
          </div>
          <div className="mt-[8px] w-[344px] text-center text-zinc-600 text-sm font-normal ">
            한번에 한명의 참여자만 선택할 수 있어요!
          </div>
        </div>
        <div className="mt-[26px] ml-[14px] w-full grid grid-flow-col auto-cols-max gap-6 justify-start flex-wrap">
          <div className="  flex flex-col gap-2 items-center">
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

          {/* {userInfo?.map((user) => ( */}
          <>
            <div className="flex flex-col gap-2 items-center">
              <div className="w-[100px] h-[100px] rounded-full overflow-hidden">
                <img
                  // src={user.profileImageUrl}
                  src={profile}
                  className="w-full h-full object-cover"
                  width="100px"
                  height="100px"
                  alt="profile"
                  onClick={() => navigate(`/review/${articleNo}/userNo`)}
                />
              </div>

              <div className="w-full flex items-center justify-evenly">
                {/* READY, ACCEPT, DENY */}

                <span className=" font-normal text-sm text-[#1F1F1F]">
                  {/* {user.nickname} */}
                  닉네임
                </span>
              </div>
            </div>
          </>
          {/* ))} */}
        </div>
      </div>
    </>
  );
}
