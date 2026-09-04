import React, { useState } from 'react';
import { NavigationPage } from '../types';
import { Compass, BookOpen, Triangle, ArrowRight, Sun, Layers } from 'lucide-react';
import { DisclaimerBanner } from '../components/common/DisclaimerBanner';

interface HomeProps {
  onNavigate: (page: NavigationPage) => void;
}

export const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  const [demoAngle, setDemoAngle] = useState(38);

  return (
    <div className="home-layout">
      {/* 1. Hero Section (2-column on desktop, stacked on mobile) */}
      <section className="hero-section">
        {/* Left: Text Content Column */}
        <div className="hero-content">
          <div className="flex items-center gap-2">
            <span className="badge-gold">Historical Reconstruction</span>
            <span className="text-xs text-amber-300 font-mono">12th-Century Indian Astronomy</span>
          </div>

          <h1 className="hero-title">
            PHALAKA <span style={{ color: 'var(--accent-gold)' }}>YANTRA</span>
          </h1>

          <p className="hero-subtitle">
            An Interactive Reconstruction of an Ancient Indian Astronomical Instrument
          </p>

          <p className="hero-description">
            In the 12th-century treatise <em>Siddhānta-śiromaṇi</em>, the renowned mathematician-astronomer <strong>Bhāskarācārya (Bhāskara II)</strong> documented a versatile rectangular observational instrument known as the <strong>Phalaka Yantra</strong> (फलक यंत्र). By utilizing a graduated circular dial, a central shadow-casting pin (<em>śaṅku</em>), and an index sighting arm (<em>paṭṭikā</em>), ancient observers calculated solar altitude, zenith distance, and local civil time (<em>ghaṭikās</em>) directly without requiring complex spherical trigonometry during field observations.
          </p>

          <div className="hero-actions">
            <button
              onClick={() => onNavigate('simulation')}
              className="btn-gold"
            >
              Start 3D Simulation <ArrowRight className="w-4 h-4 ml-1" />
            </button>
            <button
              onClick={() => onNavigate('geometry')}
              className="btn-outline"
            >
              <Triangle className="w-4 h-4 mr-1 text-amber-400" /> Learn How It Works
            </button>
          </div>
        </div>

        {/* Right: Interactive Concept Instrument Widget */}
        <div className="hero-widget-container">
          <div className="museum-card-gold flex flex-col items-center gap-4 p-6 shadow-2xl">
            <div className="w-full flex justify-between items-center border-b border-amber-900/60 pb-3">
              <span className="text-xs uppercase font-serif tracking-wider text-amber-300 font-bold flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-amber-400" /> Instrument Concept Model
              </span>
              <span className="font-mono text-xs text-amber-300 bg-slate-950 px-2 py-0.5 rounded border border-amber-500/30">
                θ = {demoAngle}°
              </span>
            </div>

            {/* 2D Interactive Dial Diagram */}
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center bg-[#151b27] rounded-full border-4 border-[#8c7042] shadow-inner my-2">
              {/* Wooden Board silhouette behind */}
              <div
                className="absolute bg-[#3a2012] rounded border-2 border-amber-800/60 shadow-lg"
                style={{ width: '280px', height: '140px', zIndex: 0 }}
              />

              {/* Dial markings */}
              <svg className="w-full h-full relative" style={{ zIndex: 1 }} viewBox="0 0 200 200">
                {/* Outer ring */}
                <circle cx="100" cy="100" r="88" stroke="#8c7042" strokeWidth="2" fill="none" />
                <circle cx="100" cy="100" r="80" stroke="#475569" strokeWidth="1" strokeDasharray="2 3" fill="none" />
                {/* Quadrant lines */}
                <line x1="20" y1="100" x2="180" y2="100" stroke="#8c7042" strokeWidth="1.5" />
                <line x1="100" y1="20" x2="100" y2="180" stroke="#8c7042" strokeWidth="1.5" />

                {/* Simulated Sighting Arm (Paṭṭikā) */}
                <line
                  x1="100"
                  y1="100"
                  x2={100 + 85 * Math.cos((demoAngle * Math.PI) / 180)}
                  y2={100 - 85 * Math.sin((demoAngle * Math.PI) / 180)}
                  stroke="#fbbf24"
                  strokeWidth="4"
                  strokeLinecap="round"
                />

                {/* Central pin (Śaṅku) */}
                <circle cx="100" cy="100" r="6" fill="#d4af37" stroke="#000" strokeWidth="1.5" />
              </svg>

              {/* Angle Slider on Widget */}
              <div className="absolute bottom-2 left-4 right-4 bg-slate-950/95 p-2 rounded border border-slate-800 flex flex-col gap-1 text-xs" style={{ zIndex: 2 }}>
                <div className="flex justify-between text-slate-400">
                  <span>Rotate Arm:</span>
                  <span className="text-amber-300 font-mono font-bold">{demoAngle}°</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="90"
                  value={demoAngle}
                  onChange={(e) => setDemoAngle(parseInt(e.target.value, 10))}
                />
              </div>
            </div>

            <p className="text-xs text-slate-400 text-center italic">
              Drag the slider to test the index arm rotation along the graduated quadrant.
            </p>
          </div>
        </div>
      </section>

      {/* Academic Disclaimer Callout */}
      <DisclaimerBanner />

      {/* 2. Core Pillars / Educational Highlights */}
      <section className="flex flex-col gap-6">
        <div className="text-center max-w-2xl mx-auto flex flex-col gap-2">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
            Architectural & Scientific Highlights
          </h2>
          <p className="text-slate-400 text-sm">
            Designed to bridge classical Sanskrit astronomy with modern 3D simulation and trigonometry.
          </p>
        </div>

        <div className="features-grid">
          {/* Card 1 */}
          <div className="museum-card flex flex-col gap-3">
            <div className="w-10 h-10 rounded-md bg-amber-950/50 border border-amber-600/40 flex items-center justify-center text-amber-400">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-amber-200 text-base">
              Procedural 3D Model
            </h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              Constructed parametrically according to Bhāskara II's 1:2 board ratio (30×60 aṅgulas), complete with teak planking, bronze graduated dial, central pin, and plumb line.
            </p>
          </div>

          {/* Card 2 */}
          <div className="museum-card flex flex-col gap-3">
            <div className="w-10 h-10 rounded-md bg-slate-900 border border-sky-600/40 flex items-center justify-center text-sky-400">
              <Sun className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-sky-200 text-base">
              Real-Time Solar Physics
            </h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              Calculates topocentric solar altitude, azimuth, declination, and zenith distance using standard NOAA astronomical formulas for any location on Earth.
            </p>
          </div>

          {/* Card 3 */}
          <div className="museum-card flex flex-col gap-3">
            <div className="w-10 h-10 rounded-md bg-slate-900 border border-teal-600/40 flex items-center justify-center text-teal-400">
              <Triangle className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-teal-200 text-base">
              Trigonometry & Tri-jyā
            </h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              Visualizes real-time right-triangle components alongside classical Indian <em>Jyā</em> (R-sine) and <em>Koṭijyā</em> (R-cosine) formulations scaled to R = 120.
            </p>
          </div>

          {/* Card 4 */}
          <div className="museum-card flex flex-col gap-3">
            <div className="w-10 h-10 rounded-md bg-slate-900 border border-purple-600/40 flex items-center justify-center text-purple-400">
              <BookOpen className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-purple-200 text-base">
              Original Sanskrit Verses
            </h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              Explore verbatim verses from the <em>Yantrādhyāya</em> with scholarly transliterations, English translations, and terminology glossary.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Historical Context Summary Banner */}
      <section className="museum-card flex flex-col md:flex-row items-center justify-between gap-6 p-6 border-amber-800/40">
        <div className="flex flex-col gap-2 flex-1">
          <span className="badge-gold">Historical Background</span>
          <h2 className="text-xl font-serif font-bold text-white">
            Bhāskara II & The Siddhāntic Tradition
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Born in 1114 CE in the Sahyadri region, Bhāskarācārya headed the ancient astronomical observatory at <strong>Ujjain</strong>, the prime meridian of classical India. His magnum opus, <em>Siddhānta-śiromaṇi</em> (1150 CE), contains the famous <em>Yantrādhyāya</em> devoted entirely to empirical astronomical instruments, including the Ghaṭī Yantra (water clock), Śaṅku (gnomon), Phalaka Yantra (board instrument), and Yaṣṭi Yantra (staff).
          </p>
        </div>
        <div className="flex flex-col gap-2 shrink-0">
          <button
            onClick={() => onNavigate('history')}
            className="btn-outline text-xs px-4 py-2"
          >
            Read Historical Treatise Verses
          </button>
          <button
            onClick={() => onNavigate('simulation')}
            className="btn-gold text-xs px-4 py-2"
          >
            Launch 3D Simulation Workbench
          </button>
        </div>
      </section>
    </div>
  );
};
