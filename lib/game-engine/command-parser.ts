import { Command } from "@/types/game";

// Command synonyms mapping - erweitert mit mehr Variationen
const COMMAND_SYNONYMS: Record<string, string[]> = {
    schaue: [
        "schau", "schauen", "schaust", "schaut", "schaute", "schauten",
        "guck", "gucke", "gucken", "guckst", "guckt", "guckte", "guckten",
        "betrachte", "betrachten", "betrachtest", "betrachtet", "betrachtete",
        "untersuche", "untersuchen", "untersuchst", "untersucht", "untersuchte",
        "ansehen", "anschauen", "anschaue", "anschaust", "anschaut",
        "look", "looks", "looking", "examine", "examines", "examining",
        "sieh", "siehe", "siehst", "sieht", "sieht an", "sieh dir an"
    ],
    nimm: [
        "nehme", "nehmen", "nimmst", "nimmt", "nahm", "nahmen", "genommen",
        "hole", "holen", "holst", "holt", "holte", "holten", "geholt",
        "greife", "greifen", "greifst", "greift", "griff", "griffen", "gegriffen",
        "sammle", "sammeln", "sammelst", "sammelt", "sammelte", "gesammelt",
        "pick", "picks", "picking", "picked", "take", "takes", "taking", "took", "taken",
        "grab", "grabs", "grabbing", "grabbed",
        "pack", "packe", "packen", "packst", "packt", "packte", "gepackt",
        "ergreife", "ergreifen", "ergreifst", "ergreift"
    ],
    gehe: [
        "geh", "gehen", "gehst", "geht", "ging", "gingen", "gegangen",
        "lauf", "laufe", "laufen", "läufst", "läuft", "lief", "liefen", "gelaufen",
        "bewege", "bewegen", "bewegst", "bewegt", "bewegte", "bewegt",
        "go", "goes", "going", "went", "gone", "move", "moves", "moving", "moved",
        "walk", "walks", "walking", "walked",
        "betrete", "betreten", "betrittst", "betritt", "betrat", "betraten",
        "hinein", "hineingehen", "hineingehe", "hineinlaufen",
        "marschiere", "marschieren", "marschierst", "marschiert"
    ],
    räume_auf: [
        "sortiere", "sortieren", "sortierst", "sortiert", "sortierte",
        "ordne", "ordnen", "ordnest", "ordnet", "ordnete", "geordnet",
        "clean", "cleans", "cleaning", "cleaned", "aufräumen", "aufräume", "aufräumst", "aufräumt",
        "organisiere", "organisieren", "organisierst", "organisiert", "organisierte",
        "räume", "räumen", "räumst", "räumt", "räumte", "aufgeräumt"
    ],
    sprich: [
        "rede", "reden", "redest", "redet", "redete", "redeten", "geredet",
        "talk", "talks", "talking", "talked",
        "spreche", "sprechen", "sprichst", "spricht", "sprach", "sprachen", "gesprochen",
        "unterhalte", "unterhalten", "unterhältst", "unterhält", "unterhielt",
        "sage", "sagen", "sagst", "sagt", "sagte", "sagten", "gesagt",
        "plaudere", "plaudern", "plauderst", "plaudert"
    ],
    hilfe: [
        "help", "helps", "helping", "helped",
        "tipp", "tipps", "tippe", "tippen",
        "hinweis", "hinweise", "hinweise", "hinweisen",
        "?", "h", "h!", "hilf", "hilfe!", "help!",
        "anleitung", "anweisung", "anweisungen"
    ],
    inventar: [
        "inv", "i", "tasche", "taschen", "items", "inventory", "inventar",
        "beutel", "rucksack", "sack", "gepäck", "ausrüstung"
    ],
    status: [
        "fortschritt", "stats", "stat", "progress", "status",
        "zustand", "info", "informationen", "information"
    ],
    richte_auf: [
        "richte", "richten", "richtest", "richtet", "richtete", "gerichtet",
        "stelle", "stellen", "stellst", "stellt", "stellte", "gestellt", "aufstellen",
        "aufstellen", "aufstellst", "aufstellt", "aufstellte",
        "erhebe", "erheben", "erhebst", "erhebt", "erhob", "erhoben",
        "errichte", "errichten", "errichtest", "errichtet", "errichtete",
        "aufrichten", "aufrichtest", "aufrichtet"
    ],
    sortiere: [
        "ordne", "ordnen", "ordnest", "ordnet", "ordnete",
        "organisiere", "organisieren", "organisierst", "organisiert",
        "kategorisiere", "kategorisieren", "kategorisierst", "kategorisiert",
        "sortiere", "sortieren", "sortierst", "sortiert"
    ],
    neutralisiere: [
        "neutralisiere", "neutralisieren", "neutralisierst", "neutralisiert",
        "stoppe", "stoppen", "stoppst", "stoppt", "stoppte", "gestoppt",
        "stopp", "stop", "stops", "stopping", "stopped",
        "verhindere", "verhindern", "verhinderst", "verhindert", "verhinderte",
        "beende", "beenden", "beendest", "beendet", "beendete"
    ],
    öffne: [
        "öffne", "öffnen", "öffnest", "öffnet", "öffnete", "geöffnet",
        "open", "opens", "opening", "opened",
        "oeffne", "oeffnen", "oeffnest", "oeffnet", // Umlaut-Varianten
        "aufmachen", "aufmachst", "aufmacht", "mach auf", "mache auf"
    ],
};

// Simple similarity check - checks if strings are similar (for typos)
function areSimilar(str1: string, str2: string, threshold: number = 0.7): boolean {
    if (!str1 || !str2) return false;
    if (str1 === str2) return true;
    
    // Normalize both strings for comparison
    const n1 = normalizeCommand(str1);
    const n2 = normalizeCommand(str2);
    if (n1 === n2) return true;
    
    // Check if one contains the other (for partial matches)
    if (n1.includes(n2) || n2.includes(n1)) return true;
    
    // Length check - if too different, likely not similar
    const lengthDiff = Math.abs(n1.length - n2.length);
    if (lengthDiff > Math.max(n1.length, n2.length) * 0.5) return false;
    
    // Simple character overlap check (improved)
    const longer = n1.length > n2.length ? n1 : n2;
    const shorter = n1.length > n2.length ? n2 : n1;
    
    // Check for common prefix/suffix
    if (longer.startsWith(shorter.substring(0, Math.min(3, shorter.length)))) return true;
    if (longer.endsWith(shorter.substring(Math.max(0, shorter.length - 3)))) return true;
    
    // Character-by-character similarity
    let matches = 0;
    const shorterChars = shorter.split("");
    const longerChars = longer.split("");
    
    for (const char of shorterChars) {
        if (longerChars.includes(char)) matches++;
    }
    
    const similarity = matches / Math.max(shorter.length, 1);
    return similarity >= threshold;
}

// Normalize command: lowercase, remove articles, trim, handle umlauts
export function normalizeCommand(input: string): string {
    return input
        .toLowerCase()
        .trim()
        // Normalize umlauts (accept both ö and oe, etc.) - but keep original for matching
        // We'll handle both formats
        .replace(/ö/g, "oe")
        .replace(/ä/g, "ae")
        .replace(/ü/g, "ue")
        .replace(/ß/g, "ss")
        // Remove punctuation that might interfere
        .replace(/[.,!?;:]/g, " ")
        // Remove articles and common words
        .replace(/\b(das|die|der|ein|eine|einen|einem|einer|dem|den|des)\b/g, " ")
        .replace(/(\d+)\./g, "$1") // Normalize "1." -> "1", "2." -> "2"
        .replace(/\b(eins|erstes|erste|erst|erster)\b/g, "1")
        .replace(/\b(zwei|zweites|zweite|zweit|zweiter)\b/g, "2")
        .replace(/\b(drei|drittes|dritte|dritt|dritter)\b/g, "3")
        .replace(/\b(vier|viertes|vierte|viert|vierter)\b/g, "4")
        .replace(/\b(fünf|fünftes|fünfte|fünft|fünfter)\b/g, "5")
        .replace(/\s+/g, " ") // Normalize whitespace
        .trim();
}

// Find base command from synonyms with fuzzy matching
function findBaseCommand(word: string): string | null {
    const normalizedWord = normalizeCommand(word);
    
    // Direct match
    if (COMMAND_SYNONYMS[normalizedWord]) {
        return normalizedWord;
    }

    // Check synonyms (exact match)
    for (const [baseCommand, synonyms] of Object.entries(COMMAND_SYNONYMS)) {
        if (synonyms.includes(normalizedWord)) {
            return baseCommand;
        }
    }

    // Fuzzy matching: check if word is similar to any base command or synonym
    for (const [baseCommand, synonyms] of Object.entries(COMMAND_SYNONYMS)) {
        // Check base command
        if (areSimilar(normalizedWord, baseCommand, 0.6)) {
            return baseCommand;
        }
        
        // Check synonyms
        for (const synonym of synonyms) {
            if (areSimilar(normalizedWord, synonym, 0.6)) {
                return baseCommand;
            }
        }
    }

    return null;
}

// Common German stop words to ignore (erweitert)
const STOP_WORDS = new Set([
    "das", "die", "der", "ein", "eine", "einen", "einem", "einer",
    "und", "oder", "mit", "von", "zu", "auf", "in", "an", "für",
    "ist", "sind", "war", "waren", "wird", "werden",
    "ich", "du", "er", "sie", "es", "wir", "ihr",
    "bitte", "danke", "vielleicht", "möglicherweise",
    "mal", "doch", "auch", "noch", "schon", "nur", "nicht", "kein",
    "mir", "mich", "dir", "dich", "ihm", "ihn", "ihr", "ihnen",
    "mein", "meine", "dein", "deine", "sein", "seine", "ihr", "ihre",
    "dem", "den", "des", "deren", "dessen"
]);

// Tokenize and filter stop words
function tokenize(input: string): string[] {
    return input
        .toLowerCase()
        .split(/\s+/)
        .filter(word => word.length > 0 && !STOP_WORDS.has(word));
}

// Parse command with flexible matching
export function parseCommand(input: string): { success: boolean; command: Command | null; error?: string; suggestions?: string[] } {
    if (!input || !input.trim()) {
        return {
            success: false,
            command: null,
            error: "Bitte gib einen Befehl ein.",
            suggestions: ["schaue", "hilfe"]
        };
    }

    const normalized = normalizeCommand(input);
    const tokens = tokenize(normalized);

    if (tokens.length === 0) {
        return {
            success: false,
            command: null,
            error: "Bitte gib einen Befehl ein.",
            suggestions: ["schaue", "hilfe"]
        };
    }

    // Try to find command type - check all tokens, not just first two
    let commandType: string | null = null;
    let commandIndex = -1;

    // Check all tokens for command words (prioritize earlier tokens)
    for (let i = 0; i < Math.min(tokens.length, 3); i++) {
        const base = findBaseCommand(tokens[i]);
        if (base) {
            commandType = base;
            commandIndex = i;
            break;
        }
    }

    // If no command found in tokens, try substring matching in normalized input
    if (!commandType) {
        // Check all base commands and their synonyms in the normalized string
        for (const [baseCommand, synonyms] of Object.entries(COMMAND_SYNONYMS)) {
            const allVariants = [baseCommand, ...synonyms];
            
            for (const variant of allVariants) {
                const normalizedVariant = normalizeCommand(variant);
                // Check if normalized input contains this variant
                if (normalized.includes(normalizedVariant)) {
                    commandType = baseCommand;
                    commandIndex = normalized.indexOf(normalizedVariant);
                    break;
                }
            }
            
            if (commandType) break;
        }
    }

    if (!commandType) {
        // Even if we don't recognize the command type, create a command object
        // so that matchCommand can try raw string matching
        // This allows commands like "betrete halle" to work even if "betrete" isn't in synonyms
        commandType = "unknown";
        commandIndex = 0;
    }

    // Extract target (everything except command word) - flexibler
    let target: string | undefined;
    let modifier: string | undefined;

    if (commandType === "unknown") {
        // For unknown commands, try to extract target from remaining tokens
        // This helps with commands like "betrete halle" where "betrete" isn't recognized
        if (tokens.length > 1) {
            target = tokens.slice(1).join(" ");
        } else {
            // Try to extract from normalized string if no tokens remain
            target = normalized;
        }
    } else if (commandIndex === 0) {
        // Command is first: "nimm schwert" or "nimm das schwert"
        const remainingTokens = tokens.slice(1);
        if (remainingTokens.length > 0) {
            // Check for modifiers
            const firstRemaining = remainingTokens[0];
            if (firstRemaining === "alle" || firstRemaining === "all") {
                modifier = "alle";
                target = remainingTokens.slice(1).join(" ");
            } else if (firstRemaining === "erstes" || firstRemaining === "erste" || firstRemaining === "erst" || firstRemaining === "1") {
                modifier = "erstes";
                target = remainingTokens.slice(1).join(" ");
            } else if (firstRemaining === "zweites" || firstRemaining === "zweite" || firstRemaining === "zweit" || firstRemaining === "2") {
                modifier = "zweites";
                target = remainingTokens.slice(1).join(" ");
            } else if (firstRemaining === "drittes" || firstRemaining === "dritte" || firstRemaining === "dritt" || firstRemaining === "3") {
                modifier = "drittes";
                target = remainingTokens.slice(1).join(" ");
            } else {
                target = remainingTokens.join(" ");
            }
        }
    } else if (commandIndex === 1) {
        // Command is second: "schwert nehmen"
        target = tokens[0];
        // Also check tokens after command
        if (tokens.length > 2) {
            target = tokens[0] + " " + tokens.slice(2).join(" ");
        }
    } else {
        // Command found elsewhere, extract surrounding context
        const beforeCommand = tokens.slice(0, commandIndex);
        const afterCommand = tokens.slice(commandIndex + 1);
        target = [...beforeCommand, ...afterCommand].join(" ");
    }
    
    // Fallback: if no target found but we have a command, try to extract from normalized string
    if (!target && commandType !== "unknown" && commandType !== "hilfe" && commandType !== "status" && commandType !== "inventar") {
        // Try to find target by removing command word from normalized string
        const commandWord = tokens[commandIndex] || "";
        const withoutCommand = normalized.replace(new RegExp(`\\b${commandWord}\\b`, "gi"), "").trim();
        if (withoutCommand && withoutCommand !== normalized) {
            target = withoutCommand;
        }
    }

    // Handle special cases
    if (commandType === "sprich" && target) {
        // "sprich fee" -> target is "fee"
        // Normalize NPC names
        if (target.includes("fee") || target.includes("struktura")) {
            target = "fee";
        }
    }

    // Handle "richte auf" commands
    if (commandType === "richte_auf" && target) {
        // "richte rüstung auf" -> target is "rüstung"
        if (target.includes("rüstung") || target.includes("armor")) {
            target = "rüstung";
        }
    }

    // Handle number suffixes in target (e.g., "schwert 1", "rüstung 2")
    // Also handle leading numbers found in target due to normalization (e.g. "3 schwert")
    if (target) {
        const numberMatchEnd = target.match(/(\d+)$/);
        const numberMatchStart = target.match(/^(\d+)/);

        if (numberMatchEnd) {
            modifier = numberMatchEnd[1];
            target = target.replace(/\s*\d+$/, "").trim();
        } else if (numberMatchStart) {
            modifier = numberMatchStart[1];
            target = target.replace(/^\d+\s*/, "").trim();
        }
    }

    const parsedCommand = {
        type: commandType,
        target: target || undefined,
        modifier: modifier || undefined,
        raw: input
    };

    console.log("🔍 [CommandParser] Befehl geparst:", {
        input,
        normalized,
        tokens,
        commandType,
        target: parsedCommand.target,
        modifier: parsedCommand.modifier,
        success: true
    });

    return {
        success: true,
        command: parsedCommand
    };
}

// Generate command suggestions based on input
function generateSuggestions(input: string): string[] {
    const suggestions: string[] = [];
    const inputLower = input.toLowerCase();

    // Check for similar commands
    const allCommands = Object.keys(COMMAND_SYNONYMS);
    for (const cmd of allCommands) {
        if (cmd.includes(inputLower) || inputLower.includes(cmd)) {
            suggestions.push(cmd);
        }
    }

    // Add common commands if no matches
    if (suggestions.length === 0) {
        suggestions.push("schaue", "hilfe", "nimm", "sprich");
    }

    return suggestions.slice(0, 4);
}

// Match command against transition pattern
export function matchCommand(command: Command, pattern: string | string[]): boolean {
    const patterns = Array.isArray(pattern) ? pattern : [pattern];

    for (const pat of patterns) {
        // Normalize pattern
        const normalizedPattern = normalizeCommand(pat);
        const normalizedCommand = normalizeCommand(command.raw);

        // First check: raw command matching (most flexible)
        // Check if normalized command contains pattern or vice versa
        const rawMatch = normalizedCommand.includes(normalizedPattern) || normalizedPattern.includes(normalizedCommand);
        if (rawMatch) {
            console.log("✅ [MatchCommand] Raw-String Match gefunden:", {
                command: command.raw,
                pattern: pat,
                normalizedCommand,
                normalizedPattern
            });
            return true;
        }

        // Second check: token-based matching
        const patternTokens = tokenize(normalizedPattern);
        const commandTokens = tokenize(normalizedCommand);

        // Check if command type matches (with fuzzy matching)
        const patternCommandType = findBaseCommand(patternTokens[0]);
        const commandTypeMatch = patternCommandType && (
            patternCommandType === command.type ||
            areSimilar(patternCommandType, command.type, 0.7)
        );
        
        if (commandTypeMatch) {
            // Check target if pattern has one
            if (patternTokens.length > 1) {
                const patternTarget = normalizeCommand(patternTokens.slice(1).join(" "));
                if (command.target) {
                    const normalizedCommandTarget = normalizeCommand(command.target);
                    // Enhanced fuzzy match: check multiple matching strategies
                    const targetMatch =
                        normalizedCommandTarget === patternTarget ||
                        normalizedCommandTarget.includes(patternTarget) ||
                        patternTarget.includes(normalizedCommandTarget) ||
                        areSimilar(normalizedCommandTarget, patternTarget, 0.6);

                    if (targetMatch) {
                        console.log("✅ [MatchCommand] Token-basiertes Match gefunden:", {
                            command: command.raw,
                            pattern: pat,
                            commandType: command.type,
                            patternCommandType,
                            commandTarget: command.target,
                            patternTarget
                        });
                        return true;
                    }
                } else {
                    // Pattern expects target but command doesn't have one
                    // Try to extract target from remaining tokens
                    const remainingCommandTokens = commandTokens.slice(1);
                    if (remainingCommandTokens.length > 0) {
                        const commandTarget = normalizeCommand(remainingCommandTokens.join(" "));
                        const extractedTargetMatch =
                            commandTarget === patternTarget ||
                            commandTarget.includes(patternTarget) ||
                            patternTarget.includes(commandTarget) ||
                            areSimilar(commandTarget, patternTarget, 0.6);

                        if (extractedTargetMatch) {
                            console.log("✅ [MatchCommand] Extrahierter Target-Match gefunden:", {
                                command: command.raw,
                                pattern: pat,
                                extractedTarget: commandTarget,
                                patternTarget
                            });
                            return true;
                        }
                    }
                    // Also check if pattern target might be in raw command
                    if (normalizedCommand.includes(patternTarget)) {
                        console.log("✅ [MatchCommand] Target im Raw-Command gefunden:", {
                            command: command.raw,
                            pattern: pat,
                            patternTarget
                        });
                        return true;
                    }
                    continue;
                }
            } else {
                // Pattern is just command type, no target
                console.log("✅ [MatchCommand] Command-Type Match gefunden:", {
                    command: command.raw,
                    pattern: pat,
                    commandType: command.type,
                    patternCommandType
                });
                return true;
            }
        }
    }

    console.log("❌ [MatchCommand] Kein Match gefunden:", {
        command: command.raw,
        commandType: command.type,
        target: command.target,
        patterns: patterns
    });
    return false;
}
