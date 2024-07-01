import { useNavigate, useParams } from "react-router-dom";
import Button from "components/UI/Button";
import GoBackBtn from "components/UI/GoBackBtn";
import DetailCard, { Article } from "components/detail/DetailCard";
import { useEffect, useState } from "react";
import StatusBar from "components/UI/StatusBar";
import { Cookies } from "react-cookie";
import { getArticle, joinParty } from "api";
import useRemainingTime from "hooks/useRemainingTime";
import { useQuery } from "@tanstack/react-query";

export default function Detail() {
  const navigate = useNavigate();
  const [top, setTop] = useState(0);
  const [repeatCount, setRepeatCount] = useState(0);

  const cookies = new Cookies();
  const userNo = cookies.get("userNo");
  const params = useParams();

  const { data: article } = useQuery<Article>({
    queryKey: ["article", params.articleNo],
    queryFn: async () => await getArticle(Number(params.articleNo)),
  });

  const remainingTime = useRemainingTime(article?.partyStartTime || "");

  console.log(article);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (repeatCount < 3) {
        setTop((prevTop) => (prevTop === 0 ? -12 : 0));
        setRepeatCount((prevCount) => prevCount + 1);
      } else {
        clearInterval(intervalId);
      }
    }, 1000);
    return () => clearInterval(intervalId);
  }, [repeatCount]);

  return (
    <div className="bg-[#EDE9F6] relative">
      <div className="w-[375px] object-cover bg-[#EDE9F6] flex  flex-col">
        <StatusBar />
        <div className="ml-[9px] py-[18px] ">
          <GoBackBtn
            onClick={() => {
              navigate("/home");
            }}
          />
        </div>
        <div className="flex flex-col justify-center items-center">
          <DetailCard />
          <div className="w-[375px] bottom-0 z-[1] absolute bg-white flex flex-col justify-end items-center py-[54px] ">
            <div
              className="w-[181px] h-[32px] p-[4px] bg-violet-100 rounded-3xl transition-transform duration-500 transform "
              style={{ transform: `translateY(${top}px)` }}
            >
              <div className="h-[24px] flex justify-start items-center ">
                <div className="bg-indigo-900 px-[7px] pb-[2px] flex rounded-[18px] justify-center items-start">
                  <div className="text-violet-100  font-['Pretendard'] text-[16px]">
                    {remainingTime}
                  </div>
                </div>
                <div className="text-[12px] ml-[8px]">
                  <span className="text-violet-900 font-semibold">얼마</span>
                  <span className="text-stone-900 ">남지 않았어요!</span>
                </div>
              </div>
            </div>
            <div className="mt-3 ">
              <Button
                text="알림받기"
                onClick={() => joinParty(userNo, Number(params.articleNo))}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
