import { useMemo, useState } from "react";
import { Star } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { useAppStore } from "@/lib/store";
import type { VoiceAge, VoiceGender } from "@/lib/types";
import { cn } from "@/lib/utils";

export function VoicesView() {
  const voices = useAppStore((s) => s.voices);
  const toggle = useAppStore((s) => s.toggleFavorite);
  const [gender, setGender] = useState<VoiceGender | "all">("all");
  const [age, setAge] = useState<VoiceAge | "all">("all");
  const [q, setQ] = useState("");
  const [sample, setSample] = useState("Người ở lại, sen vẫn nở trên sông.");
  const [rate, setRate] = useState([100]);
  const [pitch, setPitch] = useState([0]);
  const [playing, setPlaying] = useState<string | null>(null);

  const list = useMemo(
    () =>
      voices.filter((v) => {
        if (gender !== "all" && v.gender !== gender) return false;
        if (age !== "all" && v.age !== age) return false;
        if (q && !`${v.name} ${v.style}`.toLowerCase().includes(q.toLowerCase())) return false;
        return true;
      }),
    [voices, gender, age, q],
  );

  function preview(id: string, name: string) {
    setPlaying(id);
    toast.message(`Nghe thử · ${name}`, { description: sample });
    window.setTimeout(() => setPlaying(null), 1600);
  }

  return (
    <div className="flex h-full min-h-0 flex-col">
      <header className="border-b border-border px-4 py-3">
        <h1 className="font-display text-xl tracking-tight">Thư viện giọng</h1>
        <p className="text-xs text-muted-foreground">CapCut TTS · lọc, nghe thử, gán vào nhân vật.</p>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Tìm giọng" className="h-8 max-w-48" />
          {(["all", "female", "male", "child"] as const).map((g) => (
            <button
              key={g}
              type="button"
              onClick={() => setGender(g)}
              className={cn(
                "rounded-full px-3 py-1 text-xs",
                gender === g ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground",
              )}
            >
              {g === "all" ? "Tất cả" : g === "female" ? "Nữ" : g === "male" ? "Nam" : "Trẻ em"}
            </button>
          ))}
          {(["all", "young", "adult", "elder"] as const).map((a) => (
            <button
              key={a}
              type="button"
              onClick={() => setAge(a)}
              className={cn(
                "rounded-full px-3 py-1 text-xs",
                age === a ? "bg-secondary text-foreground" : "text-muted-foreground",
              )}
            >
              {a === "all" ? "Mọi tuổi" : a === "young" ? "Trẻ" : a === "adult" ? "Trưởng thành" : "Già"}
            </button>
          ))}
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-4">
          <Input value={sample} onChange={(e) => setSample(e.target.value)} className="h-8 max-w-md" />
          <label className="flex items-center gap-2 text-xs text-muted-foreground">
            Tốc độ
            <Slider className="w-24" value={rate} min={70} max={130} onValueChange={setRate} />
          </label>
          <label className="flex items-center gap-2 text-xs text-muted-foreground">
            Cao độ
            <Slider className="w-24" value={pitch} min={-6} max={6} onValueChange={setPitch} />
          </label>
        </div>
      </header>
      <ul className="min-h-0 flex-1 overflow-auto scroll-thin divide-y divide-border">
        {list.map((v) => (
          <li key={v.id} className="flex items-center gap-3 px-4 py-3">
            <button
              type="button"
              onClick={() => toggle(v.id)}
              className={cn("text-muted-foreground", v.favorite && "text-foreground")}
              aria-label="Yêu thích"
            >
              <Star className={cn("size-4", v.favorite && "fill-current")} />
            </button>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium">{v.name}</p>
                <Badge variant="outline">
                  {v.gender === "female" ? "Nữ" : v.gender === "male" ? "Nam" : "Trẻ"}
                </Badge>
                <span className="text-xs text-muted-foreground">{v.style}</span>
              </div>
              <p className="truncate text-xs text-muted-foreground">{v.sample}</p>
            </div>
            <Button size="sm" variant={playing === v.id ? "default" : "outline"} onClick={() => preview(v.id, v.name)}>
              {playing === v.id ? "Đang phát" : "Nghe thử"}
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}
