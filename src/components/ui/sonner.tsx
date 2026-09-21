import { Toaster as Sonner, type ToasterProps } from "sonner";
import { useAppStore } from "@/lib/store";

function Toaster(props: ToasterProps) {
  const theme = useAppStore((s) => s.settings.theme);
  return (
    <Sonner
      theme={theme}
      className="toaster group"
      position="bottom-right"
      toastOptions={{
        classNames: {
          toast: "bg-card text-foreground border-border",
        },
      }}
      {...props}
    />
  );
}

export { Toaster };
