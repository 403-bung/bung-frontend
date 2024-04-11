import { getPaddingTime } from "./getFormatTime";

export default function getRemainingTime(endTime: string) {
  const now = new Date();
  const endDateTime = new Date(endTime);

  const timeDiff = Math.max(endDateTime.getTime() - now.getTime(), 0);

  const remainingHours = Math.floor(timeDiff / (1000 * 60 * 60)); // 남은 시간을 시간 단위로 계산
  const remainingMinutes = Math.floor(
    (timeDiff % (1000 * 60 * 60)) / (1000 * 60)
  );
  const remainingSeconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

  let remainingTime = "";

  if (remainingHours > 0) {
    // 시간, 분, 초 형식으로 표시
    remainingTime = `${getPaddingTime(remainingHours)}:${getPaddingTime(
      remainingMinutes
    )}:${getPaddingTime(remainingSeconds)}`;
  } else {
    // 분, 초 형식으로만 표시
    remainingTime = `${getPaddingTime(remainingMinutes)}:${getPaddingTime(
      remainingSeconds
    )}`;
  }

  return remainingTime;
}
