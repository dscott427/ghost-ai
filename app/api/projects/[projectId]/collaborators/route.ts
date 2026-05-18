import { clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getIdentity } from "@/lib/project-access";

interface RouteParams {
  params: Promise<{ projectId: string }>;
}

export async function GET(_request: Request, { params }: RouteParams) {
  const identity = await getIdentity();
  if (!identity) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { projectId } = await params;

  const project = await prisma.project.findUnique({ where: { id: projectId } });
  if (!project) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const hasAccess = project.ownerId === identity.userId || (
    identity.email
      ? !!(await prisma.projectCollaborator.findUnique({
          where: { projectId_email: { projectId, email: identity.email } },
        }))
      : false
  );
  if (!hasAccess) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const collabs = await prisma.projectCollaborator.findMany({
    where: { projectId },
    orderBy: { createdAt: "asc" },
  });

  const emails = collabs.map((c) => c.email);
  const client = await clerkClient();
  const clerkUsers = emails.length > 0
    ? (await client.users.getUserList({ emailAddress: emails })).data
    : [];

  const userByEmail = new Map<string, (typeof clerkUsers)[number]>();
  for (const user of clerkUsers) {
    for (const addr of user.emailAddresses) {
      if (emails.includes(addr.emailAddress)) {
        userByEmail.set(addr.emailAddress, user);
      }
    }
  }

  const collaborators = collabs.map((c) => {
    const user = userByEmail.get(c.email);
    const name = user
      ? `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim() || null
      : null;
    return { id: c.id, email: c.email, name, avatarUrl: user?.imageUrl ?? null };
  });

  return NextResponse.json({ collaborators, isOwner: project.ownerId === identity.userId });
}

export async function POST(request: Request, { params }: RouteParams) {
  const identity = await getIdentity();
  if (!identity) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { projectId } = await params;

  const project = await prisma.project.findUnique({ where: { id: projectId } });
  if (!project) return NextResponse.json({ error: "Not found" }, { status: 404 });
  if (project.ownerId !== identity.userId) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const body = await request.json().catch(() => ({}));
  const email =
    typeof body?.email === "string" ? body.email.trim().toLowerCase() : null;
  if (!email || !email.includes("@"))
    return NextResponse.json({ error: "Valid email required" }, { status: 400 });

  const existing = await prisma.projectCollaborator.findUnique({
    where: { projectId_email: { projectId, email } },
  });
  if (existing)
    return NextResponse.json({ error: "Already a collaborator" }, { status: 409 });

  const collab = await prisma.projectCollaborator.create({
    data: { projectId, email },
  });

  const client = await clerkClient();
  const clerkUsers = (await client.users.getUserList({ emailAddress: [email] })).data;
  const user = clerkUsers[0];
  const name = user
    ? `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim() || null
    : null;

  return NextResponse.json(
    { id: collab.id, email: collab.email, name, avatarUrl: user?.imageUrl ?? null },
    { status: 201 }
  );
}
