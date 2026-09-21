import { create } from "zustand";
import { persist } from "zustand/middleware";
import { toast } from "sonner";
import type {
  AppSettings,
  Cue,
  FlagKind,
  GlossaryEntry,
  Job,
  JobStatus,
  JobTab,
  PreviewTrack,
  Series,
  StageId,
  ThemeMode,
  Voice,
} from "./types";
import {
  CHARACTERS,
  CUES,
  DEFAULT_SETTINGS,
  GLOSSARY,
  JOBS,
  MODELS,
  SERIES,
  VOICES,
} from "./data";
import { STAGES } from "./constants";
import { parseEpisodeFromName } from "./format";

type FilterStatus = JobStatus | "all";

interface AppState {
  jobs: Job[];
  cues: Cue[];
  series: Series[];
  glossary: GlossaryEntry[];
  voices: Voice[];
  settings: AppSettings;
  models: typeof MODELS;
  selectedJobIds: string[];
  selectedCueId: string | null;
  playing: boolean;
  playheadMs: number;
  previewTrack: PreviewTrack;
  cueFilter: FlagKind | "all" | "flagged";
  cueQuery: string;
  queueQuery: string;
  queueStatus: FilterStatus;
  queueSeries: string | "all";
  onboarding: boolean;
  commandOpen: boolean;
  shortcutsOpen: boolean;
  confirm: { title: string; body: string; onConfirm: () => void } | null;
  dropActive: boolean;
  hydrated: boolean;

  setHydrated: () => void;
  setTheme: (theme: ThemeMode) => void;
  patchSettings: (patch: Partial<AppSettings>) => void;
  setCommandOpen: (open: boolean) => void;
  setShortcutsOpen: (open: boolean) => void;
  setOnboarding: (open: boolean) => void;
  setDropActive: (v: boolean) => void;
  setConfirm: (c: AppState["confirm"]) => void;

  setQueueQuery: (q: string) => void;
  setQueueStatus: (s: FilterStatus) => void;
  setQueueSeries: (s: string | "all") => void;
  toggleSelectJob: (id: string) => void;
  clearJobSelection: () => void;

  addFiles: (names: string[]) => void;
  startJob: (id: string) => void;
  pauseJob: (id: string) => void;
  resumeJob: (id: string) => void;
  cancelJob: (id: string) => void;
  deleteJob: (id: string, wipeCache: boolean) => void;
  reorderJobs: (from: number, to: number) => void;
  retryStage: (jobId: string, stageId: StageId) => void;
  applyJobToSeries: (jobId: string) => void;
  bulk: (action: "start" | "cancel" | "delete") => void;
  tick: () => void;

  selectCue: (id: string | null) => void;
  setPlaying: (v: boolean) => void;
  setPlayhead: (ms: number) => void;
  setPreviewTrack: (t: PreviewTrack) => void;
  setCueFilter: (f: AppState["cueFilter"]) => void;
  setCueQuery: (q: string) => void;
  updateCue: (id: string, patch: Partial<Cue>) => void;
  splitCue: (id: string) => void;
  mergeCue: (id: string) => void;
  regenerateCue: (id: string) => void;
  retranslateCue: (id: string) => void;
  nextFlag: (jobId: string) => void;
  findReplace: (jobId: string, find: string, replace: string) => void;

  addGlossary: (entry: Omit<GlossaryEntry, "id">) => void;
  updateGlossary: (id: string, patch: Partial<GlossaryEntry>) => void;
  deleteGlossary: (id: string) => void;
  acceptPending: (id: string) => void;
  rejectPending: (id: string) => void;
  assignVoice: (characterId: string, voiceId: string) => void;
  toggleFavorite: (voiceId: string) => void;
  downloadModel: (id: string) => void;
}

function matchSeries(name: string): { seriesId: string | null; episode: number | null } {
  const { episode } = parseEpisodeFromName(name);
  const lower = name.toLowerCase();
  if (lower.includes("sen") || lower.includes("lotus") || lower.includes("mua"))
    return { seriesId: "sen", episode };
  if (lower.includes("ha noi") || lower.includes("hanoi") || lower.includes("dem"))
    return { seriesId: "hanoi", episode };
  if (lower.includes("bien") || lower.includes("sea"))
    return { seriesId: "bien", episode };
  return { seriesId: null, episode };
}

function recountFlags(cues: Cue[], jobId: string) {
  return cues.filter((c) => c.jobId === jobId && c.flags.some((f) => f !== "edited")).length;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      jobs: JOBS,
      cues: CUES,
      series: SERIES,
      glossary: GLOSSARY,
      voices: VOICES,
      settings: DEFAULT_SETTINGS,
      models: MODELS,
      selectedJobIds: [],
      selectedCueId: CUES.find((c) => c.jobId === "job-sen-06")?.id ?? null,
      playing: false,
      playheadMs: CUES.find((c) => c.jobId === "job-sen-06")?.startMs ?? 0,
      previewTrack: "mix",
      cueFilter: "all",
      cueQuery: "",
      queueQuery: "",
      queueStatus: "all",
      queueSeries: "all",
      onboarding: true,
      commandOpen: false,
      shortcutsOpen: false,
      confirm: null,
      dropActive: false,
      hydrated: false,

      setHydrated: () => set({ hydrated: true }),
      setTheme: (theme) => {
        set((s) => ({ settings: { ...s.settings, theme } }));
        if (typeof document !== "undefined") {
          document.documentElement.classList.toggle("dark", theme === "dark");
          document.documentElement.classList.toggle("light", theme === "light");
        }
      },
      patchSettings: (patch) =>
        set((s) => ({ settings: { ...s.settings, ...patch } })),
      setCommandOpen: (commandOpen) => set({ commandOpen }),
      setShortcutsOpen: (shortcutsOpen) => set({ shortcutsOpen }),
      setOnboarding: (onboarding) => set({ onboarding }),
      setDropActive: (dropActive) => set({ dropActive }),
      setConfirm: (confirm) => set({ confirm }),

      setQueueQuery: (queueQuery) => set({ queueQuery }),
      setQueueStatus: (queueStatus) => set({ queueStatus }),
      setQueueSeries: (queueSeries) => set({ queueSeries }),
      toggleSelectJob: (id) =>
        set((s) => ({
          selectedJobIds: s.selectedJobIds.includes(id)
            ? s.selectedJobIds.filter((x) => x !== id)
            : [...s.selectedJobIds, id],
        })),
      clearJobSelection: () => set({ selectedJobIds: [] }),

      addFiles: (names) => {
        const added: Job[] = names.map((fileName, i) => {
          const { seriesId, episode } = matchSeries(fileName);
          const series = SERIES.find((x) => x.id === seriesId);
          const id = `job-${Date.now()}-${i}`;
          toast.success("Đã thêm vào hàng đợi", { description: fileName });
          return {
            id,
            fileName,
            durationSec: 1800 + Math.round(Math.random() * 900),
            seriesId,
            episode,
            status: "queued" as const,
            stageIndex: 0,
            stageProgress: 0,
            etaSec: null,
            createdAt: new Date().toISOString(),
            flagCount: 0,
            cachedStages: [],
            stages: STAGES.map((st) => ({
              id: st.id,
              name: st.name,
              elapsedMs: 0,
              progress: 0,
              status: "pending" as const,
            })),
            errorMessage: null,
            errorHint: null,
            still: series?.cover ?? "/stills/sen-dock.jpg",
            logs: series
              ? [`Nhận diện · ${series.title} · Tập ${episode ?? "?"}`]
              : ["File lẻ · chưa gán bộ phim"],
          };
        });
        set((s) => ({ jobs: [...added, ...s.jobs] }));
      },

      startJob: (id) => {
        set((s) => ({
          jobs: s.jobs.map((j) =>
            j.id === id
              ? {
                  ...j,
                  status: "running",
                  etaSec: j.etaSec ?? 480,
                  logs: [`${stamp()} bắt đầu`, ...j.logs].slice(0, 40),
                }
              : j,
          ),
        }));
        toast.message("Đã bắt đầu", { description: get().jobs.find((j) => j.id === id)?.fileName });
      },
      pauseJob: (id) =>
        set((s) => ({
          jobs: s.jobs.map((j) =>
            j.id === id
              ? { ...j, status: "paused", logs: [`${stamp()} tạm dừng`, ...j.logs].slice(0, 40) }
              : j,
          ),
        })),
      resumeJob: (id) => get().startJob(id),
      cancelJob: (id) =>
        set((s) => ({
          jobs: s.jobs.map((j) =>
            j.id === id
              ? {
                  ...j,
                  status: "queued",
                  stageProgress: 0,
                  logs: [`${stamp()} đã huỷ`, ...j.logs].slice(0, 40),
                }
              : j,
          ),
        })),
      deleteJob: (id, wipeCache) => {
        set((s) => ({
          jobs: s.jobs.filter((j) => j.id !== id),
          selectedJobIds: s.selectedJobIds.filter((x) => x !== id),
        }));
        toast("Đã xoá khỏi hàng đợi", {
          description: wipeCache ? "Đã xoá cả cache" : undefined,
        });
      },
      reorderJobs: (from, to) =>
        set((s) => {
          const next = s.jobs.slice();
          const [item] = next.splice(from, 1);
          if (!item) return s;
          next.splice(to, 0, item);
          return { jobs: next };
        }),
      retryStage: (jobId, stageId) => {
        const idx = STAGES.findIndex((s) => s.id === stageId);
        set((s) => ({
          jobs: s.jobs.map((j) => {
            if (j.id !== jobId) return j;
            const stages = j.stages.map((st, i) =>
              i < idx
                ? st
                : i === idx
                  ? { ...st, status: "running" as const, progress: 8, elapsedMs: 0 }
                  : { ...st, status: "pending" as const, progress: 0 },
            );
            return {
              ...j,
              status: "running",
              stageIndex: idx,
              stageProgress: 8,
              stages,
              errorMessage: null,
              errorHint: null,
              logs: [`${stamp()} chạy lại từ ${STAGES[idx]?.name}`, ...j.logs].slice(0, 40),
            };
          }),
        }));
        toast.success("Chạy lại bước", { description: STAGES[idx]?.name });
      },
      applyJobToSeries: (jobId) => {
        const job = get().jobs.find((j) => j.id === jobId);
        if (!job?.seriesId) return;
        toast.success("Đã áp dụng cài đặt cho cả bộ", {
          description: SERIES.find((s) => s.id === job.seriesId)?.title,
        });
      },
      bulk: (action) => {
        const ids = get().selectedJobIds;
        if (ids.length === 0) return;
        if (action === "start") ids.forEach((id) => get().startJob(id));
        if (action === "cancel") ids.forEach((id) => get().cancelJob(id));
        if (action === "delete")
          set((s) => ({
            jobs: s.jobs.filter((j) => !ids.includes(j.id)),
            selectedJobIds: [],
          }));
      },
      tick: () =>
        set((s) => {
          let changed = false;
          const jobs = s.jobs.map((j) => {
            if (j.status !== "running") return j;
            changed = true;
            let stageIndex = j.stageIndex;
            let stageProgress = j.stageProgress + 3 + Math.random() * 4;
            let status: JobStatus = "running";
            const stages = j.stages.map((st) => ({ ...st }));
            const current = stages[stageIndex];
            if (current) {
              current.status = "running";
              current.progress = Math.min(100, stageProgress);
              current.elapsedMs += 800;
            }
            const logs = j.logs.slice();
            if (stageProgress >= 100) {
              if (current) {
                current.status = "done";
                current.progress = 100;
              }
              stageProgress = 4;
              stageIndex += 1;
              if (stageIndex >= STAGES.length) {
                const flags = recountFlags(s.cues, j.id);
                status = flags > 0 ? "review" : "done";
                stageIndex = STAGES.length - 1;
                stageProgress = 100;
                logs.unshift(`${stamp()} hoàn tất`);
                queueMicrotask(() =>
                  toast.success(flags ? "Xong — còn cờ cần xem" : "Job hoàn tất", {
                    description: j.fileName,
                  }),
                );
              } else {
                const next = stages[stageIndex];
                if (next) next.status = "running";
                logs.unshift(`${stamp()} ${STAGES[stageIndex]?.name}`);
              }
            }
            const remainingStages = Math.max(0, STAGES.length - stageIndex - stageProgress / 100);
            return {
              ...j,
              status,
              stageIndex,
              stageProgress: Math.min(100, stageProgress),
              stages,
              etaSec: status === "running" ? Math.round(remainingStages * 90) : null,
              flagCount: status === "review" || status === "done" ? recountFlags(s.cues, j.id) : j.flagCount,
              logs: logs.slice(0, 40),
            };
          });
          return changed ? { jobs } : s;
        }),

      selectCue: (selectedCueId) => {
        const cue = get().cues.find((c) => c.id === selectedCueId);
        set({
          selectedCueId,
          playheadMs: cue ? cue.startMs : get().playheadMs,
        });
      },
      setPlaying: (playing) => set({ playing }),
      setPlayhead: (playheadMs) => set({ playheadMs }),
      setPreviewTrack: (previewTrack) => set({ previewTrack }),
      setCueFilter: (cueFilter) => set({ cueFilter }),
      setCueQuery: (cueQuery) => set({ cueQuery }),
      updateCue: (id, patch) =>
        set((s) => {
          const cues = s.cues.map((c) => {
            if (c.id !== id) return c;
            const flags = new Set(c.flags);
            flags.add("edited");
            return { ...c, ...patch, flags: Array.from(flags) };
          });
          const cue = cues.find((c) => c.id === id);
          const jobs = cue
            ? s.jobs.map((j) =>
                j.id === cue.jobId ? { ...j, flagCount: recountFlags(cues, j.id) } : j,
              )
            : s.jobs;
          return { cues, jobs };
        }),
      splitCue: (id) =>
        set((s) => {
          const idx = s.cues.findIndex((c) => c.id === id);
          const cue = s.cues[idx];
          if (!cue) return s;
          const mid = Math.round((cue.startMs + cue.endMs) / 2);
          const a: Cue = { ...cue, endMs: mid, translation: cue.translation.slice(0, Math.ceil(cue.translation.length / 2)) };
          const b: Cue = {
            ...cue,
            id: `${cue.id}-b`,
            index: cue.index + 0.5,
            startMs: mid,
            original: cue.original,
            translation: cue.translation.slice(Math.ceil(cue.translation.length / 2)),
            flags: [...cue.flags, "edited"],
          };
          const cues = s.cues.slice();
          cues.splice(idx, 1, a, b);
          const jobCues = cues.filter((c) => c.jobId === cue.jobId).sort((x, y) => x.startMs - y.startMs);
          jobCues.forEach((c, i) => {
            c.index = i + 1;
          });
          toast.message("Đã tách cue");
          return { cues };
        }),
      mergeCue: (id) =>
        set((s) => {
          const jobCues = s.cues.filter((c) => {
            const src = s.cues.find((x) => x.id === id);
            return src && c.jobId === src.jobId;
          });
          const cue = s.cues.find((c) => c.id === id);
          if (!cue) return s;
          const next = jobCues.find((c) => c.index === cue.index + 1);
          if (!next) return s;
          const merged: Cue = {
            ...cue,
            endMs: next.endMs,
            original: `${cue.original} ${next.original}`,
            translation: `${cue.translation} ${next.translation}`,
            flags: Array.from(new Set([...cue.flags, ...next.flags, "edited" as FlagKind])),
          };
          const cues = s.cues.filter((c) => c.id !== next.id).map((c) => (c.id === id ? merged : c));
          toast.message("Đã gộp hai cue");
          return { cues };
        }),
      regenerateCue: (id) => {
        toast.loading("Đang tạo lại giọng…", { id: `tts-${id}` });
        window.setTimeout(() => {
          set((s) => ({
            cues: s.cues.map((c) =>
              c.id === id
                ? {
                    ...c,
                    flags: c.flags.filter((f) => f !== "tts-fail" && f !== "stretch"),
                    stretch: Math.min(c.stretch, 1.08),
                  }
                : c,
            ),
          }));
          toast.success("Đã tạo lại giọng", { id: `tts-${id}` });
        }, 900);
      },
      retranslateCue: (id) => {
        const cue = get().cues.find((c) => c.id === id);
        if (!cue) return;
        const refined = cue.translation.replace(/\s+/g, " ").replace(/,$/, ".");
        get().updateCue(id, {
          translation: refined,
          flags: cue.flags.filter((f) => f !== "shortened"),
        });
        toast.success("Đã dịch lại cue");
      },
      nextFlag: (jobId) => {
        const { cues, selectedCueId, cueFilter } = get();
        const list = cues
          .filter((c) => c.jobId === jobId)
          .filter((c) =>
            cueFilter === "all" || cueFilter === "flagged"
              ? c.flags.length > 0
              : c.flags.includes(cueFilter),
          )
          .sort((a, b) => a.index - b.index);
        if (list.length === 0) return;
        const cur = list.findIndex((c) => c.id === selectedCueId);
        const next = list[(cur + 1) % list.length];
        if (next) get().selectCue(next.id);
      },
      findReplace: (jobId, find, replace) => {
        if (!find) return;
        let n = 0;
        set((s) => ({
          cues: s.cues.map((c) => {
            if (c.jobId !== jobId || !c.translation.includes(find)) return c;
            n += 1;
            return {
              ...c,
              translation: c.translation.split(find).join(replace),
              flags: Array.from(new Set([...c.flags, "edited" as FlagKind])),
            };
          }),
        }));
        toast.success(`Đã thay ${n} chỗ`);
      },

      addGlossary: (entry) =>
        set((s) => ({
          glossary: [
            { ...entry, id: `g-${Date.now()}` },
            ...s.glossary,
          ],
        })),
      updateGlossary: (id, patch) =>
        set((s) => ({
          glossary: s.glossary.map((g) => (g.id === id ? { ...g, ...patch } : g)),
        })),
      deleteGlossary: (id) =>
        set((s) => ({ glossary: s.glossary.filter((g) => g.id !== id) })),
      acceptPending: (id) =>
        set((s) => ({
          glossary: s.glossary.map((g) => (g.id === id ? { ...g, pending: false } : g)),
        })),
      rejectPending: (id) =>
        set((s) => ({ glossary: s.glossary.filter((g) => g.id !== id) })),
      assignVoice: (characterId, voiceId) => {
        const ch = CHARACTERS.find((c) => c.id === characterId);
        if (ch) ch.voiceId = voiceId;
        set((s) => ({
          cues: s.cues.map((c) => (c.characterId === characterId ? { ...c, voiceId } : c)),
        }));
        toast.success("Đã gán giọng cho nhân vật");
      },
      toggleFavorite: (voiceId) =>
        set((s) => ({
          voices: s.voices.map((v) =>
            v.id === voiceId ? { ...v, favorite: !v.favorite } : v,
          ),
        })),
      downloadModel: (id) => {
        toast.loading("Đang tải model…", { id: `mdl-${id}` });
        let p = 0;
        const t = window.setInterval(() => {
          p += 18;
          set((s) => ({
            models: s.models.map((m) =>
              m.id === id ? { ...m, progress: Math.min(100, p), downloaded: p >= 100 } : m,
            ),
          }));
          if (p >= 100) {
            window.clearInterval(t);
            toast.success("Đã tải model", { id: `mdl-${id}` });
          }
        }, 280);
      },
    }),
    {
      name: "long-studio",
      partialize: (s) => ({
        settings: s.settings,
        onboarding: s.onboarding,
        voices: s.voices,
        glossary: s.glossary,
      }),
    },
  ),
);

function stamp() {
  const d = new Date();
  return [d.getHours(), d.getMinutes(), d.getSeconds()]
    .map((n) => n.toString().padStart(2, "0"))
    .join(":");
}

export function useJob(id: string | undefined) {
  return useAppStore((s) => s.jobs.find((j) => j.id === id));
}

export function seriesTitle(id: string | null) {
  if (!id) return "File lẻ";
  return SERIES.find((s) => s.id === id)?.title ?? "Không rõ";
}

export function characterName(id: string) {
  return CHARACTERS.find((c) => c.id === id)?.name ?? id;
}

export function voiceName(id: string) {
  return VOICES.find((v) => v.id === id)?.name ?? id;
}
