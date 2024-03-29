import TimelineCard from "./TimelineCard";

export default function TimelineArea() {
  return (
    <div className="w-full flex flex-col items-center bg-[#F2F2F6] ">
      <div className="w-full h-full flex flex-col p-5 gap-[10px]">
        <div>
          <span className="font-semibold text-base">3월</span>
        </div>

        <TimelineCard
          date="26일"
          status="모집 중"
          title="타이틀"
          time="16:00"
          category="카테고리"
          tag="열심히 참여해요👍"
        />
        <TimelineCard
          status="벙개 종료"
          title="타이틀"
          time="16:00"
          category="카테고리"
          tag="열심히 참여해요👍"
        />
        <TimelineCard
          status="벙개 종료"
          title="타이틀"
          time="16:00"
          category="카테고리"
          tag="열심히 참여해요👍"
        />
        <TimelineCard
          status="벙개 종료"
          title="타이틀"
          time="16:00"
          category="카테고리"
          tag="열심히 참여해요👍"
        />
        <TimelineCard
          status="벙개 종료"
          title="타이틀"
          time="16:00"
          category="카테고리"
          tag="열심히 참여해요👍"
        />
        <TimelineCard
          status="벙개 종료"
          title="타이틀"
          time="16:00"
          category="카테고리"
          tag="열심히 참여해요👍"
        />
        <TimelineCard
          status="벙개 종료"
          title="타이틀"
          time="16:00"
          category="카테고리"
          tag="열심히 참여해요👍"
        />
        <TimelineCard
          status="벙개 종료"
          title="타이틀"
          time="16:00"
          category="카테고리"
          tag="열심히 참여해요👍"
        />
      </div>
      <span className="text-base font-normal text-[#BABABA]">로그아웃</span>
    </div>
  );
}
