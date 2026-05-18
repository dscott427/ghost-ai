"use client";

import { Handle, Position, type NodeProps } from "@xyflow/react";
import { DEFAULT_NODE_TEXT_COLOR } from "@/types/canvas";
import type { CanvasNode } from "@/types/canvas";

export function CanvasNodeRenderer({
  data,
  selected,
  width,
  height,
}: NodeProps<CanvasNode>) {
  const w = width ?? 160;
  const h = height ?? 80;

  return (
    <div
      style={{
        width: w,
        height: h,
        backgroundColor: data.color,
        borderColor: selected ? "var(--accent-primary)" : "var(--border-default)",
      }}
      className="flex items-center justify-center rounded-xl border"
    >
      <span
        className="select-none px-3 text-center text-xs font-medium"
        style={{ color: DEFAULT_NODE_TEXT_COLOR }}
      >
        {data.label || data.shape}
      </span>

      <Handle type="source" position={Position.Top} id="top" />
      <Handle type="source" position={Position.Right} id="right" />
      <Handle type="source" position={Position.Bottom} id="bottom" />
      <Handle type="source" position={Position.Left} id="left" />
    </div>
  );
}
