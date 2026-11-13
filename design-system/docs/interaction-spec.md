# Interaction spec

## Persistent vs on demand

- **Always visible:**
  - top bar
  - stage with view tabs, bay pills, CAD cluster, title block and bus strip
  - operator column (current LOTO step + Bay Operator)
  - toasts
- **One click away:**
  - rail drawers: Tools & keys, PPE, Megger, Parts, Permit, Help
  - plant popover
  - ⋮ menu
  - the full step list
  - explode slider
- **Modal:** the permit, the Assessment notice (Exam), the NFPA 70E report (Tier 2), mission briefing* and debrief*.

\* Proposed addition.

Only one drawer is open at a time. `Esc` closes the topmost layer: tooltip, then popover, then drawer, then dialog. A drawer remembers its scroll position per session.

## Bay Operator behaviour

- It always shows the **selected bay**. Clicking a bay in 3D, a pill, an SLD symbol or a faceplate column selects it.
- Sections, top to bottom:
  - head (code, name, LIVE / DEAD / EARTHED)
  - PPE banner (only while PPE < 3/3)
  - state (truck track, 4 indicators, key chip, tags)
  - Breaker
  - Racking & lockout
  - Earth switch EK6
  - Compartment (terminals PE / L1 / L2 / L3 appear when the door is open)
- In Training, when the current step's target is inside the Bay Operator, the panel **scrolls that control into view** after every render.
- **LV bay (C5 ACB-TR1-LV):** Breaker + Lockout only ("Padlock ACB", "Extract K-LV"), matching the shipped `!cub.isHV` branch.
- Labels are unified across views: Close · Trip · Rack out −10 · Rack in +10 · Padlock port / Remove port padlock · Extract K1-BT / Return K1-BT · Insert K1-BT · Close earth / Open earth · Padlock earth / Earth locked · Open door / Close door · Lock red shutter · Prove wand · PE · L1 · L2 · L3. The changes are listed in the change log.

## How blocked actions explain themselves

1. **Prediction (Training only).** For each Bay Operator action, a pure function `interlockFor(action, cub, SIM)` returns `null`, `{tier:1, title, reason, fix}` or `{tier:2, …}`. It reads state only. Its conditions and strings mirror the existing `triggerViolation()` calls one-to-one (table below). No rule is added or changed.
2. **Interlocked state.** The button gets `.is-interlocked` (+ `.tier-2`) and `aria-describedby` pointing to its tooltip. A padlock replaces the icon and the edge is dashed (red for Tier 2). The button is **not** disabled.
3. **Reason tooltip.** It appears on hover after 300ms, immediately on keyboard focus, and on the **first tap** on touch. A second tap operates. It holds the interlock title, the reason, and a **Fix** row with one-click buttons for the prerequisite actions, plus the cost tag (`Tier 1 · −5` or `Tier 2 · arc-flash · −5`).
4. **If the student operates anyway**, the shipped `triggerViolation()` runs unchanged: 5 points are deducted. Tier 1 shows the amber toast (`.toast.t-tier1`) with title, reason, `TIER 1` badge, bay, action and `−5 · score`. Tier 2 shows the vignette, the hazard banner, the red toast and the NFPA 70E notice.
5. **Exam** skips steps 1–3. Every violation opens the Assessment notice (Tier 1, as shipped) or the NFPA 70E report (Tier 2).

| Action | Tier | Title (shipped) | Fix buttons |
|---|---|---|---|
| Rack ± when VCB closed | 2 | Live Racking Prevention Interlock Engaged | Trip |
| Rack when port padlocked | 1 | Racking Port Padlocked | Remove port padlock |
| Rack in when key extracted | 1 | VCB Castell Key Extracted | Return K1-BT |
| Close VCB mid-travel / disconnected | 1 | Cannot Close VCB in Mid-Travel or Disconnected Position | Rack in +10 |
| Close VCB with earth closed | 2 | Cannot Close VCB on Closed Earth Switch | Open earth |
| Close VCB, key out | 1 | VCB Locked Out by Castell Key | Return key |
| Extract key not at 0/20 or closed | 1 | Castell Key Trapped in VCB | Trip · Rack out |
| Close earth not disconnected | 2 | Cannot Earth Non-Disconnected Breaker Slot | Rack out |
| Close earth, keys missing | 1 | Missing Castell Key(s) for Earth Switch | Insert K… |
| Open earth while padlocked | 1 | Earth Switch Padlocked | Remove earth padlock |
| Open door, VCB in slot | 1 / 2 (2 if closed) | Door Interlocked: VCB In-Slot | Rack out |
| Open door, earth open | 2 | Door Interlocked: Earth Switch Open | Close earth |
| Probe before proving wand | 1 | Probed Phase Before Proving Wand | Prove wand |
| CME phase before PE / PE removed first | 1 | Applied Phase Clamp Before PE Earth Clamp / Removed PE Earth Clamp While Phase Clamps Attached | PE |
| Any HV action without full PPE | 1 | Incomplete PPE for … | Don all |
| Megger without SFT / leads | 1 | 5 kV Megger Blocked… / Megger Test Leads Not Connected | Permit · Connect leads |

## Training vs Exam

| | Training | Exam / CoC |
|---|---|---|
| Chrome | Standard top bar | 3px ink rule under the top bar, `EXAM / CoC` flag, timer* |
| Score | Coloured badge (safe ≥90, earth ≥70, live below) | `quiet` badge (neutral, no colour change) |
| Stepper | All steps; current expanded with description and quick action | Completed steps only, then "Step n of 6 · No hints". Quick-action buttons hidden |
| Spotlight | Pulse + "Next" tag on the target control | Off |
| Interlocked state / tooltips | On | Off |
| Tier 1 | Amber toast | Assessment notice dialog (shipped) |
| Tier 2 | Banner + toast + NFPA report | Same |
| End | Debrief* | Debrief* with time |

Switching mode mid-mission asks for confirmation and restarts the timer*.

\* Proposed addition.

## Keyboard map

| Key | Action | Status |
|---|---|---|
| `F` | Maximize 3D / exit Theater | shipped |
| `?` | Keyboard shortcuts sheet | proposed |
| `/` | Search (help drawer, or parts selector when open) | proposed |
| `1`–`5` | Select bay C1–C5 (tools drawer closed) | proposed |
| `1`–`0` | Pick tool (Tools drawer open) | proposed |
| `T` | Tools & keys drawer · `P` PPE · `G` Megger · `L` Parts · `W` Permit · `H` Help | proposed |
| `I` / `O` | Close / Trip the selected bay's breaker (Training: through the same interlocks) | proposed |
| `[` / `]` | Rack out −10 / Rack in +10 | proposed |
| `E` | Earth switch close/open | proposed |
| `X` | X-ray · `B` Labels · `R` Orbit · `0` Fit | proposed |
| `M` | Sound on/off | proposed |
| `Esc` | Close topmost layer / dismiss arc banner | proposed |
| `Tab` / arrows | Focus order: top bar → rail → view tabs → bay pills (arrows) → CAD cluster → stage → operator column | proposed |

Single-letter shortcuts are inactive while a text field has focus, and they never fire on `keyup` repeat. Operation keys (`I`, `O`, `[`, `]`, `E`) are off in Exam unless the instructor enables them.

## Touch

Targets are 44px under `(pointer: coarse)`. `user-select: none` is limited to the stage and controls, so text in drawers and dialogs stays selectable. Tap on an interlocked control shows the reason first. Drawers are swipe-to-close from their edge. On the stage, one finger orbits, two fingers pan and pinch zooms (as shipped in OrbitControls).

## Tier 2 event sequence

0ms: vignette, klaxon and the 3D plasma event (shipped). The banner appears at the top of the stage, the toast below it and the NFPA notice as a dialog. The banner auto-hides after 8.5s (shipped) or on `Esc`. Focus moves to the NFPA dialog's primary button. The Bay Operator keeps showing the cause control in `.is-interlocked.tier-2`. Under reduced motion the vignette is static for 1.4s and there is no camera shake.
