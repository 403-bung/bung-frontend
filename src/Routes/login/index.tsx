function Login() {
  const Rest_api_key = "c8688e3e2dd58da9964bf93a1d0d79b5";
  const redirect_uri = "http://localhost:3000/login";
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;
  const handleLogin = () => {
    window.location.href = kakaoURL;
  };

  return (
    <div className="w-[375px] h-[812px]">
      <div className=" border-black border w-[343px] h-[343px] mx-4 mt-24"></div>
      <h1 className="text-center mt-6 mx-16 text-sm w-[249px]">
        지금 당장 빠르게 팀원을 구할 수 있어요!
      </h1>
      <button
        onClick={handleLogin}
        className="mt-40 w-[343px h-[59px] mx-4 px-[102px] py-[19px] bg-[#BABABA] text-[18px] font-[600] rounded-[10px] "
      >
        카카오로 시작하기
      </button>
    </div>
  );
}
export default Login;
