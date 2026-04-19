import { create } from "zustand";
import { Note, CHROMATIC_SCALE } from "@/lib/music/notes";
import { ScaleType } from "@/lib/music/scales";

// Define the interface for the store
interface VisualizerStore {
    selectedRoot: Note;
    selectedScale: ScaleType;
    setSelectedRoot: (root: Note) => void;
    setSelectedScale: (scale: ScaleType) => void;
}

// Create the store
export const useVisualizerStore = create<VisualizerStore>((set) => ({
    selectedRoot: "C",
    selectedScale: "major",
    setSelectedRoot: (root: Note) => set({ selectedRoot: root }),
    setSelectedScale: (scale: ScaleType) => set({ selectedScale: scale }),
}));
