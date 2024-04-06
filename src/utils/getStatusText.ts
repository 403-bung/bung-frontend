enum Status {
  READY = "READY",
  IN_COLLECT = "IN_COLLECT",
  IN_PLAY = "IN_PLAY",
  COMPLETE_PLAY = "COMPLETE_PLAY",
  COMPLETE_COLLECT = "COMPLETE_COLLECT",
}

export default function getStatusText(status: string) {
  switch (status) {
    case Status.READY:
      return "모집 전";
    case Status.IN_COLLECT:
      return "모집 중";
    case Status.IN_PLAY:
      return "진행 중";
    case Status.COMPLETE_PLAY:
      return "진행 완료";
    case Status.COMPLETE_COLLECT:
      return "모집 완료";
    default:
      return "알 수 없음";
  }
}
