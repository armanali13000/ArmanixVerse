import { NextResponse } from "next/server";

const knowledge = [
  { match: "weapon", answer: "Official GTA VI weapon names, stats, and damage values have not yet been announced. ArmanixVerse will mark them confirmed only after official details exist." },
  { match: "vehicle", answer: "Official GTA VI vehicle names, manufacturers, and stats have not yet been announced. The database is ready for confirmed entries." },
  { match: "money", answer: "Official GTA VI money methods have not yet been announced. Avoid guides that pretend otherwise." },
  { match: "collectible", answer: "Official collectibles have not yet been announced. Use confirmed map layers only until details are available." },
  { match: "mission", answer: "Official mission names, rewards, and requirements have not yet been announced." },
  { match: "headset", answer: "For a gaming headset, prioritize comfort, low latency, microphone clarity, and spatial audio support." },
  { match: "ssd", answer: "For PS5 storage, choose a compatible NVMe SSD with a heatsink, strong sustained reads, and enough capacity for large games." }
];

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as { question?: string };
  const question = body.question?.toLowerCase() ?? "";
  const hit = knowledge.find((item) => question.includes(item.match));

  return NextResponse.json({
    answer: hit?.answer ?? "Ask about a weapon, vehicle, money route, mission, or collectible for a precise companion answer.",
    source: "ArmanixVerse local knowledge base",
    aiProviderReady: true
  });
}
