import { useEffect, useRef } from "react";
import type { Cue } from "@/lib/types";

export function Waveform({
  cues,
  durationMs,
  playheadMs,
  onSeek,
}: {
  cues: Cue[];
  durationMs: number;
  playheadMs: number;
  onSeek: (ms: number) => void;
}) {
  const ref = useRef<HTMLCanvasElement>(null);
  const wrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const parent = wrap.current;
    if (!canvas || !parent) return;

    const dpr = window.devicePixelRatio || 1;
    const w = parent.clientWidth;
    const h = parent.clientHeight;
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.scale(dpr, dpr);

    const styles = getComputedStyle(parent);
    const fg = styles.getPropertyValue("--foreground").trim() || "#ecece6";
    const muted = styles.getPropertyValue("--muted-foreground").trim() || "#8c8c86";
    const orig = styles.getPropertyValue("--track-orig").trim() || "#7a8a9a";
    const dub = styles.getPropertyValue("--track-dub").trim() || "#c4b8a0";
    const danger = styles.getPropertyValue("--flag-danger").trim() || "#c45c4a";
    const bg = styles.getPropertyValue("--card").trim() || "#121215";

    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, w, h);

    const seed = 7;
    function bar(i: number, track: number) {
      const n = Math.sin(i * 0.37 + seed + track) * 0.5 + Math.sin(i * 0.11 + track) * 0.5;
      return 0.15 + Math.abs(n) * 0.85;
    }

    const bars = Math.max(80, Math.floor(w / 3));
    const gap = w / bars;
    const mid1 = h * 0.32;
    const mid2 = h * 0.74;
    const amp = h * 0.22;

    ctx.strokeStyle = "color-mix(in oklab, " + muted + " 25%, transparent)";
    ctx.beginPath();
    ctx.moveTo(0, h / 2);
    ctx.lineTo(w, h / 2);
    ctx.stroke();

    for (let i = 0; i < bars; i++) {
      const x = i * gap + 0.5;
      const a1 = bar(i, 0) * amp;
      ctx.fillStyle = orig;
      ctx.globalAlpha = 0.7;
      ctx.fillRect(x, mid1 - a1, Math.max(1, gap - 1), a1 * 2);
      const a2 = bar(i + 9, 1) * amp * 0.9;
      ctx.fillStyle = dub;
      ctx.fillRect(x, mid2 - a2, Math.max(1, gap - 1), a2 * 2);
    }
    ctx.globalAlpha = 1;

    const span = Math.max(1, durationMs);
    for (const cue of cues) {
      const x = (cue.startMs / span) * w;
      const cw = Math.max(2, ((cue.endMs - cue.startMs) / span) * w);
      const overflow = cue.stretch > 1.15;
      ctx.fillStyle = overflow ? danger : dub;
      ctx.globalAlpha = overflow ? 0.35 : 0.18;
      ctx.fillRect(x, h * 0.52, cw * (overflow ? cue.stretch / 1.15 : 1), h * 0.44);
      ctx.globalAlpha = 0.9;
      ctx.fillRect(x, h * 0.52, 1.5, h * 0.44);
    }
    ctx.globalAlpha = 1;

    const px = (playheadMs / span) * w;
    ctx.fillStyle = fg;
    ctx.fillRect(px, 0, 1.25, h);
  }, [cues, durationMs, playheadMs]);

  return (
    <div
      ref={wrap}
      className="h-28 w-full cursor-crosshair bg-card"
      onClick={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        onSeek(((e.clientX - r.left) / r.width) * durationMs);
      }}
    >
      <canvas ref={ref} className="block size-full" />
    </div>
  );
}
