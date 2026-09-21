import "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { F as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { b as useAppStore, f as cn, t as Button } from "./store-a52upM7W.mjs";
import { t as Progress } from "./progress-E_jaiRsg.mjs";
import { b as useSearch } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Input } from "./input-CRnzKjyS.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-DdTohusW.mjs";
import { a as TabsTrigger, i as TabsList, n as Tabs, r as TabsContent, t as Switch } from "./switch-C6lQbqGe.mjs";
import { t as Slider } from "./slider-CUpEevm2.mjs";
import { t as Root } from "../_libs/radix-ui__react-label.mjs";
require_react();
var import_jsx_runtime = require_jsx_runtime();
function Label({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
		"data-slot": "label",
		className: cn("text-xs font-medium text-muted-foreground", className),
		...props
	});
}
function SettingsView() {
	const settings = useAppStore((s) => s.settings);
	const patch = useAppStore((s) => s.patchSettings);
	const models = useAppStore((s) => s.models);
	const download = useAppStore((s) => s.downloadModel);
	const defaultTab = useSearch({ strict: false }).tab ?? "general";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "h-full overflow-auto scroll-thin p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-xl tracking-tight",
			children: "Cài đặt"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
			defaultValue: defaultTab,
			className: "mt-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
					className: "flex flex-wrap",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
							value: "general",
							children: "Chung"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
							value: "models",
							children: "Model"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
							value: "quality",
							children: "Chất lượng"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
							value: "subtitles",
							children: "Phụ đề"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
							value: "export",
							children: "Xuất file"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
					value: "general",
					className: "mt-6 max-w-xl space-y-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Thư mục xuất",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: settings.exportDir,
								onChange: (e) => patch({ exportDir: e.target.value })
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Thư mục cache",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: settings.cacheDir,
								onChange: (e) => patch({ cacheDir: e.target.value })
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Ngôn ngữ giao diện",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								value: settings.locale,
								onValueChange: (v) => patch({ locale: v }),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "vi",
									children: "Tiếng Việt"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "en",
									children: "English"
								})] })]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Giao diện",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								value: settings.theme,
								onValueChange: (v) => useAppStore.getState().setTheme(v),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "dark",
									children: "Tối"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "light",
									children: "Sáng"
								})] })]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: `Job song song · ${settings.parallelJobs}`,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
								min: 1,
								max: 4,
								value: [settings.parallelJobs],
								onValueChange: ([v]) => patch({ parallelJobs: v ?? 1 })
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: `Dung lượng cache · ${settings.cacheGb} GB`,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
								min: 8,
								max: 256,
								value: [settings.cacheGb],
								onValueChange: ([v]) => patch({ cacheGb: v ?? 64 })
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							onClick: () => toast.success("Đã dọn 12.4 GB cache cũ"),
							children: "Dọn cache"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
					value: "models",
					className: "mt-6 max-w-2xl space-y-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground",
							children: "GPU phát hiện: RTX 4070 · 12.2 GB VRAM · CUDA 12.6"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Profile chất lượng",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								value: settings.qualityProfile,
								onValueChange: (v) => patch({ qualityProfile: v }),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: "high",
										children: "Cao — large-v3, Demucs, NLLB"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: "medium",
										children: "Trung bình"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: "light",
										children: "Nhẹ — máy yếu"
									})
								] })]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "divide-y divide-border rounded-md border border-border",
							children: models.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex items-center gap-3 p-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0 flex-1",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-sm font-medium",
											children: m.name
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-xs text-muted-foreground",
											children: [
												m.step,
												" · ",
												m.sizeGb,
												" GB · ",
												m.downloaded ? "đã tải" : "chưa tải"
											]
										}),
										!m.downloaded && m.progress > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
											className: "mt-2",
											value: m.progress
										})
									]
								}), m.downloaded ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "sm",
									variant: "ghost",
									children: "Xoá"
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "sm",
									onClick: () => download(m.id),
									children: "Tải"
								})]
							}, m.id))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "NVDEC / NVENC" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "flex items-center gap-2 text-sm",
									children: ["NVDEC ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
										checked: settings.nvdec,
										onCheckedChange: (v) => patch({ nvdec: v })
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "flex items-center gap-2 text-sm",
									children: ["NVENC ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
										checked: settings.nvenc,
										onCheckedChange: (v) => patch({ nvenc: v })
									})]
								})]
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
					value: "quality",
					className: "mt-6 max-w-xl space-y-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							label: "Tách nhạc nền",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
								checked: settings.separateBg,
								onCheckedChange: (v) => patch({ separateBg: v })
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: `Tốc độ nói · ${settings.speechRate.toFixed(1)} âm tiết/giây`,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
								min: 4,
								max: 8,
								step: .1,
								value: [settings.speechRate],
								onValueChange: ([v]) => patch({ speechRate: v ?? 5.8 })
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: `Nén tối đa · ${settings.maxStretch.toFixed(2)}×`,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
								min: 1,
								max: 1.4,
								step: .01,
								value: [settings.maxStretch],
								onValueChange: ([v]) => patch({ maxStretch: v ?? 1.15 })
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							label: "Rút gọn bản dịch tự động",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
								checked: settings.autoShorten,
								onCheckedChange: (v) => patch({ autoShorten: v })
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: `Đẩy trễ cue tối đa · ${settings.maxDelayMs} ms`,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
								min: 0,
								max: 400,
								value: [settings.maxDelayMs],
								onValueChange: ([v]) => patch({ maxDelayMs: v ?? 180 })
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: `Ngưỡng ASR thấp · ${settings.asrThreshold.toFixed(2)}`,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
								min: .4,
								max: .95,
								step: .01,
								value: [settings.asrThreshold],
								onValueChange: ([v]) => patch({ asrThreshold: v ?? .72 })
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Nguồn dịch",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								value: settings.translateSource,
								onValueChange: (v) => patch({ translateSource: v }),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "gemini",
									children: "Gemini web"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "local",
									children: "LLM local"
								})] })]
							})
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
					value: "subtitles",
					className: "mt-6 grid max-w-3xl gap-6 lg:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								label: "Bật phụ đề",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
									checked: settings.subtitlesEnabled,
									onCheckedChange: (v) => patch({ subtitlesEnabled: v })
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Font",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: settings.subFont,
									onChange: (e) => patch({ subFont: e.target.value })
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: `Cỡ chữ · ${settings.subSize}`,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
									min: 24,
									max: 72,
									value: [settings.subSize],
									onValueChange: ([v]) => patch({ subSize: v ?? 42 })
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Màu chữ",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									type: "color",
									value: settings.subColor,
									onChange: (e) => patch({ subColor: e.target.value }),
									className: "h-9 w-16 p-1"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Màu viền",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									type: "color",
									value: settings.subOutline,
									onChange: (e) => patch({ subOutline: e.target.value }),
									className: "h-9 w-16 p-1"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: `Độ dày viền · ${settings.subOutlineWidth}`,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
									min: 0,
									max: 8,
									value: [settings.subOutlineWidth],
									onValueChange: ([v]) => patch({ subOutlineWidth: v ?? 3 })
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								label: "Đổ bóng",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
									checked: settings.subShadow,
									onCheckedChange: (v) => patch({ subShadow: v })
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								label: "Màu theo nhân vật",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
									checked: settings.subByCharacter,
									onCheckedChange: (v) => patch({ subByCharacter: v })
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: `Lề dưới · ${settings.subMargin}px`,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
									min: 16,
									max: 160,
									value: [settings.subMargin],
									onValueChange: ([v]) => patch({ subMargin: v ?? 64 })
								})
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative aspect-video overflow-hidden rounded-lg bg-secondary",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: "/stills/sen-dock.jpg",
							alt: "",
							className: "size-full object-cover"
						}), settings.subtitlesEnabled && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "absolute inset-x-0 text-center",
							style: {
								bottom: settings.subMargin / 4,
								fontFamily: settings.subFont,
								fontSize: settings.subSize / 3,
								color: settings.subColor,
								textShadow: settings.subShadow ? `0 0 ${settings.subOutlineWidth}px ${settings.subOutline}` : void 0
							},
							children: "Mộ Thanh, ngươi còn nhớ hoa sen năm ấy không?"
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
					value: "export",
					className: "mt-6 max-w-xl space-y-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Chế độ phụ đề",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								value: settings.exportMode,
								onValueChange: (v) => patch({ exportMode: v }),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "sidecar",
									children: "Phụ đề rời (nhanh)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "burn",
									children: "Nhúng cứng (chậm)"
								})] })]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Định dạng",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								value: settings.exportFormat,
								onValueChange: (v) => patch({ exportFormat: v }),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "mkv",
									children: "MKV"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "mp4",
									children: "MP4"
								})] })]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Encoder",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								value: settings.encoder,
								onValueChange: (v) => patch({ encoder: v }),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "nvenc",
									children: "NVENC"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "x264",
									children: "x264"
								})] })]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: `CQ · ${settings.cq}`,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
								min: 12,
								max: 28,
								value: [settings.cq],
								onValueChange: ([v]) => patch({ cq: v ?? 18 })
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: `LUFS · ${settings.lufs}`,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
								min: -24,
								max: -12,
								value: [settings.lufs],
								onValueChange: ([v]) => patch({ lufs: v ?? -16 })
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							label: "Giữ audio gốc như track phụ",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
								checked: settings.keepOriginalTrack,
								onCheckedChange: (v) => patch({ keepOriginalTrack: v })
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, {
							label: "Mẫu tên file",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: settings.fileNamePattern,
								onChange: (e) => patch({ fileNamePattern: e.target.value })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 text-2xs text-muted-foreground",
								children: [
									"Biến: ",
									"{bộ}",
									" ",
									"{tập}",
									" ",
									"{ngày}"
								]
							})]
						})
					]
				})
			]
		})]
	});
}
function Field({ label, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-1.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: label }), children]
	});
}
function Row({ label, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center justify-between gap-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: label }), children]
	});
}
var SplitComponent = SettingsView;
//#endregion
export { SplitComponent as component };
