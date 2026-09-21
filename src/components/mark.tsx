import { cn } from "@/lib/utils";

export function Mark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn("text-foreground", className)}
      fill="none"
      aria-hidden
    >
      <rect x="3.5" y="4" width="17" height="16" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="6.2" cy="7.2" r="0.7" fill="currentColor" />
      <circle cx="6.2" cy="12" r="0.7" fill="currentColor" />
      <circle cx="6.2" cy="16.8" r="0.7" fill="currentColor" />
      <circle cx="17.8" cy="7.2" r="0.7" fill="currentColor" />
      <circle cx="17.8" cy="12" r="0.7" fill="currentColor" />
      <circle cx="17.8" cy="16.8" r="0.7" fill="currentColor" />
      <path
        d="M8.4 12.2c.7-2.4 1.3-2.4 2 .2 1 3.4 1.4 3.4 2.4.2.8-2.6 1.3-2.6 2.1.4"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  );
}
