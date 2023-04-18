export function secondsToTime(seconds: number): string {
  const zeroLeft = (n: number): string =>
    Math.floor(n).toString().padStart(2, '0');

  const min: string = zeroLeft((seconds / 60) % 60);
  const sec: string = zeroLeft((seconds % 60) % 60);
  return `${min}:${sec}`;
}
