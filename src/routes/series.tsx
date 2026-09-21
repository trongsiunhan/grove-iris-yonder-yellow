import { createFileRoute } from "@tanstack/react-router";
import { SeriesView } from "@/components/series/series-view";

export const Route = createFileRoute("/series")({ component: SeriesView });
