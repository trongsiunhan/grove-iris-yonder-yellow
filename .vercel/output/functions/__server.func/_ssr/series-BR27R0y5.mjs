import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { F as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { b as useAppStore, c as STATUS_LABEL, f as cn, l as VOICES, n as CHARACTERS, p as episodeLabel, t as Button } from "./store-a52upM7W.mjs";
import { M as Check, a as Trash2, h as Plus, r as Upload, t as X } from "../_libs/lucide-react.mjs";
import { b as useSearch, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Badge } from "./badge-DE36px5W.mjs";
import { t as Input } from "./input-CRnzKjyS.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-DdTohusW.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/series-BR27R0y5.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function SeriesView() {
	const series = useAppStore((s) => s.series);
	const jobs = useAppStore((s) => s.jobs);
	const search = useSearch({ strict: false });
	const [active, setActive] = (0, import_react.useState)(search.id ?? series[0]?.id ?? "sen");
	const current = series.find((s) => s.id === active) ?? series[0];
	const eps = jobs.filter((j) => j.seriesId === current?.id);
	if (!current) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex h-full items-center justify-center p-8 text-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-display text-2xl",
			children: "Chưa có bộ phim"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 text-sm text-muted-foreground",
			children: "Thêm video vào hàng đợi, Lồng sẽ gợi ý tạo bộ."
		})] })
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full min-h-0 flex-col lg:flex-row",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
			className: "shrink-0 overflow-auto border-b border-border lg:w-72 lg:border-r lg:border-b-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "px-4 py-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-xl tracking-tight",
					children: "Bộ phim"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted-foreground",
					children: "Glossary và giọng theo nhân vật."
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { children: series.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => setActive(s.id),
				className: cn("flex w-full items-center gap-3 px-4 py-2.5 text-left hover:bg-accent/50", s.id === current.id && "bg-accent"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: s.cover,
					alt: "",
					className: "h-14 w-10 rounded-xs object-cover"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "block text-sm font-medium",
					children: s.title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "text-xs text-muted-foreground",
					children: [
						s.episodeTotal,
						" tập · ",
						s.year
					]
				})] })]
			}) }, s.id)) })]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-h-0 flex-1 overflow-auto scroll-thin",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative h-44 overflow-hidden",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: current.cover,
							alt: "",
							className: "size-full object-cover object-top"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-background to-background/10" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "absolute bottom-4 left-4 right-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-2xl tracking-tight",
								children: current.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 max-w-xl text-sm text-muted-foreground",
								children: current.synopsis
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "px-4 py-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-2xs tracking-wide text-muted-foreground uppercase",
						children: "Tập"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
						className: "mt-2 divide-y divide-border",
						children: [eps.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
							className: "py-3 text-sm text-muted-foreground",
							children: "Chưa có tập nào trong hàng đợi."
						}), eps.map((j) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/jobs/$jobId",
							params: { jobId: j.id },
							className: "flex items-center justify-between py-2 text-sm hover:text-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
								episodeLabel(j.episode),
								" · ",
								j.fileName
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								variant: j.status,
								children: STATUS_LABEL[j.status]
							})]
						}) }, j.id))]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Characters, { seriesId: current.id }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Glossary, { seriesId: current.id })
			]
		})]
	});
}
function Characters({ seriesId }) {
	const assign = useAppStore((s) => s.assignVoice);
	const chars = CHARACTERS.filter((c) => c.seriesId === seriesId);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "px-4 py-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
			className: "text-2xs tracking-wide text-muted-foreground uppercase",
			children: "Giọng nhân vật"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-2 space-y-2",
			children: chars.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "flex items-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "w-36 text-sm",
					children: c.name
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
					value: c.voiceId,
					onValueChange: (v) => assign(c.id, v),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
						className: "h-8 max-w-48",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: VOICES.filter((v) => v.gender === c.gender || v.gender === "child").map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectItem, {
						value: v.id,
						children: [
							v.name,
							" · ",
							v.style
						]
					}, v.id)) })]
				})]
			}, c.id))
		})]
	});
}
function Glossary({ seriesId }) {
	const glossary = useAppStore((s) => s.glossary);
	const add = useAppStore((s) => s.addGlossary);
	const update = useAppStore((s) => s.updateGlossary);
	const del = useAppStore((s) => s.deleteGlossary);
	const accept = useAppStore((s) => s.acceptPending);
	const reject = useAppStore((s) => s.rejectPending);
	const rows = (0, import_react.useMemo)(() => glossary.filter((g) => g.seriesId === seriesId), [glossary, seriesId]);
	const [source, setSource] = (0, import_react.useState)("");
	const [target, setTarget] = (0, import_react.useState)("");
	const [kind, setKind] = (0, import_react.useState)("term");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "px-4 pb-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-2xs tracking-wide text-muted-foreground uppercase",
					children: "Thuật ngữ"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					size: "sm",
					variant: "ghost",
					onClick: () => {
						const blob = new Blob([JSON.stringify(rows, null, 2)], { type: "application/json" });
						const a = document.createElement("a");
						a.href = URL.createObjectURL(blob);
						a.download = `glossary-${seriesId}.json`;
						a.click();
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "size-3.5" }), " Xuất JSON"]
				})]
			}),
			rows.some((r) => r.pending) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 rounded-md border border-border p-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted-foreground",
					children: "Tên riêng trích từ tập đầu — duyệt nhận / từ chối"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-2 space-y-2",
					children: rows.filter((r) => r.pending).map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex items-center gap-2 text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex-1",
								children: [
									r.source,
									" → ",
									r.target
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "icon-sm",
								variant: "ghost",
								onClick: () => accept(r.id),
								"aria-label": "Nhận",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3.5" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "icon-sm",
								variant: "ghost",
								onClick: () => reject(r.id),
								"aria-label": "Từ chối",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-3.5" })
							})
						]
					}, r.id))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 flex flex-wrap gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: source,
						onChange: (e) => setSource(e.target.value),
						placeholder: "Gốc",
						className: "h-8 w-32"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: target,
						onChange: (e) => setTarget(e.target.value),
						placeholder: "Dịch cố định",
						className: "h-8 w-40"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						value: kind,
						onValueChange: (v) => setKind(v),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
							className: "h-8 w-32",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: "character",
								children: "Nhân vật"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: "place",
								children: "Địa danh"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: "nickname",
								children: "Biệt danh"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: "term",
								children: "Thuật ngữ"
							})
						] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						size: "sm",
						onClick: () => {
							if (!source || !target) return;
							add({
								seriesId,
								source,
								target,
								kind
							});
							setSource("");
							setTarget("");
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-3.5" }), " Thêm"]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-3 divide-y divide-border",
				children: rows.filter((r) => !r.pending).map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex items-center gap-2 py-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: r.source,
							onChange: (e) => update(r.id, { source: e.target.value }),
							className: "h-8 w-32"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted-foreground",
							children: "→"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: r.target,
							onChange: (e) => update(r.id, { target: e.target.value }),
							className: "h-8 flex-1"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							variant: "outline",
							children: r.kind
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "icon-sm",
							variant: "ghost",
							onClick: () => del(r.id),
							"aria-label": "Xoá",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3.5" })
						})
					]
				}, r.id))
			})
		]
	});
}
var SplitComponent = SeriesView;
//#endregion
export { SplitComponent as component };
