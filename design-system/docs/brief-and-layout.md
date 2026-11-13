# Brief, findings and layout concept

## What the product is

A browser trainer for ETO and marine-engineering students: they operate a 5-bay 6.6 kV marine main switchboard in 3D (C1 DG1, C2 BT1, C3 BT-M1, C4 TR1-HV, C5 ACB-TR1-LV) and practise LOTO and Permit-to-Work against STCW A-III/6, MCA COSWP Ch. 22 and IEC 62271-200 Form 4b. Every interlock violation costs 5 points. Tier 1 is a mechanical or procedural block. Tier 2 is a live-electrical event with a 3D arc-flash. There are four missions, plus Training and Exam / CoC modes. The source of truth is `marine-hv-simulator-3d.html` (commit c9cfb5c).

**Users:** students alone at a laptop (primary), instructors projecting at 1080p (often in Theater) and running Exam / CoC, and self-study on a landscape tablet.

## Findings verified in the code

1. **Density.** The default screen shows 5 telemetry tiles, 6 top buttons, 14 CAD controls, 10 tools, ~14 bay buttons, ~12 HUD buttons and 5 bus cards, all at similar weight.
2. **Bay operations exist twice, in different styles.** `renderBayControls()` (inspector) and `renderQuickActionHud()` draw the same `onclick` handlers with different labels: "−10 Out" vs "Rack -10", "Padlock Port" vs "Padlock", "Extract K1-BT" vs "Key K1-BT", "Earth Locked" vs "E-Locked".
3. **The stage is squeezed.** Grid `276px | 1fr | 364px` plus 4 stacked bars (view, CAD, parts, bus dock + status) leave the canvas ≈ 44% of a 1440×900 viewport.
4. **Micro-type.** Eyebrows, tel labels, meta and Megger labels are 10.5–11.5px uppercase. Control borders (`line-strong` #cdc9c0) are 1.65:1 on white, and `text-3` is 4.18:1 on `bg`.
5. **Blocked actions are invisible until they punish.** No control is ever disabled. Interlocks fire on click via `triggerViolation()`. The reason exists only in that call's `title` / `reason` strings.
6. **State is scattered.** Truck appears as `metaTruck` text, `lotoStripTruck`, a HUD tag "(20/20 turns)" and a racking fill bar. Earth appears as text, a state-flag and a button label.
7. **Training vs Exam differ only by** the `exam-mode` class (spotlight off) and the Tier 1 notice dialog. No timer, no debrief.
8. **No responsive or touch support:** `body { min-width: 1100px; user-select: none }`, 24–30px targets.
9. **Inline styles everywhere** (`style="display:flex;gap:4px"`, colour literals in the NFPA card, `.chip-arc-demo` hex values).
10. **Light only.**

**Added findings:**

11. **Tier 1 toasts are styled red.** `logEvent(..., 'danger')`, so a padlock reminder looks like an arc-flash. The redesign gives Tier 1 its own amber.
12. **The brief's example "Racking blocked: VCB is CLOSED" is a Tier 2 event in the code.** `rackVCB` on a closed VCB calls `triggerViolation(..., true)`. The tooltip system therefore distinguishes Tier 1 and Tier 2 *before* the click.
13. **The spotlight depends on markup.** It is driven by selectors (`#bayControls [onclick*="pressTripVCB"]`, `#quickActionHud [data-hud-act="trip"]`), so any re-render must keep `onclick` attributes and `data-hud-act` values (see the handoff).
14. **The floating tutorial opens at `right: 400px`**, directly over the stage centre.

## Top 5 UX problems this system fixes

1. **Hierarchy:** progressive disclosure with a command rail, drawers and one floating Bay Operator.
2. **Duplicated controls:** one Bay Operator component with defined states replaces the inspector and the HUD.
3. **Unteachable interlocks:** the interlocked button state, a reason tooltip with a fix path, and Tier 1 / Tier 2 toasts as one system.
4. **Scattered state:** one state language (truck track, indicators, key chip, tags) reused in every view.
5. **Same feel in Training and Exam, and poor classroom legibility:** distinct Exam chrome with timer, quiet score and no hints, a 14px minimum, Projector and Night watch themes, and Presentation density.

## Layout concept

| Region | Persistent | On demand |
|---|---|---|
| Top bar (56) | Brand · mission chip · plant-state chip · mode switch · score · help · ⋮ | Plant popover (5 telemetry tiles), ⋮ menu (sound, interlock reference, theme, density, shortcuts, reset) |
| Command rail (64) | Tools & keys · PPE · Megger · Parts · Permit · Help · Theater | Each opens one 400px drawer over the stage's left edge |
| Stage | Full-bleed canvas, callout layer, view tabs + bay pills, CAD cluster, CAD title block, bus strip, toasts | Explode slider, parts selector, part card |
| Operator column (360) | Current LOTO step (compact stepper) + Bay Operator | Full 6-step list, permit dialog |

At 1920×1080 the unobstructed canvas is ≈ 60% of the viewport, and the canvas renders full-bleed under every cluster. Collapsing the operator column (») gives ≈ 78%, and Theater gives ≈ 90%.

**Breakpoints**

- **≥1440:** as above.
- **1280–1439:** operator column 330, icon-only CAD cluster, bus strip folded into the plant chip, brand name hidden.
- **iPad landscape 1024–1180:** the same, plus every target at 44px. Drawers overlay the operator column, the stepper shows only the current step, and the bay pills collapse to one "C3 BT-M1 ▾" picker.
- **<1024:** not a target (the brief's minimum is 1024×768).

## Judgment calls

- **Interlocked controls stay clickable.** *Why:* the penalty-on-click is the pedagogy and the scoring rule. *Alternative:* `disabled` buttons, which would silently remove the student's chance to make, and learn from, the mistake.
- **No interlock hints in Exam.** Exam hides the interlocked styling and tooltips. *Alternative:* keep reasons in Exam but hide the fix path.
- **Drawers overlay the stage rather than push it.** *Why:* the camera framing doesn't jump. *Alternative:* push, as the shipped grid does.
- **The stepper and Bay Operator share one right column**, with the stepper compact. *Alternative:* a horizontal stepper across the top of the stage. It reads well on a projector but competes with the view tabs.
- **CAD tools form a vertical cluster on the stage's left.** It is the CAD convention and keeps the bottom free for the bus strip. *Alternative:* a bottom-centre toolbar.
- **The focus ring is ink, not teal,** so it is never mistaken for selection or the spotlight. *Alternative:* a teal double ring.
- **The Night watch theme is dark warm-grey with lightened signals,** not a red-only bridge night mode, because red is reserved for LIVE. "Red-safe" here means the live red stays distinct and never washes into the chrome.
