import {
  AlertCircle,
  Check,
  CircleDashed,
  LoaderCircle,
  RotateCcw,
  SkipForward,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { STAGES } from "@/lib/constants";
import { formatMs } from "@/lib/format";
import { useAppStore } from "@/lib/store";
import type { Job, StageStatus } from "@/lib/types";
import { cn } from "@/lib/utils";

const ICON: Record<StageStatus, typeof Check> = {
  pending: CircleDashed,
  running: LoaderCircle,
  done: Check,
  cached: SkipForward,
  error: AlertCircle,
  skipped: CircleDashed,
};

export function ProgressTab({ job }: { job: Job }) {
  const retry = useAppStore((s) => s.retryStage);

  return (
    <div className="grid h-full min-h-0 grid-cols-1 lg:grid-cols-[minmax(0,1.2fr)_minmax(280px,0.8fr)]">
      <div className="min-h-0 overflow-auto scroll-thin p-4">
        {job.errorMessage && (
          <div className="mb-4 rounded-lg border border-flag-danger/30 bg-flag-danger/8 p-4">
            <p className="text-sm font-medium text-flag-danger">{job.errorMessage}</p>
            {job.errorHint && <p className="mt-1 text-xs text-muted-foreground">{job.errorHint}</p>}
            <Button
              size="sm"
              className="mt-3"
              onClick={() => retry(job.id, job.stages[job.stageIndex]?.id ?? "translate")}
            >
              <RotateCcw className="size-3.5" /> Thử lại bước này
            </Button>
          </div>
        )}
        <ol className="space-y-2">
          {job.stages.map((st, i) => {
            const Icon = ICON[st.status];
            const meta = STAGES[i];
            return (
              <li
                key={st.id}
                className={cn(
                  "rounded-md border border-border p-3",
                  st.status === "running" && "bg-card",
                  st.status === "error" && "border-flag-danger/40",
                )}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={cn(
                      "size-4",
                      st.status === "running" && "animate-spin text-foreground",
                      st.status === "done" && "text-success",
                      st.status === "cached" && "text-flag-edit",
                      st.status === "error" && "text-flag-danger",
                      st.status === "pending" && "text-muted-foreground",
                    )}
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline justify-between gap-2">
                      <p className="text-sm font-medium">
                        {i + 1}. {meta?.name}
                      </p>
                      <p className="font-mono text-2xs tabular text-muted-foreground">
                        {st.status === "cached"
                          ? "dùng lại kết quả cũ"
                          : st.elapsedMs
                            ? formatMs(st.elapsedMs)
                            : "—"}
                      </p>
                    </div>
                    {(st.status === "running" || st.status === "error") && (
                      <Progress className="mt-2" value={st.progress} />
                    )}
                  </div>
                  {st.status === "error" && (
                    <Button size="sm" variant="outline" onClick={() => retry(job.id, st.id)}>
                      Thử lại
                    </Button>
                  )}
                </div>
              </li>
            );
          })}
        </ol>
        <div className="mt-6">
          <p className="mb-2 text-2xs tracking-wide text-muted-foreground uppercase">Thời gian từng bước</p>
          <div className="flex h-6 overflow-hidden rounded-sm bg-secondary">
            {job.stages.map((st) => {
              const total = job.stages.reduce((a, b) => a + Math.max(b.elapsedMs, 1), 0);
              return (
                <div
                  key={st.id}
                  title={`${st.name} · ${formatMs(st.elapsedMs)}`}
                  className={cn(
                    "h-full",
                    st.status === "cached" ? "bg-flag-edit/50" : "bg-primary/70",
                    st.status === "pending" && "bg-transparent",
                    st.status === "error" && "bg-flag-danger",
                  )}
                  style={{ width: `${(Math.max(st.elapsedMs, st.status === "pending" ? 0 : 1) / total) * 100}%` }}
                />
              );
            })}
          </div>
        </div>
      </div>
      <aside className="min-h-0 overflow-auto border-t border-border bg-card p-4 lg:border-t-0 lg:border-l">
        <p className="text-2xs tracking-wide text-muted-foreground uppercase">Log realtime</p>
        <ol className="mt-3 space-y-1 font-mono text-2xs text-muted-foreground">
          {job.logs.length === 0 && <li>Chưa có log.</li>}
          {job.logs.map((line, i) => (
            <li key={i} className="leading-relaxed">
              {line}
            </li>
          ))}
        </ol>
      </aside>
    </div>
  );
}
