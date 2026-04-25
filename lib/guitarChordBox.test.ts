import { describe, expect, it } from "vitest";
import { getGuitarChordBox, parseGuitarChordSymbol } from "./guitarChordBox";

describe("parseGuitarChordSymbol", () => {
  it("parses root notes and suffixes", () => {
    expect(parseGuitarChordSymbol("C")).toEqual({ root: "C", suffix: "" });
    expect(parseGuitarChordSymbol("Bbmaj7")).toEqual({
      root: "Bb",
      suffix: "maj7",
    });
    expect(parseGuitarChordSymbol("F#m7b5")).toEqual({
      root: "F#",
      suffix: "m7b5",
    });
  });
});

describe("getGuitarChordBox", () => {
  it("finds common major and minor chords", () => {
    expect(getGuitarChordBox("C")?.suffix).toBe("major");
    expect(getGuitarChordBox("Am")?.suffix).toBe("minor");
  });

  it("normalizes roots to keys used by chords-db", () => {
    expect(getGuitarChordBox("A#")?.key).toBe("Bb");
    expect(getGuitarChordBox("D#m")?.key).toBe("Eb");
    expect(getGuitarChordBox("Dbmaj7")?.key).toBe("Csharp");
  });

  it("finds generated extended chords when available", () => {
    expect(getGuitarChordBox("Cm9")?.suffix).toBe("m9");
    expect(getGuitarChordBox("Fm11")?.suffix).toBe("m11");
    expect(getGuitarChordBox("G7b9")?.suffix).toBe("7b9");
    expect(getGuitarChordBox("Dm7b5")?.suffix).toBe("m7b5");
  });

  it("falls back to simpler playable shapes for unsupported suffixes", () => {
    const chordBox = getGuitarChordBox("Abmaj7#11");

    expect(chordBox?.key).toBe("Ab");
    expect(chordBox?.suffix).toBe("maj7");
    expect(chordBox?.position.frets).toHaveLength(6);
  });

  it("returns null for invalid chord symbols", () => {
    expect(getGuitarChordBox("not a chord")).toBeNull();
  });
});
