import { useNavigate } from "react-router-dom";
import Header from "components/home/Header";
import KaKaoLoginBtn from "components/UI/KakaoLoginBtn";
import NabBar from "components/UI/NavBar";
import StatusBar from "components/UI/StatusBar";
import SubTitle1 from "components/UI/SubTitle1";

export default function MypageLogin() {
  const navigate = useNavigate();
  return (
    <div className="w-[375px] h-screen min-h-screen bg-white flex flex-col items-center ">
      <StatusBar />
      <Header />

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
      <NabBar />
    </div>
  );
}
