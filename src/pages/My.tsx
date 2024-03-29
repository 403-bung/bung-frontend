import Header from "../components/Header";
import NavBar from "../components/NavBar";
import ProfileBar from "../components/ProfileBar";
import StatusBar from "../components/StatusBar";
import MypageTab from "../components/MypageTab";
import AlarmTab from "../components/AlarmTab";

export default function My() {
  return (
    <>
      <div className="w-[375px] h-full min-h-screen bg-white flex flex-col items-center ">
        <StatusBar />
        <Header />
        <NavBar />
        <ProfileBar />
        <MypageTab />
        <AlarmTab />
      </div>
    </>
  );
}
