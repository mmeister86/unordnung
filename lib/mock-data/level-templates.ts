import { LevelData } from "@/types/game";

export const LEVEL_2_TEMPLATE: LevelData = {
  id: 2,
  title: "Die Bibliothek",
  description: "Ordnung in der Wissensburg schaffen.",
  tasks: [
    { id: "t1", description: "Bücher sortieren (0/5)", status: "pending" },
    { id: "t2", description: "Schriftrollen aufrollen", status: "pending" },
    { id: "t3", description: "Staub wischen", status: "pending" },
  ],
  items: [
    { id: "book", name: "Buch", description: "Ein altes, staubiges Buch." },
    { id: "scroll", name: "Schriftrolle", description: "Eine vergilbte Schriftrolle." },
    { id: "feather", name: "Feder", description: "Eine Schreibfeder." },
  ],
  nodes: {
    start: {
      id: "start",
      type: "story",
      text: "Die Bibliothek ist ein Chaos! Bücher liegen verstreut, Schriftrollen sind offen. Der Bibliothekar sieht verzweifelt aus.",
      npc: { name: "Bibliothekar Ordo", mood: "overwhelmed" },
      validCommands: ["schaue", "sprich bibliothekar", "hilfe"],
    },
    // More nodes would be added here for complete implementation
  },
};

export const LEVEL_3_TEMPLATE: LevelData = {
  id: 3,
  title: "Die Küche",
  description: "Kochen mit Plan und Struktur.",
  tasks: [
    { id: "t1", description: "Zutaten sammeln", status: "pending" },
    { id: "t2", description: "Arbeitsplatz vorbereiten", status: "pending" },
    { id: "t3", description: "Gericht kochen", status: "pending" },
  ],
  items: [
    { id: "knife", name: "Messer", description: "Ein scharfes Küchenmesser." },
    { id: "pot", name: "Topf", description: "Ein großer Kochtopf." },
    { id: "spoon", name: "Löffel", description: "Ein Holz-Löffel." },
  ],
  nodes: {
    start: {
      id: "start",
      type: "story",
      text: "Die Küche ist unordentlich! Der Koch braucht Hilfe beim Vorbereiten des Festmahls.",
      npc: { name: "Koch Gusto", mood: "stressed" },
      validCommands: ["schaue", "sprich koch", "hilfe"],
    },
  },
};

export const LEVEL_4_TEMPLATE: LevelData = {
  id: 4,
  title: "Der Schlossgarten",
  description: "Natur in Ordnung bringen.",
  tasks: [
    { id: "t1", description: "Unkraut jäten (0/3)", status: "pending" },
    { id: "t2", description: "Blumen gießen", status: "pending" },
    { id: "t3", description: "Weg freimachen", status: "pending" },
  ],
  items: [
    { id: "shovel", name: "Schaufel", description: "Eine kleine Gartenschaufel." },
    { id: "watering_can", name: "Gießkanne", description: "Eine grüne Gießkanne." },
    { id: "flower", name: "Blume", description: "Eine schöne Rose." },
  ],
  nodes: {
    start: {
      id: "start",
      type: "story",
      text: "Der Schlossgarten verwildert! Die Gärtnerin braucht dringend Hilfe.",
      npc: { name: "Gärtnerin Flora", mood: "worried" },
      validCommands: ["schaue", "sprich gärtnerin", "hilfe"],
    },
  },
};

export const LEVEL_5_TEMPLATE: LevelData = {
  id: 5,
  title: "Die Werkstatt",
  description: "Werkzeuge und Material organisieren.",
  tasks: [
    { id: "t1", description: "Werkzeuge sortieren", status: "pending" },
    { id: "t2", description: "Materialien lagern", status: "pending" },
    { id: "t3", description: "Arbeitsplatz säubern", status: "pending" },
  ],
  items: [
    { id: "hammer", name: "Hammer", description: "Ein schwerer Hammer." },
    { id: "nails", name: "Nägel", description: "Eine Dose mit Nägeln." },
    { id: "wood", name: "Holz", description: "Holzbretter verschiedener Größe." },
  ],
  nodes: {
    start: {
      id: "start",
      type: "story",
      text: "Die Werkstatt ist ein einziges Chaos! Der Schmied kann nichts finden.",
      npc: { name: "Schmied Ferrum", mood: "frustrated" },
      validCommands: ["schaue", "sprich schmied", "hilfe"],
    },
  },
};

export const LEVEL_6_TEMPLATE: LevelData = {
  id: 6,
  title: "Der Thronsaal",
  description: "Die finale Herausforderung.",
  tasks: [
    { id: "t1", description: "Thron vorbereiten", status: "pending" },
    { id: "t2", description: "Festdekoration aufhängen", status: "pending" },
    { id: "t3", description: "Ehrengäste empfangen", status: "pending" },
  ],
  items: [
    { id: "crown", name: "Krone", description: "Die königliche Krone." },
    { id: "banner", name: "Banner", description: "Ein festliches Banner." },
    { id: "throne", name: "Thron", description: "Der goldene Thron." },
  ],
  nodes: {
    start: {
      id: "start",
      type: "story",
      text: "Der Thronsaal muss für das große Fest vorbereitet werden! Alle bisherigen Fähigkeiten sind jetzt gefragt.",
      npc: { name: "König Ordus", mood: "expectant" },
      validCommands: ["schaue", "sprich könig", "hilfe"],
    },
  },
};

// Export all levels as an array for easy access
export const ALL_LEVEL_TEMPLATES = [
  LEVEL_2_TEMPLATE,
  LEVEL_3_TEMPLATE,
  LEVEL_4_TEMPLATE,
  LEVEL_5_TEMPLATE,
  LEVEL_6_TEMPLATE,
];
