import { useNavigate } from "react-router-dom";
import TimelineCard from "./TimelineCard";
import { Cookies } from "react-cookie";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function TimelineArea() {
  const navigate = useNavigate();
  const cookies = new Cookies();
  const token = cookies.get("id");
  const userNo = cookies.get("userNo");

  // async function getArticle(articleNo: string) {
  //   const response = await axios.get(`${process.env.REACT_APP_API_URL}/articles/${articleNo}`, {
  //     headers: { Authorization: `Bearer ${token}` },
  //     params: { userNo: userNo, articleNo: articleNo },
  //   });
  //   return response.data;
  // }
  async function getPartyHistory(userNo: number) {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/users/${userNo}/party-histories`,
      {
        headers: { Authorization: `Bearer ${token}` },
        params: { userNo: userNo },
      }
    );
    console.log(typeof userNo);
    console.log(response);
    return response.data;
  }

  const { data } = useQuery({
    queryKey: ["userHistory", userNo],
    queryFn: async () => await getPartyHistory(userNo),
  });

  console.log(data);
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
      <button
        onClick={() => {
          cookies.remove("id", { path: "/" });
          cookies.remove("userNo", { path: "/" });
          navigate("/home");
        }}
      >
        <span className="text-base font-normal text-[#BABABA]">로그아웃</span>
      </button>
    </div>
  );
}
