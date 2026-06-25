import type { Metadata } from "next";
import { AIAssistant } from "@/components/AIAssistant";
import { CinematicPanel } from "@/components/CinematicPanel";

export const metadata: Metadata = { title: "AI Assistant", description: "Future-ready AI gaming assistant for games, guides, missions, vehicles, weapons, and accessories.", alternates: { canonical: "/ai-assistant" } };

export default function AiAssistantPage() {
  return (
    <CinematicPanel eyebrow="AI Assistant" title="Ask The Universe" body="Questions about vehicles, weapons, missions, maps, headsets, SSDs, and future game systems route through an AI-ready companion layer.">
      <AIAssistant />
    </CinematicPanel>
  );
}
