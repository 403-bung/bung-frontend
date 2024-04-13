import { Link, useNavigate, useParams } from "react-router-dom";
import closeBtn from "../icons/closeBtn.svg";
import profile from "../icons/profile.svg";
import sticker1 from "../icons/sticker1.svg";
import sticker2 from "../icons/sticker2.svg";
import sticker3 from "../icons/sticker3.svg";
import sticker11 from "../icons/sticker11.svg";
import sticker22 from "../icons/sticker22.svg";
import sticker33 from "../icons/sticker33.svg";
import { useState } from "react";
import StatusBar from "components/UI/StatusBar";
import Button from "components/UI/Button";
import { Cookies } from "react-cookie";
import { useQuery } from "@tanstack/react-query";
import { getArticle, getUser } from "api";
import { Article } from "components/detail/DetailCard";
import { useEffect } from "react";

type ParticipantInfo = {
  profileImageUrl: string;
  nickname: string;
  state: string;
  userNo: number;
};

export default function UserReview() {
  const navigate = useNavigate();
  const cookies = new Cookies();
  const userNo = cookies.get("userNo");
  const params = useParams();
  // const articleNo = 0;
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

  const [reviewPoint, setReviewPoint] = useState(null);
  const handleButtonClick = (value: any) => {
    setReviewPoint(value);
  };
  return (
    <>
      <div className="w-[375px] h-screen bg-white flex flex-col">
        <StatusBar />
        {/* 팀원 후기 보내기 */}
        <div className="w-[375px] h-[60px]  pl-[135px] pr-[15px] pt-[20px] pb-[16px] flex justify-end items-start gap-24">
          <div className="text-cente text-stone-900 font-semibold">
            팀원 후기 보내기
          </div>
          <Link to="/home">
            <img src={closeBtn} alt="close" />
          </Link>
        </div>
        {/* 닉네임, 프로필 */}
        <div className="w-[375px] h-[97px] bg-violet-100 flex">
          <div className="w-[54px] h-[54px] rounded-full overflow-hidden mt-[19px] ml-[16px] ">
            <img
              alt="profile"
              src={profile}
              className="w-full h-full object-cover"
              width="54px"
              height="54px"
            />
          </div>
          <div>
            <div className="mt-[23px] ml-[9px] h-[21px] text-stone-900 text-[18px] font-semibold">
              닉네임
            </div>
            <div className="mt-[8px] ml-[9px] h-[17px] text-zinc-600 text-[14px] font-normal">
              디자인 툴 수업 같이 수강 하실분 구해요!
            </div>
          </div>
        </div>
        {/* 활동 표시 */}
        <div className="mt-[36px] ml-[17px] mr-[16px]">
          <div className="text-[20px] font-[700]">
            닉네임님과의 활동은 어떠셨나요?
          </div>
          <div className="mt-[26px] flex justify-between">
            {/* verygood */}
            {reviewPoint === "verygood" ? (
              <img
                className="w-[96px] h-[96px]"
                alt="sticker1"
                src={sticker1}
                onClick={() => handleButtonClick(1)}
              />
            ) : (
              <img
                className="w-[96px] h-[96px]"
                alt="sticker11"
                src={sticker11}
                onClick={() => handleButtonClick("verygood")}
              />
            )}
            {/* good */}
            {reviewPoint === "good" ? (
              <img
                className="w-[96px] h-[96px]"
                alt="sticker2"
                src={sticker2}
                onClick={() => handleButtonClick(2)}
              />
            ) : (
              <img
                className="w-[96px] h-[96px]"
                alt="sticker22"
                src={sticker22}
                onClick={() => handleButtonClick("good")}
              />
            )}
            {/* bad */}
            {reviewPoint === "bad" ? (
              <img
                className="w-[96px] h-[96px]"
                alt="sticker3"
                src={sticker3}
                onClick={() => handleButtonClick(3)}
              />
            ) : (
              <img
                className="w-[96px] h-[96px]"
                alt="sticker33"
                src={sticker33}
                onClick={() => handleButtonClick("bad")}
              />
            )}
          </div>
        </div>
        <div className="w-[343px] h-[2px] bg-violet-100 mt-[57px] mx-[16px]" />
        {/* 좋은점  */}
        {/* verygood */}
        {reviewPoint === "verygood" && (
          <div className="h-[164px] mt-[36px] mx-[17px] flex flex-col justify-start items-start">
            <div className=" w-[139px] h-[21px] text-stone-900 text-lg font-semibold">
              어떤점이 좋았나요?
            </div>
            <div className=" h-[31px] px-[14px] py-[6px] mt-[26px] bg-violet-100 rounded-lg border border-violet-900 flex justify-center items-center text-violet-900 text-base font-normal">
              친절해요☺️
            </div>
            <div className=" h-[31px] px-[14px] py-[6px] mt-[12px] rounded-lg border border-violet-300 flex justify-center items-center text-violet-900 text-base font-normal">
              열심히 참여해요👍🏻
            </div>
            <div className=" h-[31px] px-[14px] py-[6px] mt-[12px] rounded-lg border border-violet-300 flex justify-center items-center text-violet-900 text-base font-normal">
              시간약속을 잘지켜요🕒
            </div>
          </div>
        )}
        {/* good */}
        {reviewPoint === "good" && (
          <div className="h-[164px] mt-[36px] mx-[17px] flex flex-col justify-start items-start">
            <div className=" w-[139px] h-[21px] text-stone-900 text-lg font-semibold">
              어떤점이 좋았나요?
            </div>
            <div className=" h-[31px] px-[14px] py-[6px] mt-[26px] bg-violet-100 rounded-lg border border-violet-900 flex justify-center items-center text-violet-900 text-base font-normal">
              친절해요☺️
            </div>
            <div className=" h-[31px] px-[14px] py-[6px] mt-[12px] rounded-lg border border-violet-300 flex justify-center items-center text-violet-900 text-base font-normal">
              열심히 참여해요👍🏻
            </div>
            <div className=" h-[31px] px-[14px] py-[6px] mt-[12px] rounded-lg border border-violet-300 flex justify-center items-center text-violet-900 text-base font-normal">
              시간약속을 잘지켜요🕒
            </div>
          </div>
        )}
        {/* bad */}
        {reviewPoint === "bad" && (
          <div className="h-[164px] mt-[36px] mx-[17px] flex flex-col justify-start items-start">
            <div className="  h-[21px] text-stone-900 text-lg font-semibold">
              어떤점이 별로였나요?
            </div>
            <div className=" h-[31px] px-[14px] py-[6px] mt-[26px] bg-violet-100 rounded-lg border border-violet-900 flex justify-center items-center text-violet-900 text-base font-normal">
              약속에 늦어요
            </div>
            <div className=" h-[31px] px-[14px] py-[6px] mt-[12px] rounded-lg border border-violet-300 flex justify-center items-center text-violet-900 text-base font-normal">
              참여도가 낮아요
            </div>
            <div className=" h-[31px] px-[14px] py-[6px] mt-[12px] rounded-lg border border-violet-300 flex justify-center items-center text-violet-900 text-base font-normal">
              모임 분위기를 흐려요
            </div>
          </div>
        )}
        {/* 버튼 */}
        <div
          className="mt-[58px] flex justify-center items-center"
          onClick={() => navigate(`/finishreview/${articleNo}`)}
        >
          <Button text="후기 보내기" />
        </div>
      </div>
    </>
  );
}
