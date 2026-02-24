import { getZoneForFloor, isSafeFloor } from "../content/floors.js";
import { getBossForFloor } from "../content/bosses.js";
import { createRng, pick } from "./random.js";
import { generateEncounter } from "./encounterGenerator.js";

const FLOOR_EVENTS = [
  "Un mercader errante ofrece sus mercancias.",
  "Una patrulla enemiga recorre el camino.",
  "Encuentras un altar olvidado con runas.",
  "El aire se vuelve pesado y la magia vibra.",
];

export function generateFloor({ floor, seed }) {
  const zone = getZoneForFloor(floor);
  const rng = createRng(`${seed}-${floor}`);
  const safe = isSafeFloor(floor);
  const boss = getBossForFloor(floor);
  const event = pick(rng, FLOOR_EVENTS);
  const encounters = safe
    ? []
    : Array.from({ length: 3 + Math.floor(rng() * 3) }, () =>
        generateEncounter({ rng, difficulty: zone?.difficulty || "baja" })
      );

  return {
    floor,
    zone,
    safe,
    boss,
    event,
    encounters,
  };
}
