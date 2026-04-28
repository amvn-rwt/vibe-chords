// A single chord — root note, quality, and the individual notes that make it up.
// `notes` are in scientific pitch notation: "C4", "E4", "G4".
export type ChordData = {
    root: string
    quality: string
    notes: string[]
    // Human-readable label shown in the UI, e.g. "Cmaj7", "Am", "G7"
    label: string
}

// A chord progression is an ordered list of chords with a shared key and scale.
export type Progression = {
    id: string
    chords: ChordData[]
    key: string
    // e.g. "major", "minor", "dorian"
    scale: string
    // The original prompt the user typed to generate this progression
    prompt: string
    createdAt: number
}

// State the playback engine tracks per-progression.
export type PlaybackState = "idle" | "playing" | "paused"

// What the AI API route returns — validated before entering the store.
export type GenerateResponse = {
    progression: Progression
}

// Payload sent to the AI API route.
export type GenerateRequest = {
    prompt: string
}
