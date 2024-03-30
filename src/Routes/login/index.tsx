import KaKaoLoginBtn from "../../components/KakaoLoginBtn";
import banner from "../../img/image.png";

function Login() {
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_REST_API_KEY}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&response_type=code`;
  const handleLogin = () => {
    window.location.href = kakaoURL;
  };

  return (
    <div className="w-[375px] min-h-screen h-screen pt-[96px] pb-14 px-4 bg-white flex flex-col justify-between">
      <div>
        <img src={banner} alt="banner" className="w-" />
        <div className="text-center text-stone-900 text-[26px] font-bold mt-6">
          지금 당장 빠르게 팀원을 <br />
          구할 수 있어요!
        </div>
      </div>
      <KaKaoLoginBtn text="카카오로 로그인하기" onClick={handleLogin} />
    </div>
  );
}
export default Login;
