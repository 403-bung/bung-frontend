import Header from "components/home/Header";
import NavBar from "components/UI/NavBar";
import ProfileBar from "components/mypage/ProfileBar";
import StatusBar from "components/UI/StatusBar";
import MypageTab from "components/UI/MypageTab";
import AlarmTab from "components/mypage/AlarmTab";
import TimelineArea from "components/mypage/TimelineArea";
import { useLocation } from "react-router";
import MannerArea from "components/mypage/MannerArea";
import { useDispatch, useSelector } from "react-redux";
import { changeNicknameActions } from "store/changeNickname";
import { ToolkitStore } from "store";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Cookies } from "react-cookie";
import SubTitle1 from "components/UI/SubTitle1";
import KaKaoLoginBtn from "components/UI/KakaoLoginBtn";
import { useNavigate } from "react-router-dom";

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

  const cookies = new Cookies();
  const userNo = cookies.get("userNo");
  const navigate = useNavigate();
  return (
    <>
      <div className="w-[375px] h-dvh min-h-dvh bg-white flex flex-col items-center ">
        <StatusBar />
        <Header />
        <NavBar />
        {cookies.get("id") ? (
          <>
            <ProfileBar userNo={userNo} />
            <MypageTab timelinePath="/my/timeline" mannerPath={"/my/manner"} />
            {location.pathname === "/my/timeline" && (
              <>
                <div className="w-full h-full bg-[#F2F2F6] overflow-y-auto scrollbar-hide pb-18">
                  <AlarmTab />
                  <TimelineArea userNo={userNo} />
                </div>
                <div className="pt-5 pb-24 bg-[#F2F2F6] w-full flex justify-center">
                  <button
                    onClick={() => {
                      cookies.remove("id", { path: "/" });
                      cookies.remove("userNo", { path: "/" });
                      navigate("/home");
                    }}
                  >
                    <span className="text-base font-normal text-[#BABABA]">
                      로그아웃
                    </span>
                  </button>
                </div>
              </>
            )}
            {location.pathname === "/my/manner" && (
              <MannerArea userNo={userNo} />
            )}
          </>
        ) : (
          <>
            <div className="w-full px-5 pt-10 pb-[58px] flex flex-col gap-[14px]">
              <SubTitle1 text="프로필" />
              <span className="text-base font-normal">
                로그인하고 더 많은 기능을 사용해보세요!
              </span>
            </div>
            <KaKaoLoginBtn
              text="카카오로 로그인하기"
              onClick={() => navigate("/login")}
            />
          </>
        )}
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
