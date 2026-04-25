import guitarData from "@tombatossals/chords-db/lib/guitar.json";

export interface GuitarChordPosition {
  frets: number[];
  fingers: number[];
  baseFret: number;
  barres: number[];
  capo?: boolean;
}

export interface GuitarChordBox {
  chord: string;
  key: string;
  suffix: string;
  position: GuitarChordPosition;
}

interface GuitarChordDefinition {
  key: string;
  suffix: string;
  positions: GuitarChordPosition[];
}

interface GuitarChordDatabase {
  keys: string[];
  suffixes: string[];
  chords: Record<string, GuitarChordDefinition[]>;
}

const guitar = guitarData as GuitarChordDatabase;

const ROOT_TO_DB_KEY: Record<string, string> = {
  "A#": "Bb",
  "C#": "Csharp",
  Db: "Csharp",
  "D#": "Eb",
  "F#": "Fsharp",
  Gb: "Fsharp",
  "G#": "Ab",
};

const SUFFIX_ALIASES: Record<string, string> = {
  "": "major",
  M: "major",
  maj: "major",
  m: "minor",
  min: "minor",
  "+": "aug",
};

const SUFFIX_FALLBACKS: Record<string, string[]> = {
  maj7: ["major"],
  "maj7#11": ["maj7", "major"],
  maj9: ["maj7", "major"],
  maj11: ["maj7", "major"],
  maj13: ["maj7", "major"],
  m9: ["m7", "minor"],
  m11: ["m7", "minor"],
  m13: ["m7", "minor"],
  "7b9": ["7", "major"],
  "7#9": ["7", "major"],
  "9#11": ["9", "7", "major"],
  add9: ["major"],
  madd9: ["minor"],
};

export function parseGuitarChordSymbol(
  chordName: string,
): { root: string; suffix: string } | null {
  const match = chordName.trim().match(/^([A-G])([#b]?)(.*)$/);
  if (!match) {
    return null;
  }

  return {
    root: match[1] + match[2],
    suffix: match[3],
  };
}

function toDatabaseKey(root: string): string {
  return ROOT_TO_DB_KEY[root] ?? root;
}

function toDatabaseSuffix(suffix: string): string {
  return SUFFIX_ALIASES[suffix] ?? suffix;
}

function suffixCandidates(suffix: string): string[] {
  const databaseSuffix = toDatabaseSuffix(suffix);
  return [databaseSuffix, ...(SUFFIX_FALLBACKS[databaseSuffix] ?? [])];
}

export function getGuitarChordBox(chordName: string): GuitarChordBox | null {
  const parsed = parseGuitarChordSymbol(chordName);
  if (!parsed) {
    return null;
  }

  const key = toDatabaseKey(parsed.root);
  const chordDefinitions = guitar.chords[key];
  if (!chordDefinitions) {
    return null;
  }

  for (const suffix of suffixCandidates(parsed.suffix)) {
    const chord = chordDefinitions.find(
      (definition) => definition.suffix === suffix,
    );
    const position = chord?.positions[0];

    if (position) {
      return {
        chord: chordName,
        key,
        suffix,
        position,
      };
    }
  }

  return null;
}
