The operator-console system for the Marine HV 6.6 kV Switchboard simulator: a 3D digital twin and a switching / Permit-to-Work trainer, used by ETO and marine-engineering students and projected in class by instructors. It keeps the shipped "Chart Room" character: calm, precise, warm paper neutrals, sea teal and brass, signal colours that mean what they mean on a real switchboard. It adds the hierarchy, state language and themes the app needs to be learnable, projector-legible and touch-ready.

Everything here is implementable as plain HTML/CSS/vanilla JS in the existing single-file app: `tokens.css` + `components.css` replace the app's `<style>` block, and the shipped class names (`.btn`, `.chip`, `.segmented-tab`, `.cub-pill`, `.state-flag`, `.toast`, `.tool-item`, `.key-tag`) are kept wherever a component maps one-to-one.

## Principles

1. **The 3D twin is the hero.** The stage is full-bleed under every floating cluster. By default at 1920×1080 about 60% of the viewport is unobstructed canvas; Theater (`F`) takes it to ~90%.
2. **One home per control.** Every bay operation lives in the **Bay Operator** (`#bayOperator` → `#bayControls`). The faceplate, compartment and single-line views render the *same* buttons with the same `data-hud-act` values; the Quick-Action HUD is retired.
3. **Interlocks teach.** In Training, a control whose interlock would fire wears the *interlocked* state (dashed edge + padlock) and explains itself on hover, focus and tap, in the same words the interlock uses when it fires.
4. **One state language.** Truck, breaker, earth switch, padlock, key, PPE, voltage and tags each have one drawing, used everywhere.
5. **Show what the task needs now.** Persistent: top bar, stage, Bay Operator, current LOTO step. On demand: tools & keys, PPE, Megger, parts/explode, permit, help.

## Content fundamentals

- **Voice:** an instructor at the switchboard, calm and direct. Imperative for actions ("Trip the VCB"), present tense for state ("Earth switch EK6 is open").
- **Technical and safety content is fixed.** Voltages, ratings, standard references (STCW A-III/6, MCA COSWP Ch. 22, IEC 62271-200 Form 4b, IEC 60092-503, ISO 7010 W012, NFPA 70E), interlock wording, golden-rule wording, the 19 sub-assembly names and the 5-point penalty are copied verbatim from the app. Microcopy changes are listed in *Proposed additions & wording changes*.
- **State words are UPPERCASE mono** and match the simulator vocabulary: `LIVE`, `DEAD`, `EARTHED`, `CLOSED [I]`, `OPEN [O]`, `SERVICE 20/20`, `TEST 10/20`, `DISCONNECTED 0/20`, `NOT PROVEN`, `PROVEN DEAD`.
- **Units** sit after a space and are never dropped: `6.60 kV · 60.0 Hz`, `198 A · 1,800 kW`, `450 MΩ`, `4,850 V DC`, `40.0 cal/cm²`. Thousands take a comma. Separate facts with ` · `.
- **Codes before names:** `C3 · BT-M1`, `VI · Vacuum Interrupters`, `PTW-HV-6600-01A`.
- **No emoji, no exclamation marks** outside the shipped hazard copy. Do not add decorative imagery or stock photos. An illustration appears only when it teaches (the truck track, the SLD).
- Placeholders in the CAD title block and permit are literal: `[Name]`, `[Institution]`, `[DD-MM-YYYY · HH:MM]`. Never invent people or institutions.

## Colour

Three themes share one token set: **Day** (default, the shipped palette), **Night watch** (dark, low-glare) and **Projector** (high contrast, 7:1 text). Switch with `data-theme` on `<html>`.

- **Neutrals.** `bg` is the console ground. `panel` is for drawers and the rail, `surface` for cards, controls and floating clusters. `surface-2` covers headers and hover, `surface-3` covers tracks and pressed fills. `stage` sits behind the canvas.
- **Edges.** `line` is a decorative hairline only. `line-strong` outlines cards and clusters. `line-control` is the border of *every* interactive control (≥3:1 on surface and panel; the shipped controls were 1.65:1).
- **Text.** `text` / `text-2` / `text-3` on any neutral. `text-3` is the floor for captions; never go lighter.
- **Accent `accent` (sea teal)** is reserved for primary actions, selection and the current step. Fill with `accent`, put `on-accent` on it, and use `accent-tint` + `accent-ink` for selected chips and rail items.
- **Brass `brass`** marks Castell keys, the key box and "look here" hints, nothing else.
- **Signals follow real-world meaning:**
  - `live`: live, energized, DANGER, breaker CLOSED [I].
  - `safe`: dead-proven, breaker OPEN [O], done.
  - `earth`: earthed, earth switch closed, CME applied, earth tag, and the Tier 1 interlock.
  - `test`: TEST position, Sanction-for-Test, Megger, stored charge.
  - `info`: neutral information, selected tool.
  - `dead`: grey, de-energized marks.

  Each signal has `-tint` (background), `-line` (border), `-ink` (text, ≥7:1, the "critical status" floor) and `on-` (text on the solid fill). Use the ink token for text, never the mark colour.
- **Hazard tokens** (`hazard-ground`, `hazard-yellow`, `hazard-red`, `hazard-stripe-a/b`) appear only during a Tier 2 arc-flash event and on genuinely live compartments or back-feed. Hazard stripes are never decorative.
- **Bay identity** `bay-c1` … `bay-c5` and **part categories** `cat-enclosure` … `cat-power` are identity, not state. They go on the pill dot, the Bay Operator top edge and callout code chips. Two shipped pairs miss 4.5:1 for white chip text in Day (`bay-c3` 4.497:1, `cat-safety` 4.35:1): keep those codes 14px bold, or use Projector.
- **Never colour alone.** Every state also carries a word, a glyph or a shape: `[I]/[O]`, the padlock badge, the dashed "unknown" glyph, square/circle/triangle telemetry dots, the "Next" tag on the spotlight.

## Typography

**IBM Plex Sans** for the interface, **IBM Plex Mono** (tabular numerals) for every electrical value, unit, code and state word. Plex is open-licensed; for the offline single-file build, self-host the two woff2 subsets or fall back to `system-ui` / `ui-monospace` (stacks in `--font-sans` / `--font-mono`).

| Style | Size / line | Use |
|---|---|---|
| `display` | 28/34 600 | Mission briefing and debrief titles |
| `title-lg` | 22/28 600 | Dialog and drawer titles |
| `title` | 18/24 600 | Bay Operator heading, current step |
| `heading` | 16/22 600 | Group headings |
| `body` | 15/22 | Default (the shipped base) |
| `body-sm` | 14/20 | **The desktop minimum**: tooltips, captions |
| `label` | 14/18 500 | Buttons, chips, tabs |
| `eyebrow` | 13/16 600 caps +0.04em | Labels above values; replaces the 10.5–11.5px eyebrows |
| `readout-xl` | 32/36 mono | Megger IR/PI, exam timer, debrief score |
| `readout` | 20/26 mono | Bay voltage, truck turns, stored charge |
| `data` / `data-sm` | 15/20, 14/18 mono | Telemetry, codes, state words |

**Presentation density** (`.density-presentation`, on by default in Theater) raises body to 17px and controls to 40/48px. Nothing on screen is smaller than 13px, and only eyebrows go that small.

## Spacing, radius, size, elevation

- 4px base: `space-1` 4 · `space-2` 8 · `space-3` 12 · `space-4` 16 · `space-5` 20 · `space-6` 24 · `space-8` 32 · `space-12` 48. Clusters float `space-4` (16px) from the stage edge.
- Radii keep the shipped steps: `radius-sm` 4 for badges and chips, `radius` 6 for controls, `radius-lg` 9 for cards, clusters, drawers and dialogs, and `radius-pill` for bay pills and the plant chip.
- Controls: `control-sm` 32 (compact desktop), `control-md` 40 (default), `control-touch` 44, applied automatically under `(pointer: coarse)`. The workspace frame uses `topbar-h` 56, `rail-w` 64, `drawer-w` 400 and `operator-w` 360.
- Elevation: `shadow-1` for resting controls, `shadow-2` for floating clusters, toasts and popovers, `shadow-3` for drawers and dialogs. The Projector theme swaps shadows for solid outlines.

## Motion

- Breaker, earth switch, key and padlock changes are **instant** (`dur-instant`). The state is the feedback.
- UI motion never exceeds `dur-base` 180ms with `ease-standard`. Drawers slide, toasts drop 6px, popovers fade.
- The Training spotlight pulses its halo once per `dur-pulse` (1.6s). Under `prefers-reduced-motion` it becomes a static ring with the "Next" tag.
- Arc-flash: a red edge vignette (inset shadow, no full-screen flash), the hazard banner and the klaxon. No camera shake under reduced motion.

## Focus, contrast, accessibility

- Focus ring: 2px solid `focus` (ink, not a signal colour), 2px offset, on every interactive element, in every theme.
- Text pairs meet 4.5:1 in all themes. Signal ink on its tint meets 7:1. Control borders, icons and the focus ring meet 3:1. Projector meets 7:1 for all text.
- `forced-colors` gives controls `CanvasText` borders, selection a `Highlight` outline, and the spotlight a dashed outline.
- The Faceplate, Compartment and Single-line views are the non-3D path: every bay operation, terminal and state is a real, focusable button there.
- Toasts go to `#toastHost` (`aria-live="polite"`). Tier 2 events use `role="alert"`.

## Iconography

24px viewBox, 1.8 stroke, round caps and joins, `stroke: currentColor` in the app sprite (`<symbol id="i-*">`). Icons sit at 20px in controls (`icon`), 24px on the rail and in state glyphs (`icon-lg`), and 16px in badges.

- **Shipped (33):** bolt, shield, hand, wrench, earth, lock, tag, probe, chain, meter, key, cube, panel, door, diagram, book, sound, mute, reset, play, layers, eye, orbit, check, alert, info, help, fit, x, minus, expand, doc, pin.
- **Proposed additions (21):** timer, search, moon, contrast, keyboard, chevron-left/right/down, truck, breaker, shutter, glove, boot, suit, clipboard, filter, more, target, camera, explode, rail.
- The ISO 7010 W012 sign is the app's own `buildIso7010ArcSvg()`. Never redraw it as an icon.
- The asset files are single-ink SVGs stroked in Day `text` (#1f2529). In the app, use the sprite with `currentColor` instead.

## Layout

```
┌ top bar 56 ─ brand · mission ▾ ············ plant ▾ · [Training|Exam] · score · ? · ⋮ ┐
├ rail ┬──────────────────────── stage (full-bleed canvas) ─────────────────┬──────────┤
│ 64   │ [view tabs | C1 … C5]                                     toasts   │ LOTO     │
│Tools │ [cam/CAD                                                           │ current  │
│PPE   │  cluster]                    3D twin                               │ step     │
│Megger│                                                                    ├──────────┤
│Parts │                                                                    │ Bay      │
│Permit│ [CAD title block]                                                  │ Operator │
│Help  │ [bus strip: Bus A · Bus B · BT-M1 · TR1 · 440 V]                   │ 360      │
└──────┴────────────────────────────────────────────────────────────────────┴──────────┘
```

Drawers open from the rail over the stage's left edge, one at a time. Dialogs (permit, briefing, notice, debrief) sit over a `scrim`.
