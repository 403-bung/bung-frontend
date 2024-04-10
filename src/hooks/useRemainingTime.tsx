import { useState, useEffect } from "react";
import getRemainingTime from "../utils/getRemainingTime";

const useRemainingTime = (startTime: string) => {
  const [remainingTime, setRemainingTime] = useState<string>("00:00");

  useEffect(() => {
    const intervalId = setInterval(() => {
      const newRemainingTime = getRemainingTime(startTime);
      setRemainingTime(newRemainingTime);
    }, 1000);

    return () => clearInterval(intervalId); // 컴포넌트가 unmount 될 때 interval 정리
  }, [startTime]); // startTime이 변경될 때마다 useEffect 재실행

  return remainingTime;
};

export default useRemainingTime;
