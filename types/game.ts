export type GameState = {
    player: {
        name: string;
        op: number; // Ordnungs-Punkte
        level: number;
        inventory: string[];
    };
    currentLevel: number;
    activeNodeId: string;
    flags: Record<string, boolean>; // For tracking specific game events
    history: string[]; // Terminal output history
};

export type GameNode = {
    id: string;
    type: "story" | "dialogue" | "task" | "puzzle" | "combat" | "tutorial" | "challenge_introduction" | "teaching_moment" | "decision" | "success" | "progress" | "milestone" | "level_milestone" | "reflection" | "levelComplete";
    text: string; // The main text content
    options?: { label: string; nextNodeId: string }[]; // For menu-style choices if needed
    validCommands?: string[]; // Commands that trigger transitions (deprecated, use transitions instead)
    npc?: { name: string; mood: string; image?: string }; // If an NPC is speaking
    transitions?: Transition[]; // Command-based transitions
    effects?: Effect[]; // Effects that apply when entering this node
};

export type Transition = {
    command: string | string[]; // Command pattern(s) that trigger this transition
    nextNodeId: string; // Target node ID
    response?: string; // Response message when transition happens
    conditions?: Condition[]; // Conditions that must be met
    effects?: Effect[]; // Effects applied during transition
};

export type Effect =
    | { type: "addOP"; amount: number }
    | { type: "addToInventory"; item: string }
    | { type: "removeFromInventory"; item: string }
    | { type: "setFlag"; flag: string; value: boolean }
    | { type: "updateTask"; taskId: string; status: "pending" | "completed" | "failed" }
    | { type: "completeLevel"; level: number }
    | { type: "unlockLevel"; level: number }
    | { type: "unlockAchievement"; achievement: string };

export type Condition =
    | { type: "hasFlag"; flag: string; value: boolean }
    | { type: "not"; flag: string } // Shorthand for hasFlag with value false
    | { type: "hasItem"; item: string }
    | { type: "taskStatus"; taskId: string; status: "pending" | "completed" | "failed" }
    | { type: "opGreaterThan"; amount: number }
    | { type: "opLessThan"; amount: number };

export type Command = {
    type: string; // Command type (e.g., "nimm", "schaue", "sprich")
    target?: string; // Target object (e.g., "schwert", "fee")
    modifier?: string; // Modifier (e.g., "alle", "erstes")
    raw: string; // Original command string
};

export type GameResponse = {
    success: boolean;
    message: string;
    effects?: Effect[];
    nextNodeId?: string;
    suggestions?: string[]; // Command suggestions on error
};

export type LevelData = {
    id: number;
    title: string;
    backgroundImage?: string;
    description: string;
    nodes: Record<string, GameNode>;
    tasks: Task[];
    items: Item[];
};

export type Task = {
    id: string;
    description: string;
    status: "pending" | "completed" | "failed";
    isOptional?: boolean;
};

export type Item = {
    id: string;
    name: string;
    description: string;
};

export type PlayerStats = {
    name: string;
    op: number;
    level: number;
    inventory: string[];
};

export type GameView = "menu" | "intro" | "gameplay" | "victory";

export type GameProps = {
    gameState: GameState;
    currentLevel: LevelData;
    currentView: GameView;
};
