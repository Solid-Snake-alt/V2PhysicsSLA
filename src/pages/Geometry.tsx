import React, { useState } from 'react';
import { calculateGeometryBreakdown, TRI_JYA_RADIUS, degreesToGhatikas } from '../engine/geometry/phalakaGeometry';
import { Triangle, BookOpen, Compass, Calculator, Info } from 'lucide-react';
import { DisclaimerBanner } from '../components/common/DisclaimerBanner';

export const Geometry: React.FC = () => {
  const [interactiveAngle, setInteractiveAngle] = useState(35);
  const geo = calculateGeometryBreakdown(interactiveAngle);
  const timeGhatikas = degreesToGhatikas(90 - interactiveAngle);

  return (
    <div className="flex flex-col gap-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col gap-3 text-left">
        <div className="flex items-center gap-2">
          <span className="badge-gold">Geometric Foundation</span>
          <span className="text-xs text-amber-400 font-mono">Modern Trigonometry & Siddhāntic Tri-jyā</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-white">
          The Geometry of the Phalaka Yantra
        </h1>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          The Phalaka Yantra is fundamentally a physical trigonometric computer. By projecting circular arcs onto rectangular coordinates, ancient astronomers translated the Sun's celestial elevation into measurable linear segments to determine time and latitude.
        </p>
      </div>

      <DisclaimerBanner />

      {/* 1. Interactive Mathematical Playground */}
      <div className="museum-card-gold flex flex-col lg:flex-row gap-8 p-6">
        {/* Left: Dynamic SVG Right-Triangle Diagram */}
        <div className="flex-1 flex flex-col items-center justify-center bg-[#0d121c] p-6 rounded-lg border border-amber-900/40">
          <span className="text-xs font-serif uppercase tracking-wider text-amber-300 font-bold mb-4">
            Interactive Right-Triangle Model
          </span>

          <div className="relative w-64 h-64 flex items-center justify-center">
            <svg viewBox="0 0 240 240" className="w-full h-full overflow-visible">
              {/* Origin at (40, 200) */}
              {/* Coordinate axes */}
              <line x1="20" y1="200" x2="220" y2="200" stroke="#334155" strokeWidth="1.5" />
              <line x1="40" y1="220" x2="40" y2="20" stroke="#334155" strokeWidth="1.5" />

              {/* Angle Arc */}
              <path
                d={`M 85 200 A 45 45 0 0 0 ${40 + 45 * Math.cos((interactiveAngle * Math.PI) / 180)} ${
                  200 - 45 * Math.sin((interactiveAngle * Math.PI) / 180)
                }`}
                fill="none"
                stroke="#fbbf24"
                strokeWidth="2"
              />
              <text
                x={40 + 55 * Math.cos(((interactiveAngle / 2) * Math.PI) / 180)}
                y={200 - 55 * Math.sin(((interactiveAngle / 2) * Math.PI) / 180)}
                fill="#fde047"
                fontSize="12"
                fontFamily="monospace"
                fontWeight="bold"
              >
                θ={interactiveAngle}°
              </text>

              {/* Triangle: (40, 200) -> (40 + 150*cos, 200) -> (40 + 150*cos, 200 - 150*sin) */}
              {(() => {
                const r = 150;
                const rad = (interactiveAngle * Math.PI) / 180;
                const adjPx = r * Math.cos(rad);
                const oppPx = r * Math.sin(rad);
                const targetX = 40 + adjPx;
                const targetY = 200 - oppPx;

                return (
                  <g>
                    {/* Horizontal leg (Adjacent / Kotijya) */}
                    <line
                      x1="40"
                      y1="200"
                      x2={targetX}
                      y2="200"
                      stroke="#2dd4bf"
                      strokeWidth="3"
                    />
                    {/* Vertical leg (Opposite / Jya) */}
                    <line
                      x1={targetX}
                      y1="200"
                      x2={targetX}
                      y2={targetY}
                      stroke="#f43f5e"
                      strokeWidth="3"
                    />
                    {/* Hypotenuse (Arm / Radius) */}
                    <line
                      x1="40"
                      y1="200"
                      x2={targetX}
                      y2={targetY}
                      stroke="#d4af37"
                      strokeWidth="3.5"
                    />

                    {/* Right angle marker */}
                    <polyline
                      points={`${targetX - 12},200 ${targetX - 12},${200 - 12} ${targetX},${200 - 12}`}
                      fill="none"
                      stroke="#94a3b8"
                      strokeWidth="1.5"
                    />

                    {/* End point marker */}
                    <circle cx={targetX} cy={targetY} r="5" fill="#f59e0b" />

                    {/* Labels on SVG */}
                    <text x={40 + adjPx / 2} y="218" fill="#2dd4bf" fontSize="11" fontFamily="monospace" textAnchor="middle">
                      Adjacent (Koṭijyā)
                    </text>
                    <text x={targetX + 10} y={200 - oppPx / 2} fill="#f43f5e" fontSize="11" fontFamily="monospace">
                      Opposite (Jyā)
                    </text>
                    <text
                      x={40 + adjPx / 2 - 15}
                      y={200 - oppPx / 2 - 10}
                      fill="#f3cf7a"
                      fontSize="11"
                      fontFamily="monospace"
                    >
                      R (Radius)
                    </text>
                  </g>
                );
              })()}
            </svg>
          </div>

          {/* Interactive Angle Slider */}
          <div className="w-full flex flex-col gap-1.5 mt-4">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-300 font-medium">Arm Angle (θ):</span>
              <span className="font-mono text-amber-300 font-bold bg-slate-900 px-2 py-0.5 rounded border border-amber-500/40">
                {interactiveAngle}°
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="90"
              value={interactiveAngle}
              onChange={(e) => setInteractiveAngle(parseInt(e.target.value, 10))}
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>0° (Horizon)</span>
              <span>45°</span>
              <span>90° (Zenith)</span>
            </div>
          </div>
        </div>

        {/* Right: Comparative Formula & Calculation Breakdown */}
        <div className="flex-1 flex flex-col gap-4 text-xs">
          <div className="flex items-center gap-2 border-b border-slate-700 pb-2">
            <Calculator className="w-4 h-4 text-amber-400" />
            <h3 className="font-serif text-sm font-bold text-white uppercase tracking-wider">
              Mathematical Derivations
            </h3>
          </div>

          {/* Modern Trigonometry Card */}
          <div className="bg-slate-900/80 p-3 rounded border border-sky-900/40 flex flex-col gap-2">
            <span className="text-sky-300 font-bold text-xs uppercase tracking-wide">
              1. Modern Analytical Trigonometry (Unit Radius / Scale = {geo.hypotenuse})
            </span>
            <div className="font-mono text-[11px] space-y-1.5 text-slate-300">
              <div className="flex justify-between">
                <span>Opposite (Vertical):</span>
                <span className="text-rose-400 font-bold">
                  R · sin({interactiveAngle}°) = {geo.opposite}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Adjacent (Horizontal):</span>
                <span className="text-teal-400 font-bold">
                  R · cos({interactiveAngle}°) = {geo.adjacent}
                </span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Pythagorean Check:</span>
                <span>
                  √({geo.opposite}² + {geo.adjacent}²) = {geo.hypotenuse}
                </span>
              </div>
            </div>
          </div>

          {/* Historical Indian Tri-jya Card */}
          <div className="bg-slate-900/80 p-3 rounded border border-amber-900/40 flex flex-col gap-2">
            <span className="text-amber-300 font-bold text-xs uppercase tracking-wide">
              2. Indian Siddhāntic Trigonometry (Tri-jyā R = {TRI_JYA_RADIUS})
            </span>
            <div className="font-mono text-[11px] space-y-1.5 text-slate-300">
              <div className="flex justify-between">
                <span>Jyā (ज्या — Chord Sine):</span>
                <span className="text-amber-300 font-bold">
                  {TRI_JYA_RADIUS} · sin({interactiveAngle}°) = {geo.jya}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Koṭijyā (कोटिज्या — Cosine):</span>
                <span className="text-amber-300 font-bold">
                  {TRI_JYA_RADIUS} · cos({interactiveAngle}°) = {geo.kotijya}
                </span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Śara (शर — Versine):</span>
                <span>
                  R - Koṭijyā = {(TRI_JYA_RADIUS - geo.kotijya).toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* Time Calculation Card */}
          <div className="bg-slate-900/80 p-3 rounded border border-purple-900/40 flex flex-col gap-1.5">
            <span className="text-purple-300 font-bold text-xs uppercase tracking-wide">
              3. Time Conversion from Zenith Distance (Nata)
            </span>
            <p className="text-[11px] text-slate-300">
              Zenith Distance (Nata) = 90° - {interactiveAngle}° = <strong>{90 - interactiveAngle}°</strong>
            </p>
            <p className="font-mono text-purple-200 text-[11px]">
              Time from meridian: {timeGhatikas.formatted} (where 1 ghaṭikā = 6° = 24 minutes)
            </p>
          </div>
        </div>
      </div>

      {/* 2. Deep Explanations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs leading-relaxed">
        {/* Modern vs Historical */}
        <div className="museum-card flex flex-col gap-2.5">
          <h3 className="font-serif text-sm font-bold text-amber-300">
            Tri-jyā vs. Modern Sine: Historical Nuance
          </h3>
          <p className="text-slate-300">
            In modern mathematics, sine and cosine are dimensionless ratios defined on a unit circle ($R = 1$). In classical Indian astronomy, however, trigonometric functions were lengths of line segments inside a reference circle of radius $R$, called the <em>Tri-jyā</em> (literally "sine-radius").
          </p>
          <p className="text-slate-300">
            Common values of $R$ in ancient treatises were $R = 120$ (often used in Greek and early Indian tables) or $R = 3438'$ (derived from dividing a 360° circle of $21600'$ circumference by $2\pi$). Thus:
          </p>
          <div className="bg-slate-950 p-2 rounded font-mono text-amber-200">
            Jyā(θ) = R × sin(θ)
            <br />
            Koṭijyā(θ) = R × cos(θ)
          </div>
        </div>

        {/* Shadow Projection */}
        <div className="museum-card flex flex-col gap-2.5">
          <h3 className="font-serif text-sm font-bold text-sky-300">
            Shadow Projection on the Vertical Board
          </h3>
          <p className="text-slate-300">
            When the board is suspended vertically and oriented along the Sun's azimuth, the perpendicular pin of length $L$ casts a shadow downward across the graduated quadrant.
          </p>
          <p className="text-slate-300">
            The angle formed by the shadow with the horizontal axis directly equals the Sun's altitude $\alpha$ (<em>unnata</em>). The complementary angle to the vertical line corresponds to the zenith distance $z = 90^\circ - \alpha$ (<em>nata</em>).
          </p>
          <p className="text-slate-300">
            By inscribing concentric hour lines directly onto the board, Bhāskara II enabled an observer to read the remaining day-hours immediately upon aligning the shadow or arm.
          </p>
        </div>
      </div>
    </div>
  );
};
