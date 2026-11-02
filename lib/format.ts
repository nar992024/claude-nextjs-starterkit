const wonFormatter = new Intl.NumberFormat("ko-KR");

// 서버와 브라우저의 시간대가 달라도 같은 값을 표시하도록 시간대를 고정한다.
const dateTimeFormatter = new Intl.DateTimeFormat("ko-KR", {
  dateStyle: "medium",
  timeStyle: "medium",
  timeZone: "Asia/Seoul",
});

export function formatWon(amount: number) {
  return `${wonFormatter.format(amount)}원`;
}

export function formatDateTime(date: Date) {
  return dateTimeFormatter.format(date);
}
