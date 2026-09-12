import type { Factory } from "../../types";
import { formatTonnes } from "../../lib/severity";

function Kpi({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="glass flex flex-col gap-0.5 rounded-xl px-4 py-3">
      <span className="text-[11px] uppercase tracking-wide text-[color:var(--color-muted)]">{label}</span>
      <span className="text-lg font-semibold text-[color:var(--color-text)]">{value}</span>
      {sub && <span className="text-[11px] text-[color:var(--color-muted)]">{sub}</span>}
    </div>
  );
}

export default function KpiBar({ factory }: { factory: Factory }) {
  const critCount = factory.nodes.filter((n) => n.severity === "crit").length;

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
      <Kpi label="Annual CO2e" value={formatTonnes(factory.totalCo2eTpy)} sub={`${factory.sector}`} />
      <Kpi label="Energy / yr" value={`${factory.totalEnergyMwhPerYear.toLocaleString("en-IN")} MWh`} />
      <Kpi label="Waste / yr" value={formatTonnes(factory.totalWasteTpy)} />
      <Kpi label="Circularity ratio" value={`${Math.round(factory.circularityRatio * 100)}%`} sub="recovered / total material" />
      <Kpi
        label="Hotspots detected"
        value={`${critCount} of ${factory.nodes.length}`}
        sub={critCount > 0 ? "processes above benchmark" : "all within benchmark"}
      />
    </div>
  );
}
