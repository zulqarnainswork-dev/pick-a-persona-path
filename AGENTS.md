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

- Keep gender selection at `/`, goal selection at `/next`, and the questionnaire layout at `/continue` with an equipment index and `/continue/$step` children; validate gender and goal search parameters to retain profile choices during navigation.
- Use global semantic tokens and named onboarding classes in `src/styles.css`, with a dedicated Button character variant, so both choices share consistent styling.
- Keep goal definitions and gender-specific illustration mappings in browser-safe library modules; use dedicated Button goal and next variants so all choices share styling and accessible single-selection states.
- Keep questionnaire definitions and answer validation in a browser-safe module, with shared question rendering and layout-scoped React state; this presentation-only flow retains answers across question navigation without storing sensitive health or body measurements in URLs or persistent storage.
- Render the presentation-only plan and simulated preparation at the questionnaire completion child, using the existing scoped answers; keep day scheduling in a browser-safe module and do not imply that exercise generation exists.
