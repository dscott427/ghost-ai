import { Liveblocks } from "@liveblocks/node";

const globalForLiveblocks = global as typeof globalThis & {
  _liveblocks?: Liveblocks;
};

export function getLiveblocks(): Liveblocks {
  if (!globalForLiveblocks._liveblocks) {
    globalForLiveblocks._liveblocks = new Liveblocks({
      secret: process.env.LIVEBLOCKS_SECRET_KEY!,
    });
  }
  return globalForLiveblocks._liveblocks;
}

const CURSOR_COLORS = [
  "#FF6B6B",
  "#FF9F43",
  "#FECA57",
  "#48DBFB",
  "#FF9FF3",
  "#54A0FF",
  "#5F27CD",
  "#00D2D3",
];

export function cursorColor(userId: string): string {
  let hash = 0;
  for (let i = 0; i < userId.length; i++) {
    hash = (hash * 31 + userId.charCodeAt(i)) >>> 0;
  }
  return CURSOR_COLORS[hash % CURSOR_COLORS.length];
}
