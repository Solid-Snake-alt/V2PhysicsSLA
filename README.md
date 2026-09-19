https://v2physicssla.pages.dev/

# Phalaka Yantra (फलक यंत्र) — Interactive Astronomical Instrument Simulation

An interactive 3D educational simulation and reconstruction of the historical Indian astronomical instrument known as the **Phalaka Yantra**, designed by the renowned mathematician and astronomer **Bhāskarācārya (Bhāskara II, c. 1114–1185 CE)** in the *Yantrādhyāya* (Chapter on Astronomical Instruments) of his 1150 CE treatise *Siddhānta-śiromaṇi*.

---

## 1. Project Purpose

The Phalaka Yantra is a classical observational and computational apparatus designed to measure solar altitude (*unnata*), zenith distance (*nata*), and local civil time (*iṣṭakāla* in *ghaṭikās*) directly without requiring arduous spherical trigonometry during field observations. 

Because historical instruments are usually represented in static manuscripts, this simulation provides:
1. **Interactive 3D Reconstruction**: An authentic procedural model adhering to the 1:2 board proportions (30 × 60 *aṅgulas*) documented by Bhāskara II.
2. **Dynamic Solar Physics**: Real-time solar position modeling (altitude, azimuth, declination, hour angle) for any date, time, and global observing location.
3. **Comparative Geometry**: Side-by-side visualization of modern right-triangle trigonometry ($R \sin \theta, R \cos \theta$) and ancient Indian *Tri-jyā* chord-sine formulations ($R = 120$).
4. **Scholarly Transparency**: Strict academic demarcation between historically documented verses and modern computational algorithms.

---

## 2. Technology Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build System**: Vite 5
- **3D Engine**: Three.js, `@react-three/fiber`, and `@react-three/drei`
- **Iconography**: Lucide React
- **Design System**: Vanilla CSS design system tailored for museum & scientific aesthetics
- **Zero External 3D Assets**: The instrument is generated 100% procedurally in WebGL for instant load times and lightweight footprint.

---

## 3. Project Structure

```
d:\Antigravity IDE\V2PhysicsSLA\
├── index.html                       # HTML5 entry with Cinzel & Outfit typography
├── package.json                     # Dependencies and scripts
├── tsconfig.json                    # TypeScript compiler configuration
├── vite.config.ts                   # Vite bundler configuration
├── src/
│   ├── main.tsx                     # React root mount
│   ├── App.tsx                      # Client-side router & application container
│   ├── index.css                    # Museum design tokens, typography, and controls
│   ├── types/
│   │   └── index.ts                 # Solar, geometry, and location interfaces
│   ├── data/
│   │   └── historical.ts            # PHALAKA_CONFIG, Sanskrit verses, glossary, sites
│   ├── engine/
│   │   ├── astronomy/
│   │   │   └── solar.ts             # NOAA/Meeus topocentric solar position algorithm
│   │   └── geometry/
│   │       └── phalakaGeometry.ts   # Right-triangle and Tri-jyā projections
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx           # Museum header navigation
│   │   │   └── Footer.tsx           # Citations & attribution
│   │   ├── common/
│   │   │   └── DisclaimerBanner.tsx # Historical vs modern demarcation
│   │   └── simulation/
│   │       ├── PhalakaCanvas.tsx    # 3D viewport, OrbitControls, view presets
│   │       ├── PhalakaModel.tsx     # Procedural teak board, dial, gnomon, arm, plumb
│   │       ├── SunVisualization.tsx # Dynamic sun sphere, lighting, sighting ray
│   │       ├── MeasurementGuides.tsx# 3D triangle overlays, angle arcs, labels
│   │       ├── ControlPanel.tsx     # Time scrubber, date, location, arm angle sliders
│   │       ├── MeasurementPanel.tsx # Real-time observation telemetry readout
│   │       └── SunPathGraph.tsx     # 24-hour solar elevation SVG curve
│   └── pages/
│       ├── Home.tsx                 # Overview, interactive concept preview, highlights
│       ├── Simulation.tsx           # Primary interactive 3D simulation laboratory
│       ├── Geometry.tsx             # Mathematical derivations & formula breakdown
│       ├── History.tsx              # Bhāskara II biography, verses, translations
│       └── About.tsx                # Methodology, limitations, scholarly bibliography
```

---

## 4. Installation & Local Development

### Prerequisites
- Node.js (v18+ or v20+)
- npm (v9+ or v10+)

### Setup Commands
```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev

# 3. Compile TypeScript and build for production
npm run build

# 4. Preview production build
npm run preview
```

---

## 5. How the Simulation Works

### Physical Anatomy (Phalaka Yantra)
1. **Phalaka (फलक — Board):** Rectangular board of seasoned wood or brass with a 1:2 aspect ratio (30 *aṅgulas* high × 60 *aṅgulas* wide).
2. **Vṛtta (वृत्त — Graduated Circle):** Inscribed circle divided into 360 degrees (*bhāgas*) and 60 *ghaṭikās* (1 *ghaṭikā* = 6° = 24 minutes).
3. **Śaṅku (शङ्कु — Central Gnomon Pin):** Perpendicular peg projecting outwards from the center of the dial to cast a shadow.
4. **Paṭṭikā (पट्टिका — Index Arm):** Movable sighting pointer strip pivoted at the center pin.
5. **Avalambaka (अवलम्बक — Plumb Line):** Weighted cord suspended from the top edge to verify true vertical leveling.

### Observational Procedure
1. The instrument is suspended or mounted strictly vertical using the plumb line (*avalambaka*).
2. The board is turned to face along the azimuthal plane of the Sun.
3. The observer either sights the Sun through vanes on the index arm (*paṭṭikā*) or rotates the arm until it aligns with the shadow cast by the central pin (*śaṅku*).
4. The pointer directly indicates the solar altitude (*unnata*) and zenith distance (*nata*) on the graduated circular perimeter.

---

## 6. Astronomy & Geometry Assumptions

### Astronomy Calculation Engine
- Solar coordinates are calculated using the standard **NOAA / Jean Meeus formulation** (*Astronomical Algorithms*, 2nd Ed.).
- Accounts for Julian Day, solar mean anomaly, Equation of Time (EoT), solar declination, and local hour angle.
- Topocentric altitude and azimuth include standard atmospheric refraction near the horizon.

### Geometric Engine & Indian Tri-jyā System
- Modern trigonometric projections compute $Opposite = R \cdot \sin(\theta)$ and $Adjacent = R \cdot \cos(\theta)$.
- Indian Siddhāntic trigonometry scales half-chords to a reference circle radius ($R = 120$ units):
  $$\text{Jyā}(\theta) = 120 \cdot \sin(\theta)$$
  $$\text{Koṭijyā}(\theta) = 120 \cdot \cos(\theta)$$
  $$\text{Śara}(\theta) = 120 - \text{Koṭijyā}(\theta)$$
- Time calculation converts the zenith distance ($z = 90^\circ - \text{altitude}$) into classical *ghaṭikās* ($1 \text{ ghaṭikā} = 6^\circ = 24 \text{ minutes}$).

---

## 7. Historical Demarcation & Limitations

- **Reconstruction vs. Source:** The physical geometry, dimensions, and observational principles represent faithful interpretations of verses 33–42 of Bhāskara II's *Yantrādhyāya*.
- **Modern Additions:** Modern coordinate grids, decimal degrees, Cartesian projections, and digital sliders are educational visualization enhancements and were not part of the historical apparatus.
- **Atmospheric Model:** Standard mean sea-level atmosphere is assumed (1013.25 hPa, 15°C); local weather and elevation variations are not modeled in this educational edition.

---

## 8. Primary Scholarly References

1. **Bhāskarācārya (Bhāskara II)** (c. 1150 CE). *Siddhānta-śiromaṇi, Golādhyāya, Yantrādhyāya*. Chowkhamba Sanskrit Series, Varanasi.
2. **Sarma, S.R.** (2018). *A Descriptive Catalogue of Indian Astronomical Instruments*. Online edition at [srsarma.in](http://srsarma.in).
3. **Plofker, Kim** (2009). *Mathematics in India*. Princeton University Press.
4. **Subbarayappa, B.V. & Sarma, K.V.** (1985). *Indian Astronomy: A Source-Book*. Nehru Centre, Bombay.
5. **Meeus, Jean** (1998). *Astronomical Algorithms* (2nd Edition). Willmann-Bell, Richmond, Virginia.


....
