import { useDispatch } from "react-redux";
import Button from "../components/Button";
import SubTitle1 from "../components/SubTitle1";
import Title from "../components/Title";
import { alarmModalActions } from "../store/alarmModal";

export default function AlarmModal() {
  const dispatch = useDispatch();
  const handleCloseModal = () => {
    dispatch(alarmModalActions.closeModal());
  };

  return (
    <>
      <div className="w-[375px] min-h-screen">
        <div
          className=" bg-[#595959] opacity-90 w-[375px] min-h-screen"
          onClick={handleCloseModal}
        ></div>
        <div className="bg-white w-[375px] h-[496px] absolute bottom-0 z-20 px-4 pt-[52px]">
          <div className="flex flex-col items-center mb-[76px]">
            <div className=" w-[165px] h-[165px] border-black border-solid border-2 mb-8"></div>
            <Title text="알람을 받아보시겠어요?" />
            <SubTitle1 text={"매일 새로운 모임을 확인하세요"} />
          </div>
          <Button text="네, 받을래요" onClick={handleCloseModal} />
          <button className="w-full h-10" onClick={handleCloseModal}>
            아니요, 괜찮아요
          </button>
        </div>
      </div>
    </>
  );
}
