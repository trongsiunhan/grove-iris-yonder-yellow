import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { F as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { b as useAppStore, r as DOCTOR_CHECKS, t as Button } from "./store-a52upM7W.mjs";
import { t as Progress } from "./progress-E_jaiRsg.mjs";
import { M as Check, g as Play, k as CircleAlert } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/doctor-d9NmJ1pv.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function DoctorView() {
	const addFiles = useAppStore((s) => s.addFiles);
	const startJob = useAppStore((s) => s.startJob);
	const jobs = useAppStore((s) => s.jobs);
	const [wizard, setWizard] = (0, import_react.useState)(false);
	const [step, setStep] = (0, import_react.useState)(0);
	const [probe, setProbe] = (0, import_react.useState)("idle");
	function runSample() {
		setProbe("run");
		toast.message("Chạy thử clip 10 giây…");
		window.setTimeout(() => {
			const existing = jobs.find((j) => j.fileName.includes("clip-thu"));
			if (existing) startJob(existing.id);
			else addFiles(["clip-thu-10s.mp4"]);
			setProbe("done");
			toast.success("Clip mẫu chạy xong — máy đạt.");
		}, 1400);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "h-full overflow-auto scroll-thin p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-xl tracking-tight",
				children: "Chẩn đoán hệ thống"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted-foreground",
				children: "Kiểm tra ffmpeg, GPU, model, CapCut và quyền ghi trước khi chạy bộ phim."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-6 max-w-2xl divide-y divide-border rounded-lg border border-border",
				children: DOCTOR_CHECKS.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex items-start gap-3 p-4",
					children: [c.ok ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "mt-0.5 size-4 text-success" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "mt-0.5 size-4 text-flag-danger" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-medium",
							children: c.label
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: c.detail
						}),
						!c.ok && c.fix && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs",
							children: c.fix
						}),
						c.id === "models" && c.fix && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs text-muted-foreground",
							children: c.fix
						})
					] })]
				}, c.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 flex flex-wrap gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					onClick: runSample,
					disabled: probe === "run",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "size-4" }), probe === "run" ? "Đang chạy thử…" : probe === "done" ? "Chạy lại clip mẫu" : "Chạy thử clip 10 giây"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "outline",
					onClick: () => {
						setWizard(true);
						setStep(0);
					},
					children: "Wizard lần đầu"
				})]
			}),
			wizard && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 max-w-lg rounded-lg border border-border bg-card p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-2xs tabular text-muted-foreground",
						children: [
							"Bước ",
							step + 1,
							" / 4"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display mt-1 text-xl",
						children: [
							"Dò máy",
							"Chọn profile",
							"Tải model",
							"Chạy thử"
						][step]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted-foreground",
						children: [
							"RTX 4070 · 12.2 GB · ffmpeg 7.1.1. Máy đủ cho profile Cao.",
							"Profile Cao: Whisper large-v3, Demucs, Gemini dịch. Có thể hạ xuống Trung bình nếu VRAM căng.",
							"4/5 model đã có. NLLB-200 chỉ cần khi dịch local.",
							"Clip 10 giây sẽ chạy hết 9 bước. Nếu xong là máy sẵn sàng."
						][step]
					}),
					step === 2 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
						className: "mt-4",
						value: 80
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-5 flex justify-end gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							onClick: () => setWizard(false),
							children: "Đóng"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							onClick: () => {
								if (step === 3) {
									runSample();
									setWizard(false);
								} else setStep(step + 1);
							},
							children: step === 3 ? "Chạy thử" : "Tiếp"
						})]
					})
				]
			})
		]
	});
}
var SplitComponent = DoctorView;
//#endregion
export { SplitComponent as component };
