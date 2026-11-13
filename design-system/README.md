# Marine HV Console — design system source

Source files for the UI/UX redesign of `marine-hv-simulator-3d.html`. The full system with live previews and screens is published as a Design System artifact; this folder keeps the parts a developer needs in the repo.

| Path | What |
|---|---|
| `tokens.json` | Design tokens (Day, Night watch, Projector themes; type, spacing, radius, size, motion, z-index) |
| `tokens.css` | The same tokens as CSS custom properties (`data-theme="day|night|projector"`) |
| `components.css` | Component stylesheet; keeps shipped class names where a component maps 1:1 |
| `icons/shipped/` | The 33 icons of the app's `#i-*` sprite, as single-ink SVG files |
| `icons/proposed/` | 21 proposed new icons on the same 24px / 1.8-stroke grid |
| `docs/brand-book.md` | Usage rules: colour, type, spacing, motion, accessibility, iconography, layout |
| `docs/brief-and-layout.md` | Findings verified in the code, layout concept, judgment calls |
| `docs/interaction-spec.md` | Persistent vs on-demand, interlock explanations, Training vs Exam, keyboard map |
| `docs/developer-handoff.md` | Mapping of every existing element ID onto the new components |
| `docs/proposed-additions-and-wording.md` | Proposed additions and every flagged wording change |

Nothing here is wired into the app yet; `marine-hv-simulator-3d.html` is unchanged.
