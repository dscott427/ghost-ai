import { prisma } from "./prisma";
import { getIdentity } from "./project-access";

export interface Project {
  id: string;
  name: string;
  ownerId: string;
  description: string | null;
  status: string;
  canvasJsonPath: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export async function getProjectsForUser(): Promise<{
  owned: Project[];
  shared: Project[];
}> {
  const identity = await getIdentity();
  if (!identity) return { owned: [], shared: [] };

  const { userId, email } = identity;

  const [owned, collaborations] = await Promise.all([
    prisma.project.findMany({
      where: { ownerId: userId },
      orderBy: { createdAt: "desc" },
    }),
    email
      ? prisma.projectCollaborator.findMany({
          where: { email },
          include: { project: true },
          orderBy: { createdAt: "desc" },
        })
      : Promise.resolve([]),
  ]);

  return {
    owned: owned as Project[],
    shared: collaborations.map((c) => c.project as Project),
  };
}
