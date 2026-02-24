export const SAVE_VERSION = 1;

export function createNewGame({ name, gender, seed }) {
  const safeName = (name || "Aventurero").trim() || "Aventurero";
  const safeGender = gender || "indefinido";
  const now = new Date().toISOString();

  return {
    meta: {
      version: SAVE_VERSION,
      createdAt: now,
      updatedAt: now,
      seed: seed || Date.now().toString(36),
    },
    player: {
      id: crypto.randomUUID(),
      name: safeName,
      gender: safeGender,
      level: 1,
      xp: 0,
      hp: 100,
      maxHp: 100,
      floor: 0,
    },
    progress: {
      floorsCleared: [],
      lastCity: "Rubi",
    },
    inventory: {
      gold: 0,
      items: [],
    },
    skills: {
      weapons: {},
      craft: {},
    },
    flags: {},
    log: [
      "Has llegado a la ciudad de Rubi.",
      "El castillo se alza con 100 pisos por delante.",
    ],
  };
}

export function touchState(state) {
  return {
    ...state,
    meta: {
      ...state.meta,
      updatedAt: new Date().toISOString(),
    },
  };
}
