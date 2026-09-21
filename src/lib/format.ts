export function pad2(n: number) {
  return n.toString().padStart(2, "0");
}

export function formatClock(ms: number) {
  const total = Math.max(0, Math.floor(ms / 1000));
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  const frac = Math.floor((ms % 1000) / 10);
  if (h > 0) return `${h}:${pad2(m)}:${pad2(s)}.${pad2(frac)}`;
  return `${pad2(m)}:${pad2(s)}.${pad2(frac)}`;
}

export function formatDuration(sec: number) {
  const s = Math.max(0, Math.round(sec));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const r = s % 60;
  if (h > 0) return `${h}:${pad2(m)}:${pad2(r)}`;
  return `${m}:${pad2(r)}`;
}

export function formatEta(sec: number | null) {
  if (sec == null) return "—";
  if (sec < 60) return `${Math.max(1, Math.round(sec))}s`;
  const m = Math.floor(sec / 60);
  const s = Math.round(sec % 60);
  if (m < 60) return `${m}p ${pad2(s)}s`;
  const h = Math.floor(m / 60);
  return `${h}g ${m % 60}p`;
}

export function formatMs(ms: number) {
  if (ms < 1000) return `${Math.round(ms)}ms`;
  return `${(ms / 1000).toFixed(1)}s`;
}

export function formatStretch(n: number) {
  return `${n.toFixed(2)}×`;
}

export function formatBytesGb(n: number) {
  return `${n.toFixed(1)} GB`;
}

export function episodeLabel(ep: number | null) {
  if (ep == null) return "Lẻ";
  return `Tập ${String(ep).padStart(2, "0")}`;
}

export function parseEpisodeFromName(name: string): {
  seriesHint: string | null;
  episode: number | null;
} {
  const ep =
    name.match(/[Ee][Pp]?[\s._-]*(\d{1,3})/) ??
    name.match(/[Tt]ập[\s._-]*(\d{1,3})/) ??
    name.match(/S\d+E(\d{1,3})/i);
  const episode = ep ? Number(ep[1]) : null;
  const cleaned = name
    .replace(/\.[^.]+$/, "")
    .replace(/[._]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  return { seriesHint: cleaned, episode };
}
