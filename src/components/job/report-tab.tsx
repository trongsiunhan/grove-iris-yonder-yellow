import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { FLAG_META, FLAG_ORDER, STAGES } from "@/lib/constants";
import { formatDuration, formatMs } from "@/lib/format";
import { FlagDot } from "@/components/flag-dot";
import { useAppStore } from "@/lib/store";
import type { Job } from "@/lib/types";

export function ReportTab({ job }: { job: Job }) {
  const cuesAll = useAppStore((s) => s.cues);
  const cues = cuesAll.filter((c) => c.jobId === job.id);
  const flagged = cues.filter((c) => c.flags.some((f) => f !== "edited"));
  const early = cues.filter((c, i, arr) => i > 0 && c.startMs < (arr[i - 1]?.startMs ?? 0)).length;
  const buckets = [0.9, 1.0, 1.05, 1.1, 1.15, 1.2, 1.3, 1.4].map((b, i, a) => {
    const prev = i === 0 ? 0.8 : a[i - 1]!;
    return {
      name: `${b.toFixed(2)}×`,
      n: cues.filter((c) => c.stretch > prev && c.stretch <= b).length,
    };
  });
  const processMs = job.stages.reduce((a, s) => a + s.elapsedMs, 0);
  const rtf = processMs / 1000 / job.durationSec;

  return (
    <div className="h-full overflow-auto scroll-thin p-4">
      <div className="grid gap-3 sm:grid-cols-3">
        <Stat label="Cue cần xem" value={String(flagged.length)} hint={`/${cues.length} cue`} />
        <Stat label="Bắt đầu sớm hơn gốc" value={String(early)} hint={early === 0 ? "đúng kỳ vọng" : "có thể là bug"} />
        <Stat label="RTF" value={rtf.toFixed(2) + "×"} hint={`xử lý ${formatDuration(processMs / 1000)} / ${formatDuration(job.durationSec)}`} />
      </div>
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <section>
          <h3 className="text-2xs tracking-wide text-muted-foreground uppercase">Cờ theo loại</h3>
          <ul className="mt-3 space-y-2">
            {FLAG_ORDER.map((f) => {
              const n = cues.filter((c) => c.flags.includes(f)).length;
              return (
                <li key={f} className="flex items-center gap-2 text-sm">
                  <FlagDot kind={f} />
                  <span className="flex-1">{FLAG_META[f].label}</span>
                  <span className="font-mono tabular">{n}</span>
                </li>
              );
            })}
          </ul>
        </section>
        <section>
          <h3 className="text-2xs tracking-wide text-muted-foreground uppercase">Phân bố hệ số nén</h3>
          <div className="mt-3 h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={buckets}>
                <XAxis dataKey="name" tick={{ fontSize: 10 }} stroke="currentColor" className="text-muted-foreground" />
                <YAxis allowDecimals={false} tick={{ fontSize: 10 }} stroke="currentColor" width={24} />
                <Tooltip
                  contentStyle={{
                    background: "var(--popover)",
                    border: "1px solid var(--border)",
                    fontSize: 12,
                  }}
                />
                <Bar dataKey="n" fill="var(--primary)" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>
      </div>
      <section className="mt-6">
        <h3 className="text-2xs tracking-wide text-muted-foreground uppercase">Thời gian bước</h3>
        <ul className="mt-3 divide-y divide-border">
          {job.stages.map((st, i) => (
            <li key={st.id} className="flex items-center justify-between py-2 text-sm">
              <span>
                {i + 1}. {STAGES[i]?.name}
              </span>
              <span className="font-mono tabular text-muted-foreground">{formatMs(st.elapsedMs)}</span>
            </li>
          ))}
        </ul>
      </section>
      <section className="mt-6 grid gap-3 sm:grid-cols-2">
        <Stat label="LUFS" value="−16.2" hint="chuẩn phát sóng" />
        <Stat label="True peak" value="−1.1 dBTP" hint="dưới −1.0" />
      </section>
    </div>
  );
}

function Stat({ label, value, hint }: { label: string; value: string; hint: string }) {
  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <p className="text-2xs tracking-wide text-muted-foreground uppercase">{label}</p>
      <p className="font-display mt-1 text-2xl tabular tracking-tight">{value}</p>
      <p className="text-xs text-muted-foreground">{hint}</p>
    </div>
  );
}
