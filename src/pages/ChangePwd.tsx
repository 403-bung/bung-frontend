import { Link, useNavigate } from "react-router-dom";
import closeBtn from "icons/closeBtn.svg";
import StatusBar from "components/UI/StatusBar";
import { ChangeEvent, FormEvent, useState } from "react";
import Button from "components/UI/Button";
import { useDispatch } from "react-redux";
import { changeNicknameActions } from "store/changeNickname";
import { Cookies } from "react-cookie";
import axios from "axios";

export default function ChangePwd() {
  const [nickname, setNickname] = useState<string>("");
  const [nicknameError, setNicknameError] = useState<string>("");
  const [disabled, setDisabled] = useState(true);
  const navigate = useNavigate();

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

    const cookies = new Cookies();
    const token = cookies.get("id");
    const userNo = cookies.get("userNo");

    axios
      .put(
        `${process.env.REACT_APP_API_URL}/users/${userNo}/nickname`,
        { nickname },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {});

    dispatch(changeNicknameActions.changeNickname());
    navigate(-1);
  };

  const handleInputBlur = () => {
    if (nickname === "") {
      setNicknameError("닉네임을 입력하세요");
    }
  };

  const dispatch = useDispatch();

  return (
    <>
      <div className="w-[375px] h-dvh bg-white flex flex-col">
        <StatusBar />
        <div className="pr-[15px] pt-5 pb-4 flex justify-end">
          <Link to="/my/timeline">
            <img src={closeBtn} alt="close" />
          </Link>
        </div>
        <div className="h-dvh pt-5 px-4 flex flex-col gap-2 justify-between pb-14">
          <div className="h-full h-min-dvh flex flex-col">
            <span className="font-semibold">닉네임</span>
            <form
              className="h-full flex flex-col justify-between"
              onSubmit={handleSubmit}
            >
              <div>
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
              </div>
              <Button text={"확인하기"} disabled={disabled} />
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
