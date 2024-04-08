import { useNavigate } from "react-router-dom";
import GoBackBtn from "../components/GoBackBtn";
import Button from "../components/Button";
import WriteModal from "../components/WriteModal";
import TimeModal from "../components/TimeModal";
import { Cookies } from "react-cookie";
import { useEffect, useState } from "react";
import axios from "axios";
import { SERVER_URL } from "../data/url";

export default function Write() {
  const navigate = useNavigate();
  const cookies = new Cookies();
  const token = cookies.get("id");
  const userNo = cookies.get("userNo");
  const [selected, setSelected] = useState("카테고리");
  const handleSelect = (e: any) => {
    setSelected(e.target.value);
  };
  const [userCount, setUserCount] = useState("인원수");
  const handleUserCount = (e: any) => {
    setUserCount(e.target.value);
  };
  const [name, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [link, setLink] = useState<string>("");
  const [showLink, setShowLink] = useState(false);
  const [endTimeString, setEndTimeString] = useState<string | undefined>(
    undefined
  );
  const [endTime, setEndTime] = useState<string | undefined>();
  const [time, setTime] = useState<Date>();
  useEffect(() => {
    if (endTimeString) {
      const dateObject: Date = new Date(endTimeString);
      const endHours = dateObject.getHours();
      const endMinutes = dateObject.getMinutes();
      const endPeriod = endHours < 12 ? "오전" : "오후";
      const endDisplayTime = endHours > 12 ? endHours - 12 : endHours;
      const TimeString = `${endPeriod} ${endDisplayTime}시 ${endMinutes}분`;
      setEndTime(TimeString);
    } else {
      console.log("날짜가 유효하지 않습니다.");
    }
  }, [endTimeString]);
  useEffect(() => {
    if (endTimeString) {
      const dateObject: Date = new Date(endTimeString);
      setTime(dateObject);
    } else {
      console.log("날짜가 유효하지 않습니다.");
    }
  }, [endTimeString]);
  console.log(endTime);
  console.log(typeof endTimeString);
  console.log(typeof time);
  const recruitingStartTime = time;
  const recruitingEndTime = time;
  const partyStartTime = time;
  const handleShowLink = () => {
    setShowLink(!showLink);
  };
  const handleWrite = async () => {
    try {
      const response = await axios.post(
        `${SERVER_URL}/articles`,
        {
          userNo: userNo,
          name: name,
          category: selected,
          content: content,
          maxUserCount: userCount,
          recruitingStartTime,
          recruitingEndTime,
          partyStartTime,
          link: link,
          showLink,
          draft: showLink,
        },

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("글 작성 성공:", response);
      // navigate("/home");
    } catch (error) {
      console.error("글 작성 실패:", error);
    }
  };
  // console.log(selected);
  // console.log(name);
  // console.log(content);
  // console.log(userCount);
  // console.log(typeof endTimeString);
  // console.log(link);
  return (
    <>
      <WriteModal setEndTimeString={setEndTimeString} />
      <div className="w-[375px] min-h-screen bg-white flex flex-col items-center overflow-y-scroll scrollbar-hide">
        {/* 뒤로가기 */}
        <div className="w-[375px] h-[60px] flex items-center  pl-[9px] pr-[16px] border-b-violet-100 border-b-[1px] bg-white fixed top-0">
          <GoBackBtn
            onClick={() => {
              navigate("/home");
            }}
          />
          <div className="text-[16px] font-[600] ml-[118px]">모임 만들기</div>
          <div className="text-[16px] font-[600] ml-[79px]">임시저장</div>
        </div>
        <div className="mt-[80px] w-[343px] flex flex-col gap-[32px] h-screen ">
          {/* 모집시간, 모임시작 , 수정하기*/}
          <div className="flex gap-[32px] flex-col">
            <div className="flex justify-between ">
              <div className="text-[16px] font-[400] ">모집 시작</div>
              <div className="text-[16px] font-[600] ">~ {endTime}</div>
            </div>
            <div className="flex justify-between ">
              <div className="text-[16px] font-[400] ">모임 시작</div>
              <div className="text-[16px] font-[600] ">{endTime}~</div>
            </div>
            <div className="flex justify-between">
              <TimeModal />
              {/* 수정하기 */}
            </div>
          </div>
          {/* 카테고리 */}
          <select
            onChange={handleSelect}
            value={selected}
            className="w-full py-[17px] border border-neutral-400  rounded-[10px]  px-[16px] text-zinc-400 text-[16px] font-[600]"
          >
            <option value="카테고리">카테고리</option>
            <option value="공동구매">공동구매</option>
            <option value="게임">게임</option>
            <option value="이벤트">이벤트</option>
            <option value="스터디">스터디</option>
            <option value="자유">자유</option>
            <option value="해주세요">해주세요</option>
            <option value="아이돌">아이돌</option>
          </select>
          {/* 제목 */}
          <div>
            <div className="text-[16px] font-[600]">제목</div>
            <input
              onChange={(e) => setTitle(e.target.value)}
              // value={name}
              placeholder="제목을 입력해주세요"
              className="mt-[8px] px-[16px] py-[17px] rounded-[10px] border border-zinc-600 text-[16px] font-[500] h-[53px] w-[343px]"
            />
          </div>
          {/* 본문 */}
          <div>
            <div className="text-[16px] font-[600]">본문</div>
            <textarea
              onChange={(e) => setContent(e.target.value)}
              placeholder="내용을 입력해주세요&#10;(예상 시간, 참여 목적 등 구체적으로 적을 수록 &#10;모임 성공 확률이 높아져요)"
              className="mt-[8px] px-[16px] py-[17px] rounded-[10px] border border-zinc-600 text-[16px] font-[500] h-[200px] w-[343px] leading-tight"
            />
          </div>
          {/* 모집인원 */}
          <div className="flex items-center gap-[33px]">
            <div className="text-[16px] font-[600]">모집인원</div>
            <div>
              <select
                onChange={handleUserCount}
                value={userCount}
                className="w-[254px] py-[17px] border border-neutral-400  rounded-[10px]  px-[16px] text-zinc-400 text-[16px] font-[600] "
              >
                <option>모집 인원을 입력해주세요</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                <option>6</option>
                <option>7</option>
                <option>8</option>
                <option>9</option>
                <option>10</option>
              </select>
            </div>
          </div>
          {/* 링크 */}
          <div>
            <div className="text-[16px] font-[600]">링크</div>
            <input
              onChange={(e) => setLink(e.target.value)}
              placeholder="공유 파일 등 링크를 입력해주세요"
              className="mt-[8px] px-[16px] py-[17px] rounded-[10px] border border-zinc-600 text-[16px] font-[500] h-[53px] w-[343px]"
            />
            <div className="flex mt-[8.5px]">
              <input
                type="checkbox"
                checked={showLink}
                onChange={handleShowLink}
              />
              <div className="text-[14px] font-[400] ml-[8px]">
                모임 시작 전 비공개
              </div>
            </div>
          </div>
          {/* 버튼 */}
          <div onClick={handleWrite}>
            <Button
              text="작성하기"
              // onClick={() => {
              //   navigate("/home");
              // }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
