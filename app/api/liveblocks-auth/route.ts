import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { getLiveblocks, cursorColor } from "@/lib/liveblocks";
import { getIdentity, getProjectWithAccess } from "@/lib/project-access";

export async function POST(request: Request) {
  const identity = await getIdentity();
  if (!identity) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json().catch(() => ({}));
  const room = typeof body?.room === "string" ? body.room : null;
  if (!room) return NextResponse.json({ error: "room is required" }, { status: 400 });

  const project = await getProjectWithAccess(room, identity);
  if (!project) return new NextResponse(null, { status: 403 });

  const user = await currentUser();
  const fullName = user
    ? `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim()
    : "";
  const name =
    fullName || user?.emailAddresses[0]?.emailAddress || identity.userId;
  const avatar = user?.imageUrl ?? "";
  const color = cursorColor(identity.userId);

  const liveblocks = getLiveblocks();
  await liveblocks.getOrCreateRoom(room, { defaultAccesses: [] });

  const session = liveblocks.prepareSession(identity.userId, {
    userInfo: { name, avatar, color },
  });
  session.allow(room, session.FULL_ACCESS);

  const { status, body: responseBody } = await session.authorize();
  return new Response(responseBody, { status });
}
