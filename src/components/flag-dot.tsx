import { FLAG_META, FLAG_ORDER } from "@/lib/constants";
import type { FlagKind } from "@/lib/types";
import { cn } from "@/lib/utils";

const TONE: Record<string, string> = {
  danger: "bg-flag-danger",
  warn: "bg-flag-warn",
  caution: "bg-flag-caution",
  edit: "bg-flag-edit",
};

export function worstTone(flags: FlagKind[]) {
  for (const f of FLAG_ORDER) {
    if (flags.includes(f)) return FLAG_META[f].tone;
  }
  return null;
}

export function FlagDot({ kind, className }: { kind: FlagKind; className?: string }) {
  const meta = FLAG_META[kind];
  return (
    <span
      title={meta.hint}
      className={cn("inline-block size-1.5 shrink-0 rounded-full", TONE[meta.tone], className)}
    />
  );
}

export function FlagChips({ flags }: { flags: FlagKind[] }) {
  if (flags.length === 0) return <span className="text-muted-foreground">—</span>;
  return (
    <span className="inline-flex items-center gap-1">
      {flags.map((f) => (
        <FlagDot key={f} kind={f} />
      ))}
    </span>
  );
}
