const TIME = {
  MINUTE: 60 * 1000,
  HOUR: 60 * 60 * 1000
};

const CONFIG = {
  WAR_INTERVAL: 8 * TIME.HOUR,
  QUEST_ZONES: [
    { id: "bosque", name: "Bosque Sombrío", minLevel: 1, staminaCost: 2, duration: 20 * TIME.MINUTE },
    { id: "pantano", name: "Pantano Espeso", minLevel: 5, staminaCost: 3, duration: 30 * TIME.MINUTE },
    { id: "ruinas", name: "Ruinas Antiguas", minLevel: 10, staminaCost: 4, duration: 40 * TIME.MINUTE }
  ],
  STAMINA_MAX: 20,
  STAMINA_REGEN_INTERVAL: 15 * TIME.MINUTE,
  PROFESSION_COOLDOWN: 30 * TIME.MINUTE,
  ARENA_COOLDOWN: 30 * TIME.MINUTE,
  MARKET_REFRESH: 60 * TIME.MINUTE,
  CHAT_MAX_MESSAGES: 120
};

// --------------------
// Datos base
// --------------------

const CASTLES = {
  picas: { id: "picas", icon: "♠️", name: "Castillo Picas" },
  trebol: { id: "trebol", icon: "♣️", name: "Castillo Trébol" },
  corazon: { id: "corazon", icon: "♥️", name: "Castillo Corazón" },
  diamante: { id: "diamante", icon: "♦️", name: "Castillo Diamante" }
};

const CLASSES = {
  guerrero: {
    id: "guerrero",
    icon: "⚔️",
    name: "Guerrero",
    desc: "Daño físico cuerpo a cuerpo.",
    baseStats: { str: 6, agi: 3, int: 1, vit: 5 }
  },
  arquero: {
    id: "arquero",
    icon: "🏹",
    name: "Arquero",
    desc: "Críticos y evasión.",
    baseStats: { str: 4, agi: 6, int: 2, vit: 4 }
  },
  mago: {
    id: "mago",
    icon: "✨",
    name: "Mago",
    desc: "Daño mágico.",
    baseStats: { str: 2, agi: 3, int: 7, vit: 4 }
  }
};

const PROFESSIONS = {
  minero: { id: "minero", icon: "⛏️", name: "Minería", resource: "mineral_hierro" },
  leñador: { id: "leñador", icon: "🪵", name: "Leñador", resource: "madera" },
  herborista: { id: "herborista", icon: "🌿", name: "Herborista", resource: "hierba" }
};

const ITEMS = {
  // Recursos
  mineral_hierro: { id: "mineral_hierro", name: "Mineral de hierro", type: "recurso" },
  madera: { id: "madera", name: "Madera", type: "recurso" },
  hierba: { id: "hierba", name: "Hierba silvestre", type: "recurso" },

  // Consumibles
  pocion_pequena: {
    id: "pocion_pequena",
    name: "Poción pequeña de salud",
    type: "consumible",
    effect: { healPercent: 0.3 }
  },

  // Armas
  espada_oxidada: {
    id: "espada_oxidada",
    name: "Espada oxidada",
    type: "arma",
    atk: 4,
    classHint: "guerrero"
  },
  arco_simple: {
    id: "arco_simple",
    name: "Arco simple",
    type: "arma",
    atk: 4,
    classHint: "arquero"
  },
  baston_roto: {
    id: "baston_roto",
    name: "Bastón agrietado",
    type: "arma",
    atk: 4,
    classHint: "mago"
  },

  // Armaduras
  armadura_cuero: {
    id: "armadura_cuero",
    name: "Armadura de cuero",
    type: "armadura",
    def: 3
  },
  tunica_maga: {
    id: "tunica_maga",
    name: "Túnica de aprendiz",
    type: "armadura",
    def: 2
  }
};

const CRAFT_RECIPES = [
  {
    id: "craft_espada",
    name: "Forjar Espada oxidada",
    requires: { mineral_hierro: 3, madera: 1 },
    produces: "espada_oxidada"
  },
  {
    id: "craft_arco",
    name: "Fabricar Arco simple",
    requires: { madera: 3, hierba: 1 },
    produces: "arco_simple"
  },
  {
    id: "craft_baston",
    name: "Tallado Bastón agrietado",
    requires: { madera: 2, hierba: 2 },
    produces: "baston_roto"
  },
  {
    id: "craft_armadura",
    name: "Armadura de cuero",
    requires: { hierba: 2, mineral_hierro: 2 },
    produces: "armadura_cuero"
  },
  {
    id: "craft_pocion",
    name: "Poción pequeña de salud",
    requires: { hierba: 1 },
    produces: "pocion_pequena"
  }
];

// Enemigos por zona
const ENEMIES = {
  bosque: [
    { id: "lobo", name: "Lobo hambriento", level: 1, baseHP: 25, atk: 5, def: 1, exp: 10, goldMin: 5, goldMax: 10, loot: [{ itemId: "madera", chance: 0.4, min: 1, max: 2 }] },
    { id: "bandido", name: "Bandido débil", level: 2, baseHP: 30, atk: 7, def: 2, exp: 14, goldMin: 8, goldMax: 14, loot: [{ itemId: "mineral_hierro", chance: 0.3, min: 1, max: 1 }] }
  ],
  pantano: [
    { id: "slime", name: "Slime venenoso", level: 5, baseHP: 45, atk: 10, def: 4, exp: 30, goldMin: 15, goldMax: 25, loot: [{ itemId: "hierba", chance: 0.5, min: 1, max: 3 }] },
    { id: "espectro", name: "Espectro del pantano", level: 6, baseHP: 50, atk: 11, def: 5, exp: 40, goldMin: 20, goldMax: 30, loot: [{ itemId: "hierba", chance: 0.4, min: 1, max: 2 }] }
  ],
  ruinas: [
    { id: "esqueleto", name: "Esqueleto armado", level: 10, baseHP: 70, atk: 16, def: 7, exp: 70, goldMin: 35, goldMax: 50, loot: [{ itemId: "mineral_hierro", chance: 0.6, min: 2, max: 3 }] },
    { id: "hechicero", name: "Hechicero olvidado", level: 11, baseHP: 75, atk: 18, def: 8, exp: 80, goldMin: 40, goldMax: 60, loot: [{ itemId: "hierba", chance: 0.6, min: 2, max: 3 }] }
  ]
};

const BOT_NAMES = [
  "Lolo", "Maru", "Kiro", "Nero", "Akira", "Valen", "Rena", "Lia",
  "Ciro", "Mora", "Dante", "Sasha", "Rex", "Luna", "Orion",
  "Hex", "Bruno", "Mika", "Gael", "Arya"
];

// --------------------
// Estado de juego
// --------------------

let state = null;
let dom = {};
let mainTickInterval = null;
let chatTickCounter = 0;

// --------------------
// Utilidades
// --------------------

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randChoice(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function now() {
  return Date.now();
}

function formatTimeRemaining(ms) {
  if (ms <= 0) return "listo";
  const totalSec = Math.floor(ms / 1000);
  const h = Math.floor(totalSec / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = totalSec % 60;
  if (h > 0) return `${h}h ${m}m`;
  if (m > 0) return `${m}m ${s}s`;
  return `${s}s`;
}

function formatClock(ts) {
  const d = new Date(ts);
  return d.toLocaleTimeString();
}

function clamp(val, min, max) {
  return Math.max(min, Math.min(max, val));
}

// --------------------
// Guardado / Carga
// --------------------

const SAVE_KEY = "guerraCastillosSave";

function saveGame() {
  if (!state) return;
  state.meta.lastSaveTime = now();
  try {
    localStorage.setItem(SAVE_KEY, JSON.stringify(state));
    showTransientMessage("Partida guardada.", "overview");
  } catch (e) {
    console.error("Error guardando juego:", e);
  }
}

function loadGame() {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw);
    return data;
  } catch (e) {
    console.error("Error cargando juego:", e);
    return null;
  }
}

// --------------------
// Inicialización
// --------------------

document.addEventListener("DOMContentLoaded", () => {
  cacheDOM();
  attachGlobalHandlers();

  const loaded = loadGame();
  if (loaded) {
    state = loaded;
    processOfflineProgress();
    switchToGameScreen();
  }
});

function cacheDOM() {
  dom.startScreen = document.getElementById("start-screen");
  dom.gameScreen = document.getElementById("game-screen");
  dom.inputName = document.getElementById("input-name");
  dom.btnStartGame = document.getElementById("btn-start-game");
  dom.btnLoadGame = document.getElementById("btn-load-game");
  dom.btnSaveGame = document.getElementById("btn-save-game");

  // Resumen
  dom.summaryName = document.getElementById("summary-name");
  dom.summaryLevel = document.getElementById("summary-level");
  dom.summaryCastle = document.getElementById("summary-castle");
  dom.summaryClass = document.getElementById("summary-class");
  dom.summaryHP = document.getElementById("summary-hp");
  dom.summaryATK = document.getElementById("summary-atk");
  dom.summaryDEF = document.getElementById("summary-def");
  dom.summaryGold = document.getElementById("summary-gold");
  dom.summaryEXP = document.getElementById("summary-exp");
  dom.summaryStamina = document.getElementById("summary-stamina");
  dom.summaryStaminaMax = document.getElementById("summary-stamina-max");
  dom.summaryWarTimer = document.getElementById("summary-war-timer");
  dom.summaryTime = document.getElementById("summary-time");

  dom.mainNav = document.getElementById("main-nav");
  dom.sections = {
    overview: document.getElementById("section-overview"),
    quests: document.getElementById("section-quests"),
    professions: document.getElementById("section-professions"),
    craft: document.getElementById("section-craft"),
    arena: document.getElementById("section-arena"),
    wars: document.getElementById("section-wars"),
    guild: document.getElementById("section-guild"),
    market: document.getElementById("section-market"),
    chat: document.getElementById("section-chat")
  };

  // Overview
  dom.overviewText = document.getElementById("overview-text");
  dom.overviewEquipment = document.getElementById("overview-equipment");
  dom.overviewInventory = document.getElementById("overview-inventory");

  // Quests
  dom.questZoneSelect = document.getElementById("quest-zone-select");
  dom.btnStartQuest = document.getElementById("btn-start-quest");
  dom.questStatus = document.getElementById("quest-status");
  dom.questLog = document.getElementById("quest-log");

  // Professions
  dom.profStatus = document.getElementById("prof-status");
  dom.profLog = document.getElementById("prof-log");

  // Craft
  dom.craftList = document.getElementById("craft-list");
  dom.craftStatus = document.getElementById("craft-status");

  // Arena
  dom.btnArenaFight = document.getElementById("btn-arena-fight");
  dom.arenaStatus = document.getElementById("arena-status");
  dom.arenaLog = document.getElementById("arena-log");

  // Wars
  dom.warParticipate = document.getElementById("war-participate");
  dom.warTimerDetail = document.getElementById("war-timer-detail");
  dom.btnForceWar = document.getElementById("btn-force-war");
  dom.warLastResult = document.getElementById("war-last-result");

  // Guild
  dom.guildSummary = document.getElementById("guild-summary");
  dom.btnJoinGuild = document.getElementById("btn-join-guild");
  dom.guildActions = document.getElementById("guild-actions");
  dom.btnGuildDonate = document.getElementById("btn-guild-donate");
  dom.btnGuildMission = document.getElementById("btn-guild-mission");
  dom.guildStatus = document.getElementById("guild-status");
  dom.guildLog = document.getElementById("guild-log");

  // Market
  dom.marketOffers = document.getElementById("market-offers");
  dom.marketSellItem = document.getElementById("market-sell-item");
  dom.marketSellPrice = document.getElementById("market-sell-price");
  dom.btnMarketSell = document.getElementById("btn-market-sell");
  dom.marketStatus = document.getElementById("market-status");

  // Chat
  dom.chatLog = document.getElementById("chat-log");
  dom.chatInputText = document.getElementById("chat-input-text");
  dom.btnChatSend = document.getElementById("btn-chat-send");
}

function attachGlobalHandlers() {
  dom.btnStartGame.addEventListener("click", onStartGame);
  dom.btnLoadGame.addEventListener("click", onLoadGameClicked);
  dom.btnSaveGame.addEventListener("click", saveGame);

  dom.mainNav.addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-section]");
    if (!btn) return;
    changeSection(btn.getAttribute("data-section"));
  });

  dom.btnStartQuest.addEventListener("click", onQuestButton);
  dom.btnArenaFight.addEventListener("click", onArenaFight);

  // Profesiones
  document.querySelectorAll("#section-professions button[data-prof]").forEach((btn) => {
    btn.addEventListener("click", () => {
      onProfessionClick(btn.getAttribute("data-prof"));
    });
  });

  // War
  dom.warParticipate.addEventListener("change", () => {
    if (state) state.war.participate = dom.warParticipate.checked;
  });
  dom.btnForceWar.addEventListener("click", () => {
    if (!state) return;
    simulateWar(true);
    updateWarUI();
  });

  // Guild
  dom.btnJoinGuild.addEventListener("click", onJoinGuildClicked);
  dom.btnGuildDonate.addEventListener("click", onGuildDonate);
  dom.btnGuildMission.addEventListener("click", onGuildMission);

  // Market
  dom.btnMarketSell.addEventListener("click", onMarketSell);

  // Chat
  dom.btnChatSend.addEventListener("click", onChatSend);
  dom.chatInputText.addEventListener("keydown", (e) => {
    if (e.key === "Enter") onChatSend();
  });
}

function onStartGame() {
  const name = (dom.inputName.value || "").trim();
  if (!name) {
    alert("Ingresa un nombre para tu héroe.");
    return;
  }
  const castleVal = document.querySelector('input[name="castle"]:checked').value;
  const classVal = document.querySelector('input[name="class"]:checked').value;

  state = createNewGame(name, castleVal, classVal);
  switchToGameScreen();
}

function onLoadGameClicked() {
  const loaded = loadGame();
  if (!loaded) {
    alert("No se encontró una partida guardada.");
    return;
  }
  state = loaded;
  processOfflineProgress();
  switchToGameScreen();
}

function switchToGameScreen() {
  dom.startScreen.classList.add("hidden");
  dom.gameScreen.classList.remove("hidden");

  initQuestZoneSelect();
  initCraftList();
  populateMarketSellSelect();

  updateAllUI();

  if (mainTickInterval) clearInterval(mainTickInterval);
  mainTickInterval = setInterval(mainTick, 1000);
}

// --------------------
// Creación de nueva partida
// --------------------

function createNewGame(name, castleId, classId) {
  const cls = CLASSES[classId];

  const baseStats = Object.assign({}, cls.baseStats);

  const player = {
    name: name,
    castleId,
    classId,
    level: 1,
    exp: 0,
    nextLevelExp: 100,
    baseStats: baseStats,
    hpMax: 0,
    hp: 0,
    atk: 0,
    def: 0,
    crit: 0,
    dodge: 0,
    stamina: CONFIG.STAMINA_MAX,
    staminaMax: CONFIG.STAMINA_MAX,
    staminaLastUpdate: now(),
    gold: 100,
    arenaRating: 1000
  };

  const equipment = { weapon: null, armor: null, accessory: null };
  const inventory = {};

  // Objetos iniciales
  addItem(inventory, "pocion_pequena", 2);
  if (classId === "guerrero") addItem(inventory, "espada_oxidada", 1);
  if (classId === "arquero") addItem(inventory, "arco_simple", 1);
  if (classId === "mago") addItem(inventory, "baston_roto", 1);

  const quest = {
    active: false,
    zoneId: null,
    endTime: 0,
    pendingReward: false,
    lastResult: null
  };

  const professions = {};
  Object.keys(PROFESSIONS).forEach((pid) => {
    professions[pid] = { cooldownUntil: 0 };
  });

  const arena = {
    cooldownUntil: 0,
    lastResult: null
  };

  const war = {
    participate: true,
    nextWarTime: now() + CONFIG.WAR_INTERVAL,
    history: []
  };

  const guild = {
    joined: false,
    name: "",
    level: 1,
    exp: 0,
    nextExp: 100,
    lastMissionTime: 0
  };

  const market = {
    offers: [],
    lastGeneratedTime: 0
  };

  const chat = {
    messages: []
  };

  const meta = {
    lastSaveTime: now()
  };

  const st = {
    player,
    equipment,
    inventory,
    quest,
    professions,
    arena,
    war,
    guild,
    market,
    chat,
    meta
  };

  recalcDerivedStats(st);
  equipBestStartingWeapon(st);

  // Primeras ofertas de mercado y primeros mensajes de chat
  generateMarketOffers(st, true);
  seedInitialChat(st);

  return st;
}

// --------------------
// Recalcular stats
// --------------------

function recalcDerivedStats(st) {
  const p = st.player;
  const weapon = st.equipment.weapon ? ITEMS[st.equipment.weapon] : null;
  const armor = st.equipment.armor ? ITEMS[st.equipment.armor] : null;

  const str = p.baseStats.str;
  const agi = p.baseStats.agi;
  const intStat = p.baseStats.int;
  const vit = p.baseStats.vit;

  let atkBase = 0;
  if (p.classId === "guerrero") atkBase = str * 2 + agi;
  else if (p.classId === "arquero") atkBase = str + agi * 2;
  else atkBase = intStat * 2 + agi;

  let defBase = vit + Math.floor(str / 2);

  if (weapon && weapon.atk) atkBase += weapon.atk;
  if (armor && armor.def) defBase += armor.def;

  const hpMax = 30 + vit * 6 + p.level * 4;

  p.hpMax = hpMax;
  if (p.hp == null || p.hp > hpMax) p.hp = hpMax;

  p.atk = atkBase;
  p.def = defBase;
  p.crit = 0.05 + agi * 0.002;  // 5% base + algo por agi
  p.dodge = 0.03 + agi * 0.001; // 3% base + algo por agi
}

function equipBestStartingWeapon(st) {
  const p = st.player;
  const inv = st.inventory;
  const preferred = p.classId === "guerrero" ? "espada_oxidada" :
                    p.classId === "arquero" ? "arco_simple" :
                    "baston_roto";
  if (inv[preferred] > 0) {
    st.equipment.weapon = preferred;
  }
}

// --------------------
// Procesar progreso offline
// --------------------

function processOfflineProgress() {
  const st = state;
  const nowTs = now();
  const last = st.meta.lastSaveTime || nowTs;
  const diff = nowTs - last;

  // Stamina regenerada por intervalos completos
  const p = st.player;
  if (p.stamina < p.staminaMax) {
    const elapsedSinceRegen = nowTs - p.staminaLastUpdate;
    if (elapsedSinceRegen > 0) {
      const points = Math.floor(elapsedSinceRegen / CONFIG.STAMINA_REGEN_INTERVAL);
      if (points > 0) {
        p.stamina = clamp(p.stamina + points, 0, p.staminaMax);
        p.staminaLastUpdate = nowTs;
      }
    }
  }

  // Guerras pasadas
  while (st.war.nextWarTime <= nowTs) {
    simulateWar(false);
    st.war.nextWarTime += CONFIG.WAR_INTERVAL;
  }

  // Misiones de gremio: simplemente dejamos que el cooldown se cumpla solo
  // Quest: si terminó en offline, dejamos la recompensa pendiente
  if (st.quest.active && !st.quest.pendingReward && st.quest.endTime <= nowTs) {
    st.quest.pendingReward = true;
  }

  // Arena: cooldown se resuelve solo al comparar tiempos
  // Profesiones: igual, se basan en timestamps
  // Mercado: regeneramos ofertas si pasó tiempo
  if (nowTs - st.market.lastGeneratedTime >= CONFIG.MARKET_REFRESH) {
    generateMarketOffers(st, false);
  }

  // Chat: agregamos algunos mensajes genéricos si estuvo mucho tiempo offline
  if (diff > 2 * TIME.HOUR) {
    addChatMessage(st, "global", randomBotName(st), "Estuviste ausente un buen rato, el mundo siguió girando...");
    addChatMessage(st, "castle", randomBotName(st), "Las guerras no se detienen, estés conectado o no.");
  }
}

// --------------------
// UI General
// --------------------

function changeSection(sectionId) {
  document.querySelectorAll("#main-nav .nav-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.getAttribute("data-section") === sectionId);
  });
  Object.keys(dom.sections).forEach((id) => {
    dom.sections[id].classList.toggle("visible", id === sectionId);
  });
}

function updateAllUI() {
  if (!state) return;
  updateSummaryUI();
  updateOverviewUI();
  updateQuestUI();
  updateProfessionsUI();
  updateCraftUI();
  updateArenaUI();
  updateWarUI();
  updateGuildUI();
  updateMarketUI();
  updateChatUI();
}

function updateSummaryUI() {
  const p = state.player;
  const castle = CASTLES[p.castleId];
  const cls = CLASSES[p.classId];

  dom.summaryName.textContent = p.name;
  dom.summaryLevel.textContent = `Lv ${p.level}`;
  dom.summaryCastle.textContent = `${castle.icon} ${castle.name}`;
  dom.summaryClass.textContent = `${cls.icon} ${cls.name}`;
  dom.summaryHP.textContent = `${Math.floor(p.hp)}/${p.hpMax}`;
  dom.summaryATK.textContent = p.atk;
  dom.summaryDEF.textContent = p.def;
  dom.summaryGold.textContent = p.gold;
  dom.summaryEXP.textContent = `${p.exp}/${p.nextLevelExp}`;
  dom.summaryStamina.textContent = p.stamina;
  dom.summaryStaminaMax.textContent = p.staminaMax;

  dom.summaryTime.textContent = formatClock(now());
}

function updateOverviewUI() {
  const st = state;
  const p = st.player;
  const castle = CASTLES[p.castleId];
  const cls = CLASSES[p.classId];

  dom.overviewText.textContent =
    `${p.name}, nivel ${p.level} ${cls.name} de ${castle.name}. ` +
    `Oro: ${p.gold}. Arena: ${p.arenaRating}.`;

  // Equipo
  dom.overviewEquipment.innerHTML = "";
  const eqList = [];
  if (st.equipment.weapon) eqList.push(`Arma: ${ITEMS[st.equipment.weapon].name}`);
  else eqList.push("Arma: (ninguna)");
  if (st.equipment.armor) eqList.push(`Armadura: ${ITEMS[st.equipment.armor].name}`);
  else eqList.push("Armadura: (ninguna)");
  if (st.equipment.accessory) eqList.push(`Accesorio: ${ITEMS[st.equipment.accessory].name}`);
  else eqList.push("Accesorio: (ninguno)");

  eqList.forEach((txt) => {
    const li = document.createElement("li");
    li.textContent = txt;
    dom.overviewEquipment.appendChild(li);
  });

  // Inventario
  dom.overviewInventory.innerHTML = "";
  const inv = st.inventory;
  Object.keys(inv).forEach((itemId) => {
    if (!inv[itemId]) return;
    const span = document.createElement("span");
    span.className = "item";
    span.textContent = `${ITEMS[itemId].name} x${inv[itemId]}`;
    dom.overviewInventory.appendChild(span);
  });
}

// --------------------
// Aventuras
// --------------------

function initQuestZoneSelect() {
  dom.questZoneSelect.innerHTML = "";
  CONFIG.QUEST_ZONES.forEach((z) => {
    const opt = document.createElement("option");
    opt.value = z.id;
    opt.textContent = `${z.name} (Lv ${z.minLevel}+ · ⏱️ ${Math.floor(z.duration / TIME.MINUTE)}m · ⚡${z.staminaCost})`;
    dom.questZoneSelect.appendChild(opt);
  });
}

function updateQuestUI() {
  const q = state.quest;
  if (!q.active && !q.pendingReward) {
    dom.questStatus.textContent = "No estás en una aventura. Elige una zona y comienza.";
    dom.btnStartQuest.disabled = false;
    dom.btnStartQuest.textContent = "Iniciar aventura";
  } else if (q.active && !q.pendingReward) {
    const remaining = q.endTime - now();
    dom.questStatus.textContent = `Aventura en curso en ${getZoneById(q.zoneId).name}. Tiempo restante: ${formatTimeRemaining(remaining)}.`;
    dom.btnStartQuest.disabled = true;
    dom.btnStartQuest.textContent = "Aventura en curso...";
  } else if (q.pendingReward) {
    dom.questStatus.textContent = "Tu aventura ha terminado. Reclama el resultado.";
    dom.btnStartQuest.disabled = false;
    dom.btnStartQuest.textContent = "Reclamar botín";
  }

  // Mostrar último resultado en log
  if (q.lastResult && !dom.questLog._initialized) {
    appendLog(dom.questLog, q.lastResult);
    dom.questLog._initialized = true;
  }
}

function getZoneById(id) {
  return CONFIG.QUEST_ZONES.find((z) => z.id === id);
}

function onQuestButton() {
  const q = state.quest;
  const p = state.player;

  if (!q.active && !q.pendingReward) {
    // Iniciar nueva aventura
    const zoneId = dom.questZoneSelect.value;
    const zone = getZoneById(zoneId);
    if (p.level < zone.minLevel) {
      dom.questStatus.textContent = `Necesitas ser al menos nivel ${zone.minLevel} para ir a ${zone.name}.`;
      return;
    }
    if (p.stamina < zone.staminaCost) {
      dom.questStatus.textContent = "No tienes suficiente energía para esta aventura.";
      return;
    }

    p.stamina -= zone.staminaCost;
    p.staminaLastUpdate = now();

    q.active = true;
    q.zoneId = zoneId;
    q.endTime = now() + zone.duration;
    q.pendingReward = false;
    q.lastResult = null;

    appendLog(dom.questLog, `Has partido hacia ${zone.name}. Vuelves en aproximadamente ${Math.floor(zone.duration / TIME.MINUTE)} minutos.`);
    updateSummaryUI();
    updateQuestUI();
  } else if (q.pendingReward) {
    // Resolver aventura
    const resultText = resolveQuest();
    appendLog(dom.questLog, resultText);
    q.pendingReward = false;
    q.active = false;
    q.zoneId = null;
    q.endTime = 0;
    q.lastResult = resultText;

    updateSummaryUI();
    updateOverviewUI();
    updateQuestUI();
  }
}

function resolveQuest() {
  const st = state;
  const q = st.quest;
  const p = st.player;
  const zoneId = q.zoneId;
  const enemies = ENEMIES[zoneId] || [];
  if (!enemies.length) return "No sucedió nada en tu aventura (error de configuración).";

  const enemy = randChoice(enemies);

  const battleResult = simulateBattle(
    {
      name: p.name,
      hpMax: p.hpMax,
      atk: p.atk,
      def: p.def,
      crit: p.crit,
      dodge: p.dodge
    },
    {
      name: enemy.name,
      hpMax: enemy.baseHP,
      atk: enemy.atk,
      def: enemy.def,
      crit: 0.05,
      dodge: 0.02
    }
  );

  let text = `Aventura en ${getZoneById(zoneId).name} contra ${enemy.name}.\n`;

  if (battleResult.winner === "player") {
    text += "✅ Has vencido.\n";
    p.hp = clamp(battleResult.playerHP, 1, p.hpMax);

    // Recompensas
    const exp = enemy.exp;
    const gold = randInt(enemy.goldMin, enemy.goldMax);
    p.exp += exp;
    p.gold += gold;
    text += `Ganas ⭐${exp} exp y 💰${gold} oro.\n`;

    // Loot
    (enemy.loot || []).forEach((entry) => {
      if (Math.random() < entry.chance) {
        const qty = randInt(entry.min, entry.max);
        addItem(st.inventory, entry.itemId, qty);
        text += `Obtienes ${ITEMS[entry.itemId].name} x${qty}.\n`;
      }
    });

    // Posible poción
    if (Math.random() < 0.15) {
      addItem(st.inventory, "pocion_pequena", 1);
      text += "Encuentras una 💊 Poción pequeña de salud.\n";
    }

    checkLevelUp(st);
  } else {
    text += "❌ Has sido derrotado. Vuelves herido al castillo.\n";
    p.hp = Math.max(5, Math.floor(p.hpMax * 0.25));
  }

  return text;
}

// --------------------
// Combate genérico
// --------------------

function simulateBattle(player, enemy) {
  let pHP = player.hpMax;
  let eHP = enemy.hpMax;
  const logs = [];
  let rounds = 0;

  while (pHP > 0 && eHP > 0 && rounds < 50) {
    rounds++;

    // Turno jugador
    if (Math.random() > enemy.dodge) {
      let dmg = Math.max(1, player.atk - enemy.def + randInt(-2, 2));
      let crit = false;
      if (Math.random() < player.crit) {
        dmg = Math.floor(dmg * 1.5);
        crit = true;
      }
      eHP -= dmg;
      logs.push(`Tú golpeas a ${enemy.name} por ${dmg} daño${crit ? " (CRÍTICO)" : ""}.`);
      if (eHP <= 0) break;
    } else {
      logs.push(`${enemy.name} esquiva tu ataque.`);
    }

    // Turno enemigo
    if (Math.random() > player.dodge) {
      let dmgE = Math.max(1, enemy.atk - player.def + randInt(-2, 2));
      let critE = false;
      if (Math.random() < enemy.crit) {
        dmgE = Math.floor(dmgE * 1.5);
        critE = true;
      }
      pHP -= dmgE;
      logs.push(`${enemy.name} te golpea por ${dmgE} daño${critE ? " (CRÍTICO)" : ""}.`);
      if (pHP <= 0) break;
    } else {
      logs.push("Esquivaste el ataque enemigo.");
    }
  }

  const winner = pHP > 0 ? "player" : "enemy";
  return { winner, playerHP: Math.max(0, Math.floor(pHP)), enemyHP: Math.max(0, Math.floor(eHP)), logs };
}

// --------------------
// Profesiones
// --------------------

function updateProfessionsUI() {
  // Solo mostramos el estado actual básico
  const lines = [];
  Object.keys(state.professions).forEach((pid) => {
    const prof = state.professions[pid];
    const def = PROFESSIONS[pid];
    const remaining = prof.cooldownUntil - now();
    if (remaining > 0) {
      lines.push(`${def.icon} ${def.name}: recargando (${formatTimeRemaining(remaining)})`);
    } else {
      lines.push(`${def.icon} ${def.name}: listo para usar.`);
    }
  });
  dom.profStatus.textContent = lines.join(" · ");
}

function onProfessionClick(pid) {
  const prof = state.professions[pid];
  const def = PROFESSIONS[pid];
  const remaining = prof.cooldownUntil - now();

  if (remaining > 0) {
    dom.profStatus.textContent = `${def.name} aún en recarga durante ${formatTimeRemaining(remaining)}.`;
    return;
  }

  // Realizamos la recolección
  prof.cooldownUntil = now() + CONFIG.PROFESSION_COOLDOWN;

  const qty = randInt(1, 3);
  addItem(state.inventory, def.resource, qty);
  appendLog(dom.profLog, `Has practicado ${def.name} y obtienes ${ITEMS[def.resource].name} x${qty}.`);
  updateProfessionsUI();
  updateOverviewUI();
}

// --------------------
// Crafteo
// --------------------

function initCraftList() {
  dom.craftList.innerHTML = "";
  CRAFT_RECIPES.forEach((recipe) => {
    const div = document.createElement("div");
    div.className = "recipe";
    const reqStrings = Object.keys(recipe.requires).map((itemId) => {
      const qty = recipe.requires[itemId];
      return `${ITEMS[itemId].name} x${qty}`;
    });
    div.innerHTML = `
      <strong>${recipe.name}</strong><br/>
      Requiere: ${reqStrings.join(", ")}
    `;
    const btn = document.createElement("button");
    btn.textContent = "Craftear";
    btn.addEventListener("click", () => onCraft(recipe.id));
    div.appendChild(btn);
    dom.craftList.appendChild(div);
  });
}

function updateCraftUI() {
  // nada dinámico aún, solo se actualiza mensaje de estado
}

function onCraft(recipeId) {
  const st = state;
  const recipe = CRAFT_RECIPES.find((r) => r.id === recipeId);
  if (!recipe) return;

  // Verificar recursos
  const inv = st.inventory;
  for (const itemId in recipe.requires) {
    const needed = recipe.requires[itemId];
    const have = inv[itemId] || 0;
    if (have < needed) {
      dom.craftStatus.textContent = `No tienes suficientes ${ITEMS[itemId].name}.`;
      return;
    }
  }

  // Descontar recursos
  for (const itemId in recipe.requires) {
    const needed = recipe.requires[itemId];
    inv[itemId] -= needed;
    if (inv[itemId] < 0) inv[itemId] = 0;
  }

  addItem(inv, recipe.produces, 1);
  dom.craftStatus.textContent = `Has creado ${ITEMS[recipe.produces].name}.`;
  updateOverviewUI();
  populateMarketSellSelect();
}

// --------------------
// Arena
// --------------------

function updateArenaUI() {
  const a = state.arena;
  const remaining = a.cooldownUntil - now();
  if (remaining > 0) {
    dom.arenaStatus.textContent = `Arena en recarga: ${formatTimeRemaining(remaining)}.`;
    dom.btnArenaFight.disabled = true;
  } else {
    dom.arenaStatus.textContent = "Listo para combatir en la arena.";
    dom.btnArenaFight.disabled = false;
  }
}

function onArenaFight() {
  const a = state.arena;
  const remaining = a.cooldownUntil - now();
  if (remaining > 0) {
    dom.arenaStatus.textContent = `Arena en recarga: ${formatTimeRemaining(remaining)}.`;
    return;
  }

  // Generar oponente fantasma
  const p = state.player;
  const botLevel = clamp(p.level + randInt(-1, 1), 1, p.level + 2);
  const botName = randomBotName(state);
  const botCastle = randChoice(Object.values(CASTLES));
  const botClassKey = randChoice(Object.keys(CLASSES));
  const botClass = CLASSES[botClassKey];

  const botAtk = 5 + botLevel * 2;
  const botDef = 2 + botLevel;
  const botHP = 25 + botLevel * 7;

  const battle = simulateBattle(
    { name: p.name, hpMax: p.hpMax, atk: p.atk, def: p.def, crit: p.crit, dodge: p.dodge },
    { name: botName, hpMax: botHP, atk: botAtk, def: botDef, crit: 0.06, dodge: 0.04 }
  );

  let text = `Arena: te enfrentas a ${botName} (${botClass.name} de ${botCastle.name}, Lv ${botLevel}).\n`;
  battle.logs.forEach((l) => (text += l + "\n"));

  if (battle.winner === "player") {
    text += "🏆 ¡Has ganado el combate de arena!\n";
    state.player.hp = clamp(battle.playerHP, 1, state.player.hpMax);
    state.player.arenaRating += randInt(5, 15);
    const gold = randInt(10, 25);
    state.player.gold += gold;
    text += `Ganas 💰${gold} oro y tu rating de arena ahora es ${state.player.arenaRating}.\n`;
    // Pequeña exp
    const exp = 20 + botLevel * 3;
    state.player.exp += exp;
    text += `Ganas ⭐${exp} exp.\n`;
    checkLevelUp(state);
  } else {
    text += "😵 Has perdido el combate de arena.\n";
    state.player.hp = Math.max(5, Math.floor(state.player.hpMax * 0.3));
    state.player.arenaRating = Math.max(800, state.player.arenaRating - randInt(10, 25));
    text += `Tu rating de arena baja a ${state.player.arenaRating}.\n`;
  }

  appendLog(dom.arenaLog, text);
  a.lastResult = text;
  a.cooldownUntil = now() + CONFIG.ARENA_COOLDOWN;

  updateSummaryUI();
  updateArenaUI();
  updateOverviewUI();
}

// --------------------
// Guerras
// --------------------

function updateWarUI() {
  const st = state;
  const remaining = st.war.nextWarTime - now();
  const txt = formatTimeRemaining(remaining);
  dom.summaryWarTimer.textContent = txt;
  dom.warTimerDetail.textContent = txt;
  dom.warParticipate.checked = st.war.participate;

  // Mostrar último resultado
  const last = st.war.history[st.war.history.length - 1];
  if (last) {
    dom.warLastResult.textContent = last.text;
  }
}

function simulateWar(triggeredByPlayer) {
  const st = state;
  const p = st.player;
  const castles = Object.values(CASTLES);

  // Poder base de cada castillo
  const results = castles.map((c) => {
    let power = 1000 + randInt(0, 800);
    // Bonus extra aleatorio
    power += randInt(0, 400);
    return { castleId: c.id, power };
  });

  // Aporte del jugador
  let contributed = false;
  if (st.war.participate) {
    const my = results.find((r) => r.castleId === p.castleId);
    if (my) {
      const contrib = p.level * 40 + p.atk * 3;
      my.power += contrib;
      contributed = true;
    }
  }

  // Determinar ganador
  results.sort((a, b) => b.power - a.power);
  const winner = results[0];
  const myResult = results.find((r) => r.castleId === p.castleId);

  let text = `⚔️ Guerra entre castillos:\n`;
  results.forEach((r, idx) => {
    const castle = CASTLES[r.castleId];
    text += `${idx === 0 ? "🏆" : " "}${castle.icon} ${castle.name}: poder ${r.power}\n`;
  });

  const winnerCastle = CASTLES[winner.castleId];
  text += `\nEl ganador fue ${winnerCastle.icon} ${winnerCastle.name}.\n`;

  if (contributed) {
    if (winner.castleId === p.castleId) {
      const gold = 100 + p.level * 10;
      const exp = 50 + p.level * 5;
      p.gold += gold;
      p.exp += exp;
      text += `Tu participación fue registrada. Tu castillo ganó la guerra.\n`;
      text += `Recompensas: 💰${gold} oro, ⭐${exp} exp.\n`;
      checkLevelUp(st);
    } else {
      text += "Participaste en la guerra, pero tu castillo fue derrotado.\n";
      const exp = 20 + p.level * 3;
      p.exp += exp;
      text += `Recibes consuelo de guerra: ⭐${exp} exp.\n`;
      checkLevelUp(st);
    }
  } else {
    text += "No participaste en esta guerra.\n";
  }

  // Registrar histórico (mantener los últimos 10)
  st.war.history.push({ time: now(), winner: winner.castleId, text });
  if (st.war.history.length > 10) st.war.history.shift();

  // Chat
  const channel = "castle";
  let chatMsg = "";
  if (winner.castleId === p.castleId) {
    chatMsg = "¡Victoria para nuestro castillo! Buen trabajo a todos los que participaron.";
  } else {
    chatMsg = "Perdimos esta guerra, pero la próxima no nos rendiremos.";
  }
  addChatMessage(st, channel, randomBotName(st), chatMsg);

  // Mostrar en UI
  dom.warLastResult.textContent = text;
  updateSummaryUI();
}

// --------------------
// Gremio
// --------------------

function updateGuildUI() {
  const g = state.guild;
  if (!g.joined) {
    dom.guildSummary.textContent = "No perteneces a ningún gremio. Puedes unirte o crear uno.";
    dom.guildActions.classList.add("hidden");
  } else {
    dom.guildSummary.textContent =
      `Gremio: ${g.name} (Lv ${g.level}, exp ${g.exp}/${g.nextExp}). ` +
      `Bonificación aproximada: +${g.level * 2}% a recompensas.`;
    dom.guildActions.classList.remove("hidden");
  }
}

function onJoinGuildClicked() {
  const g = state.guild;
  if (!g.joined) {
    const castle = CASTLES[state.player.castleId];
    const name = `${castle.icon} Hermanos de ${castle.name.split(" ")[1]}`;
    g.joined = true;
    g.name = name;
    g.level = 1;
    g.exp = 0;
    g.nextExp = 100;
    g.lastMissionTime = 0;
    appendLog(dom.guildLog, `Te unes al gremio "${name}".`);
    addChatMessage(state, "guild", state.player.name, "¡Saludos, me uno al gremio!");
  } else {
    appendLog(dom.guildLog, "Ya perteneces a un gremio.");
  }
  updateGuildUI();
}

function onGuildDonate() {
  const g = state.guild;
  if (!g.joined) {
    dom.guildStatus.textContent = "Primero debes unirte a un gremio.";
    return;
  }
  if (state.player.gold < 100) {
    dom.guildStatus.textContent = "No tienes suficiente oro para donar.";
    return;
  }
  state.player.gold -= 100;
  g.exp += 25;
  dom.guildStatus.textContent = "Has donado 100 de oro al gremio. Gracias por tu aporte.";

  appendLog(dom.guildLog, `${state.player.name} dona 100 de oro al gremio.`);

  if (g.exp >= g.nextExp) {
    g.level += 1;
    g.exp = 0;
    g.nextExp = Math.floor(g.nextExp * 1.7);
    appendLog(dom.guildLog, `¡El gremio sube a nivel ${g.level}! Las bonificaciones mejoran.`);
  }

  updateGuildUI();
  updateSummaryUI();
}

function onGuildMission() {
  const g = state.guild;
  if (!g.joined) {
    dom.guildStatus.textContent = "Primero debes unirte a un gremio.";
    return;
  }
  const remaining = g.lastMissionTime + CONFIG.PROFESSION_COOLDOWN - now();
  if (remaining > 0) {
    dom.guildStatus.textContent = `Las misiones de gremio aún se están preparando (${formatTimeRemaining(remaining)}).`;
    return;
  }

  g.lastMissionTime = now();

  const missions = [
    "Cazar monstruos en los alrededores.",
    "Proteger una caravana de comerciantes.",
    "Explorar una cueva cercana.",
    "Patrullar las murallas del castillo aliado."
  ];
  const chosen = randChoice(missions);

  let text = `Misión de gremio: ${chosen}\n`;
  const baseReward = 40 + state.player.level * 5;
  const bonus = 1 + g.level * 0.02;
  const goldReward = Math.floor(baseReward * bonus);
  const expReward = Math.floor((baseReward / 2) * bonus);

  state.player.gold += goldReward;
  state.player.exp += expReward;
  text += `Recompensas personales: 💰${goldReward} oro, ⭐${expReward} exp.\n`;
  checkLevelUp(state);

  appendLog(dom.guildLog, text);
  dom.guildStatus.textContent = "Has completado una misión de gremio.";

  updateSummaryUI();
  updateOverviewUI();
}

// --------------------
// Mercado
// --------------------

function generateMarketOffers(st, initial) {
  const nowTs = now();
  const offers = [];
  const possible = ["madera", "mineral_hierro", "hierba", "pocion_pequena"];
  const count = initial ? 6 : 4;

  for (let i = 0; i < count; i++) {
    const itemId = randChoice(possible);
    const basePrice =
      itemId === "madera" ? randInt(8, 14) :
      itemId === "mineral_hierro" ? randInt(10, 18) :
      itemId === "hierba" ? randInt(6, 12) :
      randInt(25, 40);

    offers.push({
      id: `offer_${nowTs}_${i}_${Math.random().toString(16).slice(2, 6)}`,
      itemId,
      qty: randInt(1, 3),
      price: basePrice,
      seller: randomBotName(st),
      expiresAt: nowTs + CONFIG.MARKET_REFRESH
    });
  }

  st.market.offers = offers;
  st.market.lastGeneratedTime = nowTs;
}

function updateMarketUI() {
  const st = state;
  const nowTs = now();

  // Limpiar expiradas
  st.market.offers = st.market.offers.filter((o) => o.expiresAt > nowTs);

  dom.marketOffers.innerHTML = "";
  st.market.offers.forEach((offer) => {
    const div = document.createElement("div");
    div.className = "market-offer";
    div.textContent =
      `${ITEMS[offer.itemId].name} x${offer.qty} -- ` +
      `${offer.price} oro (vendedor: ${offer.seller})`;

    const btn = document.createElement("button");
    btn.textContent = "Comprar";
    btn.addEventListener("click", () => onMarketBuy(offer.id));
    div.appendChild(btn);

    dom.marketOffers.appendChild(div);
  });

  populateMarketSellSelect();
}

function populateMarketSellSelect() {
  dom.marketSellItem.innerHTML = "";
  const inv = state ? state.inventory : {};
  const hasItems = Object.keys(inv || {}).some((id) => inv[id] > 0);
  if (!hasItems) {
    const opt = document.createElement("option");
    opt.value = "";
    opt.textContent = "(No tienes objetos para vender)";
    dom.marketSellItem.appendChild(opt);
    return;
  }

  Object.keys(inv).forEach((itemId) => {
    if (!inv[itemId]) return;
    const opt = document.createElement("option");
    opt.value = itemId;
    opt.textContent = `${ITEMS[itemId].name} (x${inv[itemId]})`;
    dom.marketSellItem.appendChild(opt);
  });
}

function onMarketBuy(offerId) {
  const st = state;
  const offerIdx = st.market.offers.findIndex((o) => o.id === offerId);
  if (offerIdx === -1) return;
  const offer = st.market.offers[offerIdx];

  const totalCost = offer.price * offer.qty;
  if (st.player.gold < totalCost) {
    dom.marketStatus.textContent = "No tienes suficiente oro para esta compra.";
    return;
  }

  st.player.gold -= totalCost;
  addItem(st.inventory, offer.itemId, offer.qty);
  st.market.offers.splice(offerIdx, 1);

  dom.marketStatus.textContent =
    `Compraste ${ITEMS[offer.itemId].name} x${offer.qty} por ${totalCost} oro.`;
  updateSummaryUI();
  updateOverviewUI();
  updateMarketUI();
}

function onMarketSell() {
  const st = state;
  const itemId = dom.marketSellItem.value;
  if (!itemId) {
    dom.marketStatus.textContent = "No hay ítems seleccionables para vender.";
    return;
  }
  const price = parseInt(dom.marketSellPrice.value, 10);
  if (!price || price <= 0) {
    dom.marketStatus.textContent = "Ingresa un precio válido.";
    return;
  }
  const inv = st.inventory;
  if (!inv[itemId] || inv[itemId] <= 0) {
    dom.marketStatus.textContent = "No tienes ese ítem.";
    return;
  }

  // Para simplificar: venta instantánea a un bot
  inv[itemId] -= 1;
  if (inv[itemId] < 0) inv[itemId] = 0;

  const botBuyer = randomBotName(st);
  st.player.gold += price;

  dom.marketStatus.textContent =
    `Vendiste ${ITEMS[itemId].name} a ${botBuyer} por ${price} oro.`;
  appendLog(dom.questLog, `En el mercado, ${botBuyer} compró tu ${ITEMS[itemId].name}.`);

  updateSummaryUI();
  updateOverviewUI();
  updateMarketUI();
}

// --------------------
// Chat simulado
// --------------------

function seedInitialChat(st) {
  addChatMessage(st, "global", randomBotName(st), "Bienvenido al mundo de Guerra de Castillos.");
  addChatMessage(st, "global", randomBotName(st), "Recuerda guardar tu progreso de vez en cuando.");
  const castle = CASTLES[st.player.castleId];
  addChatMessage(st, "castle", randomBotName(st), `Otro héroe se une a las filas de ${castle.name}.`);
}

function addChatMessage(st, channel, sender, text, isPlayer) {
  const msg = {
    time: now(),
    channel,
    sender,
    text,
    isPlayer: !!isPlayer
  };
  st.chat.messages.push(msg);
  if (st.chat.messages.length > CONFIG.CHAT_MAX_MESSAGES) {
    st.chat.messages.shift();
  }
  if (dom.chatLog) renderChatLog();
}

function channelLabel(channel) {
  if (channel === "global") return "[Global]";
  if (channel === "castle") return "[Castillo]";
  if (channel === "guild") return "[Gremio]";
  return "[Sistema]";
}

function renderChatLog() {
  dom.chatLog.innerHTML = "";
  if (!state || !state.chat) return;
  state.chat.messages.forEach((m) => {
    const div = document.createElement("div");
    div.className = "chat-line";
    const ch = channelLabel(m.channel);
    const t = new Date(m.time).toLocaleTimeString();
    div.textContent = `${t} ${ch} ${m.isPlayer ? "⭐" : ""}${m.sender}: ${m.text}`;
    dom.chatLog.appendChild(div);
  });
  dom.chatLog.scrollTop = dom.chatLog.scrollHeight;
}

function updateChatUI() {
  renderChatLog();
}

function randomBotName(st) {
  // Simplemente tomamos al azar
  return randChoice(BOT_NAMES);
}

function onChatSend() {
  const txt = (dom.chatInputText.value || "").trim();
  if (!txt) return;
  dom.chatInputText.value = "";
  addChatMessage(state, "global", state.player.name, txt, true);
}

// Chat automático
function autoGenerateChat() {
  const st = state;
  if (!st) return;

  // Cada cierto número de ticks hacemos un mensaje
  chatTickCounter++;
  if (chatTickCounter % 20 !== 0) return; // aprox cada 20 segundos

  const channels = ["global", "castle", st.guild.joined ? "guild" : "global"];
  const channel = randChoice(channels);
  const sender = randomBotName(st);

  const globalLines = [
    "¿Alguien va a arena ahora?",
    "El mercado está raro hoy, los precios suben.",
    "Dicen que las ruinas esconden un gran tesoro.",
    "Yo siempre me olvido de usar las profesiones."
  ];

  const castleLines = [
    "Nuestro castillo necesita héroes activos para las guerras.",
    "Guardad energía para la próxima guerra.",
    "No se olviden de equipar bien antes de salir."
  ];

  const guildLines = [
    "Recuerden donar algo de oro al gremio de vez en cuando.",
    "¿Alguien hizo ya la misión de gremio?",
    "Si subimos de nivel, las recompensas mejoran."
  ];

  let text;
  if (channel === "global") text = randChoice(globalLines);
  else if (channel === "castle") text = randChoice(castleLines);
  else text = randChoice(guildLines);

  addChatMessage(st, channel, sender, text);
}

// --------------------
// Misceláneo
// --------------------

function addItem(inv, itemId, qty) {
  if (!inv[itemId]) inv[itemId] = 0;
  inv[itemId] += qty;
}

function checkLevelUp(st) {
  const p = st.player;
  let leveled = false;
  while (p.exp >= p.nextLevelExp) {
    p.exp -= p.nextLevelExp;
    p.level += 1;
    p.nextLevelExp = Math.floor(p.nextLevelExp * 1.6);
    // Pequeña mejora de stats base
    p.baseStats.str += 1;
    p.baseStats.agi += 1;
    p.baseStats.int += 1;
    p.baseStats.vit += 1;
    leveled = true;
  }
  if (leveled) {
    recalcDerivedStats(st);
    addChatMessage(st, "global", "Sistema", `${p.name} ha subido a nivel ${p.level}.`);
  }
}

function appendLog(el, text) {
  const t = new Date().toLocaleTimeString();
  el.textContent += `[${t}] ${text}\n`;
  el.scrollTop = el.scrollHeight;
}

function showTransientMessage(text, sectionId) {
  if (sectionId === "overview") {
    dom.overviewText.textContent = text;
    setTimeout(updateOverviewUI, 1500);
  }
}

// --------------------
// Tick principal
// --------------------

function mainTick() {
  if (!state) return;
  const st = state;
  const nowTs = now();

  // Regeneración de energía
  const p = st.player;
  if (p.stamina < p.staminaMax) {
    const elapsed = nowTs - p.staminaLastUpdate;
    const points = Math.floor(elapsed / CONFIG.STAMINA_REGEN_INTERVAL);
    if (points > 0) {
      p.stamina = clamp(p.stamina + points, 0, p.staminaMax);
      p.staminaLastUpdate += points * CONFIG.STAMINA_REGEN_INTERVAL;
    }
  }

  // Quest: si está activa y ya se cumplió el tiempo, marcar recompensa pendiente
  if (st.quest.active && !st.quest.pendingReward && st.quest.endTime <= nowTs) {
    st.quest.pendingReward = true;
    st.quest.active = false;
    dom.questStatus.textContent = "Tu aventura ha terminado. Reclama el botín.";
    dom.btnStartQuest.disabled = false;
    dom.btnStartQuest.textContent = "Reclamar botín";
  }

  // Guerras
  if (st.war.nextWarTime <= nowTs) {
    simulateWar(false);
    st.war.nextWarTime = nowTs + CONFIG.WAR_INTERVAL;
  }

  // Mercado: regenerar si hace falta
  if (nowTs - st.market.lastGeneratedTime >= CONFIG.MARKET_REFRESH) {
    generateMarketOffers(st, false);
  }

  // Chat automático
  autoGenerateChat();

  // Actualizar UI
  updateSummaryUI();
  updateQuestUI();
  updateProfessionsUI();
  updateArenaUI();
  updateWarUI();
  updateMarketUI();
}
