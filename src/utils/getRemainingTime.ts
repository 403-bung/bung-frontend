import { getPaddingTime } from "./getFormatTime";

export default function getRemainingTime(endTime: string) {
  const now = new Date();
  const endDateTime = new Date(endTime);

  const timeDiff = Math.max(endDateTime.getTime() - now.getTime(), 0);

  const remainingMinutes = Math.floor(
    (timeDiff % (1000 * 60 * 60)) / (1000 * 60)
  );
  const remainingSeconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
  const remainingTime = `${getPaddingTime(remainingMinutes)}:${getPaddingTime(
    remainingSeconds
  )}`;

  return remainingTime;
}
