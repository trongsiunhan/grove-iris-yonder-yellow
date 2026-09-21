import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { F as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { b as useAppStore, c as STATUS_LABEL, f as cn, g as formatEta, h as formatDuration, p as episodeLabel, s as STAGES, t as Button, y as seriesTitle } from "./store-a52upM7W.mjs";
import { t as Progress } from "./progress-E_jaiRsg.mjs";
import { E as Ellipsis, M as Check, S as Link2, T as FolderOpen, _ as Pause, a as Trash2, f as Search, g as Play, h as Plus, p as RotateCcw, t as X, w as GripVertical } from "../_libs/lucide-react.mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as CheckboxIndicator, t as Checkbox$1 } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { a as Separator2, i as Root2, n as Item2, o as Trigger, r as Portal2, t as Content2 } from "../_libs/@radix-ui/react-dropdown-menu+[...].mjs";
import { t as Badge } from "./badge-DE36px5W.mjs";
import { t as Input } from "./input-CRnzKjyS.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-DdTohusW.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-Xhb9VGpM.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Checkbox({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox$1, {
		className: cn("peer size-4 shrink-0 rounded-xs border border-border bg-transparent outline-none", "data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground", "focus-visible:ring-2 focus-visible:ring-ring/40", className),
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckboxIndicator, {
			className: "flex items-center justify-center text-current",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3" })
		})
	});
}
var DropdownMenu = Root2;
var DropdownMenuTrigger = Trigger;
function DropdownMenuContent({ className, sideOffset = 6, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portal2, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2, {
		sideOffset,
		className: cn("z-50 min-w-44 overflow-hidden rounded-md border border-border bg-popover p-1 text-popover-foreground shadow-md", className),
		...props
	}) });
}
function DropdownMenuItem({ className, inset, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item2, {
		className: cn("relative flex cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none select-none", "focus:bg-accent data-[disabled]:pointer-events-none data-[disabled]:opacity-40", inset && "pl-8", className),
		...props
	});
}
function DropdownMenuSeparator({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator2, {
		className: cn("-mx-1 my-1 h-px bg-border", className),
		...props
	});
}
function QueueView() {
	const jobs = useAppStore((s) => s.jobs);
	const series = useAppStore((s) => s.series);
	const q = useAppStore((s) => s.queueQuery);
	const setQ = useAppStore((s) => s.setQueueQuery);
	const status = useAppStore((s) => s.queueStatus);
	const setStatus = useAppStore((s) => s.setQueueStatus);
	const seriesFilter = useAppStore((s) => s.queueSeries);
	const setSeriesFilter = useAppStore((s) => s.setQueueSeries);
	const selected = useAppStore((s) => s.selectedJobIds);
	const toggle = useAppStore((s) => s.toggleSelectJob);
	const bulk = useAppStore((s) => s.bulk);
	const addFiles = useAppStore((s) => s.addFiles);
	const fileRef = (0, import_react.useRef)(null);
	const [urlOpen, setUrlOpen] = (0, import_react.useState)(false);
	const [url, setUrl] = (0, import_react.useState)("");
	const filtered = (0, import_react.useMemo)(() => {
		return jobs.filter((j) => {
			if (status !== "all" && j.status !== status) return false;
			if (seriesFilter !== "all" && j.seriesId !== seriesFilter) return false;
			if (q && !j.fileName.toLowerCase().includes(q.toLowerCase()) && !seriesTitle(j.seriesId).toLowerCase().includes(q.toLowerCase())) return false;
			return true;
		});
	}, [
		jobs,
		q,
		status,
		seriesFilter
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full flex-col",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex flex-col gap-3 border-b border-border px-4 py-3 sm:flex-row sm:items-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-xl tracking-tight",
					children: "Hàng đợi"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted-foreground",
					children: "Thả video, theo dõi nhiều tập cùng lúc."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-2 sm:ml-auto",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							ref: fileRef,
							type: "file",
							accept: "video/*,.mkv",
							multiple: true,
							className: "hidden",
							onChange: (e) => {
								const names = Array.from(e.target.files ?? []).map((f) => f.name);
								if (names.length) addFiles(names);
								e.target.value = "";
							}
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							size: "sm",
							onClick: () => fileRef.current?.click(),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), " Chọn file"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							size: "sm",
							variant: "outline",
							onClick: () => addFiles(["Mua.Sen.Tren.Song.S01E09.1080p.mkv"]),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FolderOpen, { className: "size-4" }), " Thêm tập mẫu"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							size: "sm",
							variant: "ghost",
							onClick: () => setUrlOpen((v) => !v),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link2, { className: "size-4" }), " URL"]
						})
					]
				})]
			}),
			urlOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2 border-b border-border bg-card px-4 py-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					placeholder: "Dán URL YouTube / Bilibili…",
					value: url,
					onChange: (e) => setUrl(e.target.value)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "sm",
					onClick: () => {
						if (!url.trim()) return;
						addFiles([`yt-${url.replace(/https?:\/\//, "").slice(0, 28)}.mp4`]);
						setUrl("");
						setUrlOpen(false);
					},
					children: "Tải"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center gap-2 border-b border-border px-4 py-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative min-w-40 flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: q,
							onChange: (e) => setQ(e.target.value),
							placeholder: "Tìm theo tên…",
							className: "h-8 pl-8"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						value: status,
						onValueChange: (v) => setStatus(v),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
							className: "h-8 w-36",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Trạng thái" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: "all",
							children: "Mọi trạng thái"
						}), Object.entries(STATUS_LABEL).map(([k, v]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: k,
							children: v
						}, k))] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						value: seriesFilter,
						onValueChange: setSeriesFilter,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
							className: "h-8 w-44",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Bộ phim" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: "all",
							children: "Mọi bộ"
						}), series.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: s.id,
							children: s.title
						}, s.id))] })]
					}),
					selected.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-xs text-muted-foreground",
								children: [selected.length, " đã chọn"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								variant: "ghost",
								onClick: () => bulk("start"),
								children: "Chạy"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								variant: "ghost",
								onClick: () => bulk("cancel"),
								children: "Huỷ"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								variant: "ghost",
								onClick: () => bulk("delete"),
								children: "Xoá"
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "min-h-0 flex-1 overflow-auto scroll-thin",
				children: filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyQueue, { onPick: () => fileRef.current?.click() }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "divide-y divide-border",
					children: filtered.map((job, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(JobRow, {
						job,
						index: i,
						selected: selected.includes(job.id),
						onToggle: () => toggle(job.id)
					}, job.id))
				})
			})
		]
	});
}
function EmptyQueue({ onPick }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full flex-col items-center justify-center px-6 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-2xl",
				children: "Chưa có job nào"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 max-w-sm text-sm text-muted-foreground",
				children: "Kéo file video vào cửa sổ, hoặc chọn file / thư mục. Tên file có số tập sẽ được gán vào bộ phim có sẵn."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				className: "mt-5",
				onClick: onPick,
				children: "Chọn file"
			})
		]
	});
}
function JobRow({ job, index, selected, onToggle }) {
	const start = useAppStore((s) => s.startJob);
	const pause = useAppStore((s) => s.pauseJob);
	const cancel = useAppStore((s) => s.cancelJob);
	const retry = useAppStore((s) => s.retryStage);
	const apply = useAppStore((s) => s.applyJobToSeries);
	const setConfirm = useAppStore((s) => s.setConfirm);
	const deleteJob = useAppStore((s) => s.deleteJob);
	const reorder = useAppStore((s) => s.reorderJobs);
	const stage = STAGES[job.stageIndex];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
		draggable: true,
		onDragStart: (e) => e.dataTransfer.setData("text/plain", String(index)),
		onDragOver: (e) => e.preventDefault(),
		onDrop: (e) => {
			e.preventDefault();
			const from = Number(e.dataTransfer.getData("text/plain"));
			if (!Number.isNaN(from)) reorder(from, index);
		},
		className: cn("flex items-stretch gap-3 px-4 py-3 hover:bg-accent/40", selected && "bg-accent/50"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "hidden items-center text-muted-foreground sm:flex",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GripVertical, { className: "size-4" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex items-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
					checked: selected,
					onCheckedChange: onToggle,
					"aria-label": "Chọn job"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/jobs/$jobId",
				params: { jobId: job.id },
				className: "flex min-w-0 flex-1 items-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative hidden h-14 w-24 shrink-0 overflow-hidden rounded-sm sm:block",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: job.still,
						alt: "",
						className: "size-full object-cover"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "absolute right-1 bottom-1 rounded-xs bg-background/80 px-1 font-mono text-2xs tabular",
						children: formatDuration(job.durationSec)
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0 flex-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "truncate text-sm font-medium",
									children: job.fileName
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									variant: job.status,
									children: STATUS_LABEL[job.status]
								}),
								job.status === "review" && job.flagCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
									variant: "warn",
									children: [job.flagCount, " cờ"]
								}),
								job.cachedStages.length > 0 && job.status === "queued" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									variant: "outline",
									children: "cache"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-0.5 text-xs text-muted-foreground",
							children: [
								seriesTitle(job.seriesId),
								" · ",
								episodeLabel(job.episode),
								job.status === "running" || job.status === "paused" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
									" ",
									"· ",
									stage?.name,
									" · ETA ",
									formatEta(job.etaSec)
								] }) : null
							]
						}),
						(job.status === "running" || job.status === "paused") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-1.5 max-w-md",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, { value: (job.stageIndex * 100 + job.stageProgress) / 9 })
						}),
						job.status === "error" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs text-flag-danger",
							children: job.errorMessage
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-1",
				children: [
					job.status === "running" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "icon-sm",
						variant: "ghost",
						onClick: () => pause(job.id),
						"aria-label": "Tạm dừng",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pause, { className: "size-4" })
					}) : job.status === "paused" || job.status === "queued" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "icon-sm",
						variant: "ghost",
						onClick: () => start(job.id),
						"aria-label": "Bắt đầu",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "size-4" })
					}) : null,
					(job.status === "running" || job.status === "paused") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "icon-sm",
						variant: "ghost",
						onClick: () => cancel(job.id),
						"aria-label": "Huỷ",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuTrigger, {
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "icon-sm",
							variant: "ghost",
							"aria-label": "Thêm",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ellipsis, { className: "size-4" })
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuContent, {
						align: "end",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
								onClick: () => retry(job.id, "translate"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "size-3.5" }), " Chạy lại từ bước Dịch"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
								onClick: () => retry(job.id, "tts"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "size-3.5" }), " Chạy lại từ TTS"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuItem, {
								onClick: () => apply(job.id),
								children: "Áp dụng cài đặt cho cả bộ"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuSeparator, {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
								onClick: () => setConfirm({
									title: "Xoá job?",
									body: "Job sẽ rời hàng đợi. Cache có thể giữ lại để chạy nhanh hơn lần sau.",
									onConfirm: () => deleteJob(job.id, false)
								}),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3.5" }), " Xoá khỏi hàng đợi"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
								onClick: () => setConfirm({
									title: "Xoá job và cache?",
									body: "Xoá cả kết quả trung gian. Lần chạy sau phải làm lại từ đầu.",
									onConfirm: () => deleteJob(job.id, true)
								}),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3.5" }), " Xoá kèm cache"]
							})
						]
					})] })
				]
			})
		]
	});
}
var SplitComponent = QueueView;
//#endregion
export { SplitComponent as component };
