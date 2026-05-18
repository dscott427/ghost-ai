import type { Node, Edge } from "@xyflow/react";

export interface NodeData extends Record<string, unknown> {
  label: string;
  color: string;
  shape: string;
}

export type CanvasNode = Node<NodeData, "canvasNode">;
export type CanvasEdge = Edge<Record<string, never>, "canvasEdge">;

export interface ShapePayload {
  shape: string;
  width: number;
  height: number;
}

export const DEFAULT_NODE_COLOR = "#1F1F1F";
export const DEFAULT_NODE_TEXT_COLOR = "#EDEDED";
