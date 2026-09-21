import type { FlagKind, StageId } from "./types";

export const APP_NAME = "Lồng";
export const APP_TAGLINE = "Studio lồng tiếng";

export const STAGES: { id: StageId; name: string; short: string }[] = [
  { id: "ingest", name: "Đọc video", short: "Đọc" },
  { id: "separate", name: "Tách nhạc nền", short: "Tách nhạc" },
  { id: "asr", name: "Nhận diện lời thoại", short: "ASR" },
  { id: "segment", name: "Phân đoạn câu", short: "Phân đoạn" },
  { id: "translate", name: "Dịch tiếng Việt", short: "Dịch" },
  { id: "tts", name: "Tạo giọng nói", short: "TTS" },
  { id: "fit", name: "Khớp thời lượng", short: "Khớp" },
  { id: "mix", name: "Trộn âm thanh", short: "Trộn" },
  { id: "export", name: "Xuất video", short: "Xuất" },
];

export const FLAG_META: Record<
  FlagKind,
  { label: string; hint: string; tone: "danger" | "warn" | "caution" | "edit" }
> = {
  stretch: {
    label: "Nén quá mức",
    hint: "Giọng phải nén > 1.15× — sẽ nghe nhanh bất thường",
    tone: "danger",
  },
  "tts-fail": {
    label: "TTS lỗi",
    hint: "Không tổng hợp được giọng cho cue này",
    tone: "danger",
  },
  "asr-low": {
    label: "ASR thấp",
    hint: "Độ tin cậy nhận diện thấp — có thể nghe nhầm",
    tone: "warn",
  },
  shortened: {
    label: "Dịch rút gọn",
    hint: "Bản dịch bị rút gọn tự động — nên đọc lại",
    tone: "warn",
  },
  overlap: {
    label: "Chồng lời",
    hint: "Hai nhân vật nói chồng lên nhau",
    tone: "caution",
  },
  delayed: {
    label: "Bị đẩy trễ",
    hint: "Cue bị đẩy trễ so với mốc gốc",
    tone: "caution",
  },
  edited: {
    label: "Đã sửa tay",
    hint: "Nội dung đã được chỉnh thủ công",
    tone: "edit",
  },
};

export const FLAG_ORDER: FlagKind[] = [
  "stretch",
  "tts-fail",
  "asr-low",
  "shortened",
  "overlap",
  "delayed",
  "edited",
];

export const STATUS_LABEL: Record<string, string> = {
  queued: "Chờ",
  running: "Đang chạy",
  paused: "Tạm dừng",
  done: "Xong",
  error: "Lỗi",
  review: "Cần xem lại",
};

export const SHORTCUTS = [
  { keys: "Space", action: "Phát / dừng" },
  { keys: "↑ ↓", action: "Chuyển cue" },
  { keys: "Enter", action: "Sửa lời dịch" },
  { keys: "Esc", action: "Thoát sửa" },
  { keys: "Ctrl+Enter", action: "Tạo lại giọng" },
  { keys: "N", action: "Cờ tiếp theo" },
  { keys: "Ctrl+S", action: "Lưu" },
  { keys: "Ctrl+K", action: "Command palette" },
];
