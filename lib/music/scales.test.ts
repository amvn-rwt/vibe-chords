import { describe, expect, it } from "vitest";
import { SCALES, SCALE_NAMES } from "./scales";

describe("SCALES", () => {
    it("contains all 5 scale types", () => {
        expect(SCALE_NAMES).toHaveLength(5);
    });

    it("major scale intervals are correct", () => {
        expect(SCALES.major).toEqual([0, 2, 4, 5, 7, 9, 11]);
    });

    it("minor scale intervals are correct", () => {
        expect(SCALES.minor).toEqual([0, 2, 3, 5, 7, 8, 10]);
    });

    it("pentatonic major scale intervals are correct", () => {
        expect(SCALES.pentatonic_major).toEqual([0, 2, 4, 7, 9]);
    });

    it("pentatonic minor scale intervals are correct", () => {
        expect(SCALES.pentatonic_minor).toEqual([0, 3, 5, 7, 10]);
    });

    it("dorian scale intervals are correct", () => {
        expect(SCALES.dorian).toEqual([0, 2, 3, 5, 7, 9, 10]);
    });
});

describe("SCALE_NAMES", () => {
    it("is an array of all 5 scale types", () => {
        expect(Array.isArray(SCALE_NAMES)).toBe(true);
    });

    it("includes major", () => {
        expect(SCALE_NAMES).toContain("major");
    });

    it("includes minor", () => {
        expect(SCALE_NAMES).toContain("minor");
    });

    it("includes pentatonic_major", () => {
        expect(SCALE_NAMES).toContain("pentatonic_major");
    });

    it("includes pentatonic_minor", () => {
        expect(SCALE_NAMES).toContain("pentatonic_minor");
    });

    it("includes dorian", () => {
        expect(SCALE_NAMES).toContain("dorian");
    });
});
