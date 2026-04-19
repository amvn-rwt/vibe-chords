import { describe, expect, it } from "vitest";
import { getNoteAtFret, CHROMATIC_SCALE, STANDARD_TUNING } from "./notes";

// Tests for the CHROMATIC_SCALE constant, representing the 12-note chromatic scale using sharps.
describe("CHROMATIC_SCALE", () => {
    // There should be 12 notes in the chromatic scale.
    it("should have 12 notes", () => {
        expect(CHROMATIC_SCALE).toHaveLength(12);
    });

    // The chromatic scale should start with "C" and end with "B" (0-based index).
    it("should start with C and end with B", () => {
        expect(CHROMATIC_SCALE[0]).toBe("C");
        expect(CHROMATIC_SCALE[11]).toBe("B");
    });
});

// Tests for the STANDARD_TUNING constant, which represents standard guitar tuning.
describe("STANDARD_TUNING", () => {
    // STANDARD_TUNING should be an array of 6 notes (6 guitar strings)
    it("should have 6 notes", () => {
        expect(STANDARD_TUNING).toHaveLength(6);
    });

    // The first string (low E, index 0) and last string (high E, index 5) should both be "E"
    it("should start with E and end with E", () => {
        expect(STANDARD_TUNING[0]).toBe("E"); // Thickest string (low E)
        expect(STANDARD_TUNING[5]).toBe("E"); // Thinnest string (high e)
    });

    // The full standard tuning should match: E, A, D, G, B, E
    it("should have the correct notes", () => {
        expect(STANDARD_TUNING[0]).toBe("E"); // 6th string (lowest)
        expect(STANDARD_TUNING[1]).toBe("A"); // 5th string
        expect(STANDARD_TUNING[2]).toBe("D"); // 4th string
        expect(STANDARD_TUNING[3]).toBe("G"); // 3rd string
        expect(STANDARD_TUNING[4]).toBe("B"); // 2nd string
        expect(STANDARD_TUNING[5]).toBe("E"); // 1st string (highest)
    });
});

describe("getNoteAtFret", () => {
    it("returns the open note when fret is 0", () => {
        expect(getNoteAtFret("E", 0)).toBe("E");
        expect(getNoteAtFret("A", 0)).toBe("A");
        // fret 0 = open string = the note itself, always
    });

    it("returns F on fret 1 of E string", () => {
        expect(getNoteAtFret("E", 1)).toBe("F");
        // E → one semitone up → F
        // a semitone is just one step in the chromatic scale
    });

    it("returns G on fret 3 of E string", () => {
        expect(getNoteAtFret("E", 3)).toBe("G");
        // classic: fret 3 low E = G, every guitarist knows this
    });

    it("wraps around correctly past B", () => {
        expect(getNoteAtFret("B", 1)).toBe("C");
        expect(getNoteAtFret("B", 2)).toBe("C#");
        // B is the last note — one step up wraps back to C
        // this tests the % 12 modulo logic
    });

    it("handles higher fret numbers", () => {
        expect(getNoteAtFret("E", 12)).toBe("E");
        // fret 12 is always the same note as the open string
        // because 12 semitones = one full octave
        expect(getNoteAtFret("A", 7)).toBe("E");
        // classic: fret 7 on A string = E
    });
});
