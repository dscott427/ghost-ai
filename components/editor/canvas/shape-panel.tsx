"use client";

import { Panel } from "@xyflow/react";
import type { ShapePayload } from "@/types/canvas";

const SHAPES: (ShapePayload & { label: string })[] = [
  { shape: "rectangle", width: 160, height: 80,  label: "Rectangle" },
  { shape: "diamond",   width: 140, height: 140, label: "Diamond"   },
  { shape: "circle",    width: 100, height: 100, label: "Circle"    },
  { shape: "pill",      width: 160, height: 80,  label: "Pill"      },
  { shape: "cylinder",  width: 120, height: 100, label: "Cylinder"  },
  { shape: "hexagon",   width: 120, height: 120, label: "Hexagon"   },
];

function ShapeIcon({ shape }: { shape: string }) {
  switch (shape) {
    case "rectangle":
      return (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="3" y="6" width="18" height="12" rx="1" />
        </svg>
      );
    case "diamond":
      return (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5">
          <polygon points="12,2 22,12 12,22 2,12" />
        </svg>
      );
    case "circle":
      return (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="10" />
        </svg>
      );
    case "pill":
      return (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="3" y="7" width="18" height="10" rx="5" />
        </svg>
      );
    case "cylinder":
      return (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5">
          <ellipse cx="12" cy="6" rx="9" ry="3" />
          <line x1="3" y1="6" x2="3" y2="18" />
          <line x1="21" y1="6" x2="21" y2="18" />
          <ellipse cx="12" cy="18" rx="9" ry="3" />
        </svg>
      );
    case "hexagon":
      return (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5">
          <polygon points="12,2 20,7 20,17 12,22 4,17 4,7" />
        </svg>
      );
    default:
      return <span className="text-xs">{shape[0]}</span>;
  }
}

function onDragStart(e: React.DragEvent<HTMLButtonElement>, payload: ShapePayload) {
  e.dataTransfer.setData("application/ghost-shape", JSON.stringify(payload));
  e.dataTransfer.effectAllowed = "move";
}

export function ShapePanel() {
  return (
    <Panel position="bottom-center">
      <div className="mb-4 flex items-center gap-1 rounded-full border border-surface-border bg-surface/95 px-3 py-2 shadow-lg backdrop-blur-sm">
        {SHAPES.map(({ shape, width, height, label }) => (
          <button
            key={shape}
            draggable
            onDragStart={(e) => onDragStart(e, { shape, width, height })}
            title={label}
            className="flex h-9 w-9 items-center justify-center rounded-full text-copy-muted transition-colors hover:bg-elevated hover:text-copy-primary"
          >
            <ShapeIcon shape={shape} />
          </button>
        ))}
      </div>
    </Panel>
  );
}
