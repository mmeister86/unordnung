import { GameState } from "@/types/game";
import { LEVEL_1_DATA } from "./level1";
import { ALL_LEVEL_TEMPLATES } from "./level-templates";

// Mock initial game state
export const INITIAL_GAME_STATE: GameState = {
  player: {
    name: "Held",
    op: 0,
    level: 1,
    inventory: [],
  },
  currentLevel: 1,
  activeNodeId: "start",
  flags: {},
  history: [
    "=== CHAOS QUEST ===",
    "Willkommen in der Welt von Chaos Quest!",
    "Tippe 'hilfe' für verfügbare Befehle.",
    "",
  ],
};

// Mock game state with some progress for testing
export const MOCK_GAME_STATE: GameState = {
  player: {
    name: "Held",
    op: 25,
    level: 1,
    inventory: ["sword", "broom"],
  },
  currentLevel: 1,
  activeNodeId: "speak_fairy",
  flags: {
    spoke_to_fairy: true,
    picked_up_sword: true,
  },
  history: [
    "=== CHAOS QUEST ===",
    "Willkommen in der Welt von Chaos Quest!",
    "Du stehst in der großen Eingangshalle.",
    "Fee Struktura schwebt vor dir.",
    "Du hast mit der Fee gesprochen.",
    "",
    "> sprich fee",
    "Fee Struktura: 'Willkommen, junger Held!'",
    "",
  ],
};

// Export all level data
export const ALL_LEVELS = [LEVEL_1_DATA, ...ALL_LEVEL_TEMPLATES];

// Export level 1 as default for easy access
export default LEVEL_1_DATA;
