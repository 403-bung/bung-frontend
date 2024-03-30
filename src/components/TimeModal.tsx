import { useEffect, useState } from "react";
import Modal from "react-modal";
import cancel from "../icons/cancel.svg";
import Button from "./Button";
import TimePicker from "./TimePicker";
import TimeButton from "./TimeButton";

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
    height: "765px",
    marginTop: "0px",
    backgroundColor: "white",
  },
};

// interface IButton {
//   name?: string;
//   className: string;
//   btnClick?: any;
//   clicked?: boolean;
// }
export default function TimeModal() {
  const [timeModalIsOpen, setTimeModalIsOpen] = useState(false);
  useEffect(() => {
    setTimeModalIsOpen(true);
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
  // const onClick = () => {
  //   setIsClicked(!isClicked);
  // };
  console.log(isClicked);
  // TimePicker
  const [selectedTime, setSelectedTime] = useState("");
  const [showTimePicker, setShowTimePicker] = useState(false);
  const handleTimeChange = (time: string) => {
    setSelectedTime(time);
    setShowTimePicker(false);
  };
  const handleButtonClick = () => {
    setShowTimePicker(true);
  };
  console.log(selectedTime);
  // console.log(timeModalIsOpen);
  return (
    <button
      onClick={() => {
        setTimeModalIsOpen(true);
      }}
      className="text-[14px] font-[400] px-[8px] py-[4px] rounded-md bg-violet-100 border border-violet-300"
    >
      <Modal
        isOpen={timeModalIsOpen}
        onRequestClose={() => setTimeModalIsOpen(false)}
        style={customDetailStyles}
      >
        <img
          src={cancel}
          alt="이전으로"
          className="mt-[20px] ml-[336px]"
          onClick={(e) => {
            e.stopPropagation();
            setTimeModalIsOpen(false);
          }}
        />
        <div className="w-[375px] h-[426px] ">
          <div className="opacity-40  text-neutral-400 text-[28px] mt-[40px] ml-[16px] ">
            모임시작
          </div>
          <div className="text-black text-[28px] ml-[16px] mt-[8px]">
            오후 1시 23분~
          </div>
          <div className="text-purple-800 ml-[19px] mt-[19px]">
            모집기간: ~ 오후 1시 23분
          </div>
          <div className="w-[295px] h-[75px] mt-[61px] ml-[16px] flex flex-wrap gap-[8px] ">
            <TimeButton
              name={buttonNameList[0]}
              onClick={() => changeTag(buttonNameList[0])}
              clicked={isClicked === buttonNameList[0]}
            />
            <TimeButton
              name={buttonNameList[1]}
              onClick={() => changeTag(buttonNameList[1])}
              clicked={isClicked === buttonNameList[1]}
            />
            <TimeButton
              name={buttonNameList[2]}
              onClick={() => changeTag(buttonNameList[2])}
              clicked={isClicked === buttonNameList[2]}
            />
            <TimeButton
              name={buttonNameList[3]}
              onClick={() => changeTag(buttonNameList[3])}
              clicked={isClicked === buttonNameList[3]}
            />
            <TimeButton
              name={buttonNameList[4]}
              onClick={() => changeTag(buttonNameList[4])}
              clicked={isClicked === buttonNameList[4]}
            />
            {/* <div onClick={handleButtonClick}>
              <TimeButton
                name={buttonNameList[5]}
                onClick={() => changeTag(buttonNameList[5])}
                clicked={isClicked === buttonNameList[5]}
              />
            </div> */}
            {showTimePicker && <TimePicker onTimeChange={handleTimeChange} />}
            <div onClick={handleButtonClick}>
              <TimeButton
                name={selectedTime || "직접 입력"}
                onClick={() => changeTag(buttonNameList[5])}
                clicked={isClicked === buttonNameList[5]}
              ></TimeButton>
            </div>
          </div>
        </div>
        <div className="px-[16px] mt-[56px]">
          <Button text="수정하기" />
        </div>
      </Modal>
    </button>
  );
}
