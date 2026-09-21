import { Link } from "@tanstack/react-router";
import { ArrowLeft, Pause, Play, RotateCcw } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProgressTab } from "./progress-tab";
import { PreviewTab } from "./preview-tab";
import { ReportTab } from "./report-tab";
import { TimelineEditor } from "@/components/timeline/timeline-editor";
import { STATUS_LABEL } from "@/lib/constants";
import { episodeLabel, formatDuration } from "@/lib/format";
import { seriesTitle, useAppStore } from "@/lib/store";
import type { Job, JobTab } from "@/lib/types";

export function JobDetail({ job }: { job: Job }) {
  const start = useAppStore((s) => s.startJob);
  const pause = useAppStore((s) => s.pauseJob);
  const retry = useAppStore((s) => s.retryStage);

  return (
    <div className="flex h-full min-h-0 flex-col">
      <header className="flex flex-wrap items-center gap-3 border-b border-border px-3 py-2">
        <Button asChild size="icon-sm" variant="ghost">
          <Link to="/" aria-label="Hàng đợi">
            <ArrowLeft className="size-4" />
          </Link>
        </Button>
        <img src={job.still} alt="" className="hidden h-10 w-16 rounded-xs object-cover sm:block" />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="truncate text-sm font-medium">{job.fileName}</h1>
            <Badge variant={job.status as never}>{STATUS_LABEL[job.status]}</Badge>
            {job.flagCount > 0 && <Badge variant="warn">{job.flagCount} cờ</Badge>}
          </div>
          <p className="text-xs text-muted-foreground">
            {seriesTitle(job.seriesId)} · {episodeLabel(job.episode)} · {formatDuration(job.durationSec)}
          </p>
        </div>
        <div className="flex gap-1">
          {job.status === "running" ? (
            <Button size="sm" variant="outline" onClick={() => pause(job.id)}>
              <Pause className="size-3.5" /> Tạm dừng
            </Button>
          ) : job.status === "queued" || job.status === "paused" || job.status === "error" ? (
            <Button size="sm" onClick={() => (job.status === "error" ? retry(job.id, "translate") : start(job.id))}>
              {job.status === "error" ? <RotateCcw className="size-3.5" /> : <Play className="size-3.5" />}
              {job.status === "error" ? "Thử lại" : "Chạy"}
            </Button>
          ) : null}
        </div>
      </header>
      <Tabs defaultValue={defaultTab(job)} className="flex min-h-0 flex-1 flex-col">
        <div className="border-b border-border px-3">
          <TabsList className="h-10 bg-transparent p-0">
            <TabsTrigger value="progress" className="rounded-none border-b-2 border-transparent data-[state=active]:border-foreground data-[state=active]:bg-transparent data-[state=active]:shadow-none">
              Tiến trình
            </TabsTrigger>
            <TabsTrigger value="timeline" className="rounded-none border-b-2 border-transparent data-[state=active]:border-foreground data-[state=active]:bg-transparent data-[state=active]:shadow-none">
              Timeline
            </TabsTrigger>
            <TabsTrigger value="preview" className="rounded-none border-b-2 border-transparent data-[state=active]:border-foreground data-[state=active]:bg-transparent data-[state=active]:shadow-none">
              Preview
            </TabsTrigger>
            <TabsTrigger value="report" className="rounded-none border-b-2 border-transparent data-[state=active]:border-foreground data-[state=active]:bg-transparent data-[state=active]:shadow-none">
              Báo cáo
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="progress" className="min-h-0 flex-1 overflow-hidden">
          <ProgressTab job={job} />
        </TabsContent>
        <TabsContent value="timeline" className="min-h-0 flex-1 overflow-hidden">
          <TimelineEditor job={job} />
        </TabsContent>
        <TabsContent value="preview" className="min-h-0 flex-1 overflow-hidden">
          <PreviewTab job={job} />
        </TabsContent>
        <TabsContent value="report" className="min-h-0 flex-1 overflow-hidden">
          <ReportTab job={job} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function defaultTab(job: Job): JobTab {
  if (job.status === "review" || job.status === "done") return "timeline";
  if (job.status === "error") return "progress";
  return "progress";
}
