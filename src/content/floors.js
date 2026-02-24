export const SAFE_FLOORS = new Set([11, 21, 31, 41, 51, 61, 71, 81, 91]);

export const FLOOR_ZONES = [
  {
    id: "superficie",
    range: [0, 0],
    name: "Rubi",
    biome: "Ciudad fortificada",
    difficulty: "tutorial",
  },
  {
    id: "zona-inicial",
    range: [1, 10],
    name: "Zona inicial",
    biome: "Campos verdes",
    difficulty: "baja",
  },
  {
    id: "transicion",
    range: [11, 25],
    name: "Transicion",
    biome: "Bosques densos",
    difficulty: "media",
  },
  {
    id: "zona-media",
    range: [26, 50],
    name: "Zona media",
    biome: "Pantanos, nieves y volcanes",
    difficulty: "media-alta",
  },
  {
    id: "zona-alta",
    range: [51, 74],
    name: "Alta dificultad",
    biome: "Castillos oscuros",
    difficulty: "alta",
  },
  {
    id: "piso-75",
    range: [75, 75],
    name: "Piso 75",
    biome: "Raid",
    difficulty: "elite",
  },
  {
    id: "ascenso-final",
    range: [76, 99],
    name: "Ascenso final",
    biome: "Templos antiguos",
    difficulty: "extrema",
  },
  {
    id: "piso-100",
    range: [100, 100],
    name: "Piso 100",
    biome: "Catedral final",
    difficulty: "legendaria",
  },
];

export function getZoneForFloor(floor) {
  return FLOOR_ZONES.find(
    (zone) => floor >= zone.range[0] && floor <= zone.range[1]
  );
}

export function isSafeFloor(floor) {
  return SAFE_FLOORS.has(floor);
}
