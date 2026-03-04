/** Shared finish color map — importable from both server and client components */

const FINISH_COLORS: Record<string, string> = {
  espresso: "#3c2415",
  graphite: "#4a4a4a",
  "weathered gray": "#8a8a8a",
  chestnut: "#6b3a2a",
  "warm chestnut": "#6b3a2a",
  silverstone: "#a8a9ad",
  driftwood: "#967d6b",
  "dark cherry": "#4a1c1c",
  nutmeg: "#7a5c3a",
  timber: "#8b6914",
  rustic: "#7a5940",
  "dark walnut": "#3e2723",
  "traditional mahogany": "#6b2d2d",
  "classic oak": "#b08d57",
  black: "#1a1a1a",
  "honey maple": "#c68e3f",
  "classic green": "#2d5a2d",
};

export const getFinishColor = (finishName: string): string => {
  const key = finishName.toLowerCase().trim();
  if (key === "various") return "conic-gradient";
  return FINISH_COLORS[key] ?? "#999";
};
