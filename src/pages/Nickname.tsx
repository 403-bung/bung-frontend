import { useState, ChangeEvent, FormEvent } from "react";
import Button from "../components/Button";
import left_arrow from "../icons/left_arrow.svg";
import Title from "../components/Title";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { alarmModalActions } from "../store/alarmModal";

function NicknamePage() {
  const [nickname, setNickname] = useState<string>("");
  const [nicknameError, setNicknameError] = useState<string>("");
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [disabled, setDisabled] = useState(true);
  const dispatch = useDispatch();

  const handleNicknameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNickname(value);
    validateNickname(value);
  };

  const validateNickname = (value: string) => {
    if (!value) {
      setNicknameError("닉네임을 입력하세요");
      setDisabled(true);
    } else if (value.length < 2) {
      setNicknameError("2글자 이상 입력해주세요");
      setDisabled(true);
    } else if (value.length > 12) {
      setNicknameError("12글자 이하로 입력해주세요");
      setDisabled(true);
    } else if (!/^[ㄱ-ㅎ가-힣a-zA-Z0-9]*$/.test(value)) {
      setNicknameError("한글, 영어, 숫자만 입력할 수 있어요");
      setDisabled(true);
    } else {
      setNicknameError("사용할 수 있어요");
      setDisabled(false);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // 닉네임 가용성 검사(사실 값 바꿀떄마다 해야)
    if (nickname === "test") {
      setNicknameError("이미 사용 중인 닉네임입니다.");
      return;
    }
    // 제출 로직 구현
    console.log("닉네임 제출:", nickname);
  };

  const handleInputBlur = () => {
    setIsClicked(true);
    if (nickname === "") {
      setNicknameError("닉네임을 입력하세요");
    }
  };

  const navigate = useNavigate();
  return (
    <div className="w-[375px] h-full min-h-screen bg-white pt-[76px] pb-[52px] px-4 flex flex-col justify-between">
      <div>
        <img src={left_arrow} alt="이전으로" />
        <div className="flex flex-col mt-4 mb-7">
          <Title text={"마지막으로"} />
          <Title text={"닉네임을 적어주세요"} />
        </div>
        <form onSubmit={handleSubmit}>
          <input
            className="w-[343px] rounded-[10px] border-[0.5px] placeholder:text-[#595959] placeholder:font-medium border-[#595959] px-4 py-[17px] mb-2"
            placeholder="닉네임을 입력해 주세요"
            value={nickname}
            onChange={handleNicknameChange}
            onBlur={handleInputBlur}
          />
          {nicknameError && (
            <p className=" text-base text-[#ff3d3d] font-medium">
              {nicknameError}
            </p>
          )}
        </form>
      </div>
      <Button
        text={"다음"}
        onClick={() => {
          navigate("/home");
          dispatch(alarmModalActions.openModal());
          localStorage.setItem("key", "kakaoId");
        }}
        disabled={disabled}
      />
    </div>
  );
}

export default NicknamePage;
