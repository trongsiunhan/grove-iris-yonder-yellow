export type JobStatus =
  | "queued"
  | "running"
  | "paused"
  | "done"
  | "error"
  | "review";

export type StageId =
  | "ingest"
  | "separate"
  | "asr"
  | "segment"
  | "translate"
  | "tts"
  | "fit"
  | "mix"
  | "export";

export type StageStatus = "pending" | "running" | "cached" | "done" | "error" | "skipped";

export type FlagKind =
  | "stretch"
  | "tts-fail"
  | "asr-low"
  | "shortened"
  | "overlap"
  | "delayed"
  | "edited";

export type VoiceGender = "male" | "female" | "child";
export type VoiceAge = "young" | "adult" | "elder";

export type GlossaryKind = "character" | "place" | "nickname" | "term";

export type SettingsTab =
  | "general"
  | "models"
  | "quality"
  | "subtitles"
  | "export";

export type JobTab = "progress" | "timeline" | "preview" | "report";

export type PreviewTrack = "original" | "dub" | "mix";

export type ThemeMode = "dark" | "light";

export interface PipelineStage {
  id: StageId;
  name: string;
  elapsedMs: number;
  progress: number;
  status: StageStatus;
}

export interface Job {
  id: string;
  fileName: string;
  durationSec: number;
  seriesId: string | null;
  episode: number | null;
  status: JobStatus;
  stageIndex: number;
  stageProgress: number;
  etaSec: number | null;
  createdAt: string;
  flagCount: number;
  cachedStages: StageId[];
  stages: PipelineStage[];
  errorMessage: string | null;
  errorHint: string | null;
  still: string;
  logs: string[];
}

export interface Character {
  id: string;
  seriesId: string;
  name: string;
  gender: VoiceGender;
  voiceId: string;
}

export interface Cue {
  id: string;
  jobId: string;
  index: number;
  startMs: number;
  endMs: number;
  characterId: string;
  original: string;
  translation: string;
  stretch: number;
  flags: FlagKind[];
  voiceId: string;
  asrConfidence: number;
  note: string;
}

export interface Series {
  id: string;
  title: string;
  englishTitle: string;
  episodeTotal: number;
  cover: string;
  year: number;
  synopsis: string;
}

export interface GlossaryEntry {
  id: string;
  seriesId: string;
  source: string;
  target: string;
  kind: GlossaryKind;
  pending?: boolean;
}

export interface Voice {
  id: string;
  name: string;
  gender: VoiceGender;
  age: VoiceAge;
  style: string;
  favorite: boolean;
  sample: string;
}

export interface AppSettings {
  exportDir: string;
  cacheDir: string;
  locale: "vi" | "en";
  theme: ThemeMode;
  parallelJobs: number;
  cacheGb: number;
  qualityProfile: "high" | "medium" | "light";
  nvdec: boolean;
  nvenc: boolean;
  separateBg: boolean;
  speechRate: number;
  maxStretch: number;
  autoShorten: boolean;
  maxDelayMs: number;
  asrThreshold: number;
  translateSource: "local" | "gemini";
  subtitlesEnabled: boolean;
  subFont: string;
  subSize: number;
  subColor: string;
  subOutline: string;
  subOutlineWidth: number;
  subShadow: boolean;
  subPosition: "bottom" | "top";
  subMargin: number;
  subByCharacter: boolean;
  maxLines: number;
  charsPerLine: number;
  exportMode: "burn" | "sidecar";
  exportFormat: "mp4" | "mkv";
  encoder: "nvenc" | "x264";
  cq: number;
  lufs: number;
  voiceBgRatio: number;
  keepOriginalTrack: boolean;
  fileNamePattern: string;
}

export interface ModelInfo {
  id: string;
  step: string;
  name: string;
  sizeGb: number;
  downloaded: boolean;
  progress: number;
}

export interface DoctorCheck {
  id: string;
  label: string;
  ok: boolean;
  detail: string;
  fix: string;
}
