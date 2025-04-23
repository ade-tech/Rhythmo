export function getTimeDifference(dateString: string): number {
  const date = new Date(dateString).getTime();
  const today = Date.now();
  const dateDiffrence = today - date;

  const seconds = Math.floor(dateDiffrence / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const year = Math.floor(days / 365);

  return year;
}
