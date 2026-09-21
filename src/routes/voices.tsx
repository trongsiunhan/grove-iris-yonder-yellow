import { createFileRoute } from "@tanstack/react-router";
import { VoicesView } from "@/components/voices/voices-view";

export const Route = createFileRoute("/voices")({ component: VoicesView });
