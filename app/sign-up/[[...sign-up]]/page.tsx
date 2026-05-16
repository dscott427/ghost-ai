import { SignUp } from "@clerk/nextjs";

/** Sign-up page — two-panel layout on large screens, form-only on small screens. */
export default function SignUpPage() {
  return (
    <div className="flex min-h-screen bg-base">
      {/* Left panel — hidden on small screens */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-center px-16 border-r border-surface-border">
        <p className="text-lg font-semibold text-copy-primary tracking-tight">Ghost AI</p>
        <p className="mt-2 text-sm text-copy-muted">AI-powered workflow builder</p>
        <ul className="mt-8 space-y-3 text-sm text-copy-secondary">
          <li>Design and document systems visually</li>
          <li>Generate technical specs with AI</li>
          <li>Collaborate in real time</li>
          <li>Export and share anywhere</li>
        </ul>
      </div>

      {/* Right panel — Clerk form */}
      <div className="flex flex-1 items-center justify-center px-6">
        <SignUp />
      </div>
    </div>
  );
}
