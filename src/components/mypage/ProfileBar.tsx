import { useNavigate } from "react-router";
import { changeAcceptence, getUser } from "api";
import { useQuery } from "@tanstack/react-query";
import { UserInfo } from "components/detail/DetailCard";
import { useMatch } from "react-router-dom";
import ProfileInfo from "./ProfileInfo";

export default function ProfileBar({
  userNo,
  participantUserNo,
  articleNo,
  isParticipant,
  isHost,
}: {
  userNo: number;

  participantUserNo?: number;
  articleNo?: number;
  isParticipant?: boolean;
  isHost?: boolean;
}) {
  const navigate = useNavigate();

  const { data } = useQuery<UserInfo>({
    queryKey: ["user", userNo],
    queryFn: async () => await getUser(userNo),
  });

  const matchMypage = useMatch("/my/:tab");
  const matchActivity = useMatch("/activity/:articleNo/:tab");

  return (
    <div className="w-full py-5 pl-5 pr-2 flex items-start gap-4">
      <div className="w-8 h-8 rounded-full overflow-hidden">
        <img
          src={data?.profileImageUrl}
          alt="profile"
          className="w-full h-full object-cover"
          width="32px"
          height="32px"
        />
      </div>
      <div className="w-[calc(100%-3rem)] flex flex-col gap-2">
        {matchMypage && (
          <div className="flex items-center gap-2">
            <span className="text-[18px] font-medium leading-none">
              {data?.nickname}
            </span>
            <button
              className="w-[37px] h-[21px] px-[6px] py-[2px] rounded-md bg-[#EDE9F6] text-nowrap flex justify-center items-center gap-[10px] border border-solid border-[#C7BBE4] text-[#4A25A9] font-semibold text-[14px]"
              onClick={() => navigate("/my/changePwd")}
            >
              수정
            </button>
          </div>
        )}
        {matchActivity && (
          <div className="flex items-center justify-between">
            <span className="text-[18px] font-medium leading-none">
              {data?.nickname}
            </span>
            {isParticipant && isHost && (
              <div className="flex gap-2">
                <button
                  className="px-2 py-3 text-[#4A25A9] font-semibold text-sm bg-[#EDE9F6] rounded-md flex justify-center items-center text-nowrap h-6"
                  onClick={() => {
                    changeAcceptence(
                      "ACCEPT",
                      articleNo || 0,
                      participantUserNo || 0
                    );
                  }}
                >
                  참여수락
                </button>
                <button
                  className="px-2 py-3 text-[#F66D6F] font-semibold text-sm bg-[#F66D6F1A] rounded-md flex justify-center items-center text-nowrap h-6"
                  onClick={() => {
                    changeAcceptence(
                      "DENY",
                      articleNo || 0,
                      participantUserNo || 0
                    );
                  }}
                >
                  참여거절
                </button>
              </div>
            )}
          </div>
        )}
        <ProfileInfo userNo={data?.userNo || 0} />
      </div>
    </div>
  );
}
