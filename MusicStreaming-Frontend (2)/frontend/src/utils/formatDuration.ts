// Formats raw seconds as mm:ss, e.g. 215 -> "3:35"
export function formatDuration(totalSeconds: number): string {
  if (!totalSeconds || totalSeconds <= 0) return '--:--';
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = Math.floor(totalSeconds % 60);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}
