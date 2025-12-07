# 🎮 Chaos Quest - UI Implementation Plan

This document outlines the detailed implementation plan for the Chaos Quest UI. It serves as a blueprint for the Code mode to build the frontend components, ensuring a consistent 8-bit retro aesthetic and adherence to the project's educational goals.

**Scope:**

1.  **All main UI components** (mock data driven)
2.  **Complete Level 1 (Tutorial)** content
3.  **Templates** for Levels 2-6

---

## 1. Component Architecture

The UI is built using Next.js 15 (App Router), React 19, and Tailwind CSS, integrated with ShadcnUI and 8bitcn components.

### Component Hierarchy

```mermaid
graph TD
    RootLayout[RootLayout (app/layout.tsx)]
    Page[Page (app/page.tsx)]

    Page --> GameLayout

    subgraph "Game Layout System"
        GameLayout[GameLayout.tsx]
        GameLayout --> Header[Header / Stats Area]
        GameLayout --> MainArea[Main Game Area]
        GameLayout --> Sidebar[Sidebar / Mission Area]
    end

    subgraph "Core Components"
        Header --> PlayerStats[PlayerStats.tsx]
        Header --> ProgressBar[ProgressBar.tsx]

        MainArea --> GameContainer[GameContainer.tsx]
        GameContainer --> MainMenu[MainMenu.tsx]
        GameContainer --> LevelIntro[LevelIntro.tsx]
        GameContainer --> GameplayView[GameplayView]

        GameplayView --> DialogueBox[DialogueBox.tsx]
        GameplayView --> Terminal[Terminal.tsx]
        GameplayView --> CommandInput[CommandInput.tsx]

        Sidebar --> MissionTracker[MissionTracker.tsx]
        Sidebar --> InventoryDisplay[InventoryDisplay.tsx]
    end
```

### Reusable Patterns

1.  **Container Pattern:** All major sections (Stats, Terminal, Missions) are wrapped in 8bitcn-style containers with pixelated borders.
2.  **Text Display Pattern:**
    - **Narrative/Dialogue:** `Press Start 2P` font, typed out character by character.
    - **Terminal Output:** `Courier New` or similar monospace font, instant or fast typing effect.
3.  **Input Pattern:** Always focused command line at the bottom of the main game area.

---

## 2. 8bitcn Integration Strategy

We will use `8bitcn` components (or custom implementations mimicking them if specific libraries aren't available) to achieve the retro look.

| UI Element          | 8bitcn Block / Style Strategy   | Customization                                                                     |
| :------------------ | :------------------------------ | :-------------------------------------------------------------------------------- | --- | --- | --- | --- | --------- |
| **Main Container**  | `RetroContainer` (bordered box) | Double-line border style, dark blue background (`bg-[#1a1a2e]`).                  |
| **Main Menu**       | `RetroCard`                     | Centered, large pixel font title, list of options as selectable "links".          |
| **Dialogue Box**    | `RetroDialog`                   | Fixed height at top of game area. Portrait on left, text on right. Typing effect. |
| **Player Stats**    | `RetroPanel`                    | Horizontal layout on desktop, compact on mobile. Icons + Value pairs.             |
| **Mission Tracker** | `RetroList`                     | Checkbox style list. Green check for done, empty square for pending.              |
| **Progress Bar**    | `RetroProgress`                 | Block-based progress (e.g., `[                                                    |     |     |     |     | .....]`). |
| **Buttons**         | `RetroButton`                   | Pixelated shadow, "press" animation on click (translate Y + shadow reduction).    |

**Styling Approach:**

- Use Tailwind utility classes for layout and spacing.
- Use custom CSS classes (defined in `globals.css`) for specific 8-bit effects (pixel shadows, CRT scanlines optional).
- **Strict Color Palette:** Enforce the defined retro colors.

---

## 3. Layout System

### Desktop Layout (>768px)

- **Grid:** 3-column grid.
  - **Left (20%):** Player Stats (Vertical stack) or empty if Stats are in Header. _Correction based on Masterplan:_ Masterplan suggests Stats top-left, Game center, Missions right.
  - **Center (60%):** Main Game Area (Dialogue + Terminal + Input).
  - **Right (20%):** Mission Tracker + Inventory.

```tsx
// Desktop Grid Concept
<div className="grid grid-cols-12 gap-4 h-screen p-4 bg-zinc-900 font-pixel">
  {/* Left Panel: Stats */}
  <div className="col-span-3 flex flex-col gap-4">
    <PlayerStats />
    <ProgressBar />
  </div>

  {/* Center Panel: Game */}
  <div className="col-span-6 flex flex-col relative">
    <GameContainer>
      {/* Dynamic Content: Menu, Intro, or Gameplay */}
    </GameContainer>
  </div>

  {/* Right Panel: Missions */}
  <div className="col-span-3">
    <MissionTracker />
  </div>
</div>
```

### Mobile Layout (<768px)

- **Stack:** Vertical stack.
- **Order:**
  1.  Stats Bar (Compact, horizontal scroll or simplified).
  2.  Dialogue Box (Critical info).
  3.  Terminal Output (Scrollable history).
  4.  Command Input (Sticky bottom).
  5.  Mission Tracker (Collapsible/Drawer or Toggle button).

### Responsive Breakpoints

- `md`: 768px - Switch from Stack to Grid.
- `lg`: 1024px - Increase font sizes/padding.

---

## 4. Mock Data Structure

We will use TypeScript interfaces to define the data structure.

### Game State Schema

```typescript
// types/game.ts

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
  type: "story" | "dialogue" | "task" | "puzzle" | "combat";
  text: string; // The main text content
  options?: { label: string; nextNodeId: string }[]; // For menu-style choices if needed
  validCommands?: string[]; // Commands that trigger transitions
  npc?: { name: string; mood: string }; // If an NPC is speaking
};

export type LevelData = {
  id: number;
  title: string;
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
```

---

## 5. Component Specifications

### 1. `Terminal.tsx`

- **Props:** `history: string[]`
- **Function:** Renders the list of past interactions.
- **Style:** Black background, green/white text, monospace font. Scroll to bottom automatically.
- **Animation:** New lines appear with a quick typing effect.

### 2. `CommandInput.tsx`

- **Props:** `onCommand: (cmd: string) => void`, `isProcessing: boolean`
- **Function:** Text input for user commands.
- **Features:**
  - Auto-focus.
  - History (Up/Down arrow keys).
  - Simple autocomplete suggestions (optional for MVP).
- **Style:** `> [ blinking cursor ]`

### 3. `GameContainer.tsx`

- **Props:** `children: React.ReactNode`
- **Function:** Main wrapper with the "CRT" border or main game frame. Handles the switching between MainMenu, LevelIntro, and Gameplay.

### 4. `DialogueBox.tsx`

- **Props:** `speaker: string`, `text: string`, `mood?: string`
- **Function:** Displays current narrative or NPC speech.
- **Style:** Top of the game window. Distinct border. Optional character portrait placeholder.

### 5. `ProgressBar.tsx`

- **Props:** `current: number`, `max: number`, `label: string`
- **Function:** Visual bar for OP or Level progress.
- **Style:** Blocky segments.

### 6. `PlayerStats.tsx`

- **Props:** `stats: GameState['player']`
- **Function:** Displays OP, Level, Inventory count.

### 7. `MissionTracker.tsx`

- **Props:** `tasks: Task[]`
- **Function:** List of current level objectives.
- **Style:** Checkbox list.

### 8. `MainMenu.tsx`

- **Props:** `onStart: () => void`, `onLoad: () => void`
- **Function:** Start screen.
- **Style:** Big ASCII art title or Pixel font title.

### 9. `LevelIntro.tsx`

- **Props:** `level: number`, `title: string`, `goal: string`, `onStartLevel: () => void`
- **Function:** Interstitial screen before a level starts.

---

## 6. Styling Guidelines

### Colors (CSS Variables)

Add these to `app/globals.css`:

```css
:root {
  --retro-bg-dark: #1a1a2e;
  --retro-bg-panel: #16213e;
  --retro-primary: #0f3460;
  --retro-accent: #e94560; /* Red/Pink */
  --retro-success: #53a653; /* Green */
  --retro-text-main: #e9ecef;
  --retro-text-dim: #adb5bd;
  --retro-border: #4a5568;
}
```

### Typography

- **Headings/UI:** `Press Start 2P` (Google Font).
- **Terminal/Body:** `Courier Prime` or `VT323`.

### Animations

- **Typing:** CSS keyframes for width expansion or JS-based interval.
- **Blink:** Standard opacity toggle.
- **Shake:** Transform translate X/Y for errors.

---

## 7. Level 1 Complete Content (Mock Data)

This data will be placed in `lib/mock-data/level1.ts`.

```typescript
export const LEVEL_1_DATA: LevelData = {
  id: 1,
  title: "Die Eingangshalle",
  description: "Lerne, große Aufgaben in kleine Schritte zu zerlegen.",
  tasks: [
    { id: "t1", description: "Schwerter aufräumen (0/3)", status: "pending" },
    { id: "t2", description: "Rüstungen aufstellen (0/3)", status: "pending" },
    { id: "t3", description: "Fahnen sortieren", status: "pending" },
  ],
  items: [
    {
      id: "sword",
      name: "Schwert",
      description: "Ein schweres Ritterschwert.",
    },
    { id: "broom", name: "Besen", description: "Ein alter Besen." },
  ],
  nodes: {
    start: {
      id: "start",
      type: "story",
      text: "Du stehst in der großen Eingangshalle. Es herrscht totales Chaos! Schwerter liegen am Boden, Rüstungen sind umgefallen. Fee Struktura schwebt vor dir.",
      npc: { name: "Fee Struktura", mood: "concerned" },
      validCommands: ["schaue", "sprich fee"],
    },
    look: {
      id: "look",
      type: "story",
      text: "Du siehst 3 Schwerter, 3 Rüstungen und verstaubte Fahnen. Es sieht nach viel Arbeit aus.",
      validCommands: ["nimm schwert", "richte rüstung auf"],
    },
    // ... (Full node list from masterplan will be implemented in code)
  },
};
```

---

## 8. Implementation Priority

1.  **Setup:** Install fonts, configure Tailwind colors, create `types/game.ts`.
2.  **Layout Shell:** Create `GameLayout`, `GameContainer`, and responsive grid.
3.  **Core UI Components:** `Terminal`, `CommandInput`, `DialogueBox`.
4.  **State & Mock Data:** Create `useGameState` hook (mock) and `level1.ts`.
5.  **Secondary UI:** `PlayerStats`, `MissionTracker`, `ProgressBar`.
6.  **Screens:** `MainMenu`, `LevelIntro`.
7.  **Integration:** Wire everything together in `app/page.tsx` to simulate the flow: Menu -> Intro -> Game (Level 1).
