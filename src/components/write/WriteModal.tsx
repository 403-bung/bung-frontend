import { useEffect, useState } from "react";
import Modal from "react-modal";
import cancel from "icons/cancel.svg";
import Button from "components/UI/Button";
import ModalTimeButton from "./WriteModalTimeBtn";

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
  //모달창
  const [modalIsOpen, setModalIsOpen] = useState(false);
  useEffect(() => {
    setModalIsOpen(true);
  }, []);
  //버튼 클릭
  const [isClicked, setIsClicked] = useState("");
  const changeTag = (name: string) => {
    setIsClicked(name);
  };
  const buttonNameList = [
    "10분 후",
    "30분 후",
    "1시간 후",
    "1.5시간 후",
    "2시간 후",
    "직접 입력",
  ];
  //시간 변환
  const [recruitingEndTime, setRecruitingEndTime] = useState(new Date());
  const endHours = recruitingEndTime.getHours();
  const endMinutes = recruitingEndTime.getMinutes();
  const endPeriod = endHours < 12 ? "오전" : "오후";
  const endDisplayTime = endHours > 12 ? endHours - 12 : endHours;
  const endTimeString = `${endPeriod} ${endDisplayTime}시 ${endMinutes}분`;
  //버튼 클릭으로 시간 변환
  const currentDateTime = new Date();
  function addMinutesToDate(date: Date, minutes: number) {
    return new Date(date.getTime() + minutes * 60000);
  }
  function handleButtonClick(minutes: number) {
    const newEndTime = addMinutesToDate(currentDateTime, minutes);
    setRecruitingEndTime(newEndTime);
  }

  useEffect(() => {
    setEndTimeString(recruitingEndTime.toString());
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
          <div onClick={() => handleButtonClick(10)}>
            <ModalTimeButton
              name={buttonNameList[0]}
              onClick={() => changeTag(buttonNameList[0])}
              clicked={isClicked === buttonNameList[0]}
            />
          </div>
          <div onClick={() => handleButtonClick(30)}>
            <ModalTimeButton
              name={buttonNameList[1]}
              onClick={() => changeTag(buttonNameList[1])}
              clicked={isClicked === buttonNameList[1]}
            />
          </div>
          <div onClick={() => handleButtonClick(60)}>
            <ModalTimeButton
              name={buttonNameList[2]}
              onClick={() => changeTag(buttonNameList[2])}
              clicked={isClicked === buttonNameList[2]}
            />
          </div>
          <div onClick={() => handleButtonClick(90)}>
            <ModalTimeButton
              name={buttonNameList[3]}
              onClick={() => changeTag(buttonNameList[3])}
              clicked={isClicked === buttonNameList[3]}
            />
          </div>
          <div onClick={() => handleButtonClick(120)}>
            <ModalTimeButton
              name={buttonNameList[4]}
              onClick={() => changeTag(buttonNameList[4])}
              clicked={isClicked === buttonNameList[4]}
            />
          </div>
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
