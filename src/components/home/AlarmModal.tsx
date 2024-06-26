import { useDispatch } from "react-redux";
import Button from "components/UI/Button";
import SubTitle1 from "components/UI/SubTitle1";
import Title from "components/UI/Title";
import { alarmModalActions } from "store/alarmModal";
import alarmImg from "icons/alarmImg.svg";
import axios from "axios";
import { Cookies } from "react-cookie";

export default function AlarmModal() {
  const cookies = new Cookies();
  const userNo = cookies.get("userNo");
  const token = cookies.get("id");

  const dispatch = useDispatch();
  const handleCloseModal = (pushEnable: boolean) => {
    dispatch(alarmModalActions.closeModal());
    submitAlarm(pushEnable);
  };

  function submitAlarm(pushEnable: boolean) {
    axios
      .put(
        `${process.env.REACT_APP_API_URL}/users/${userNo}/push`,
        { pushEnable },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        console.log(response.data);
      });
  }

  return (
    <>
      <div className="w-[375px] h-full fixed">
        <div
          className=" bg-[#595959] opacity-90 w-[375px] fixed h-full z-10 overflow-y-hidden"
          onClick={() => handleCloseModal(false)}
        ></div>
        <div className="bg-white w-[375px] h-[496px] fixed bottom-0 z-20 px-4 py-[52px] flex flex-col justify-between">
          <div className="flex flex-col items-center gap-8">
            <img src={alarmImg} alt="alarmImg" />
            <div className="flex flex-col items-center">
              <Title text="알람을 받아보시겠어요?" />
              <SubTitle1 text={"매일 새로운 모임을 확인하세요"} />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Button
              text="네, 받을래요"
              onClick={() => handleCloseModal(true)}
            />
            <button
              className="w-full text-base font-normal text-[#595959]"
              onClick={() => handleCloseModal(false)}
            >
              아니요, 괜찮아요
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
