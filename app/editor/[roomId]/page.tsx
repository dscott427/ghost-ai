import { redirect } from "next/navigation";
import { getIdentity, getProjectWithAccess } from "@/lib/project-access";
import { getProjectsForUser } from "@/lib/projects";
import { AccessDenied } from "@/components/editor/access-denied";
import { WorkspaceShell } from "@/components/editor/workspace-shell";

interface PageProps {
  params: Promise<{ roomId: string }>;
}

export default async function WorkspacePage({ params }: PageProps) {
  const { roomId } = await params;

  const identity = await getIdentity();
  if (!identity) redirect("/sign-in");

  const [project, { owned, shared }] = await Promise.all([
    getProjectWithAccess(roomId, identity),
    getProjectsForUser(),
  ]);

  if (!project) return <AccessDenied />;

  return (
    <WorkspaceShell
      project={project}
      ownedProjects={owned}
      sharedProjects={shared}
      isOwner={project.ownerId === identity.userId}
    />
  );
}
