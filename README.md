# 3D Marine High Voltage (6.6 kV) Switchboard Twin, Switching & PTW Simulator

An interactive, zero-build **Three.js (`r160`) 3D Marine High Voltage (6.6 kV, 60 Hz) Switchboard Digital Twin, 19-Sub-Assembly Exploded CAD Teardown & Permit-to-Work (PTW) Training Simulator** engineered around **STCW 2010 Manila Amendments (Table A-III/6)**, **IEC 60092-503**, **IEC 62271-200 Form 4b**, and **UK MCA COSWP Chapter 22** (*The 5 Golden Rules of Marine HV Safety*).

---

## Key Features

### 1. Ultra-Detailed 5-Bay 3D Switchboard Lineup (`2,280` Procedural CAD Meshes)
- **Photoreal PBR Rendering (VCB-teardown look):** `RoomEnvironment` / PMREM image-based studio reflections, ACES tone mapping, soft key-light shadows, orange-peel powder-coat and brushed-zinc bump finishes, and clear-coated cast-epoxy resin. Every registered part is refined at load time (rolled sheet-metal edges, smooth machined/cast round parts; hex fasteners keep their flats).
- **Reference-Driven Construction Detail:** bolted inspection-window frames with glazing gaskets, perimeter-screwed side skins, roofs and rear covers, black louvre grilles, moulded creepage sheds on the pole barrels, shedded brown cable terminations with crimped lugs and red/yellow/blue phase tapes, green/yellow cable-screen earth leads to an insulated earth bar, cable cleats and gland plates, and a fully detailed `C5` ACB (trip-unit LCD, rating label, ribbed moulded case, rear terminals and risers to the 4-wire busbars). Fastener rows are merged per row so the lineup stays fast.
- **Full 5-Cubicle Marine Switchboard Lineup** mounted on an adaptive two-tier studio concrete plinth with deployable ribbed **15 kV Dielectric Floor Matting**:
  - **`C1 · DG1`** — Port 6.6 kV Diesel Generator 1 Incomer (`3,600 kVA`)
  - **`C2 · BT1`** — 6.6 kV Bus-Tie Vacuum Circuit Breaker (couples Port Bus A & Starboard Bus B)
  - **`C3 · BT-M1`** — Bow Thruster 6.6 kV Motor Feeder (`1,800 kW` VFD)
  - **`C4 · TR1-HV`** — 6.6 kV / 440 V Ship Service Transformer Primary (`Dual-Key Interlocked`)
  - **`C5 · ACB-TR1-LV`** — Detailed 440 V Low-Voltage Secondary Switchboard Bay with `ABB Emax 2` Air Circuit Breaker, multi-plate de-ion arc chutes, 4-wire copper busbars, and tie bus-duct (`Back-Feed Trap`)
- **Live 3D Switching & Mechanical Kinematics (60 FPS):**
  - **Extruded Viewing-Window Doors:** True `THREE.ExtrudeGeometry` cutouts with hollow bolted bezels, tinted polycarbonate panes, barrel hinges, 3-point espagnolette latch rods, and magnetic warning plaques (`DANGER`, `EARTHED`, `SFT`).
  - **Monolithic Withdrawable VCB Carriage (`VD4/M`):** Translates smoothly between `SERVICE (20/20)` $\rightarrow$ `TEST (10/20)` $\rightarrow$ `DISCONNECTED (0/20)` on machined C-section rails with concentric rotating flanged wheels and Acme lead-screw spindle.
  - **Internal Spring-Charging Mechanism:** Multi-turn helical closing and tripping springs, cam disc, geared DC charging motor, and `Y1/Y2` shunt coils.
  - **Cutaway $\text{Al}_2\text{O}_3$ Ceramic Vacuum Interrupters & 18-Finger Tulips:** Visible internal vapor arc shield, spiral `CuCr` contact discs, and 6-convolute stainless bellows executing a live `12 mm` vertical stroke, paired with 18-finger silver-plated primary tulip clusters and dual garter springs.
  - **Automatic Red & Yellow IP2X Shutters & EK6 Earth Switch:** Scissor-linked metallic shutters, double-blade copper snap-action earthing knives, 3D brass Castell trapped keys (`K1-BT`, `K-HV`, `K-LV`), 3D red LOTO padlocks, 3D telescopic `6.6 kV` proving wand, 3D braided `CME` portable earth cables, and `5,000 V DC` Megger leads.

### 2. Zero-Contact 19-Sub-Assembly Exploded CAD View (`0%–100%`)
- **Guaranteed Non-Touching `100%` Explosion:** Every active bay decomposes into **19 distinct, category-coded engineering sub-assemblies** while neighbor bays smoothly separate laterally so **no two sub-assemblies touch or overlap** (`>= 32 cm` minimum 3D air clearance between every pair, strictly floor-safe `y >= 0.0`):
  1. **`SK`** — Base C-Channel Skid, Anti-Vibration Chocks & M20 Anchor Bolts
  2. **`CF`** — Form 4b Segregated Sheet-Steel Frame, Corner Posts & Partitions
  3. **`AR`** — Roof Overpressure Arc-Relief Flaps, Bronze Flame Mesh & Eyebolts
  4. **`FD`** — Extruded Hinged Front VCB Door, Window Bezel, Espagnolette Rod & Tags
  5. **`LD`** — Upper LV Metering Door, Analog `A`/`kV` Dials, `CVI` LEDs & Cam Switches
  6. **`PR`** — `ABB REF615` Numerical Protection IED, DIN Terminal Blocks, MCBs & Wiring Loom
  7. **`RL`** — Telescopic Racking Guide Rails, Detent Notches & Lead-Screw Anchor
  8. **`TC`** — Withdrawable VCB Carriage Chassis, Concentric Flanged Wheels & Spindle
  9. **`SD`** — Stored-Energy Spring-Charging Mechanism, Helical Coils, Cam & Motor
  10. **`MF`** — Breaker Operator Escutcheon, `[I]/[O]` Buttons, Flags, Counter, Handle & Locks
  11. **`AX`** — 58-Pin Umbilical Auxiliary Control Plug, Locking Bails & Flexible Conduit
  12. **`EP`** — Cast Cycloaliphatic Epoxy Pole Barrels, Creepage Sheds & Copper Stems
  13. **`VI`** — Cutaway $\text{Al}_2\text{O}_3$ Ceramic Vacuum Interrupters, Vapor Shield, `CuCr` Discs & Bellows
  14. **`TL`** — 18-Finger Silver-Plated Primary Tulip Contact Clusters & Dual Garter Springs
  15. **`SS`** — Automatic Red (Bus) & Yellow (Feeder) IP2X Shutters & Scissor Linkages
  16. **`SP`** — Stationary Cast-Resin Monobloc Spout Bushings & Fixed Copper Pins
  17. **`ES`** — Integral `EK6` Double-Blade Earth Switch, Hull `PE` Bar, Castell Cylinders & `CME`
  18. **`BB`** — Double-Bar `6.6 kV` Electrolytic Copper Main Busbars, Phase Sleeves & Standoffs
  19. **`CT`** — Toroidal Protection CTs, Core-Balance CT, `ZnO` Surge Arresters, Stress Cones & XLPE Cables
- **Native-Color Ghost Isolation (`14%` Opacity) & X-Ray Cutaway:** Click any 3D sub-assembly, balanced Left/Right leader callout, or category-coded chip to isolate that part, or toggle **X-ray** to see through outer steel panels and cast-epoxy barrels.

### 3. Light & Minimal "Chart Room" Operator Console UI
- Warm paper neutrals (`#eeede9` / `#f7f6f3`), sea-teal (`#1f6f78`) and brass (`#8f6519`) maritime accents, bay-coded identity strips (`C1`–`C5`), inline vector SVG iconography, and docked CAD/operator toolbars that keep the 3D viewport completely unobstructed.

### 4. Four Complete STCW / COSWP Training & CoC Exam Missions
1. **Mission 01 — Bow Thruster 6.6 kV Motor Isolation & PTW**
2. **Mission 02 — Transformer Dual-End Isolation (440 V Back-Feed Trap)**
3. **Mission 03 — Sanction-for-Test (SFT) & 5,000 V DC Megger / PI Test (`PI = 2.49`)**
4. **Mission 04 — De-Isolation, Reverse CME Removal & Safe Restoration to Service**

---

## Quick Start

No build tools or package installations are required:

1. Open `index.html` directly in any modern desktop browser (Chrome, Edge, Firefox, or Safari) with an internet connection (loads `three@0.160.0` via CDN ES module `importmap`), **or**
2. Open the **offline single-file edition** `dist/marine-hv-simulator-3d-offline.html` — Three.js is embedded, so it works with no internet or server. Rebuild it after editing `index.html` with:
   ```bash
   node tools/build-offline.mjs
   ```
3. Serve locally:
   ```bash
   npx serve .
   ```

---

## Controls Summary

| Action | Input / Control |
| :--- | :--- |
| **Orbit 360°** | Left-click + drag in 3D viewport |
| **Pan Camera** | Right-click + drag (or Shift + Left-drag) |
| **Smooth CAD Zoom** | Mouse scroll wheel (`4.2%` per tick) or `Fit` preset |
| **Select Bay (`C1`–`C5`)** | Click cubicle in 3D or top `C1`–`C5` bay pills |
| **Isolate Sub-Assembly** | Click 3D part, Left/Right Callout badge, or `SK`–`CT` chip |
| **Explode Teardown** | Drag `Explode (0%–100%)` slider or click `0` / `50` / `100` |
| **Switch Multi-Views** | Switch tabs between `3D Twin`, `Faceplate`, `Compartment`, and `Single-line` |
| **Guided Walkthrough** | Click `Tutorial` in the top bar for a draggable step-by-step guide |

---

## License

Released under the [MIT License](./LICENSE).
