import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import GoBackBtn from "../../components/GoBackBtn";
import DetailCard from "../../components/DetailCard";

export default function Detail() {
  const navigate = useNavigate();
  return (
    <>
      <div className="w-[375px] min-h-screen bg-[#EDE9F6] flex  flex-col absolute top-0 z-[10]">
        <div className="ml-[9px] py-[18px] ">
          <GoBackBtn
            onClick={() => {
              navigate("/home");
            }}
          />
        </div>
        <DetailCard />
        <div className="w-[375px] h-[284px] top-[-45px] relative z-[1] bg-white flex flex-col justify-center items-center ">
          <div className="mt-[60px] w-[181px] h-[32px] p-[4px] bg-violet-100 rounded-3xl ">
            <div className="h-[24px] flex justify-start items-center ">
              <div className="bg-indigo-900 px-[7px] pb-[2px] flex rounded-[18px] justify-center items-start">
                <div className="text-violet-100  font-['Pretendard'] text-[16px]">
                  mm:ss
                </div>
              </div>
              <div className="text-[12px] ml-[8px]">
                <span className="text-violet-900 font-semibold">얼마</span>
                <span className="text-stone-900 ">남지 않았어요!</span>
              </div>
            </div>
          </div>
          <div className="mt-[10px]">
            <Button text="알림받기 " />
          </div>
        </div>
      </div>

      {/* </div> */}
    </>
  );
}
