import { useQuery } from "@tanstack/react-query";
import sticker1 from "icons/sticker1.svg";
import sticker2 from "icons/sticker2.svg";
import sticker3 from "icons/sticker3.svg";

import { Feedback, Tag, feedback } from "api";
import { useEffect, useState } from "react";

const tagToKorean: Record<Tag, string> = {
  [Tag.KINDNESS]: "친절해요",
  [Tag.EFFORT]: "열심히 참여해요",
  [Tag.TIME_KEEPER]: "시간 약속을 잘 지켜요",
  [Tag.LATER]: "약속에 늦어요",
  [Tag.NOT_EFFORT]: "참여도가 낮아요",
  [Tag.BAD_ATTITUDE]: "모임 분위기를 흐려요",
};

// 영어 태그를 한글로 변환하는 함수
function convertTagToKorean(tag: Tag): string {
  return tagToKorean[tag];
}

// Feedback 타입에 맞는 가짜 데이터 생성
const fakeFeedback: Feedback = {
  userNo: 123,
  feedbackSize: 20,
  rate: 2.8,
  feedbackTags: [
    { tag: Tag.KINDNESS, positive: true, title: "KINDNESS", count: 11 },
    { tag: Tag.EFFORT, positive: true, title: Tag[Tag.EFFORT], count: 6 },
    {
      tag: Tag.TIME_KEEPER,
      positive: true,
      title: Tag[Tag.TIME_KEEPER],
      count: 3,
    },
    { tag: Tag.LATER, positive: false, title: Tag[Tag.LATER], count: 1 },
    {
      tag: Tag.NOT_EFFORT,
      positive: false,
      title: Tag[Tag.NOT_EFFORT],
      count: 2,
    },
    {
      tag: Tag.BAD_ATTITUDE,
      positive: false,
      title: Tag[Tag.BAD_ATTITUDE],
      count: 1,
    },
  ],
};

// tag
// KINDNESS, EFFORT, TIME_KEEPER, LATER, NOT_EFFORT, BAD_ATTITUDE

// function
function rateFormat(rate: number) {
  let text = "";
  let sticker = "";

  if (rate > 2) {
    text = "매우 좋음";
    sticker = sticker1;
  } else if (rate > 1) {
    text = "좋음";
    sticker = sticker2;
  } else {
    text = "보통";
    sticker = sticker3;
  }

  return { text, sticker };
}

export default function MannerArea({ userNo }: { userNo: number }) {
  const [text, setText] = useState("");
  const [sticker, setSticker] = useState("");

  const { data } = useQuery<Feedback>({
    queryKey: ["feedback", userNo],
    queryFn: () => feedback(userNo),
  });

  useEffect(() => {
    if (data) {
      const { text, sticker } = rateFormat(data.rate);
      setText(text);
      setSticker(sticker);
    }
    console.log(text);
  }, []);

  // 매너 평가 합계 계산
  const totalFeedbackCount = data?.feedbackTags.reduce(
    (total, tag) => total + tag.count,
    0
  );

  // feedbackTags를 태그 수(count)에 따라 내림차순으로 정렬
  const sortedFeedbackTags =
    data?.feedbackTags.sort((a, b) => b.count - a.count) || [];
  return (
    <>
      <div className="bg-[#F2F2F6] w-full h-screen overflow-y-scroll scrollbar-hide">
        {(data?.feedbackSize || 0) > 5 ? (
          <>
            <div className="w-[375px] h-[200px] flex bg-white">
              <div className="w-full h-40 bg-[#EDE9F6] px-10 py-5 rounded-lg flex justify-between m-5">
                <img src={sticker} alt="sticker" />
                <div className="font-semibold text-sm flex flex-col gap-2">
                  <span className="text-[#1f1f1f]">전체 평균</span>
                  <span className="text-[#4A25A9]">{`${text} ${(
                    data?.rate || 0
                  ).toFixed(1)}/3`}</span>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="w-[335px] h-40 bg-[#EDE9F6] px-10 py-5 rounded-lg flex justify-center items-center m-5">
              <span className="text-[#1f1f1f]">평가가 부족해요😥</span>
            </div>
          </>
        )}

        <div className="w-full flex flex-col px-5 pt-5 pb-7 bg-white">
          <div className="text-base font-semibold text-[#1f1f1f] flex gap-[10px]">
            <span>받은 매너 평가</span>
            <span>{totalFeedbackCount}</span>
          </div>
          <div className="flex flex-col gap-1">
            {(data?.feedbackSize || 0) > 0 ? (
              sortedFeedbackTags.map((tag, index) => (
                <>
                  <div key={tag.tag} className="p-[10px] flex justify-between ">
                    <span>{convertTagToKorean(tag.tag)}</span>
                    <span>{`${tag.count}명`}</span>
                  </div>
                  {index !== sortedFeedbackTags.length - 1 && (
                    <div className=" h-px self-stretch bg-[#EDE9F6]" />
                  )}
                </>
              ))
            ) : (
              <>
                <span className="text-[#1f1f1f]">평가가 부족해요😥</span>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
