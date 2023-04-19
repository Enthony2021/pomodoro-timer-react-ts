import zeroLeft from './zero-left';

export function secondsToTimes(seconds: number): string {
  const hours = zeroLeft(seconds / 3600);
  const min: string = zeroLeft((seconds / 60) % 60);
  const sec: string = zeroLeft((seconds % 60) % 60);
  return `${hours}:${min}:${sec}`;
}
