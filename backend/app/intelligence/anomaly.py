"""z-score control limits on a monthly series (statistical inference, never presented as fact)."""
from __future__ import annotations

from statistics import mean, pstdev

from ..models import MonthlyPoint


def detect_anomalies(series: list[tuple[str, float]], z_limit: float = 2.0, rel_guard: float = 0.08) -> list[MonthlyPoint]:
    """Leave-one-out z against the other months AND a ≥8% practical-significance guard."""
    if len(series) < 4:
        return [MonthlyPoint(month=m, co2eT=v, z=0.0, anomaly=False) for m, v in series]
    out = []
    for i, (m, v) in enumerate(series):
        others = [x for j, (_, x) in enumerate(series) if j != i]
        mu = mean(others)
        sd = pstdev(others) or 1e-9
        z = (v - mu) / sd
        rel = abs(v - mu) / mu if mu > 0 else 0.0
        out.append(MonthlyPoint(month=m, co2eT=round(v), z=round(z, 2), anomaly=abs(z) > z_limit and rel >= rel_guard))
    return out
