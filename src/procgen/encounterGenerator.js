import { getEnemyTier } from "../content/enemies.js";
import { LOOT_TABLES } from "../content/items.js";
import { pick } from "./random.js";

export function generateEncounter({ rng, difficulty }) {
  const enemies = getEnemyTier(difficulty);
  const enemy = pick(rng, enemies);
  const count = 1 + Math.floor(rng() * 3);
  const lootTable = rng() > 0.85 ? LOOT_TABLES.rare : LOOT_TABLES.common;
  const loot = pick(rng, lootTable);

  return {
    type: "encounter",
    enemy,
    count,
    loot,
    threat: Math.round((enemy?.power || 5) * count),
  };
}
