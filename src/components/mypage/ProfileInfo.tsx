import { useQuery } from "@tanstack/react-query";
import { feedback, getPartyHistory } from "api";
import { Feedback, UserParticipationHistories } from "api";

export default function ProfileInfo({ userNo }: { userNo: number }) {
  const { data: feedbackData } = useQuery<Feedback>({
    queryKey: ["profile", "feedback", userNo],
    queryFn: async () => await feedback(userNo),
  });

  const { data: partyData } = useQuery<UserParticipationHistories>({
    queryKey: ["profile", "party", userNo],
    queryFn: async () => await getPartyHistory(userNo),
  });

  return (
    <div className="text-[14px] flex gap-[10px]">
      <div className="flex gap-[2px]">
        <span className="font-normal">모임</span>
        <span className="font-semibold">{partyData?.totalCount}</span>
      </div>
      <div className="flex gap-[2px]">
        <span className="font-normal">받은 평가</span>
        <span className="font-semibold">{feedbackData?.feedbackSize}</span>
      </div>
    </div>
  );
}
