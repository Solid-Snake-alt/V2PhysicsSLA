import React, { useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import * as THREE from 'three';
import { PhalakaModel } from './PhalakaModel';
import { SunVisualization } from './SunVisualization';
import { MeasurementGuides } from './MeasurementGuides';
import { SolarPosition, VisualGuidesConfig, GeometryBreakdown } from '../../types';
import { RotateCcw, Eye, Compass } from 'lucide-react';

interface PhalakaCanvasProps {
  indexAngle: number;
  onAngleChange: (angle: number) => void;
  solarPosition: SolarPosition;
  geometry: GeometryBreakdown;
  guides: VisualGuidesConfig;
}

/**
 * 3D Simulation Canvas
 *
 * Hosts the Three.js viewport, camera controls, ambient illumination,
 * procedural Phalaka Yantra, Sun lighting, and visual measurement overlays.
 */
export const PhalakaCanvas: React.FC<PhalakaCanvasProps> = ({
  indexAngle,
  onAngleChange,
  solarPosition,
  geometry,
  guides,
}) => {
  const controlsRef = useRef<OrbitControlsImpl>(null);
  const [viewMode, setViewMode] = useState<'perspective' | 'front' | 'side' | 'sighting'>('perspective');

  // Camera preset handler
  const setCameraView = (mode: 'perspective' | 'front' | 'side' | 'sighting') => {
    setViewMode(mode);
    if (!controlsRef.current) return;

    if (mode === 'front') {
      controlsRef.current.object.position.set(0, 0, 5.2);
      controlsRef.current.target.set(0, 0, 0);
    } else if (mode === 'perspective') {
      controlsRef.current.object.position.set(2.8, 1.8, 4.5);
      controlsRef.current.target.set(0, 0, 0);
    } else if (mode === 'side') {
      controlsRef.current.object.position.set(5.2, 0.4, 0.5);
      controlsRef.current.target.set(0, 0, 0);
    } else if (mode === 'sighting') {
      // Look along the index arm towards the dial/sun
      const rad = (indexAngle * Math.PI) / 180;
      controlsRef.current.object.position.set(
        -1.5 * Math.cos(rad),
        -1.5 * Math.sin(rad),
        1.2
      );
      controlsRef.current.target.set(
        1.5 * Math.cos(rad),
        1.5 * Math.sin(rad),
        0.1
      );
    }
    controlsRef.current.update();
  };

  const resetCamera = () => {
    setCameraView('perspective');
  };

  return (
    <div className="relative w-full h-[580px] lg:h-[680px] rounded-lg overflow-hidden border border-slate-700/60 bg-[#090d16] shadow-2xl">
      {/* 3D WebGL Canvas */}
      <Canvas
        shadows
        camera={{ position: [2.8, 1.8, 4.5], fov: 48 }}
        gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}
      >
        {/* Night sky background stars */}
        <color attach="background" args={['#090d16']} />
        <Stars
          radius={50}
          depth={50}
          count={2500}
          factor={3.5}
          saturation={0}
          fade
          speed={0.5}
        />

        {/* Ambient fill lighting */}
        <ambientLight intensity={0.4} color="#cad5e2" />

        {/* Soft fill light from front */}
        <directionalLight
          position={[0, 4, 6]}
          intensity={0.45}
          color="#ffffff"
        />

        {/* Dynamic Sun Light, Sun Sphere & Rays */}
        <SunVisualization
          solarPosition={solarPosition}
          showSunRay={guides.showSunRay}
        />

        {/* 3D Phalaka Yantra Instrument Model */}
        <PhalakaModel
          indexAngle={indexAngle}
          onAngleChange={onAngleChange}
          showLabels={guides.showLabels}
          shadowPinProps={{
            solarAltitude: solarPosition.altitude,
            solarAzimuth: solarPosition.azimuth,
            isDaylight: solarPosition.isDaylight,
          }}
        />

        {/* Visual Measurement Guides & Triangle Projections */}
        <MeasurementGuides
          guides={guides}
          geometry={geometry}
          solarAltitude={solarPosition.altitude}
        />

        {/* Camera OrbitControls */}
        <OrbitControls
          ref={controlsRef}
          enableDamping
          dampingFactor={0.05}
          minDistance={1.8}
          maxDistance={12}
          maxPolarAngle={Math.PI / 2 + 0.15} // prevent going far beneath ground
        />
      </Canvas>

      {/* Floating Canvas Camera Control Toolbar */}
      <div className="absolute top-3 left-3 flex flex-wrap items-center gap-1.5 bg-slate-950/80 backdrop-blur-md p-1.5 rounded-md border border-slate-700/60 shadow-lg text-xs">
        <span className="text-slate-400 font-medium px-2 py-0.5 flex items-center gap-1 text-[11px]">
          <Eye className="w-3.5 h-3.5 text-amber-400" /> View:
        </span>
        <button
          onClick={() => setCameraView('perspective')}
          className={`btn-subtle px-2.5 py-1 ${viewMode === 'perspective' ? 'active' : ''}`}
        >
          3D Free Orbit
        </button>
        <button
          onClick={() => setCameraView('front')}
          className={`btn-subtle px-2.5 py-1 ${viewMode === 'front' ? 'active' : ''}`}
        >
          Front Elevation
        </button>
        <button
          onClick={() => setCameraView('side')}
          className={`btn-subtle px-2.5 py-1 ${viewMode === 'side' ? 'active' : ''}`}
        >
          Side Profile
        </button>
        <button
          onClick={() => setCameraView('sighting')}
          className={`btn-subtle px-2.5 py-1 ${viewMode === 'sighting' ? 'active' : ''}`}
        >
          Sighting Axis
        </button>
        <button
          onClick={resetCamera}
          className="btn-subtle px-2 py-1 text-amber-300 hover:text-amber-200"
          title="Reset camera position"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Floating Status Indicator at bottom left */}
      <div className="absolute bottom-3 left-3 flex items-center gap-2 bg-slate-950/85 backdrop-blur-md px-3 py-1.5 rounded-md border border-slate-800 text-[11px] font-mono text-slate-300">
        <span
          className={`w-2 h-2 rounded-full ${
            solarPosition.isDaylight ? 'bg-amber-400 shadow-[0_0_8px_#fbbf24]' : 'bg-indigo-400'
          }`}
        />
        <span>
          {solarPosition.isDaylight ? 'SOLAR DAYLIGHT' : 'CELESTIAL NIGHT'}
        </span>
        <span className="text-slate-500">|</span>
        <span className="text-amber-300 flex items-center gap-1">
          <Compass className="w-3 h-3" /> Az: {solarPosition.azimuth}°
        </span>
        <span className="text-slate-500">|</span>
        <span className="text-sky-300">Alt: {solarPosition.altitude}°</span>
      </div>
    </div>
  );
};
