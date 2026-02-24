export const ENEMY_TIERS = {
  baja: [
    { id: "jabali", name: "Jabali", power: 4, tags: ["bestia"] },
    { id: "lobo", name: "Lobo gris", power: 6, tags: ["bestia"] },
    { id: "goblin", name: "Goblin", power: 7, tags: ["humanoide"] },
    { id: "esqueleto", name: "Esqueleto", power: 8, tags: ["no-muerto"] },
  ],
  media: [
    { id: "elemental-tierra", name: "Elemental de tierra", power: 14, tags: ["elemental"] },
    { id: "elemental-hielo", name: "Elemental de hielo", power: 16, tags: ["elemental"] },
    { id: "caballero-perdido", name: "Caballero perdido", power: 18, tags: ["no-muerto"] },
    { id: "sacerdote-sombrio", name: "Sacerdote sombrio", power: 17, tags: ["mago"] },
  ],
  mediaAlta: [
    { id: "bestia-del-pantano", name: "Bestia del pantano", power: 26, tags: ["bestia"] },
    { id: "mercenario-de-hielo", name: "Mercenario de hielo", power: 28, tags: ["humanoide"] },
    { id: "troll-de-fuego", name: "Troll de fuego", power: 30, tags: ["gigante"] },
  ],
  alta: [
    { id: "guardian-oscuro", name: "Guardian oscuro", power: 40, tags: ["elite"] },
    { id: "hechicero-ancestral", name: "Hechicero ancestral", power: 42, tags: ["mago"] },
    { id: "verdugo", name: "Verdugo de acero", power: 45, tags: ["elite"] },
  ],
  extrema: [
    { id: "serafin-caido", name: "Serafin caido", power: 58, tags: ["elite"] },
    { id: "arconte", name: "Arconte del vacio", power: 60, tags: ["elite"] },
  ],
};

export function getEnemyTier(difficulty) {
  switch (difficulty) {
    case "tutorial":
    case "baja":
      return ENEMY_TIERS.baja;
    case "media":
      return ENEMY_TIERS.media;
    case "media-alta":
      return ENEMY_TIERS.mediaAlta;
    case "alta":
      return ENEMY_TIERS.alta;
    default:
      return ENEMY_TIERS.extrema;
  }
}
