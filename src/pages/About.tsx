import React from 'react';
import { Info, Code2, BookOpen, AlertTriangle, ExternalLink, ShieldCheck } from 'lucide-react';
import { DisclaimerBanner } from '../components/common/DisclaimerBanner';

export const About: React.FC = () => {
  return (
    <div className="flex flex-col gap-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col gap-3 text-left">
        <div className="flex items-center gap-2">
          <span className="badge-gold">Academic Documentation</span>
          <span className="text-xs text-amber-400 font-mono">Methodology & Technology</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-white">
          About the Simulation Project
        </h1>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          This web application is an open educational and academic reconstruction of the medieval Indian astronomical instrument <strong>Phalaka Yantra</strong>. It was designed to allow students, historians of science, and astronomers to interactively examine the physical instrument and its underlying geometry.
        </p>
      </div>

      <DisclaimerBanner />

      {/* 1. Project Purpose & Pedagogical Goals */}
      <section className="museum-card flex flex-col gap-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
        <h2 className="text-base font-serif font-bold text-amber-300 flex items-center gap-2">
          <Info className="w-4 h-4 text-amber-400" />
          Pedagogical Objectives
        </h2>
        <p>
          Historical scientific instruments are frequently documented only in terse Sanskrit verses or static 2D manuscript diagrams. Because these instruments rely on the spatial motion of celestial bodies and dynamic shadow casting, students often struggle to visualize how they functioned in practice.
        </p>
        <p>
          This simulation solves that challenge by providing:
        </p>
        <ul className="list-disc pl-5 space-y-1 text-slate-400">
          <li>An accurate, real-time 3D procedural reconstruction with true physical proportions (1:2 ratio).</li>
          <li>Interactive manipulation of the movable index arm with instant trigonometry readouts.</li>
          <li>Accurate solar position calculations for any historical date, time, and geographic coordinate.</li>
          <li>Direct comparison between modern mathematical notation and ancient Indian Tri-jyā formulations.</li>
        </ul>
      </section>

      {/* 2. Technology Stack */}
      <section className="museum-card flex flex-col gap-3 text-xs sm:text-sm">
        <h2 className="text-base font-serif font-bold text-amber-300 flex items-center gap-2">
          <Code2 className="w-4 h-4 text-amber-400" />
          Technology Stack
        </h2>
        <p className="text-slate-300">
          Built entirely for the modern web with zero external 3D asset dependencies, running 100% locally in the client browser:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs mt-1">
          <div className="bg-slate-900 p-3 rounded border border-slate-800">
            <strong className="text-white block font-mono">React 18 & TypeScript</strong>
            <span className="text-slate-400">Type-safe component architecture, state management, and responsive reactive UI.</span>
          </div>
          <div className="bg-slate-900 p-3 rounded border border-slate-800">
            <strong className="text-white block font-mono">Three.js & React Three Fiber</strong>
            <span className="text-slate-400">Hardware-accelerated WebGL procedural rendering, shadow maps, and custom materials.</span>
          </div>
          <div className="bg-slate-900 p-3 rounded border border-slate-800">
            <strong className="text-white block font-mono">NOAA Solar Algorithms</strong>
            <span className="text-slate-400">Meeus topocentric solar position algorithm for accurate altitude, azimuth, and sunrise/sunset.</span>
          </div>
          <div className="bg-slate-900 p-3 rounded border border-slate-800">
            <strong className="text-white block font-mono">Vite & Vanilla CSS Design System</strong>
            <span className="text-slate-400">Optimized bundle size, ultra-fast load times, and custom museum aesthetic.</span>
          </div>
        </div>
      </section>

      {/* 3. Scientific Limitations & Assumptions */}
      <section className="museum-card flex flex-col gap-3 text-xs sm:text-sm text-slate-300 leading-relaxed border-amber-900/40">
        <h2 className="text-base font-serif font-bold text-amber-300 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-400" />
          Simulation Limitations & Computational Assumptions
        </h2>
        <p>
          For academic transparency, users should take note of the following modeling choices:
        </p>
        <ul className="list-disc pl-5 space-y-1.5 text-slate-400">
          <li>
            <strong className="text-slate-200">Earth Shape & Refraction:</strong> Solar calculations use the standard NOAA/Meeus topocentric approximation. Atmospheric refraction is applied with standard mean atmospheric conditions (1010 hPa, 10°C).
          </li>
          <li>
            <strong className="text-slate-200">Instrument Orientation:</strong> The 3D model assumes the instrument is oriented plumb (strictly vertical) and aligned with the plane of the Sun’s vertical circle during observation.
          </li>
          <li>
            <strong className="text-slate-200">Wood & Metal Materiality:</strong> Materials are procedural Three.js shaders approximating aged teak wood and unlacquered bronze; they represent historical appearances but are not 3D scans of a single surviving artifact.
          </li>
        </ul>
      </section>

      {/* 4. Scholarly Bibliography & References */}
      <section className="museum-card flex flex-col gap-3 text-xs">
        <div className="flex items-center gap-2 text-amber-400 border-b border-slate-800 pb-2">
          <BookOpen className="w-4 h-4" />
          <h2 className="text-sm font-serif font-bold text-white uppercase tracking-wider">
            Scholarly References & Primary Sources
          </h2>
        </div>

        <ol className="list-decimal pl-5 space-y-2 text-slate-300 leading-relaxed">
          <li>
            <strong>Bhāskarācārya (Bhāskara II)</strong> (c. 1150 CE). <em>Siddhānta-śiromaṇi, Golādhyāya, Yantrādhyāya</em>. Critical edition with commentary by Muralidhara Thakura, Chowkhamba Sanskrit Series, Varanasi.
          </li>
          <li>
            <strong>Sarma, S.R.</strong> (2018). <em>A Descriptive Catalogue of Indian Astronomical Instruments</em>. Published online at <span className="text-amber-400 font-mono">srsarma.in</span>. (Comprehensive catalog of surviving historical Phalaka and astrolabe instruments).
          </li>
          <li>
            <strong>Plofker, Kim</strong> (2009). <em>Mathematics in India</em>. Princeton University Press. Chapters on astronomical trigonometry, Tri-jyā tables, and shadow calculations.
          </li>
          <li>
            <strong>Subbarayappa, B.V. & Sarma, K.V.</strong> (1985). <em>Indian Astronomy: A Source-Book</em>. Nehru Centre, Bombay.
          </li>
          <li>
            <strong>Meeus, Jean</strong> (1998). <em>Astronomical Algorithms</em> (2nd Edition). Willmann-Bell, Richmond, Virginia.
          </li>
        </ol>
      </section>
    </div>
  );
};
