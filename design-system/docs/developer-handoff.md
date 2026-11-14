# Developer handoff — mapping onto the existing DOM

Target: `marine-hv-simulator-3d.html` at c9cfb5c. The redesign changes markup and CSS only. `SIM`, `triggerViolation()`, `getLotoSteps()`, the mission logic, the Three.js scene and `AudioEngine` are untouched.

## Order of work

1. **Styles.** Replace the `<style>` block with `tokens.css` + `components.css`. Add `data-theme="day"` to `<html>` and set `<meta name="color-scheme" content="light dark">`. Remove `min-width: 1100px` and the global `user-select: none` from `body`.
2. **Sprite.** Add the 21 proposed icons as `<symbol>`s in the existing sprite.
3. **Restructure the shell** (table below), keeping IDs.
4. **Bay Operator.** Rewrite `renderBayControls()` to emit the new markup, keeping the same `onclick` strings, and add `data-hud-act` to every button. Make `renderQuickActionHud()` a no-op that empties `#quickActionHud` (see "Removed").
5. **Interlocks.** Add `interlockFor()` (spec) and apply `.is-interlocked` in Training.
6. **Toasts.** Update `showToast()`: new markup plus a `tier1` tone. In `triggerViolation()`, call `logEvent(..., catastrophic ? 'tier2' : 'tier1')` instead of `'danger'`.

## Element map

| Existing | Status | New home / note |
|---|---|---|
| `header.topbar` | kept (restyled) | `.ws-top`. Brand, mission chip, plant chip, mode switch, score, help, ⋮ |
| `#telGen #telBus #telLoad #telTie #telRules` and `#topTel*` | **moved** | Into the plant popover (`.popover`). IDs unchanged; the plant chip reads the same values |
| `#topScoreBadge`, `#topScoreText` | kept | `.score-badge` (+ `.quiet` in Exam) |
| `#btnToggleHelp` | kept, **relocated** | Rail "Help" button. Same ID; opens the Help drawer |
| `#btnToggleMode` | kept, **restyled** | Becomes the Training / Exam segmented switch. Keep the ID on the wrapper; the click handler toggles as before (update its innerHTML write) |
| `#btnOpenManual`, `#btnToggleAudio`, `#btnResetAll` | kept, **relocated** | ⋮ menu items (`.menu-item`). IDs unchanged |
| `#workspaceGrid` (`.workspace`) | kept | `.ws` grid. Keeps `.exam-mode`, `.left-collapsed`, `.right-collapsed` |
| `#leftPanel`, `.left-tabs-bar` | **replaced** | `nav.rail` + drawers. `#leftPanel` stays as the drawer host |
| `#tabLeftMissionPpe`, `#tabLeftToolsKeys` | **merged** | Rail buttons PPE and Tools & keys. IDs kept on those rail buttons so existing listeners work |
| `#leftPaneMissionPpe` | **split** | Mission list → mission chip popover / briefing. PPE → `#drawer-ppe`. Keep the ID on the PPE drawer body |
| `#missionCountBadge`, `[data-m]` | kept | Inside the mission popover / briefing nav |
| `#btnEquipAllPPE #btnRollTest #btnDonGloves #btnDonSuit #btnDonBoots`, `#ppe*Row`, `#ppe*Sub` | kept | PPE drawer (`.ppe-row`). `#btnEquipAllPPE` is also mirrored by the Bay Operator banner (`[data-hud-act="ppe"]`, which clicks it) |
| `#leftPaneToolsKeys`, `#toolbeltGrid`, `[data-t]`, `#currentToolLabel` | kept | Tools & keys drawer |
| `#keyChipsContainer`, `#keyBoxStatusBadge`, `#btnToggleKeyBox` | kept | Tools & keys drawer. Chips become `.key-tag[data-at]` |
| `#meggerSectionBox`, `#meggerLeadBadge`, `#valMegger1Min #valMegger10Min #valMeggerPI #valMeggerVolts`, `#btnConnectMeggerLeads #btnExecuteMeggerTest #btnBleedMeggerCharge` | kept, **moved** | Own Megger drawer (rail "Megger") |
| `#btnCollapseLeft`, `#btnCollapseRight` | kept | Left: closes the open drawer. Right: collapses the operator column. `toggleTheater` still sets both classes |
| `.view-toolbar`, `#tabView3D #tabViewFaceplate #tabViewInterior #tabViewSLD` | kept | Floating view cluster |
| `#cubicleNavPills`, `[data-c]` | kept | Floating view cluster |
| `#cadToolbar`, `[data-cam]`, `#btn3DCallouts #btn3DXray #btn3DOrbit #btnTheater3D #btnArcFlashDemo` | kept | Vertical CAD cluster. The camera presets go into a menu under "Active bay ▾" (`[data-cam]` buttons unchanged); `Fit` stays visible |
| `#sliderExplode`, `#lblExplodePct`, `[data-exp]` | kept | Explode popover from the cluster's Explode chip |
| `#partsStrip` | **removed as a bar** | Content moves to the Parts drawer / popover; `#partsStrip` stays as that container |
| `#btnPartsDropdown`, `#partsDropdownDot`, `#partsDropdownBadge`, `#partsDropdownMenu`, `#partChips`, `#btnPartResetAll` | kept | Parts popover (adds a search field and category filter: new markup, existing `[data-part]` chips) |
| `#partInfo` | kept | Becomes the floating part card |
| `.cat-legend` | **merged** | Into the parts popover's category filter |
| `#stage3DWrap`, `#threeCanvasHost`, `#calloutLayer`, `#calloutSvg`, `#arcFlashVignette`, `#arcFlashHudBanner`, `#toastHost` | **kept, full-bleed** | Unchanged stacking (`z-*` tokens) |
| `.stage-hint` | kept | Smaller, bottom-right of the free stage |
| `#quickActionHud` | **removed (kept empty)** | Its buttons live in the Bay Operator. Keep the empty element `hidden` so the `#quickActionHud [data-hud-act=…]` spotlight selectors match nothing; the `#bayControls` selectors still hit |
| `#viewStageArea` | kept | Faceplate / Compartment / SLD render here, restyled with the state components |
| `.busbar-dock`, `#busCardA #busCardB #busCardFeeder #busCardTr1 #busCard440`, `#bus*Text` | kept | Floating bus strip. Each card gets a `.st-word` span |
| `#quickStepTipText` | **merged** | Into the compact stepper's "Next:" line; keep the ID on that element |
| `#bottomStatusScenario`, `#bottomStatusEvent` | kept, **relocated** | The mission chip carries the scenario; the last event becomes `.stage-hint`-style text on the stage. IDs kept |
| `.right-panel`, `#inspHeader #inspEyebrow #inspBayCode #inspTitle #inspStatusBadge` | **merged** | Into the Bay Operator head (`.bay-op-head`); IDs kept on the equivalent elements |
| `#metaVoltage #metaCurrent #metaTruck #metaEarth` | **merged** | Into the Bay Operator state section: voltage indicator, a current/load caption, the `.truck` track and the earth indicator. IDs kept on the value elements |
| `#bayControls` | kept | Inside `#bayOperator`; its content is the action sections |
| `#lotoPtwCode`, `#btnFullPtwView`, `#lotoProgressBar`, `#lotoStepsList`, `#btnResetPermit` | kept | Stepper card. `#lotoProgressBar` → the golden-rule rail (keep a hidden progress element with the ID, or update `render()`). `#btnResetPermit` → the stepper's ⋮ |
| `#lotoStripVcb #lotoStripTruck #lotoStripPtp #lotoStripEarth` | **merged** | Their state is shown by the Bay Operator indicators. Keep the IDs as `sr-only` spans, or delete the four `textContent` writes |
| `#infoPurposeText`, Standards card | **moved** | Mission briefing and Help → Missions |
| `#helpFloat`, `#helpDragHandle`, `#helpMinimize #helpExpand #helpCloseBtn`, `[data-htab]`, `#hpane-*`, `#tutorialMissionIntroBanner`, `#tutorialStepsContainer` | **restyled** | Help drawer. The drag/minimize/expand handlers become no-ops (remove the drag code); `#helpCloseBtn` closes the drawer. Panes and tabs are unchanged; add a search field |
| `dialog#manualDialog`, `#ptwDialog` / `#ptwModalBody`, `#noticeDialog` / `#noticeTitle` / `#noticeBody` | kept | `.modal`; the permit body is rendered as `.permit` |

## Spotlight selectors (must keep working)

- `applyStepSpotlights()` matches `#bayControls [onclick*="…"]`. Keep the exact `onclick="pressTripVCB('BT-M1')"`-style attributes on Bay Operator buttons.
- The LOTO card selector changes. Replace `#lotoStepsList .loto-step-card.active-step .step-action-bar .btn` with `#lotoStepsList .st.current .st-act .btn`; this is the **only** selector edit.
- The spotlight class name `.step-spotlight` is unchanged; only its CSS changes.

## Classes renamed

| Old | New |
|---|---|
| `.loto-step-card` `.active-step` `.completed-step` | `.st` `.current` `.done` |
| `.step-number-circle` | `.st-mark` |
| `.step-title-text` / `.step-desc` / `.step-action-bar` | `.st-title` / `.st-desc` / `.st-act` |
| `.ppe-row.equipped` | same, plus `.partial` |
| `.key-tag.in-hand` | same, plus `[data-at="vcb\|hand\|earth\|box"]` |
| `.chip-arc-demo` | `.chip.chip-hazard` |
| `.toast` + inline `--tc` | `.toast.t-info\|t-safe\|t-tier1\|t-tier2` |
| `.help-float*` | `.drawer*` |

## New hooks

- `#bayOperator`
- `#drawer-tools`, `#drawer-ppe`, `#drawer-megger`, `#drawer-parts`, `#drawer-help`, `#drawer-permit`
- `.rail-btn[aria-controls]`
- `.is-interlocked`, `.tier-2`
- `data-theme`, `.density-presentation`

## Removed (nothing functional)

- The Quick-Action HUD's buttons (duplicates).
- The docked CAD and parts *bars*.
- The bottom status strip *bar* (its content is relocated).
- The left tab bar.

Every control they held is reachable from the elements listed above.
