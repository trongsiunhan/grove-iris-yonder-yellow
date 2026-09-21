import { useMemo, useState } from "react";
import { Link, useSearch } from "@tanstack/react-router";
import { Check, Plus, Trash2, Upload, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CHARACTERS } from "@/lib/data";
import { VOICES } from "@/lib/data";
import { STATUS_LABEL } from "@/lib/constants";
import { episodeLabel } from "@/lib/format";
import { useAppStore } from "@/lib/store";
import type { GlossaryKind } from "@/lib/types";
import { cn } from "@/lib/utils";

export function SeriesView() {
  const series = useAppStore((s) => s.series);
  const jobs = useAppStore((s) => s.jobs);
  const search = useSearch({ strict: false }) as { id?: string };
  const [active, setActive] = useState(search.id ?? series[0]?.id ?? "sen");
  const current = series.find((s) => s.id === active) ?? series[0];
  const eps = jobs.filter((j) => j.seriesId === current?.id);

  if (!current) {
    return (
      <div className="flex h-full items-center justify-center p-8 text-center">
        <div>
          <p className="font-display text-2xl">Chưa có bộ phim</p>
          <p className="mt-2 text-sm text-muted-foreground">Thêm video vào hàng đợi, Lồng sẽ gợi ý tạo bộ.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full min-h-0 flex-col lg:flex-row">
      <aside className="shrink-0 overflow-auto border-b border-border lg:w-72 lg:border-r lg:border-b-0">
        <div className="px-4 py-3">
          <h1 className="font-display text-xl tracking-tight">Bộ phim</h1>
          <p className="text-xs text-muted-foreground">Glossary và giọng theo nhân vật.</p>
        </div>
        <ul>
          {series.map((s) => (
            <li key={s.id}>
              <button
                type="button"
                onClick={() => setActive(s.id)}
                className={cn(
                  "flex w-full items-center gap-3 px-4 py-2.5 text-left hover:bg-accent/50",
                  s.id === current.id && "bg-accent",
                )}
              >
                <img src={s.cover} alt="" className="h-14 w-10 rounded-xs object-cover" />
                <span>
                  <span className="block text-sm font-medium">{s.title}</span>
                  <span className="text-xs text-muted-foreground">
                    {s.episodeTotal} tập · {s.year}
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </aside>
      <div className="min-h-0 flex-1 overflow-auto scroll-thin">
        <div className="relative h-44 overflow-hidden">
          <img src={current.cover} alt="" className="size-full object-cover object-top" />
          <div className="absolute inset-0 bg-gradient-to-t from-background to-background/10" />
          <div className="absolute bottom-4 left-4 right-4">
            <h2 className="font-display text-2xl tracking-tight">{current.title}</h2>
            <p className="mt-1 max-w-xl text-sm text-muted-foreground">{current.synopsis}</p>
          </div>
        </div>
        <section className="px-4 py-4">
          <h3 className="text-2xs tracking-wide text-muted-foreground uppercase">Tập</h3>
          <ul className="mt-2 divide-y divide-border">
            {eps.length === 0 && <li className="py-3 text-sm text-muted-foreground">Chưa có tập nào trong hàng đợi.</li>}
            {eps.map((j) => (
              <li key={j.id}>
                <Link
                  to="/jobs/$jobId"
                  params={{ jobId: j.id }}
                  className="flex items-center justify-between py-2 text-sm hover:text-foreground"
                >
                  <span>
                    {episodeLabel(j.episode)} · {j.fileName}
                  </span>
                  <Badge variant={j.status as never}>{STATUS_LABEL[j.status]}</Badge>
                </Link>
              </li>
            ))}
          </ul>
        </section>
        <Characters seriesId={current.id} />
        <Glossary seriesId={current.id} />
      </div>
    </div>
  );
}

function Characters({ seriesId }: { seriesId: string }) {
  const assign = useAppStore((s) => s.assignVoice);
  const chars = CHARACTERS.filter((c) => c.seriesId === seriesId);
  return (
    <section className="px-4 py-4">
      <h3 className="text-2xs tracking-wide text-muted-foreground uppercase">Giọng nhân vật</h3>
      <ul className="mt-2 space-y-2">
        {chars.map((c) => (
          <li key={c.id} className="flex items-center gap-3">
            <span className="w-36 text-sm">{c.name}</span>
            <Select value={c.voiceId} onValueChange={(v) => assign(c.id, v)}>
              <SelectTrigger className="h-8 max-w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {VOICES.filter((v) => v.gender === c.gender || v.gender === "child").map((v) => (
                  <SelectItem key={v.id} value={v.id}>
                    {v.name} · {v.style}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Glossary({ seriesId }: { seriesId: string }) {
  const glossary = useAppStore((s) => s.glossary);
  const add = useAppStore((s) => s.addGlossary);
  const update = useAppStore((s) => s.updateGlossary);
  const del = useAppStore((s) => s.deleteGlossary);
  const accept = useAppStore((s) => s.acceptPending);
  const reject = useAppStore((s) => s.rejectPending);
  const rows = useMemo(
    () => glossary.filter((g) => g.seriesId === seriesId),
    [glossary, seriesId],
  );
  const [source, setSource] = useState("");
  const [target, setTarget] = useState("");
  const [kind, setKind] = useState<GlossaryKind>("term");

  return (
    <section className="px-4 pb-8">
      <div className="flex items-center justify-between">
        <h3 className="text-2xs tracking-wide text-muted-foreground uppercase">Thuật ngữ</h3>
        <Button
          size="sm"
          variant="ghost"
          onClick={() => {
            const blob = new Blob([JSON.stringify(rows, null, 2)], { type: "application/json" });
            const a = document.createElement("a");
            a.href = URL.createObjectURL(blob);
            a.download = `glossary-${seriesId}.json`;
            a.click();
          }}
        >
          <Upload className="size-3.5" /> Xuất JSON
        </Button>
      </div>
      {rows.some((r) => r.pending) && (
        <div className="mt-3 rounded-md border border-border p-3">
          <p className="text-xs text-muted-foreground">Tên riêng trích từ tập đầu — duyệt nhận / từ chối</p>
          <ul className="mt-2 space-y-2">
            {rows
              .filter((r) => r.pending)
              .map((r) => (
                <li key={r.id} className="flex items-center gap-2 text-sm">
                  <span className="flex-1">
                    {r.source} → {r.target}
                  </span>
                  <Button size="icon-sm" variant="ghost" onClick={() => accept(r.id)} aria-label="Nhận">
                    <Check className="size-3.5" />
                  </Button>
                  <Button size="icon-sm" variant="ghost" onClick={() => reject(r.id)} aria-label="Từ chối">
                    <X className="size-3.5" />
                  </Button>
                </li>
              ))}
          </ul>
        </div>
      )}
      <div className="mt-3 flex flex-wrap gap-2">
        <Input value={source} onChange={(e) => setSource(e.target.value)} placeholder="Gốc" className="h-8 w-32" />
        <Input value={target} onChange={(e) => setTarget(e.target.value)} placeholder="Dịch cố định" className="h-8 w-40" />
        <Select value={kind} onValueChange={(v) => setKind(v as GlossaryKind)}>
          <SelectTrigger className="h-8 w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="character">Nhân vật</SelectItem>
            <SelectItem value="place">Địa danh</SelectItem>
            <SelectItem value="nickname">Biệt danh</SelectItem>
            <SelectItem value="term">Thuật ngữ</SelectItem>
          </SelectContent>
        </Select>
        <Button
          size="sm"
          onClick={() => {
            if (!source || !target) return;
            add({ seriesId, source, target, kind });
            setSource("");
            setTarget("");
          }}
        >
          <Plus className="size-3.5" /> Thêm
        </Button>
      </div>
      <ul className="mt-3 divide-y divide-border">
        {rows
          .filter((r) => !r.pending)
          .map((r) => (
            <li key={r.id} className="flex items-center gap-2 py-2">
              <Input
                value={r.source}
                onChange={(e) => update(r.id, { source: e.target.value })}
                className="h-8 w-32"
              />
              <span className="text-muted-foreground">→</span>
              <Input
                value={r.target}
                onChange={(e) => update(r.id, { target: e.target.value })}
                className="h-8 flex-1"
              />
              <Badge variant="outline">{r.kind}</Badge>
              <Button size="icon-sm" variant="ghost" onClick={() => del(r.id)} aria-label="Xoá">
                <Trash2 className="size-3.5" />
              </Button>
            </li>
          ))}
      </ul>
    </section>
  );
}
