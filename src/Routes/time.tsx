import Header from "components/home/Header";
import cancel from "icons/cancel.svg";
import StatusBar from "components/UI/StatusBar";
import { useNavigate } from "react-router-dom";

export default function Time() {
  const navigate = useNavigate();
  return (
    <div className="w-[375px] h-full min-h-screen bg-white flex flex-col items-center">
      <img
        src={cancel}
        alt="이전으로"
        className="mt-[20px] ml-[324px]"
        onClick={() => {
          navigate("/write");
        }}
      />
      <div>시간수정</div>
    </div>
  );
}
