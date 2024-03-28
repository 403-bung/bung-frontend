import { useNavigate } from "react-router-dom";
import left_arrow from "../../icons/left_arrow.svg";
import Button from "../../components/Button";

export default function Detail() {
  const navigate = useNavigate();
  return (
    <>
      <div className="w-[375px] min-h-screen bg-[#EDE9F6] flex  flex-col absolute top-0 z-[10]">
        <div className="ml-[9px] py-[18px]">
          <img
            src={left_arrow}
            alt="이전으로"
            onClick={() => {
              navigate("/home");
            }}
          />
        </div>
        <div className="bg-white z-[10] mt-[14px] mx-auto w-[315px] h-[499px] pt-[24px] pb-[28px] px-[24px] rounded-[10px] border border-slate-200 ">
          {/* 모집전, 수정하기 */}
          <div className="w-[100%] h-[17px] justify-between items-start flex">
            <div className="text-violet-900  text-[14px] font-['Pretendard]">
              모집전
            </div>
            <div className="text-right text-zinc-400 text-[14px] font-normal font-['Pretendard']">
              수정하기
            </div>
          </div>
          {/* 타이틀 */}
          <div className=" text-stone-900 h-[48px] leading-tight  text-[20px] font-bold font-['Pretendard'] mt-[8px] ">
            타이틀 입니다텍스트더미텍스트더
            <br />
            미텍스트더미
          </div>
          {/* 텍스트 */}
          <div className="w-[267px] h-[171px]  text-neutral-800 text-[16px] font-['Pretendard'] mt-[16px] leading-tight">
            설명글입니다.텍스트더미텍스트더미텍스트더미텍스트더미텍스트더미텍스트더미텍스트더미텍스트텍스트더미텍스트더미텍스트더미텍스트더미텍스트더미텍스트더미텍스트더미텍스트텍스트더미텍스트더미텍스트더미텍스트더미텍스트더미텍스트더미텍스트더미텍스트텍스트더미텍스트더미텍스트더미텍스트더미텍스트더미텍스트더미텍스트더미텍스트
          </div>
          {/* <div className="mt-[45px] flex-col  w-[133px]"> */}
          <div className="flex gap-[20px] mt-[45px] h-[17px] ">
            <div className="flex  text-neutral-500 text-[14px] ">
              모집 인원수
            </div>
            <div className=" text-violet-900 text-[14px] font-normal font-['Pretendard'] flex justify-center">
              1명
            </div>
          </div>
          <div className="flex gap-[20px]  h-[17px] mt-[8px]">
            <div className="flex  text-neutral-500 text-[14px] ">
              신청 인원수
            </div>
            <div className=" text-[#1F1F1F] text-[14px] font-normal font-['Pretendard'] flex justify-center">
              50명
            </div>
          </div>
          <div className="flex gap-[30px] mt-[8px] h-[17px]">
            <div className="flex  text-neutral-500 text-[14px]  ">
              벙개 시작
            </div>
            <div className=" text-[#1F1F1F] text-[14px] font-normal font-['Pretendard'] flex justify-center">
              mm:ss
            </div>
          </div>
          <div className="flex gap-[32px] mt-[8px] h-[17px]">
            <div className="flex  text-neutral-500 text-[14px] ">카테고리</div>
            <div className=" text-[#1F1F1F] text-[14px] font-normal font-['Pretendard'] flex justify-center">
              카테고리
            </div>
          </div>
          <div className="flex gap-[44px] mt-[8px] h-[17px]">
            <div className="flex  text-neutral-500 text-[14px]  ">작성자</div>
            <div className=" text-[#1F1F1F] text-[14px] font-normal font-['Pretendard'] flex justify-center">
              김첨지의 럭키데이
            </div>
          </div>
          <div className="flex gap-[33px] mt-[8px] h-[17px] z-[10]">
            <div className="flex  text-neutral-500 text-[14px]  z-[10] ">
              참여링크
            </div>
            <div className=" text-[#1F1F1F] text-[14px] font-normal font-['Pretendard'] flex justify-center  z-[10]">
              비공개
            </div>
          </div>
        </div>
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
            <Button text="알림받기 "></Button>
          </div>
        </div>
      </div>

      {/* </div> */}
    </>
  );
}
