import { Command } from "@/types/game";

// Command synonyms mapping
const COMMAND_SYNONYMS: Record<string, string[]> = {
    schaue: ["schau", "guck", "betrachte", "untersuche", "ansehen", "look", "examine"],
    nimm: ["nehme", "hole", "greife", "sammle", "pick", "take", "grab"],
    gehe: ["geh", "lauf", "bewege", "go", "move", "walk", "betrete"],
    räume_auf: ["sortiere", "ordne", "clean", "aufräumen", "organisiere"],
    sprich: ["rede", "talk", "spreche", "unterhalte", "sage"],
    hilfe: ["help", "tipp", "hinweis", "?", "h"],
    inventar: ["inv", "i", "tasche", "items", "inventory"],
    status: ["fortschritt", "stats", "progress", "stat"],
    richte_auf: ["richte", "stelle", "aufstellen", "erhebe", "errichte"],
    sortiere: ["ordne", "organisiere", "kategorisiere"],
    neutralisiere: ["neutralisiere", "stoppe", "verhindere", "stopp"],
    öffne: ["öffne", "open", "oeffne"],
};

// Normalize command: lowercase, remove articles, trim
export function normalizeCommand(input: string): string {
    return input
        .toLowerCase()
        .trim()
        .replace(/\b(das|die|der|ein|eine|einen|einem|einer)\b/g, "") // Remove articles
        .replace(/(\d+)\./g, "$1") // Normalize "1." -> "1", "2." -> "2"
        .replace(/\b(eins|erstes|erste|erst)\b/g, "1")
        .replace(/\b(zwei|zweites|zweite|zweit)\b/g, "2")
        .replace(/\b(drei|drittes|dritte|dritt)\b/g, "3")
        .replace(/\s+/g, " ") // Normalize whitespace
        .trim();
}

// Find base command from synonyms
function findBaseCommand(word: string): string | null {
    // Direct match
    if (COMMAND_SYNONYMS[word]) {
        return word;
    }

    // Check synonyms
    for (const [baseCommand, synonyms] of Object.entries(COMMAND_SYNONYMS)) {
        if (synonyms.includes(word)) {
            return baseCommand;
        }
    }

    return null;
}

// Common German stop words to ignore
const STOP_WORDS = new Set([
    "das", "die", "der", "ein", "eine", "einen", "einem", "einer",
    "und", "oder", "mit", "von", "zu", "auf", "in", "an", "für",
    "ist", "sind", "war", "waren", "wird", "werden",
    "ich", "du", "er", "sie", "es", "wir", "ihr",
    "bitte", "danke", "bitte", "vielleicht", "möglicherweise"
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

    // Try to find command type
    let commandType: string | null = null;
    let commandIndex = -1;

    // Check first token
    const firstBase = findBaseCommand(tokens[0]);
    if (firstBase) {
        commandType = firstBase;
        commandIndex = 0;
    } else {
        // Check second token (for "schwert nehmen" pattern)
        if (tokens.length > 1) {
            const secondBase = findBaseCommand(tokens[1]);
            if (secondBase) {
                commandType = secondBase;
                commandIndex = 1;
            }
        }
    }

    // If no command found, try common patterns
    if (!commandType) {
        // Check for "nimm" variations
        if (normalized.includes("nimm") || normalized.includes("nehme") || normalized.includes("hole")) {
            commandType = "nimm";
            commandIndex = normalized.indexOf("nimm") >= 0 ? normalized.indexOf("nimm") : normalized.indexOf("nehme") >= 0 ? normalized.indexOf("nehme") : normalized.indexOf("hole");
        } else if (normalized.includes("schaue") || normalized.includes("schau") || normalized.includes("guck")) {
            commandType = "schaue";
        } else if (normalized.includes("sprich") || normalized.includes("rede")) {
            commandType = "sprich";
        } else if (normalized.includes("hilfe") || normalized.includes("help")) {
            commandType = "hilfe";
        } else if (normalized.includes("richte") || normalized.includes("stelle") || normalized.includes("aufstellen")) {
            commandType = "richte_auf";
        } else if (normalized.includes("sortiere") || normalized.includes("ordne")) {
            commandType = "sortiere";
        } else if (normalized.includes("gehe") || normalized.includes("geh") || normalized.includes("betrete") || normalized.includes("hinein")) {
            commandType = "gehe";
        } else if (normalized.includes("öffne") || normalized.includes("oeffne") || normalized.includes("open")) {
            commandType = "öffne";
        }
    }

    if (!commandType) {
        // Even if we don't recognize the command type, create a command object
        // so that matchCommand can try raw string matching
        // This allows commands like "betrete halle" to work even if "betrete" isn't in synonyms
        commandType = "unknown";
        commandIndex = 0;
    }

    // Extract target (everything except command word)
    let target: string | undefined;
    let modifier: string | undefined;

    if (commandType === "unknown") {
        // For unknown commands, try to extract target from remaining tokens
        // This helps with commands like "betrete halle" where "betrete" isn't recognized
        if (tokens.length > 1) {
            target = tokens.slice(1).join(" ");
        }
    } else if (commandIndex === 0) {
        // Command is first: "nimm schwert" or "nimm das schwert"
        const remainingTokens = tokens.slice(1);
        if (remainingTokens.length > 0) {
            // Check for modifiers
            if (remainingTokens[0] === "alle" || remainingTokens[0] === "all") {
                modifier = "alle";
                target = remainingTokens.slice(1).join(" ");
            } else if (remainingTokens[0] === "erstes" || remainingTokens[0] === "erste" || remainingTokens[0] === "erst") {
                modifier = "erstes";
                target = remainingTokens.slice(1).join(" ");
            } else if (remainingTokens[0] === "zweites" || remainingTokens[0] === "zweite" || remainingTokens[0] === "zweit") {
                modifier = "zweites";
                target = remainingTokens.slice(1).join(" ");
            } else if (remainingTokens[0] === "drittes" || remainingTokens[0] === "dritte" || remainingTokens[0] === "dritt") {
                modifier = "drittes";
                target = remainingTokens.slice(1).join(" ");
            } else {
                target = remainingTokens.join(" ");
            }
        }
    } else if (commandIndex === 1) {
        // Command is second: "schwert nehmen"
        target = tokens[0];
    } else {
        // Command found elsewhere, extract surrounding context
        const beforeCommand = tokens.slice(0, commandIndex);
        const afterCommand = tokens.slice(commandIndex + 1);
        target = [...beforeCommand, ...afterCommand].join(" ");
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

        // Check if command type matches
        const patternCommandType = findBaseCommand(patternTokens[0]);
        if (patternCommandType && patternCommandType === command.type) {
            // Check target if pattern has one
            if (patternTokens.length > 1) {
                const patternTarget = patternTokens.slice(1).join(" ");
                if (command.target) {
                    // Fuzzy match: check if target contains pattern target or vice versa
                    const targetMatch =
                        command.target.includes(patternTarget) ||
                        patternTarget.includes(command.target) ||
                        command.target === patternTarget;

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
                        const commandTarget = remainingCommandTokens.join(" ");
                        const extractedTargetMatch =
                            commandTarget.includes(patternTarget) ||
                            patternTarget.includes(commandTarget);

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
