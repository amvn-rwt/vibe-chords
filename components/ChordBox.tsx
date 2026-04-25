import type { GuitarChordBox } from "@/lib/guitarChordBox";

interface ChordBoxProps {
  chordBox: GuitarChordBox | null;
}

const STRING_X = [20, 36, 52, 68, 84, 100];
const FRET_TOP = 32;
const FRET_GAP = 20;
const FRET_COUNT = 4;

function fretCenterY(fret: number): number {
  return FRET_TOP + (fret - 0.5) * FRET_GAP;
}

export default function ChordBox({ chordBox }: ChordBoxProps) {
  if (!chordBox) {
    return (
      <div className="flex h-[150px] w-[120px] items-center justify-center rounded-md border border-dashed border-border text-center text-[10px] font-medium text-muted-foreground">
        No guitar shape
      </div>
    );
  }

  const { position } = chordBox;
  const barres = position.barres ?? [];

  return (
    <svg
      viewBox="0 0 120 150"
      role="img"
      aria-label={`${chordBox.chord} guitar chord box`}
      className="h-[150px] w-[120px] overflow-visible text-foreground"
    >
      {position.baseFret > 1 && (
        <text
          x="4"
          y={fretCenterY(1) + 4}
          className="fill-muted-foreground text-[9px] font-semibold"
        >
          {position.baseFret}fr
        </text>
      )}

      {position.frets.map((fret, stringIndex) => {
        const x = STRING_X[stringIndex];
        if (fret === -1) {
          return (
            <text
              key={`muted-${stringIndex}`}
              x={x}
              y="18"
              textAnchor="middle"
              className="fill-muted-foreground text-[12px] font-bold"
            >
              x
            </text>
          );
        }

        if (fret === 0) {
          return (
            <circle
              key={`open-${stringIndex}`}
              cx={x}
              cy="14"
              r="4"
              className="fill-background stroke-muted-foreground"
              strokeWidth="1.5"
            />
          );
        }

        return null;
      })}

      {Array.from({ length: FRET_COUNT + 1 }, (_, fretLine) => (
        <line
          key={`fret-${fretLine}`}
          x1={STRING_X[0]}
          x2={STRING_X[STRING_X.length - 1]}
          y1={FRET_TOP + fretLine * FRET_GAP}
          y2={FRET_TOP + fretLine * FRET_GAP}
          className="stroke-muted-foreground"
          strokeWidth={fretLine === 0 && position.baseFret === 1 ? 4 : 1.5}
          strokeLinecap="round"
        />
      ))}

      {STRING_X.map((x, stringIndex) => (
        <line
          key={`string-${stringIndex}`}
          x1={x}
          x2={x}
          y1={FRET_TOP}
          y2={FRET_TOP + FRET_COUNT * FRET_GAP}
          className="stroke-muted-foreground"
          strokeWidth={stringIndex === 0 ? 2 : 1.2}
          strokeLinecap="round"
        />
      ))}

      {barres.map((barreFret) => {
        const barredStrings = position.frets
          .map((fret, stringIndex) => ({ fret, stringIndex }))
          .filter(({ fret }) => fret === barreFret);

        if (barredStrings.length < 2) {
          return null;
        }

        const firstString = Math.min(
          ...barredStrings.map(({ stringIndex }) => stringIndex),
        );
        const lastString = Math.max(
          ...barredStrings.map(({ stringIndex }) => stringIndex),
        );
        const x = STRING_X[firstString] - 7;
        const width = STRING_X[lastString] - STRING_X[firstString] + 14;

        return (
          <rect
            key={`barre-${barreFret}`}
            x={x}
            y={fretCenterY(barreFret) - 7}
            width={width}
            height="14"
            rx="7"
            className="fill-primary"
          />
        );
      })}

      {position.frets.map((fret, stringIndex) => {
        if (fret <= 0) {
          return null;
        }

        const finger = position.fingers[stringIndex];

        return (
          <g key={`finger-${stringIndex}-${fret}`}>
            <circle
              cx={STRING_X[stringIndex]}
              cy={fretCenterY(fret)}
              r="7"
              className="fill-primary"
            />
            {finger > 0 && (
              <text
                x={STRING_X[stringIndex]}
                y={fretCenterY(fret) + 3.5}
                textAnchor="middle"
                className="fill-primary-foreground text-[9px] font-bold"
              >
                {finger}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}
