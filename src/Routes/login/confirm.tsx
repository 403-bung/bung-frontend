import { GrPrevious } from "react-icons/gr";
import logo from "../../img/logo.png";

function Confirm() {
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
        <button className="mt-[498px] w-[343px] h-[59px] bg-[#BABABA] text-[18px] font-[600] rounded-[10px]">
          {" "}
          다음
        </button>
      </div>
    </>
  );
}

export default Confirm;
