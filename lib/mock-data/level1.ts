import { LevelData } from "@/types/game";

// Initial level data with all tasks set to "pending"
const createInitialLevel1Data = (): LevelData => ({
    id: 1,
    title: "Die Eingangshalle",
    backgroundImage: "/images/schloss.jpeg",
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
        { id: "armor", name: "Rüstung", description: "Eine verbeulte Ritterrüstung." },
        { id: "flag", name: "Fahne", description: "Eine verstaubte Burghof-Fahne." },
    ],
    nodes: {
        // L1_INTRO - Level-Einführung
        start: {
            id: "start",
            type: "story",
            npc: { name: "Erzähler", image: "/images/erzähler.jpeg", mood: "neutral" },
            text: `Es war einmal in einem friedlichen Königreich...

Prinzessin Ordelia herrschte über das Land der Struktur.
Alles hatte seinen Platz, jede Aufgabe ihre Zeit.

Doch dann kam der Chaos-Zauberer Konfusio!
Er entführte die Prinzessin und verfluchte das Schloss.

Überall herrscht nun Unordnung und Durcheinander.

Du bist der junge Held, der die Prinzessin retten muss.
Aber wie besiegst du das Chaos?

Indem du lernst, große Aufgaben in kleine Schritte zu zerlegen!

🚪 Du stehst vor der Eingangshalle des Schlosses...`,
            transitions: [
                {
                    command: ["betrete halle", "gehe hinein", "öffne tür"],
                    nextNodeId: "L1_ENTER_HALL",
                    response: "Du öffnest die schweren Türen..."
                },
                {
                    command: ["schaue", "schau", "guck"],
                    nextNodeId: "L1_ENTER_HALL",
                    response: "Du schaust durch die Tür..."
                },
                {
                    command: ["hilfe", "help"],
                    nextNodeId: "start",
                    response: "Tippe 'betrete halle' oder 'öffne tür' um das Spiel zu starten."
                }
            ]
        },

        // L1_ENTER_HALL - Betreten der Halle
        L1_ENTER_HALL: {
            id: "L1_ENTER_HALL",
            type: "story",
            text: `Du betrittst die große Eingangshalle.

Eine prächtige Halle mit hohen Säulen und Marmorboden.
Normalerweise glänzt hier alles in perfekter Ordnung.

Doch jetzt...

⚔️ Drei SCHWERTER liegen kreuz und quer
🛡️ Drei schwere RÜSTUNGEN sind umgefallen
🚩 Sechs FAHNEN (rot und blau) liegen herum
💎 SCHUTT überall
🧹 Der BODEN ist voller Staub

In der Mitte der Halle steht eine kleine, leuchtende Fee.`,
            npc: { name: "Fee Struktura", image: "/images/struktura.jpeg", mood: "concerned" },
            transitions: [
                {
                    command: ["sprich fee", "sprich", "rede fee"],
                    nextNodeId: "L1_FEE_GREETING",
                    response: "Du gehst zur Fee..."
                },
                {
                    command: ["schaue", "schau", "guck", "untersuche"],
                    nextNodeId: "L1_OVERWHELMED",
                    response: "Du schaust dich in der Halle um..."
                },
                {
                    command: ["zurück", "halle", "schaue halle"],
                    nextNodeId: "L1_HALL_HUB",
                    response: "Du gehst in die Mitte der Halle..."
                }
            ]
        },

        // L1_FEE_GREETING - Tutorial-Start
        L1_FEE_GREETING: {
            id: "L1_FEE_GREETING",
            type: "tutorial",
            text: `Eine kleine, blaue Fee erscheint in einem Lichtblitz!

🧚 "Willkommen, tapferer Held!
Mein Name ist Struktura, Hüterin der Ordnung.

Du bist gekommen, um Prinzessin Ordelia zu retten?
Das ist mutig! Aber du musst etwas lernen...

Das Chaos ist mächtig! Du kannst es nicht einfach so besiegen.
Du musst eine TECHNIK lernen!"

Commands:
- Tippe 'sprich fee' um mehr zu erfahren
- Tippe 'schaue' um dich umzusehen
- Tippe 'hilfe' wenn du Tipps brauchst`,
            npc: { name: "Fee Struktura", image: "/images/struktura.jpeg", mood: "welcoming" },
            effects: [
                { type: "setFlag", flag: "met_fairy", value: true }
            ],
            transitions: [
                {
                    command: ["sprich fee", "sprich", "rede fee", "frage fee"],
                    nextNodeId: "L1_FEE_EXPLAINS",
                    response: "Die Fee lächelt und beginnt zu erzählen..."
                },
                {
                    command: ["schaue", "schau", "guck"],
                    nextNodeId: "L1_OVERWHELMED",
                    response: "Du schaust dich in der Halle um..."
                },
                {
                    command: ["hilfe", "help", "tipp"],
                    nextNodeId: "L1_HELP",
                    response: ""
                }
            ]
        },

        // L1_FEE_EXPLAINS - Fee erklärt die Technik
        L1_FEE_EXPLAINS: {
            id: "L1_FEE_EXPLAINS",
            type: "teaching_moment",
            text: `🧚 Fee Struktura:
"Das Geheimnis ist:

╔═══════════════════════════════════════════════════╗
║  EINE GROßE AUFGABE IST NUR...                   ║
║  ...VIELE KLEINE AUFGABEN!                       ║
╚═══════════════════════════════════════════════════╝

Schau:

❌ 'Halle aufräumen' → ZU GROSS! Überwältigend!

✅ Zerlege es:
   1. Schwerter aufräumen (3 Stück)
   2. Rüstungen aufstellen (3 Stück)
   3. Fahnen sortieren (6 Stück)
   4. Boden fegen

Siehst du? Jetzt ist es machbar!

Und jede kleine Aufgabe zerlegst du NOCH WEITER:

'Schwerter aufräumen' →
   1. Erstes Schwert nehmen
   2. Zweites Schwert nehmen
   3. Drittes Schwert nehmen
   4. Alle in Waffenkammer bringen

SCHRITT FÜR SCHRITT!"`,
            npc: { name: "Fee Struktura", image: "/images/struktura.jpeg", mood: "enlightening" },
            effects: [
                { type: "addOP", amount: 10 }
            ],
            transitions: [
                {
                    command: ["schaue", "schau", "guck"],
                    nextNodeId: "L1_OVERWHELMED",
                    response: "Du schaust dich um..."
                },
                {
                    command: ["nimm schwert", "schwert nehmen", "beginne mit schwertern", "schwerter"],
                    nextNodeId: "L1_SWORDS_START",
                    response: "✅ Gute Wahl! Die Schwerter sind ein guter Start!",
                    effects: [
                        { type: "addOP", amount: 5 },
                        { type: "setFlag", flag: "started_with_swords", value: true }
                    ],
                    conditions: [
                        { type: "not", flag: "swords_complete" }
                    ]
                },
                {
                    command: ["richte rüstung auf", "rüstung aufstellen", "beginne mit rüstungen", "rüstungen"],
                    nextNodeId: "L1_ARMOR_START",
                    response: "💪 Mutig! Rüstungen sind schwer, aber machbar!",
                    effects: [
                        { type: "setFlag", flag: "started_with_armor", value: true }
                    ],
                    conditions: [
                        { type: "not", flag: "armor_complete" }
                    ]
                },
                {
                    command: ["sortiere fahnen", "fahnen sortieren", "beginne mit fahnen", "fahnen"],
                    nextNodeId: "L1_FLAGS_START",
                    response: "🚩 Okay! Fahnen müssen sortiert werden!",
                    effects: [
                        { type: "setFlag", flag: "started_with_flags", value: true }
                    ],
                    conditions: [
                        { type: "not", flag: "flags_complete" }
                    ]
                },
                {
                    command: ["zurück", "halle", "schaue halle"],
                    nextNodeId: "L1_HALL_HUB",
                    response: "Du gehst zurück in die Mitte der Halle..."
                }
            ]
        },

        // L1_HALL_HUB - Zentraler Hub für Task-Wechsel
        L1_HALL_HUB: {
            id: "L1_HALL_HUB",
            type: "story",
            text: `Du stehst in der Eingangshalle und schaust dich um.

Was möchtest du als Nächstes tun?

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
VERFÜGBARE AUFGABEN:
⚔️ Schwerter aufräumen
🛡️ Rüstungen aufstellen
🚩 Fahnen sortieren
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🧚 "Du kannst jederzeit zwischen den Aufgaben wechseln!
Wähle einfach, was du als Nächstes tun möchtest.

Tipp: Verwende 'nimm schwert', 'richte rüstung auf' oder 'sortiere fahnen' um eine Aufgabe zu beginnen.
Oder tippe 'zurück' um hierher zurückzukehren, wenn du eine Aufgabe abgeschlossen hast."`,
            npc: { name: "Fee Struktura", image: "/images/struktura.jpeg", mood: "helpful" },
            transitions: [
                {
                    command: ["nimm schwert", "schwert nehmen", "beginne mit schwertern", "schwerter"],
                    nextNodeId: "L1_SWORDS_START",
                    response: "Zu den Schwertern!",
                    conditions: [
                        { type: "not", flag: "swords_complete" }
                    ]
                },
                {
                    command: ["richte rüstung auf", "rüstung aufstellen", "beginne mit rüstungen", "rüstungen"],
                    nextNodeId: "L1_ARMOR_START",
                    response: "Zu den Rüstungen!",
                    conditions: [
                        { type: "not", flag: "armor_complete" }
                    ]
                },
                {
                    command: ["sortiere fahnen", "fahnen sortieren", "beginne mit fahnen", "fahnen"],
                    nextNodeId: "L1_FLAGS_START",
                    response: "Zu den Fahnen!",
                    conditions: [
                        { type: "not", flag: "flags_complete" }
                    ]
                },
                {
                    command: ["schaue", "schau", "guck"],
                    nextNodeId: "L1_CHECK_COMPLETE",
                    response: "Du schaust dich um...",
                    conditions: [
                        { type: "hasFlag", flag: "swords_complete", value: true },
                        { type: "hasFlag", flag: "armor_complete", value: true },
                        { type: "hasFlag", flag: "flags_complete", value: true }
                    ]
                },
                {
                    command: ["sprich fee", "sprich", "rede fee"],
                    nextNodeId: "L1_FEE_EXPLAINS",
                    response: "Die Fee erklärt dir nochmal die Technik..."
                }
            ]
        },

        // L1_OVERWHELMED - Überwältigung zeigen
        L1_OVERWHELMED: {
            id: "L1_OVERWHELMED",
            type: "challenge_introduction",
            text: `Du schaust dich um und... wow.

Das ist VIEL zu aufräumen!

⚔️ Drei SCHWERTER liegen kreuz und quer
🛡️ Drei schwere RÜSTUNGEN sind umgefallen
🚩 Sechs FAHNEN (rot und blau) liegen herum
💎 SCHUTT überall
🧹 Der BODEN ist voller Staub

"Das schaffe ich NIE!" denkst du.

🧚 Fee Struktura fliegt zu dir:
"Halt! Nicht verzweifeln!

Genau SO fühlen sich große Aufgaben an!
Überwältigend! Unmöglich!

Aber weißt du was? Das ist eine ILLUSION!

Lass mich dir ein Geheimnis verraten..."`,
            npc: { name: "Fee Struktura", image: "/images/struktura.jpeg", mood: "concerned" },
            transitions: [
                {
                    command: ["sprich fee", "sprich", "rede fee"],
                    nextNodeId: "L1_FIRST_LESSON",
                    response: "Die Fee erklärt dir die Technik..."
                },
                {
                    command: ["hilfe", "help"],
                    nextNodeId: "L1_HELP",
                    response: ""
                }
            ]
        },

        // L1_FIRST_LESSON - Die Kern-Technik
        L1_FIRST_LESSON: {
            id: "L1_FIRST_LESSON",
            type: "teaching_moment",
            text: `🧚 Fee Struktura:
"Das Geheimnis ist:

╔═══════════════════════════════════════════════════╗
║  EINE GROßE AUFGABE IST NUR...                   ║
║  ...VIELE KLEINE AUFGABEN!                       ║
╚═══════════════════════════════════════════════════╝

Schau:

❌ 'Halle aufräumen' → ZU GROSS! Überwältigend!

✅ Zerlege es:
   1. Schwerter aufräumen (3 Stück)
   2. Rüstungen aufstellen (3 Stück)
   3. Fahnen sortieren (6 Stück)
   4. Boden fegen

Siehst du? Jetzt ist es machbar!

Und jede kleine Aufgabe zerlegst du NOCH WEITER:

'Schwerter aufräumen' →
   1. Erstes Schwert nehmen
   2. Zweites Schwert nehmen
   3. Drittes Schwert nehmen
   4. Alle in Waffenkammer bringen

SCHRITT FÜR SCHRITT!"

+10 OP für Aufmerksamkeit!`,
            npc: { name: "Fee Struktura", image: "/images/struktura.jpeg", mood: "enlightening" },
            effects: [
                { type: "addOP", amount: 10 }
            ],
            transitions: [
                {
                    command: ["nimm schwert", "schwert nehmen", "beginne mit schwertern"],
                    nextNodeId: "L1_SWORDS_START",
                    response: "✅ Gute Wahl! Die Schwerter sind ein guter Start!",
                    effects: [
                        { type: "addOP", amount: 5 },
                        { type: "setFlag", flag: "started_with_swords", value: true }
                    ]
                },
                {
                    command: ["richte rüstung auf", "rüstung aufstellen", "beginne mit rüstungen"],
                    nextNodeId: "L1_ARMOR_START",
                    response: "💪 Mutig! Rüstungen sind schwer, aber machbar!",
                    effects: [
                        { type: "setFlag", flag: "started_with_armor", value: true }
                    ]
                },
                {
                    command: ["sortiere fahnen", "fahnen sortieren", "beginne mit fahnen"],
                    nextNodeId: "L1_FLAGS_START",
                    response: "🚩 Okay! Fahnen müssen sortiert werden!",
                    effects: [
                        { type: "setFlag", flag: "started_with_flags", value: true }
                    ]
                }
            ]
        },

        // L1_DECISION - Erste Entscheidung (wird durch L1_FIRST_LESSON abgedeckt)

        // === SCHWERTER-PFAD ===

        // L1_SWORDS_START - Schwerter aufräumen beginnen
        L1_SWORDS_START: {
            id: "L1_SWORDS_START",
            type: "task",
            text: `Du entscheidest dich für die Schwerter!

Drei Schwerter liegen am Boden:
⚔️ SCHWERT 1 (beim Eingang)
⚔️ SCHWERT 2 (bei der Treppe)
⚔️ SCHWERT 3 (unter einem Tisch)

🧚 "Perfekt! Jetzt ZERLEGST du diese Aufgabe:

Schritt 1: Nimm das ERSTE Schwert
Schritt 2: Nimm das ZWEITE Schwert
Schritt 3: Nimm das DRITTE Schwert
Schritt 4: Bring alle zur Waffenkammer

EINS NACH DEM ANDEREN!"

Commands:
- 'nimm schwert 1' oder 'nimm erstes schwert'
- 'nimm schwert 2'
- 'nimm schwert 3'`,
            npc: { name: "Fee Struktura", image: "/images/struktura.jpeg", mood: "helpful" },
            transitions: [
                {
                    command: ["nimm schwert 1", "nimm erstes schwert", "nimm schwert"],
                    nextNodeId: "L1_SWORD_1_TAKEN",
                    response: "Du hebst das erste Schwert auf!",
                    conditions: [
                        { type: "not", flag: "sword_1_taken" }
                    ],
                    effects: [
                        { type: "addOP", amount: 5 },
                        { type: "addToInventory", item: "sword_1" },
                        { type: "setFlag", flag: "sword_1_taken", value: true }
                    ]
                },
                {
                    command: ["nimm alle schwerter", "nimm alle"],
                    nextNodeId: "L1_TOO_FAST",
                    response: "⚠️ Moment! Nicht so schnell!"
                }
            ]
        },

        // L1_SWORD_1_TAKEN - Erstes Erfolgserlebnis
        L1_SWORD_1_TAKEN: {
            id: "L1_SWORD_1_TAKEN",
            type: "success",
            text: `*KLING* ⚔️

Du hebst das erste Schwert auf!
Es fühlt sich gut an!

+5 OP!

🧚 Fee Struktura jubelt:
"SUPER! Siehst du?

Der erste Schritt ist getan!
Das war doch gar nicht so schwer, oder?

Und jetzt? Genau! Der NÄCHSTE Schritt!
Nimm das zweite Schwert!"

Fortschritt: 🟩⬜⬜ 1/3 Schwerter`,
            npc: { name: "Fee Struktura", image: "/images/struktura.jpeg", mood: "encouraging" },
            transitions: [
                {
                    command: ["nimm schwert 2", "nimm zweites schwert", "nimm schwert"],
                    nextNodeId: "L1_SWORD_2_TAKEN",
                    response: "Du gehst zum zweiten Schwert...",
                    conditions: [
                        { type: "hasFlag", flag: "sword_1_taken", value: true },
                        { type: "not", flag: "sword_2_taken" }
                    ]
                }
            ]
        },

        // L1_SWORD_2_TAKEN
        L1_SWORD_2_TAKEN: {
            id: "L1_SWORD_2_TAKEN",
            type: "progress",
            text: `*KLING* ⚔️

Das zweite Schwert ist auch eingesammelt!

+5 OP!

🧚 "Perfekt! Du bist auf dem richtigen Weg!

Merkst du schon?
Schritt für Schritt wird die Aufgabe KLEINER!

Noch ein Schwert, dann ist dieser Teil FERTIG!"

Fortschritt: 🟩🟩⬜ 2/3 Schwerter`,
            npc: { name: "Fee Struktura", image: "/images/struktura.jpeg", mood: "encouraging" },
            effects: [
                { type: "addOP", amount: 5 },
                { type: "addToInventory", item: "sword_2" },
                { type: "setFlag", flag: "sword_2_taken", value: true }
            ],
            transitions: [
                {
                    command: ["nimm schwert 3", "nimm drittes schwert", "nimm schwert"],
                    nextNodeId: "L1_SWORD_3_TAKEN",
                    response: "Du gehst zum dritten Schwert...",
                    conditions: [
                        { type: "hasFlag", flag: "sword_2_taken", value: true },
                        { type: "not", flag: "sword_3_taken" }
                    ]
                }
            ]
        },

        // L1_SWORD_3_TAKEN
        L1_SWORD_3_TAKEN: {
            id: "L1_SWORD_3_TAKEN",
            type: "progress",
            text: `*KLING* ⚔️

Alle drei Schwerter sind eingesammelt!

+5 OP!

🧚 "AUSGEZEICHNET!

Jetzt hast du alle Schwerter!
Der letzte Schritt: Bring sie zur Waffenkammer!"

Commands:
- 'gehe zur waffenkammer'
- 'bringe schwerter zur waffenkammer'

Fortschritt: 🟩🟩🟩 3/3 Schwerter gesammelt!`,
            npc: { name: "Fee Struktura", image: "/images/struktura.jpeg", mood: "encouraging" },
            effects: [
                { type: "addOP", amount: 5 },
                { type: "addToInventory", item: "sword_3" },
                { type: "setFlag", flag: "sword_3_taken", value: true }
            ],
            transitions: [
                {
                    command: ["gehe zur waffenkammer", "bringe schwerter", "waffenkammer", "gehe waffenkammer"],
                    nextNodeId: "L1_SWORDS_COMPLETE",
                    response: "Du bringst die Schwerter zur Waffenkammer...",
                    conditions: [
                        { type: "hasFlag", flag: "sword_3_taken", value: true }
                    ]
                }
            ]
        },

        // L1_SWORDS_COMPLETE - Teilaufgabe abgeschlossen!
        L1_SWORDS_COMPLETE: {
            id: "L1_SWORDS_COMPLETE",
            type: "milestone",
            text: `Du bringst die drei Schwerter zur Waffenkammer.

*KLIRR* *KLACK*

Sie liegen nun ordentlich im Waffenständer!

⚔️✅ SCHWERTER: ERLEDIGT!

+20 OP Bonus für vollständige Teilaufgabe!

🧚 Fee Struktura:
"BRAVO! 🎉

Du hast gerade etwas SEHR WICHTIGES gelernt!

Du hast eine große Aufgabe ('Schwerter aufräumen')
in kleine Schritte zerlegt:
   ✅ Schwert 1 nehmen
   ✅ Schwert 2 nehmen
   ✅ Schwert 3 nehmen
   ✅ Zur Waffenkammer bringen

Und weißt du was? Es hat FUNKTIONIERT!

Das ist die MACHT der Schritt-für-Schritt-Methode!"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
FORTSCHRITT IN DER HALLE:
✅ Schwerter aufgeräumt
⬜ Rüstungen noch zu tun
⬜ Fahnen noch zu tun
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Was machst du als Nächstes?`,
            npc: { name: "Fee Struktura", image: "/images/struktura.jpeg", mood: "proud" },
            effects: [
                { type: "addOP", amount: 20 },
                { type: "setFlag", flag: "swords_complete", value: true },
                { type: "updateTask", taskId: "t1", status: "completed" }
            ],
            transitions: [
                {
                    command: ["richte rüstung auf", "rüstung aufstellen", "beginne mit rüstungen", "rüstungen"],
                    nextNodeId: "L1_ARMOR_START",
                    response: "Jetzt die Rüstungen!",
                    conditions: [
                        { type: "not", flag: "armor_complete" }
                    ]
                },
                {
                    command: ["sortiere fahnen", "fahnen sortieren", "beginne mit fahnen", "fahnen"],
                    nextNodeId: "L1_FLAGS_START",
                    response: "Jetzt die Fahnen!",
                    conditions: [
                        { type: "not", flag: "flags_complete" }
                    ]
                },
                {
                    command: ["zurück", "halle", "schaue", "schau"],
                    nextNodeId: "L1_HALL_HUB",
                    response: "Du gehst zurück in die Mitte der Halle..."
                }
            ]
        },

        // === RÜSTUNGEN-PFAD ===

        // L1_ARMOR_START - Rüstungen (schwerer!)
        L1_ARMOR_START: {
            id: "L1_ARMOR_START",
            type: "task",
            text: `Jetzt die Rüstungen!

Drei schwere Ritterrüstungen sind umgefallen:
🛡️ RÜSTUNG 1 (beim Kamin)
🛡️ RÜSTUNG 2 (an der Säule)
🛡️ RÜSTUNG 3 (am Fenster)

🧚 "Achtung! Diese sind SCHWER!

Aber auch hier gilt:
Eine nach der anderen!

Versuch nicht, alle auf einmal zu machen!
Das wäre zu anstrengend!"

Tipp: Jede Rüstung braucht 2 Schritte:
1. Aufrichten
2. Positionieren

Commands:
- 'richte rüstung 1 auf'
- 'stelle rüstung 1 hin'`,
            npc: { name: "Fee Struktura", image: "/images/struktura.jpeg", mood: "helpful" },
            transitions: [
                {
                    command: ["richte rüstung 1 auf", "richte erste rüstung auf", "richte rüstung auf"],
                    nextNodeId: "L1_ARMOR_1_UP",
                    response: "Du richtest die erste Rüstung auf...",
                    conditions: [
                        { type: "not", flag: "armor_1_up" }
                    ],
                    effects: [
                        { type: "addOP", amount: 5 },
                        { type: "setFlag", flag: "armor_1_up", value: true }
                    ]
                }
            ]
        },

        // L1_ARMOR_1_UP
        L1_ARMOR_1_UP: {
            id: "L1_ARMOR_1_UP",
            type: "progress",
            text: `*KLACK* 🛡️

Die erste Rüstung steht wieder!

+5 OP!

🧚 "Gut gemacht! Noch 2 Rüstungen übrig.

Fortschritt: 🟩⬜⬜ 1/3 Rüstungen"`,
            npc: { name: "Fee Struktura", image: "/images/struktura.jpeg", mood: "encouraging" },
            transitions: [
                {
                    command: ["richte rüstung 2 auf", "richte zweite rüstung auf", "richte rüstung auf"],
                    nextNodeId: "L1_ARMOR_2_UP",
                    response: "Du gehst zur zweiten Rüstung...",
                    conditions: [
                        { type: "hasFlag", flag: "armor_1_up", value: true },
                        { type: "not", flag: "armor_2_up" }
                    ]
                }
            ]
        },

        // L1_ARMOR_2_UP
        L1_ARMOR_2_UP: {
            id: "L1_ARMOR_2_UP",
            type: "progress",
            text: `*KLACK* 🛡️

Die zweite Rüstung steht!

+5 OP!

🧚 "Perfekt! Noch eine Rüstung!

Fortschritt: 🟩🟩⬜ 2/3 Rüstungen"`,
            npc: { name: "Fee Struktura", image: "/images/struktura.jpeg", mood: "encouraging" },
            effects: [
                { type: "addOP", amount: 5 },
                { type: "setFlag", flag: "armor_2_up", value: true }
            ],
            transitions: [
                {
                    command: ["richte rüstung 3 auf", "richte dritte rüstung auf", "richte rüstung auf"],
                    nextNodeId: "L1_ARMOR_3_UP",
                    response: "Du gehst zur letzten Rüstung...",
                    conditions: [
                        { type: "hasFlag", flag: "armor_2_up", value: true },
                        { type: "not", flag: "armor_3_up" }
                    ]
                }
            ]
        },

        // L1_ARMOR_3_UP
        L1_ARMOR_3_UP: {
            id: "L1_ARMOR_3_UP",
            type: "milestone",
            text: `*KLACK* 🛡️

Alle drei Rüstungen stehen majestätisch!

+20 OP Bonus!

🛡️✅ RÜSTUNGEN: ERLEDIGT!

🧚 "FANTASTISCH! Du hast es geschafft!

Die Rüstungen sind wieder aufgestellt.
Die Halle sieht schon viel ordentlicher aus!"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
FORTSCHRITT IN DER HALLE:
✅ Schwerter aufgeräumt
✅ Rüstungen aufgestellt
⬜ Fahnen noch zu tun
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
            npc: { name: "Fee Struktura", image: "/images/struktura.jpeg", mood: "proud" },
            effects: [
                { type: "addOP", amount: 20 },
                { type: "setFlag", flag: "armor_3_up", value: true },
                { type: "setFlag", flag: "armor_complete", value: true },
                { type: "updateTask", taskId: "t2", status: "completed" }
            ],
            transitions: [
                {
                    command: ["sortiere fahnen", "fahnen sortieren", "beginne mit fahnen", "fahnen"],
                    nextNodeId: "L1_FLAGS_START",
                    response: "Jetzt die Fahnen!",
                    conditions: [
                        { type: "not", flag: "flags_complete" }
                    ]
                },
                {
                    command: ["nimm schwert", "schwert nehmen", "beginne mit schwertern", "schwerter"],
                    nextNodeId: "L1_SWORDS_START",
                    response: "Zurück zu den Schwertern!",
                    conditions: [
                        { type: "not", flag: "swords_complete" }
                    ]
                },
                {
                    command: ["zurück", "halle", "schaue", "schau"],
                    nextNodeId: "L1_HALL_HUB",
                    response: "Du gehst zurück in die Mitte der Halle..."
                },
                {
                    command: ["schaue", "schau"],
                    nextNodeId: "L1_CHECK_COMPLETE",
                    response: "Du schaust dich um...",
                    conditions: [
                        { type: "hasFlag", flag: "swords_complete", value: true },
                        { type: "hasFlag", flag: "armor_complete", value: true },
                        { type: "hasFlag", flag: "flags_complete", value: true }
                    ]
                }
            ]
        },

        // === FAHNEN-PFAD ===

        // L1_FLAGS_START
        L1_FLAGS_START: {
            id: "L1_FLAGS_START",
            type: "task",
            text: `Jetzt die Fahnen!

Sechs Fahnen liegen verstreut:
🚩 3x BLAUE Fahnen
🚩 3x ROTE Fahnen

🧚 "Die Fahnen müssen sortiert werden!

Zerlege es:
1. Erst alle BLAUEN Fahnen sammeln
2. Dann alle ROTEN Fahnen sammeln
3. Beide Stapel ordentlich zusammenlegen

Commands:
- 'nimm blaue fahne' oder 'sammle blaue fahnen'
- 'nimm rote fahne' oder 'sammle rote fahnen'`,
            npc: { name: "Fee Struktura", image: "/images/struktura.jpeg", mood: "helpful" },
            transitions: [
                {
                    command: ["nimm blaue fahne", "sammle blaue fahnen", "nimm fahne"],
                    nextNodeId: "L1_FLAGS_BLUE_START",
                    response: "Du beginnst mit den blauen Fahnen...",
                    conditions: [
                        { type: "not", flag: "flags_complete" }
                    ]
                },
                {
                    command: ["nimm rote fahne", "sammle rote fahnen"],
                    nextNodeId: "L1_FLAGS_RED_START",
                    response: "Du beginnst mit den roten Fahnen...",
                    conditions: [
                        { type: "not", flag: "flags_complete" }
                    ]
                }
            ]
        },

        // L1_FLAGS_BLUE_START
        L1_FLAGS_BLUE_START: {
            id: "L1_FLAGS_BLUE_START",
            type: "task",
            text: `Du sammelst die blauen Fahnen.

🚩 Blaue Fahne 1... ✅
🚩 Blaue Fahne 2... ✅
🚩 Blaue Fahne 3... ✅

+10 OP!

🧚 "Gut! Jetzt die roten Fahnen!"`,
            npc: { name: "Fee Struktura", image: "/images/struktura.jpeg", mood: "encouraging" },
            effects: [
                { type: "addOP", amount: 10 },
                { type: "setFlag", flag: "blue_flags_collected", value: true }
            ],
            transitions: [
                {
                    command: ["nimm rote fahne", "sammle rote fahnen", "nimm fahne"],
                    nextNodeId: "L1_FLAGS_RED_START",
                    response: "Du sammelst die roten Fahnen...",
                    conditions: [
                        { type: "hasFlag", flag: "blue_flags_collected", value: true }
                    ]
                }
            ]
        },

        // L1_FLAGS_RED_START
        L1_FLAGS_RED_START: {
            id: "L1_FLAGS_RED_START",
            type: "task",
            text: `Du sammelst die roten Fahnen.

🚩 Rote Fahne 1... ✅
🚩 Rote Fahne 2... ✅
🚩 Rote Fahne 3... ✅

+10 OP!

🧚 "Perfekt! Jetzt sortiere sie ordentlich!"`,
            npc: { name: "Fee Struktura", image: "/images/struktura.jpeg", mood: "encouraging" },
            effects: [
                { type: "addOP", amount: 10 },
                { type: "setFlag", flag: "red_flags_collected", value: true }
            ],
            transitions: [
                {
                    command: ["sortiere fahnen", "ordne fahnen", "lege fahnen zusammen"],
                    nextNodeId: "L1_FLAGS_COMPLETE",
                    response: "Du sortierst die Fahnen...",
                    conditions: [
                        { type: "hasFlag", flag: "blue_flags_collected", value: true },
                        { type: "hasFlag", flag: "red_flags_collected", value: true }
                    ]
                }
            ]
        },

        // L1_FLAGS_COMPLETE
        L1_FLAGS_COMPLETE: {
            id: "L1_FLAGS_COMPLETE",
            type: "milestone",
            text: `Du sortierst die verstaubten Fahnen und legst sie ordentlich zusammen.

Die Farben leuchten wieder!

🚩✅ FAHNEN: ERLEDIGT!

+20 OP Bonus!

🧚 "AUSGEZEICHNET! Alle Fahnen sind sortiert!"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
FORTSCHRITT IN DER HALLE:
✅ Schwerter aufgeräumt
✅ Rüstungen aufgestellt
✅ Fahnen sortiert
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
            npc: { name: "Fee Struktura", image: "/images/struktura.jpeg", mood: "proud" },
            effects: [
                { type: "addOP", amount: 20 },
                { type: "setFlag", flag: "flags_complete", value: true },
                { type: "updateTask", taskId: "t3", status: "completed" }
            ],
            transitions: [
                {
                    command: ["nimm schwert", "schwert nehmen", "beginne mit schwertern", "schwerter"],
                    nextNodeId: "L1_SWORDS_START",
                    response: "Zurück zu den Schwertern!",
                    conditions: [
                        { type: "not", flag: "swords_complete" }
                    ]
                },
                {
                    command: ["richte rüstung auf", "rüstung aufstellen", "beginne mit rüstungen", "rüstungen"],
                    nextNodeId: "L1_ARMOR_START",
                    response: "Zurück zu den Rüstungen!",
                    conditions: [
                        { type: "not", flag: "armor_complete" }
                    ]
                },
                {
                    command: ["zurück", "halle", "schaue", "schau"],
                    nextNodeId: "L1_HALL_HUB",
                    response: "Du gehst zurück in die Mitte der Halle..."
                },
                {
                    command: ["schaue", "schau"],
                    nextNodeId: "L1_ALL_TASKS_DONE",
                    response: "Du schaust dich um...",
                    conditions: [
                        { type: "hasFlag", flag: "swords_complete", value: true },
                        { type: "hasFlag", flag: "armor_complete", value: true },
                        { type: "hasFlag", flag: "flags_complete", value: true }
                    ]
                }
            ]
        },

        // L1_CHECK_COMPLETE - Check if all tasks done
        L1_CHECK_COMPLETE: {
            id: "L1_CHECK_COMPLETE",
            type: "level_milestone",
            text: `Du schaust dich um...

Die Halle glänzt wieder!

✅ Schwerter ordentlich in der Waffenkammer
✅ Rüstungen stehen majestätisch aufgereiht
✅ Fahnen hängen perfekt sortiert

Die Eingangshalle ist wieder in Ordnung!

*GLOW* ✨

Ein goldenes Licht erfüllt den Raum!`,
            npc: { name: "Fee Struktura", image: "/images/struktura.jpeg", mood: "proud" },
            transitions: [
                {
                    command: ["schaue", "schau", "weiter"],
                    nextNodeId: "L1_ALL_TASKS_DONE",
                    response: "",
                    conditions: [
                        { type: "hasFlag", flag: "swords_complete", value: true },
                        { type: "hasFlag", flag: "armor_complete", value: true },
                        { type: "hasFlag", flag: "flags_complete", value: true }
                    ]
                }
            ]
        },

        // L1_ALL_TASKS_DONE - Alle Teilaufgaben erledigt
        L1_ALL_TASKS_DONE: {
            id: "L1_ALL_TASKS_DONE",
            type: "level_milestone",
            text: `🧚 Fee Struktura:
"DU HAST ES GESCHAFFT! 🌟

Die erste Prüfung ist bestanden!
Die Eingangshalle ist wieder ordentlich!

+30 OP Bonus für Level-Completion!

Aber bevor du weitergehst...
Lass uns kurz über das sprechen, was du gelernt hast!"`,
            npc: { name: "Fee Struktura", image: "/images/struktura.jpeg", mood: "proud" },
            effects: [
                { type: "addOP", amount: 30 }
            ],
            transitions: [
                {
                    command: ["weiter", "ja", "okay"],
                    nextNodeId: "L1_REFLECTION",
                    response: ""
                }
            ]
        },

        // L1_REFLECTION - Meta-Learning
        L1_REFLECTION: {
            id: "L1_REFLECTION",
            type: "reflection",
            text: `🧚 Fee Struktura setzt sich auf deine Schulter:

"Lass uns kurz innehalten.

Am Anfang sah das hier überwältigend aus, oder?
So viel Chaos! Unmöglich aufzuräumen!

Aber dann hast du etwas gemacht:

╔═══════════════════════════════════════════════════╗
║  DU HAST DIE AUFGABE ZERLEGT!                    ║
╠═══════════════════════════════════════════════════╣
║                                                   ║
║  Statt 'Halle aufräumen' (zu groß!)              ║
║                                                   ║
║  Hast du gemacht:                                 ║
║  1️⃣ Schwerter → Schwert 1, 2, 3                  ║
║  2️⃣ Rüstungen → Rüstung 1, 2, 3                  ║
║  3️⃣ Fahnen → Blaue, dann rote                    ║
║                                                   ║
║  Schritt für Schritt!                             ║
║                                                   ║
╚═══════════════════════════════════════════════════╝

Und weißt du was das Beste ist?

DIESE TECHNIK FUNKTIONIERT ÜBERALL!

In der Schule? Bei Hausaufgaben?
Im Kinderzimmer? Bei Projekten?

IMMER GLEICH:
1. Große Aufgabe anschauen
2. In kleine Schritte zerlegen
3. Einen Schritt nach dem anderen
4. Fertig! ✅

Das ist deine SUPERPOWER! 💪"

+20 OP für Meta-Learning!`,
            npc: { name: "Fee Struktura", image: "/images/struktura.jpeg", mood: "proud" },
            effects: [
                { type: "addOP", amount: 20 }
            ],
            transitions: [
                {
                    command: ["weiter", "ja", "verstanden"],
                    nextNodeId: "L1_COMPLETE",
                    response: ""
                }
            ]
        },

        // L1_COMPLETE - Level abgeschlossen
        L1_COMPLETE: {
            id: "L1_COMPLETE",
            type: "levelComplete",
            text: `
╔═══════════════════════════════════════════════════╗
║        LEVEL 1: EINGANGSHALLE                    ║
║           ABGESCHLOSSEN!                         ║
╚═══════════════════════════════════════════════════╝

🎓 GELERNT:
✅ Große Aufgaben in kleine Schritte zerlegen
✅ Schritt für Schritt vorgehen
✅ Erfolgserlebnisse sammeln

🎁 BELOHNUNG:
🧹 Magischer Besen (hilft beim Fegen)
📖 Organisations-Tagebuch

🚪 Die Tür zum nächsten Raum öffnet sich...

🧚 "Bereit für Level 2? Dort wird es interessanter!
Du wirst lernen zu KATEGORISIEREN!"

Commands:
- 'weiter' oder 'nächstes level'
- 'statistik' um Details zu sehen`,
            npc: { name: "Fee Struktura", image: "/images/struktura.jpeg", mood: "proud" },
            effects: [
                { type: "completeLevel", level: 1 },
                { type: "unlockLevel", level: 2 },
                { type: "addToInventory", item: "magischer_besen" },
                { type: "addToInventory", item: "organisations_tagebuch" },
                { type: "unlockAchievement", achievement: "erste_schritte" }
            ],
            transitions: [
                {
                    command: ["weiter", "nächstes level", "level 2"],
                    nextNodeId: "L1_COMPLETE",
                    response: "Level 2 wird später implementiert!"
                }
            ]
        },

        // L1_TOO_FAST - Warnung bei zu schnellem Vorgehen
        L1_TOO_FAST: {
            id: "L1_TOO_FAST",
            type: "story",
            text: `⚠️ Moment! Nicht so schnell!

🧚 Fee Struktura:
"Du versuchst, alles auf einmal zu machen?
Das ist genau das Problem!

Denk daran: EINS NACH DEM ANDEREN!

Beginne mit dem ERSTEN Schwert.
Dann das zweite.
Dann das dritte.

Schritt für Schritt!"`,
            npc: { name: "Fee Struktura", image: "/images/struktura.jpeg", mood: "concerned" },
            transitions: [
                {
                    command: ["nimm schwert 1", "nimm erstes schwert"],
                    nextNodeId: "L1_SWORD_1_TAKEN",
                    response: "Du beginnst richtig..."
                },
                {
                    command: ["schaue", "hilfe"],
                    nextNodeId: "L1_SWORDS_START",
                    response: ""
                }
            ]
        },

        // L1_HELP - Hilfe-System
        L1_HELP: {
            id: "L1_HELP",
            type: "story",
            text: `Verfügbare Befehle:

📋 NAVIGATION:
- schaue / schau / guck (um dich umzusehen)
- gehe [ort] (zu einem Ort gehen)

🎮 AKTIONEN:
- nimm [objekt] (z.B. "nimm schwert")
- richte [objekt] auf (z.B. "richte rüstung auf")
- sortiere [objekt] (z.B. "sortiere fahnen")

💬 INTERAKTION:
- sprich [npc] (z.B. "sprich fee")
- hilfe (diese Hilfe anzeigen)

💡 TIPP:
Zerlege große Aufgaben in kleine Schritte!
Jeder Schritt ist ein Erfolg!`,
            transitions: [
                {
                    command: ["schaue", "schau"],
                    nextNodeId: "L1_OVERWHELMED",
                    response: ""
                },
                {
                    command: ["sprich fee", "sprich"],
                    nextNodeId: "L1_FEE_GREETING",
                    response: ""
                }
            ]
        }
    }
});

// Export the initial level data (this is mutable during gameplay)
export const LEVEL_1_DATA: LevelData = createInitialLevel1Data();

// Function to get a fresh copy of level 1 data with reset tasks
// Use this when restarting the game to ensure tasks are reset to "pending"
export const getInitialLevel1Data = (): LevelData => {
    return createInitialLevel1Data();
};
