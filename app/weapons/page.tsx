import type { Metadata } from "next";
import { ComingSoonCard } from "@/components/ComingSoonCard";
import { CinematicPanel } from "@/components/CinematicPanel";
import { getGame } from "@/lib/content";

export const metadata: Metadata = { title: "GTA VI Weapons", description: "Admin-editable GTA VI weapon database prepared for official weapon details.", alternates: { canonical: "/weapons" } };

export default function WeaponsPage() {
  const game = getGame("gta-6")!;
  return (
    <CinematicPanel eyebrow="Weapon Database" title="Stats Only When Official" body="Damage, type, descriptions, galleries, comparison stats, and related guides are ready without inventing unconfirmed weapon data.">
      <div className="grid gap-4">
        {game.weapons.map((weapon) => <ComingSoonCard key={weapon.name} title={weapon.name} detail={weapon.bestUse} />)}
      </div>
    </CinematicPanel>
  );
}
