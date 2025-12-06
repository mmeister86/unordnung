# 🎮 CHAOS QUEST - MASTER PLAN

**Mini-Hackathlon Projekt: "Unordnung"**  
**Abgabe:** Montag, 7:00 Uhr  
**Tech Stack:** Next.js 15.5.7, Tailwind CSS, ShadcnUI, 8bitcn.com

---

## 📋 Inhaltsverzeichnis

1. [Projekt-Übersicht](#projekt-übersicht)
2. [Pädagogisches Konzept](#pädagogisches-konzept)
3. [Story & Narrative](#story--narrative)
4. [Game Design](#game-design)
5. [Technische Architektur](#technische-architektur)
6. [Level Design](#level-design)
7. [UI/UX Design](#uiux-design)
8. [Implementierungs-Roadmap](#implementierungs-roadmap)
9. [Testing & Qualitätssicherung](#testing--qualitätssicherung)
10. [Deployment](#deployment)

---

## 🎯 Projekt-Übersicht

### Vision
Ein Retro-Text-Adventure, das Kindern (speziell mit ADHS) spielerisch beibringt, große Aufgaben in kleinere, machbare Schritte zu zerlegen.

### Kern-Mechanik
- **Genre:** Text-Adventure / Interactive Fiction
- **Stil:** 8-Bit Retro, nostalgisch
- **Zielgruppe:** Kinder ab 8 Jahren, besonders mit ADHS
- **Spieldauer:** 20-30 Minuten für MVP

### Unique Selling Points
1. **Pädagogisch wertvoll:** Vermittelt Aufgabenmanagement
2. **Emotional:** Prinzessin retten + positive Message
3. **Retro-Charme:** Text-Adventure meets modernes Web
4. **Inklusiv:** Hilft Kindern mit Konzentrationsschwierigkeiten

---

## 🧠 Pädagogisches Konzept

### Lernziele

#### Hauptziel
Kinder lernen, große, überwältigende Aufgaben in kleine, machbare Schritte zu zerlegen.

#### Sekundäre Lernziele
- **Prioritäten setzen** (Was ist dringend vs. wichtig?)
- **Systematisches Denken** (Einen Plan entwickeln)
- **Sequenzierung** (Richtige Reihenfolge erkennen)
- **Selbstwirksamkeit** (Erfolgserlebnisse sammeln)

### Didaktisches Konzept

#### Scaffolding (Gerüst-Methode)
- **Level 1:** Vollständige Anleitung, Schritt-für-Schritt
- **Level 2-3:** Teilweise Anleitung, mehr Eigenständigkeit
- **Level 4-6:** Selbstständiges Problemlösen

#### Positive Verstärkung
- **Sofort-Feedback:** Nach jeder Aktion
- **Micro-Belohnungen:** OP (Ordnungs-Punkte) für jeden Schritt
- **Fortschritts-Visualisierung:** Sichtbarer Progress
- **Erfolgserlebnisse:** Keine Bestrafung bei Fehlern

#### Transferleistung
Das Spiel endet mit der Erkenntnis: "Diese Technik funktioniert auch im echten Leben!"

---

## 📖 Story & Narrative

### Prolog

```
Es war einmal in einem friedlichen Königreich...

Prinzessin Ordelia herrschte über das Land der Struktur.
Alles hatte seinen Platz, jede Aufgabe ihre Zeit.

Doch dann kam der Chaos-Zauberer Konfusio!
Er entführte die Prinzessin und verfluchte das ganze Schloss.
Überall herrscht nun Unordnung und Durcheinander.

Du bist der junge Held, der die Prinzessin retten muss.
Aber wie besiegst du das Chaos?

Indem du lernst, große Aufgaben in kleine Schritte zu zerlegen!
```

### Charaktere

#### 👸 Prinzessin Ordelia
- **Rolle:** Damsel in Distress (mit Twist am Ende)
- **Persönlichkeit:** Weise, fair, strukturiert
- **Character Arc:** Von "Ordnung ist alles" zu "Balance ist wichtig"

#### 👿 Konfusio (Chaos-Zauberer)
- **Rolle:** Antagonist, später Verbündeter
- **Persönlichkeit:** Chaotisch, aber nicht böse
- **Motivation:** Hasst starre Ordnung, liebt Kreativität
- **Twist:** Am Ende wird er zum Verbündeten

#### 🧚 Fee Struktura
- **Rolle:** Mentor/Guide
- **Funktion:** Tutorial-NPC, gibt Tipps
- **Persönlichkeit:** Geduldig, ermutigend, hilfreich

#### 🧸 Teddybär & andere NPCs
- **Rolle:** Quest-Giver, emotionale Bindung
- **Funktion:** Machen Aufgaben persönlicher

### Story-Twist (Ende)

Nach dem Sieg sagt Prinzessin Ordelia:

```
"Du hast das Chaos besiegt! Aber weißt du was?
Konfusio hatte nicht ganz unrecht.

Zu viel Ordnung macht das Leben langweilig.
Manchmal braucht man Chaos für Kreativität!

Lass uns einen Deal machen, Konfusio:
Du darfst in der KREATIV-WERKSTATT Chaos machen!
Dort brauchen wir wilde Ideen!"
```

**Moral:** Ordnung ist wichtig, aber kontrolliertes Chaos gehört zum Leben. Es geht um **BALANCE**.

---

## 🎮 Game Design

### Command System

#### Kern-Befehle

| Befehl | Synonyme | Funktion |
|--------|----------|----------|
| **schaue** | schau, guck, untersuche, betrachte | Raum/Objekt anschauen |
| **nimm** | nehme, hole, greife, sammle | Item aufnehmen |
| **räume auf** | sortiere, ordne, clean | Aufräumen/Sortieren |
| **hilfe** | help, tipp, hinweis | Tipps bekommen |
| **inventar** | inv, i, tasche | Inventar anzeigen |
| **status** | fortschritt, stats | Fortschritt anzeigen |

#### Flexibles Parsing
- "nimm das schwert" ✅
- "schwert nehmen" ✅
- "hole schwert" ✅
- "nimm alle schwerter" ✅

### Progression System

#### Ordnungs-Punkte (OP)
- **Kleine Aktion:** +5 OP (z.B. ein Item nehmen)
- **Teilaufgabe:** +10-20 OP (z.B. Kategorie sortiert)
- **Level abschließen:** +30-50 OP Bonus

#### Level-Up System
- **Level 2:** "Schnell-Sortieren" (2 Items auf einmal)
- **Level 3:** "Röntgenblick" (versteckte Items sehen)
- **Level 4:** "Zeitlupe" (mehr Zeit bei Zeitdruck)
- **Level 5:** "Organisations-Meister" (automatische Vorschläge)
- **Level 6:** "Chaos-Kontrolle" (Boss-Fight-Ability)

#### Items/Werkzeuge
- 🧹 **Magischer Besen:** Auto-Fegen (nach Level 1)
- 🧤 **Sortier-Handschuhe:** Zeigen Kategorien (nach Level 4)
- 📔 **Organisations-Tagebuch:** Speichert Strategie
- 🧭 **Prioritäts-Kompass:** Zeigt dringendste Aufgabe

### Feedback-Mechanismen

#### Visuell
- ✅ Checkmarks für erledigte Aufgaben
- 📊 Fortschrittsbalken (8-bit Style)
- ⭐ Sterne für perfekte Lösungen
- 🎯 Level-Completion-Screen

#### Audio (Optional für MVP)
- 🔊 "Ding" bei Item-Aufnahme
- 🎵 Triumphmusik bei Level-Complete
- 💥 "Whoosh" bei Transitions

#### Text
- Ermutigende Nachrichten
- "Gut gemacht!", "Weiter so!", "Fast geschafft!"
- Keine negativen Formulierungen

---

## 🏗️ Technische Architektur

### Tech Stack

```
Frontend:
├── Next.js 15.5.7 (App Router)
├── React 19
├── TypeScript 5.x
├── Tailwind CSS
└── ShadcnUI + 8bitcn

State Management:
├── Custom State Machine
├── React Context (für UI State)
└── LocalStorage (für Savegames)

Styling:
├── 8bitcn Gaming Blocks
├── Custom Retro Components
└── Pixel-Font (Press Start 2P)
```

### Projektstruktur

```
chaos-quest/
├── app/
│   ├── page.tsx                 # Main Game Page
│   ├── layout.tsx               # Root Layout
│   └── globals.css              # Global Styles
├── components/
│   ├── game/
│   │   ├── Terminal.tsx         # Retro Terminal Output
│   │   ├── CommandInput.tsx     # Text Input Field
│   │   ├── GameContainer.tsx    # Main Game Wrapper
│   │   └── DialogueBox.tsx      # RPG-Style Dialogue
│   ├── ui/
│   │   ├── ProgressBar.tsx      # 8-bit Progress Bar
│   │   ├── PlayerStats.tsx      # Stats Display
│   │   ├── MissionTracker.tsx   # Task List
│   │   └── MainMenu.tsx         # Start Menu
│   └── layout/
│       ├── GameLayout.tsx       # Game Screen Layout
│       └── LevelIntro.tsx       # Level Introduction Screen
├── lib/
│   ├── game-engine/
│   │   ├── types.ts             # TypeScript Definitions
│   │   ├── game-engine.ts       # State Machine Core
│   │   ├── command-parser.ts    # Natural Language Parser
│   │   └── game-state.ts        # State Management
│   ├── levels/
│   │   ├── level1.ts            # Level 1: Eingangshalle
│   │   ├── level2.ts            # Level 2: Thronsaal
│   │   ├── level3.ts            # Level 3: Küche
│   │   ├── level4.ts            # Level 4: Kinderzimmer
│   │   ├── level5.ts            # Level 5: Bibliothek
│   │   └── level6.ts            # Level 6: Boss Level
│   └── utils/
│       ├── save-game.ts         # Save/Load Logic
│       ├── analytics.ts         # Progress Tracking
│       └── sound.ts             # Sound Effects (optional)
└── public/
    ├── fonts/
    │   └── PressStart2P.woff2   # Pixel Font
    └── sounds/ (optional)
        ├── pickup.mp3
        ├── complete.mp3
        └── victory.mp3
```

### State Machine Architektur

#### Core Components

```typescript
GameEngine
├── State Management
│   ├── GameState (current state)
│   ├── History (undo/replay)
│   └── Flags & Counters
├── Node System
│   ├── GameNode (story points)
│   ├── Transitions (node connections)
│   └── Conditions (requirements)
├── Command Processing
│   ├── CommandParser (NLP)
│   ├── Validation (allowed commands)
│   └── Execution (effects)
└── Response Generation
    ├── Success Responses
    ├── Error Handling
    └── Suggestions
```

#### Data Flow

```
User Input
    ↓
CommandParser.parse()
    ↓
Command Object
    ↓
GameEngine.processCommand()
    ↓
1. Find Matching Transition
2. Check Conditions
3. Apply Effects
4. Change Node
5. Execute onEnter Hook
    ↓
GameResponse
    ↓
UI Update
```

### Key Interfaces

```typescript
// Siehe types.ts für vollständige Definitionen
- GameState: Kompletter Spielzustand
- GameNode: Story-Punkt mit Transitions
- Command: Geparster Spieler-Befehl
- Transition: Übergang zwischen Nodes
- Effect: Zustandsänderung (OP, Items, Flags)
- Condition: Anforderung für Transition
```

---

## 🎯 Level Design

### Level-Übersicht

| Level | Name | Thema | Schwierigkeit | OP-Ziel |
|-------|------|-------|---------------|---------|
| 1 | Eingangshalle | Aufgaben zerlegen | Tutorial | 100 |
| 2 | Thronsaal | Kategorisieren | Leicht | 150 |
| 3 | Küche | Prioritäten setzen | Mittel | 200 |
| 4 | Kinderzimmer | Sicherheit zuerst | Mittel | 250 |
| 5 | Bibliothek | Systeme entwickeln | Schwer | 300 |
| 6 | Labor (Boss) | Alles kombinieren | Boss | 400 |

### Level 1: Die Eingangshalle (Tutorial)

#### Lernziel
Grundlagen der Aufgabenteilung verstehen

#### Setting
Große Halle mit Ritterrüstungen, Waffen, Fahnen

#### Aufgaben-Struktur
```
GROSSE AUFGABE: Halle aufräumen
    ├── Schwerter aufräumen (3 Stück)
    │   ├── 1. Schwert nehmen
    │   ├── 2. Schwert nehmen
    │   ├── 3. Schwert nehmen
    │   └── Alle in Waffenkammer bringen
    ├── Rüstungen aufstellen (3 Stück)
    │   └── Eine nach der anderen (schwer!)
    └── Fahnen sortieren
        ├── Erst blaue Fahnen
        └── Dann rote Fahnen
```

#### Tutorial-Flow
1. **Überwältigung zeigen:** "So viel Chaos!"
2. **Fee einführen:** Mentor erscheint
3. **Erste Teilaufgabe:** "Beginne mit den Schwertern"
4. **Schritt-für-Schritt:** Jedes Schwert einzeln
5. **Erfolg feiern:** "Siehst du? Machbar!"
6. **Wiederholen:** Bei Rüstungen und Fahnen
7. **Reflexion:** "Diese Methode funktioniert immer!"

#### Key Nodes
- `L1_INTRO`: Level-Einführung
- `L1_FEE_GREETING`: Tutorial-Start
- `L1_DECISION`: Haupt-Entscheidungspunkt
- `L1_PROGRESS`: Nach jeder Teilaufgabe
- `L1_COMPLETE`: Level abgeschlossen

### Level 2: Der Thronsaal

#### Lernziel
Kategorisieren und Sortieren

#### Setting
Thron unter Bergen von Papier begraben

#### Neue Mechanik
**Kategorien erkennen:** Welche Dinge gehören zusammen?

#### Aufgaben
1. Schriftrollen nach Thema sortieren
   - Gesetze
   - Geschichte
   - Magie
2. Bücher alphabetisch einordnen
3. Alte Dokumente entsorgen
4. Thron freilegen

#### Belohnung
🗺️ Schatzkarte (Hinweis auf Boss-Level)

### Level 3: Die Küche

#### Lernziel
**PRIORITÄTEN SETZEN** - Was ist dringend?

#### Setting
Chaotische Küche, etwas brennt im Ofen!

#### Besonderheit
⚠️ **ZEITKRITISCH!** Spieler muss schnell handeln

#### Richtige Reihenfolge
1. **ERST:** Ofen ausschalten (sonst Feuer!)
2. Verdorbenes Essen entsorgen
3. Geschirr abspülen
4. Geschirr einräumen
5. Boden wischen

#### Falsche Entscheidungen
- Erst Geschirr spülen → Feuer wird größer!
- Zu lange zögern → Game Over (Rauchvergiftung)

#### Lerneffekt
Manche Aufgaben haben **Priorität** und können nicht warten!

### Level 4: Das Kinderzimmer

#### Lernziel
Sicherheit und Gefahren erkennen

#### Setting
Spielzimmer mit Lego auf Boden, offenen Stiften, etc.

#### Neue Elemente
- 🧸 **Sprechender Teddybär** (Quest-NPC)
- **Mehrere parallele Aufgaben**

#### Gefahren-System
- Lego auf Boden = Stolpergefahr
- Offene Stifte = Trocknen aus
- Puzzle-Teile vermischt = Verloren

#### Aufgaben-Reihenfolge
1. Gefährliches zuerst (Lego)
2. Zeitkritisches dann (Stifte)
3. Rest nach Belieben

### Level 5: Die Bibliothek

#### Lernziel
**SYSTEME ENTWICKELN** für große Mengen

#### Setting
Tausende Bücher durcheinander

#### Überwältigung
"Das ist zu viel! Unmöglich!"

#### Lösung
**Einen PLAN erstellen:**
```
1. Fliegende Bücher fangen (Gefahr zuerst)
2. Nach Größe vorsortieren
3. Nach Thema gruppieren
4. Alphabetisch feinordnen
```

#### Meta-Lerneffekt
Bei SEHR großen Aufgaben brauchst du **erst einen Plan**, dann Schritt-für-Schritt!

### Level 6: Boss Level - Konfusios Labor

#### Lernziel
Alles kombinieren unter Zeitdruck

#### Setting
Magisches Labor, absichtliches Chaos

#### Boss-Mechanik
- ⏱️ **Timer läuft** (60 Sekunden)
- 👿 **Konfusio stört** (wirft neue Hindernisse)
- 💥 **Fehler kosten OP** (Explosionen)

#### Herausforderungen
1. **Gefährliche Tränke sichern** (Priorität!)
2. **Magische Artefakte neutralisieren**
3. **Zauberbücher bannen**
4. **Käfig der Prinzessin finden**

#### Boss-Fight-Ablauf
```
Phase 1: Gefahren beseitigen (Tränke)
Phase 2: Störfaktoren entfernen (Artefakte)
Phase 3: Zugang freikämpfen (Bücher)
Phase 4: Prinzessin befreien (Käfig)
```

#### Sieg-Bedingungen
- Alle 4 Phasen abgeschlossen
- Mindestens 50 OP übrig
- Prinzessin befreit

---

## 🎨 UI/UX Design

### 8bitcn Blocks Integration

#### Verwendete Blocks

##### 1. Game Main Menu (Startbildschirm)
```
┌─────────────────────────────┐
│      CHAOS QUEST            │
│   Die Rettung der Ordnung   │
├─────────────────────────────┤
│   [▶] NEUES SPIEL           │
│   [💾] SPIEL LADEN          │
│   [❓] ANLEITUNG             │
│   [⚙️] EINSTELLUNGEN         │
└─────────────────────────────┘
```

##### 2. Level Introduction
```
┌─────────────────────────────┐
│     LEVEL 1                 │
│  DIE EINGANGSHALLE          │
├─────────────────────────────┤
│  [Hintergrund-Bild]         │
│                             │
│  Lernziel:                  │
│  Aufgaben zerlegen          │
│                             │
│  [ENTER] Beginnen           │
└─────────────────────────────┘
```

##### 3. RPG Dialogue Box (Hauptspiel)
```
┌─────────────────────────────────────────┐
│ 🧚 Fee Struktura                        │
├─────────────────────────────────────────┤
│ "Willkommen, tapferer Held!            │
│  Um die Prinzessin zu retten,          │
│  musst du das Chaos besiegen..."       │
└─────────────────────────────────────────┘
│ > nimm schwert_                         │
└─────────────────────────────────────────┘
```

##### 4. Player Stats Display
```
┌──────────────────────┐
│  👤 HELD             │
├──────────────────────┤
│  ⭐ OP: 125/400      │
│  📊 Level: 3         │
│  📦 Items: 5         │
│  ✅ Aufgaben: 8/15   │
└──────────────────────┘
```

##### 5. Mission Tracking
```
┌─────────────────────┐
│  📋 AUFGABEN        │
├─────────────────────┤
│  ✅ Schwerter       │
│  ✅ Rüstungen       │
│  ⏳ Fahnen          │
│  ❌ Boden fegen     │
└─────────────────────┘
```

##### 6. Bar Chart (Fortschritt)
```
┌────────────────────┐
│  FORTSCHRITT       │
├────────────────────┤
│  ████████░░  80%   │
└────────────────────┘
```

### Layout-Konzept

#### Desktop Layout (>768px)
```
┌─────────────────────────────────────────────────┐
│  STATS          │  MAIN GAME AREA   │  MISSIONS │
│  ┌───────────┐  │  ┌──────────────┐ │ ┌───────┐│
│  │ OP: 125   │  │  │ Dialogue Box │ │ │ Tasks ││
│  │ Level: 3  │  │  │              │ │ │       ││
│  │ Items: 5  │  │  └──────────────┘ │ │  ✅   ││
│  └───────────┘  │  ┌──────────────┐ │ │  ⏳   ││
│                 │  │ Terminal     │ │ │  ❌   ││
│                 │  │ Output       │ │ └───────┘│
│                 │  │              │ │          │
│                 │  └──────────────┘ │          │
│                 │  ┌──────────────┐ │          │
│                 │  │ > Input___   │ │          │
│                 │  └──────────────┘ │          │
└─────────────────────────────────────────────────┘
```

#### Mobile Layout (<768px)
```
┌───────────────────┐
│  STATS & PROGRESS │
│  OP: 125 | Lvl: 3 │
├───────────────────┤
│                   │
│  DIALOGUE BOX     │
│                   │
├───────────────────┤
│  TERMINAL OUTPUT  │
│                   │
├───────────────────┤
│  > Input___       │
├───────────────────┤
│  [TASKS] [HELP]   │
└───────────────────┘
```

### Color Scheme (8-bit)

```css
:root {
  --bg-dark: #1a1a2e;        /* Dunkler Hintergrund */
  --bg-medium: #16213e;      /* Terminal Hintergrund */
  --accent-primary: #0f3460; /* Blau */
  --accent-success: #53a653; /* Grün für Erfolg */
  --accent-danger: #e94560;  /* Rot für Gefahr */
  --text-primary: #e9ecef;   /* Heller Text */
  --text-secondary: #adb5bd; /* Gedämpfter Text */
  --border: #4a5568;         /* Rahmen */
  
  /* 8-bit Pixel-Schatten */
  --pixel-shadow: 
    2px 0 0 var(--border),
    0 2px 0 var(--border),
    -2px 0 0 var(--border),
    0 -2px 0 var(--border);
}
```

### Typography

```css
/* Haupt-Font: Pixel-Style */
@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

.game-text {
  font-family: 'Press Start 2P', monospace;
  font-size: 12px;
  line-height: 1.6;
  letter-spacing: 0.05em;
}

/* Terminal-Font: Monospace */
.terminal-text {
  font-family: 'Courier New', monospace;
  font-size: 14px;
  color: var(--text-primary);
}
```

### Animationen

#### Typing Effect (Terminal)
```css
@keyframes typing {
  from { width: 0; }
  to { width: 100%; }
}

.typing-effect {
  overflow: hidden;
  white-space: nowrap;
  animation: typing 1.5s steps(40);
}
```

#### Pixel Blink (Cursor)
```css
@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}

.cursor {
  animation: blink 1s infinite;
}
```

#### Success Shake
```css
@keyframes success-shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-4px); }
  75% { transform: translateX(4px); }
}
```

---

## 🚀 Implementierungs-Roadmap

### Phase 1: Foundation (3-4 Stunden)

#### 1.1 Projekt-Setup
- [x] Next.js Projekt initialisieren
- [ ] Tailwind & ShadcnUI konfigurieren
- [ ] 8bitcn Blocks integrieren
- [ ] TypeScript streng konfigurieren
- [ ] Ordnerstruktur aufsetzen

**Zeit:** 30 Min

#### 1.2 Core State Machine
- [x] `types.ts` implementieren
- [x] `game-engine.ts` implementieren
- [x] `command-parser.ts` implementieren
- [ ] Unit Tests für State Machine

**Zeit:** 1 Stunde (bereits erledigt ✅)

#### 1.3 Level 1 Content
- [x] Level 1 Node-Definitions
- [ ] Alle Transitions definieren
- [ ] NPC-Dialoge schreiben
- [ ] Testing im Terminal

**Zeit:** 1 Stunde

#### 1.4 Basic UI Components
- [ ] `Terminal.tsx` - Text-Output
- [ ] `CommandInput.tsx` - Input-Feld
- [ ] `GameContainer.tsx` - Wrapper
- [ ] Basic Styling mit 8bitcn

**Zeit:** 1.5 Stunden

### Phase 2: MVP (4-5 Stunden)

#### 2.1 Komplettes Level 1
- [ ] Alle Teilaufgaben implementieren
- [ ] Fehlerbehandlung
- [ ] Hilfe-System
- [ ] Level-Complete Screen

**Zeit:** 2 Stunden

#### 2.2 UI Polish
- [ ] Player Stats Component
- [ ] Mission Tracker Component
- [ ] Progress Bar
- [ ] Responsive Layout

**Zeit:** 1.5 Stunden

#### 2.3 Level 2 & 3 (Vereinfacht)
- [ ] Level 2: Thronsaal (vereinfacht)
- [ ] Level 3: Küche (Zeitdruck-Mechanik)
- [ ] Transitions zwischen Levels

**Zeit:** 1.5 Stunden

#### 2.4 Save/Load System
- [ ] LocalStorage Integration
- [ ] Save-Button
- [ ] Load-Button
- [ ] Auto-Save

**Zeit:** 30 Min

### Phase 3: Enhancement (Optional, 2-3 Stunden)

#### 3.1 Level 4-6 (wenn Zeit)
- [ ] Level 4: Kinderzimmer
- [ ] Level 5: Bibliothek
- [ ] Level 6: Boss Level

**Zeit:** 2 Stunden

#### 3.2 Audio (Optional)
- [ ] Sound Effects
- [ ] Background Music
- [ ] Mute-Button

**Zeit:** 1 Stunde

#### 3.3 Animations
- [ ] Typing Effect
- [ ] Success Animations
- [ ] Transition Effects

**Zeit:** 1 Stunde

### Phase 4: Testing & Deployment (1 Stunde)

#### 4.1 Testing
- [ ] Gameplay Testing
- [ ] Browser Testing
- [ ] Mobile Testing
- [ ] Bug Fixes

**Zeit:** 30 Min

#### 4.2 Deployment
- [ ] Vercel Deployment
- [ ] Environment Variables
- [ ] Performance Check
- [ ] Final QA

**Zeit:** 30 Min

### Gesamt-Timeline

| Phase | Dauer | Status |
|-------|-------|--------|
| Phase 1: Foundation | 3-4h | 🟡 In Progress |
| Phase 2: MVP | 4-5h | ⏳ Pending |
| Phase 3: Enhancement | 2-3h | ⏳ Optional |
| Phase 4: Deploy | 1h | ⏳ Pending |
| **TOTAL** | **10-13h** | - |

**Realistisches MVP:** 8-10 Stunden mit Level 1-3

---

## 🧪 Testing & Qualitätssicherung

### Unit Tests

#### State Machine Tests
```typescript
describe('GameEngine', () => {
  test('processes valid command', () => {
    const engine = new GameEngine(initialState, nodes, config);
    const command = { type: 'nimm', target: 'schwert', raw: 'nimm schwert' };
    const response = engine.processCommand(command);
    
    expect(response.success).toBe(true);
    expect(response.opGained).toBe(5);
  });
  
  test('rejects invalid command', () => {
    // ...
  });
  
  test('checks conditions correctly', () => {
    // ...
  });
});
```

#### Parser Tests
```typescript
describe('CommandParser', () => {
  test('parses simple command', () => {
    const parser = new CommandParser();
    const result = parser.parse('nimm schwert');
    
    expect(result.success).toBe(true);
    expect(result.command?.type).toBe('nimm');
    expect(result.command?.target).toBe('schwert');
  });
  
  test('handles synonyms', () => {
    // ...
  });
});
```

### Integration Tests

#### Gameplay Flow Tests
- Vollständiges Level 1 durchspielen
- Alle Commands testen
- Fehlerszenarien durchgehen

### Manual Testing Checklist

#### Funktional
- [ ] Alle Commands funktionieren
- [ ] State wird korrekt aktualisiert
- [ ] Transitions sind logisch
- [ ] Save/Load funktioniert
- [ ] Hilfe-System ist hilfreich

#### UX
- [ ] Text ist lesbar
- [ ] Input ist responsiv
- [ ] Feedback ist klar
- [ ] Fehler sind verständlich
- [ ] Navigation ist intuitiv

#### Performance
- [ ] Keine Lags beim Tippen
- [ ] Schnelle Responses
- [ ] Smooth Animations
- [ ] Mobile-freundlich

#### Pädagogisch
- [ ] Lernziele werden erreicht
- [ ] Feedback ist positiv
- [ ] Schwierigkeit ist angemessen
- [ ] Spaß-Faktor ist gegeben

---

## 🌐 Deployment

### Vercel Deployment

#### 1. Repository Setup
```bash
git init
git add .
git commit -m "Initial commit: Chaos Quest MVP"
git remote add origin [your-repo-url]
git push -u origin main
```

#### 2. Vercel Configuration
```json
// vercel.json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "framework": "nextjs",
  "installCommand": "npm install"
}
```

#### 3. Environment Variables
```
NEXT_PUBLIC_GAME_VERSION=1.0.0
NEXT_PUBLIC_ANALYTICS_ID=xxx (optional)
```

#### 4. Deploy
```bash
vercel --prod
```

### Performance Optimierung

#### Next.js Optimizations
- Server Components wo möglich
- Dynamic Imports für heavy components
- Image Optimization
- Font Optimization

#### Caching Strategy
- Static Assets: Cache-Control headers
- Game State: LocalStorage
- Fonts: Preload

---

## 📚 Anhang

### Glossar

- **OP:** Ordnungs-Punkte (Währung im Spiel)
- **Node:** Story-Punkt im Flowchart
- **Transition:** Übergang zwischen Nodes
- **Effect:** Zustandsänderung (Items, Flags, etc.)
- **NPC:** Non-Player Character (Fee, Teddy, etc.)

### Referenzen

#### Technisch
- [Next.js Docs](https://nextjs.org/docs)
- [8bitcn Blocks](https://www.8bitcn.com/docs/blocks)
- [ShadcnUI](https://ui.shadcn.com/)

#### Game Design
- [Interactive Fiction Best Practices](https://www.ifwiki.org/)
- [Text Adventure Design](https://www.ifarchive.org/)

#### Pädagogisch
- ADHS-freundliches Design
- Task-Breakdown Methodik
- Positive Reinforcement

### Credits

```
🎮 CHAOS QUEST
   Die Rettung der Ordnung

Konzept & Design: [Dein Name]
Entwicklung: Next.js, TypeScript, 8bitcn
Für: Mini-Hackathlon "Unordnung"

Mit ❤️ für Kinder mit ADHS
```

---

## 🎯 Nächste Schritte

### Sofort-Aktionen
1. ✅ Types definiert
2. ✅ State Machine implementiert
3. ✅ Level 1 grob designed
4. ⏳ Next.js Projekt setup
5. ⏳ Erste UI Components

### Diese Woche
- [ ] MVP mit Level 1-3 fertigstellen
- [ ] Basic UI implementieren
- [ ] Testing & Bug-Fixing
- [ ] Deployment auf Vercel

### Nice-to-Have
- [ ] Level 4-6 komplettieren
- [ ] Sound Effects
- [ ] Animations
- [ ] Analytics/Tracking
- [ ] Multiplayer-Modus? 😄

---

**Stand:** Aktuell  
**Version:** 1.0 (Master Plan)  
**Nächstes Update:** Nach Phase 1 Completion

---

*"Große Aufgaben in kleine Schritte zerlegen - das ist der Weg!"*  
— Fee Struktura 🧚
