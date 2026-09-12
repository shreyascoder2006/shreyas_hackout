import { useFactoryStore } from "../../store/useFactoryStore";
import type { Factory } from "../../types";
import { severityColor, severityLabel } from "../../lib/severity";

export default function ProcessList({ factory }: { factory: Factory }) {
  const selectedNodeId = useFactoryStore((s) => s.selectedNodeId);
  const select = useFactoryStore((s) => s.select);

  const sorted = [...factory.nodes].sort((a, b) => b.shareOfTotal - a.shareOfTotal);

  return (
    <div className="glass flex h-full flex-col rounded-xl">
      <div className="border-b border-[color:var(--color-border)] px-4 py-3">
        <h3 className="text-sm font-semibold">Process breakdown</h3>
        <p className="text-[11px] text-[color:var(--color-muted)]">Ranked by share of total emissions</p>
      </div>
      <div className="flex-1 overflow-y-auto">
        {sorted.map((node) => {
          const isSelected = node.id === selectedNodeId;
          return (
            <button
              key={node.id}
              onClick={() => select(isSelected ? null : node.id)}
              className={`flex w-full items-center justify-between gap-2 border-b border-[color:var(--color-border)] px-4 py-2.5 text-left transition-colors ${
                isSelected ? "bg-[color:var(--color-panel-2)]" : "hover:bg-[color:var(--color-panel-2)]/60"
              }`}
            >
              <div className="flex items-center gap-2 min-w-0">
                <span
                  className="h-2.5 w-2.5 flex-shrink-0 rounded-full"
                  style={{ background: severityColor[node.severity], boxShadow: `0 0 8px ${severityColor[node.severity]}` }}
                />
                <div className="min-w-0">
                  <div className="truncate text-sm font-medium">{node.label}</div>
                  <div className="truncate text-[11px] text-[color:var(--color-muted)]">{severityLabel[node.severity]}</div>
                </div>
              </div>
              <div className="flex-shrink-0 text-right">
                <div className="text-sm font-semibold">{Math.round(node.shareOfTotal * 100)}%</div>
                <div className="text-[11px] text-[color:var(--color-muted)]">{node.co2eTpy.toLocaleString("en-IN")} t</div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
