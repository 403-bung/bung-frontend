import { useNavigate } from "react-router-dom";
import TimelineCard from "./TimelineCard";
import { Cookies } from "react-cookie";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import getStatusText from "utils/getStatusText";
import { getFullTime } from "utils/getFormatTime";
import { categories } from "components/detail/DetailCard";

type UserParticipationHistories = {
  userNo: number;
  totalCount: number;
  participationHistories: ParticipationHistories[];
};

type ParticipationHistories = {
  articleNo: number;
  name: string; // 구인글제목
  content: string; //구인글내용
  category: string;
  status: string;
  currentUserCount: number;
  maxUserCount: number;
  recruitingStartTime: string;
  recruitingEndTime: string;
  partyStartTime: string;
};

export default function TimelineArea() {
  const cookies = new Cookies();
  const token = cookies.get("id");
  const userNo = cookies.get("userNo");

  async function getPartyHistory(userNo: number) {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/users/${userNo}/party-histories`,
      {
        headers: { Authorization: `Bearer ${token}` },
        params: { userNo: userNo },
      }
    );

    return response.data;
  }

  const { data } = useQuery<UserParticipationHistories>({
    queryKey: ["userHistory", userNo],
    queryFn: async () => await getPartyHistory(userNo),
  });

  console.log(data);

  return (
    <div className="w-full flex flex-col items-center bg-[#F2F2F6] ">
      <div className="w-full h-full flex flex-col p-5 gap-[10px]">
        {data?.participationHistories.map((history) => (
          <TimelineCard
            status={getStatusText(history.status)}
            title={history.name}
            time={getFullTime(history.partyStartTime)}
            category={categories.get(history.category || "FREE") || "자유"}
            tag="열심히 참여해요👍"
            articleNo={history.articleNo}
          />
        ))}
      </div>
    </div>
  );
}
