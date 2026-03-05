import type { Dealer, DealerWithDistance } from "./dealer-types";

const STATE_ABBREVIATIONS: Record<string, string> = {
  alabama: "AL", alaska: "AK", arizona: "AZ", arkansas: "AR", california: "CA",
  colorado: "CO", connecticut: "CT", delaware: "DE", florida: "FL", georgia: "GA",
  hawaii: "HI", idaho: "ID", illinois: "IL", indiana: "IN", iowa: "IA",
  kansas: "KS", kentucky: "KY", louisiana: "LA", maine: "ME", maryland: "MD",
  massachusetts: "MA", michigan: "MI", minnesota: "MN", mississippi: "MS",
  missouri: "MO", montana: "MT", nebraska: "NE", nevada: "NV",
  "new hampshire": "NH", "new jersey": "NJ", "new mexico": "NM", "new york": "NY",
  "north carolina": "NC", "north dakota": "ND", ohio: "OH", oklahoma: "OK",
  oregon: "OR", pennsylvania: "PA", "rhode island": "RI", "south carolina": "SC",
  "south dakota": "SD", tennessee: "TN", texas: "TX", utah: "UT", vermont: "VT",
  virginia: "VA", washington: "WA", "west virginia": "WV", wisconsin: "WI",
  wyoming: "WY",
};

const ABBREVIATION_TO_STATE = Object.fromEntries(
  Object.entries(STATE_ABBREVIATIONS).map(([name, abbr]) => [abbr, name])
);

export const AVAILABLE_MODELS = [
  "The Viking",
  "The Skylar",
  "The Dutchess",
  "The Duke",
  "The Norwich",
  "The Addison",
] as const;

export function distanceMiles(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const R = 3958.8;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export function sortByDistance(
  dealers: Dealer[],
  lat: number,
  lng: number
): DealerWithDistance[] {
  return dealers
    .map((d) => ({
      ...d,
      distance: distanceMiles(lat, lng, d.lat, d.lng),
    }))
    .sort((a, b) => a.distance - b.distance);
}

export function sortAlphabetically(dealers: Dealer[]): DealerWithDistance[] {
  return [...dealers]
    .sort((a, b) => {
      const stateCompare = a.state.localeCompare(b.state);
      if (stateCompare !== 0) return stateCompare;
      return a.city.localeCompare(b.city);
    })
    .map((d) => ({ ...d, distance: -1 }));
}

export function filterDealers(
  dealers: Dealer[],
  query: string,
  activeModel: string | null
): Dealer[] {
  let filtered = dealers;

  if (activeModel) {
    filtered = filtered.filter((d) =>
      d.models.some((m) => m.toLowerCase() === activeModel.toLowerCase())
    );
  }

  if (query.trim()) {
    const q = query.trim().toLowerCase();
    filtered = filtered.filter((d) => {
      const stateAbbr = STATE_ABBREVIATIONS[d.state.toLowerCase()] || "";
      const stateName = ABBREVIATION_TO_STATE[d.state.toUpperCase()] || d.state;
      return (
        d.city.toLowerCase().includes(q) ||
        d.state.toLowerCase().includes(q) ||
        stateAbbr.toLowerCase().includes(q) ||
        stateName.toLowerCase().includes(q) ||
        d.zip.includes(q) ||
        d.name.toLowerCase().includes(q)
      );
    });
  }

  return filtered;
}

export function formatDistance(miles: number): string {
  if (miles < 0) return "";
  if (miles < 1) return "< 1 mi";
  return `${Math.round(miles)} mi`;
}
