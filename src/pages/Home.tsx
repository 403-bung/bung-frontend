import AlarmModal from "../components/AlarmModal";
import { useSelector } from "react-redux";
import { ToolkitStore } from "../store";

export default function Home() {
  const isOpened = useSelector(
    (state: ToolkitStore) => state.alarmModal.showModal
  );

  return (
    <>
      <div className="w-[375px] min-h-screen bg-white absolute top-0">
        메인페이지
      </div>

      {/* 방금 회원가입한 사람을 대상으로 띄우는 모달*/}
      {isOpened && <AlarmModal />}
    </>
  );
}
