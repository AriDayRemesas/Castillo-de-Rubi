import { touchState } from "./state.js";

const reducers = {
  log(state, payload) {
    return {
      ...state,
      log: [payload, ...state.log].slice(0, 50),
    };
  },
  updatePlayer(state, payload) {
    return {
      ...state,
      player: {
        ...state.player,
        ...payload,
      },
    };
  },
  advanceFloor(state) {
    const nextFloor = state.player.floor + 1;
    return {
      ...state,
      player: {
        ...state.player,
        floor: nextFloor,
      },
      progress: {
        ...state.progress,
        floorsCleared: [...state.progress.floorsCleared, state.player.floor],
      },
    };
  },
};

export function createEngine(initialState, eventBus) {
  let state = initialState;

  function apply(type, payload) {
    if (!reducers[type]) {
      return state;
    }
    state = touchState(reducers[type](state, payload));
    eventBus.emit("state:changed", state);
    return state;
  }

  function getState() {
    return state;
  }

  return {
    apply,
    getState,
  };
}
