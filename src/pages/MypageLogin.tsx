import Header from "../components/Header";
import KaKaoLoginBtn from "../components/KakaoLoginBtn";
import NabBar from "../components/NavBar";
import StatusBar from "../components/StatusBar";
import SubTitle1 from "../components/SubTitle1";

export default function MypageLogin() {
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
      <KaKaoLoginBtn text="카카오로 로그인하기" />
      <NabBar />
    </div>
  );
}
