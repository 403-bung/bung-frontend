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
import axios from "axios";
import FeedBackTags from "components/FeedbackTags";

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
  const nickname = userInfo?.map((info) => info.nickname);
  const profileArr: string[] | undefined = userInfo?.map(
    (info) => info.profileImageUrl
  );
  const profile = profileArr ? profileArr[0] : undefined;
  console.log(profile);
  // console.log(userInfo?.map((info) => info.nickname));
  useEffect(() => {
    console.log(article);
  }, [article]);

  //postAPI
  const token = cookies.get("id");
  const fromUserNo = article?.userNo;
  const articleNo = article?.articleNo;
  const [satisfaction, setSatisfaction] = useState("VERY_SATISFIED");
  const handleButtonClick = (value: any) => {
    setSatisfaction(value);
    if (
      value === "VERY_SATISFIED" ||
      value === "SATISFIED" ||
      value === "DISSATISFIED"
    ) {
      setFeedbackTags([]);
    }
  };
  const [feedbackTags, setFeedbackTags] = useState<string[]>([]);
  const handleTagClick = (value: string) => {
    if (feedbackTags.includes(value)) {
      setFeedbackTags(feedbackTags.filter((tag) => tag !== value));
    } else {
      setFeedbackTags([...feedbackTags, value]);
    }
  };
  const handleFeedback = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/feedback`,
        {
          fromUserNo,
          toUserNo: userInfo,
          satisfaction,
          articleNo,
          feedbackTags,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("후기 작성 성공", response.config.data);
      navigate(`/finishreview/${articleNo}`);
    } catch (error) {
      console.error("후기 작성 실패", error);
    }
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
              {nickname}
            </div>
            <div className="mt-[8px] ml-[9px] h-[17px] text-zinc-600 text-[14px] font-normal">
              {article?.name}
            </div>
          </div>
        </div>
        {/* 활동 표시 */}
        <div className="mt-[36px] ml-[17px] mr-[16px]">
          <div className="text-[20px] font-[700]">
            닉네임님과의 활동은 어떠셨나요?
          </div>
          <div className="mt-[26px] flex justify-between">
            {/* VERY_SATISFIED */}
            {satisfaction === "VERY_SATISFIED" ? (
              <img
                className="w-[96px] h-[96px]"
                alt="sticker1"
                src={sticker1}
                onClick={() => handleButtonClick("VERY_SATISFIED")}
              />
            ) : (
              <img
                className="w-[96px] h-[96px]"
                alt="sticker11"
                src={sticker11}
                onClick={() => handleButtonClick("VERY_SATISFIED")}
              />
            )}
            {/* SATISFIED */}
            {satisfaction === "SATISFIED" ? (
              <img
                className="w-[96px] h-[96px]"
                alt="sticker2"
                src={sticker2}
                onClick={() => handleButtonClick("SATISFIED")}
              />
            ) : (
              <img
                className="w-[96px] h-[96px]"
                alt="sticker22"
                src={sticker22}
                onClick={() => handleButtonClick("SATISFIED")}
              />
            )}
            {/* DISSATISFIED */}
            {satisfaction === "DISSATISFIED" ? (
              <img
                className="w-[96px] h-[96px]"
                alt="sticker3"
                src={sticker3}
                onClick={() => handleButtonClick("DISSATISFIED")}
              />
            ) : (
              <img
                className="w-[96px] h-[96px]"
                alt="sticker33"
                src={sticker33}
                onClick={() => handleButtonClick("DISSATISFIED")}
              />
            )}
          </div>
        </div>
        <div className="w-[343px] h-[2px] bg-violet-100 mt-[57px] mx-[16px]" />
        {/* 좋은점  */}
        {/*  VERY_SATISFIED*/}
        {satisfaction === "VERY_SATISFIED" && (
          <div className="h-[164px] mt-[36px] mx-[17px] flex flex-col justify-start items-start">
            <div className=" w-[139px] h-[21px] mb-[16px] text-stone-900 text-lg font-semibold">
              어떤점이 좋았나요?
            </div>
            <FeedBackTags
              onClick={handleTagClick}
              value="KINDNESS"
              label="친절해요☺️"
            />
            <FeedBackTags
              onClick={handleTagClick}
              value="EFFORT"
              label="열심히 참여해요👍🏻"
            />
            <FeedBackTags
              onClick={handleTagClick}
              value="TIME_KEEPER"
              label="시간약속을 잘지켜요🕒"
            />
          </div>
        )}
        {/* SATISFIED */}
        {satisfaction === "SATISFIED" && (
          <div className="h-[164px] mt-[36px] mx-[17px] flex flex-col justify-start items-start">
            <div className=" w-[139px] h-[21px] mb-[16px] text-stone-900 text-lg font-semibold">
              어떤점이 좋았나요?
            </div>
            <FeedBackTags
              onClick={handleTagClick}
              value="KINDNESS"
              label="친절해요☺️"
            />
            <FeedBackTags
              onClick={handleTagClick}
              value="EFFORT"
              label="열심히 참여해요👍🏻"
            />
            <FeedBackTags
              onClick={handleTagClick}
              value="TIME_KEEPER"
              label="시간약속을 잘지켜요🕒"
            />
          </div>
        )}
        {/* DISSATISFIED */}
        {satisfaction === "DISSATISFIED" && (
          <div className="h-[164px] mt-[36px] mx-[17px] flex flex-col justify-start items-start">
            <div className="  h-[21px] mb-[16px] text-stone-900 text-lg font-semibold">
              어떤점이 별로였나요?
            </div>
            <FeedBackTags
              onClick={handleTagClick}
              value="LATER"
              label="
              약속에 늦어요"
            />
            <FeedBackTags
              onClick={handleTagClick}
              value="NOT_EFFORT"
              label="참여도가 낮아요"
            />
            <FeedBackTags
              onClick={handleTagClick}
              value="BAD_ATTITUDE"
              label="모임 분위기를 흐려요"
            />
          </div>
        )}
        {/* 버튼 */}
        <div
          className="mt-[58px] flex justify-center items-center"
          onClick={() => navigate(`/finishreview/${articleNo}`)}
        >
          <Button text="후기 보내기" onClick={handleFeedback} />
        </div>
      </div>
    </>
  );
}
