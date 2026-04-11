// The 12 notes in western music, in order.
// We use sharps only (C# instead of Db) to keep the code simple.
export const CHROMATIC_SCALE = [
    "C", "C#", "D", "D#", "E", "F",
    "F#", "G", "G#", "A", "A#", "B"
] as const;

export type Note = typeof CHROMATIC_SCALE[number];

// The standard guitar tuning — the open note on each string.
// Index 0 = thickest string (low E), index 5 = thinnest string (high e).
export const STANDARD_TUNING: Note[] = ["E", "A", "D", "G", "B", "E"];

/**
 * 
 * @param openNote - The note the string is open on.
 * @param fret - The fret number.
 * @returns The note at the given fret.
 */
export function getNoteAtFret(openNote: Note, fret: number): Note {
    const openIndex = CHROMATIC_SCALE.indexOf(openNote);
    const noteIndex = (openIndex + fret) % 12;
    return CHROMATIC_SCALE[noteIndex];
}