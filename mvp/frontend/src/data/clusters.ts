// Gujarat industrial clusters — centroids from OpenStreetMap industrial-area
// polygons (approximate). Used for the regulator map and symbiosis distances.
export interface Cluster {
  id: string;
  name: string;
  district: string;
  lat: number;
  lon: number;
  dominantSectors: string[];
}

export const clusters: Cluster[] = [
  { id: "morbi", name: "Morbi", district: "Morbi", lat: 22.82, lon: 70.84, dominantSectors: ["Ceramics"] },
  { id: "vapi", name: "Vapi", district: "Valsad", lat: 20.37, lon: 72.9, dominantSectors: ["Chemicals", "Dyes & pigments"] },
  { id: "ankleshwar", name: "Ankleshwar", district: "Bharuch", lat: 21.63, lon: 73.0, dominantSectors: ["Chemicals", "Pharma"] },
  { id: "surat", name: "Surat", district: "Surat", lat: 21.17, lon: 72.83, dominantSectors: ["Textiles"] },
  { id: "rajkot", name: "Rajkot", district: "Rajkot", lat: 22.3, lon: 70.8, dominantSectors: ["Engineering", "Foundry"] },
  { id: "jamnagar", name: "Jamnagar", district: "Jamnagar", lat: 22.47, lon: 70.07, dominantSectors: ["Brass parts", "Petrochemicals"] },
];

export const clusterById = Object.fromEntries(clusters.map((c) => [c.id, c])) as Record<string, Cluster>;
