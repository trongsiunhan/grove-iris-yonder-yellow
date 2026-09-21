import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { F as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { b as useAppStore, f as cn, t as Button } from "./store-a52upM7W.mjs";
import { c as Star } from "../_libs/lucide-react.mjs";
import { t as Badge } from "./badge-DE36px5W.mjs";
import { t as Input } from "./input-CRnzKjyS.mjs";
import { t as Slider } from "./slider-CUpEevm2.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/voices-CBc95EBH.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function VoicesView() {
	const voices = useAppStore((s) => s.voices);
	const toggle = useAppStore((s) => s.toggleFavorite);
	const [gender, setGender] = (0, import_react.useState)("all");
	const [age, setAge] = (0, import_react.useState)("all");
	const [q, setQ] = (0, import_react.useState)("");
	const [sample, setSample] = (0, import_react.useState)("Người ở lại, sen vẫn nở trên sông.");
	const [rate, setRate] = (0, import_react.useState)([100]);
	const [pitch, setPitch] = (0, import_react.useState)([0]);
	const [playing, setPlaying] = (0, import_react.useState)(null);
	const list = (0, import_react.useMemo)(() => voices.filter((v) => {
		if (gender !== "all" && v.gender !== gender) return false;
		if (age !== "all" && v.age !== age) return false;
		if (q && !`${v.name} ${v.style}`.toLowerCase().includes(q.toLowerCase())) return false;
		return true;
	}), [
		voices,
		gender,
		age,
		q
	]);
	function preview(id, name) {
		setPlaying(id);
		toast.message(`Nghe thử · ${name}`, { description: sample });
		window.setTimeout(() => setPlaying(null), 1600);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full min-h-0 flex-col",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "border-b border-border px-4 py-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-xl tracking-tight",
					children: "Thư viện giọng"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted-foreground",
					children: "CapCut TTS · lọc, nghe thử, gán vào nhân vật."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 flex flex-wrap items-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: q,
							onChange: (e) => setQ(e.target.value),
							placeholder: "Tìm giọng",
							className: "h-8 max-w-48"
						}),
						[
							"all",
							"female",
							"male",
							"child"
						].map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setGender(g),
							className: cn("rounded-full px-3 py-1 text-xs", gender === g ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"),
							children: g === "all" ? "Tất cả" : g === "female" ? "Nữ" : g === "male" ? "Nam" : "Trẻ em"
						}, g)),
						[
							"all",
							"young",
							"adult",
							"elder"
						].map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setAge(a),
							className: cn("rounded-full px-3 py-1 text-xs", age === a ? "bg-secondary text-foreground" : "text-muted-foreground"),
							children: a === "all" ? "Mọi tuổi" : a === "young" ? "Trẻ" : a === "adult" ? "Trưởng thành" : "Già"
						}, a))
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 flex flex-wrap items-center gap-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: sample,
							onChange: (e) => setSample(e.target.value),
							className: "h-8 max-w-md"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "flex items-center gap-2 text-xs text-muted-foreground",
							children: ["Tốc độ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
								className: "w-24",
								value: rate,
								min: 70,
								max: 130,
								onValueChange: setRate
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "flex items-center gap-2 text-xs text-muted-foreground",
							children: ["Cao độ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
								className: "w-24",
								value: pitch,
								min: -6,
								max: 6,
								onValueChange: setPitch
							})]
						})
					]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "min-h-0 flex-1 overflow-auto scroll-thin divide-y divide-border",
			children: list.map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "flex items-center gap-3 px-4 py-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => toggle(v.id),
						className: cn("text-muted-foreground", v.favorite && "text-foreground"),
						"aria-label": "Yêu thích",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: cn("size-4", v.favorite && "fill-current") })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm font-medium",
									children: v.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									variant: "outline",
									children: v.gender === "female" ? "Nữ" : v.gender === "male" ? "Nam" : "Trẻ"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs text-muted-foreground",
									children: v.style
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "truncate text-xs text-muted-foreground",
							children: v.sample
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						variant: playing === v.id ? "default" : "outline",
						onClick: () => preview(v.id, v.name),
						children: playing === v.id ? "Đang phát" : "Nghe thử"
					})
				]
			}, v.id))
		})]
	});
}
var SplitComponent = VoicesView;
//#endregion
export { SplitComponent as component };
