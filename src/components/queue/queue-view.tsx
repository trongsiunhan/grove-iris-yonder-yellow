import { useMemo, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  FolderOpen,
  GripVertical,
  Link2,
  MoreHorizontal,
  Pause,
  Play,
  Plus,
  RotateCcw,
  Search,
  Trash2,
  X,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { STAGES, STATUS_LABEL } from "@/lib/constants";
import { episodeLabel, formatDuration, formatEta } from "@/lib/format";
import { seriesTitle, useAppStore } from "@/lib/store";
import type { Job, JobStatus } from "@/lib/types";
import { cn } from "@/lib/utils";

export function QueueView() {
  const jobs = useAppStore((s) => s.jobs);
  const series = useAppStore((s) => s.series);
  const q = useAppStore((s) => s.queueQuery);
  const setQ = useAppStore((s) => s.setQueueQuery);
  const status = useAppStore((s) => s.queueStatus);
  const setStatus = useAppStore((s) => s.setQueueStatus);
  const seriesFilter = useAppStore((s) => s.queueSeries);
  const setSeriesFilter = useAppStore((s) => s.setQueueSeries);
  const selected = useAppStore((s) => s.selectedJobIds);
  const toggle = useAppStore((s) => s.toggleSelectJob);
  const bulk = useAppStore((s) => s.bulk);
  const addFiles = useAppStore((s) => s.addFiles);
  const fileRef = useRef<HTMLInputElement>(null);
  const [urlOpen, setUrlOpen] = useState(false);
  const [url, setUrl] = useState("");

  const filtered = useMemo(() => {
    return jobs.filter((j) => {
      if (status !== "all" && j.status !== status) return false;
      if (seriesFilter !== "all" && j.seriesId !== seriesFilter) return false;
      if (q && !j.fileName.toLowerCase().includes(q.toLowerCase()) && !seriesTitle(j.seriesId).toLowerCase().includes(q.toLowerCase()))
        return false;
      return true;
    });
  }, [jobs, q, status, seriesFilter]);

  return (
    <div className="flex h-full flex-col">
      <header className="flex flex-col gap-3 border-b border-border px-4 py-3 sm:flex-row sm:items-center">
        <div>
          <h1 className="font-display text-xl tracking-tight">Hàng đợi</h1>
          <p className="text-xs text-muted-foreground">Thả video, theo dõi nhiều tập cùng lúc.</p>
        </div>
        <div className="flex flex-wrap items-center gap-2 sm:ml-auto">
          <input
            ref={fileRef}
            type="file"
            accept="video/*,.mkv"
            multiple
            className="hidden"
            onChange={(e) => {
              const names = Array.from(e.target.files ?? []).map((f) => f.name);
              if (names.length) addFiles(names);
              e.target.value = "";
            }}
          />
          <Button size="sm" onClick={() => fileRef.current?.click()}>
            <Plus className="size-4" /> Chọn file
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => addFiles(["Mua.Sen.Tren.Song.S01E09.1080p.mkv"])}
          >
            <FolderOpen className="size-4" /> Thêm tập mẫu
          </Button>
          <Button size="sm" variant="ghost" onClick={() => setUrlOpen((v) => !v)}>
            <Link2 className="size-4" /> URL
          </Button>
        </div>
      </header>

      {urlOpen && (
        <div className="flex items-center gap-2 border-b border-border bg-card px-4 py-2">
          <Input
            placeholder="Dán URL YouTube / Bilibili…"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <Button
            size="sm"
            onClick={() => {
              if (!url.trim()) return;
              addFiles([`yt-${url.replace(/https?:\/\//, "").slice(0, 28)}.mp4`]);
              setUrl("");
              setUrlOpen(false);
            }}
          >
            Tải
          </Button>
        </div>
      )}

      <div className="flex flex-wrap items-center gap-2 border-b border-border px-4 py-2">
        <div className="relative min-w-40 flex-1">
          <Search className="absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Tìm theo tên…"
            className="h-8 pl-8"
          />
        </div>
        <Select value={status} onValueChange={(v) => setStatus(v as JobStatus | "all")}>
          <SelectTrigger className="h-8 w-36">
            <SelectValue placeholder="Trạng thái" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Mọi trạng thái</SelectItem>
            {Object.entries(STATUS_LABEL).map(([k, v]) => (
              <SelectItem key={k} value={k}>
                {v}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={seriesFilter} onValueChange={setSeriesFilter}>
          <SelectTrigger className="h-8 w-44">
            <SelectValue placeholder="Bộ phim" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Mọi bộ</SelectItem>
            {series.map((s) => (
              <SelectItem key={s.id} value={s.id}>
                {s.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {selected.length > 0 && (
          <div className="flex items-center gap-1">
            <span className="text-xs text-muted-foreground">{selected.length} đã chọn</span>
            <Button size="sm" variant="ghost" onClick={() => bulk("start")}>
              Chạy
            </Button>
            <Button size="sm" variant="ghost" onClick={() => bulk("cancel")}>
              Huỷ
            </Button>
            <Button size="sm" variant="ghost" onClick={() => bulk("delete")}>
              Xoá
            </Button>
          </div>
        )}
      </div>

      <div className="min-h-0 flex-1 overflow-auto scroll-thin">
        {filtered.length === 0 ? (
          <EmptyQueue onPick={() => fileRef.current?.click()} />
        ) : (
          <ul className="divide-y divide-border">
            {filtered.map((job, i) => (
              <JobRow key={job.id} job={job} index={i} selected={selected.includes(job.id)} onToggle={() => toggle(job.id)} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function EmptyQueue({ onPick }: { onPick: () => void }) {
  return (
    <div className="flex h-full flex-col items-center justify-center px-6 text-center">
      <p className="font-display text-2xl">Chưa có job nào</p>
      <p className="mt-2 max-w-sm text-sm text-muted-foreground">
        Kéo file video vào cửa sổ, hoặc chọn file / thư mục. Tên file có số tập sẽ được gán vào bộ phim có sẵn.
      </p>
      <Button className="mt-5" onClick={onPick}>
        Chọn file
      </Button>
    </div>
  );
}

function JobRow({
  job,
  index,
  selected,
  onToggle,
}: {
  job: Job;
  index: number;
  selected: boolean;
  onToggle: () => void;
}) {
  const start = useAppStore((s) => s.startJob);
  const pause = useAppStore((s) => s.pauseJob);
  const cancel = useAppStore((s) => s.cancelJob);
  const retry = useAppStore((s) => s.retryStage);
  const apply = useAppStore((s) => s.applyJobToSeries);
  const setConfirm = useAppStore((s) => s.setConfirm);
  const deleteJob = useAppStore((s) => s.deleteJob);
  const reorder = useAppStore((s) => s.reorderJobs);
  const stage = STAGES[job.stageIndex];

  return (
    <li
      draggable
      onDragStart={(e) => e.dataTransfer.setData("text/plain", String(index))}
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        e.preventDefault();
        const from = Number(e.dataTransfer.getData("text/plain"));
        if (!Number.isNaN(from)) reorder(from, index);
      }}
      className={cn("flex items-stretch gap-3 px-4 py-3 hover:bg-accent/40", selected && "bg-accent/50")}
    >
      <div className="hidden items-center text-muted-foreground sm:flex">
        <GripVertical className="size-4" />
      </div>
      <div className="flex items-center">
        <Checkbox checked={selected} onCheckedChange={onToggle} aria-label="Chọn job" />
      </div>
      <Link to="/jobs/$jobId" params={{ jobId: job.id }} className="flex min-w-0 flex-1 items-center gap-3">
        <div className="relative hidden h-14 w-24 shrink-0 overflow-hidden rounded-sm sm:block">
          <img src={job.still} alt="" className="size-full object-cover" />
          <span className="absolute right-1 bottom-1 rounded-xs bg-background/80 px-1 font-mono text-2xs tabular">
            {formatDuration(job.durationSec)}
          </span>
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <p className="truncate text-sm font-medium">{job.fileName}</p>
            <Badge variant={job.status as never}>{STATUS_LABEL[job.status]}</Badge>
            {job.status === "review" && job.flagCount > 0 && (
              <Badge variant="warn">{job.flagCount} cờ</Badge>
            )}
            {job.cachedStages.length > 0 && job.status === "queued" && (
              <Badge variant="outline">cache</Badge>
            )}
          </div>
          <p className="mt-0.5 text-xs text-muted-foreground">
            {seriesTitle(job.seriesId)} · {episodeLabel(job.episode)}
            {job.status === "running" || job.status === "paused" ? (
              <>
                {" "}
                · {stage?.name} · ETA {formatEta(job.etaSec)}
              </>
            ) : null}
          </p>
          {(job.status === "running" || job.status === "paused") && (
            <div className="mt-1.5 max-w-md">
              <Progress value={(job.stageIndex * 100 + job.stageProgress) / 9} />
            </div>
          )}
          {job.status === "error" && (
            <p className="mt-1 text-xs text-flag-danger">{job.errorMessage}</p>
          )}
        </div>
      </Link>
      <div className="flex items-center gap-1">
        {job.status === "running" ? (
          <Button size="icon-sm" variant="ghost" onClick={() => pause(job.id)} aria-label="Tạm dừng">
            <Pause className="size-4" />
          </Button>
        ) : job.status === "paused" || job.status === "queued" ? (
          <Button size="icon-sm" variant="ghost" onClick={() => start(job.id)} aria-label="Bắt đầu">
            <Play className="size-4" />
          </Button>
        ) : null}
        {(job.status === "running" || job.status === "paused") && (
          <Button size="icon-sm" variant="ghost" onClick={() => cancel(job.id)} aria-label="Huỷ">
            <X className="size-4" />
          </Button>
        )}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="icon-sm" variant="ghost" aria-label="Thêm">
              <MoreHorizontal className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => retry(job.id, "translate")}>
              <RotateCcw className="size-3.5" /> Chạy lại từ bước Dịch
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => retry(job.id, "tts")}>
              <RotateCcw className="size-3.5" /> Chạy lại từ TTS
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => apply(job.id)}>Áp dụng cài đặt cho cả bộ</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() =>
                setConfirm({
                  title: "Xoá job?",
                  body: "Job sẽ rời hàng đợi. Cache có thể giữ lại để chạy nhanh hơn lần sau.",
                  onConfirm: () => deleteJob(job.id, false),
                })
              }
            >
              <Trash2 className="size-3.5" /> Xoá khỏi hàng đợi
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                setConfirm({
                  title: "Xoá job và cache?",
                  body: "Xoá cả kết quả trung gian. Lần chạy sau phải làm lại từ đầu.",
                  onConfirm: () => deleteJob(job.id, true),
                })
              }
            >
              <Trash2 className="size-3.5" /> Xoá kèm cache
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </li>
  );
}
