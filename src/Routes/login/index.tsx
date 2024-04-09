import { Cookies } from "react-cookie";
import KaKaoLoginBtn from "../../components/KakaoLoginBtn";
import { SERVER_URL } from "../../data/url";
import banner from "../../icons/main.svg";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const handleLogin = () => {
    window.location.href = `${SERVER_URL}/users/sign-in?oauthType=kakao`;
  };
  // const navigate = useNavigate();
  // const cookies = new Cookies();
  // const id = cookies.get("id");
  // useEffect(() => {
  //   if (!id) {
  //     navigate("/login");
  //   } else {
  //     navigate("/home");
  //   }
  // });

  return (
    <div className="w-[375px] min-h-screen h-screen pt-[96px] pb-14 px-4 bg-white flex flex-col justify-between">
      <div>
        <img src={banner} alt="banner" />
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
