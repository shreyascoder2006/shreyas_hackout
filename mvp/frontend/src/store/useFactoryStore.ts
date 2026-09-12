import { create } from "zustand";
import type { Factory } from "../types";
import { allFactories } from "../data/factories";
import { simulate, type SimulationResult } from "../lib/simulator";

interface FactoryState {
  factories: Factory[];
  baseline: Factory;
  setFactory: (id: string) => void;
  addFactory: (f: Factory) => void;
  updateFactory: (f: Factory) => void;

  selectedNodeId: string | null;
  select: (id: string | null) => void;

  // what-if simulator
  selectedInterventionIds: Set<string>;
  simulation: SimulationResult;
  toggleIntervention: (id: string) => void;
  setInterventions: (ids: string[]) => void;
  clearInterventions: () => void;
}

const initial = allFactories[0];

export const useFactoryStore = create<FactoryState>((set, get) => ({
  factories: allFactories,
  baseline: initial,
  setFactory: (id) => {
    const f = get().factories.find((x) => x.id === id);
    if (!f || f.id === get().baseline.id) return;
    set({ baseline: f, selectedNodeId: null, selectedInterventionIds: new Set(), simulation: simulate(f, new Set()) });
  },

  addFactory: (f) => set({ factories: [...get().factories, f], baseline: f, selectedNodeId: null, selectedInterventionIds: new Set(), simulation: simulate(f, new Set()) }),
  updateFactory: (f) => set({
    factories: get().factories.map((x) => x.id === f.id ? f : x),
    baseline: f,
    selectedNodeId: null,
    selectedInterventionIds: new Set(),
    simulation: simulate(f, new Set()),
  }),

  selectedNodeId: null,
  select: (id) => set({ selectedNodeId: id }),

  selectedInterventionIds: new Set(),
  simulation: simulate(initial, new Set()),
  toggleIntervention: (id) => {
    const next = new Set(get().selectedInterventionIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    set({ selectedInterventionIds: next, simulation: simulate(get().baseline, next) });
  },
  setInterventions: (ids) => {
    const next = new Set(ids);
    set({ selectedInterventionIds: next, simulation: simulate(get().baseline, next) });
  },
  clearInterventions: () => set({ selectedInterventionIds: new Set(), simulation: simulate(get().baseline, new Set()) }),
}));
