import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { useCallback } from "react";
import { ProfileAiDraft } from "@/components/ProfileAiDraft";
import type { ProfileDraft } from "@/lib/profile-ai.functions";

export const Route = createFileRoute("/draft")({
  head: () => ({
    meta: [
      { title: "Draft with AI — Akash Yadav" },
      { name: "description", content: "Draft polished headline, about, experience and skills copy from career notes or a resume." },
      { property: "og:title", content: "Draft with AI — Akash Yadav" },
      { property: "og:description", content: "Draft polished profile copy from career notes or a resume." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: DraftPage,
});

function DraftPage() {
  const navigate = useNavigate();
  const apply = useCallback((draft: ProfileDraft) => {
    try {
      window.sessionStorage.setItem("profile-draft", JSON.stringify(draft));
    } catch { /* storage unavailable */ }
    navigate({ to: "/" });
  }, [navigate]);

  return <div className="min-h-screen overflow-x-clip bg-bg font-sans text-primary antialiased">
    <main className="px-5 py-24 sm:px-8 md:px-12 md:py-32 lg:px-20">
      <div className="mx-auto max-w-[1400px]">
        <Link to="/" className="mb-10 inline-flex items-center gap-2 text-xs uppercase tracking-[.18em] text-muted transition-colors hover:text-primary"><ArrowLeft className="size-3.5" /> Back to profile</Link>
        <div className="mb-8 flex items-center gap-4 text-[11px] font-medium uppercase tracking-[.22em] text-muted"><span className="text-accent-blue">AI</span><span className="h-px w-8 bg-stroke" />Career copy</div>
        <ProfileAiDraft onApply={apply} />
      </div>
    </main>
  </div>;
}
