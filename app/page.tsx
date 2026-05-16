import { EditorShell } from "@/components/editor/editor-shell";

export default function Home() {
  return (
    <EditorShell>
      <div className="flex flex-1 items-center justify-center">
        <p className="text-sm text-copy-muted">Canvas goes here</p>
      </div>
    </EditorShell>
  );
}
