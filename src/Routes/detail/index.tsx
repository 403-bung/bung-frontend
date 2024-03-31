import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import GoBackBtn from "../../components/GoBackBtn";
import DetailCard from "../../components/DetailCard";
import { useEffect, useState } from "react";

export default function Detail() {
  const navigate = useNavigate();
  const [top, setTop] = useState(0);
  const [repeatCount, setRepeatCount] = useState(0);
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (repeatCount < 3) {
        setTop((prevTop) => (prevTop === 0 ? -12 : 0));
        setRepeatCount((prevCount) => prevCount + 1);
      } else {
        clearInterval(intervalId);
      }
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);
  return (
    <div className="relative">
      <div className="w-[375px] h-[812px] object-cover bg-[#EDE9F6] flex  flex-col    z-[10] overflow-y-scroll ">
        <div className="ml-[9px] py-[18px] ">
          <GoBackBtn
            onClick={() => {
              navigate("/home");
            }}
          />
        </div>
        <div className="  flex overflow-x-scroll">
          <div>
            <div className="mx-[30px]">
              <DetailCard />
            </div>
            <div className="w-[375px] h-[280px] bottom-0  absolute z-[1] bg-white flex flex-col justify-center items-center ">
              <div
                className="mt-[60px] w-[181px] h-[32px] p-[4px] bg-violet-100 rounded-3xl transition-transform duration-500 transform "
                style={{ transform: `translateY(${top}px)` }}
              >
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
        </div>
      </div>

      {/* </div> */}
    </div>
  );
}
