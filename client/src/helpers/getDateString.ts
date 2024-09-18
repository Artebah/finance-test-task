export function getDateString(timestampStr: string) {
  const now = new Date(timestampStr);

  // Pad single digit hours, minutes, and seconds with a leading zero
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  return `${hours}:${minutes}:${seconds}`;
}
