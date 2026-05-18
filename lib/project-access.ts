import { auth, currentUser } from "@clerk/nextjs/server";
import { prisma } from "./prisma";
import type { Project } from "./projects";

export interface Identity {
  userId: string;
  email: string | null;
}

export async function getIdentity(): Promise<Identity | null> {
  const { userId } = await auth();
  if (!userId) return null;

  const user = await currentUser();
  const email = user?.emailAddresses[0]?.emailAddress ?? null;

  return { userId, email };
}

export async function getProjectWithAccess(
  projectId: string,
  identity: Identity,
): Promise<Project | null> {
  const [project, collab] = await Promise.all([
    prisma.project.findUnique({ where: { id: projectId } }),
    identity.email
      ? prisma.projectCollaborator.findUnique({
          where: { projectId_email: { projectId, email: identity.email } },
        })
      : Promise.resolve(null),
  ]);

  if (!project) return null;
  if (project.ownerId === identity.userId || collab) return project as Project;
  return null;
}
