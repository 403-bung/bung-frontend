import Button from "../../components/Button";

function Login() {
  const Rest_api_key = "c8688e3e2dd58da9964bf93a1d0d79b5";
  const redirect_uri = "http://localhost:3000/login/confirm";
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;
  const handleLogin = () => {
    window.location.href = kakaoURL;
  };

  return (
    <div className="w-[375px] h-[812px] pt-[96px] pl-4  ">
      <div className=" border-black border w-[343px] h-[343px]  "></div>
      <div className="text-center text-stone-900 text-[26px] font-bold font-['Pretendard'] leading-[39px] mt-6">
        지금 당장 빠르게 팀원을 <br />
        구할 수 있어요!
      </div>
      <div className="mt-[160px] w-[343px] h-[59px] py-[19px] bg-zinc-400 rounded-[10px] justify-center items-center gap-2.5 inline-flex">
        <Button text="카카오로 시작하기" onclick={handleLogin} />
      </div>
    </div>
  );
}
export default Login;
