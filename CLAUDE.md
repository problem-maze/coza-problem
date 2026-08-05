# Working conventions for this repo

## Structured output files (standing instruction)

For every question or task given to an AI assistant in this repo, save the full
answer/output to a file under `ai-notes/`, in addition to any chat reply. This lets
other AI tools (Codex, ChatGPT, etc.) read the result without ambiguity or needing
the original chat context.

Rules:
- One file per question/task, in Markdown, under `ai-notes/`.
- Filename: `YYYY-MM-DD-short-slug.md` (e.g. `2026-08-01-globe-perf-plan.md`).
- Each file must be self-contained: state the question/task at the top, then the
  full answer — do not assume the reader has the chat history.
- Use plain, unambiguous structure: headings, tables, code blocks — avoid relying on
  formatting that only renders in one tool's UI.
- Do not edit or delete prior `ai-notes/` files when answering a new question; each
  answer gets its own new file. If a task updates/supersedes an earlier note, say so
  explicitly in the new file (name the file it supersedes).
- This applies regardless of which AI tool is used to work in this repo.
