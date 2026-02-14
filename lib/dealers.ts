/* ─── Dealer Finder ─── */

export interface Dealer {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  website?: string;
  lat: number;
  lng: number;
  type: "authorized" | "premium";
}

/* Sample dealer data — replace with real dealer list */
export const dealers: Dealer[] = [
  {
    id: "d1",
    name: "Premium Billiards",
    address: "14523 FM 2920",
    city: "Tomball",
    state: "TX",
    zip: "77377",
    phone: "281-351-4800",
    lat: 30.0972,
    lng: -95.6161,
    type: "premium",
  },
  {
    id: "d2",
    name: "Billiard Factory",
    address: "10039 Northwest Fwy",
    city: "Houston",
    state: "TX",
    zip: "77092",
    phone: "713-681-8267",
    website: "https://billiardfactory.com",
    lat: 29.8168,
    lng: -95.4949,
    type: "authorized",
  },
  {
    id: "d3",
    name: "Qualty Billiards & Game Rooms",
    address: "3500 S University Dr",
    city: "Fort Worth",
    state: "TX",
    zip: "76109",
    phone: "817-924-2653",
    lat: 32.7113,
    lng: -97.3607,
    type: "authorized",
  },
  {
    id: "d4",
    name: "Texas Billiards",
    address: "8137 Mesa Dr",
    city: "Austin",
    state: "TX",
    zip: "78759",
    phone: "512-454-2146",
    website: "https://texasbilliards.com",
    lat: 30.3942,
    lng: -97.7387,
    type: "authorized",
  },
  {
    id: "d5",
    name: "Peters Billiards",
    address: "2940 Lyndale Ave S",
    city: "Minneapolis",
    state: "MN",
    zip: "55408",
    phone: "612-827-5958",
    website: "https://petersbilliards.com",
    lat: 44.9487,
    lng: -93.2879,
    type: "authorized",
  },
  {
    id: "d6",
    name: "Best Buy Pool Supply",
    address: "2305 E Indian School Rd",
    city: "Phoenix",
    state: "AZ",
    zip: "85016",
    phone: "602-955-6600",
    lat: 33.4951,
    lng: -112.0378,
    type: "authorized",
  },
  {
    id: "d7",
    name: "All Pro Billiards",
    address: "7 Kimball Ln Unit C",
    city: "Lynnfield",
    state: "MA",
    zip: "01940",
    phone: "781-942-7665",
    website: "https://allprobilliards.com",
    lat: 42.5385,
    lng: -71.0408,
    type: "authorized",
  },
  {
    id: "d8",
    name: "Family Leisure",
    address: "1470 N. Stemmons Fwy",
    city: "Carrollton",
    state: "TX",
    zip: "75006",
    phone: "972-416-4510",
    website: "https://familyleisure.com",
    lat: 32.9702,
    lng: -96.8956,
    type: "authorized",
  },
];

/* ─── ZIP → Coordinate lookup (US only, approximate) ─── */
/* We use a lightweight approach: bundle a small lookup for common ZIPs,
   fallback to a free API for unknown ZIPs. */

interface Coordinate {
  lat: number;
  lng: number;
}

export async function geocodeZip(zip: string): Promise<Coordinate | null> {
  try {
    const res = await fetch(
      `https://api.zippopotam.us/us/${zip.trim().slice(0, 5)}`
    );
    if (!res.ok) return null;
    const data = await res.json();
    const place = data.places?.[0];
    if (!place) return null;
    return {
      lat: parseFloat(place.latitude),
      lng: parseFloat(place.longitude),
    };
  } catch {
    return null;
  }
}

/* Haversine distance in miles */
export function distanceMiles(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const R = 3959; // Earth radius in miles
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function toRad(deg: number) {
  return (deg * Math.PI) / 180;
}

export function findNearestDealers(
  lat: number,
  lng: number,
  limit = 5
): (Dealer & { distance: number })[] {
  return dealers
    .map((d) => ({
      ...d,
      distance: Math.round(distanceMiles(lat, lng, d.lat, d.lng)),
    }))
    .sort((a, b) => a.distance - b.distance)
    .slice(0, limit);
}
