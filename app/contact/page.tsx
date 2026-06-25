import type { Metadata } from "next";
import { Mail } from "lucide-react";
import { CinematicPanel } from "@/components/CinematicPanel";

export const metadata: Metadata = { title: "Contact", description: "Contact ArmanixVerse for editorial, partnerships, advertising, and support.", alternates: { canonical: "/contact" } };

export default function ContactPage() {
  return (
    <CinematicPanel eyebrow="Contact" title="Partnerships, Support, Editorial" body="Use this production-ready contact surface for advertising, affiliate partnerships, corrections, press, and support workflows.">
      <form className="glass grid gap-3 rounded-lg p-5">
        <Mail className="h-6 w-6 text-ember" />
        <input aria-label="Name" placeholder="Name" className="rounded-md border border-white/10 bg-black/30 px-4 py-3 outline-none" />
        <input aria-label="Email" type="email" placeholder="Email" className="rounded-md border border-white/10 bg-black/30 px-4 py-3 outline-none" />
        <textarea aria-label="Message" placeholder="Message" rows={5} className="rounded-md border border-white/10 bg-black/30 px-4 py-3 outline-none" />
        <button className="rounded-md bg-white px-5 py-3 font-bold text-black">Send Message</button>
      </form>
    </CinematicPanel>
  );
}
