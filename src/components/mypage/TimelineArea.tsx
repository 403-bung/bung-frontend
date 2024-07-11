import TimelineCard from "./TimelineCard";
import { useQuery } from "@tanstack/react-query";
import getStatusText from "utils/getStatusText";
import { getFullTime } from "utils/getFormatTime";
import { categories } from "components/detail/DetailCard";
import { UserParticipationHistories, getPartyHistory } from "api";

export default function TimelineArea({ userNo }: { userNo: number }) {
  const { data } = useQuery<UserParticipationHistories>({
    queryKey: ["userHistory", userNo],
    queryFn: async () => await getPartyHistory(userNo),
  });

  return (
    <div className="w-full flex flex-col items-center bg-[#F2F2F6] ">
      <div className="w-full h-full flex flex-col p-5 gap-[10px]">
        {data?.participationHistories &&
          [...data.participationHistories]
            .sort((a, b) => b.articleNo - a.articleNo)
            .map((history) => (
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
