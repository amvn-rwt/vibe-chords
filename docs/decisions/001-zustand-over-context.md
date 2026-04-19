# 001 — Zustand over React Context for visualizer state

## Date
April 2026

## Decision
Using Zustand to manage selectedRoot and selectedScale globally.

## Why not React Context?
Context re-renders every component that consumes it when anything changes.
For a visualizer that updates on every note selection, that's wasteful.
Zustand only re-renders components that use the specific value that changed.

## Why not just useState in page.tsx?
We want the store to be accessible from anywhere — for example, the
/chords page can later send a scale directly to the visualizer store
without passing props across routes.