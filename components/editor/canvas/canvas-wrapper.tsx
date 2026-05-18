"use client";

import { Component, type ReactNode } from "react";
import { LiveblocksProvider, RoomProvider, ClientSideSuspense } from "@liveblocks/react";
import { Canvas } from "./canvas";

interface CanvasWrapperProps {
  roomId: string;
}

export function CanvasWrapper({ roomId }: CanvasWrapperProps) {
  return (
    <ConnectionErrorBoundary>
      <LiveblocksProvider authEndpoint="/api/liveblocks-auth">
        <RoomProvider
          id={roomId}
          initialPresence={{ cursor: null, isThinking: false }}
        >
          <ClientSideSuspense fallback={<CanvasStatus>Connecting…</CanvasStatus>}>
            <Canvas />
          </ClientSideSuspense>
        </RoomProvider>
      </LiveblocksProvider>
    </ConnectionErrorBoundary>
  );
}

function CanvasStatus({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-full w-full items-center justify-center bg-base">
      <p className="text-sm text-copy-muted">{children}</p>
    </div>
  );
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ConnectionErrorBoundary extends Component<
  { children: ReactNode },
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <CanvasStatus>Failed to connect to canvas.</CanvasStatus>;
    }
    return this.props.children;
  }
}
