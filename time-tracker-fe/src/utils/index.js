import moment from "moment";
import { RANGES } from "../constants";

function startOf(period) {
  return moment()
    .startOf(period)
    .unix();
}

function rangeToStartDate(range) {
  switch (range) {
    case RANGES.THIS_WEEK:
      return startOf("week");
    case RANGES.THIS_MONTH:
      return startOf("month");
    case RANGES.TODAY:
    default:
      return startOf("day");
  }
}

function formatDuration(secs) {
  const secNum = parseInt(secs, 10);
  const hours = Math.floor(secNum / 3600);
  const minutes = Math.floor(secNum / 60) % 60;
  const seconds = secNum % 60;
  return twoDigs(hours) + ":" + twoDigs(minutes) + ":" + twoDigs(seconds);
}

function twoDigs(num) {
  return num < 10 && num > -10 ? "0" + num : num;
}

function formatTime(timestamp) {
  return moment.unix(timestamp).format("HH:mm:ss");
}

function formatDate(timestamp) {
  return moment.unix(timestamp).calendar(null, {
    sameDay: "[Today]",
    lastDay: "[Yesterday]",
    lastWeek: "ll",
    sameElse: "ll"
  });
}

export { rangeToStartDate, formatDuration, formatDate, formatTime };
