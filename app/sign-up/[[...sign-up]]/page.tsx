import { SignUp } from "@clerk/nextjs";
import { Bot, Cpu, Users, FileText } from "lucide-react";

const features = [
  {
    icon: Cpu,
    title: "AI Architecture Generation",
    description: "Describe your system, AI maps it to nodes and edges on a live canvas.",
  },
  {
    icon: Users,
    title: "Real-time Collaboration",
    description: "Live cursors, presence indicators, and shared node editing across your team.",
  },
  {
    icon: FileText,
    title: "Instant Spec Generation",
    description: "Export a complete Markdown technical spec directly from the canvas graph.",
  },
];

/** Sign-up page — 50/50 split layout; left panel hidden on mobile. */
export default function SignUpPage() {
  return (
    <div className="flex min-h-screen font-sans">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between bg-surface px-14 py-12">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand">
            <Bot className="h-4 w-4 text-base" />
          </div>
          <span className="text-sm font-semibold text-copy-primary">Ghost AI</span>
        </div>

        {/* Headline + features */}
        <div>
          <h1 className="text-4xl font-bold leading-tight tracking-tight text-copy-primary">
            Design systems at the<br />speed of thought.
          </h1>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-copy-secondary">
            Describe your architecture in plain English. Ghost AI maps it to a
            shared canvas your whole team can refine in real time.
          </p>

          <ul className="mt-10 space-y-6">
            {features.map(({ icon: Icon, title, description }) => (
              <li key={title} className="flex items-start gap-4">
                <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-accent-dim">
                  <Icon className="h-3.5 w-3.5 text-brand" />
                </div>
                <div>
                  <p className="text-sm font-medium text-copy-primary">{title}</p>
                  <p className="mt-0.5 text-xs leading-relaxed text-copy-muted">{description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Footer */}
        <p className="text-xs text-copy-faint">© 2026 Ghost AI. All rights reserved.</p>
      </div>

      {/* Right panel — Clerk form */}
      <div className="flex flex-1 items-center justify-center bg-base px-6">
        <SignUp />
      </div>
    </div>
  );
}
