import { useNavigate } from "react-router";
import profile from "icons/profile.svg";
import { Cookies } from "react-cookie";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ProfileBar() {
  const navigate = useNavigate();
  const cookies = new Cookies();
  const token = cookies.get("id");
  const userNo = cookies.get("userNo");
  // redux 사용하기
  const [nickname, setNickname] = useState("닉네임");

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/users/${userNo}/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setNickname(response.data.nickname);
      });
  });

  return (
    <div className="w-full py-5 pl-5 flex items-start gap-4">
      <img src={profile} alt="profile" />
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <span className="text-[18px] font-medium leading-none">
            {nickname}
          </span>
          <button
            className="w-[37px] h-[21px] px-[6px] py-[2px] rounded-md bg-[#EDE9F6] text-nowrap flex justify-center items-center gap-[10px] border border-solid border-[#C7BBE4] text-[#4A25A9] font-semibold text-[14px]"
            onClick={() => navigate("/my/changePwd")}
          >
            수정
          </button>
        </div>

        <div className="text-[14px] flex gap-[10px]">
          <div className="flex gap-[2px]">
            <span className="font-normal">모임</span>
            <span className="font-semibold">5</span>
          </div>
          <div className="flex gap-[2px]">
            <span className="font-normal">받은 평가</span>
            <span className="font-semibold">20</span>
          </div>
        </div>
      </div>
    </div>
  );
}
