# 3D Marine High Voltage (6.6 kV) Switching, PTW & Digital Twin Simulator

An interactive, zero-build **Three.js (`r160`) 3D Marine High Voltage (6.6 kV, 60 Hz) Switchboard Digital Twin, Exploded CAD Teardown & Permit-to-Work (PTW) Training Simulator** engineered around **STCW 2010 Manila Amendments (Table A-III/6)**, **IEC 60092-503**, **IEC 62271-200**, and **UK MCA COSWP Chapter 22** (*The 5 Golden Rules of Marine HV Safety*).

---

## Key Features

### 1. Real-Time 3D 5-Cubicle Switchboard Lineup (`Three.js r160`)
- **Full 5-Bay Marine Switchboard Lineup** mounted on a two-tier light-studio concrete plinth with deployable **15 kV Dielectric Floor Matting**:
  - **`C1: DG1`** — Port 6.6 kV Diesel Generator 1 Incomer (`3,600 kVA`)
  - **`C2: BT1`** — 6.6 kV Bus-Tie Vacuum Circuit Breaker (couples Port Bus A & Starboard Bus B)
  - **`C3: BT-M1`** — Bow Thruster 6.6 kV Motor Feeder (`1,800 kW` VFD)
  - **`C4: TR1-HV`** — 6.6 kV / 440 V Ship Service Transformer Primary (`Dual-Key Interlocked`)
  - **`C5: ACB-TR1-LV`** — 440 V Low-Voltage Secondary Switchboard Breaker (`Back-Feed Trap`)
- **Live 3D Switching & Mechanical Kinematics (60 FPS):**
  - **Extruded Viewing-Window Doors:** True `THREE.ExtrudeGeometry` cutouts with tinted polycarbonate panes that unbolt and swing open `-110°` when enclosure interlocks are satisfied.
  - **Monolithic Withdrawable VCB Carriage (`VD4/M`):** Translates smoothly between `SERVICE (20/20)` $\rightarrow$ `TEST (10/20)` $\rightarrow$ `DISCONNECTED (0/20)` with concentric rotating flanged wheels and lead-screw spindle.
  - **Cutaway $\text{Al}_2\text{O}_3$ Ceramic Vacuum Interrupters:** Visible internal `CuCr` contact discs and stainless-steel accordion bellows executing a live `12 mm` vertical stroke on `CLOSE [I]` / `TRIP [O]`.
  - **Automatic Red & Yellow IP2X Safety Shutters:** Drop automatically over stationary busbar (`RED`) and feeder (`YELLOW`) spouts as the VCB withdraws, with 3D LOTO padlocking.
  - **Integral Fault-Making Earth Switch (`EK6`), LOTO & Live-Line Tools:** Animated copper snap-action knife blades, 3D brass Castell trapped keys (`K1-BT`, `K-HV`, `K-LV`), 3D red LOTO padlocks, 3D telescopic `6.6 kV` proving wand (*Prove–Test–Prove*), 3D yellow-green braided `CME` portable earth cables, and `5,000 V DC` Megger test leads.

### 2. Exploded 7-Subsystem CAD Teardown (`0%–100%`) & Native-Color Ghost Isolation
- **Floor-Safe Explode Slider (`0%–100%`):** Separates the active cubicle into **7 selectable engineering sub-assemblies** connected by dashed CAD projection guide lines:
  1. **`CF`** — Segregated Cubicle Frame, Extruded Hinged Door & LV Protection Chamber (`ABB REF615` + CVI LEDs)
  2. **`TR`** — Withdrawable VCB Carriage, Telescopic Guide Rails & Spring Operating Mechanism
  3. **`EP`** — Cast Cycloaliphatic Epoxy-Resin Poles & 12-Finger Silver-Plated Tulip Contacts
  4. **`VI`** — Cutaway Alumina Ceramic Vacuum Interrupter Bottles, `CuCr` Contacts & Bellows
  5. **`SS`** — Automatic Red (Busbar) & Yellow (Feeder) IP2X Metallic Safety Shutters & Spouts
  6. **`ES`** — Integral Fault-Making Earth Switch, Hull Earth Bar (`PE`), Castell Cylinders & CME Leads
  7. **`BB`** — 6.6 kV Electrolytic Copper Main Busbars, Cast-Resin Toroidal CTs & Armored XLPE Cables
- **Native-Color Ghosting (`14%` Opacity) & X-Ray Glass Mode:** Click any 3D part, Left/Right divided callout badge, or subsystem filter chip to isolate that sub-assembly while preserving full spatial context, or toggle **X-Ray Glass** to see straight through the steel enclosure and cast-epoxy poles.

### 3. Four Complete STCW / COSWP Training & CoC Exam Missions
1. **Mission 01 — Bow Thruster 6.6 kV Motor Isolation & PTW:** Full PPE & pneumatic glove roll test, VCB trip & rack-out, `K1-BT` Castell key transfer, Integral Earth Switch closure, Safety Key Box lockout, Red Busbar Shutter padlock, *Prove–Test–Prove*, and formal PTW issuance.
2. **Mission 02 — Transformer Dual-End Isolation (The Back-Feed Trap):** Isolate `440 V` secondary breaker `ACB-TR1-LV` first to prevent lethal `440 V` $\rightarrow$ `6.6 kV` step-up back-feed, exchange dual Castell keys (`K-HV` + `K-LV`), and clamp `CME` portable earths (`PE` first, `L1/L2/L3` second).
3. **Mission 03 — Sanction-for-Test (SFT) & 5,000 V DC Megger / PI Test:** Cancel active PTW, issue SFT, open Earth Switch, run 1-min / 10-min Insulation Resistance & Polarization Index test (`PI = 2.49`), bleed `4,850 V DC` trapped capacitive charge to `0 V`, re-earth, and cancel SFT.
4. **Mission 04 — De-Isolation & Safe Restoration to 6.6 kV Service:** Cancel PTW, remove `CME` leads in strict reverse order (`L1/L2/L3` phases first via hot-stick, `PE` hull clamp last), close & bolt 3D enclosure door, return `K1-BT`, perform local `CLOSE/TRIP` check at `TEST (10/20)`, and rack to `SERVICE (20/20)`.

---

## Quick Start

No build tools or package installations are required:

1. Open `index.html` directly in any modern desktop browser (Chrome, Edge, Firefox, or Safari) with an internet connection (loads `three@0.160.0` via CDN ES module `importmap`), **or**
2. Serve locally:
   ```bash
   npx serve .
   ```

---

## Controls Summary

| Action | Input / Control |
| :--- | :--- |
| **Orbit 360°** | Left-click + drag in 3D viewport |
| **Pan Camera** | Right-click + drag (or Shift + Left-drag) |
| **Smooth CAD Zoom** | Mouse scroll wheel (`4.2%` per tick) |
| **Select Bay (`C1`–`C5`)** | Click cubicle in 3D or top `C1`–`C5` navigation pills |
| **Isolate Subsystem** | Click 3D part, Left/Right Callout badge, or `CF`–`BB` chip |
| **Explode Teardown** | Drag `Explode (0%–100%)` slider or click `0%` / `55%` / `100%` |
| **Switch Multi-Views** | Switch tabs between `3D Digital Twin`, `2.5D Faceplate`, `Internal Compartment`, and `Single-Line` |
| **Guided Walkthrough** | Click `💡 Tutorial` in the top bar for a draggable, non-modal step-by-step guide |

---

## License

Released under the [MIT License](./LICENSE).
