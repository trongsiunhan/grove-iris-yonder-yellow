import { useEffect, useMemo, useState, type DragEvent } from "react";
import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import {
  Clapperboard,
  ListTodo,
  Menu,
  Mic,
  Search,
  Settings,
  Stethoscope,
  SunMoon,
} from "lucide-react";
import { Mark } from "@/components/mark";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Toaster } from "@/components/ui/sonner";
import { CommandPalette } from "./command-palette";
import { Onboarding } from "./onboarding";
import { useAppStore } from "@/lib/store";
import { STAGES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const NAV = [
  { to: "/", label: "Hàng đợi", icon: ListTodo },
  { to: "/series", label: "Bộ phim", icon: Clapperboard },
  { to: "/voices", label: "Giọng nói", icon: Mic },
  { to: "/settings", label: "Cài đặt", icon: Settings },
  { to: "/doctor", label: "Chẩn đoán", icon: Stethoscope },
] as const;

export function AppShell() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const tick = useAppStore((s) => s.tick);
  const theme = useAppStore((s) => s.settings.theme);
  const setTheme = useAppStore((s) => s.setTheme);
  const setCommandOpen = useAppStore((s) => s.setCommandOpen);
  const dropActive = useAppStore((s) => s.dropActive);
  const setDropActive = useAppStore((s) => s.setDropActive);
  const addFiles = useAppStore((s) => s.addFiles);
  const confirm = useAppStore((s) => s.confirm);
  const setConfirm = useAppStore((s) => s.setConfirm);
  const jobs = useAppStore((s) => s.jobs);
  const setHydrated = useAppStore((s) => s.setHydrated);
  const [mobileNav, setMobileNav] = useState(false);

  useEffect(() => {
    setHydrated();
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.classList.toggle("light", theme === "light");
  }, [theme, setHydrated]);

  useEffect(() => {
    const id = window.setInterval(() => tick(), 800);
    return () => window.clearInterval(id);
  }, [tick]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setCommandOpen(true);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setCommandOpen]);

  const running = jobs.filter((j) => j.status === "running").length;

  const gpu = useMemo(() => {
    const load = Math.min(96, 28 + running * 31 + (jobs.find((j) => j.status === "running")?.stageProgress ?? 0) * 0.2);
    return {
      gpu: Math.round(load),
      vram: (4.1 + running * 2.4).toFixed(1),
      ram: (11.2 + running * 1.8).toFixed(1),
      cpu: Math.round(18 + running * 14),
    };
  }, [jobs, running]);

  function onDrop(e: DragEvent) {
    e.preventDefault();
    setDropActive(false);
    const names = Array.from(e.dataTransfer.files)
      .map((f) => f.name)
      .filter((n) => /\.(mkv|mp4|mov|webm|avi)$/i.test(n));
    if (names.length) addFiles(names);
    else if (e.dataTransfer.files.length) addFiles(Array.from(e.dataTransfer.files).map((f) => f.name));
  }

  const nav = (
    <nav className="flex flex-col gap-1 p-3">
      {NAV.map((item) => {
        const active = item.to === "/" ? path === "/" : path.startsWith(item.to);
        const Icon = item.icon;
        return (
          <Link
            key={item.to}
            to={item.to}
            onClick={() => setMobileNav(false)}
            className={cn(
              "flex h-10 items-center gap-3 rounded-md px-3 text-sm transition-colors duration-150",
              active
                ? "bg-secondary text-foreground"
                : "text-muted-foreground hover:bg-accent hover:text-foreground",
            )}
          >
            <Icon className="size-4" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <TooltipProvider>
      <div
        className="flex h-dvh flex-col bg-background text-foreground"
        onDragOver={(e) => {
          e.preventDefault();
          setDropActive(true);
        }}
        onDragLeave={() => setDropActive(false)}
        onDrop={onDrop}
      >
        <div className="flex min-h-0 flex-1">
          <aside className="hidden w-52 shrink-0 flex-col border-r border-sidebar-border bg-sidebar md:flex">
            <Link to="/" className="flex items-center gap-2.5 px-4 py-4">
              <Mark className="size-6" />
              <div className="leading-tight">
                <div className="font-display text-lg tracking-tight">Lồng</div>
                <div className="text-2xs tracking-[0.16em] text-muted-foreground uppercase">
                  Studio
                </div>
              </div>
            </Link>
            {nav}
            <div className="mt-auto space-y-2 p-3">
              <button
                type="button"
                onClick={() => setCommandOpen(true)}
                className="flex h-9 w-full items-center gap-2 rounded-sm border border-border px-2.5 text-xs text-muted-foreground hover:text-foreground"
              >
                <Search className="size-3.5" />
                Tìm
                <kbd className="ml-auto font-mono text-2xs">⌘K</kbd>
              </button>
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              >
                <SunMoon className="size-4" />
                {theme === "dark" ? "Giao diện sáng" : "Giao diện tối"}
              </Button>
            </div>
          </aside>

          <div className="flex min-w-0 flex-1 flex-col">
            <header className="flex h-12 items-center gap-2 border-b border-border px-3 md:hidden">
              <Button variant="ghost" size="icon" onClick={() => setMobileNav(true)} aria-label="Menu">
                <Menu className="size-4" />
              </Button>
              <Mark className="size-5" />
              <span className="font-display text-base">Lồng</span>
              <div className="ml-auto flex gap-1">
                <Button variant="ghost" size="icon" onClick={() => setCommandOpen(true)} aria-label="Tìm">
                  <Search className="size-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  aria-label="Đổi giao diện"
                >
                  <SunMoon className="size-4" />
                </Button>
              </div>
            </header>
            <main className="min-h-0 flex-1 overflow-hidden">
              <Outlet />
            </main>
          </div>
        </div>

        <footer className="flex h-8 items-center gap-3 border-t border-border bg-card px-3 text-2xs text-muted-foreground">
          <span className="tabular">
            {running}/{jobs.length} job
          </span>
          <span className="hidden sm:inline tabular">GPU {gpu.gpu}%</span>
          <span className="hidden md:inline tabular">VRAM {gpu.vram}/12.2</span>
          <span className="hidden md:inline tabular">RAM {gpu.ram} GB</span>
          <span className="hidden lg:inline tabular">CPU {gpu.cpu}%</span>
          <span className="ml-auto flex items-center gap-1.5">
            <span className="size-1.5 rounded-full bg-success" />
            CapCut
          </span>
          <span className="hidden sm:inline tabular">RTF 0.31×</span>
        </footer>

        <nav className="flex h-14 items-stretch border-t border-border bg-card md:hidden">
          {NAV.map((item) => {
            const active = item.to === "/" ? path === "/" : path.startsWith(item.to);
            const Icon = item.icon;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "flex flex-1 flex-col items-center justify-center gap-0.5 text-2xs",
                  active ? "text-foreground" : "text-muted-foreground",
                )}
              >
                <Icon className="size-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <Sheet open={mobileNav} onOpenChange={setMobileNav}>
          <SheetContent side="left" className="bg-sidebar pt-12">
            {nav}
          </SheetContent>
        </Sheet>

        {dropActive && (
          <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center bg-background/80">
            <div className="rounded-xl border border-dashed border-foreground/30 px-10 py-8 text-center">
              <p className="font-display text-2xl">Thả video vào hàng đợi</p>
              <p className="mt-1 text-sm text-muted-foreground">MKV, MP4, MOV · nhận diện tập tự động</p>
            </div>
          </div>
        )}

        <AlertDialog open={!!confirm} onOpenChange={(o) => !o && setConfirm(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>{confirm?.title}</AlertDialogTitle>
              <AlertDialogDescription>{confirm?.body}</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Huỷ</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  confirm?.onConfirm();
                  setConfirm(null);
                }}
              >
                Xác nhận
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <CommandPalette />
        <Onboarding />
        <Toaster />
      </div>
    </TooltipProvider>
  );
}

export function Hint({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  );
}
