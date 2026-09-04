PROJECT: PHALAKA YANTRA — INTERACTIVE ASTRONOMICAL INSTRUMENT SIMULATION

You are acting as the lead frontend engineer, UI/UX designer, 3D developer, and technical assistant for this project.

Build a complete browser-based educational simulation of the historical Indian astronomical instrument known as the Phalaka Yantra.

IMPORTANT:
This is an educational/academic project. Historical accuracy is more important than adding unnecessary features. Do not invent historical claims. Clearly distinguish historically documented information from modern visualization/calculation used by the software.

==================================================
1. PROJECT GOAL
==================================================

Create an interactive website that allows a student/user to:

1. View a 3D reconstruction of a Phalaka Yantra.
2. Understand the physical components of the instrument.
3. Manipulate the instrument interactively.
4. Observe the relationship between the Sun, the instrument, and angular measurements.
5. Enter a date, time, and observing location.
6. Display relevant solar information.
7. See the geometric calculations behind the measurement.
8. Learn the historical purpose and operation of the instrument.

The website should feel like an educational scientific simulation rather than a generic landing page.

==================================================
2. TECHNOLOGY
==================================================

Use:

- React
- TypeScript
- Vite
- Three.js
- React Three Fiber
- @react-three/drei
- CSS or Tailwind CSS
- Zustand only if state management becomes necessary
- Recharts for graphs if required

Do NOT introduce unnecessary frameworks or dependencies.

No backend is required for the MVP.

The application must run entirely in the browser.

==================================================
3. PROJECT STRUCTURE
==================================================

Organize the project cleanly.

Suggested structure:

src/
├── components/
│   ├── layout/
│   ├── ui/
│   ├── simulation/
│   ├── instrument/
│   └── charts/
│
├── pages/
│   ├── Home.tsx
│   ├── Simulation.tsx
│   ├── Geometry.tsx
│   ├── History.tsx
│   └── About.tsx
│
├── engine/
│   ├── astronomy/
│   ├── geometry/
│   └── calculations/
│
├── data/
│   └── historical.ts
│
├── types/
│
├── utils/
│
├── App.tsx
├── main.tsx
└── index.css

Keep the astronomy/calculation logic separate from UI components.

Do not put all application logic into App.tsx.

==================================================
4. MAIN PAGES
==================================================

Create the following pages:

HOME
----

Title:

"PHALAKA YANTRA"

Subtitle:

"An Interactive Reconstruction of an Ancient Indian Astronomical Instrument"

Include:

- short introduction
- historical context
- "Start Simulation" button
- "Learn How It Works" button
- simple visual representation of the instrument

SIMULATION
----------

This is the primary page.

It should contain:

LEFT / CENTER:
- large interactive 3D Phalaka Yantra

RIGHT:
- control panel
- observation data
- calculated measurements

CONTROLS:
- date
- time
- observer latitude
- observer longitude
- instrument orientation
- index/arm angle
- reset button
- toggle labels
- toggle grid/measurement guides

Show:

- solar altitude
- solar azimuth
- zenith distance
- index angle
- relevant geometric dimensions
- observation status

GEOMETRY
--------

Explain the mathematical geometry used by the simulation.

Show:

- instrument diagram
- measured angle
- relevant right triangles
- formulas
- calculated values

Use MathJax or another lightweight mathematical rendering solution only if genuinely useful.

HISTORY
-------

Explain:

- what the Phalaka Yantra is
- its association with Indian astronomical traditions
- Bhaskara II
- the historical purpose of the instrument
- physical construction
- how observations were made

IMPORTANT:
Do not present modern software calculations as if they were literally the historical procedure.

Clearly label modern additions such as:

"Modern computational model"

and

"Historical reconstruction / interpretation"

ABOUT
-----

Explain:

- project purpose
- technologies used
- limitations of the simulation
- historical reconstruction disclaimer
- sources/references section

==================================================
5. 3D PHALAKA YANTRA
==================================================

The 3D model is the central feature.

Construct the instrument procedurally with Three.js rather than relying on external 3D model files.

Represent the major physical components:

- rectangular plate/board
- graduated circular section
- central pivot
- movable index/arm
- reference lines
- scale markings
- support/reference geometry where appropriate

Use realistic proportions based on the historical description being used for the project.

Do NOT make the instrument look like a modern scientific device.

Use an appropriate traditional-material appearance, but do not overdo textures.

The model should remain lightweight enough to run smoothly in a normal browser.

==================================================
6. INTERACTION
==================================================

The user must be able to interact with the instrument.

Implement:

- orbit camera
- zoom
- pan where appropriate
- reset camera
- drag/rotate the index arm
- hover highlighting
- clickable component labels

When the index arm moves:

- update the measured angle
- update the displayed values
- update the geometry visualization
- update the measurement panel

Do not allow the arm to move into physically nonsensical ranges.

==================================================
7. SUN VISUALIZATION
==================================================

Include a visual Sun in the simulation.

The Sun should have:

- visible spherical representation
- soft glow if performance permits
- directional light
- clear visual relationship to the instrument

The Sun's apparent position should change based on the selected:

- date
- time
- observer latitude
- observer longitude

For the MVP, prioritize correct solar altitude and azimuth over extremely sophisticated astronomical modelling.

==================================================
8. ASTRONOMICAL CALCULATIONS
==================================================

Create a dedicated astronomy calculation module.

Inputs:

- date
- time
- latitude
- longitude

Outputs should include:

- solar altitude
- solar azimuth
- zenith distance

Use a documented, standard solar-position approximation suitable for an educational simulation.

Keep the astronomy calculations independent from the React UI.

Every important calculation should have comments explaining:

- what it calculates
- what coordinate system it uses
- what assumptions are being made

Do NOT fake astronomical values.

If exact astronomical calculations are difficult to implement initially:

1. build the UI and simulation architecture
2. create a clean astronomy engine interface
3. implement the calculation separately
4. test it against known examples

==================================================
9. GEOMETRY ENGINE
==================================================

Create a separate geometry module.

The geometry engine should calculate values relevant to the instrument.

For example:

- instrument dimensions
- radius
- index length
- measured angle
- projected distances
- relationships between observed angle and geometry

Use standard trigonometry where appropriate.

For a right-triangle visualization:

opposite = hypotenuse × sin(angle)

adjacent = hypotenuse × cos(angle)

hypotenuse² = opposite² + adjacent²

However:

DO NOT automatically assume that these modern formulas were historically written or used in this exact notation.

The software may use modern mathematics to explain the geometry.

Clearly label this as a modern mathematical representation.

==================================================
10. HISTORICAL DIMENSIONS
==================================================

Where the historical source gives physical dimensions, use those dimensions in the reconstruction.

Do not silently invent dimensions.

Create a central configuration object such as:

PHALAKA_CONFIG

containing:

- board width
- board height
- pivot position
- circle radius
- index length
- scale divisions

Keep these values centralized so the model can easily be adjusted later.

If a historical measurement is uncertain:

- document the uncertainty
- choose a reasonable visualization value
- label it as an approximation

==================================================
11. MEASUREMENT PANEL
==================================================

Create a clean scientific-looking panel.

Example:

OBSERVATION
-------------------------
Date:
04 September 2026

Time:
12:30:00

Latitude:
XX.XXXX°

Longitude:
XX.XXXX°

-------------------------

SOLAR POSITION

Altitude:
58.42°

Azimuth:
183.17°

Zenith Distance:
31.58°

-------------------------

INSTRUMENT

Index Angle:
31.58°

Index Length:
XX

-------------------------

GEOMETRY

Horizontal projection:
XX

Vertical projection:
XX

Make values update live.

Use appropriate units.

==================================================
12. VISUAL MEASUREMENT GUIDES
==================================================

Add optional visual aids:

- angle arcs
- dashed projection lines
- vertical reference line
- horizontal reference line
- labels
- measurement arrows
- coordinate indicators

These should be toggleable.

Example controls:

☑ Show Labels
☑ Show Angles
☑ Show Projection
☑ Show Grid

==================================================
13. SUN PATH GRAPH
==================================================

Add an optional graph showing the Sun's altitude throughout the selected day.

X-axis:

Time

Y-axis:

Solar altitude

The currently selected time should be highlighted.

This graph is an educational enhancement, not the core simulation.

Do not allow the graph to delay implementation of the main 3D simulation.

==================================================
14. UI DESIGN
==================================================

Design should feel like:

"modern digital museum + scientific instrument"

Avoid:

- generic corporate dashboard
- excessive gradients
- excessive glassmorphism
- huge animations
- unnecessary cards everywhere
- overly bright colors
- clutter

Use:

- dark or parchment-inspired interface
- restrained typography
- clear hierarchy
- subtle borders
- readable measurement displays
- scientific diagram aesthetics

Do NOT make it look like a generic vibe-coded UI.

The 3D instrument should remain the visual focus.

==================================================
15. RESPONSIVENESS
==================================================

The website must work on:

- desktop
- laptop
- tablet

Prioritize desktop because the simulation needs screen space.

On smaller screens:

- stack controls below the simulation
- preserve usability
- prevent the 3D canvas from overflowing

==================================================
16. ACCESSIBILITY
==================================================

Implement:

- keyboard-accessible buttons
- readable text
- sufficient contrast
- descriptive labels
- visible focus states
- no information conveyed solely through color

==================================================
17. PERFORMANCE
==================================================

Keep the application lightweight.

Avoid:

- unnecessary 3D models
- huge textures
- excessive particle effects
- unnecessary libraries
- continuous expensive calculations

Only recalculate astronomical values when relevant inputs change.

Use React state carefully.

Do not cause the entire 3D scene to unnecessarily re-render whenever a UI control changes.

==================================================
18. ERROR HANDLING
==================================================

Handle:

- invalid dates
- invalid latitude
- invalid longitude
- invalid time
- impossible instrument angles
- missing values

Show useful error messages.

Never allow NaN or undefined values to appear in the measurement panel.

==================================================
19. DEVELOPMENT STRATEGY
==================================================

VERY IMPORTANT:

Do NOT attempt to build every feature simultaneously.

Build in stages.

STAGE 1 — FOUNDATION

Create:

- Vite project
- React structure
- routing/page structure
- basic styling
- navigation
- Home page
- Simulation page

Make sure:

npm run dev

works.

STAGE 2 — 3D INSTRUMENT

Build:

- rectangular Phalaka board
- circular scale
- pivot
- index arm
- camera controls
- basic materials

Make the model visually convincing before adding astronomy.

STAGE 3 — INTERACTION

Implement:

- draggable index
- angle measurement
- labels
- measurement guides
- reset

STAGE 4 — ASTRONOMY

Implement:

- date
- time
- latitude
- longitude
- solar altitude
- solar azimuth
- zenith distance
- Sun position

STAGE 5 — EDUCATIONAL CONTENT

Implement:

- Geometry page
- History page
- About page
- explanations
- diagrams

STAGE 6 — POLISH

Implement:

- animations
- better materials
- improved UI
- graph
- responsive design
- accessibility
- error handling

==================================================
20. MVP PRIORITY
==================================================

If development time becomes limited, prioritize exactly in this order:

1. Working website
2. Working 3D Phalaka Yantra
3. Interactive index arm
4. Correct angle calculation
5. Solar position
6. Date/time/location controls
7. Measurement panel
8. Historical explanation
9. Geometry explanation
10. Visual polish
11. Sun-path graph
12. Extra features

Never sacrifice the core working simulation for decorative features.

==================================================
21. CODE QUALITY
==================================================

Write clean, understandable TypeScript.

The developer is a beginner in JavaScript and CSS.

Therefore:

- avoid unnecessarily clever code
- avoid extremely compressed code
- use meaningful variable names
- add comments around difficult calculations
- keep components reasonably small
- explain unusual Three.js logic in comments
- avoid unnecessary abstraction

When implementing a complicated feature, explain what you changed and why.

Do not hide important calculations inside giant components.

==================================================
22. BEGINNER-FRIENDLY DEVELOPMENT
==================================================

Assume the developer may not understand JavaScript, TypeScript, CSS, React, or Three.js yet.

When making major changes:

1. Explain which files you changed.
2. Explain what each important file does.
3. Explain how to run the project.
4. Explain any new npm packages.
5. Explain errors instead of silently working around them.

Do not assume the developer knows what npm, Vite, React, components, props, state, or hooks mean.

==================================================
23. TESTING
==================================================

After implementing each major stage:

- run the development server
- check for TypeScript errors
- check browser console
- check for runtime errors
- verify UI interactions
- verify calculations with known values

Do not proceed while major build errors remain.

Before declaring the project complete:

- run the production build
- fix all build errors
- verify the application loads from a clean start

==================================================
24. DOCUMENTATION
==================================================

Create a README.md containing:

- project description
- historical purpose
- technology stack
- installation instructions
- npm commands
- project structure
- how the simulation works
- astronomy calculation assumptions
- geometry assumptions
- historical limitations
- references

==================================================
25. IMPORTANT HISTORICAL ACCURACY RULE
==================================================

Do not invent facts about the Phalaka Yantra.

If a detail is historically uncertain, explicitly state that it is a reconstruction or approximation.

Separate:

HISTORICAL INFORMATION

from

MODERN COMPUTATIONAL MODEL

from

VISUALIZATION CHOICES.

The purpose of the project is to demonstrate how the instrument can be understood interactively, not to falsely claim that the modern software interface or equations were used historically.

==================================================
26. FIRST TASK
==================================================

Before implementing advanced features:

1. Inspect the current project directory.
2. Determine whether a Vite/React project already exists.
3. Do NOT overwrite an existing project without checking it.
4. Identify the existing package.json.
5. Install only the dependencies actually required.
6. Create the basic project architecture.
7. Create the Home and Simulation pages.
8. Create the initial 3D Phalaka Yantra.
9. Make sure `npm run dev` works.
10. Only then proceed to astronomy and advanced features.

DO NOT try to finish the entire application in one giant change.

Work incrementally and keep the project runnable after every major step.
