import type {
  AppSettings,
  Character,
  Cue,
  DoctorCheck,
  FlagKind,
  GlossaryEntry,
  Job,
  ModelInfo,
  PipelineStage,
  Series,
  StageId,
  StageStatus,
  Voice,
} from "./types";
import { STAGES } from "./constants";

export const SERIES: Series[] = [
  {
    id: "sen",
    title: "Mùa Sen Trên Sông",
    englishTitle: "Lotus Season",
    episodeTotal: 24,
    cover: "/covers/sen.jpg",
    year: 2024,
    synopsis:
      "A Ninh trở về quê cũ bên dòng sông sen, đối diện lời thề chưa trả của Mộ Thanh. Giang hồ rộng, hai tấm lòng thì hẹp.",
  },
  {
    id: "hanoi",
    title: "Đêm Hà Nội Không Ngủ",
    englishTitle: "Sleepless Hanoi",
    episodeTotal: 16,
    cover: "/covers/hanoi.jpg",
    year: 2025,
    synopsis:
      "Một đêm mưa, một vụ mất tích, và những con phố cũ không chịu tắt đèn. Phim hình sự đương đại.",
  },
  {
    id: "bien",
    title: "Biển Đông Gọi Tên",
    englishTitle: "The Eastern Sea",
    episodeTotal: 8,
    cover: "/covers/bien.jpg",
    year: 2023,
    synopsis:
      "Thuyền buồm thời Lê, hải trình một gia tộc muối. Gió đổi, tên người thì không.",
  },
];

export const CHARACTERS: Character[] = [
  { id: "aninh", seriesId: "sen", name: "A Ninh", gender: "female", voiceId: "linh" },
  { id: "mothanh", seriesId: "sen", name: "Mộ Thanh", gender: "male", voiceId: "khang" },
  { id: "laotran", seriesId: "sen", name: "Lão Trần", gender: "male", voiceId: "hai" },
  { id: "tieuvu", seriesId: "sen", name: "Tiểu Vũ", gender: "child", voiceId: "na" },
  { id: "lien", seriesId: "sen", name: "Công chúa Liên", gender: "female", voiceId: "mai" },
  { id: "ha", seriesId: "hanoi", name: "Hà", gender: "female", voiceId: "linh" },
  { id: "khoa", seriesId: "hanoi", name: "Khoa", gender: "male", voiceId: "minh" },
];

export const VOICES: Voice[] = [
  { id: "linh", name: "Linh", gender: "female", age: "young", style: "ấm, tự sự", favorite: true, sample: "Người ở lại, sen vẫn nở trên sông." },
  { id: "mai", name: "Mai", gender: "female", age: "adult", style: "sang, chậm rãi", favorite: true, sample: "Lời thề năm ấy, ta chưa quên." },
  { id: "ha-v", name: "Hạ", gender: "female", age: "young", style: "mỏng, hiện đại", favorite: false, sample: "Phố này không ngủ, chị ạ." },
  { id: "khang", name: "Khang", gender: "male", age: "adult", style: "trầm, rõ chữ", favorite: true, sample: "Giang hồ rộng, lòng người thì hẹp." },
  { id: "minh", name: "Minh", gender: "male", age: "young", style: "khô, thành thị", favorite: false, sample: "Anh không hỏi lần nữa." },
  { id: "hai", name: "Ông Hải", gender: "male", age: "elder", style: "già, khàn", favorite: true, sample: "Trẻ người non dạ, đừng ra sông đêm nay." },
  { id: "son", name: "Sơn", gender: "male", age: "adult", style: "mạnh, võ", favorite: false, sample: "Rút kiếm thì không còn đường lui." },
  { id: "na", name: "Bé Na", gender: "child", age: "young", style: "trẻ, trong", favorite: true, sample: "Tỷ tỷ, sen nở rồi này!" },
  { id: "vy", name: "Vy", gender: "female", age: "elder", style: "mẹ, ấm", favorite: false, sample: "Con về đi, cơm còn nóng." },
  { id: "duc", name: "Đức", gender: "male", age: "elder", style: "sử, trang nghiêm", favorite: false, sample: "Biển Đông gọi tên, người chớ quên." },
  { id: "tram", name: "Trâm", gender: "female", age: "adult", style: "lạnh, quý tộc", favorite: false, sample: "Ngai vàng không chứa nổi một chữ tình." },
  { id: "phong", name: "Phong", gender: "male", age: "young", style: "nhanh, hài", favorite: false, sample: "Thôi thôi, lần này tỷ để em trả." },
];

export const GLOSSARY: GlossaryEntry[] = [
  { id: "g1", seriesId: "sen", source: "阿宁", target: "A Ninh", kind: "character" },
  { id: "g2", seriesId: "sen", source: "慕清", target: "Mộ Thanh", kind: "character" },
  { id: "g3", seriesId: "sen", source: "陈老", target: "Lão Trần", kind: "character" },
  { id: "g4", seriesId: "sen", source: "小雨", target: "Tiểu Vũ", kind: "character" },
  { id: "g5", seriesId: "sen", source: "莲公主", target: "Công chúa Liên", kind: "character" },
  { id: "g6", seriesId: "sen", source: "荷花洲", target: "Bãi Sen", kind: "place" },
  { id: "g7", seriesId: "sen", source: "清河门", target: "Thanh Hà Môn", kind: "place" },
  { id: "g8", seriesId: "sen", source: "红莲剑", target: "Hồng Liên Kiếm", kind: "term" },
  { id: "g9", seriesId: "sen", source: "宁宁", target: "Ninh Ninh", kind: "nickname" },
  { id: "g10", seriesId: "sen", source: "清哥哥", target: "Thanh ca ca", kind: "nickname" },
  { id: "g11", seriesId: "sen", source: "无心渡", target: "Vô Tâm Độ", kind: "place", pending: true },
  { id: "g12", seriesId: "sen", source: "白鹭湾", target: "Vịnh Bạch Lộ", kind: "place", pending: true },
  { id: "g13", seriesId: "hanoi", source: "Hà", target: "Hà", kind: "character" },
  { id: "g14", seriesId: "hanoi", source: "Khoa", target: "Khoa", kind: "character" },
  { id: "g15", seriesId: "hanoi", source: "Phố Cổ", target: "Phố Cổ", kind: "place" },
];

function stages(
  doneThrough: number,
  running?: { index: number; progress: number },
  cached: StageId[] = [],
  errorIndex?: number,
): PipelineStage[] {
  return STAGES.map((s, i) => {
    let status: StageStatus = "pending";
    let progress = 0;
    let elapsedMs = 0;
    if (cached.includes(s.id)) {
      status = "cached";
      progress = 100;
      elapsedMs = 400 + i * 180;
    } else if (errorIndex === i) {
      status = "error";
      progress = 62;
      elapsedMs = 8000 + i * 400;
    } else if (running && running.index === i) {
      status = "running";
      progress = running.progress;
      elapsedMs = 12000 + i * 900;
    } else if (i < doneThrough) {
      status = "done";
      progress = 100;
      elapsedMs = [4200, 38000, 96000, 14000, 22000, 124000, 18000, 9000, 41000][i] ?? 8000;
    }
    return { id: s.id, name: s.name, elapsedMs, progress, status };
  });
}

const now = Date.now();

export const JOBS: Job[] = [
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
    createdAt: new Date(now - 46 * 60_000).toISOString(),
    flagCount: 0,
    cachedStages: ["ingest", "separate", "asr", "segment"],
    stages: stages(5, { index: 5, progress: 64 }, ["ingest", "separate", "asr", "segment"]),
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
      "12:08:41  tts · CapCut · Mộ Thanh 41/96",
    ],
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
    createdAt: new Date(now - 5 * 3600_000).toISOString(),
    flagCount: 11,
    cachedStages: [],
    stages: stages(9),
    errorMessage: null,
    errorHint: null,
    still: "/stills/sen-tea.jpg",
    logs: [
      "07:12:04  xuất xong · 42:18 · 11 cờ cần xem",
      "07:12:04  stretch>1.15 · 4 cue",
      "07:12:04  asr-low · 3 cue · shortened · 2 cue",
    ],
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
    createdAt: new Date(now - 30 * 3600_000).toISOString(),
    flagCount: 0,
    cachedStages: [],
    stages: stages(9),
    errorMessage: null,
    errorHint: null,
    still: "/stills/sen-dock.jpg",
    logs: ["02:11:08  xuất xong · không cờ"],
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
    createdAt: new Date(now - 12 * 60_000).toISOString(),
    flagCount: 0,
    cachedStages: ["ingest"],
    stages: stages(0, undefined, ["ingest"]),
    errorMessage: null,
    errorHint: null,
    still: "/stills/sen-dock.jpg",
    logs: ["12:31:02  đã đọc video · chờ GPU"],
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
    createdAt: new Date(now - 2 * 3600_000).toISOString(),
    flagCount: 0,
    cachedStages: ["ingest", "separate", "asr", "segment"],
    stages: stages(4, undefined, ["ingest", "separate", "asr", "segment"], 4),
    errorMessage: "Gemini web trả 429 — quá giới hạn phiên.",
    errorHint: "Đợi 2 phút rồi thử lại bước Dịch, hoặc chuyển nguồn dịch sang LLM local trong Cài đặt.",
    still: "/covers/hanoi.jpg",
    logs: [
      "10:14:22  dịch · Gemini web · HTTP 429",
      "10:14:22  dừng tại bước Dịch tiếng Việt",
    ],
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
    createdAt: new Date(now - 80 * 60_000).toISOString(),
    flagCount: 0,
    cachedStages: ["ingest", "separate"],
    stages: stages(2, { index: 2, progress: 41 }, ["ingest", "separate"]),
    errorMessage: null,
    errorHint: null,
    still: "/covers/hanoi.jpg",
    logs: ["11:22:10  tạm dừng · ASR 41%"],
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
    createdAt: new Date(now - 18 * 60_000).toISOString(),
    flagCount: 0,
    cachedStages: ["ingest"],
    stages: stages(2, { index: 2, progress: 28 }, ["ingest"]),
    errorMessage: null,
    errorHint: null,
    still: "/covers/bien.jpg",
    logs: ["12:26:04  ASR large-v3 · CUDA · 28%"],
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
    createdAt: new Date(now - 4 * 60_000).toISOString(),
    flagCount: 0,
    cachedStages: [],
    stages: stages(0),
    errorMessage: null,
    errorHint: null,
    still: "/stills/sen-tea.jpg",
    logs: [],
  },
];

type Line = {
  characterId: string;
  original: string;
  translation: string;
  dur: number;
  gap: number;
  flags?: FlagKind[];
  stretch?: number;
  asr?: number;
};

const SEN06_LINES: Line[] = [
  { characterId: "aninh", original: "慕清，你还记得那年的荷花吗？", translation: "Mộ Thanh, ngươi còn nhớ hoa sen năm ấy không?", dur: 3200, gap: 400 },
  { characterId: "mothanh", original: "记得。河上全是雾，你非要下去摘。", translation: "Nhớ. Sông đầy sương, nàng cứ nhất định xuống hái.", dur: 3800, gap: 280 },
  { characterId: "aninh", original: "那时候我不怕。现在怕了。", translation: "Lúc ấy ta không sợ. Bây giờ thì sợ.", dur: 2900, gap: 900, flags: ["asr-low"], asr: 0.62 },
  { characterId: "laotran", original: "夜里别下河。水冷，心也冷。", translation: "Đêm đừng ra sông. Nước lạnh, lòng cũng lạnh.", dur: 3400, gap: 500 },
  { characterId: "tieuvu", original: "宁宁姐姐！荷花开了！", translation: "Tỷ Ninh Ninh! Sen nở rồi!", dur: 2100, gap: 180, flags: ["overlap"] },
  { characterId: "aninh", original: "小雨慢一点，码头滑。", translation: "Tiểu Vũ chậm thôi, cầu trơn.", dur: 2400, gap: 700 },
  { characterId: "lien", original: "清河门今夜闭城。你们不该来。", translation: "Thanh Hà Môn đêm nay đóng cửa. Các người không nên đến.", dur: 4100, gap: 360, flags: ["shortened"], stretch: 1.12 },
  { characterId: "mothanh", original: "我来还当年那一剑。", translation: "Ta đến trả một kiếm năm xưa.", dur: 2600, gap: 420 },
  { characterId: "lien", original: "红莲剑不认旧主。", translation: "Hồng Liên Kiếm chẳng nhận chủ cũ.", dur: 2500, gap: 800, flags: ["stretch"], stretch: 1.22 },
  { characterId: "aninh", original: "它认的是心，不是手。", translation: "Nó nhận lòng, không nhận tay.", dur: 2700, gap: 640 },
  { characterId: "laotran", original: "你们三个，把江湖说得太轻。", translation: "Ba đứa, nói giang hồ nhẹ quá.", dur: 3300, gap: 500 },
  { characterId: "mothanh", original: "轻也好。重的是她。", translation: "Nhẹ cũng được. Nặng là nàng.", dur: 2400, gap: 1100 },
  { characterId: "aninh", original: "别这样看着我。", translation: "Đừng nhìn ta như thế.", dur: 1800, gap: 300, flags: ["asr-low"], asr: 0.58 },
  { characterId: "mothanh", original: "荷花洲的雾散了。我该走了。", translation: "Sương Bãi Sen tan rồi. Ta phải đi.", dur: 3600, gap: 480 },
  { characterId: "aninh", original: "走去哪里？无心渡还是白鹭湾？", translation: "Đi đâu? Vô Tâm Độ hay Vịnh Bạch Lộ?", dur: 3400, gap: 220, flags: ["shortened", "edited"], stretch: 1.09 },
  { characterId: "tieuvu", original: "清哥哥带我去看船好不好？", translation: "Thanh ca ca đưa Vũ đi xem thuyền được không?", dur: 2800, gap: 700 },
  { characterId: "mothanh", original: "改天。今晚的风不对。", translation: "Hôm khác. Gió đêm nay không phải.", dur: 2600, gap: 540, flags: ["delayed"] },
  { characterId: "lien", original: "慕清，你若拔剑，这座城会先倒下。", translation: "Mộ Thanh, nếu ngươi rút kiếm, thành này ngã trước.", dur: 4400, gap: 280, flags: ["stretch"], stretch: 1.28 },
  { characterId: "mothanh", original: "那便让它倒。", translation: "Vậy thì để nó ngã.", dur: 1600, gap: 900 },
  { characterId: "aninh", original: "够了。今晚谁也不许拔剑。", translation: "Đủ rồi. Đêm nay không ai được rút kiếm.", dur: 3100, gap: 480 },
  { characterId: "laotran", original: "这句话，像你娘。", translation: "Câu này, giống mẹ ngươi.", dur: 2200, gap: 1200 },
  { characterId: "aninh", original: "她把我留在河上，就是为了今晚。", translation: "Bà ấy để ta lại trên sông, là vì đêm nay.", dur: 3800, gap: 360, flags: ["asr-low"], asr: 0.71 },
  { characterId: "mothanh", original: "阿宁。我可以不走。", translation: "A Ninh. Ta có thể không đi.", dur: 2500, gap: 200 },
  { characterId: "aninh", original: "你可以。但清河门不可以。", translation: "Ngươi có thể. Thanh Hà Môn thì không.", dur: 3000, gap: 700 },
  { characterId: "lien", original: "把剑放下。我们谈谈荷花。", translation: "Hạ kiếm. Chúng ta nói về sen.", dur: 2900, gap: 500, flags: ["tts-fail"], stretch: 1.0 },
  { characterId: "tieuvu", original: "姐姐，我摘了一朵最大的。", translation: "Tỷ tỷ, Vũ hái bông to nhất.", dur: 2400, gap: 380 },
  { characterId: "aninh", original: "放回去。花要留在水上才活。", translation: "Thả lại. Hoa phải ở trên nước mới sống.", dur: 3200, gap: 860 },
  { characterId: "mothanh", original: "像我们一样。", translation: "Như chúng ta.", dur: 1400, gap: 1100, flags: ["edited"] },
  { characterId: "laotran", original: "雾又来了。回屋吧。", translation: "Sương lại đến. Về nhà đi.", dur: 2400, gap: 420 },
  { characterId: "lien", original: "慕清，红莲剑今夜归鞘，便饶你一次。", translation: "Mộ Thanh, Hồng Liên Kiếm đêm nay về vỏ, ta tha một lần.", dur: 4600, gap: 240, flags: ["stretch", "shortened"], stretch: 1.31 },
  { characterId: "mothanh", original: "我不要被饶。我要她安稳。", translation: "Ta không cần được tha. Ta cần nàng yên.", dur: 3200, gap: 600 },
  { characterId: "aninh", original: "安稳是假的。河还在。", translation: "Yên là giả. Sông vẫn còn.", dur: 2400, gap: 780 },
  { characterId: "tieuvu", original: "那我们明天再摘好不好？", translation: "Vậy mai mình hái tiếp được không?", dur: 2500, gap: 500 },
  { characterId: "aninh", original: "好。明天，雾散了再摘。", translation: "Được. Mai, sương tan rồi hái.", dur: 2800, gap: 1400 },
  { characterId: "mothanh", original: "若我不在，你也要摘。", translation: "Nếu ta không còn, nàng cũng phải hái.", dur: 2700, gap: 360, flags: ["delayed"] },
  { characterId: "aninh", original: "你在不在，花都会开。", translation: "Ngươi có hay không, hoa vẫn nở.", dur: 2600, gap: 900, flags: ["edited"] },
  { characterId: "laotran", original: "这句话，像你爹。", translation: "Câu này, giống cha ngươi.", dur: 2100, gap: 700 },
  { characterId: "lien", original: "城门开了。你们走吧，趁还走得成。", translation: "Cửa thành mở. Đi đi, còn đi được thì đi.", dur: 3800, gap: 320, flags: ["overlap"] },
  { characterId: "mothanh", original: "阿宁，把这朵戴上。", translation: "A Ninh, đeo bông này.", dur: 2200, gap: 200 },
  { characterId: "aninh", original: "戴上了，就更像要分别。", translation: "Đeo rồi, càng giống sắp chia.", dur: 2800, gap: 540 },
  { characterId: "mothanh", original: "分别也要好看。", translation: "Chia cũng phải đẹp.", dur: 1600, gap: 1000 },
  { characterId: "tieuvu", original: "我不要分别。我要船。", translation: "Vũ không muốn chia. Vũ muốn thuyền.", dur: 2300, gap: 480 },
  { characterId: "laotran", original: "船在湾里。人在岸上。这就够了。", translation: "Thuyền ở vịnh. Người trên bờ. Thế là đủ.", dur: 3600, gap: 620 },
  { characterId: "aninh", original: "今晚的河，比那年安静。", translation: "Sông đêm nay, yên hơn năm ấy.", dur: 3000, gap: 400, flags: ["asr-low"], asr: 0.66 },
  { characterId: "mothanh", original: "因为有你说话。", translation: "Vì có nàng nói.", dur: 1800, gap: 800 },
  { characterId: "lien", original: "够了。别把离别说成诗。", translation: "Đủ. Đừng biến chia ly thành thơ.", dur: 2800, gap: 500, flags: ["stretch"], stretch: 1.19 },
  { characterId: "aninh", original: "那就别离。明天，雾散了，我们还在。", translation: "Vậy thì đừng chia. Mai, sương tan, chúng ta còn đây.", dur: 4200, gap: 360 },
  { characterId: "mothanh", original: "好。我等雾散。", translation: "Được. Ta đợi sương tan.", dur: 2000, gap: 0 },
];

function buildCues(jobId: string, lines: Line[], startAt = 184_000): Cue[] {
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
      stretch: line.stretch ?? (0.92 + ((i * 17) % 18) / 100),
      flags: line.flags ?? [],
      voiceId: character?.voiceId ?? "linh",
      asrConfidence: line.asr ?? 0.92 - (i % 9) * 0.01,
      note: "",
    };
  });
}

export const CUES: Cue[] = [
  ...buildCues("job-sen-06", SEN06_LINES),
  ...buildCues("job-sen-07", SEN06_LINES.slice(0, 18), 210_000),
  ...buildCues("job-sen-05", SEN06_LINES.slice(10, 28), 90_000),
];

export const DEFAULT_SETTINGS: AppSettings = {
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
  asrThreshold: 0.72,
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
  voiceBgRatio: 0.72,
  keepOriginalTrack: true,
  fileNamePattern: "{bộ}.T{tập}.{ngày}",
};

export const MODELS: ModelInfo[] = [
  { id: "whisper", step: "ASR", name: "Whisper large-v3", sizeGb: 2.9, downloaded: true, progress: 100 },
  { id: "demucs", step: "Tách nhạc", name: "Demucs htdemucs", sizeGb: 1.1, downloaded: true, progress: 100 },
  { id: "pyannote", step: "Diarization", name: "pyannote 3.1", sizeGb: 0.6, downloaded: true, progress: 100 },
  { id: "nllb", step: "Dịch local", name: "NLLB-200 1.3B", sizeGb: 2.4, downloaded: false, progress: 0 },
  { id: "align", step: "Khớp", name: "Wav2Vec2 CTC", sizeGb: 0.4, downloaded: true, progress: 100 },
];

export const DOCTOR_CHECKS: DoctorCheck[] = [
  { id: "ffmpeg", label: "ffmpeg", ok: true, detail: "7.1.1 · n6.1 nvenc/nvdec", fix: "" },
  { id: "gpu", label: "GPU / CUDA", ok: true, detail: "RTX 4070 · 12.2 GB · CUDA 12.6", fix: "" },
  { id: "models", label: "Model", ok: true, detail: "4/5 đã tải · thiếu NLLB-200", fix: "Tải NLLB trong Cài đặt → Model nếu dùng dịch local." },
  { id: "capcut", label: "CapCut TTS", ok: true, detail: "Đã kết nối · độ trễ 420ms", fix: "" },
  { id: "write", label: "Quyền ghi thư mục", ok: true, detail: "~/Lồng/Xuất và Cache ghi được", fix: "" },
];
