import { describe, expect, it } from "vitest";
import { getScaleNotes } from "./theory";

describe("getScaleNotes", () => {
    it("return C Major correctly", () => {
        const notes = getScaleNotes("C", "major");
        expect(notes).toEqual(["C", "D", "E", "F", "G", "A", "B"]);
    });

    it("return A Minor correctly", () => {
        const notes = getScaleNotes("A", "minor");
        expect(notes).toEqual(["A", "B", "C", "D", "E", "F", "G"]);
    });

    it("return A Pentatonic Minor correctly", () => {
        const notes = getScaleNotes("A", "pentatonic_minor");
        expect(notes).toEqual(["A", "C", "D", "E", "G"]);
    });

    it("always includes the root note as first note", () => {
        expect(getScaleNotes("F", "major")[0]).toBe("F");
        expect(getScaleNotes("G", "minor")[0]).toBe("G");
        expect(getScaleNotes("D", "dorian")[0]).toBe("D");
    });

    it("returns correct number of notes per scale type", () => {
        expect(getScaleNotes("C", "major")).toHaveLength(7);
        expect(getScaleNotes("C", "minor")).toHaveLength(7);
        expect(getScaleNotes("C", "dorian")).toHaveLength(7);
        expect(getScaleNotes("C", "pentatonic_major")).toHaveLength(5);
        expect(getScaleNotes("C", "pentatonic_minor")).toHaveLength(5);
    });

    it("handles root notes that cause wrapping", () => {
        expect(getScaleNotes("G", "major")).toEqual([
            "G",
            "A",
            "B",
            "C",
            "D",
            "E",
            "F#",
        ]);
    });
});
