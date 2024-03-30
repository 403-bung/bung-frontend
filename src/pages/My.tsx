import Header from "../components/Header";
import NavBar from "../components/NavBar";
import ProfileBar from "../components/ProfileBar";
import StatusBar from "../components/StatusBar";
import MypageTab from "../components/MypageTab";
import AlarmTab from "../components/AlarmTab";
import TimelineArea from "../components/TimelineArea";
import { useLocation } from "react-router";
import MannerArea from "../components/MannerArea";
import { useDispatch, useSelector } from "react-redux";
import { changeNicknameActions } from "../store/changeNickname";
import { ToolkitStore } from "../store";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function My() {
  const location = useLocation();
  const dispatch = useDispatch();
  const isChangedNickname = useSelector(
    (state: ToolkitStore) => state.changeNickname.isChangedNickname
  );

  useEffect(() => {
    if (isChangedNickname) {
      notify();
      dispatch(changeNicknameActions.setInitial());
    }
  }, [isChangedNickname, dispatch]);

  const notify = () => toast.success("닉네임이 수정됐어요");

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
      <ToastContainer
        position="bottom-center"
        limit={1}
        closeButton={false}
        autoClose={3000}
        hideProgressBar
      />
    </>
  );
}
