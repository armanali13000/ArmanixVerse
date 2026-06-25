"use client";

import { useState } from "react";
import { Bot, Send } from "lucide-react";

const answers: Record<string, string> = {
  weapon: "For clean early missions, start with a compact carbine. It has the best blend of control, range, and ammo economy.",
  vehicle: "Official GTA VI vehicle names, stats, and spawn locations have not yet been announced. The database is ready to track them when confirmed.",
  money: "Official GTA VI money methods have not yet been announced. I can help plan spoiler-safe tracking once official systems exist.",
  collectible: "Official collectible details have not yet been announced. Use confirmed map layers only until Rockstar releases details.",
  headset: "For gaming headsets, prioritize comfort, low-latency wireless, clear mic monitoring, and spatial audio support.",
  ssd: "For PS5 storage, choose a compatible NVMe SSD with strong sustained reads, a heatsink, and enough capacity for large installs."
};

export function AIAssistant() {
  const [question, setQuestion] = useState("Best weapon?");
  const [answer, setAnswer] = useState(answers.weapon);

  function ask() {
    const key = Object.keys(answers).find((term) => question.toLowerCase().includes(term));
    setAnswer(key ? answers[key] : "I can help with weapons, vehicles, money routes, collectibles, missions, and completion planning. Ask with a little more detail for a tighter recommendation.");
  }

  return (
    <div className="glass rounded-lg p-5">
      <div className="flex items-center gap-3">
        <span className="rounded-lg bg-pulse/20 p-2 text-pulse"><Bot className="h-5 w-5" /></span>
        <div>
          <h3 className="font-bold text-white">AI Gaming Assistant</h3>
          <p className="text-sm text-white/55">Future-ready for OpenAI or Firebase callable functions.</p>
        </div>
      </div>
      <div className="mt-5 flex gap-2">
        <input
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
          className="min-w-0 flex-1 rounded-md border border-white/10 bg-black/30 px-4 py-3 text-sm outline-none ring-pulse/40 focus:ring-2"
          placeholder="Ask about weapons, vehicles, missions..."
        />
        <button type="button" onClick={ask} className="rounded-md bg-white px-4 text-black" aria-label="Ask assistant">
          <Send className="h-4 w-4" />
        </button>
      </div>
      <p className="mt-4 rounded-md border border-ion/20 bg-ion/10 p-4 text-sm leading-6 text-white/78">{answer}</p>
    </div>
  );
}
