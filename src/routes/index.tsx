import { createFileRoute } from "@tanstack/react-router";
import { QueueView } from "@/components/queue/queue-view";

export const Route = createFileRoute("/")({ component: QueueView });
