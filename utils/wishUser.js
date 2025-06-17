import dayjs from "dayjs";

export function wishUser(name) {
  const hour = dayjs().hour(); // gets current hour in 24h format

  if (hour >= 5 && hour < 12) {
    return `Good Morning, ${name.split(" ")[0]}`;
  } else if (hour >= 12 && hour < 17) {
    return `Good Afternoon, ${name.split(" ")[0]}`;
  } else if (hour >= 17 && hour < 21) {
    return `Good Evening, ${name.split(" ")[0]}`;
  } else {
    return `Good Nigth, ${name.split(" ")[0]}`;
  }
}
