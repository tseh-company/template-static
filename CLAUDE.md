# {{PROJECT_NAME}} — project context for Claude

You are working on `{{PROJECT_NAME}}`, a project under the `gevorg.space` infrastructure.

## Quick facts

- **Type**: static site (deployed to Yandex Object Storage + CDN)
- **Staging**: https://{{PROJECT_NAME}}-staging.gevorg.space
- **Production**: https://{{PROJECT_NAME}}.gevorg.space
- **Repo**: https://github.com/tseh-company/{{PROJECT_NAME}}

## Read before changing anything

1. [`SPEC.md`](./SPEC.md) — what we're building (goals, non-goals, acceptance criteria, open questions)
2. [`STATE.md`](./STATE.md) — current iteration, open issues, last deploys (auto-updated by CI)
3. [`DECISIONS.md`](./DECISIONS.md) — log of choices we've made and why (append-only)
4. [`memory/`](./memory/) — accumulated knowledge from past sessions
5. [`CONTRIBUTING.md`](./CONTRIBUTING.md) — the flow (PR → staging → review → approve → prod)

## Deployment flow (do not bypass)

```
feature branch → push → CI (test + a11y + Lighthouse + Playwright smoke)
              → deploy to {{PROJECT_NAME}}-staging.gevorg.space
              → PR comment with URL + screenshots + check table
              → 1 approving review required
              → merge to main (squash)
              → manual approval in GH Environment "production"
              → deploy to {{PROJECT_NAME}}.gevorg.space
              → post-deploy smoke check
```

You are blocked at the OS-hook level from:
- pushing directly to `main`
- `gh pr merge --admin`
- writing directly to the prod bucket via `aws s3`

Don't try to work around. Use the flow.

## What goes into DECISIONS.md

Append a section every time you make a non-obvious choice. Format:

```md
## YYYY-MM-DD iter-N — short title
Context: <why this came up>
Options considered: <bulleted>
Chose: <the option>
Why: <reasoning>
Trade-offs accepted: <bulleted>
```

## What goes into memory/

- `context.md` — what we know about the project's domain (industry, customers, terms)
- `glossary.md` — terms from the TZ that the next session will need
- `pitfalls.md` — things we tried that didn't work, append a one-liner each time

Update them DURING the work, not after. The next session reads them first.

## Stack & conventions for this template

- Plain HTML/CSS/JS by default. If a build step is needed, add `package.json` + `npm run build` and put output in `dist/`. CI auto-detects.
- One `index.html` at the root, one `404.html`, additional pages as `<name>.html`.
- Inline CSS for small landings, `styles.css` for anything else.
- No analytics by default — add explicitly via `DECISIONS.md` if requested.
- No third-party CDN deps without a `DECISIONS.md` entry. Prefer vendored.

## When the user gives feedback

If it's multiple items → use the `gevorg-feedback` skill to create Issues first, then `gevorg-iterate` to fix.
If it's a single small fix → `gevorg-iterate` directly, mention in the PR what was changed.

Always update `STATE.md` (CI does most of it, but iteration count and notes are manual).
