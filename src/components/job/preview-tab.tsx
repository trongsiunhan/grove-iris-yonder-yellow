import { Pause, Play, Subtitles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { formatClock, formatDuration } from "@/lib/format";
import { characterName, useAppStore } from "@/lib/store";
import type { Job } from "@/lib/types";
import { cn } from "@/lib/utils";

export function PreviewTab({ job }: { job: Job }) {
  const cuesAll = useAppStore((s) => s.cues);
  const cues = cuesAll.filter((c) => c.jobId === job.id);
  const selectedId = useAppStore((s) => s.selectedCueId);
  const selectCue = useAppStore((s) => s.selectCue);
  const playing = useAppStore((s) => s.playing);
  const setPlaying = useAppStore((s) => s.setPlaying);
  const playhead = useAppStore((s) => s.playheadMs);
  const setPlayhead = useAppStore((s) => s.setPlayhead);
  const track = useAppStore((s) => s.previewTrack);
  const setTrack = useAppStore((s) => s.setPreviewTrack);
  const settings = useAppStore((s) => s.settings);
  const patch = useAppStore((s) => s.patchSettings);
  const cue = cues.find((c) => playhead >= c.startMs && playhead < c.endMs) ?? cues.find((c) => c.id === selectedId);

  return (
    <div className="grid h-full min-h-0 grid-cols-1 lg:grid-cols-[minmax(0,1.4fr)_minmax(260px,0.7fr)]">
      <div className="flex min-h-0 flex-col">
        <div className="relative min-h-0 flex-1 overflow-hidden bg-secondary">
          <img src={job.still} alt="" className="size-full object-cover" />
          {settings.subtitlesEnabled && cue && (
            <div className="absolute inset-x-0 bottom-10 px-6 text-center">
              <span
                className="inline-block rounded-sm px-2 py-1 text-sm"
                style={{
                  color: settings.subColor,
                  textShadow: settings.subShadow ? `0 0 ${settings.subOutlineWidth}px ${settings.subOutline}` : undefined,
                }}
              >
                {cue.translation}
              </span>
            </div>
          )}
        </div>
        <div className="space-y-3 border-t border-border p-3">
          <Slider
            value={[playhead]}
            max={job.durationSec * 1000}
            onValueChange={([v]) => setPlayhead(v ?? 0)}
          />
          <div className="flex flex-wrap items-center gap-2">
            <Button size="sm" onClick={() => setPlaying(!playing)}>
              {playing ? <Pause className="size-3.5" /> : <Play className="size-3.5" />}
              {playing ? "Dừng" : "Phát"}
            </Button>
            <span className="font-mono text-xs tabular text-muted-foreground">
              {formatClock(playhead)} / {formatDuration(job.durationSec)}
            </span>
            <div className="ml-auto flex rounded-md bg-secondary p-0.5">
              {(["original", "dub", "mix"] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTrack(t)}
                  className={cn(
                    "rounded-sm px-2.5 py-1 text-xs",
                    track === t ? "bg-card text-foreground" : "text-muted-foreground",
                  )}
                >
                  {t === "original" ? "Gốc" : t === "dub" ? "Lồng" : "Trộn"}
                </button>
              ))}
            </div>
            <label className="flex items-center gap-2 text-xs">
              <Subtitles className="size-3.5" />
              <Switch
                checked={settings.subtitlesEnabled}
                onCheckedChange={(v) => patch({ subtitlesEnabled: v })}
              />
            </label>
          </div>
          <label className="flex items-center gap-3 text-xs text-muted-foreground">
            Tỉ lệ giọng / nhạc
            <Slider
              className="max-w-48"
              value={[settings.voiceBgRatio * 100]}
              onValueChange={([v]) => patch({ voiceBgRatio: (v ?? 70) / 100 })}
            />
            <span className="font-mono tabular">{Math.round(settings.voiceBgRatio * 100)}%</span>
          </label>
        </div>
      </div>
      <aside className="min-h-0 overflow-auto border-t border-border lg:border-t-0 lg:border-l">
        <p className="sticky top-0 border-b border-border bg-card px-3 py-2 text-2xs tracking-wide text-muted-foreground uppercase">
          Cue
        </p>
        <ul>
          {cues.map((c) => (
            <li key={c.id}>
              <button
                type="button"
                onClick={() => {
                  selectCue(c.id);
                  setPlayhead(c.startMs);
                }}
                className={cn(
                  "flex w-full items-start gap-2 px-3 py-2 text-left text-xs hover:bg-accent/50",
                  cue?.id === c.id && "bg-accent",
                )}
              >
                <span className="w-6 font-mono tabular text-muted-foreground">{c.index}</span>
                <span className="min-w-0 flex-1">
                  <span className="block text-muted-foreground">{characterName(c.characterId)}</span>
                  <span className="line-clamp-2">{c.translation}</span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
}
