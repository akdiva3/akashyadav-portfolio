<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep uploaded profile media as Lovable Assets pointer files rather than checked-in binaries, so the repository stays lightweight.
- Keep career-copy AI drafting in a server function and apply edits only to the current browser view; this leaves the published profile unchanged without owner authentication and persistence.

- Keep the portfolio’s personal details and unverified work examples in `src/data/portfolio.ts`, so real facts remain distinguishable from prior illustrative concepts.
- Use TanStack file routes rather than react-router-dom, because this existing TanStack Start project requires its router for SSR and links.
