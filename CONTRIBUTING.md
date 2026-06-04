# How to contribute to {{PROJECT_NAME}}

This project is part of the `gevorg.space` factory. The flow is **enforced** at the GitHub branch-protection and Claude Code hook level — you can't shortcut it.

## TL;DR

```
git checkout -b iter-N
# make changes, update SPEC.md / DECISIONS.md if scope shifts
git commit -m "iter-N: <what changed>"
git push -u origin iter-N
gh pr create --fill
# CI deploys to <project>-staging.gevorg.space
# Review on staging, request changes if needed
# After approval, merge → CI waits for "production" environment approval → prod live
```

## Branches

- `main` — represents what's live in production. Direct pushes are blocked.
- `iter-N` — each iteration of work. Squash-merged into `main` via PR.

## Where things live

| File | What |
|---|---|
| `SPEC.md` | Goals, non-goals, user stories, acceptance criteria |
| `DECISIONS.md` | Append-only log of choices and trade-offs |
| `STATE.md` | Current iteration, deploy status (auto-updated) |
| `memory/` | Domain context for future sessions |
| `CLAUDE.md` | Project-level brief for any Claude session opening this folder |

## Doing work via Claude Code

Open a new Claude session in any directory. Tell Claude:

- _"исправь на pizza-staging.gevorg.space опечатку в hero, добавь раздел напитков"_ → Claude triggers `gevorg-iterate`
- _"вот правки на лендинге пиццерии: [список из 5 пунктов]"_ → Claude triggers `gevorg-feedback` → creates Issues → optionally iterates
- _"выкатывай pizza в прод"_ → Claude triggers `gevorg-promote`

You never need to specify deployment targets, secrets, or paths — the global `~/.claude/CLAUDE.md` and the registry in `~/.gevorg-space/projects.yaml` carry that.

## QA gates that must pass before staging deploy

- Lint (eslint / stylelint where applicable)
- Unit tests (`npm test`)
- Type check (`tsc --noEmit` if TS)
- Playwright smoke (`/` loads, no console errors)
- axe-core a11y (WCAG 2.1 AA)
- Lighthouse perf ≥ 80
- size-limit budget

Failures block staging deploy and PR merge.

## How to give feedback to a previous iteration

Just describe it in natural language to Claude. If you have screenshots, drop them into `feedback/iter-N/` and reference. Claude will translate into structured Issues.
