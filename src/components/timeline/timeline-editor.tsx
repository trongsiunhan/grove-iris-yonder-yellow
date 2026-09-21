import { useEffect, useMemo, useRef, useState } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import {
  ChevronsDown,
  Keyboard,
  Pause,
  Play,
  RefreshCw,
  Split,
  Volume2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { FLAG_META, FLAG_ORDER, SHORTCUTS } from "@/lib/constants";
import { formatClock, formatStretch } from "@/lib/format";
import { CHARACTERS, VOICES } from "@/lib/data";
import { characterName, useAppStore, voiceName } from "@/lib/store";
import type { Cue, FlagKind, Job } from "@/lib/types";
import { cn } from "@/lib/utils";
import { FlagChips, FlagDot, worstTone } from "@/components/flag-dot";
import { Waveform } from "./waveform";

export function TimelineEditor({ job }: { job: Job }) {
  const cuesAll = useAppStore((s) => s.cues);
  const filter = useAppStore((s) => s.cueFilter);
  const query = useAppStore((s) => s.cueQuery);
  const setFilter = useAppStore((s) => s.setCueFilter);
  const setQuery = useAppStore((s) => s.setCueQuery);
  const selectedId = useAppStore((s) => s.selectedCueId);
  const selectCue = useAppStore((s) => s.selectCue);
  const playing = useAppStore((s) => s.playing);
  const setPlaying = useAppStore((s) => s.setPlaying);
  const playhead = useAppStore((s) => s.playheadMs);
  const setPlayhead = useAppStore((s) => s.setPlayhead);
  const nextFlag = useAppStore((s) => s.nextFlag);
  const regenerate = useAppStore((s) => s.regenerateCue);
  const updateCue = useAppStore((s) => s.updateCue);
  const splitCue = useAppStore((s) => s.splitCue);
  const mergeCue = useAppStore((s) => s.mergeCue);
  const retranslate = useAppStore((s) => s.retranslateCue);
  const findReplace = useAppStore((s) => s.findReplace);
  const shortcutsOpen = useAppStore((s) => s.shortcutsOpen);
  const setShortcutsOpen = useAppStore((s) => s.setShortcutsOpen);
  const [editing, setEditing] = useState<string | null>(null);
  const [find, setFind] = useState("");
  const [repl, setRepl] = useState("");
  const parentRef = useRef<HTMLDivElement>(null);

  const cues = useMemo(() => {
    return cuesAll
      .filter((c) => c.jobId === job.id)
      .filter((c) => {
        if (filter === "flagged") return c.flags.length > 0;
        if (filter !== "all") return c.flags.includes(filter);
        return true;
      })
      .filter((c) => {
        if (!query) return true;
        const q = query.toLowerCase();
        return (
          c.translation.toLowerCase().includes(q) ||
          c.original.toLowerCase().includes(q) ||
          characterName(c.characterId).toLowerCase().includes(q)
        );
      })
      .sort((a, b) => a.index - b.index);
  }, [cuesAll, job.id, filter, query]);

  const selected = cuesAll.find((c) => c.id === selectedId) ?? cues[0];
  const durationMs = job.durationSec * 1000;
  const jobCues = cuesAll.filter((c) => c.jobId === job.id);

  const virtualizer = useVirtualizer({
    count: cues.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 52,
    overscan: 12,
  });

  useEffect(() => {
    if (!selectedId && cues[0]) selectCue(cues[0].id);
  }, [cues, selectedId, selectCue]);

  useEffect(() => {
    if (!playing) return;
    const id = window.setInterval(() => {
      const s = useAppStore.getState();
      s.setPlayhead(s.playheadMs + 80);
    }, 80);
    return () => window.clearInterval(id);
  }, [playing]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const tag = (e.target as HTMLElement | null)?.tagName;
      const typing = tag === "INPUT" || tag === "TEXTAREA" || (e.target as HTMLElement)?.isContentEditable;
      if (e.code === "Space" && !typing) {
        e.preventDefault();
        setPlaying(!playing);
      }
      if (e.key === "ArrowDown" && !typing) {
        e.preventDefault();
        const i = cues.findIndex((c) => c.id === selectedId);
        const n = cues[i + 1];
        if (n) selectCue(n.id);
      }
      if (e.key === "ArrowUp" && !typing) {
        e.preventDefault();
        const i = cues.findIndex((c) => c.id === selectedId);
        const n = cues[i - 1];
        if (n) selectCue(n.id);
      }
      if (e.key === "Enter" && !typing && selected) {
        e.preventDefault();
        setEditing(selected.id);
      }
      if (e.key === "Escape") setEditing(null);
      if ((e.metaKey || e.ctrlKey) && e.key === "Enter" && selected) {
        e.preventDefault();
        regenerate(selected.id);
      }
      if (!typing && (e.key === "n" || e.key === "N")) {
        e.preventDefault();
        nextFlag(job.id);
      }
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "s") {
        e.preventDefault();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [cues, selectedId, playing, selected, job.id, nextFlag, regenerate, selectCue, setPlaying]);

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="flex flex-wrap items-center gap-2 border-b border-border px-3 py-2">
        <Select value={filter} onValueChange={(v) => setFilter(v as typeof filter)}>
          <SelectTrigger className="h-8 w-44">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Mọi cue</SelectItem>
            <SelectItem value="flagged">Chỉ có cờ</SelectItem>
            {FLAG_ORDER.map((f) => (
              <SelectItem key={f} value={f}>
                {FLAG_META[f].label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Tìm lời gốc / dịch / nhân vật"
          className="h-8 max-w-64"
        />
        <Button size="sm" variant="outline" onClick={() => nextFlag(job.id)}>
          <ChevronsDown className="size-3.5" /> Cờ tiếp
        </Button>
        <div className="hidden items-center gap-1 lg:flex">
          <Input value={find} onChange={(e) => setFind(e.target.value)} placeholder="Tìm" className="h-8 w-28" />
          <Input value={repl} onChange={(e) => setRepl(e.target.value)} placeholder="Thay" className="h-8 w-28" />
          <Button size="sm" variant="ghost" onClick={() => findReplace(job.id, find, repl)}>
            Thay tất
          </Button>
        </div>
        <Button size="icon-sm" variant="ghost" className="ml-auto" onClick={() => setShortcutsOpen(true)} aria-label="Phím tắt">
          <Keyboard className="size-4" />
        </Button>
      </div>

      <div className="grid min-h-0 flex-1 grid-cols-1 lg:grid-cols-[minmax(0,1.7fr)_minmax(280px,1fr)]">
        <div ref={parentRef} className="min-h-0 overflow-auto scroll-thin border-b border-border lg:border-r lg:border-b-0">
          <div className="min-w-[760px]">
          <div className="sticky top-0 z-10 grid grid-cols-[36px_72px_56px_88px_1fr_1fr_52px_48px] gap-2 border-b border-border bg-card px-3 py-1.5 text-2xs font-medium tracking-wide text-muted-foreground uppercase">
            <span>#</span>
            <span>Bắt đầu</span>
            <span>Dài</span>
            <span>Nhân vật</span>
            <span>Gốc</span>
            <span>Dịch</span>
            <span>Lệch</span>
            <span>Cờ</span>
          </div>
          <div style={{ height: virtualizer.getTotalSize(), position: "relative" }}>
            {virtualizer.getVirtualItems().map((vi) => {
              const cue = cues[vi.index];
              if (!cue) return null;
              const tone = worstTone(cue.flags);
              const active = cue.id === selected?.id;
              return (
                <div
                  key={cue.id}
                  className={cn(
                    "cue-row absolute left-0 w-full cursor-pointer px-3",
                    active ? "bg-accent" : "hover:bg-accent/40",
                  )}
                  data-tone={tone ?? undefined}
                  style={{ height: vi.size, transform: `translateY(${vi.start}px)` }}
                  onClick={() => selectCue(cue.id)}
                >
                  <div className="grid h-full grid-cols-[36px_72px_56px_88px_1fr_1fr_52px_48px] items-center gap-2 text-xs">
                    <span className="font-mono tabular text-muted-foreground">{cue.index}</span>
                    <span className="font-mono tabular">{formatClock(cue.startMs)}</span>
                    <span className="font-mono tabular text-muted-foreground">
                      {((cue.endMs - cue.startMs) / 1000).toFixed(1)}s
                    </span>
                    <span className="truncate">{characterName(cue.characterId)}</span>
                    <span className="truncate text-muted-foreground">{cue.original}</span>
                    {editing === cue.id ? (
                      <input
                        autoFocus
                        defaultValue={cue.translation}
                        className="h-7 rounded-xs border border-input bg-transparent px-1"
                        onBlur={(e) => {
                          updateCue(cue.id, { translation: e.target.value });
                          setEditing(null);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") (e.target as HTMLInputElement).blur();
                          if (e.key === "Escape") setEditing(null);
                        }}
                        onClick={(e) => e.stopPropagation()}
                      />
                    ) : (
                      <span
                        className="truncate"
                        onDoubleClick={(e) => {
                          e.stopPropagation();
                          setEditing(cue.id);
                        }}
                      >
                        {cue.translation}
                      </span>
                    )}
                    <span
                      className={cn(
                        "font-mono tabular",
                        cue.stretch > 1.15 ? "text-flag-danger" : "text-muted-foreground",
                      )}
                    >
                      {formatStretch(cue.stretch)}
                    </span>
                    <FlagChips flags={cue.flags} />
                  </div>
                </div>
              );
            })}
          </div>
          {cues.length === 0 && (
            <p className="p-8 text-center text-sm text-muted-foreground">Không có cue khớp bộ lọc.</p>
          )}
          </div>
        </div>

        <CueSide
          job={job}
          cue={selected}
          playing={playing}
          onPlay={() => setPlaying(!playing)}
          onRegen={() => selected && regenerate(selected.id)}
          onRetranslate={() => selected && retranslate(selected.id)}
          onSplit={() => selected && splitCue(selected.id)}
          onMerge={() => selected && mergeCue(selected.id)}
        />
      </div>

      <div className="border-t border-border">
        <div className="flex items-center justify-between px-3 py-1 text-2xs text-muted-foreground">
          <span>Gốc</span>
          <span className="font-mono tabular">{formatClock(playhead)}</span>
          <span>Lồng tiếng</span>
        </div>
        <Waveform
          cues={jobCues}
          durationMs={durationMs}
          playheadMs={playhead}
          onSeek={(ms) => {
            setPlayhead(ms);
            const hit = jobCues.find((c) => ms >= c.startMs && ms < c.endMs);
            if (hit) selectCue(hit.id);
          }}
        />
      </div>

      <Dialog open={shortcutsOpen} onOpenChange={setShortcutsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Phím tắt</DialogTitle>
            <DialogDescription>Dùng khi không đang gõ trong ô sửa.</DialogDescription>
          </DialogHeader>
          <ul className="mt-2 space-y-2">
            {SHORTCUTS.map((s) => (
              <li key={s.keys} className="flex justify-between text-sm">
                <span className="text-muted-foreground">{s.action}</span>
                <kbd className="rounded-xs bg-secondary px-1.5 py-0.5 font-mono text-xs">{s.keys}</kbd>
              </li>
            ))}
          </ul>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function CueSide({
  job,
  cue,
  playing,
  onPlay,
  onRegen,
  onRetranslate,
  onSplit,
  onMerge,
}: {
  job: Job;
  cue?: Cue;
  playing: boolean;
  onPlay: () => void;
  onRegen: () => void;
  onRetranslate: () => void;
  onSplit: () => void;
  onMerge: () => void;
}) {
  const updateCue = useAppStore((s) => s.updateCue);
  const track = useAppStore((s) => s.previewTrack);
  const setTrack = useAppStore((s) => s.setPreviewTrack);
  const chars = CHARACTERS.filter((c) => c.seriesId === job.seriesId);

  if (!cue) {
    return <div className="p-6 text-sm text-muted-foreground">Chọn một cue.</div>;
  }

  return (
    <div className="flex min-h-0 flex-col overflow-auto scroll-thin">
      <div className="relative aspect-video overflow-hidden bg-secondary">
        <img src={job.still} alt="" className="size-full object-cover" />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/80 to-transparent px-4 pb-4 pt-10">
          <p className="text-center text-sm">{cue.translation}</p>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-1 border-b border-border p-2">
        <Button size="sm" variant="outline" onClick={onPlay}>
          {playing ? <Pause className="size-3.5" /> : <Play className="size-3.5" />}
          {playing ? "Dừng" : "Nghe cue"}
        </Button>
        <Button size="sm" variant="ghost" onClick={onRegen}>
          <RefreshCw className="size-3.5" /> Tạo lại giọng
        </Button>
        <Button size="sm" variant="ghost" onClick={onRetranslate}>
          Dịch lại
        </Button>
        <Button size="icon-sm" variant="ghost" onClick={onSplit} aria-label="Tách">
          <Split className="size-3.5" />
        </Button>
        <Select value={track} onValueChange={(v) => setTrack(v as typeof track)}>
          <SelectTrigger className="h-8 w-28">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="original">Gốc</SelectItem>
            <SelectItem value="dub">Lồng</SelectItem>
            <SelectItem value="mix">Trộn</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-3 p-3">
        <div className="grid grid-cols-2 gap-2">
          <label className="space-y-1">
            <span className="text-2xs text-muted-foreground">Nhân vật</span>
            <Select
              value={cue.characterId}
              onValueChange={(v) => {
                const ch = CHARACTERS.find((c) => c.id === v);
                updateCue(cue.id, { characterId: v, voiceId: ch?.voiceId ?? cue.voiceId });
              }}
            >
              <SelectTrigger className="h-8">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {chars.map((c) => (
                  <SelectItem key={c.id} value={c.id}>
                    {c.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </label>
          <label className="space-y-1">
            <span className="text-2xs text-muted-foreground">Giọng</span>
            <Select value={cue.voiceId} onValueChange={(v) => updateCue(cue.id, { voiceId: v })}>
              <SelectTrigger className="h-8">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {VOICES.map((v) => (
                  <SelectItem key={v.id} value={v.id}>
                    {v.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </label>
        </div>
        <label className="block space-y-1">
          <span className="text-2xs text-muted-foreground">Lời gốc</span>
          <Textarea
            value={cue.original}
            onChange={(e) => updateCue(cue.id, { original: e.target.value })}
            className="min-h-16"
          />
        </label>
        <label className="block space-y-1">
          <span className="text-2xs text-muted-foreground">Lời dịch</span>
          <Textarea
            value={cue.translation}
            onChange={(e) => updateCue(cue.id, { translation: e.target.value })}
            className="min-h-16"
          />
        </label>
        <div>
          <div className="mb-1 flex justify-between text-2xs text-muted-foreground">
            <span>Hệ số nén</span>
            <span className={cn("font-mono tabular", cue.stretch > 1.15 && "text-flag-danger")}>
              {formatStretch(cue.stretch)}
            </span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-secondary">
            <div
              className={cn("h-full", cue.stretch > 1.15 ? "bg-flag-danger" : "bg-primary")}
              style={{ width: `${Math.min(100, (cue.stretch / 1.4) * 100)}%` }}
            />
          </div>
        </div>
        {cue.flags.length > 0 && (
          <ul className="space-y-1">
            {cue.flags.map((f) => (
              <li key={f} className="flex items-start gap-2 text-xs">
                <FlagDot kind={f} className="mt-1.5" />
                <span>
                  <span className="font-medium">{FLAG_META[f].label}</span>
                  <span className="text-muted-foreground"> — {FLAG_META[f].hint}</span>
                </span>
              </li>
            ))}
          </ul>
        )}
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Volume2 className="size-3.5" />
          {voiceName(cue.voiceId)} · ASR {(cue.asrConfidence * 100).toFixed(0)}%
        </div>
        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={onSplit}>
            Tách cue
          </Button>
          <Button size="sm" variant="outline" onClick={onMerge}>
            Gộp với cue sau
          </Button>
        </div>
      </div>
    </div>
  );
}
