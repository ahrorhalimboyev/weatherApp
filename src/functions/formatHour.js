function formatHour(timestamp) {
  const date = new Date(timestamp * 1000);
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const time = {
    hours: hours,
    minutes: minutes,
  };
  return time;
}

export default formatHour;
