import { useState } from "react";
import { Check, CircleAlert, Play } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { DOCTOR_CHECKS } from "@/lib/data";
import { useAppStore } from "@/lib/store";

export function DoctorView() {
  const addFiles = useAppStore((s) => s.addFiles);
  const startJob = useAppStore((s) => s.startJob);
  const jobs = useAppStore((s) => s.jobs);
  const [wizard, setWizard] = useState(false);
  const [step, setStep] = useState(0);
  const [probe, setProbe] = useState<"idle" | "run" | "done">("idle");

  function runSample() {
    setProbe("run");
    toast.message("Chạy thử clip 10 giây…");
    window.setTimeout(() => {
      const existing = jobs.find((j) => j.fileName.includes("clip-thu"));
      if (existing) startJob(existing.id);
      else addFiles(["clip-thu-10s.mp4"]);
      setProbe("done");
      toast.success("Clip mẫu chạy xong — máy đạt.");
    }, 1400);
  }

  return (
    <div className="h-full overflow-auto scroll-thin p-4">
      <h1 className="font-display text-xl tracking-tight">Chẩn đoán hệ thống</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Kiểm tra ffmpeg, GPU, model, CapCut và quyền ghi trước khi chạy bộ phim.
      </p>
      <ul className="mt-6 max-w-2xl divide-y divide-border rounded-lg border border-border">
        {DOCTOR_CHECKS.map((c) => (
          <li key={c.id} className="flex items-start gap-3 p-4">
            {c.ok ? (
              <Check className="mt-0.5 size-4 text-success" />
            ) : (
              <CircleAlert className="mt-0.5 size-4 text-flag-danger" />
            )}
            <div>
              <p className="text-sm font-medium">{c.label}</p>
              <p className="text-xs text-muted-foreground">{c.detail}</p>
              {!c.ok && c.fix && <p className="mt-1 text-xs">{c.fix}</p>}
              {c.id === "models" && c.fix && (
                <p className="mt-1 text-xs text-muted-foreground">{c.fix}</p>
              )}
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-6 flex flex-wrap gap-2">
        <Button onClick={runSample} disabled={probe === "run"}>
          <Play className="size-4" />
          {probe === "run" ? "Đang chạy thử…" : probe === "done" ? "Chạy lại clip mẫu" : "Chạy thử clip 10 giây"}
        </Button>
        <Button variant="outline" onClick={() => { setWizard(true); setStep(0); }}>
          Wizard lần đầu
        </Button>
      </div>
      {wizard && (
        <div className="mt-6 max-w-lg rounded-lg border border-border bg-card p-5">
          <p className="text-2xs tabular text-muted-foreground">
            Bước {step + 1} / 4
          </p>
          <h2 className="font-display mt-1 text-xl">
            {["Dò máy", "Chọn profile", "Tải model", "Chạy thử"][step]}
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {
              [
                "RTX 4070 · 12.2 GB · ffmpeg 7.1.1. Máy đủ cho profile Cao.",
                "Profile Cao: Whisper large-v3, Demucs, Gemini dịch. Có thể hạ xuống Trung bình nếu VRAM căng.",
                "4/5 model đã có. NLLB-200 chỉ cần khi dịch local.",
                "Clip 10 giây sẽ chạy hết 9 bước. Nếu xong là máy sẵn sàng.",
              ][step]
            }
          </p>
          {step === 2 && <Progress className="mt-4" value={80} />}
          <div className="mt-5 flex justify-end gap-2">
            <Button variant="ghost" onClick={() => setWizard(false)}>
              Đóng
            </Button>
            <Button
              onClick={() => {
                if (step === 3) {
                  runSample();
                  setWizard(false);
                } else setStep(step + 1);
              }}
            >
              {step === 3 ? "Chạy thử" : "Tiếp"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
