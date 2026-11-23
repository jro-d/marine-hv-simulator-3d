# Marine HV (6.6 kV) Switchboard 3D Twin & PTW Simulator

An interactive Three.js model of a 5-bay marine 6.6 kV switchboard, with an exploded CAD view and permit-to-work (PTW) training missions. It follows STCW 2010 (Table A-III/6), IEC 62271-200 Form 4b, IEC 60092-503 and UK MCA COSWP Chapter 22.

## Features

- **5-bay lineup:** DG1 incomer, BT1 bus-tie, BT-M1 bow thruster feeder, TR1-HV transformer primary, and a C5 440 V ACB bay.
- **Working equipment:** withdrawable VCB carriage (SERVICE / TEST / DISCONNECTED), spring-charging mechanism, vacuum interrupters, shutters, EK6 earth switch, keys, padlocks, and a proving wand.
- **Exploded view (0–100%):** 19 category-coded sub-assemblies separate without touching. Click any part to isolate it, or toggle X-ray.
- **Four missions:** bow thruster isolation, transformer back-feed isolation, sanction-for-test and Megger testing, and de-isolation with safe restoration.
- **Rendering:** PBR materials, studio reflections, and procedural detail drawn from reference images.

## Marine HV Console UI (design system in `design-system/`)

- **3D twin first:** a slim top bar (mission, plant state, Training / Exam, score), a command rail that opens one drawer at a time (Tools & keys, PPE, Megger, Parts, Permit, Help), and a full-bleed 3D stage with floating view, camera and parts clusters.
- **One Bay Operator** holds every bay operation and its state: VCB truck track (SERVICE 20 · TEST 10 · DISCONNECTED 0), breaker, voltage proven, earth switch EK6, padlocks, Castell keys and tags. Above it, the Lockout / Tagout stepper shows the current step.
- **Interlocks explain themselves in Training:** a control whose interlock would fire is shown dashed with a padlock, and hovering, focusing or tapping it shows the shipped interlock reason and a one-click fix. Clicking it still runs the interlock and costs 5 points. Tier 1 toasts are amber; Tier 2 keeps the ISO 7010 W012 arc-flash treatment.
- **Themes and legibility:** Day, Night watch and Projector (high-contrast) themes plus a Presentation density, from the ⋮ menu. IBM Plex Sans and IBM Plex Mono are embedded (`design-system/fonts.css`, OFL), so the page renders identically offline.

## Run it

No build step or install is needed.

- **Online:** open `index.html` in a modern browser. It loads Three.js `0.160.0` from a CDN.
- **Offline:** open `dist/marine-hv-simulator-3d-offline.html`. Three.js is embedded, so it works with no network.
- **Local server:** `npx serve .`

After editing `index.html`, rebuild the offline file:

```bash
node tools/build-offline.mjs
```

## Controls

| Action | Control |
| :--- | :--- |
| Orbit | Left-drag |
| Pan | Right-drag or Shift + left-drag |
| Zoom | Scroll wheel or `Fit` |
| Select bay | Click a cubicle or a `C1`–`C5` pill |
| Isolate part | Click a 3D part, callout, or `SK`–`CT` chip |
| Explode | Slider, or `0` / `50` / `100` |
| Views | `3D Twin`, `Faceplate`, `Compartment`, `Single-line` |
| Walkthrough | `Tutorial` in the top bar |

## License

[MIT](./LICENSE)
