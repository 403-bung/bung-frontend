import { useEffect, useState } from "react";
import Modal from "react-modal";
import cancel from "../icons/cancel.svg";
import Button from "./Button";

const customDetailStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: "0px",
    width: "375px",
    height: "452px",
    marginTop: "180px",
    backgroundColor: "white",
  },
};

interface TimeProps {
  setEndTimeString: (endtimeString: string) => void;
}

export default function WriteModal({ setEndTimeString }: TimeProps) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  useEffect(() => {
    setModalIsOpen(true);
  }, []);
  const currentDateTime = new Date();
  const [recruitingEndTime, setRecruitingEndTime] = useState(new Date());
  function addMinutesToDate(date: Date, minutes: number) {
    return new Date(date.getTime() + minutes * 60000);
  }
  function handleButtonClick(minutes: number) {
    const newEndTime = addMinutesToDate(currentDateTime, minutes);
    setRecruitingEndTime(newEndTime);
  }
  const endHours = recruitingEndTime.getHours();
  const endMinutes = recruitingEndTime.getMinutes();
  const endPeriod = endHours < 12 ? "오전" : "오후";
  const endDisplayTime = endHours > 12 ? endHours - 12 : endHours;
  const endTimeString = `${endPeriod} ${endDisplayTime}시 ${endMinutes}분`;
  useEffect(() => {
    const endHours = recruitingEndTime.getHours();
    const endMinutes = recruitingEndTime.getMinutes();
    const endPeriod = endHours < 12 ? "오전" : "오후";
    const endDisplayTime = endHours > 12 ? endHours - 12 : endHours;
    const endTimeString = `${endPeriod} ${endDisplayTime}시 ${endMinutes}분`;
    setEndTimeString(endTimeString); // 부모 컴포넌트로 값을 전달
  }, [recruitingEndTime, setEndTimeString]);
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={() => setModalIsOpen(false)}
      style={customDetailStyles}
    >
      <img
        src={cancel}
        alt="이전으로"
        className="mt-[20px] ml-[324px]"
        onClick={() => setModalIsOpen(false)}
      />
      <div className="w-[325px] h-[158px]  bg-[#EDE9F6]  rounded ml-[25px] mt-[15px] flex flex-col items-center">
        <div className="text-[18px font-[600] text-[#232323] mt-[27px]">
          모임 시작 시간
        </div>
        <div className="text-[24px] font-[600] mt-[16px]">{endTimeString}</div>
        <div className="text-[16px] font-[600] text-[#6E51BA] mt-[16px]">
          모집 기간: ~ {endTimeString}
        </div>
      </div>
      <div className="w-[375px] flex flex-nowrap overflow-x-hidden hover:overflow-x-scroll  mt-[29px] scrollbar-hide ">
        <div className="flex items-center gap-[6px] ml-[25px] mr-[25px] ">
          <button
            className="text-[16px] font-[500] bg-[#EDE9F6] text-[#4A25A9] w-[71px] h-[39px] p-[10px] rounded-md border border-violet-900 flex items-center"
            onClick={() => handleButtonClick(10)}
          >
            10분 후
          </button>
          <button
            className="text-[16px] font-[500] bg-white text-neutral-400 w-[74px] h-[39px] p-[10px] rounded-md border border-neutral-400 flex items-center"
            onClick={() => handleButtonClick(30)}
          >
            30분 후
          </button>
          <button
            className="text-[16px] font-[500] bg-white text-neutral-400 w-[75px] h-[39px] p-[10px] rounded-md border border-neutral-400 flex items-center"
            onClick={() => handleButtonClick(60)}
          >
            1시간 후
          </button>
          <button
            className="text-[16px] font-[500] bg-white text-neutral-400 w-[88px] h-[39px] p-[10px] rounded-md border border-neutral-400 flex items-center"
            onClick={() => handleButtonClick(90)}
          >
            1.5시간 후
          </button>
          <button
            className="text-[16px] font-[500] bg-white text-neutral-400 w-[77px] h-[39px] p-[10px] rounded-md border border-neutral-400 flex items-center"
            onClick={() => handleButtonClick(120)}
          >
            2시간 후
          </button>
        </div>
      </div>
      <div className="px-[16px] mt-[56px]">
        <div>
          <Button text="작성하기" onClick={() => setModalIsOpen(false)} />
        </div>
      </div>
    </Modal>
  );
}
