import logo from "../../img/logo.png";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import Button from "../../components/Button";
import left_arrow from "../../icons/left_arrow.svg";
import right_arrow from "../../icons/right_arrow.svg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { SERVER_URL } from "../../data/url";
import { Cookies } from "react-cookie";

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
    padding: "0px",
    width: "375px",
    height: "496px",
    marginTop: "158px",
    backgroundColor: "white",
  },
};

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
    paddingTop: "26px",
    width: "375px",
    height: "713px",
    marginTop: "158px",
    backgroundColor: "white",
  },
};

const useModal = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };
  return { modalOpen, openModal, closeModal };
};

function Confirm() {
  const {
    modalOpen: modalIsOpen1,
    openModal: openModal1,
    closeModal: closeModal1,
  } = useModal();
  const {
    modalOpen: modalIsOpen2,
    openModal: openModal2,
    closeModal: closeModal2,
  } = useModal();
  const {
    modalOpen: modalIsOpen3,
    openModal: openModal3,
    closeModal: closeModal3,
  } = useModal();
  const [isAllChecked, setIsAllChecked] = useState(false);
  const [checkedState, setCheckedState] = useState(new Array(2).fill(false));
  const handleAllCheck = () => {
    setIsAllChecked((prev) => !prev);
    let array = new Array(2).fill(!isAllChecked);
    setCheckedState(array);
  };
  const handleMonoCheck = (position: number) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );

    setCheckedState(updatedCheckedState);
    const checkedLength = updatedCheckedState.reduce((sum, currentState) => {
      if (currentState === true) {
        return sum + 1;
      }
      return sum;
    }, 0);
    setIsAllChecked(checkedLength === updatedCheckedState.length);
  };
  const handleFirstConfirm = () => {
    closeModal2();
  };
  const handleSecondConfirm = () => {
    closeModal3();
  };
  const navigate = useNavigate();

  const [email, setEmail] = useState("user@example.com");

  const cookies = new Cookies();

  useEffect(() => {
    const url = window.location.search;
    const params = url.slice(1, url.length).split("&");
    const userNo = params[0].split("=")[1];
    const token = params[1].split("=")[1];
    cookies.set("id", token, { path: "/" });
    cookies.set("userNo", userNo, { path: "/" });

    axios
      .get(`${SERVER_URL}/users/${userNo}/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setEmail(response.data.email);
      });
  });

  return (
    <>
      <div className="w-[375px] h-screen pt-[76px] pb-14 px-4 bg-white">
        <img src={left_arrow} alt="이전으로" />

        <div className="h-full flex flex-col justify-between">
          <div>
            <div className="mt-4 text-[26px] font-[700] font-[Pretendard] leading-[39px]  ">
              이메일을 확인해주세요
            </div>
            <div className="mt-7 flex">
              <img src={logo} alt="Logo" className="w-5 h-5"></img>
              <div className="text-[14px] font-[400] font-[Pretendard] ml-[10px]">
                {email}
              </div>
            </div>
          </div>
          <div className="w-[343px] h-[59px] py-[19px] bg-zinc-400 rounded-[10px] justify-center items-center gap-2.5 inline-flex">
            <Button text="다음" onClick={openModal1} />
          </div>
        </div>
        <div>
          <Modal
            isOpen={modalIsOpen1}
            onRequestClose={closeModal1}
            contentLabel="약관 동의"
            style={customStyles}
          >
            <div className=" mt-[32px] mx-[16px] inline-flex flex-col">
              <div className="font-[Pretendard] text-[26px] font-[700] leading-[39px]">
                약관에 동의해 주세요
              </div>
              <div className="bg-[#E9E9E9] w-[343px] px-4 py-3 flex items-center mt-[19px]">
                <input
                  type="checkbox"
                  id="option1"
                  // value="option1"
                  checked={isAllChecked}
                  onChange={() => handleAllCheck()}
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
              <div className=" flex justify-between items-center self-stretch mt-[28px]">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="option2"
                    // value="option2"
                    checked={checkedState[0]}
                    onChange={() => handleMonoCheck(0)}
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
                <img
                  alt="상세 내용 보기"
                  src={right_arrow}
                  onClick={openModal2}
                />
                <Modal
                  isOpen={modalIsOpen2}
                  onRequestClose={closeModal2}
                  contentLabel="개인 정보 수집"
                  style={customDetailStyles}
                >
                  <div className="text-stone-900 text-lg font-semibold font-['Pretendard'] mb-[28px] pl-[28px] pr-[27px]">
                    타이틀입니다.
                  </div>
                  <div className="text-zinc-600 text-base font-normal font-['Pretendard'] pl-[28px] pr-[27px]">
                    내용입니다.
                    텍스트더미텍스트더미텍스트더미텍스트더미텍스트더미텍스트더미텍스트더미텍스트더미텍스트더미텍스트더미텍스트더미텍스트더미텍스트더미텍스트더미텍스트더미텍스트더미텍스트더미텍스트더미텍스트더미텍스트더미텍스트더미텍스트더미텍스트더미텍스트더미텍스트더미텍스트더미텍스트더미텍스트더미텍스트더미텍스트더미텍스트더미텍스트더미텍스트더미텍스트더미텍스트더미텍스트더미텍스트더미텍스트더미텍스트더미텍스트더미텍스트더미텍스트더미텍스트더미텍스트더미텍스트더미텍스트더미텍스트더미텍스트더미{" "}
                  </div>
                  <div className="px-[16px] mt-[19px]" onClick={openModal1}>
                    <Button text="확인" onClick={handleFirstConfirm}></Button>
                  </div>
                </Modal>
              </div>
              <div className="flex justify-between items-center self-stretch mt-[19px]">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="option3"
                    // value="option3"
                    checked={checkedState[1]}
                    onChange={() => handleMonoCheck(1)}
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
                <img
                  alt="상세 내용 보기"
                  src={right_arrow}
                  onClick={openModal3}
                />
                <Modal
                  isOpen={modalIsOpen3}
                  onRequestClose={closeModal3}
                  contentLabel="개인 정보 수집"
                  style={customDetailStyles}
                >
                  <div className="text-stone-900 text-lg font-semibold font-['Pretendard'] mb-[28px] pl-[28px] pr-[27px]">
                    타이틀입니다.
                  </div>
                  <div className="text-zinc-600 text-base font-normal font-['Pretendard'] pl-[28px] pr-[27px]">
                    내용입니다.
                    텍스트더미텍스트더미텍스트더미텍스트더미텍스트더미텍스트더미텍스트더미텍스트더미텍스트더미텍스트더미텍스트더미텍스트더미텍스트더미텍스트더미텍스트더미텍스트더미텍스트더미텍스트더미텍스트더미텍스트더미텍스트더미텍스트더미텍스트더미텍스트더미텍스트더미텍스트더미텍스트더미텍스트더미텍스트더미텍스트더미텍스트더미텍스트더미텍스트더미텍스트더미텍스트더미텍스트더미텍스트더미텍스트더미텍스트더미텍스트더미텍스트더미텍스트더미텍스트더미텍스트더미텍스트더미텍스트더미텍스트더미텍스트더미{" "}
                  </div>
                  <div className="px-[16px] mt-[19px]" onClick={openModal1}>
                    <Button text="확인" onClick={handleSecondConfirm}></Button>
                  </div>
                </Modal>
              </div>
            </div>

            <div className="mt-[153px] mx-[16px] w-[343px] h-[59px] py-[19px] bg-zinc-400 rounded-[10px] justify-center items-center gap-2.5 inline-flex">
              <button
                type="button"
                className="w-[343px] h-[59px] bg-[#4A25A9] rounded-[10px] font-semibold text-[18px] text-white"
                disabled={
                  !isAllChecked || !checkedState.every((checked) => checked)
                }
                style={{
                  backgroundColor:
                    isAllChecked && checkedState.every((checked) => checked)
                      ? "#4A25A9"
                      : "#bababa",
                }}
                onClick={() => {
                  navigate("/nickname");
                }}
              >
                확인
              </button>
            </div>
            {/* <button
              onClick={openModal}
              className=" mt-[153px] w-[343px] px-[155px] py-[19px] bg-[#BABABA] text-[18px] font-[600] rounded-[10px]"
            >
              확인
            </button> */}
          </Modal>
        </div>
      </div>
    </>
  );
}

export default Confirm;
