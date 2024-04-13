export default function getFormatTime(time: string) {
  const startDateTime = new Date(time);
  const startHours = startDateTime.getHours();
  const startMinutes = startDateTime.getMinutes();

  const { timePeriod, hour } = getDayNight(startHours);

  return `${timePeriod} ${hour}시 ${startMinutes}분`;
}
function getDayNight(hour: number) {
  let timePeriod = "오전";
  if (hour >= 12) {
    timePeriod = "오후";
    hour -= 12;
  }
  if (hour === 0) {
    hour = 12;
  }

  return { timePeriod, hour };
}

export function getPaddingTime(time: number) {
  return time.toString().padStart(2, "0");
}

export function getFullTime(time: string) {
  const dateTime = new Date(time);
  return `${dateTime.getFullYear()}년 ${
    dateTime.getMonth() + 1
  }월 ${dateTime.getDate()}일 ${getFormatTime(time)} `;
}
