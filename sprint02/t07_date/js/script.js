function addZeroToDate(data) {
  if (String(data).length == 1) {
    return `0${data}`;
  } else {
    return data;
  }
}

function getFormattedDate(date) {
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let weekday = date.toLocaleString("en-US", { weekday: "long" });
  let str = `${addZeroToDate(day)}.${addZeroToDate(month)}.${year} ${addZeroToDate(
    hours
  )}:${addZeroToDate(minutes)} ${weekday}`;
  return str;
}
