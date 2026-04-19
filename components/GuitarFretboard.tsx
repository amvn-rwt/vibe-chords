import { getNoteAtFret, STANDARD_TUNING, Note } from "@/lib/music/notes";

interface GuitarFretboardProps {
    activeNotes: Note[];
    fretCount?: number;
}

export default function GuitarFretboard({
    activeNotes,
    fretCount = 12,
    // default value of 12 — one full octave, standard for theory visualizers
}: GuitarFretboardProps) {
    // Render high E at top, low E at bottom (player view: thick string = bottom).
    // STANDARD_TUNING is low→high pitch; reverse so bottom-to-top reads E, A, D, G, B, E.
    const strings = [...STANDARD_TUNING].reverse();

    const frets = Array.from({ length: fretCount + 1 }, (_, i) => i);
    // Array.from() creates an array from a description.
    // { length: 13 } means "make an array with 13 slots"
    // (_, i) => i fills each slot with its index: [0, 1, 2, 3...12]
    // We do fretCount + 1 to include fret 0 (the open string)

    const isNoteActive = (openNote: Note, fret: number): boolean => {
        const note = getNoteAtFret(openNote, fret);
        return activeNotes.includes(note);
        // includes() checks if the note exists anywhere in activeNotes array
        // returns true or false — used to decide whether to highlight this fret
    };

    const isRootNote = (openNote: Note, fret: number): boolean => {
        const note = getNoteAtFret(openNote, fret);
        return note === activeNotes[0];
        // activeNotes[0] is always the root — we defined that in theory.ts
        // Root notes get a different color so they stand out on the fretboard
    };

    // Fret marker positions — the dots you see on a real guitar neck.
    // These are purely visual landmarks to help with orientation.
    const FRET_MARKERS = [3, 5, 7, 9, 12];

    return (
        <div className="w-full overflow-x-auto">
            {/* overflow-x-auto adds horizontal scroll on small screens
          so the fretboard never gets crushed on mobile */}

            <div className="min-w-[600px] p-4">
                {/* min-w-[600px] — the fretboard needs at least 600px to be readable.
            On smaller screens, the overflow-x-auto above handles the scroll. */}

                {/* Fret numbers row */}
                <div className="flex mb-2">
                    <div className="w-8" />
                    {/* Empty space to align with string name labels on the left */}

                    {frets.map((fret) => (
                        <div
                            key={fret}
                            className="flex-1 text-center text-xs text-muted-foreground"
                        >
                            {fret === 0 ? "" : fret}
                            {/* fret 0 is the open string — no number needed */}
                        </div>
                    ))}
                </div>

                {/* Strings — one row per string */}
                {strings.map((openNote, stringIndex) => (
                    <div
                        key={`${openNote}-${stringIndex}`}
                        className="flex items-center mb-1"
                    >
                        {/* String name label on the left */}
                        <div className="w-8 text-xs font-medium text-muted-foreground text-center">
                            {openNote}
                            {/* Shows the open note of each string: E A D G B E */}
                        </div>

                        {/* Frets for this string */}
                        {frets.map((fret) => {
                            const active = isNoteActive(openNote, fret);
                            const root = isRootNote(openNote, fret);
                            const note = getNoteAtFret(openNote, fret);

                            return (
                                <div
                                    key={fret}
                                    className={`
                    flex-1 h-8 flex items-center justify-center
                    border-l border-muted text-xs font-medium
                    relative
                    ${fret === 0 ? "border-l-4 border-l-foreground" : ""}
                  `}
                                    // fret 0 gets a thicker left border — represents the nut
                                    // the nut is the white strip at the top of a real guitar neck
                                >
                                    {/* The string line — a thin horizontal line across every fret */}
                                    <div className="absolute inset-x-0 top-1/2 h-px bg-muted-foreground opacity-40" />
                                    {/* absolute — positions relative to the parent div
                      inset-x-0 — stretches full width
                      top-1/2 — sits exactly in the vertical middle
                      h-px — 1 pixel tall, just a line */}

                                    {/* The note dot — only renders if this note is in the scale */}
                                    {active && (
                                        <div
                                            className={`
                        relative z-10 w-6 h-6 rounded-full
                        flex items-center justify-center
                        text-xs font-bold
                        ${
                            root
                                ? "bg-primary text-primary-foreground"
                                : "bg-secondary text-secondary-foreground"
                        }
                      `}
                                            // z-10 puts the dot above the string line
                                            // root notes use "primary" color (usually your brand color)
                                            // other scale notes use "secondary" color (more subtle)
                                        >
                                            {note}
                                            {/* Shows the note name inside the dot — e.g. "C", "F#" */}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                ))}

                {/* Fret marker dots — purely decorative, shows 3 5 7 9 12 */}
                <div className="flex mt-2">
                    <div className="w-8" />
                    {frets.map((fret) => (
                        <div key={fret} className="flex-1 flex justify-center">
                            {FRET_MARKERS.includes(fret) && (
                                <div
                                    className={`
                  w-2 h-2 rounded-full bg-muted-foreground opacity-30
                  ${fret === 12 ? "ring-1 ring-muted-foreground ring-offset-1" : ""}
                `}
                                >
                                    {/* fret 12 gets a ring around it — on a real guitar
                      fret 12 has a double dot to mark the octave */}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
