import { NavLink } from "react-router-dom";
import { useFactoryStore } from "../../store/useFactoryStore";

const links = [
  { to: "/", label: "Diagnose" },
  { to: "/simulate", label: "Simulate" },
  { to: "/plan", label: "Action plan" },
  { to: "/regulator", label: "Regulator" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/co2-exchange", label: "CO₂ Exchange" },
  { to: "/intake", label: "+ Intake" },
];

export default function Header() {
  const factory = useFactoryStore((s) => s.baseline);
  const factories = useFactoryStore((s) => s.factories);
  const setFactory = useFactoryStore((s) => s.setFactory);

  return (
    <header className="flex items-center justify-between border-b border-[color:var(--color-border)] px-6 py-3">
      <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[color:var(--color-accent)]/15 text-[color:var(--color-accent)]">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 2 L21 7 V17 L12 22 L3 17 V7 Z"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinejoin="round"
            />
            <circle cx="12" cy="12" r="3" fill="currentColor" />
          </svg>
        </div>
        <div>
          <div className="text-sm font-semibold leading-tight">Circular Carbon Intelligence</div>
          <div className="text-[11px] leading-tight text-[color:var(--color-muted)]">Gujarat Industrial Decarbonization Platform</div>
        </div>
      </div>

      <nav className="hidden items-center gap-1 md:flex">
        {links.map((l) => (
          <NavLink
            key={l.to}
            to={l.to}
            end={l.to === "/"}
            className={({ isActive }) =>
              `rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                isActive ? "bg-[color:var(--color-panel-2)] text-[color:var(--color-text)]" : "text-[color:var(--color-muted)] hover:text-[color:var(--color-text)]"
              }`
            }
          >
            {l.label}
          </NavLink>
        ))}
      </nav>

      <div className="flex items-center gap-3 text-right">
        <div>
          <select
            value={factory.id}
            onChange={(e) => setFactory(e.target.value)}
            className="max-w-[260px] cursor-pointer rounded-md border border-[color:var(--color-border)] bg-[color:var(--color-panel)] px-2 py-1 text-sm font-medium text-[color:var(--color-text)] outline-none hover:bg-[color:var(--color-panel-2)]"
            title="Switch factory"
          >
            {factories.map((f) => (
              <option key={f.id} value={f.id}>{f.name}</option>
            ))}
          </select>
          <div className="mt-0.5 text-[11px] leading-tight text-[color:var(--color-muted)]">
            {factory.cluster} · {factory.sector}
          </div>
        </div>
        <span
          className={`rounded-full border px-2.5 py-1 text-[10px] font-medium uppercase tracking-wide ${
            factory.dataSource === "synthetic"
              ? "border-[color:var(--color-warn)] text-[color:var(--color-warn)]"
              : "border-[color:var(--color-ok)] text-[color:var(--color-ok)]"
          }`}
        >
          {factory.dataSource === "synthetic" ? "Illustrative data" : factory.dataSource}
        </span>
      </div>
    </header>
  );
}
