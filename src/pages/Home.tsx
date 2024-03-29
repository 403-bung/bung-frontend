import AlarmModal from "../components/AlarmModal";
import { useSelector } from "react-redux";
import { ToolkitStore } from "../store";
import NabBar from "../components/NavBar";
import StatusBar from "../components/StatusBar";
import Header from "../components/Header";
import Category from "../components/Category";
import ContentArea from "../components/ContentArea";

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
          <div className="flex w-full justify-end bg-[#fbfbfb] pt-5 pb-4 px-4">
            <select className="bg-transparent font-normal text-[14px]">
              <option>마감순</option>
              <option>인기순</option>
              <option>최신순</option>
            </select>
          </div>
          <ContentArea />
          <NabBar />
        </div>
      </div>

      {/* 방금 회원가입한 사람을 대상으로 띄우는 모달*/}
      {isOpened && <AlarmModal />}
    </>
  );
}
