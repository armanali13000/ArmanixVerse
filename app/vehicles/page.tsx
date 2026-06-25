import type { Metadata } from "next";
import { ComingSoonCard } from "@/components/ComingSoonCard";
import { CinematicPanel } from "@/components/CinematicPanel";
import { getGame } from "@/lib/content";

export const metadata: Metadata = { title: "GTA VI Vehicles", description: "Admin-editable GTA VI vehicle database prepared for official vehicle details.", alternates: { canonical: "/vehicles" } };

export default function VehiclesPage() {
  const game = getGame("gta-6")!;
  return (
    <CinematicPanel eyebrow="Vehicle Database" title="Garages Await Official Keys" body="Cards, galleries, manufacturers, types, descriptions, related articles, and admin editing are ready. Official vehicle names and stats are not yet announced.">
      <div className="grid gap-4">
        {game.vehicles.map((vehicle) => <ComingSoonCard key={vehicle.name} title={vehicle.name} detail={vehicle.utility} />)}
      </div>
    </CinematicPanel>
  );
}
