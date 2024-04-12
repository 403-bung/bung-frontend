import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { alarmModalActions } from "../store/alarmModal";
import Title from "./UI/Title";

export default function ActivityModal() {
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
        <div className="bg-white w-[299px] h-[286px] px-[38px] pt-[38px] pb-[28px]  z-20 rounded-[10px] flex flex-col items-center">
          <div className="flex flex-col items-center ">
            <div className="flex flex-col items-center">
              <Title text="후기를 남겨주세요!" />
              <div className="text-[18px] font-[500] text-[#232323] mt-[8px] h-[21px] flex flex-col items-center ">
                <div>고마운 분께 감사의 마음을</div>
                <div>전해보세요!</div>
              </div>
            </div>
          </div>
          <div className="flex flex-col mt-[72px] ">
            <button
              onClick={() => navigate("/review")}
              className="w-[225px] h-[51px] bg-[#4A25A9] rounded-[10px] font-[600] text-[16px] text-white  "
            >
              후기 남기기
            </button>
            <button
              className="w-full text-[16px] font-[400] text-[#595959] mt-[20px] h-[19px]"
              onClick={() => navigate("/home")}
            >
              다음에 할게요
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
