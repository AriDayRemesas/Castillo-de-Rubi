export const LOOT_TABLES = {
  common: [
    { id: "pocion-menor", name: "Pocion menor", effect: "cura 20" },
    { id: "hierbas", name: "Hierbas curativas", effect: "cura 10" },
    { id: "cuerda", name: "Cuerda resistente", effect: "util" },
  ],
  rare: [
    { id: "espada-antigua", name: "Espada antigua", effect: "+5 ataque" },
    { id: "talisman-escarcha", name: "Talisman de escarcha", effect: "+5 defensa" },
  ],
  boss: [
    { id: "nucleo-elemental", name: "Nucleo elemental", effect: "upgrade" },
    { id: "corona-oscura", name: "Corona oscura", effect: "+10 poder" },
  ],
};
