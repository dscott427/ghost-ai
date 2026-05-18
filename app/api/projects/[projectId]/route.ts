import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface RouteParams {
  params: Promise<{ projectId: string }>;
}

async function getOwnedProject(userId: string, projectId: string) {
  const project = await prisma.project.findUnique({ where: { id: projectId } });
  if (!project) return { project: null, error: NextResponse.json({ error: "Not found" }, { status: 404 }) };
  if (project.ownerId !== userId) return { project: null, error: NextResponse.json({ error: "Forbidden" }, { status: 403 }) };
  return { project, error: null };
}

export async function PATCH(request: Request, { params }: RouteParams) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { projectId } = await params;
  const { project, error } = await getOwnedProject(userId, projectId);
  if (error) return error;

  const body = await request.json().catch(() => ({}));
  const name = typeof body?.name === "string" && body.name.trim() ? body.name.trim() : null;
  if (!name) return NextResponse.json({ error: "name is required" }, { status: 400 });

  const updated = await prisma.project.update({
    where: { id: projectId },
    data: { name },
  });

  return NextResponse.json(updated);
}

export async function DELETE(_request: Request, { params }: RouteParams) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { projectId } = await params;
  const { project, error } = await getOwnedProject(userId, projectId);
  if (error) return error;

  await prisma.project.delete({ where: { id: projectId } });

  return new NextResponse(null, { status: 204 });
}
