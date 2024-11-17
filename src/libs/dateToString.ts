import dayjs from "dayjs";

export default function dateToString(datetime: string): string {
  const date = dayjs(datetime);
  return date.format("YYYY-MM-DD");
}
