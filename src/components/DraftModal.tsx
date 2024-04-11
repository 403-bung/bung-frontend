import { useDispatch } from "react-redux";
import Title from "./Title";
import { alarmModalActions } from "../store/alarmModal";
import { useNavigate } from "react-router-dom";

export default function DraftModal() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleCloseModal = () => {
    dispatch(alarmModalActions.closeModal());
  };

  return (
    <>
      <div className="w-[375px] h-full fixed flex justify-center items-center">
        <div
          className=" bg-[#595959] opacity-90 w-[375px] fixed h-full z-10 overflow-y-hidden"
          onClick={handleCloseModal}
        ></div>
        <div className="bg-white w-[301px] h-[288px] px-[38px] pt-[38px] pb-[28px]  z-20 rounded-[10px] flex flex-col items-center">
          <div className="flex flex-col items-center ">
            <div className="flex flex-col items-center">
              <Title text="작성중인 글이 있어요" />
              <div className="text-[18px] font-[500] text-[#232323] mt-[8px] h-[21px]">
                글을 이어서 쓸까요?
              </div>
            </div>
          </div>
          <div className="flex flex-col mt-[72px] ">
            <button
              onClick={() => navigate("/draft")}
              className="w-[225px] h-[51px] bg-[#4A25A9] rounded-[10px] font-[600] text-[16px] text-white  "
            >
              이어서 쓰기
            </button>
            <button
              className="w-full text-[16px] font-[400] text-[#595959] mt-[20px] h-[19px]"
              onClick={() => navigate("/write")}
            >
              새로 쓰기
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
