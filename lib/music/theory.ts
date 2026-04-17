import { CHROMATIC_SCALE, Note } from "./notes";
import { SCALES, ScaleType } from "./scales";

/**
 *
 * @param root - The root note of the scale.
 * @param scale - The type of scale to get the notes for.
 * @returns {Note[]} An array of notes in the scale.
 */
export function getScaleNotes(root: Note, scale: ScaleType): Note[] {
    const rootIndex = CHROMATIC_SCALE.indexOf(root);
    const intervals = SCALES[scale];
    const notes = intervals.map((interval) => {
        return CHROMATIC_SCALE[(rootIndex + interval) % 12];
    });
    return notes;
}
