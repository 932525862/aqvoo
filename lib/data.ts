export type Lang = "uz" | "ru" | "en";
export type CatId = "steak" | "roast" | "stew" | "mince";

export const CONTACT = {
  instagram: { handle: "@aqvo_jiz", url: "https://www.instagram.com/aqvo_jiz/" },
  // Add phone numbers / Telegram here when the client provides them — every block that uses them hides itself while empty.
  phones: [] as string[],
  telegram: null as null | { handle: string; url: string },
};

/**
 * The 14 cuts from the client's butchery chart. Numbers and names match the chart.
 * `poly` / `pin` are in the coordinates of /public/cow.webp (1021×679).
 */
export type Cut = { id: string; cat: CatId; w: number; h: number; poly: string; pin: [number, number] };

export const CUTS: Cut[] = [
  { id: "41", cat: "roast", w: 871, h: 590, poly: "-20,30 200,40 205,190 -20,200", pin: [95, 120] },
  { id: "45", cat: "roast", w: 900, h: 406, poly: "200,40 340,40 340,175 205,190", pin: [270, 110] },
  { id: "44", cat: "stew", w: 900, h: 457, poly: "-20,200 205,190 200,335 -20,345", pin: [95, 265] },
  { id: "42", cat: "roast", w: 758, h: 526, poly: "205,190 285,185 290,330 200,335", pin: [245, 260] },
  { id: "60", cat: "stew", w: 827, h: 527, poly: "-20,345 200,335 245,470 250,575 -20,575", pin: [120, 455] },
  { id: "46", cat: "steak", w: 900, h: 353, poly: "340,0 565,0 565,130 340,140", pin: [450, 85] },
  { id: "31", cat: "steak", w: 900, h: 369, poly: "340,140 565,130 565,195 340,205", pin: [450, 168] },
  { id: "67", cat: "steak", w: 884, h: 505, poly: "565,0 735,0 735,170 565,190", pin: [650, 95] },
  { id: "62", cat: "steak", w: 900, h: 356, poly: "285,205 340,205 460,198 462,460 285,460 290,330 285,185", pin: [380, 320] },
  { id: "11", cat: "mince", w: 381, h: 276, poly: "460,198 565,195 600,190 610,440 462,460", pin: [530, 320] },
  { id: "63", cat: "stew", w: 900, h: 578, poly: "735,0 860,0 865,330 770,335 760,170 735,170", pin: [820, 250] },
  { id: "64", cat: "stew", w: 807, h: 419, poly: "735,40 805,40 815,175 740,175", pin: [775, 110] },
  { id: "65", cat: "stew", w: 900, h: 385, poly: "600,190 735,170 760,170 770,335 612,350", pin: [690, 265] },
  { id: "61", cat: "stew", w: 900, h: 504, poly: "612,350 770,335 830,420 750,490 610,480", pin: [700, 415] },
];
// the fore shank uses the same cut (60) — drawn as a second region on the cow
export const EXTRA_REGIONS: { id: string; poly: string; pin: [number, number] }[] = [{ id: "60", poly: "555,480 750,480 730,580 555,580", pin: [640, 530] }];

export const CATS: CatId[] = ["steak", "roast", "stew", "mince"];

/* Cities for the delivery map (latitude, longitude). */
export const CITIES = [
  { key: "tashkent", lat: 41.31, lon: 69.28 }, { key: "samarkand", lat: 39.65, lon: 66.96 },
  { key: "bukhara", lat: 39.77, lon: 64.42 }, { key: "andijan", lat: 40.78, lon: 72.34 },
  { key: "namangan", lat: 41.0, lon: 71.67 }, { key: "fergana", lat: 40.38, lon: 71.79 },
  { key: "nukus", lat: 42.46, lon: 59.6 }, { key: "urgench", lat: 41.55, lon: 60.63 },
  { key: "qarshi", lat: 38.86, lon: 65.79 }, { key: "termez", lat: 37.22, lon: 67.28 },
  { key: "jizzakh", lat: 40.12, lon: 67.84 }, { key: "navoi", lat: 40.1, lon: 65.37 },
  { key: "guliston", lat: 40.49, lon: 68.78 },
] as const;
