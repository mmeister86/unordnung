# 🎮 CHAOS QUEST - Die Rettung der Ordnung

Ein Retro-Text-Adventure, das Kindern spielerisch beibringt, große Aufgaben in kleinere, machbare Schritte zu zerlegen.

![Version](https://img.shields.io/badge/version-0.1.0-blue)
![Next.js](https://img.shields.io/badge/Next.js-15.5.7-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)
![License](https://img.shields.io/badge/license-MIT-green)

---

## 📋 Inhaltsverzeichnis

- [Über das Projekt](#über-das-projekt)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation & Setup](#installation--setup)
- [Spielstart](#spielstart)
- [Spielmechanik](#spielmechanik)
- [Level-Übersicht](#level-übersicht)
- [Projektstruktur](#projektstruktur)
- [Entwicklung](#entwicklung)
- [Deployment](#deployment)
- [Mitwirken](#mitwirken)
- [Lizenz](#lizenz)

---

## 🎯 Über das Projekt

### Vision

**Chaos Quest** ist ein pädagogisches Text-Adventure im Retro-Stil, das speziell für Kinder ab 8 Jahren entwickelt wurde. Das Spiel vermittelt spielerisch wichtige Fähigkeiten im Aufgabenmanagement, insbesondere für Kinder mit ADHS oder Konzentrationsschwierigkeiten.

### Die Geschichte

Prinzessin Ordelia wurde vom Chaos-Zauberer Konfusio entführt! Das gesamte Schloss ist von Unordnung befallen. Als tapferer Held musst du die Prinzessin retten, indem du lernst, große, überwältigende Aufgaben in kleine, machbare Schritte zu zerlegen.

### Kern-Lernziele

- ✅ **Aufgaben zerlegen:** Große Aufgaben in kleine Schritte aufteilen
- ✅ **Prioritäten setzen:** Wichtiges von Dringendem unterscheiden
- ✅ **Systematisches Denken:** Einen Plan entwickeln und umsetzen
- ✅ **Sequenzierung:** Die richtige Reihenfolge erkennen
- ✅ **Selbstwirksamkeit:** Erfolgserlebnisse sammeln

### Pädagogisches Konzept

Das Spiel verwendet die **Scaffolding-Methode** (Gerüst-Methode):
- **Level 1:** Vollständige Anleitung, Schritt-für-Schritt
- **Level 2-3:** Teilweise Anleitung, mehr Eigenständigkeit
- **Level 4-6:** Selbstständiges Problemlösen

Durch **positive Verstärkung** und **sofortiges Feedback** werden Erfolgserlebnisse geschaffen, ohne Bestrafung bei Fehlern.

---

## ✨ Features

### 🎮 Spielmechanik

- **Text-Adventure:** Klassisches Text-Adventure mit modernem Web-Interface
- **Flexibles Command-System:** Natürliche Sprache verstehen (z.B. "nimm schwert", "schwert nehmen", "hole schwert")
- **Progression-System:** Ordnungs-Punkte (OP) sammeln und Level aufsteigen
- **Inventar-System:** Items sammeln und verwenden
- **Mission-Tracking:** Übersicht über aktuelle Aufgaben
- **Save/Load:** Spielstand speichern und laden

### 🎨 Design

- **8-Bit Retro-Ästhetik:** Nostalgisches Pixel-Design
- **Responsive Layout:** Funktioniert auf Desktop und Mobile
- **Accessible:** Barrierefreies Design für alle Spieler
- **Moderne UI:** ShadcnUI + 8bitcn Gaming Blocks

### 📚 Content

- **6 Level:** Von Tutorial bis Boss-Fight
- **Verschiedene Mechaniken:** Jedes Level lehrt neue Fähigkeiten
- **NPCs:** Interaktive Charaktere (Fee Struktura, Teddybär, etc.)
- **Story-Twist:** Überraschendes Ende mit wichtiger Botschaft

---

## 🛠️ Tech Stack

### Frontend

- **Next.js 15.5.7** - React Framework mit App Router
- **React 19** - UI Library
- **TypeScript 5.x** - Type Safety
- **Tailwind CSS 4** - Utility-First CSS Framework
- **ShadcnUI** - UI Component Library
- **8bitcn** - Retro Gaming UI Blocks

### State Management

- **Custom State Machine** - Game Engine Core
- **React Context** - UI State Management
- **LocalStorage** - Save/Load System

### Fonts & Assets

- **Press Start 2P** - Pixel Font
- **Custom 8-bit Sprites** - Retro Assets

---

## 🚀 Installation & Setup

### Voraussetzungen

- **Node.js** 20.x oder höher
- **pnpm** (empfohlen) oder npm/yarn/bun

### Installation

1. **Repository klonen:**
```bash
git clone https://github.com/dein-username/unordnung.git
cd unordnung
```

2. **Dependencies installieren:**
```bash
pnpm install
```

3. **Entwicklungsserver starten:**
```bash
pnpm dev
```

4. **Im Browser öffnen:**
```
http://localhost:3000
```

### Build für Production

```bash
pnpm build
pnpm start
```

---

## 🎮 Spielstart

### Erste Schritte

1. Starte den Entwicklungsserver mit `pnpm dev`
2. Öffne `http://localhost:3000` im Browser
3. Klicke auf **"NEUES SPIEL"** im Hauptmenü
4. Folge der Einführung durch Fee Struktura
5. Beginne mit Level 1: Die Eingangshalle

### Grundlegende Commands

| Befehl | Synonyme | Beschreibung |
|--------|----------|--------------|
| `schaue` | schau, guck, untersuche, betrachte | Raum oder Objekt anschauen |
| `nimm` | nehme, hole, greife, sammle | Item aufnehmen |
| `räume auf` | sortiere, ordne, clean | Aufräumen/Sortieren |
| `hilfe` | help, tipp, hinweis | Tipps bekommen |
| `inventar` | inv, i, tasche | Inventar anzeigen |
| `status` | fortschritt, stats | Fortschritt anzeigen |

### Beispiel-Interaktionen

```
> schaue umher
Du stehst in einer großen Eingangshalle. Überall liegen Schwerter, Rüstungen und Fahnen herum.

> nimm schwert
Du nimmst das Schwert auf. [+5 OP]

> räume schwerter auf
Du bringst alle Schwerter in die Waffenkammer. Gut gemacht! [+20 OP]
```

---

## 🎯 Spielmechanik

### Ordnungs-Punkte (OP)

OP sind die Währung im Spiel. Du sammelst sie durch:
- **Kleine Aktionen:** +5 OP (z.B. ein Item nehmen)
- **Teilaufgaben:** +10-20 OP (z.B. Kategorie sortiert)
- **Level abschließen:** +30-50 OP Bonus

### Level-Up System

- **Level 2:** "Schnell-Sortieren" (2 Items auf einmal)
- **Level 3:** "Röntgenblick" (versteckte Items sehen)
- **Level 4:** "Zeitlupe" (mehr Zeit bei Zeitdruck)
- **Level 5:** "Organisations-Meister" (automatische Vorschläge)
- **Level 6:** "Chaos-Kontrolle" (Boss-Fight-Ability)

### Items & Werkzeuge

- 🧹 **Magischer Besen:** Auto-Fegen (nach Level 1)
- 🧤 **Sortier-Handschuhe:** Zeigen Kategorien (nach Level 4)
- 📔 **Organisations-Tagebuch:** Speichert Strategie
- 🧭 **Prioritäts-Kompass:** Zeigt dringendste Aufgabe

---

## 🏰 Level-Übersicht

### Level 1: Die Eingangshalle (Tutorial)
**Lernziel:** Aufgaben zerlegen  
**Schwierigkeit:** Tutorial  
**OP-Ziel:** 100

Große Halle mit Ritterrüstungen, Waffen und Fahnen. Hier lernst du die Grundlagen der Aufgabenteilung.

### Level 2: Der Thronsaal
**Lernziel:** Kategorisieren  
**Schwierigkeit:** Leicht  
**OP-Ziel:** 150

Thron unter Bergen von Papier begraben. Lerne, Dinge nach Kategorien zu sortieren.

### Level 3: Die Küche
**Lernziel:** Prioritäten setzen  
**Schwierigkeit:** Mittel  
**OP-Ziel:** 200

⚠️ **ZEITKRITISCH!** Etwas brennt im Ofen - du musst schnell handeln!

### Level 4: Das Kinderzimmer
**Lernziel:** Sicherheit zuerst  
**Schwierigkeit:** Mittel  
**OP-Ziel:** 250

Sprechender Teddybär braucht Hilfe. Erkenne Gefahren und handle entsprechend.

### Level 5: Die Bibliothek
**Lernziel:** Systeme entwickeln  
**Schwierigkeit:** Schwer  
**OP-Ziel:** 300

Tausende Bücher durcheinander. Entwickle einen Plan, bevor du beginnst!

### Level 6: Konfusios Labor (Boss)
**Lernziel:** Alles kombinieren  
**Schwierigkeit:** Boss  
**OP-Ziel:** 400

⏱️ **Timer läuft!** Konfusio stört dich. Kombiniere alle gelernten Fähigkeiten!

---

## 📁 Projektstruktur

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
│   │   ├── game-engine.ts       # State Machine Core
│   │   ├── command-parser.ts    # Natural Language Parser
│   │   └── utils.ts             # Helper Functions
│   ├── levels/
│   │   └── level1.ts            # Level Definitions
│   └── mock-data/
│       └── level1.ts            # Level 1 Content
├── types/
│   └── game.ts                  # TypeScript Definitions
├── public/
│   └── images/                  # Game Assets
└── docs/
    └── masterplan.md            # Complete Game Design Doc
```

---

## 💻 Entwicklung

### Verfügbare Scripts

```bash
# Entwicklungsserver starten
pnpm dev

# Production Build erstellen
pnpm build

# Production Server starten
pnpm start

# Linting
pnpm lint
```

### Code-Struktur

#### Game Engine

Die Game Engine basiert auf einer **State Machine**:
- **Nodes:** Story-Punkte im Flowchart
- **Transitions:** Übergänge zwischen Nodes
- **Conditions:** Anforderungen für Transitions
- **Effects:** Zustandsänderungen (OP, Items, Flags)

#### Command Parser

Der Command Parser versteht natürliche Sprache:
- Flexibles Parsing (z.B. "nimm schwert" = "schwert nehmen")
- Synonym-Erkennung
- Fehlerbehandlung mit Vorschlägen

### Entwicklungshinweise

- **TypeScript:** Alle Dateien sind typisiert
- **Components:** React Server Components wo möglich
- **Styling:** Tailwind CSS mit Custom 8-bit Styles
- **State:** Game State wird im GameEngine verwaltet

---

## 🌐 Deployment

### Vercel (Empfohlen)

1. **Repository zu GitHub pushen:**
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. **Vercel Projekt erstellen:**
   - Gehe zu [vercel.com](https://vercel.com)
   - Importiere das GitHub Repository
   - Vercel erkennt Next.js automatisch

3. **Deployment:**
   - Automatisches Deployment bei jedem Push
   - Preview-Deployments für Pull Requests

### Environment Variables

Keine erforderlich für MVP. Optional:
```
NEXT_PUBLIC_GAME_VERSION=1.0.0
```

### Performance

- ✅ Server Components für bessere Performance
- ✅ Image Optimization durch Next.js
- ✅ Font Optimization mit `next/font`
- ✅ Static Assets werden gecacht

---

## 🤝 Mitwirken

Beiträge sind willkommen! Bitte:

1. Fork das Repository
2. Erstelle einen Feature-Branch (`git checkout -b feature/AmazingFeature`)
3. Committe deine Änderungen (`git commit -m 'Add some AmazingFeature'`)
4. Push zum Branch (`git push origin feature/AmazingFeature`)
5. Öffne einen Pull Request

### Entwicklungsprioritäten

- ✅ Core Game Engine
- ✅ Level 1 (Tutorial)
- 🚧 Level 2-3 (MVP)
- ⏳ Level 4-6 (Enhancement)
- ⏳ Sound Effects (Optional)
- ⏳ Animations (Optional)

---

## 📚 Dokumentation

### Weitere Dokumentation

- **[Masterplan](docs/masterplan.md)** - Vollständiges Game Design Dokument
- **[Level Design](docs/complete-level-design.md)** - Detaillierte Level-Beschreibungen
- **[UI Implementation Plan](docs/ui-implementation-plan.md)** - UI/UX Design Spezifikationen

### Externe Ressourcen

- [Next.js Dokumentation](https://nextjs.org/docs)
- [8bitcn Blocks](https://www.8bitcn.com/docs/blocks)
- [ShadcnUI](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/docs)

---

## 🎓 Pädagogischer Hintergrund

### Zielgruppe

- **Alter:** 8-12 Jahre
- **Besonders geeignet für:** Kinder mit ADHS oder Konzentrationsschwierigkeiten
- **Spieldauer:** 20-30 Minuten (MVP)

### Lernziele

1. **Aufgabenmanagement:** Große Aufgaben in Schritte zerlegen
2. **Priorisierung:** Wichtiges von Dringendem unterscheiden
3. **Systematisches Denken:** Pläne entwickeln und umsetzen
4. **Selbstwirksamkeit:** Erfolgserlebnisse sammeln

### Didaktisches Konzept

- **Scaffolding:** Unterstützung wird schrittweise reduziert
- **Positive Verstärkung:** Keine Bestrafung, nur Ermutigung
- **Sofortiges Feedback:** Jede Aktion gibt Feedback
- **Transferleistung:** Techniken sind im echten Leben anwendbar

---

## 📝 Lizenz

Dieses Projekt ist unter der MIT-Lizenz lizenziert. Siehe `LICENSE` Datei für Details.

---

## 🙏 Credits

### Entwicklung

- **Konzept & Design:** Basierend auf Mini-Hackathlon "Unordnung"
- **Entwicklung:** Next.js, TypeScript, 8bitcn
- **Inspiration:** Klassische Text-Adventures + Moderne Web-Technologie

### Assets & Ressourcen

- **Font:** Press Start 2P (Google Fonts)
- **UI Components:** ShadcnUI + 8bitcn
- **Icons:** Lucide React

### Besonderer Dank

Mit ❤️ entwickelt für Kinder mit ADHS und alle, die lernen möchten, Aufgaben besser zu managen.

---

## 📞 Kontakt & Support

- **Issues:** [GitHub Issues](https://github.com/dein-username/unordnung/issues)
- **Discussions:** [GitHub Discussions](https://github.com/dein-username/unordnung/discussions)

---

## 🎯 Roadmap

### MVP (Aktuell)
- [x] Game Engine Core
- [x] Command Parser
- [x] Level 1 (Tutorial)
- [ ] Level 2-3
- [ ] Basic UI Components
- [ ] Save/Load System

### Enhancement (Geplant)
- [ ] Level 4-6
- [ ] Sound Effects
- [ ] Animations
- [ ] Mobile Optimierung
- [ ] Analytics/Tracking

### Zukunftsideen
- [ ] Multiplayer-Modus
- [ ] Level-Editor
- [ ] Mehrsprachigkeit
- [ ] Accessibility-Features

---

**"Große Aufgaben in kleine Schritte zerlegen - das ist der Weg!"**  
— Fee Struktura 🧚

---

*Stand: 2024 | Version: 0.1.0 | Status: In Entwicklung*
