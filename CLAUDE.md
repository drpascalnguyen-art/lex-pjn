# Working rules for this workspace

## Second Brain save discipline (MANDATORY)

Pascal's durable memory is his Obsidian vault ("PJN Second Brain 2026") on his Mac.
Remote sessions cannot write to it directly. The bridge is this repo's `second-brain/inbox/`
folder, which syncs to the vault from the Mac side.

**Every session MUST, before ending any substantive work:**

1. Write a dated markdown note to `second-brain/inbox/` named
   `YYYY-MM-DD - <Topic>.md` capturing: decisions made, work produced,
   open items with owners, and links to any artifacts/files created.
2. Commit and push it. Work that is not pushed does not exist.
3. Tell Pascal explicitly WHERE the work was saved, with links. NEVER claim
   a save to Obsidian itself — remote sessions cannot verify the vault. Say
   "pushed to second-brain/inbox, will appear in Obsidian on next sync."

Use the `/save-brain` skill to do this. If a session produced files
(images, PDFs, scripts), commit them under an appropriate repo folder and
reference them from the note.

**Never falsely confirm a save.** If a save fails, say it failed and where the
content actually is.

## Project notes

- `lex-pjn` root: Pascal's personal daily priming PWA (do not mix business files into app code).
- `ai-dentist/`: AI Practice Systems for Dentists launch — checklist, brand assets.
- `second-brain/inbox/`: outbox for Obsidian — one dated note per work session.
