import AlarmModal from "components/home/AlarmModal";
import { useSelector } from "react-redux";
import { ToolkitStore } from "store";
import NabBar from "components/UI/NavBar";
import StatusBar from "components/UI/StatusBar";
import Header from "components/home/Header";
import Category from "components/home/Category";
import ContentArea from "components/home/ContentArea";

export default function Home() {
  const isOpened = useSelector(
    (state: ToolkitStore) => state.alarmModal.showModal
  );

  return (
    <>
      <div className="w-[375px] min-h-screen bg-white flex flex-col items-center absolute top-0">
        <div className="w-full h-screen flex flex-col items-center">
          <StatusBar />
          <Header />
          <Category />
          <ContentArea />
          <NabBar />
        </div>
      </div>

      {/* 방금 회원가입한 사람을 대상으로 띄우는 모달*/}
      {isOpened && <AlarmModal />}
    </>
  );
}
