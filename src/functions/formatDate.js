function formatDate(timestamp) {
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString("en", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

export default formatDate;
