import { useNavigate, useParams } from "react-router-dom";
import GoBackBtn from "../components/GoBackBtn";
import Button from "../components/Button";
import axios from "axios";
import { SERVER_URL } from "../data/url";
import { Cookies } from "react-cookie";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import TimeModal from "../components/TimeModal";
// import convertStringnToDate from "../utils/covertStringToDate";

type Article = {
  articleNo: number;
  name: string;
  category: string;
  content: string;
  maxUserCount: number;
  // recruitingStartTime: Date; // 모집 시작 시간
  recruitingEndTime: Date;
  partyStartTime: Date;
  link: string;
  showLink: boolean;
};

export default function EditWritePage() {
  const navigate = useNavigate();
  const params = useParams();
  const { data: article } = useQuery<Article>({
    queryKey: ["article", params.articleNo],
  });
  //카테고리
  const [category, setCategory] = useState<string>();
  useEffect(() => {
    if (article) {
      setCategory(article.category);
    }
  }, [article]);
  const handleCategory = (e: any) => {
    setCategory(e.target.value);
  };
  //이름
  const [name, setName] = useState<string>();
  useEffect(() => {
    if (article) {
      setName(article.name);
    }
  }, [article]);
  //내용
  const [content, setContent] = useState<string>();
  useEffect(() => {
    if (article) {
      setContent(article.content);
    }
  }, [article]);
  //인원수
  const [maxUserCount, setMaxUserCount] = useState<number>();
  useEffect(() => {
    if (article) {
      setMaxUserCount(article.maxUserCount);
    }
  }, [article]);
  const handleMaxUserCount = (e: any) => {
    setMaxUserCount(parseInt(e.target.value));
  };
  //링크
  const [link, setLink] = useState<string>();
  useEffect(() => {
    if (article) {
      setLink(article.link);
    }
  }, [article]);
  //링크 표시 여부
  const [showLink, setShowLink] = useState<boolean>();
  useEffect(() => {
    if (article) {
      setShowLink(article.showLink);
    }
  }, [article]);
  const handleShowLink = () => {
    setShowLink(!showLink);
  };
  console.log(article);
  console.log(typeof maxUserCount);
  //시간
  //기존 설정 시간 표시
  const [dateString, setDateString] = useState<Date>();
  useEffect(() => {
    if (article) {
      setDateString(article.partyStartTime);
    }
  }, [article]);
  // const dateString = article?.partyStartTime;
  const [endtimeModalString, setEndTimeModalString] = useState<
    string | undefined
  >(undefined);
  const [endTime, setEndTime] = useState<string | undefined>("00시 00분");
  const [time, setTime] = useState<Date>();
  useEffect(() => {
    if (endtimeModalString) {
      const dateObject: Date = new Date(endtimeModalString);
      const endHours = dateObject.getHours();
      const endMinutes = dateObject.getMinutes();
      const endPeriod = endHours < 12 ? "오전" : "오후";
      const endDisplayTime = endHours > 12 ? endHours - 12 : endHours;
      const TimeString = `${endPeriod} ${endDisplayTime}시 ${endMinutes}분`;
      setEndTime(TimeString);
      // setTime(dateObject);
    }
  }, [endtimeModalString]);
  useEffect(() => {
    if (dateString) {
      const dateObject: Date = new Date(dateString);
      const endHours = dateObject.getHours();
      const endMinutes = dateObject.getMinutes();
      const endPeriod = endHours < 12 ? "오전" : "오후";
      const endDisplayTime = endHours > 12 ? endHours - 12 : endHours;
      const TimeString = `${endPeriod} ${endDisplayTime}시 ${endMinutes}분`;
      setEndTime(TimeString);
      setTime(dateObject);
    }
  }, [dateString]);
  function convertStringToDate(endTime: any) {
    const regex = /(\d{1,2})시 (\d{1,2})분/;
    const match = endTime.match(regex);
    if (!match) {
      return new Date();
    }
    let hours = parseInt(match[1]);
    const minutes = parseInt(match[2]);
    let isPM = false;
    if (endTime?.includes("오후")) {
      isPM = true;
    }
    if (isPM && hours !== 12) {
      hours += 12;
    } else if (!isPM && hours === 12) {
      hours = 0;
    }
    const date = new Date();
    date.setHours(hours);
    date.setMinutes(minutes);
    date.setSeconds(0);
    const koreaTimeOffset = 9 * 60;
    const koreaTime = new Date(date.getTime() + koreaTimeOffset * 60000);
    return koreaTime;
  }
  const finalTime = convertStringToDate(endTime);
  const recruitingEndTime = finalTime;
  const partyStartTime = finalTime;
  console.log(finalTime);
  //PUT API
  const articleNo = article?.articleNo;
  const cookies = new Cookies();
  const token = cookies.get("id");
  const EditArticle = async () => {
    const response = await axios.put(
      `${SERVER_URL}/articles/${articleNo}`,
      {
        name,
        category,
        content,
        maxUserCount,
        recruitingEndTime,
        partyStartTime,
        link,
        showLink,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    // .then((response) => {});
    console.log(
      category,
      content,
      maxUserCount,
      recruitingEndTime,
      partyStartTime,
      link,
      showLink
    );
    navigate(-1);
    console.log(response.config.data);
    console.log(response);
  };
  return (
    <>
      <div className="w-[375px] min-h-screen bg-white flex flex-col items-center overflow-y-scroll scrollbar-hide">
        {/* 뒤로가기 */}
        <div className="w-[375px] h-[60px] flex items-center  pl-[9px] pr-[16px] border-b-violet-100 border-b-[1px] bg-white fixed top-0">
          <GoBackBtn
            onClick={() => {
              navigate("/home");
            }}
          />
          <div className="text-[16px] font-[600] ml-[118px]">모임 만들기</div>
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
              <TimeModal
                writeTime={time}
                setTimeString={setEndTimeModalString}
              />
              {/* 수정하기 */}
            </div>
          </div>
          {/* 카테고리 */}
          <select
            onChange={handleCategory}
            value={category}
            defaultValue={category}
            className="w-full py-[17px] border border-neutral-400  rounded-[10px]  px-[16px] text-zinc-400 text-[16px] font-[600]"
          >
            <option value="카테고리">카테고리</option>
            <option value="GROUP_BUYING">공동구매</option>
            <option value="GAME">게임</option>
            <option value="EVENT">이벤트</option>
            <option value="STUDY">스터디</option>
            <option value="FREE">자유</option>
            <option value="PLEASE">해주세요</option>
            <option value="IDOL">아이돌</option>
          </select>
          {/* 제목 */}
          <div>
            <div className="text-[16px] font-[600]">제목</div>
            <input
              onChange={(e) => setName(e.target.value)}
              // value={name}
              defaultValue={name}
              placeholder="제목을 입력해주세요"
              className="mt-[8px] px-[16px] py-[17px] rounded-[10px] border border-zinc-600 text-[16px] font-[500] h-[53px] w-[343px]"
            />
          </div>
          {/* 본문 */}
          <div>
            <div className="text-[16px] font-[600]">본문</div>
            <textarea
              onChange={(e) => setContent(e.target.value)}
              defaultValue={content}
              placeholder="내용을 입력해주세요&#10;(예상 시간, 참여 목적 등 구체적으로 적을 수록 &#10;모임 성공 확률이 높아져요)"
              className="mt-[8px] px-[16px] py-[17px] rounded-[10px] border border-zinc-600 text-[16px] font-[500] h-[200px] w-[343px] leading-tight"
            />
          </div>
          {/* 모집인원 */}
          <div className="flex items-center gap-[33px]">
            <div className="text-[16px] font-[600]">모집인원</div>
            <div>
              <select
                onChange={handleMaxUserCount}
                value={maxUserCount}
                defaultValue={maxUserCount}
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
              defaultValue={link}
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
          <div onClick={EditArticle}>
            <Button
              text="수정완료"
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
