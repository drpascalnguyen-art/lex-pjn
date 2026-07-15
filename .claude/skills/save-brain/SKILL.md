---
name: save-brain
description: Save the current session's work to Pascal's second brain. Writes a dated session note to second-brain/inbox/, commits all session files, pushes, and reports proof (commit hash + links). Use at the end of ANY substantive work session, or whenever Pascal says "save this", "save our work", or "lock it in".
---

# Save to Second Brain

You are persisting this session's work so it reaches Pascal's Obsidian vault via the
repo's `second-brain/inbox/` folder. Follow every step; do not skip the proof step.

## Steps

1. **Compose the session note.** Create `second-brain/inbox/YYYY-MM-DD - <Topic>.md`
   (today's date; short topic, e.g. "AI Dentist Skool Setup"). Structure:
   - `## Decisions` — every decision locked this session, one line each
   - `## Work produced` — deliverables with repo paths and/or artifact URLs
   - `## Open items` — numbered, with owner (Pascal / Jenn / Sandra / next session)
   - `## Context for future sessions` — anything a fresh session would need to continue
   If a note for today + same topic already exists, append a timestamped section
   instead of overwriting.

2. **Stage every session file.** Any files created this session (assets, docs, scripts)
   go under an appropriate repo folder (e.g. `ai-dentist/`), referenced from the note.

3. **Commit and push** to the current session branch. Commit message:
   `Second brain: <topic> session save`.

4. **Prove it.** Report to Pascal: the commit hash, the note's repo path, and any
   artifact URLs. State plainly: "This lands in Obsidian on the next Mac-side sync."
   NEVER say "saved to Obsidian" — a remote session cannot verify the vault.

5. **If push or any step fails:** say so explicitly, state where the content currently
   lives, and publish the note as an artifact as a fallback so nothing is lost.
