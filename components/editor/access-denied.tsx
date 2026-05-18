import { Lock } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export function AccessDenied() {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4 bg-base">
      <div className="flex flex-col items-center gap-3 text-center">
        <Lock className="h-8 w-8 text-copy-faint" />
        <h2 className="text-lg font-semibold text-copy-primary">Access Denied</h2>
        <p className="text-sm text-copy-muted">
          This project doesn&apos;t exist or you don&apos;t have permission to view it.
        </p>
      </div>
      <Link href="/editor" className={buttonVariants({ variant: "outline" })}>
        Back to projects
      </Link>
    </div>
  );
}
