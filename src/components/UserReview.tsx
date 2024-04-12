import { Link } from "react-router-dom";
import closeBtn from "../icons/closeBtn.svg";
import StatusBar from "./UI/StatusBar";

export default function UserReview() {
  return (
    <>
      <div className="w-[375px] h-screen bg-white flex flex-col">
        <StatusBar />
        <div className="w-[375px] h-[60px]  pl-[135px] pr-[15px] pt-[20px] pb-[16px] flex justify-end items-start gap-24">
          <div className="text-cente text-stone-900 font-semibold">
            팀원 후기 보내기
          </div>
          <Link to="/home">
            <img src={closeBtn} alt="close" />
          </Link>
        </div>
      </div>
    </>
  );
}
