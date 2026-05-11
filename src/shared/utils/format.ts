import dayjs from "dayjs";
import "dayjs/locale/ko";
import relativeTime from "dayjs/plugin/relativeTime";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
dayjs.extend(relativeTime);
dayjs.locale("ko");

// 1분 전, 1시간 전 ....
export function formatRelativeTime(date: string | Date) {
  return dayjs.utc(date).local().fromNow();
}

// 1234 -> 1,234
export function formatNumber(value: number) {
  return value.toLocaleString("ko-KR");
}
