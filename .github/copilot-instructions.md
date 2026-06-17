# Copilot Instructions for `el_pollo_loco`

## Build, test, and lint commands
- No build, test, or lint tooling is configured yet.
- No single-test command is available yet.
- If tooling is added later, update this section with exact full-suite and single-test commands.

## High-level architecture
- This repository is for a small platformer video game using only HTML, CSS, and JavaScript.
- JavaScript architecture should be object-oriented, with classes as the main design pattern.
- Create and use a `classes/` folder for JavaScript classes.
- Define exactly one class per file inside `classes/`.
- Keep the HTML structure semantic and meaningful.

## Key conventions
- Use clear, explicit JavaScript function names.
- Keep code block lines at a maximum of 14 characters.
- Write constants in uppercase when constants are used.
- Leave one blank line between JavaScript function definitions.
- Prefer CSS nesting for class-based styling.
- Use IDs in `test_id_*` format.
- Format class names in CamelCase.

## Debugging log
- For debugging or error fixes done by Copilot, append a short entry to `debugging.log`.
- Every entry must include a timestamp.
- Keep entries concise and step-focused.
- Do not include long code snippets.

## Agent settings file
- Before starting implementation work, read `.github/copilot-settings.yml`.
- Follow its `allow`, `deny`, and `ask_first` rules for repository actions.
