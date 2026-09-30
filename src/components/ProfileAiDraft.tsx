import { useState, type ChangeEvent } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Button } from "@/components/ui/button";
import { draftProfile, type ProfileDraft } from "@/lib/profile-ai.functions";

export function ProfileAiDraft({ onApply }: { onApply: (draft: ProfileDraft) => void }) {
  const draft = useServerFn(draftProfile);
  const [notes, setNotes] = useState("");
  const [result, setResult] = useState<ProfileDraft | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [applied, setApplied] = useState(false);

  const upload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setError("");
    if (file.size > 30000) {
      setError("Choose a text file smaller than 30 KB.");
      return;
    }
    setNotes(await file.text());
    setResult(null);
    setApplied(false);
    event.target.value = "";
  };

  const generate = async () => {
    setError("");
    setApplied(false);
    if (notes.trim().length < 20) {
      setError("Add a few more career details before drafting.");
      return;
    }
    setBusy(true);
    try {
      const response = await draft({ data: { notes } });
      if (response.ok) setResult(response.draft);
      else setError(response.error);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Drafting failed. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <section aria-labelledby="draft-heading" className="min-w-0">
      <div className="mb-8">
        <h2 id="draft-heading" className="text-5xl font-light leading-tight md:text-7xl">Draft with <em className="font-display font-normal">AI.</em></h2>
      </div>
      <label htmlFor="career-notes" className="block text-sm font-medium text-primary">Career notes or resume</label>
      <textarea
        id="career-notes"
        value={notes}
        onChange={(event) => { setNotes(event.target.value); setResult(null); setApplied(false); }}
        rows={7}
        maxLength={30000}
        placeholder="Your roles, responsibilities, achievements, tools and skills…"
        className="mt-4 min-h-48 w-full resize-y rounded-md border border-stroke bg-surface p-5 text-sm leading-relaxed text-primary outline-none placeholder:text-muted focus:border-accent-blue"
      />
      <div className="mt-4 flex flex-wrap items-center gap-4">
        <label className="cursor-pointer text-sm font-medium text-accent-blue underline underline-offset-4">
          Upload .txt or .md resume
          <input type="file" accept=".txt,.md,text/plain,text/markdown" onChange={upload} className="sr-only" />
        </label>
        <Button type="button" onClick={generate} disabled={busy} className="h-11 rounded-full px-6">
          {busy ? "Drafting…" : "Draft with AI"}
        </Button>
      </div>
      {error && <p role="alert" className="mt-4 text-sm font-medium text-accent-blue">{error}</p>}
      {result && (
        <div aria-live="polite" className="mt-10 space-y-7 border-t border-stroke pt-7">
          <h3 className="font-display text-3xl italic">Your draft</h3>
          {(["headline", "about", "experience", "skills"] as const).map((field) => (
            <div key={field}>
              <label htmlFor={`draft-${field}`} className="text-sm font-medium capitalize">{field}</label>
              <textarea
                id={`draft-${field}`}
                value={result[field]}
                onChange={(event) => { setResult({ ...result, [field]: event.target.value }); setApplied(false); }}
                rows={field === "about" ? 6 : field === "experience" ? 4 : 2}
                className="mt-2 w-full resize-y border-b border-stroke bg-transparent py-2 text-sm leading-relaxed text-primary outline-none focus:border-accent-blue"
              />
            </div>
          ))}
          <Button type="button" onClick={() => { onApply(result); setApplied(true); }} className="h-11 rounded-full px-6">Apply to my profile</Button>
          {applied && <p role="status" className="text-sm text-muted">Applied to this view only. Refreshing restores the published profile.</p>}
        </div>
      )}
    </section>
  );
}