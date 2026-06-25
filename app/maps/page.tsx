import type { Metadata } from "next";
import { mapMarkers } from "@/lib/content";

export const metadata: Metadata = { title: "Interactive Maps", description: "GTA VI map guide with confirmed and coming-soon marker layers.", alternates: { canonical: "/maps" } };

export default function MapsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <p className="text-xs font-black uppercase tracking-[0.34em] text-ember">Interactive Map</p>
      <h1 className="mt-4 text-4xl font-black sm:text-7xl">Leonida Layer System</h1>
      <p className="mt-5 max-w-3xl text-lg leading-8 text-white/65">Admin-editable pins for locations, businesses, collectibles, vehicles, and landmarks. Confirmed items are separated from coming-soon layers.</p>
      <div className="glass relative mt-10 min-h-[620px] overflow-hidden rounded-lg bg-[radial-gradient(circle_at_28%_24%,rgba(0,217,255,.24),transparent_20%),radial-gradient(circle_at_68%_62%,rgba(255,79,162,.28),transparent_24%),linear-gradient(135deg,#10161a,#170f20)]">
        {mapMarkers.map((marker) => (
          <div key={marker.id} className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-black/55 px-4 py-3 text-sm backdrop-blur" style={{ left: `${marker.x}%`, top: `${marker.y}%` }}>
            <b>{marker.title}</b>
            <span className="ml-2 text-xs text-ember">{marker.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
