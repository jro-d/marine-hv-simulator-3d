# Proposed additions & wording changes

Everything below is beyond the shipped feature set or changes shipped text. Accept or drop each line independently.

## Proposed additions (no new simulation rules or facts)

| Addition | Where | Depends on |
|---|---|---|
| Mission picker / briefing dialog on start and mission change | Screen 09 | Existing mission titles and Help → Missions text; **estimated time is a placeholder**, to be supplied |
| Mission debrief / results | Screen 11 | Records the `triggerViolation()` title, tier and step index during the run (UI-side log); no scoring change |
| Exam timer | Top bar | UI-side elapsed time; not scored |
| Quiet score in Exam | Top bar | — |
| Interlock prediction tooltips + fix buttons | Bay Operator | `interlockFor()` mirrors existing conditions and strings |
| Command rail + drawers | Shell | — |
| Plant-state chip + popover | Top bar | Existing telemetry |
| Night watch theme, Projector theme | Tokens | — |
| Presentation density | ⋮ menu, Theater | — |
| Searchable Help drawer | Rail | Existing tutorial panes |
| Parts search + category filter | Parts popover | Existing 19 parts / 7 categories |
| Keyboard shortcuts beyond `F` | Spec | — |
| Golden-rule tag per LOTO step | Stepper | **Annotation mapping steps to rules — needs SME review** (e.g. Mission 01 step 6 covers rules 3 and 5) |
| 21 new icons | Sprite | — |

## Wording changes (all flagged)

| Shipped | Proposed | Why |
|---|---|---|
| Inspector "−10 Out" / HUD "Rack -10" | **Rack out −10** | One label in every view; true minus sign |
| Inspector "+10 In" / HUD "Rack +10" | **Rack in +10** | Same |
| "Padlock Port" / "Padlock" / "Port Locked" | **Padlock port** / **Remove port padlock** | Label names the action, state goes to the indicator |
| "Extract K1-BT" / "Key K1-BT"; "Return K1-BT" / "Ret K1-BT" | **Extract K1-BT** / **Return K1-BT** | Same |
| "Insert K1-BT" / "K1-BT In" | **Insert K1-BT** / **K1-BT inserted** | Same |
| "Close Earth" / "Open Earth" | **Close earth** / **Open earth** | Sentence case |
| "Padlock" / "Earth Locked" / "E-Locked" | **Padlock earth** / **Earth locked** | Same |
| "Lock Red Shutter" / "Red Shutter Locked" / "Lock Shutter" | **Lock red shutter** | Same |
| "Close [I]" / "Trip [O]" | **Close** / **Trip** with an `I` / `O` push-button glyph | Glyph + word; `[I]/[O]` kept in state text |
| "Don PPE" (HUD) | **Don all** (Bay Operator PPE banner) | Matches `#btnEquipAllPPE` |
| "1. Mission & PPE" / "2. Tools & Megger" | Rail: **PPE**, **Tools & keys**, **Megger**; missions under the mission chip | Split by task |
| "Mode: Training" button | Segmented **Training / Exam** | Shows both options |
| "Interlocks" (top button) | **Interlock reference** (⋮ menu) | Clearer |
| "Step-by-step tutorial" | **Help & reference** | It holds four kinds of content |
| "3D & Interlocks FAQ" tab | **Interlock FAQ** | Shorter |
| "Maximize 3D [F]" | **Maximize** + `F` key cap | Same meaning |
| "Arc-Flash Demo" | **Arc-flash demo** | Sentence case |
| "Equipment Parts" | **Parts** | Shorter |
| Toast "[Interlock Block -5 pts] …" | Title **Interlock block · {title}**, score **−5 · {score}/100** | Structured; same facts |
| Tier 1 toast colour red | **Amber** (earth) | Tier 1 ≠ live danger |
| Stepper "Step 0 of 6" | Unchanged | — |
| Bay status colours: EARTHED green, ISOLATED amber | Words unchanged (LIVE / EARTHED / ISOLATED); **EARTHED → earth amber, ISOLATED → safe green** | Colour change only: amber means earthed everywhere else |

No changes to: voltages, ratings, standards, interlock titles/reasons, golden-rule wording, part names/keys, mission titles, step titles/descriptions, the 5-point penalty.
