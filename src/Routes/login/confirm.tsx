import { GrPrevious, GrNext } from "react-icons/gr";
import logo from "../../img/logo.png";
import React, { useState } from "react";
import Modal from "react-modal";

const customStyles = {
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
    padding: "20px",
    width: "375px",
    height: "496px",
    marginTop: "158px",
    backgroundColor: "white",
  },
};

function Confirm() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("option1");
  const openModal = () => {
    setModalIsOpen(true);
  };
  const closeModal = () => {
    setModalIsOpen(false);
  };
  Modal.setAppElement("#root");
  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
  };
  return (
    <>
      <div className="mt-[76px] ml-4 mr-2">
        <div>
          <GrPrevious />
        </div>
        <div className="mt-4 text-[26px] font-[700] font-[Pretendard] leading-[39px]  ">
          이메일을 확인해주세요
        </div>
        <div className="mt-7 flex">
          <img src={logo} alt="Logo" className="w-5 h-5"></img>
          <div className="text-[14px] font-[400] font-[Pretendard] ml-[10px]">
            user@example.com
          </div>
        </div>
        <button
          onClick={openModal}
          className="mt-[498px] w-[343px] h-[59px] bg-[#BABABA] text-[18px] font-[600] rounded-[10px]"
        >
          {" "}
          다음
        </button>
        <div>
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            contentLabel="약관 동의"
            style={customStyles}
          >
            <div className="mt-8 inline-flex flex-col">
              <div className="font-[Pretendard] text-[26px] font-[700] leading-[39px]">
                약관에 동의해 주세요
              </div>
              <div className="bg-[#E9E9E9] w-[343px] px-4 py-3 flex items-center mt-[19px]">
                <input
                  type="radio"
                  id="option1"
                  value="option1"
                  checked={selectedOption === "option1"}
                  onChange={handleRadioChange}
                  style={{
                    width: "21px",
                    height: "21px",
                  }}
                />
                <label
                  className="font-[Pretendard text-[18px] font-[600] ml-3"
                  htmlFor="option1"
                >
                  약관 전체 동의
                </label>
              </div>
              <div className="flex justify-between items-center self-stretch mt-7">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="option2"
                    value="option2"
                    checked={selectedOption === "option2"}
                    onChange={handleRadioChange}
                    style={{
                      width: "21px",
                      height: "21px",
                    }}
                  />
                  <label
                    className="font-[Pretendard text-[16px] font-[500] ml-3"
                    htmlFor="option2"
                  >
                    서비스 이용약관 전체동의(필수)
                  </label>
                </div>
                <GrNext />
              </div>
              <div className="flex justify-between items-center self-stretch mt-[19px]">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="option3"
                    value="option3"
                    checked={selectedOption === "option3"}
                    onChange={handleRadioChange}
                    style={{
                      width: "21px",
                      height: "21px",
                    }}
                  />
                  <label
                    className="font-[Pretendard text-[16px] font-[500] ml-3"
                    htmlFor="option3"
                  >
                    개인 정보 수집 및 이용 동의(필수)
                  </label>
                </div>
                <GrNext />
              </div>
            </div>

            <button
              onClick={openModal}
              className=" mt-[153px] w-[343px] px-[155px] py-[19px] bg-[#BABABA] text-[18px] font-[600] rounded-[10px]"
            >
              확인
            </button>
          </Modal>
        </div>
      </div>
    </>
  );
}

export default Confirm;
