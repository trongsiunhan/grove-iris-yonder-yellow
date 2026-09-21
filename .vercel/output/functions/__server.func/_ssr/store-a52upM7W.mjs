import "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { A as Slot, F as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as create, t as persist } from "../_libs/zustand.mjs";
require_react();
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm text-sm font-medium transition-[opacity,transform,background-color,color,box-shadow] duration-150 ease-out disabled:pointer-events-none disabled:opacity-40 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-ring/50 active:not-disabled:scale-[0.96]", {
	variants: {
		variant: {
			default: "bg-primary text-primary-foreground hover:opacity-90",
			destructive: "bg-destructive text-primary-foreground hover:opacity-90",
			outline: "border border-border bg-transparent hover:bg-accent hover:text-accent-foreground",
			secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
			ghost: "hover:bg-accent hover:text-accent-foreground",
			link: "text-foreground underline-offset-4 hover:underline"
		},
		size: {
			default: "h-9 px-3.5",
			sm: "h-8 rounded-sm px-2.5 text-xs",
			lg: "h-11 rounded-md px-5",
			icon: "size-9",
			"icon-sm": "size-8"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
function Button({ className, variant, size, asChild = false, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		"data-slot": "button",
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		...props
	});
}
var STAGES = [
	{
		id: "ingest",
		name: "Đọc video",
		short: "Đọc"
	},
	{
		id: "separate",
		name: "Tách nhạc nền",
		short: "Tách nhạc"
	},
	{
		id: "asr",
		name: "Nhận diện lời thoại",
		short: "ASR"
	},
	{
		id: "segment",
		name: "Phân đoạn câu",
		short: "Phân đoạn"
	},
	{
		id: "translate",
		name: "Dịch tiếng Việt",
		short: "Dịch"
	},
	{
		id: "tts",
		name: "Tạo giọng nói",
		short: "TTS"
	},
	{
		id: "fit",
		name: "Khớp thời lượng",
		short: "Khớp"
	},
	{
		id: "mix",
		name: "Trộn âm thanh",
		short: "Trộn"
	},
	{
		id: "export",
		name: "Xuất video",
		short: "Xuất"
	}
];
var FLAG_META = {
	stretch: {
		label: "Nén quá mức",
		hint: "Giọng phải nén > 1.15× — sẽ nghe nhanh bất thường",
		tone: "danger"
	},
	"tts-fail": {
		label: "TTS lỗi",
		hint: "Không tổng hợp được giọng cho cue này",
		tone: "danger"
	},
	"asr-low": {
		label: "ASR thấp",
		hint: "Độ tin cậy nhận diện thấp — có thể nghe nhầm",
		tone: "warn"
	},
	shortened: {
		label: "Dịch rút gọn",
		hint: "Bản dịch bị rút gọn tự động — nên đọc lại",
		tone: "warn"
	},
	overlap: {
		label: "Chồng lời",
		hint: "Hai nhân vật nói chồng lên nhau",
		tone: "caution"
	},
	delayed: {
		label: "Bị đẩy trễ",
		hint: "Cue bị đẩy trễ so với mốc gốc",
		tone: "caution"
	},
	edited: {
		label: "Đã sửa tay",
		hint: "Nội dung đã được chỉnh thủ công",
		tone: "edit"
	}
};
var FLAG_ORDER = [
	"stretch",
	"tts-fail",
	"asr-low",
	"shortened",
	"overlap",
	"delayed",
	"edited"
];
var STATUS_LABEL = {
	queued: "Chờ",
	running: "Đang chạy",
	paused: "Tạm dừng",
	done: "Xong",
	error: "Lỗi",
	review: "Cần xem lại"
};
var SHORTCUTS = [
	{
		keys: "Space",
		action: "Phát / dừng"
	},
	{
		keys: "↑ ↓",
		action: "Chuyển cue"
	},
	{
		keys: "Enter",
		action: "Sửa lời dịch"
	},
	{
		keys: "Esc",
		action: "Thoát sửa"
	},
	{
		keys: "Ctrl+Enter",
		action: "Tạo lại giọng"
	},
	{
		keys: "N",
		action: "Cờ tiếp theo"
	},
	{
		keys: "Ctrl+S",
		action: "Lưu"
	},
	{
		keys: "Ctrl+K",
		action: "Command palette"
	}
];
var SERIES = [
	{
		id: "sen",
		title: "Mùa Sen Trên Sông",
		englishTitle: "Lotus Season",
		episodeTotal: 24,
		cover: "/covers/sen.jpg",
		year: 2024,
		synopsis: "A Ninh trở về quê cũ bên dòng sông sen, đối diện lời thề chưa trả của Mộ Thanh. Giang hồ rộng, hai tấm lòng thì hẹp."
	},
	{
		id: "hanoi",
		title: "Đêm Hà Nội Không Ngủ",
		englishTitle: "Sleepless Hanoi",
		episodeTotal: 16,
		cover: "/covers/hanoi.jpg",
		year: 2025,
		synopsis: "Một đêm mưa, một vụ mất tích, và những con phố cũ không chịu tắt đèn. Phim hình sự đương đại."
	},
	{
		id: "bien",
		title: "Biển Đông Gọi Tên",
		englishTitle: "The Eastern Sea",
		episodeTotal: 8,
		cover: "/covers/bien.jpg",
		year: 2023,
		synopsis: "Thuyền buồm thời Lê, hải trình một gia tộc muối. Gió đổi, tên người thì không."
	}
];
var CHARACTERS = [
	{
		id: "aninh",
		seriesId: "sen",
		name: "A Ninh",
		gender: "female",
		voiceId: "linh"
	},
	{
		id: "mothanh",
		seriesId: "sen",
		name: "Mộ Thanh",
		gender: "male",
		voiceId: "khang"
	},
	{
		id: "laotran",
		seriesId: "sen",
		name: "Lão Trần",
		gender: "male",
		voiceId: "hai"
	},
	{
		id: "tieuvu",
		seriesId: "sen",
		name: "Tiểu Vũ",
		gender: "child",
		voiceId: "na"
	},
	{
		id: "lien",
		seriesId: "sen",
		name: "Công chúa Liên",
		gender: "female",
		voiceId: "mai"
	},
	{
		id: "ha",
		seriesId: "hanoi",
		name: "Hà",
		gender: "female",
		voiceId: "linh"
	},
	{
		id: "khoa",
		seriesId: "hanoi",
		name: "Khoa",
		gender: "male",
		voiceId: "minh"
	}
];
var VOICES = [
	{
		id: "linh",
		name: "Linh",
		gender: "female",
		age: "young",
		style: "ấm, tự sự",
		favorite: true,
		sample: "Người ở lại, sen vẫn nở trên sông."
	},
	{
		id: "mai",
		name: "Mai",
		gender: "female",
		age: "adult",
		style: "sang, chậm rãi",
		favorite: true,
		sample: "Lời thề năm ấy, ta chưa quên."
	},
	{
		id: "ha-v",
		name: "Hạ",
		gender: "female",
		age: "young",
		style: "mỏng, hiện đại",
		favorite: false,
		sample: "Phố này không ngủ, chị ạ."
	},
	{
		id: "khang",
		name: "Khang",
		gender: "male",
		age: "adult",
		style: "trầm, rõ chữ",
		favorite: true,
		sample: "Giang hồ rộng, lòng người thì hẹp."
	},
	{
		id: "minh",
		name: "Minh",
		gender: "male",
		age: "young",
		style: "khô, thành thị",
		favorite: false,
		sample: "Anh không hỏi lần nữa."
	},
	{
		id: "hai",
		name: "Ông Hải",
		gender: "male",
		age: "elder",
		style: "già, khàn",
		favorite: true,
		sample: "Trẻ người non dạ, đừng ra sông đêm nay."
	},
	{
		id: "son",
		name: "Sơn",
		gender: "male",
		age: "adult",
		style: "mạnh, võ",
		favorite: false,
		sample: "Rút kiếm thì không còn đường lui."
	},
	{
		id: "na",
		name: "Bé Na",
		gender: "child",
		age: "young",
		style: "trẻ, trong",
		favorite: true,
		sample: "Tỷ tỷ, sen nở rồi này!"
	},
	{
		id: "vy",
		name: "Vy",
		gender: "female",
		age: "elder",
		style: "mẹ, ấm",
		favorite: false,
		sample: "Con về đi, cơm còn nóng."
	},
	{
		id: "duc",
		name: "Đức",
		gender: "male",
		age: "elder",
		style: "sử, trang nghiêm",
		favorite: false,
		sample: "Biển Đông gọi tên, người chớ quên."
	},
	{
		id: "tram",
		name: "Trâm",
		gender: "female",
		age: "adult",
		style: "lạnh, quý tộc",
		favorite: false,
		sample: "Ngai vàng không chứa nổi một chữ tình."
	},
	{
		id: "phong",
		name: "Phong",
		gender: "male",
		age: "young",
		style: "nhanh, hài",
		favorite: false,
		sample: "Thôi thôi, lần này tỷ để em trả."
	}
];
var GLOSSARY = [
	{
		id: "g1",
		seriesId: "sen",
		source: "阿宁",
		target: "A Ninh",
		kind: "character"
	},
	{
		id: "g2",
		seriesId: "sen",
		source: "慕清",
		target: "Mộ Thanh",
		kind: "character"
	},
	{
		id: "g3",
		seriesId: "sen",
		source: "陈老",
		target: "Lão Trần",
		kind: "character"
	},
	{
		id: "g4",
		seriesId: "sen",
		source: "小雨",
		target: "Tiểu Vũ",
		kind: "character"
	},
	{
		id: "g5",
		seriesId: "sen",
		source: "莲公主",
		target: "Công chúa Liên",
		kind: "character"
	},
	{
		id: "g6",
		seriesId: "sen",
		source: "荷花洲",
		target: "Bãi Sen",
		kind: "place"
	},
	{
		id: "g7",
		seriesId: "sen",
		source: "清河门",
		target: "Thanh Hà Môn",
		kind: "place"
	},
	{
		id: "g8",
		seriesId: "sen",
		source: "红莲剑",
		target: "Hồng Liên Kiếm",
		kind: "term"
	},
	{
		id: "g9",
		seriesId: "sen",
		source: "宁宁",
		target: "Ninh Ninh",
		kind: "nickname"
	},
	{
		id: "g10",
		seriesId: "sen",
		source: "清哥哥",
		target: "Thanh ca ca",
		kind: "nickname"
	},
	{
		id: "g11",
		seriesId: "sen",
		source: "无心渡",
		target: "Vô Tâm Độ",
		kind: "place",
		pending: true
	},
	{
		id: "g12",
		seriesId: "sen",
		source: "白鹭湾",
		target: "Vịnh Bạch Lộ",
		kind: "place",
		pending: true
	},
	{
		id: "g13",
		seriesId: "hanoi",
		source: "Hà",
		target: "Hà",
		kind: "character"
	},
	{
		id: "g14",
		seriesId: "hanoi",
		source: "Khoa",
		target: "Khoa",
		kind: "character"
	},
	{
		id: "g15",
		seriesId: "hanoi",
		source: "Phố Cổ",
		target: "Phố Cổ",
		kind: "place"
	}
];
function stages(doneThrough, running, cached = [], errorIndex) {
	return STAGES.map((s, i) => {
		let status = "pending";
		let progress = 0;
		let elapsedMs = 0;
		if (cached.includes(s.id)) {
			status = "cached";
			progress = 100;
			elapsedMs = 400 + i * 180;
		} else if (errorIndex === i) {
			status = "error";
			progress = 62;
			elapsedMs = 8e3 + i * 400;
		} else if (running && running.index === i) {
			status = "running";
			progress = running.progress;
			elapsedMs = 12e3 + i * 900;
		} else if (i < doneThrough) {
			status = "done";
			progress = 100;
			elapsedMs = [
				4200,
				38e3,
				96e3,
				14e3,
				22e3,
				124e3,
				18e3,
				9e3,
				41e3
			][i] ?? 8e3;
		}
		return {
			id: s.id,
			name: s.name,
			elapsedMs,
			progress,
			status
		};
	});
}
var now = Date.now();
var JOBS = [
	{
		id: "job-sen-07",
		fileName: "Mua.Sen.Tren.Song.S01E07.1080p.mkv",
		durationSec: 2562,
		seriesId: "sen",
		episode: 7,
		status: "running",
		stageIndex: 5,
		stageProgress: 64,
		etaSec: 428,
		createdAt: (/* @__PURE__ */ new Date(now - 276e4)).toISOString(),
		flagCount: 0,
		cachedStages: [
			"ingest",
			"separate",
			"asr",
			"segment"
		],
		stages: stages(5, {
			index: 5,
			progress: 64
		}, [
			"ingest",
			"separate",
			"asr",
			"segment"
		]),
		errorMessage: null,
		errorHint: null,
		still: "/stills/sen-dock.jpg",
		logs: [
			"12:04:11  cache hit · Đọc video",
			"12:04:11  cache hit · Tách nhạc nền",
			"12:04:12  cache hit · ASR (large-v3)",
			"12:04:12  cache hit · Phân đoạn · 412 cue",
			"12:04:18  dịch · Gemini web · batch 4/9",
			"12:08:02  tts · CapCut · A Ninh 88/124",
			"12:08:41  tts · CapCut · Mộ Thanh 41/96"
		]
	},
	{
		id: "job-sen-06",
		fileName: "Mua.Sen.Tren.Song.S01E06.1080p.mkv",
		durationSec: 2538,
		seriesId: "sen",
		episode: 6,
		status: "review",
		stageIndex: 8,
		stageProgress: 100,
		etaSec: null,
		createdAt: (/* @__PURE__ */ new Date(now - 18e6)).toISOString(),
		flagCount: 11,
		cachedStages: [],
		stages: stages(9),
		errorMessage: null,
		errorHint: null,
		still: "/stills/sen-tea.jpg",
		logs: [
			"07:12:04  xuất xong · 42:18 · 11 cờ cần xem",
			"07:12:04  stretch>1.15 · 4 cue",
			"07:12:04  asr-low · 3 cue · shortened · 2 cue"
		]
	},
	{
		id: "job-sen-05",
		fileName: "Mua.Sen.Tren.Song.S01E05.1080p.mkv",
		durationSec: 2490,
		seriesId: "sen",
		episode: 5,
		status: "done",
		stageIndex: 8,
		stageProgress: 100,
		etaSec: null,
		createdAt: (/* @__PURE__ */ new Date(now - 108e6)).toISOString(),
		flagCount: 0,
		cachedStages: [],
		stages: stages(9),
		errorMessage: null,
		errorHint: null,
		still: "/stills/sen-dock.jpg",
		logs: ["02:11:08  xuất xong · không cờ"]
	},
	{
		id: "job-sen-08",
		fileName: "Mua.Sen.Tren.Song.S01E08.1080p.mkv",
		durationSec: 2610,
		seriesId: "sen",
		episode: 8,
		status: "queued",
		stageIndex: 0,
		stageProgress: 0,
		etaSec: null,
		createdAt: (/* @__PURE__ */ new Date(now - 72e4)).toISOString(),
		flagCount: 0,
		cachedStages: ["ingest"],
		stages: stages(0, void 0, ["ingest"]),
		errorMessage: null,
		errorHint: null,
		still: "/stills/sen-dock.jpg",
		logs: ["12:31:02  đã đọc video · chờ GPU"]
	},
	{
		id: "job-hn-01",
		fileName: "Dem.Ha.Noi.Khong.Ngu.E01.2160p.mkv",
		durationSec: 3120,
		seriesId: "hanoi",
		episode: 1,
		status: "error",
		stageIndex: 4,
		stageProgress: 62,
		etaSec: null,
		createdAt: (/* @__PURE__ */ new Date(now - 72e5)).toISOString(),
		flagCount: 0,
		cachedStages: [
			"ingest",
			"separate",
			"asr",
			"segment"
		],
		stages: stages(4, void 0, [
			"ingest",
			"separate",
			"asr",
			"segment"
		], 4),
		errorMessage: "Gemini web trả 429 — quá giới hạn phiên.",
		errorHint: "Đợi 2 phút rồi thử lại bước Dịch, hoặc chuyển nguồn dịch sang LLM local trong Cài đặt.",
		still: "/covers/hanoi.jpg",
		logs: ["10:14:22  dịch · Gemini web · HTTP 429", "10:14:22  dừng tại bước Dịch tiếng Việt"]
	},
	{
		id: "job-hn-02",
		fileName: "Dem.Ha.Noi.Khong.Ngu.E02.2160p.mkv",
		durationSec: 2988,
		seriesId: "hanoi",
		episode: 2,
		status: "paused",
		stageIndex: 2,
		stageProgress: 41,
		etaSec: 890,
		createdAt: (/* @__PURE__ */ new Date(now - 48e5)).toISOString(),
		flagCount: 0,
		cachedStages: ["ingest", "separate"],
		stages: stages(2, {
			index: 2,
			progress: 41
		}, ["ingest", "separate"]),
		errorMessage: null,
		errorHint: null,
		still: "/covers/hanoi.jpg",
		logs: ["11:22:10  tạm dừng · ASR 41%"]
	},
	{
		id: "job-bien-01",
		fileName: "Bien.Dong.Goi.Ten.E01.1080p.mkv",
		durationSec: 2814,
		seriesId: "bien",
		episode: 1,
		status: "running",
		stageIndex: 2,
		stageProgress: 28,
		etaSec: 1100,
		createdAt: (/* @__PURE__ */ new Date(now - 108e4)).toISOString(),
		flagCount: 0,
		cachedStages: ["ingest"],
		stages: stages(2, {
			index: 2,
			progress: 28
		}, ["ingest"]),
		errorMessage: null,
		errorHint: null,
		still: "/covers/bien.jpg",
		logs: ["12:26:04  ASR large-v3 · CUDA · 28%"]
	},
	{
		id: "job-loose",
		fileName: "clip-thu-10s.mp4",
		durationSec: 12,
		seriesId: null,
		episode: null,
		status: "queued",
		stageIndex: 0,
		stageProgress: 0,
		etaSec: null,
		createdAt: (/* @__PURE__ */ new Date(now - 24e4)).toISOString(),
		flagCount: 0,
		cachedStages: [],
		stages: stages(0),
		errorMessage: null,
		errorHint: null,
		still: "/stills/sen-tea.jpg",
		logs: []
	}
];
var SEN06_LINES = [
	{
		characterId: "aninh",
		original: "慕清，你还记得那年的荷花吗？",
		translation: "Mộ Thanh, ngươi còn nhớ hoa sen năm ấy không?",
		dur: 3200,
		gap: 400
	},
	{
		characterId: "mothanh",
		original: "记得。河上全是雾，你非要下去摘。",
		translation: "Nhớ. Sông đầy sương, nàng cứ nhất định xuống hái.",
		dur: 3800,
		gap: 280
	},
	{
		characterId: "aninh",
		original: "那时候我不怕。现在怕了。",
		translation: "Lúc ấy ta không sợ. Bây giờ thì sợ.",
		dur: 2900,
		gap: 900,
		flags: ["asr-low"],
		asr: .62
	},
	{
		characterId: "laotran",
		original: "夜里别下河。水冷，心也冷。",
		translation: "Đêm đừng ra sông. Nước lạnh, lòng cũng lạnh.",
		dur: 3400,
		gap: 500
	},
	{
		characterId: "tieuvu",
		original: "宁宁姐姐！荷花开了！",
		translation: "Tỷ Ninh Ninh! Sen nở rồi!",
		dur: 2100,
		gap: 180,
		flags: ["overlap"]
	},
	{
		characterId: "aninh",
		original: "小雨慢一点，码头滑。",
		translation: "Tiểu Vũ chậm thôi, cầu trơn.",
		dur: 2400,
		gap: 700
	},
	{
		characterId: "lien",
		original: "清河门今夜闭城。你们不该来。",
		translation: "Thanh Hà Môn đêm nay đóng cửa. Các người không nên đến.",
		dur: 4100,
		gap: 360,
		flags: ["shortened"],
		stretch: 1.12
	},
	{
		characterId: "mothanh",
		original: "我来还当年那一剑。",
		translation: "Ta đến trả một kiếm năm xưa.",
		dur: 2600,
		gap: 420
	},
	{
		characterId: "lien",
		original: "红莲剑不认旧主。",
		translation: "Hồng Liên Kiếm chẳng nhận chủ cũ.",
		dur: 2500,
		gap: 800,
		flags: ["stretch"],
		stretch: 1.22
	},
	{
		characterId: "aninh",
		original: "它认的是心，不是手。",
		translation: "Nó nhận lòng, không nhận tay.",
		dur: 2700,
		gap: 640
	},
	{
		characterId: "laotran",
		original: "你们三个，把江湖说得太轻。",
		translation: "Ba đứa, nói giang hồ nhẹ quá.",
		dur: 3300,
		gap: 500
	},
	{
		characterId: "mothanh",
		original: "轻也好。重的是她。",
		translation: "Nhẹ cũng được. Nặng là nàng.",
		dur: 2400,
		gap: 1100
	},
	{
		characterId: "aninh",
		original: "别这样看着我。",
		translation: "Đừng nhìn ta như thế.",
		dur: 1800,
		gap: 300,
		flags: ["asr-low"],
		asr: .58
	},
	{
		characterId: "mothanh",
		original: "荷花洲的雾散了。我该走了。",
		translation: "Sương Bãi Sen tan rồi. Ta phải đi.",
		dur: 3600,
		gap: 480
	},
	{
		characterId: "aninh",
		original: "走去哪里？无心渡还是白鹭湾？",
		translation: "Đi đâu? Vô Tâm Độ hay Vịnh Bạch Lộ?",
		dur: 3400,
		gap: 220,
		flags: ["shortened", "edited"],
		stretch: 1.09
	},
	{
		characterId: "tieuvu",
		original: "清哥哥带我去看船好不好？",
		translation: "Thanh ca ca đưa Vũ đi xem thuyền được không?",
		dur: 2800,
		gap: 700
	},
	{
		characterId: "mothanh",
		original: "改天。今晚的风不对。",
		translation: "Hôm khác. Gió đêm nay không phải.",
		dur: 2600,
		gap: 540,
		flags: ["delayed"]
	},
	{
		characterId: "lien",
		original: "慕清，你若拔剑，这座城会先倒下。",
		translation: "Mộ Thanh, nếu ngươi rút kiếm, thành này ngã trước.",
		dur: 4400,
		gap: 280,
		flags: ["stretch"],
		stretch: 1.28
	},
	{
		characterId: "mothanh",
		original: "那便让它倒。",
		translation: "Vậy thì để nó ngã.",
		dur: 1600,
		gap: 900
	},
	{
		characterId: "aninh",
		original: "够了。今晚谁也不许拔剑。",
		translation: "Đủ rồi. Đêm nay không ai được rút kiếm.",
		dur: 3100,
		gap: 480
	},
	{
		characterId: "laotran",
		original: "这句话，像你娘。",
		translation: "Câu này, giống mẹ ngươi.",
		dur: 2200,
		gap: 1200
	},
	{
		characterId: "aninh",
		original: "她把我留在河上，就是为了今晚。",
		translation: "Bà ấy để ta lại trên sông, là vì đêm nay.",
		dur: 3800,
		gap: 360,
		flags: ["asr-low"],
		asr: .71
	},
	{
		characterId: "mothanh",
		original: "阿宁。我可以不走。",
		translation: "A Ninh. Ta có thể không đi.",
		dur: 2500,
		gap: 200
	},
	{
		characterId: "aninh",
		original: "你可以。但清河门不可以。",
		translation: "Ngươi có thể. Thanh Hà Môn thì không.",
		dur: 3e3,
		gap: 700
	},
	{
		characterId: "lien",
		original: "把剑放下。我们谈谈荷花。",
		translation: "Hạ kiếm. Chúng ta nói về sen.",
		dur: 2900,
		gap: 500,
		flags: ["tts-fail"],
		stretch: 1
	},
	{
		characterId: "tieuvu",
		original: "姐姐，我摘了一朵最大的。",
		translation: "Tỷ tỷ, Vũ hái bông to nhất.",
		dur: 2400,
		gap: 380
	},
	{
		characterId: "aninh",
		original: "放回去。花要留在水上才活。",
		translation: "Thả lại. Hoa phải ở trên nước mới sống.",
		dur: 3200,
		gap: 860
	},
	{
		characterId: "mothanh",
		original: "像我们一样。",
		translation: "Như chúng ta.",
		dur: 1400,
		gap: 1100,
		flags: ["edited"]
	},
	{
		characterId: "laotran",
		original: "雾又来了。回屋吧。",
		translation: "Sương lại đến. Về nhà đi.",
		dur: 2400,
		gap: 420
	},
	{
		characterId: "lien",
		original: "慕清，红莲剑今夜归鞘，便饶你一次。",
		translation: "Mộ Thanh, Hồng Liên Kiếm đêm nay về vỏ, ta tha một lần.",
		dur: 4600,
		gap: 240,
		flags: ["stretch", "shortened"],
		stretch: 1.31
	},
	{
		characterId: "mothanh",
		original: "我不要被饶。我要她安稳。",
		translation: "Ta không cần được tha. Ta cần nàng yên.",
		dur: 3200,
		gap: 600
	},
	{
		characterId: "aninh",
		original: "安稳是假的。河还在。",
		translation: "Yên là giả. Sông vẫn còn.",
		dur: 2400,
		gap: 780
	},
	{
		characterId: "tieuvu",
		original: "那我们明天再摘好不好？",
		translation: "Vậy mai mình hái tiếp được không?",
		dur: 2500,
		gap: 500
	},
	{
		characterId: "aninh",
		original: "好。明天，雾散了再摘。",
		translation: "Được. Mai, sương tan rồi hái.",
		dur: 2800,
		gap: 1400
	},
	{
		characterId: "mothanh",
		original: "若我不在，你也要摘。",
		translation: "Nếu ta không còn, nàng cũng phải hái.",
		dur: 2700,
		gap: 360,
		flags: ["delayed"]
	},
	{
		characterId: "aninh",
		original: "你在不在，花都会开。",
		translation: "Ngươi có hay không, hoa vẫn nở.",
		dur: 2600,
		gap: 900,
		flags: ["edited"]
	},
	{
		characterId: "laotran",
		original: "这句话，像你爹。",
		translation: "Câu này, giống cha ngươi.",
		dur: 2100,
		gap: 700
	},
	{
		characterId: "lien",
		original: "城门开了。你们走吧，趁还走得成。",
		translation: "Cửa thành mở. Đi đi, còn đi được thì đi.",
		dur: 3800,
		gap: 320,
		flags: ["overlap"]
	},
	{
		characterId: "mothanh",
		original: "阿宁，把这朵戴上。",
		translation: "A Ninh, đeo bông này.",
		dur: 2200,
		gap: 200
	},
	{
		characterId: "aninh",
		original: "戴上了，就更像要分别。",
		translation: "Đeo rồi, càng giống sắp chia.",
		dur: 2800,
		gap: 540
	},
	{
		characterId: "mothanh",
		original: "分别也要好看。",
		translation: "Chia cũng phải đẹp.",
		dur: 1600,
		gap: 1e3
	},
	{
		characterId: "tieuvu",
		original: "我不要分别。我要船。",
		translation: "Vũ không muốn chia. Vũ muốn thuyền.",
		dur: 2300,
		gap: 480
	},
	{
		characterId: "laotran",
		original: "船在湾里。人在岸上。这就够了。",
		translation: "Thuyền ở vịnh. Người trên bờ. Thế là đủ.",
		dur: 3600,
		gap: 620
	},
	{
		characterId: "aninh",
		original: "今晚的河，比那年安静。",
		translation: "Sông đêm nay, yên hơn năm ấy.",
		dur: 3e3,
		gap: 400,
		flags: ["asr-low"],
		asr: .66
	},
	{
		characterId: "mothanh",
		original: "因为有你说话。",
		translation: "Vì có nàng nói.",
		dur: 1800,
		gap: 800
	},
	{
		characterId: "lien",
		original: "够了。别把离别说成诗。",
		translation: "Đủ. Đừng biến chia ly thành thơ.",
		dur: 2800,
		gap: 500,
		flags: ["stretch"],
		stretch: 1.19
	},
	{
		characterId: "aninh",
		original: "那就别离。明天，雾散了，我们还在。",
		translation: "Vậy thì đừng chia. Mai, sương tan, chúng ta còn đây.",
		dur: 4200,
		gap: 360
	},
	{
		characterId: "mothanh",
		original: "好。我等雾散。",
		translation: "Được. Ta đợi sương tan.",
		dur: 2e3,
		gap: 0
	}
];
function buildCues(jobId, lines, startAt = 184e3) {
	let t = startAt;
	return lines.map((line, i) => {
		const startMs = t;
		const endMs = t + line.dur;
		t = endMs + line.gap;
		const character = CHARACTERS.find((c) => c.id === line.characterId);
		return {
			id: `${jobId}-c${i + 1}`,
			jobId,
			index: i + 1,
			startMs,
			endMs,
			characterId: line.characterId,
			original: line.original,
			translation: line.translation,
			stretch: line.stretch ?? .92 + i * 17 % 18 / 100,
			flags: line.flags ?? [],
			voiceId: character?.voiceId ?? "linh",
			asrConfidence: line.asr ?? .92 - i % 9 * .01,
			note: ""
		};
	});
}
var CUES = [
	...buildCues("job-sen-06", SEN06_LINES),
	...buildCues("job-sen-07", SEN06_LINES.slice(0, 18), 21e4),
	...buildCues("job-sen-05", SEN06_LINES.slice(10, 28), 9e4)
];
var DEFAULT_SETTINGS = {
	exportDir: "~/Lồng/Xuất",
	cacheDir: "~/Lồng/Cache",
	locale: "vi",
	theme: "dark",
	parallelJobs: 2,
	cacheGb: 64,
	qualityProfile: "high",
	nvdec: true,
	nvenc: true,
	separateBg: true,
	speechRate: 5.8,
	maxStretch: 1.15,
	autoShorten: true,
	maxDelayMs: 180,
	asrThreshold: .72,
	translateSource: "gemini",
	subtitlesEnabled: true,
	subFont: "IBM Plex Sans",
	subSize: 42,
	subColor: "#F4F1EA",
	subOutline: "#111114",
	subOutlineWidth: 3,
	subShadow: true,
	subPosition: "bottom",
	subMargin: 64,
	subByCharacter: false,
	maxLines: 2,
	charsPerLine: 18,
	exportMode: "sidecar",
	exportFormat: "mkv",
	encoder: "nvenc",
	cq: 18,
	lufs: -16,
	voiceBgRatio: .72,
	keepOriginalTrack: true,
	fileNamePattern: "{bộ}.T{tập}.{ngày}"
};
var MODELS = [
	{
		id: "whisper",
		step: "ASR",
		name: "Whisper large-v3",
		sizeGb: 2.9,
		downloaded: true,
		progress: 100
	},
	{
		id: "demucs",
		step: "Tách nhạc",
		name: "Demucs htdemucs",
		sizeGb: 1.1,
		downloaded: true,
		progress: 100
	},
	{
		id: "pyannote",
		step: "Diarization",
		name: "pyannote 3.1",
		sizeGb: .6,
		downloaded: true,
		progress: 100
	},
	{
		id: "nllb",
		step: "Dịch local",
		name: "NLLB-200 1.3B",
		sizeGb: 2.4,
		downloaded: false,
		progress: 0
	},
	{
		id: "align",
		step: "Khớp",
		name: "Wav2Vec2 CTC",
		sizeGb: .4,
		downloaded: true,
		progress: 100
	}
];
var DOCTOR_CHECKS = [
	{
		id: "ffmpeg",
		label: "ffmpeg",
		ok: true,
		detail: "7.1.1 · n6.1 nvenc/nvdec",
		fix: ""
	},
	{
		id: "gpu",
		label: "GPU / CUDA",
		ok: true,
		detail: "RTX 4070 · 12.2 GB · CUDA 12.6",
		fix: ""
	},
	{
		id: "models",
		label: "Model",
		ok: true,
		detail: "4/5 đã tải · thiếu NLLB-200",
		fix: "Tải NLLB trong Cài đặt → Model nếu dùng dịch local."
	},
	{
		id: "capcut",
		label: "CapCut TTS",
		ok: true,
		detail: "Đã kết nối · độ trễ 420ms",
		fix: ""
	},
	{
		id: "write",
		label: "Quyền ghi thư mục",
		ok: true,
		detail: "~/Lồng/Xuất và Cache ghi được",
		fix: ""
	}
];
function pad2(n) {
	return n.toString().padStart(2, "0");
}
function formatClock(ms) {
	const total = Math.max(0, Math.floor(ms / 1e3));
	const h = Math.floor(total / 3600);
	const m = Math.floor(total % 3600 / 60);
	const s = total % 60;
	const frac = Math.floor(ms % 1e3 / 10);
	if (h > 0) return `${h}:${pad2(m)}:${pad2(s)}.${pad2(frac)}`;
	return `${pad2(m)}:${pad2(s)}.${pad2(frac)}`;
}
function formatDuration(sec) {
	const s = Math.max(0, Math.round(sec));
	const h = Math.floor(s / 3600);
	const m = Math.floor(s % 3600 / 60);
	const r = s % 60;
	if (h > 0) return `${h}:${pad2(m)}:${pad2(r)}`;
	return `${m}:${pad2(r)}`;
}
function formatEta(sec) {
	if (sec == null) return "—";
	if (sec < 60) return `${Math.max(1, Math.round(sec))}s`;
	const m = Math.floor(sec / 60);
	const s = Math.round(sec % 60);
	if (m < 60) return `${m}p ${pad2(s)}s`;
	return `${Math.floor(m / 60)}g ${m % 60}p`;
}
function formatMs(ms) {
	if (ms < 1e3) return `${Math.round(ms)}ms`;
	return `${(ms / 1e3).toFixed(1)}s`;
}
function formatStretch(n) {
	return `${n.toFixed(2)}×`;
}
function episodeLabel(ep) {
	if (ep == null) return "Lẻ";
	return `Tập ${String(ep).padStart(2, "0")}`;
}
function parseEpisodeFromName(name) {
	const ep = name.match(/[Ee][Pp]?[\s._-]*(\d{1,3})/) ?? name.match(/[Tt]ập[\s._-]*(\d{1,3})/) ?? name.match(/S\d+E(\d{1,3})/i);
	const episode = ep ? Number(ep[1]) : null;
	return {
		seriesHint: name.replace(/\.[^.]+$/, "").replace(/[._]/g, " ").replace(/\s+/g, " ").trim(),
		episode
	};
}
function matchSeries(name) {
	const { episode } = parseEpisodeFromName(name);
	const lower = name.toLowerCase();
	if (lower.includes("sen") || lower.includes("lotus") || lower.includes("mua")) return {
		seriesId: "sen",
		episode
	};
	if (lower.includes("ha noi") || lower.includes("hanoi") || lower.includes("dem")) return {
		seriesId: "hanoi",
		episode
	};
	if (lower.includes("bien") || lower.includes("sea")) return {
		seriesId: "bien",
		episode
	};
	return {
		seriesId: null,
		episode
	};
}
function recountFlags(cues, jobId) {
	return cues.filter((c) => c.jobId === jobId && c.flags.some((f) => f !== "edited")).length;
}
var useAppStore = create()(persist((set, get) => ({
	jobs: JOBS,
	cues: CUES,
	series: SERIES,
	glossary: GLOSSARY,
	voices: VOICES,
	settings: DEFAULT_SETTINGS,
	models: MODELS,
	selectedJobIds: [],
	selectedCueId: CUES.find((c) => c.jobId === "job-sen-06")?.id ?? null,
	playing: false,
	playheadMs: CUES.find((c) => c.jobId === "job-sen-06")?.startMs ?? 0,
	previewTrack: "mix",
	cueFilter: "all",
	cueQuery: "",
	queueQuery: "",
	queueStatus: "all",
	queueSeries: "all",
	onboarding: true,
	commandOpen: false,
	shortcutsOpen: false,
	confirm: null,
	dropActive: false,
	hydrated: false,
	setHydrated: () => set({ hydrated: true }),
	setTheme: (theme) => {
		set((s) => ({ settings: {
			...s.settings,
			theme
		} }));
		if (typeof document !== "undefined") {
			document.documentElement.classList.toggle("dark", theme === "dark");
			document.documentElement.classList.toggle("light", theme === "light");
		}
	},
	patchSettings: (patch) => set((s) => ({ settings: {
		...s.settings,
		...patch
	} })),
	setCommandOpen: (commandOpen) => set({ commandOpen }),
	setShortcutsOpen: (shortcutsOpen) => set({ shortcutsOpen }),
	setOnboarding: (onboarding) => set({ onboarding }),
	setDropActive: (dropActive) => set({ dropActive }),
	setConfirm: (confirm) => set({ confirm }),
	setQueueQuery: (queueQuery) => set({ queueQuery }),
	setQueueStatus: (queueStatus) => set({ queueStatus }),
	setQueueSeries: (queueSeries) => set({ queueSeries }),
	toggleSelectJob: (id) => set((s) => ({ selectedJobIds: s.selectedJobIds.includes(id) ? s.selectedJobIds.filter((x) => x !== id) : [...s.selectedJobIds, id] })),
	clearJobSelection: () => set({ selectedJobIds: [] }),
	addFiles: (names) => {
		const added = names.map((fileName, i) => {
			const { seriesId, episode } = matchSeries(fileName);
			const series = SERIES.find((x) => x.id === seriesId);
			const id = `job-${Date.now()}-${i}`;
			toast.success("Đã thêm vào hàng đợi", { description: fileName });
			return {
				id,
				fileName,
				durationSec: 1800 + Math.round(Math.random() * 900),
				seriesId,
				episode,
				status: "queued",
				stageIndex: 0,
				stageProgress: 0,
				etaSec: null,
				createdAt: (/* @__PURE__ */ new Date()).toISOString(),
				flagCount: 0,
				cachedStages: [],
				stages: STAGES.map((st) => ({
					id: st.id,
					name: st.name,
					elapsedMs: 0,
					progress: 0,
					status: "pending"
				})),
				errorMessage: null,
				errorHint: null,
				still: series?.cover ?? "/stills/sen-dock.jpg",
				logs: series ? [`Nhận diện · ${series.title} · Tập ${episode ?? "?"}`] : ["File lẻ · chưa gán bộ phim"]
			};
		});
		set((s) => ({ jobs: [...added, ...s.jobs] }));
	},
	startJob: (id) => {
		set((s) => ({ jobs: s.jobs.map((j) => j.id === id ? {
			...j,
			status: "running",
			etaSec: j.etaSec ?? 480,
			logs: [`${stamp()} bắt đầu`, ...j.logs].slice(0, 40)
		} : j) }));
		toast.message("Đã bắt đầu", { description: get().jobs.find((j) => j.id === id)?.fileName });
	},
	pauseJob: (id) => set((s) => ({ jobs: s.jobs.map((j) => j.id === id ? {
		...j,
		status: "paused",
		logs: [`${stamp()} tạm dừng`, ...j.logs].slice(0, 40)
	} : j) })),
	resumeJob: (id) => get().startJob(id),
	cancelJob: (id) => set((s) => ({ jobs: s.jobs.map((j) => j.id === id ? {
		...j,
		status: "queued",
		stageProgress: 0,
		logs: [`${stamp()} đã huỷ`, ...j.logs].slice(0, 40)
	} : j) })),
	deleteJob: (id, wipeCache) => {
		set((s) => ({
			jobs: s.jobs.filter((j) => j.id !== id),
			selectedJobIds: s.selectedJobIds.filter((x) => x !== id)
		}));
		toast("Đã xoá khỏi hàng đợi", { description: wipeCache ? "Đã xoá cả cache" : void 0 });
	},
	reorderJobs: (from, to) => set((s) => {
		const next = s.jobs.slice();
		const [item] = next.splice(from, 1);
		if (!item) return s;
		next.splice(to, 0, item);
		return { jobs: next };
	}),
	retryStage: (jobId, stageId) => {
		const idx = STAGES.findIndex((s) => s.id === stageId);
		set((s) => ({ jobs: s.jobs.map((j) => {
			if (j.id !== jobId) return j;
			const stages = j.stages.map((st, i) => i < idx ? st : i === idx ? {
				...st,
				status: "running",
				progress: 8,
				elapsedMs: 0
			} : {
				...st,
				status: "pending",
				progress: 0
			});
			return {
				...j,
				status: "running",
				stageIndex: idx,
				stageProgress: 8,
				stages,
				errorMessage: null,
				errorHint: null,
				logs: [`${stamp()} chạy lại từ ${STAGES[idx]?.name}`, ...j.logs].slice(0, 40)
			};
		}) }));
		toast.success("Chạy lại bước", { description: STAGES[idx]?.name });
	},
	applyJobToSeries: (jobId) => {
		const job = get().jobs.find((j) => j.id === jobId);
		if (!job?.seriesId) return;
		toast.success("Đã áp dụng cài đặt cho cả bộ", { description: SERIES.find((s) => s.id === job.seriesId)?.title });
	},
	bulk: (action) => {
		const ids = get().selectedJobIds;
		if (ids.length === 0) return;
		if (action === "start") ids.forEach((id) => get().startJob(id));
		if (action === "cancel") ids.forEach((id) => get().cancelJob(id));
		if (action === "delete") set((s) => ({
			jobs: s.jobs.filter((j) => !ids.includes(j.id)),
			selectedJobIds: []
		}));
	},
	tick: () => set((s) => {
		let changed = false;
		const jobs = s.jobs.map((j) => {
			if (j.status !== "running") return j;
			changed = true;
			let stageIndex = j.stageIndex;
			let stageProgress = j.stageProgress + 3 + Math.random() * 4;
			let status = "running";
			const stages = j.stages.map((st) => ({ ...st }));
			const current = stages[stageIndex];
			if (current) {
				current.status = "running";
				current.progress = Math.min(100, stageProgress);
				current.elapsedMs += 800;
			}
			const logs = j.logs.slice();
			if (stageProgress >= 100) {
				if (current) {
					current.status = "done";
					current.progress = 100;
				}
				stageProgress = 4;
				stageIndex += 1;
				if (stageIndex >= STAGES.length) {
					const flags = recountFlags(s.cues, j.id);
					status = flags > 0 ? "review" : "done";
					stageIndex = STAGES.length - 1;
					stageProgress = 100;
					logs.unshift(`${stamp()} hoàn tất`);
					queueMicrotask(() => toast.success(flags ? "Xong — còn cờ cần xem" : "Job hoàn tất", { description: j.fileName }));
				} else {
					const next = stages[stageIndex];
					if (next) next.status = "running";
					logs.unshift(`${stamp()} ${STAGES[stageIndex]?.name}`);
				}
			}
			const remainingStages = Math.max(0, STAGES.length - stageIndex - stageProgress / 100);
			return {
				...j,
				status,
				stageIndex,
				stageProgress: Math.min(100, stageProgress),
				stages,
				etaSec: status === "running" ? Math.round(remainingStages * 90) : null,
				flagCount: status === "review" || status === "done" ? recountFlags(s.cues, j.id) : j.flagCount,
				logs: logs.slice(0, 40)
			};
		});
		return changed ? { jobs } : s;
	}),
	selectCue: (selectedCueId) => {
		const cue = get().cues.find((c) => c.id === selectedCueId);
		set({
			selectedCueId,
			playheadMs: cue ? cue.startMs : get().playheadMs
		});
	},
	setPlaying: (playing) => set({ playing }),
	setPlayhead: (playheadMs) => set({ playheadMs }),
	setPreviewTrack: (previewTrack) => set({ previewTrack }),
	setCueFilter: (cueFilter) => set({ cueFilter }),
	setCueQuery: (cueQuery) => set({ cueQuery }),
	updateCue: (id, patch) => set((s) => {
		const cues = s.cues.map((c) => {
			if (c.id !== id) return c;
			const flags = new Set(c.flags);
			flags.add("edited");
			return {
				...c,
				...patch,
				flags: Array.from(flags)
			};
		});
		const cue = cues.find((c) => c.id === id);
		return {
			cues,
			jobs: cue ? s.jobs.map((j) => j.id === cue.jobId ? {
				...j,
				flagCount: recountFlags(cues, j.id)
			} : j) : s.jobs
		};
	}),
	splitCue: (id) => set((s) => {
		const idx = s.cues.findIndex((c) => c.id === id);
		const cue = s.cues[idx];
		if (!cue) return s;
		const mid = Math.round((cue.startMs + cue.endMs) / 2);
		const a = {
			...cue,
			endMs: mid,
			translation: cue.translation.slice(0, Math.ceil(cue.translation.length / 2))
		};
		const b = {
			...cue,
			id: `${cue.id}-b`,
			index: cue.index + .5,
			startMs: mid,
			original: cue.original,
			translation: cue.translation.slice(Math.ceil(cue.translation.length / 2)),
			flags: [...cue.flags, "edited"]
		};
		const cues = s.cues.slice();
		cues.splice(idx, 1, a, b);
		cues.filter((c) => c.jobId === cue.jobId).sort((x, y) => x.startMs - y.startMs).forEach((c, i) => {
			c.index = i + 1;
		});
		toast.message("Đã tách cue");
		return { cues };
	}),
	mergeCue: (id) => set((s) => {
		const jobCues = s.cues.filter((c) => {
			const src = s.cues.find((x) => x.id === id);
			return src && c.jobId === src.jobId;
		});
		const cue = s.cues.find((c) => c.id === id);
		if (!cue) return s;
		const next = jobCues.find((c) => c.index === cue.index + 1);
		if (!next) return s;
		const merged = {
			...cue,
			endMs: next.endMs,
			original: `${cue.original} ${next.original}`,
			translation: `${cue.translation} ${next.translation}`,
			flags: Array.from(/* @__PURE__ */ new Set([
				...cue.flags,
				...next.flags,
				"edited"
			]))
		};
		const cues = s.cues.filter((c) => c.id !== next.id).map((c) => c.id === id ? merged : c);
		toast.message("Đã gộp hai cue");
		return { cues };
	}),
	regenerateCue: (id) => {
		toast.loading("Đang tạo lại giọng…", { id: `tts-${id}` });
		window.setTimeout(() => {
			set((s) => ({ cues: s.cues.map((c) => c.id === id ? {
				...c,
				flags: c.flags.filter((f) => f !== "tts-fail" && f !== "stretch"),
				stretch: Math.min(c.stretch, 1.08)
			} : c) }));
			toast.success("Đã tạo lại giọng", { id: `tts-${id}` });
		}, 900);
	},
	retranslateCue: (id) => {
		const cue = get().cues.find((c) => c.id === id);
		if (!cue) return;
		const refined = cue.translation.replace(/\s+/g, " ").replace(/,$/, ".");
		get().updateCue(id, {
			translation: refined,
			flags: cue.flags.filter((f) => f !== "shortened")
		});
		toast.success("Đã dịch lại cue");
	},
	nextFlag: (jobId) => {
		const { cues, selectedCueId, cueFilter } = get();
		const list = cues.filter((c) => c.jobId === jobId).filter((c) => cueFilter === "all" || cueFilter === "flagged" ? c.flags.length > 0 : c.flags.includes(cueFilter)).sort((a, b) => a.index - b.index);
		if (list.length === 0) return;
		const next = list[(list.findIndex((c) => c.id === selectedCueId) + 1) % list.length];
		if (next) get().selectCue(next.id);
	},
	findReplace: (jobId, find, replace) => {
		if (!find) return;
		let n = 0;
		set((s) => ({ cues: s.cues.map((c) => {
			if (c.jobId !== jobId || !c.translation.includes(find)) return c;
			n += 1;
			return {
				...c,
				translation: c.translation.split(find).join(replace),
				flags: Array.from(/* @__PURE__ */ new Set([...c.flags, "edited"]))
			};
		}) }));
		toast.success(`Đã thay ${n} chỗ`);
	},
	addGlossary: (entry) => set((s) => ({ glossary: [{
		...entry,
		id: `g-${Date.now()}`
	}, ...s.glossary] })),
	updateGlossary: (id, patch) => set((s) => ({ glossary: s.glossary.map((g) => g.id === id ? {
		...g,
		...patch
	} : g) })),
	deleteGlossary: (id) => set((s) => ({ glossary: s.glossary.filter((g) => g.id !== id) })),
	acceptPending: (id) => set((s) => ({ glossary: s.glossary.map((g) => g.id === id ? {
		...g,
		pending: false
	} : g) })),
	rejectPending: (id) => set((s) => ({ glossary: s.glossary.filter((g) => g.id !== id) })),
	assignVoice: (characterId, voiceId) => {
		const ch = CHARACTERS.find((c) => c.id === characterId);
		if (ch) ch.voiceId = voiceId;
		set((s) => ({ cues: s.cues.map((c) => c.characterId === characterId ? {
			...c,
			voiceId
		} : c) }));
		toast.success("Đã gán giọng cho nhân vật");
	},
	toggleFavorite: (voiceId) => set((s) => ({ voices: s.voices.map((v) => v.id === voiceId ? {
		...v,
		favorite: !v.favorite
	} : v) })),
	downloadModel: (id) => {
		toast.loading("Đang tải model…", { id: `mdl-${id}` });
		let p = 0;
		const t = window.setInterval(() => {
			p += 18;
			set((s) => ({ models: s.models.map((m) => m.id === id ? {
				...m,
				progress: Math.min(100, p),
				downloaded: p >= 100
			} : m) }));
			if (p >= 100) {
				window.clearInterval(t);
				toast.success("Đã tải model", { id: `mdl-${id}` });
			}
		}, 280);
	}
}), {
	name: "long-studio",
	partialize: (s) => ({
		settings: s.settings,
		onboarding: s.onboarding,
		voices: s.voices,
		glossary: s.glossary
	})
}));
function stamp() {
	const d = /* @__PURE__ */ new Date();
	return [
		d.getHours(),
		d.getMinutes(),
		d.getSeconds()
	].map((n) => n.toString().padStart(2, "0")).join(":");
}
function useJob(id) {
	return useAppStore((s) => s.jobs.find((j) => j.id === id));
}
function seriesTitle(id) {
	if (!id) return "File lẻ";
	return SERIES.find((s) => s.id === id)?.title ?? "Không rõ";
}
function characterName(id) {
	return CHARACTERS.find((c) => c.id === id)?.name ?? id;
}
function voiceName(id) {
	return VOICES.find((v) => v.id === id)?.name ?? id;
}
//#endregion
export { voiceName as S, formatMs as _, FLAG_ORDER as a, useAppStore as b, STATUS_LABEL as c, characterName as d, cn as f, formatEta as g, formatDuration as h, FLAG_META as i, VOICES as l, formatClock as m, CHARACTERS as n, SHORTCUTS as o, episodeLabel as p, DOCTOR_CHECKS as r, STAGES as s, Button as t, buttonVariants as u, formatStretch as v, useJob as x, seriesTitle as y };
