function formatWeekday(timestamp) {
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString("en", {
    day: "numeric",
    weekday: "long",
    month: "short",
  });
}

export default formatWeekday;
