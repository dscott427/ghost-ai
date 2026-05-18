import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getIdentity } from "@/lib/project-access";

interface RouteParams {
  params: Promise<{ projectId: string; collaboratorId: string }>;
}

export async function DELETE(_request: Request, { params }: RouteParams) {
  const identity = await getIdentity();
  if (!identity) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { projectId, collaboratorId } = await params;

  const project = await prisma.project.findUnique({ where: { id: projectId } });
  if (!project) return NextResponse.json({ error: "Not found" }, { status: 404 });
  if (project.ownerId !== identity.userId)
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const collab = await prisma.projectCollaborator.findUnique({
    where: { id: collaboratorId },
  });
  if (!collab || collab.projectId !== projectId)
    return NextResponse.json({ error: "Not found" }, { status: 404 });

  await prisma.projectCollaborator.delete({ where: { id: collaboratorId } });

  return new NextResponse(null, { status: 204 });
}
