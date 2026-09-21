import type { ReactNode } from "react";
import { useSearch } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { useAppStore } from "@/lib/store";
import type { SettingsTab } from "@/lib/types";

export function SettingsView() {
  const settings = useAppStore((s) => s.settings);
  const patch = useAppStore((s) => s.patchSettings);
  const models = useAppStore((s) => s.models);
  const download = useAppStore((s) => s.downloadModel);
  const search = useSearch({ strict: false }) as { tab?: SettingsTab };
  const defaultTab = search.tab ?? "general";

  return (
    <div className="h-full overflow-auto scroll-thin p-4">
      <h1 className="font-display text-xl tracking-tight">Cài đặt</h1>
      <Tabs defaultValue={defaultTab} className="mt-4">
        <TabsList className="flex flex-wrap">
          <TabsTrigger value="general">Chung</TabsTrigger>
          <TabsTrigger value="models">Model</TabsTrigger>
          <TabsTrigger value="quality">Chất lượng</TabsTrigger>
          <TabsTrigger value="subtitles">Phụ đề</TabsTrigger>
          <TabsTrigger value="export">Xuất file</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="mt-6 max-w-xl space-y-5">
          <Field label="Thư mục xuất">
            <Input value={settings.exportDir} onChange={(e) => patch({ exportDir: e.target.value })} />
          </Field>
          <Field label="Thư mục cache">
            <Input value={settings.cacheDir} onChange={(e) => patch({ cacheDir: e.target.value })} />
          </Field>
          <Field label="Ngôn ngữ giao diện">
            <Select value={settings.locale} onValueChange={(v) => patch({ locale: v as "vi" | "en" })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="vi">Tiếng Việt</SelectItem>
                <SelectItem value="en">English</SelectItem>
              </SelectContent>
            </Select>
          </Field>
          <Field label="Giao diện">
            <Select value={settings.theme} onValueChange={(v) => useAppStore.getState().setTheme(v as "dark" | "light")}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dark">Tối</SelectItem>
                <SelectItem value="light">Sáng</SelectItem>
              </SelectContent>
            </Select>
          </Field>
          <Field label={`Job song song · ${settings.parallelJobs}`}>
            <Slider
              min={1}
              max={4}
              value={[settings.parallelJobs]}
              onValueChange={([v]) => patch({ parallelJobs: v ?? 1 })}
            />
          </Field>
          <Field label={`Dung lượng cache · ${settings.cacheGb} GB`}>
            <Slider
              min={8}
              max={256}
              value={[settings.cacheGb]}
              onValueChange={([v]) => patch({ cacheGb: v ?? 64 })}
            />
          </Field>
          <Button variant="outline" onClick={() => toast.success("Đã dọn 12.4 GB cache cũ")}>
            Dọn cache
          </Button>
        </TabsContent>

        <TabsContent value="models" className="mt-6 max-w-2xl space-y-5">
          <p className="text-sm text-muted-foreground">GPU phát hiện: RTX 4070 · 12.2 GB VRAM · CUDA 12.6</p>
          <Field label="Profile chất lượng">
            <Select
              value={settings.qualityProfile}
              onValueChange={(v) => patch({ qualityProfile: v as typeof settings.qualityProfile })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="high">Cao — large-v3, Demucs, NLLB</SelectItem>
                <SelectItem value="medium">Trung bình</SelectItem>
                <SelectItem value="light">Nhẹ — máy yếu</SelectItem>
              </SelectContent>
            </Select>
          </Field>
          <ul className="divide-y divide-border rounded-md border border-border">
            {models.map((m) => (
              <li key={m.id} className="flex items-center gap-3 p-3">
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium">{m.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {m.step} · {m.sizeGb} GB · {m.downloaded ? "đã tải" : "chưa tải"}
                  </p>
                  {!m.downloaded && m.progress > 0 && <Progress className="mt-2" value={m.progress} />}
                </div>
                {m.downloaded ? (
                  <Button size="sm" variant="ghost">
                    Xoá
                  </Button>
                ) : (
                  <Button size="sm" onClick={() => download(m.id)}>
                    Tải
                  </Button>
                )}
              </li>
            ))}
          </ul>
          <div className="flex items-center justify-between">
            <Label>NVDEC / NVENC</Label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 text-sm">
                NVDEC <Switch checked={settings.nvdec} onCheckedChange={(v) => patch({ nvdec: v })} />
              </label>
              <label className="flex items-center gap-2 text-sm">
                NVENC <Switch checked={settings.nvenc} onCheckedChange={(v) => patch({ nvenc: v })} />
              </label>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="quality" className="mt-6 max-w-xl space-y-5">
          <Row label="Tách nhạc nền">
            <Switch checked={settings.separateBg} onCheckedChange={(v) => patch({ separateBg: v })} />
          </Row>
          <Field label={`Tốc độ nói · ${settings.speechRate.toFixed(1)} âm tiết/giây`}>
            <Slider
              min={4}
              max={8}
              step={0.1}
              value={[settings.speechRate]}
              onValueChange={([v]) => patch({ speechRate: v ?? 5.8 })}
            />
          </Field>
          <Field label={`Nén tối đa · ${settings.maxStretch.toFixed(2)}×`}>
            <Slider
              min={1}
              max={1.4}
              step={0.01}
              value={[settings.maxStretch]}
              onValueChange={([v]) => patch({ maxStretch: v ?? 1.15 })}
            />
          </Field>
          <Row label="Rút gọn bản dịch tự động">
            <Switch checked={settings.autoShorten} onCheckedChange={(v) => patch({ autoShorten: v })} />
          </Row>
          <Field label={`Đẩy trễ cue tối đa · ${settings.maxDelayMs} ms`}>
            <Slider
              min={0}
              max={400}
              value={[settings.maxDelayMs]}
              onValueChange={([v]) => patch({ maxDelayMs: v ?? 180 })}
            />
          </Field>
          <Field label={`Ngưỡng ASR thấp · ${settings.asrThreshold.toFixed(2)}`}>
            <Slider
              min={0.4}
              max={0.95}
              step={0.01}
              value={[settings.asrThreshold]}
              onValueChange={([v]) => patch({ asrThreshold: v ?? 0.72 })}
            />
          </Field>
          <Field label="Nguồn dịch">
            <Select
              value={settings.translateSource}
              onValueChange={(v) => patch({ translateSource: v as typeof settings.translateSource })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="gemini">Gemini web</SelectItem>
                <SelectItem value="local">LLM local</SelectItem>
              </SelectContent>
            </Select>
          </Field>
        </TabsContent>

        <TabsContent value="subtitles" className="mt-6 grid max-w-3xl gap-6 lg:grid-cols-2">
          <div className="space-y-5">
            <Row label="Bật phụ đề">
              <Switch checked={settings.subtitlesEnabled} onCheckedChange={(v) => patch({ subtitlesEnabled: v })} />
            </Row>
            <Field label="Font">
              <Input value={settings.subFont} onChange={(e) => patch({ subFont: e.target.value })} />
            </Field>
            <Field label={`Cỡ chữ · ${settings.subSize}`}>
              <Slider min={24} max={72} value={[settings.subSize]} onValueChange={([v]) => patch({ subSize: v ?? 42 })} />
            </Field>
            <Field label="Màu chữ">
              <Input type="color" value={settings.subColor} onChange={(e) => patch({ subColor: e.target.value })} className="h-9 w-16 p-1" />
            </Field>
            <Field label="Màu viền">
              <Input type="color" value={settings.subOutline} onChange={(e) => patch({ subOutline: e.target.value })} className="h-9 w-16 p-1" />
            </Field>
            <Field label={`Độ dày viền · ${settings.subOutlineWidth}`}>
              <Slider min={0} max={8} value={[settings.subOutlineWidth]} onValueChange={([v]) => patch({ subOutlineWidth: v ?? 3 })} />
            </Field>
            <Row label="Đổ bóng">
              <Switch checked={settings.subShadow} onCheckedChange={(v) => patch({ subShadow: v })} />
            </Row>
            <Row label="Màu theo nhân vật">
              <Switch checked={settings.subByCharacter} onCheckedChange={(v) => patch({ subByCharacter: v })} />
            </Row>
            <Field label={`Lề dưới · ${settings.subMargin}px`}>
              <Slider min={16} max={160} value={[settings.subMargin]} onValueChange={([v]) => patch({ subMargin: v ?? 64 })} />
            </Field>
          </div>
          <div className="relative aspect-video overflow-hidden rounded-lg bg-secondary">
            <img src="/stills/sen-dock.jpg" alt="" className="size-full object-cover" />
            {settings.subtitlesEnabled && (
              <p
                className="absolute inset-x-0 text-center"
                style={{
                  bottom: settings.subMargin / 4,
                  fontFamily: settings.subFont,
                  fontSize: settings.subSize / 3,
                  color: settings.subColor,
                  textShadow: settings.subShadow
                    ? `0 0 ${settings.subOutlineWidth}px ${settings.subOutline}`
                    : undefined,
                }}
              >
                Mộ Thanh, ngươi còn nhớ hoa sen năm ấy không?
              </p>
            )}
          </div>
        </TabsContent>

        <TabsContent value="export" className="mt-6 max-w-xl space-y-5">
          <Field label="Chế độ phụ đề">
            <Select value={settings.exportMode} onValueChange={(v) => patch({ exportMode: v as typeof settings.exportMode })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sidecar">Phụ đề rời (nhanh)</SelectItem>
                <SelectItem value="burn">Nhúng cứng (chậm)</SelectItem>
              </SelectContent>
            </Select>
          </Field>
          <Field label="Định dạng">
            <Select value={settings.exportFormat} onValueChange={(v) => patch({ exportFormat: v as typeof settings.exportFormat })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mkv">MKV</SelectItem>
                <SelectItem value="mp4">MP4</SelectItem>
              </SelectContent>
            </Select>
          </Field>
          <Field label="Encoder">
            <Select value={settings.encoder} onValueChange={(v) => patch({ encoder: v as typeof settings.encoder })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="nvenc">NVENC</SelectItem>
                <SelectItem value="x264">x264</SelectItem>
              </SelectContent>
            </Select>
          </Field>
          <Field label={`CQ · ${settings.cq}`}>
            <Slider min={12} max={28} value={[settings.cq]} onValueChange={([v]) => patch({ cq: v ?? 18 })} />
          </Field>
          <Field label={`LUFS · ${settings.lufs}`}>
            <Slider min={-24} max={-12} value={[settings.lufs]} onValueChange={([v]) => patch({ lufs: v ?? -16 })} />
          </Field>
          <Row label="Giữ audio gốc như track phụ">
            <Switch checked={settings.keepOriginalTrack} onCheckedChange={(v) => patch({ keepOriginalTrack: v })} />
          </Row>
          <Field label="Mẫu tên file">
            <Input value={settings.fileNamePattern} onChange={(e) => patch({ fileNamePattern: e.target.value })} />
            <p className="mt-1 text-2xs text-muted-foreground">Biến: {"{bộ}"} {"{tập}"} {"{ngày}"}</p>
          </Field>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      {children}
    </div>
  );
}

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <Label>{label}</Label>
      {children}
    </div>
  );
}
