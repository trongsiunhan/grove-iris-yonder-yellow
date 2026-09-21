import { useState } from "react";
import { createPortal } from "react-dom";
import { Button } from "@/components/ui/button";
import { Mark } from "@/components/mark";
import { useAppStore } from "@/lib/store";

const STEPS = [
  {
    title: "Thả video vào hàng đợi",
    body: "Kéo file, chọn thư mục, hoặc dán URL. Lồng nhận diện bộ phim và số tập từ tên file.",
  },
  {
    title: "Chín bước, một pipeline",
    body: "Từ đọc video đến xuất file. Cache từng bước — sửa dịch không phải chạy lại ASR.",
  },
  {
    title: "Sửa cue, không sửa cả tập",
    body: "Trình sửa timeline đánh cờ những câu lệch nhịp, ASR thấp, hay bị nén quá mức. Nghe thử rồi tạo lại một câu trong vài giây.",
  },
  {
    title: "Nhất quán cả bộ",
    body: "Glossary giữ tên nhân vật. Giọng gán một lần, áp cho mọi tập.",
  },
];

export function Onboarding() {
  const open = useAppStore((s) => s.onboarding);
  const setOpen = useAppStore((s) => s.setOnboarding);
  const hydrated = useAppStore((s) => s.hydrated);
  const [i, setI] = useState(0);
  if (!open || !hydrated) return null;
  const step = STEPS[i];
  if (!step || typeof document === "undefined") return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-background/80 p-4 sm:items-center">
      <div className="relative w-full max-w-md overflow-hidden rounded-xl border border-border bg-card p-6 shadow-lg">
        <div className="mb-5 flex items-center gap-2 text-muted-foreground">
          <Mark className="size-5" />
          <span className="text-2xs tracking-[0.18em] uppercase">Lồng</span>
        </div>
        <p className="text-2xs tabular-nums text-muted-foreground">
          {String(i + 1).padStart(2, "0")} / {String(STEPS.length).padStart(2, "0")}
        </p>
        <h2 className="font-display mt-2 text-2xl font-medium tracking-tight">{step.title}</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
        <div className="mt-6 flex items-center justify-between">
          <button
            type="button"
            className="text-xs text-muted-foreground hover:text-foreground"
            onClick={() => setOpen(false)}
          >
            Bỏ qua
          </button>
          <div className="flex gap-2">
            {i > 0 && (
              <Button variant="ghost" onClick={() => setI(i - 1)}>
                Trước
              </Button>
            )}
            <Button
              onClick={() => {
                if (i === STEPS.length - 1) setOpen(false);
                else setI(i + 1);
              }}
            >
              {i === STEPS.length - 1 ? "Bắt đầu" : "Tiếp"}
            </Button>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
