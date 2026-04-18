"use client";

import { useVisualizerStore } from "@/store/useVisualizerStore";
import { getScaleNotes } from "@/lib/music/theory";
import { CHROMATIC_SCALE } from "@/lib/music/notes";
import { SCALE_NAMES, ScaleType } from "@/lib/music/scales";
import GuitarFretboard from "@/components/GuitarFretboard";

// Converts "pentatonic_minor" → "Pentatonic Minor" for display
function formatScaleName(scale: ScaleType): string {
    return scale
        .split("_")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
}

export default function VisualizerPage() {
    const selectedRoot = useVisualizerStore((state) => state.selectedRoot);
    const selectedScale = useVisualizerStore((state) => state.selectedScale);
    const setSelectedRoot = useVisualizerStore(
        (state) => state.setSelectedRoot,
    );
    const setSelectedScale = useVisualizerStore(
        (state) => state.setSelectedScale,
    );
    const activeNotes = getScaleNotes(selectedRoot, selectedScale);

    return (
        <div className="min-h-screen bg-background text-foreground">
            <main className="max-w-4xl mx-auto px-4 py-8 flex flex-col gap-8">
                {/* Page title */}
                <div className="space-y-1">
                    <h1 className="text-2xl font-bold text-foreground">
                        Theory Visualizer
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Pick a root note and scale — see every position on the
                        fretboard.
                    </p>
                </div>
                {/* Selectors */}
                <div className="flex flex-wrap gap-4">
                    {/* Root note selector */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                            Root Note
                        </label>
                        <select
                            value={selectedRoot}
                            onChange={(e) =>
                                setSelectedRoot(
                                    e.target.value as typeof selectedRoot,
                                )
                            }
                            className="rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring cursor-pointer"
                        >
                            {CHROMATIC_SCALE.map((note) => (
                                <option key={note} value={note}>
                                    {note}
                                </option>
                            ))}
                        </select>
                    </div>
                    {/* Scale type selector */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                            Scale
                        </label>
                        <select
                            value={selectedScale}
                            onChange={(e) =>
                                setSelectedScale(e.target.value as ScaleType)
                            }
                            className="rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring cursor-pointer"
                        >
                            {SCALE_NAMES.map((scale) => (
                                <option key={scale} value={scale}>
                                    {formatScaleName(scale)}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Active notes summary */}
                <div className="flex flex-wrap gap-2">
                    {activeNotes.map((note, i) => (
                        <span
                            key={note}
                            className={
                                i === 0
                                    ? "px-3 py-1 rounded-full bg-primary text-primary-foreground text-sm font-semibold"
                                    : "px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/30 text-sm font-medium"
                            }
                        >
                            {note}
                        </span>
                    ))}
                </div>

                {/* The fretboard — receives activeNotes, renders nothing else */}
                <GuitarFretboard activeNotes={activeNotes} />
            </main>
        </div>
    );
}
