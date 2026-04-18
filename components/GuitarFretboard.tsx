"use client";

import { cn } from "@/lib/utils";
import { getNoteAtFret, STANDARD_TUNING } from "@/lib/music/notes";
import { Note } from "@/lib/music/notes";

interface GuitarFretboardProps {
    activeNotes: Note[];
    // The component receives the notes to highlight.
    // It never calculates music theory — that's theory.ts's job.
}

// Standard fret positions where dots appear on a real guitar neck.
const FRET_MARKERS = new Set([3, 5, 7, 9, 12]);
const FRETS = Array.from({ length: 13 }, (_, i) => i); // [0, 1, 2, ... 12]

export default function GuitarFretboard({ activeNotes }: GuitarFretboardProps) {
    const rootNote = activeNotes[0] ?? null;
    // The first note is always the root — interval[0] is always 0.
    // We style the root differently so it stands out visually.

    return (
        <div className="w-full overflow-x-auto scrollbar-theme rounded-lg border border-border bg-card">
            {/* overflow-x-auto makes the fretboard scroll horizontally on small screens */}
            <div className="min-w-[640px] p-4">
                {/* Fret number labels at the top */}
                <div className="flex mb-2">
                    <div className="w-10 shrink-0" />{" "}
                    {/* spacer aligns with string labels */}
                    {FRETS.map((fret) => (
                        <div
                            key={fret}
                            className="flex-1 flex flex-col items-center gap-1"
                        >
                            <span className="text-[10px] text-muted-foreground w-full text-center">
                                {fret === 0 ? "" : fret}
                            </span>
                            {/* Fret position marker dot (decorative, not a note) */}
                            <div
                                className={cn(
                                    "w-1.5 h-1.5 rounded-full mx-auto",
                                    FRET_MARKERS.has(fret)
                                        ? "bg-muted-foreground/30"
                                        : "invisible",
                                )}
                            />
                        </div>
                    ))}
                </div>

                {/* Strings — one row per string */}
                <div className="flex flex-col gap-3">
                    {STANDARD_TUNING.map((openNote, stringIndex) => (
                        <div key={stringIndex} className="flex items-center">
                            {/* String label — shows the open note name */}
                            <div className="w-10 shrink-0 text-right pr-2">
                                <span className="text-xs font-medium text-muted-foreground">
                                    {openNote}
                                </span>
                            </div>

                            {/* Fret cells for this string */}
                            <div className="flex flex-1 items-center">
                                {FRETS.map((fret) => {
                                    const note = getNoteAtFret(openNote, fret);
                                    // What note sits at this exact position on this string?

                                    const isActive = activeNotes.includes(note);
                                    const isRoot =
                                        note === rootNote && isActive;

                                    return (
                                        <div
                                            key={fret}
                                            className={cn(
                                                "flex-1 flex items-center justify-center relative",
                                                // The string line runs through the middle of every cell
                                                "before:absolute before:inset-x-0 before:top-1/2 before:-translate-y-1/2",
                                                "before:h-px before:bg-border",
                                            )}
                                        >
                                            {/* The nut (thick line before fret 1) */}
                                            {fret === 0 && (
                                                <div className="absolute right-0 top-0 bottom-0 w-0.5 bg-foreground/40 z-10" />
                                            )}

                                            {/* Note dot */}
                                            <div
                                                className={cn(
                                                    "relative z-10 w-7 h-7 rounded-full flex items-center justify-center",
                                                    "text-[10px] font-semibold transition-all duration-200",
                                                    isRoot
                                                        ? "bg-primary text-primary-foreground scale-110 shadow-md shadow-primary/30"
                                                        : isActive
                                                          ? "bg-primary/20 text-primary border border-primary/50"
                                                          : "bg-transparent text-transparent",
                                                    // Root: filled primary, slightly larger
                                                    // Other active notes: tinted with border
                                                    // Inactive: invisible (no dot at all)
                                                )}
                                            >
                                                {isActive ? note : null}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Legend */}
                <div className="flex items-center gap-4 mt-4 pt-3 border-t border-border">
                    <div className="flex items-center gap-1.5">
                        <div className="w-4 h-4 rounded-full bg-primary" />
                        <span className="text-xs text-muted-foreground">
                            Root
                        </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <div className="w-4 h-4 rounded-full bg-primary/20 border border-primary/50" />
                        <span className="text-xs text-muted-foreground">
                            Scale note
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
