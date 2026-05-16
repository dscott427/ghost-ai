import { EditorShell } from "@/components/editor/editor-shell";

/** Editor route — renders the full editor chrome with a canvas placeholder. */
export default function EditorPage() {
  return (
    <EditorShell>
      <div className="flex flex-1 items-center justify-center">
        <p className="text-sm text-copy-muted">Canvas goes here</p>
      </div>
    </EditorShell>
  );
}
