import { createFileRoute } from "@tanstack/react-router";
import { DoctorView } from "@/components/doctor/doctor-view";

export const Route = createFileRoute("/doctor")({ component: DoctorView });
