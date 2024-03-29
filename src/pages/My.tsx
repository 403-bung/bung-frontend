import Header from "../components/Header";
import NavBar from "../components/NavBar";
import ProfileBar from "../components/ProfileBar";
import StatusBar from "../components/StatusBar";
import MypageTab from "../components/MypageTab";
import AlarmTab from "../components/AlarmTab";
import TimelineArea from "../components/TimelineArea";
import { useLocation } from "react-router";
import MannerArea from "../components/MannerArea";

export default function My() {
  const location = useLocation();
  return (
    <>
      <div className="w-[375px] h-screen min-h-screen bg-white flex flex-col items-center ">
        <StatusBar />
        <Header />
        <NavBar />
        <ProfileBar />
        <MypageTab />
        {location.pathname === "/my/timeline" && (
          <div className="w-full h-full bg-[#F2F2F6]  overflow-y-auto scrollbar-hide pb-24">
            <AlarmTab />
            <TimelineArea />
          </div>
        )}
        {location.pathname === "/my/manner" && <MannerArea />}
      </div>
    </>
  );
}
