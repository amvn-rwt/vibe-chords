"use client";

// import { useVisualizerStore } from "@/store/useVisualizerStore";
import { useRouter, useSearchParams } from "next/navigation";
import { getScaleNotes } from "@/lib/music/theory";
import { CHROMATIC_SCALE, Note } from "@/lib/music/notes";
import { SCALE_NAMES, ScaleType } from "@/lib/music/scales";
import GuitarFretboard from "@/components/GuitarFretboard";
import { Button } from "@/components/ui/button";
import { Check, Copy, Share } from "lucide-react";
import { useState } from "react";

// Converts "pentatonic_minor" → "Pentatonic Minor" for display
function formatScaleName(scale: ScaleType): string {
    return scale
        .split("_")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
}

export default function VisualizerPage() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const selectedRoot = (searchParams.get("root") ?? "C") as Note
    const selectedScale = (searchParams.get("scale") ?? "major") as ScaleType

    // Update the URL search params with the new root and scale
    const updateParams = (root: Note, scale: ScaleType) => {
        const params = new URLSearchParams();
        params.set("root", root);
        params.set("scale", scale);

        // Replace the current URL with the new params, without scrolling to the top
        router.replace(`/visualizer?${params.toString()}`, { scroll: false});
    }

    const handleRootChange = (root: Note) => {
        updateParams(root, selectedScale);
        // keep the current scale
    }

    const handleScaleChange = (scale: ScaleType) => {
        updateParams(selectedRoot, scale);
        // keep the current root
    }

    const activeNotes = getScaleNotes(selectedRoot, selectedScale);

    const handleCopyLink = () => {
        navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => {
            setCopied(false);
        }, 2000);
    }

    const [copied, setCopied] = useState(false);

    return (
        <div className="h-full overflow-y-auto scrollbar-theme bg-background text-foreground">
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
                                handleRootChange(
                                    e.target.value as Note,
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
                                handleScaleChange(e.target.value as ScaleType)
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
                    {/* Share button */}
                    <div className="flex flex-col gap-1 justify-end">
                        <Button
                            onClick={handleCopyLink}
                            className="border rounded-md px-3 py-2 text-sm hover:bg-muted transition-colors cursor-pointer"
                            title="Copy link"
                            variant="outline"
                            size="icon"
                        >
                            {copied ? <Check className="size-4 text-green-500" /> : <Copy className="size-4" />}
                        </Button>
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
