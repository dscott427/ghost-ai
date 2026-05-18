"use client";

import "@xyflow/react/dist/style.css";
import { useCallback } from "react";
import {
  ReactFlow,
  ReactFlowProvider,
  MiniMap,
  Background,
  BackgroundVariant,
  ConnectionMode,
  useReactFlow,
  type NodeAddChange,
} from "@xyflow/react";
import { useLiveblocksFlow } from "@liveblocks/react-flow";
import { ShapePanel } from "./shape-panel";
import { CanvasNodeRenderer } from "./node-renderer";
import { DEFAULT_NODE_COLOR } from "@/types/canvas";
import type { CanvasNode, CanvasEdge, ShapePayload } from "@/types/canvas";

const nodeTypes = { canvasNode: CanvasNodeRenderer };

let counter = 0;

function nextNodeId(shape: string): string {
  return `${shape}-${Date.now()}-${++counter}`;
}

export function Canvas() {
  return (
    <ReactFlowProvider>
      <CanvasFlow />
    </ReactFlowProvider>
  );
}

function CanvasFlow() {
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect } =
    useLiveblocksFlow<CanvasNode, CanvasEdge>({ suspense: true });
  const { screenToFlowPosition } = useReactFlow();

  const onDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      const raw = e.dataTransfer.getData("application/ghost-shape");
      if (!raw) return;
      const { shape, width, height } = JSON.parse(raw) as ShapePayload;
      const position = screenToFlowPosition({ x: e.clientX, y: e.clientY });
      const newNode: CanvasNode = {
        id: nextNodeId(shape),
        type: "canvasNode",
        position: { x: position.x - width / 2, y: position.y - height / 2 },
        width,
        height,
        data: { label: "", color: DEFAULT_NODE_COLOR, shape },
      };
      const change: NodeAddChange<CanvasNode> = { type: "add", item: newNode };
      onNodesChange([change]);
    },
    [screenToFlowPosition, onNodesChange]
  );

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      nodeTypes={nodeTypes}
      connectionMode={ConnectionMode.Loose}
      onDragOver={onDragOver}
      onDrop={onDrop}
      fitView
    >
      <Background variant={BackgroundVariant.Dots} />
      <MiniMap />
      <ShapePanel />
    </ReactFlow>
  );
}
