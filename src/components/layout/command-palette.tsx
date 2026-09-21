import { useNavigate } from "@tanstack/react-router";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useAppStore } from "@/lib/store";
import { STAGES } from "@/lib/constants";
import { Clapperboard, ListTodo, Mic, Settings, Stethoscope } from "lucide-react";

export function CommandPalette() {
  const open = useAppStore((s) => s.commandOpen);
  const setOpen = useAppStore((s) => s.setCommandOpen);
  const jobs = useAppStore((s) => s.jobs);
  const series = useAppStore((s) => s.series);
  const navigate = useNavigate();

  function go(to: string) {
    setOpen(false);
    void navigate({ to });
  }

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Nhảy tới job, bộ phim, cài đặt…" />
      <CommandList>
        <CommandEmpty>Không tìm thấy.</CommandEmpty>
        <CommandGroup heading="Màn hình">
          <CommandItem onSelect={() => go("/")}>
            <ListTodo className="size-4" /> Hàng đợi
          </CommandItem>
          <CommandItem onSelect={() => go("/series")}>
            <Clapperboard className="size-4" /> Thư viện bộ phim
          </CommandItem>
          <CommandItem onSelect={() => go("/voices")}>
            <Mic className="size-4" /> Thư viện giọng
          </CommandItem>
          <CommandItem onSelect={() => go("/settings")}>
            <Settings className="size-4" /> Cài đặt
          </CommandItem>
          <CommandItem onSelect={() => go("/doctor")}>
            <Stethoscope className="size-4" /> Chẩn đoán
          </CommandItem>
        </CommandGroup>
        <CommandGroup heading="Job">
          {jobs.map((j) => (
            <CommandItem key={j.id} onSelect={() => go(`/jobs/${j.id}`)}>
              {j.fileName}
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandGroup heading="Bộ phim">
          {series.map((s) => (
            <CommandItem key={s.id} onSelect={() => go(`/series?id=${s.id}`)}>
              {s.title}
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandGroup heading="Pipeline">
          {STAGES.map((st) => (
            <CommandItem key={st.id} onSelect={() => go(`/settings?tab=quality`)}>
              {st.name}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
