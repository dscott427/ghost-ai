import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

/** Home — redirects authenticated users to the editor, unauthenticated users to sign-in. */
export default async function Home() {
  const { isAuthenticated } = await auth();
  if (isAuthenticated) redirect("/editor");
  redirect("/sign-in");
}
