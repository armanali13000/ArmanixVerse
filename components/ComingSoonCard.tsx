import { Lock } from "lucide-react";

export function ComingSoonCard({ title, detail }: { title: string; detail?: string }) {
  return (
    <div className="glass rounded-lg p-5">
      <div className="mb-4 inline-flex rounded-full border border-ember/25 bg-ember/10 p-2 text-ember">
        <Lock className="h-4 w-4" />
      </div>
      <h3 className="text-xl font-black">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-white/62">{detail ?? "Coming Soon. Official details have not yet been announced."}</p>
    </div>
  );
}
