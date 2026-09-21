import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { F as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { S as voiceName, _ as formatMs, a as FLAG_ORDER, b as useAppStore, c as STATUS_LABEL, d as characterName, f as cn, h as formatDuration, i as FLAG_META, l as VOICES, m as formatClock, n as CHARACTERS, o as SHORTCUTS, p as episodeLabel, s as STAGES, t as Button, v as formatStretch, x as useJob, y as seriesTitle } from "./store-a52upM7W.mjs";
import { t as Progress } from "./progress-E_jaiRsg.mjs";
import { A as ChevronsDown, C as Keyboard, M as Check, N as Captions, O as CircleDashed, P as ArrowLeft, _ as Pause, b as LoaderCircle, g as Play, k as CircleAlert, l as Split, m as RefreshCw, n as Volume2, p as RotateCcw, u as SkipForward } from "../_libs/lucide-react.mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as DialogDescription, i as DialogContent, n as Route, o as DialogHeader, r as Dialog, s as DialogTitle } from "./router-DRXjJDh5.mjs";
import { t as Badge } from "./badge-DE36px5W.mjs";
import { t as Input } from "./input-CRnzKjyS.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-DdTohusW.mjs";
import { a as TabsTrigger, i as TabsList, n as Tabs, r as TabsContent, t as Switch } from "./switch-C6lQbqGe.mjs";
import { t as Slider } from "./slider-CUpEevm2.mjs";
import { a as ResponsiveContainer, i as Bar, n as YAxis, o as Tooltip, r as XAxis, t as BarChart } from "../_libs/recharts+[...].mjs";
import { t as useVirtualizer } from "../_libs/@tanstack/react-virtual+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/jobs._jobId-CwVgY5g1.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var ICON = {
	pending: CircleDashed,
	running: LoaderCircle,
	done: Check,
	cached: SkipForward,
	error: CircleAlert,
	skipped: CircleDashed
};
function ProgressTab({ job }) {
	const retry = useAppStore((s) => s.retryStage);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid h-full min-h-0 grid-cols-1 lg:grid-cols-[minmax(0,1.2fr)_minmax(280px,0.8fr)]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-h-0 overflow-auto scroll-thin p-4",
			children: [
				job.errorMessage && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-4 rounded-lg border border-flag-danger/30 bg-flag-danger/8 p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-medium text-flag-danger",
							children: job.errorMessage
						}),
						job.errorHint && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs text-muted-foreground",
							children: job.errorHint
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							size: "sm",
							className: "mt-3",
							onClick: () => retry(job.id, job.stages[job.stageIndex]?.id ?? "translate"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "size-3.5" }), " Thử lại bước này"]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
					className: "space-y-2",
					children: job.stages.map((st, i) => {
						const Icon = ICON[st.status];
						const meta = STAGES[i];
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
							className: cn("rounded-md border border-border p-3", st.status === "running" && "bg-card", st.status === "error" && "border-flag-danger/40"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: cn("size-4", st.status === "running" && "animate-spin text-foreground", st.status === "done" && "text-success", st.status === "cached" && "text-flag-edit", st.status === "error" && "text-flag-danger", st.status === "pending" && "text-muted-foreground") }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "min-w-0 flex-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-baseline justify-between gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "text-sm font-medium",
												children: [
													i + 1,
													". ",
													meta?.name
												]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "font-mono text-2xs tabular text-muted-foreground",
												children: st.status === "cached" ? "dùng lại kết quả cũ" : st.elapsedMs ? formatMs(st.elapsedMs) : "—"
											})]
										}), (st.status === "running" || st.status === "error") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
											className: "mt-2",
											value: st.progress
										})]
									}),
									st.status === "error" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										size: "sm",
										variant: "outline",
										onClick: () => retry(job.id, st.id),
										children: "Thử lại"
									})
								]
							})
						}, st.id);
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mb-2 text-2xs tracking-wide text-muted-foreground uppercase",
						children: "Thời gian từng bước"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex h-6 overflow-hidden rounded-sm bg-secondary",
						children: job.stages.map((st) => {
							const total = job.stages.reduce((a, b) => a + Math.max(b.elapsedMs, 1), 0);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								title: `${st.name} · ${formatMs(st.elapsedMs)}`,
								className: cn("h-full", st.status === "cached" ? "bg-flag-edit/50" : "bg-primary/70", st.status === "pending" && "bg-transparent", st.status === "error" && "bg-flag-danger"),
								style: { width: `${Math.max(st.elapsedMs, st.status === "pending" ? 0 : 1) / total * 100}%` }
							}, st.id);
						})
					})]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
			className: "min-h-0 overflow-auto border-t border-border bg-card p-4 lg:border-t-0 lg:border-l",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-2xs tracking-wide text-muted-foreground uppercase",
				children: "Log realtime"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ol", {
				className: "mt-3 space-y-1 font-mono text-2xs text-muted-foreground",
				children: [job.logs.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Chưa có log." }), job.logs.map((line, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
					className: "leading-relaxed",
					children: line
				}, i))]
			})]
		})]
	});
}
function PreviewTab({ job }) {
	const cues = useAppStore((s) => s.cues).filter((c) => c.jobId === job.id);
	const selectedId = useAppStore((s) => s.selectedCueId);
	const selectCue = useAppStore((s) => s.selectCue);
	const playing = useAppStore((s) => s.playing);
	const setPlaying = useAppStore((s) => s.setPlaying);
	const playhead = useAppStore((s) => s.playheadMs);
	const setPlayhead = useAppStore((s) => s.setPlayhead);
	const track = useAppStore((s) => s.previewTrack);
	const setTrack = useAppStore((s) => s.setPreviewTrack);
	const settings = useAppStore((s) => s.settings);
	const patch = useAppStore((s) => s.patchSettings);
	const cue = cues.find((c) => playhead >= c.startMs && playhead < c.endMs) ?? cues.find((c) => c.id === selectedId);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid h-full min-h-0 grid-cols-1 lg:grid-cols-[minmax(0,1.4fr)_minmax(260px,0.7fr)]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex min-h-0 flex-col",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative min-h-0 flex-1 overflow-hidden bg-secondary",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: job.still,
					alt: "",
					className: "size-full object-cover"
				}), settings.subtitlesEnabled && cue && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute inset-x-0 bottom-10 px-6 text-center",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "inline-block rounded-sm px-2 py-1 text-sm",
						style: {
							color: settings.subColor,
							textShadow: settings.subShadow ? `0 0 ${settings.subOutlineWidth}px ${settings.subOutline}` : void 0
						},
						children: cue.translation
					})
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-3 border-t border-border p-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
						value: [playhead],
						max: job.durationSec * 1e3,
						onValueChange: ([v]) => setPlayhead(v ?? 0)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								size: "sm",
								onClick: () => setPlaying(!playing),
								children: [playing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pause, { className: "size-3.5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "size-3.5" }), playing ? "Dừng" : "Phát"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "font-mono text-xs tabular text-muted-foreground",
								children: [
									formatClock(playhead),
									" / ",
									formatDuration(job.durationSec)
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "ml-auto flex rounded-md bg-secondary p-0.5",
								children: [
									"original",
									"dub",
									"mix"
								].map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setTrack(t),
									className: cn("rounded-sm px-2.5 py-1 text-xs", track === t ? "bg-card text-foreground" : "text-muted-foreground"),
									children: t === "original" ? "Gốc" : t === "dub" ? "Lồng" : "Trộn"
								}, t))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "flex items-center gap-2 text-xs",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Captions, { className: "size-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
									checked: settings.subtitlesEnabled,
									onCheckedChange: (v) => patch({ subtitlesEnabled: v })
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex items-center gap-3 text-xs text-muted-foreground",
						children: [
							"Tỉ lệ giọng / nhạc",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
								className: "max-w-48",
								value: [settings.voiceBgRatio * 100],
								onValueChange: ([v]) => patch({ voiceBgRatio: (v ?? 70) / 100 })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "font-mono tabular",
								children: [Math.round(settings.voiceBgRatio * 100), "%"]
							})
						]
					})
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
			className: "min-h-0 overflow-auto border-t border-border lg:border-t-0 lg:border-l",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "sticky top-0 border-b border-border bg-card px-3 py-2 text-2xs tracking-wide text-muted-foreground uppercase",
				children: "Cue"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { children: cues.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => {
					selectCue(c.id);
					setPlayhead(c.startMs);
				},
				className: cn("flex w-full items-start gap-2 px-3 py-2 text-left text-xs hover:bg-accent/50", cue?.id === c.id && "bg-accent"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "w-6 font-mono tabular text-muted-foreground",
					children: c.index
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "min-w-0 flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "block text-muted-foreground",
						children: characterName(c.characterId)
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "line-clamp-2",
						children: c.translation
					})]
				})]
			}) }, c.id)) })]
		})]
	});
}
var TONE = {
	danger: "bg-flag-danger",
	warn: "bg-flag-warn",
	caution: "bg-flag-caution",
	edit: "bg-flag-edit"
};
function worstTone(flags) {
	for (const f of FLAG_ORDER) if (flags.includes(f)) return FLAG_META[f].tone;
	return null;
}
function FlagDot({ kind, className }) {
	const meta = FLAG_META[kind];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		title: meta.hint,
		className: cn("inline-block size-1.5 shrink-0 rounded-full", TONE[meta.tone], className)
	});
}
function FlagChips({ flags }) {
	if (flags.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "text-muted-foreground",
		children: "—"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "inline-flex items-center gap-1",
		children: flags.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FlagDot, { kind: f }, f))
	});
}
function ReportTab({ job }) {
	const cues = useAppStore((s) => s.cues).filter((c) => c.jobId === job.id);
	const flagged = cues.filter((c) => c.flags.some((f) => f !== "edited"));
	const early = cues.filter((c, i, arr) => i > 0 && c.startMs < (arr[i - 1]?.startMs ?? 0)).length;
	const buckets = [
		.9,
		1,
		1.05,
		1.1,
		1.15,
		1.2,
		1.3,
		1.4
	].map((b, i, a) => {
		const prev = i === 0 ? .8 : a[i - 1];
		return {
			name: `${b.toFixed(2)}×`,
			n: cues.filter((c) => c.stretch > prev && c.stretch <= b).length
		};
	});
	const processMs = job.stages.reduce((a, s) => a + s.elapsedMs, 0);
	const rtf = processMs / 1e3 / job.durationSec;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "h-full overflow-auto scroll-thin p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 sm:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Cue cần xem",
						value: String(flagged.length),
						hint: `/${cues.length} cue`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Bắt đầu sớm hơn gốc",
						value: String(early),
						hint: early === 0 ? "đúng kỳ vọng" : "có thể là bug"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "RTF",
						value: rtf.toFixed(2) + "×",
						hint: `xử lý ${formatDuration(processMs / 1e3)} / ${formatDuration(job.durationSec)}`
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 grid gap-6 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-2xs tracking-wide text-muted-foreground uppercase",
					children: "Cờ theo loại"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-3 space-y-2",
					children: FLAG_ORDER.map((f) => {
						const n = cues.filter((c) => c.flags.includes(f)).length;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-center gap-2 text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FlagDot, { kind: f }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "flex-1",
									children: FLAG_META[f].label
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono tabular",
									children: n
								})
							]
						}, f);
					})
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-2xs tracking-wide text-muted-foreground uppercase",
					children: "Phân bố hệ số nén"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3 h-48",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
						width: "100%",
						height: "100%",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
							data: buckets,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
									dataKey: "name",
									tick: { fontSize: 10 },
									stroke: "currentColor",
									className: "text-muted-foreground"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
									allowDecimals: false,
									tick: { fontSize: 10 },
									stroke: "currentColor",
									width: 24
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { contentStyle: {
									background: "var(--popover)",
									border: "1px solid var(--border)",
									fontSize: 12
								} }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
									dataKey: "n",
									fill: "var(--primary)",
									radius: [
										2,
										2,
										0,
										0
									]
								})
							]
						})
					})
				})] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-2xs tracking-wide text-muted-foreground uppercase",
					children: "Thời gian bước"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-3 divide-y divide-border",
					children: job.stages.map((st, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex items-center justify-between py-2 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							i + 1,
							". ",
							STAGES[i]?.name
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono tabular text-muted-foreground",
							children: formatMs(st.elapsedMs)
						})]
					}, st.id))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-6 grid gap-3 sm:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					label: "LUFS",
					value: "−16.2",
					hint: "chuẩn phát sóng"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					label: "True peak",
					value: "−1.1 dBTP",
					hint: "dưới −1.0"
				})]
			})
		]
	});
}
function Stat({ label, value, hint }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-lg border border-border bg-card p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-2xs tracking-wide text-muted-foreground uppercase",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display mt-1 text-2xl tabular tracking-tight",
				children: value
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted-foreground",
				children: hint
			})
		]
	});
}
function Textarea({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
		"data-slot": "textarea",
		className: cn("flex min-h-20 w-full rounded-sm border border-input bg-transparent px-3 py-2 text-sm outline-none", "placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30", "disabled:opacity-40", className),
		...props
	});
}
function Waveform({ cues, durationMs, playheadMs, onSeek }) {
	const ref = (0, import_react.useRef)(null);
	const wrap = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		const canvas = ref.current;
		const parent = wrap.current;
		if (!canvas || !parent) return;
		const dpr = window.devicePixelRatio || 1;
		const w = parent.clientWidth;
		const h = parent.clientHeight;
		canvas.width = Math.floor(w * dpr);
		canvas.height = Math.floor(h * dpr);
		canvas.style.width = `${w}px`;
		canvas.style.height = `${h}px`;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;
		ctx.scale(dpr, dpr);
		const styles = getComputedStyle(parent);
		const fg = styles.getPropertyValue("--foreground").trim() || "#ecece6";
		const muted = styles.getPropertyValue("--muted-foreground").trim() || "#8c8c86";
		const orig = styles.getPropertyValue("--track-orig").trim() || "#7a8a9a";
		const dub = styles.getPropertyValue("--track-dub").trim() || "#c4b8a0";
		const danger = styles.getPropertyValue("--flag-danger").trim() || "#c45c4a";
		ctx.fillStyle = styles.getPropertyValue("--card").trim() || "#121215";
		ctx.fillRect(0, 0, w, h);
		const seed = 7;
		function bar(i, track) {
			const n = Math.sin(i * .37 + seed + track) * .5 + Math.sin(i * .11 + track) * .5;
			return .15 + Math.abs(n) * .85;
		}
		const bars = Math.max(80, Math.floor(w / 3));
		const gap = w / bars;
		const mid1 = h * .32;
		const mid2 = h * .74;
		const amp = h * .22;
		ctx.strokeStyle = "color-mix(in oklab, " + muted + " 25%, transparent)";
		ctx.beginPath();
		ctx.moveTo(0, h / 2);
		ctx.lineTo(w, h / 2);
		ctx.stroke();
		for (let i = 0; i < bars; i++) {
			const x = i * gap + .5;
			const a1 = bar(i, 0) * amp;
			ctx.fillStyle = orig;
			ctx.globalAlpha = .7;
			ctx.fillRect(x, mid1 - a1, Math.max(1, gap - 1), a1 * 2);
			const a2 = bar(i + 9, 1) * amp * .9;
			ctx.fillStyle = dub;
			ctx.fillRect(x, mid2 - a2, Math.max(1, gap - 1), a2 * 2);
		}
		ctx.globalAlpha = 1;
		const span = Math.max(1, durationMs);
		for (const cue of cues) {
			const x = cue.startMs / span * w;
			const cw = Math.max(2, (cue.endMs - cue.startMs) / span * w);
			const overflow = cue.stretch > 1.15;
			ctx.fillStyle = overflow ? danger : dub;
			ctx.globalAlpha = overflow ? .35 : .18;
			ctx.fillRect(x, h * .52, cw * (overflow ? cue.stretch / 1.15 : 1), h * .44);
			ctx.globalAlpha = .9;
			ctx.fillRect(x, h * .52, 1.5, h * .44);
		}
		ctx.globalAlpha = 1;
		const px = playheadMs / span * w;
		ctx.fillStyle = fg;
		ctx.fillRect(px, 0, 1.25, h);
	}, [
		cues,
		durationMs,
		playheadMs
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		ref: wrap,
		className: "h-28 w-full cursor-crosshair bg-card",
		onClick: (e) => {
			const r = e.currentTarget.getBoundingClientRect();
			onSeek((e.clientX - r.left) / r.width * durationMs);
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
			ref,
			className: "block size-full"
		})
	});
}
function TimelineEditor({ job }) {
	const cuesAll = useAppStore((s) => s.cues);
	const filter = useAppStore((s) => s.cueFilter);
	const query = useAppStore((s) => s.cueQuery);
	const setFilter = useAppStore((s) => s.setCueFilter);
	const setQuery = useAppStore((s) => s.setCueQuery);
	const selectedId = useAppStore((s) => s.selectedCueId);
	const selectCue = useAppStore((s) => s.selectCue);
	const playing = useAppStore((s) => s.playing);
	const setPlaying = useAppStore((s) => s.setPlaying);
	const playhead = useAppStore((s) => s.playheadMs);
	const setPlayhead = useAppStore((s) => s.setPlayhead);
	const nextFlag = useAppStore((s) => s.nextFlag);
	const regenerate = useAppStore((s) => s.regenerateCue);
	const updateCue = useAppStore((s) => s.updateCue);
	const splitCue = useAppStore((s) => s.splitCue);
	const mergeCue = useAppStore((s) => s.mergeCue);
	const retranslate = useAppStore((s) => s.retranslateCue);
	const findReplace = useAppStore((s) => s.findReplace);
	const shortcutsOpen = useAppStore((s) => s.shortcutsOpen);
	const setShortcutsOpen = useAppStore((s) => s.setShortcutsOpen);
	const [editing, setEditing] = (0, import_react.useState)(null);
	const [find, setFind] = (0, import_react.useState)("");
	const [repl, setRepl] = (0, import_react.useState)("");
	const parentRef = (0, import_react.useRef)(null);
	const cues = (0, import_react.useMemo)(() => {
		return cuesAll.filter((c) => c.jobId === job.id).filter((c) => {
			if (filter === "flagged") return c.flags.length > 0;
			if (filter !== "all") return c.flags.includes(filter);
			return true;
		}).filter((c) => {
			if (!query) return true;
			const q = query.toLowerCase();
			return c.translation.toLowerCase().includes(q) || c.original.toLowerCase().includes(q) || characterName(c.characterId).toLowerCase().includes(q);
		}).sort((a, b) => a.index - b.index);
	}, [
		cuesAll,
		job.id,
		filter,
		query
	]);
	const selected = cuesAll.find((c) => c.id === selectedId) ?? cues[0];
	const durationMs = job.durationSec * 1e3;
	const jobCues = cuesAll.filter((c) => c.jobId === job.id);
	const virtualizer = useVirtualizer({
		count: cues.length,
		getScrollElement: () => parentRef.current,
		estimateSize: () => 52,
		overscan: 12
	});
	(0, import_react.useEffect)(() => {
		if (!selectedId && cues[0]) selectCue(cues[0].id);
	}, [
		cues,
		selectedId,
		selectCue
	]);
	(0, import_react.useEffect)(() => {
		if (!playing) return;
		const id = window.setInterval(() => {
			const s = useAppStore.getState();
			s.setPlayhead(s.playheadMs + 80);
		}, 80);
		return () => window.clearInterval(id);
	}, [playing]);
	(0, import_react.useEffect)(() => {
		function onKey(e) {
			const tag = e.target?.tagName;
			const typing = tag === "INPUT" || tag === "TEXTAREA" || e.target?.isContentEditable;
			if (e.code === "Space" && !typing) {
				e.preventDefault();
				setPlaying(!playing);
			}
			if (e.key === "ArrowDown" && !typing) {
				e.preventDefault();
				const i = cues.findIndex((c) => c.id === selectedId);
				const n = cues[i + 1];
				if (n) selectCue(n.id);
			}
			if (e.key === "ArrowUp" && !typing) {
				e.preventDefault();
				const i = cues.findIndex((c) => c.id === selectedId);
				const n = cues[i - 1];
				if (n) selectCue(n.id);
			}
			if (e.key === "Enter" && !typing && selected) {
				e.preventDefault();
				setEditing(selected.id);
			}
			if (e.key === "Escape") setEditing(null);
			if ((e.metaKey || e.ctrlKey) && e.key === "Enter" && selected) {
				e.preventDefault();
				regenerate(selected.id);
			}
			if (!typing && (e.key === "n" || e.key === "N")) {
				e.preventDefault();
				nextFlag(job.id);
			}
			if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "s") e.preventDefault();
		}
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [
		cues,
		selectedId,
		playing,
		selected,
		job.id,
		nextFlag,
		regenerate,
		selectCue,
		setPlaying
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full min-h-0 flex-col",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center gap-2 border-b border-border px-3 py-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						value: filter,
						onValueChange: (v) => setFilter(v),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
							className: "h-8 w-44",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: "all",
								children: "Mọi cue"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: "flagged",
								children: "Chỉ có cờ"
							}),
							FLAG_ORDER.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: f,
								children: FLAG_META[f].label
							}, f))
						] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: query,
						onChange: (e) => setQuery(e.target.value),
						placeholder: "Tìm lời gốc / dịch / nhân vật",
						className: "h-8 max-w-64"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						size: "sm",
						variant: "outline",
						onClick: () => nextFlag(job.id),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronsDown, { className: "size-3.5" }), " Cờ tiếp"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "hidden items-center gap-1 lg:flex",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: find,
								onChange: (e) => setFind(e.target.value),
								placeholder: "Tìm",
								className: "h-8 w-28"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: repl,
								onChange: (e) => setRepl(e.target.value),
								placeholder: "Thay",
								className: "h-8 w-28"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								variant: "ghost",
								onClick: () => findReplace(job.id, find, repl),
								children: "Thay tất"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "icon-sm",
						variant: "ghost",
						className: "ml-auto",
						onClick: () => setShortcutsOpen(true),
						"aria-label": "Phím tắt",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Keyboard, { className: "size-4" })
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid min-h-0 flex-1 grid-cols-1 lg:grid-cols-[minmax(0,1.7fr)_minmax(280px,1fr)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					ref: parentRef,
					className: "min-h-0 overflow-auto scroll-thin border-b border-border lg:border-r lg:border-b-0",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-[760px]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "sticky top-0 z-10 grid grid-cols-[36px_72px_56px_88px_1fr_1fr_52px_48px] gap-2 border-b border-border bg-card px-3 py-1.5 text-2xs font-medium tracking-wide text-muted-foreground uppercase",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "#" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Bắt đầu" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Dài" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Nhân vật" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Gốc" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Dịch" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Lệch" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Cờ" })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								style: {
									height: virtualizer.getTotalSize(),
									position: "relative"
								},
								children: virtualizer.getVirtualItems().map((vi) => {
									const cue = cues[vi.index];
									if (!cue) return null;
									const tone = worstTone(cue.flags);
									const active = cue.id === selected?.id;
									return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: cn("cue-row absolute left-0 w-full cursor-pointer px-3", active ? "bg-accent" : "hover:bg-accent/40"),
										"data-tone": tone ?? void 0,
										style: {
											height: vi.size,
											transform: `translateY(${vi.start}px)`
										},
										onClick: () => selectCue(cue.id),
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "grid h-full grid-cols-[36px_72px_56px_88px_1fr_1fr_52px_48px] items-center gap-2 text-xs",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "font-mono tabular text-muted-foreground",
													children: cue.index
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "font-mono tabular",
													children: formatClock(cue.startMs)
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "font-mono tabular text-muted-foreground",
													children: [((cue.endMs - cue.startMs) / 1e3).toFixed(1), "s"]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "truncate",
													children: characterName(cue.characterId)
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "truncate text-muted-foreground",
													children: cue.original
												}),
												editing === cue.id ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
													autoFocus: true,
													defaultValue: cue.translation,
													className: "h-7 rounded-xs border border-input bg-transparent px-1",
													onBlur: (e) => {
														updateCue(cue.id, { translation: e.target.value });
														setEditing(null);
													},
													onKeyDown: (e) => {
														if (e.key === "Enter") e.target.blur();
														if (e.key === "Escape") setEditing(null);
													},
													onClick: (e) => e.stopPropagation()
												}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "truncate",
													onDoubleClick: (e) => {
														e.stopPropagation();
														setEditing(cue.id);
													},
													children: cue.translation
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: cn("font-mono tabular", cue.stretch > 1.15 ? "text-flag-danger" : "text-muted-foreground"),
													children: formatStretch(cue.stretch)
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FlagChips, { flags: cue.flags })
											]
										})
									}, cue.id);
								})
							}),
							cues.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "p-8 text-center text-sm text-muted-foreground",
								children: "Không có cue khớp bộ lọc."
							})
						]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CueSide, {
					job,
					cue: selected,
					playing,
					onPlay: () => setPlaying(!playing),
					onRegen: () => selected && regenerate(selected.id),
					onRetranslate: () => selected && retranslate(selected.id),
					onSplit: () => selected && splitCue(selected.id),
					onMerge: () => selected && mergeCue(selected.id)
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "border-t border-border",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between px-3 py-1 text-2xs text-muted-foreground",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Gốc" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono tabular",
							children: formatClock(playhead)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Lồng tiếng" })
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Waveform, {
					cues: jobCues,
					durationMs,
					playheadMs: playhead,
					onSeek: (ms) => {
						setPlayhead(ms);
						const hit = jobCues.find((c) => ms >= c.startMs && ms < c.endMs);
						if (hit) selectCue(hit.id);
					}
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: shortcutsOpen,
				onOpenChange: setShortcutsOpen,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Phím tắt" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "Dùng khi không đang gõ trong ô sửa." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-2 space-y-2",
					children: SHORTCUTS.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex justify-between text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted-foreground",
							children: s.action
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("kbd", {
							className: "rounded-xs bg-secondary px-1.5 py-0.5 font-mono text-xs",
							children: s.keys
						})]
					}, s.keys))
				})] })
			})
		]
	});
}
function CueSide({ job, cue, playing, onPlay, onRegen, onRetranslate, onSplit, onMerge }) {
	const updateCue = useAppStore((s) => s.updateCue);
	const track = useAppStore((s) => s.previewTrack);
	const setTrack = useAppStore((s) => s.setPreviewTrack);
	const chars = CHARACTERS.filter((c) => c.seriesId === job.seriesId);
	if (!cue) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "p-6 text-sm text-muted-foreground",
		children: "Chọn một cue."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-0 flex-col overflow-auto scroll-thin",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative aspect-video overflow-hidden bg-secondary",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: job.still,
					alt: "",
					className: "size-full object-cover"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/80 to-transparent px-4 pb-4 pt-10",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-center text-sm",
						children: cue.translation
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center gap-1 border-b border-border p-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						size: "sm",
						variant: "outline",
						onClick: onPlay,
						children: [playing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pause, { className: "size-3.5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "size-3.5" }), playing ? "Dừng" : "Nghe cue"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						size: "sm",
						variant: "ghost",
						onClick: onRegen,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "size-3.5" }), " Tạo lại giọng"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						variant: "ghost",
						onClick: onRetranslate,
						children: "Dịch lại"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "icon-sm",
						variant: "ghost",
						onClick: onSplit,
						"aria-label": "Tách",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Split, { className: "size-3.5" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						value: track,
						onValueChange: (v) => setTrack(v),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
							className: "h-8 w-28",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: "original",
								children: "Gốc"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: "dub",
								children: "Lồng"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: "mix",
								children: "Trộn"
							})
						] })]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-3 p-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "space-y-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-2xs text-muted-foreground",
								children: "Nhân vật"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								value: cue.characterId,
								onValueChange: (v) => {
									const ch = CHARACTERS.find((c) => c.id === v);
									updateCue(cue.id, {
										characterId: v,
										voiceId: ch?.voiceId ?? cue.voiceId
									});
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
									className: "h-8",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: chars.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: c.id,
									children: c.name
								}, c.id)) })]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "space-y-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-2xs text-muted-foreground",
								children: "Giọng"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								value: cue.voiceId,
								onValueChange: (v) => updateCue(cue.id, { voiceId: v }),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
									className: "h-8",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: VOICES.map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: v.id,
									children: v.name
								}, v.id)) })]
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block space-y-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-2xs text-muted-foreground",
							children: "Lời gốc"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							value: cue.original,
							onChange: (e) => updateCue(cue.id, { original: e.target.value }),
							className: "min-h-16"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block space-y-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-2xs text-muted-foreground",
							children: "Lời dịch"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							value: cue.translation,
							onChange: (e) => updateCue(cue.id, { translation: e.target.value }),
							className: "min-h-16"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-1 flex justify-between text-2xs text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Hệ số nén" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: cn("font-mono tabular", cue.stretch > 1.15 && "text-flag-danger"),
							children: formatStretch(cue.stretch)
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-1.5 overflow-hidden rounded-full bg-secondary",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: cn("h-full", cue.stretch > 1.15 ? "bg-flag-danger" : "bg-primary"),
							style: { width: `${Math.min(100, cue.stretch / 1.4 * 100)}%` }
						})
					})] }),
					cue.flags.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "space-y-1",
						children: cue.flags.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-start gap-2 text-xs",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FlagDot, {
								kind: f,
								className: "mt-1.5"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-medium",
								children: FLAG_META[f].label
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-muted-foreground",
								children: [" — ", FLAG_META[f].hint]
							})] })]
						}, f))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 text-xs text-muted-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Volume2, { className: "size-3.5" }),
							voiceName(cue.voiceId),
							" · ASR ",
							(cue.asrConfidence * 100).toFixed(0),
							"%"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: "outline",
							onClick: onSplit,
							children: "Tách cue"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: "outline",
							onClick: onMerge,
							children: "Gộp với cue sau"
						})]
					})
				]
			})
		]
	});
}
function JobDetail({ job }) {
	const start = useAppStore((s) => s.startJob);
	const pause = useAppStore((s) => s.pauseJob);
	const retry = useAppStore((s) => s.retryStage);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full min-h-0 flex-col",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "flex flex-wrap items-center gap-3 border-b border-border px-3 py-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					size: "icon-sm",
					variant: "ghost",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						"aria-label": "Hàng đợi",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4" })
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: job.still,
					alt: "",
					className: "hidden h-10 w-16 rounded-xs object-cover sm:block"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0 flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "truncate text-sm font-medium",
								children: job.fileName
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								variant: job.status,
								children: STATUS_LABEL[job.status]
							}),
							job.flagCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
								variant: "warn",
								children: [job.flagCount, " cờ"]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs text-muted-foreground",
						children: [
							seriesTitle(job.seriesId),
							" · ",
							episodeLabel(job.episode),
							" · ",
							formatDuration(job.durationSec)
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex gap-1",
					children: job.status === "running" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						size: "sm",
						variant: "outline",
						onClick: () => pause(job.id),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pause, { className: "size-3.5" }), " Tạm dừng"]
					}) : job.status === "queued" || job.status === "paused" || job.status === "error" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						size: "sm",
						onClick: () => job.status === "error" ? retry(job.id, "translate") : start(job.id),
						children: [job.status === "error" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "size-3.5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "size-3.5" }), job.status === "error" ? "Thử lại" : "Chạy"]
					}) : null
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
			defaultValue: defaultTab(job),
			className: "flex min-h-0 flex-1 flex-col",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "border-b border-border px-3",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
						className: "h-10 bg-transparent p-0",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								value: "progress",
								className: "rounded-none border-b-2 border-transparent data-[state=active]:border-foreground data-[state=active]:bg-transparent data-[state=active]:shadow-none",
								children: "Tiến trình"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								value: "timeline",
								className: "rounded-none border-b-2 border-transparent data-[state=active]:border-foreground data-[state=active]:bg-transparent data-[state=active]:shadow-none",
								children: "Timeline"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								value: "preview",
								className: "rounded-none border-b-2 border-transparent data-[state=active]:border-foreground data-[state=active]:bg-transparent data-[state=active]:shadow-none",
								children: "Preview"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								value: "report",
								className: "rounded-none border-b-2 border-transparent data-[state=active]:border-foreground data-[state=active]:bg-transparent data-[state=active]:shadow-none",
								children: "Báo cáo"
							})
						]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					value: "progress",
					className: "min-h-0 flex-1 overflow-hidden",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProgressTab, { job })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					value: "timeline",
					className: "min-h-0 flex-1 overflow-hidden",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TimelineEditor, { job })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					value: "preview",
					className: "min-h-0 flex-1 overflow-hidden",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewTab, { job })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					value: "report",
					className: "min-h-0 flex-1 overflow-hidden",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReportTab, { job })
				})
			]
		})]
	});
}
function defaultTab(job) {
	if (job.status === "review" || job.status === "done") return "timeline";
	if (job.status === "error") return "progress";
	return "progress";
}
function JobPage() {
	const { jobId } = Route.useParams();
	const job = useJob(jobId);
	if (!job) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full flex-col items-center justify-center gap-3 p-8 text-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-display text-2xl",
			children: "Không tìm thấy job"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			asChild: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/",
				children: "Về hàng đợi"
			})
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(JobDetail, { job });
}
//#endregion
export { JobPage as component };
