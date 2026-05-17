import { auth, currentUser } from "@clerk/nextjs/server";
import { prisma } from "./prisma";

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
  const { userId } = await auth();
  if (!userId) return { owned: [], shared: [] };

  const user = await currentUser();
  const email = user?.emailAddresses[0]?.emailAddress ?? null;

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
