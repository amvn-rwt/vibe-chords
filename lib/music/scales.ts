// A scale is defined by its intervals - the gaps between the notes.

// Intervals are measured in semitones.
// A semitone is one step in the chromatic scale — the smallest gap between two notes.
// Example: C to C# = 1 semitone. C to D = 2 semitones.

export type ScaleType =
    | "major"
    | "minor"
    | "pentatonic_major"
    | "pentatonic_minor"
    | "dorian";

// Each scale is an array of intervals from the root note.
// The root note itself is always 0 (no distance from itself).
//
// Example — Major scale intervals: 0, 2, 4, 5, 7, 9, 11
// Starting on C: C(0) D(2) E(4) F(5) G(7) A(9) B(11)
// Those numbers are how many semitones each note is above the root.

export const SCALES: Record<ScaleType, number[]> = {
    major: [0, 2, 4, 5, 7, 9, 11],
    minor: [0, 2, 3, 5, 7, 8, 10],
    pentatonic_major: [0, 2, 4, 7, 9],
    pentatonic_minor: [0, 3, 5, 7, 10],
    dorian: [0, 2, 3, 5, 7, 9, 10],
};

export const SCALE_NAMES = Object.keys(SCALES) as ScaleType[];
