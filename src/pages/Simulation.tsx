import React, { useState, useMemo } from 'react';
import { GeoLocation, VisualGuidesConfig } from '../types';
import { HISTORICAL_LOCATIONS, GLOSSARY_TERMS } from '../data/historical';
import { calculateSolarPosition, getDailySolarPath } from '../engine/astronomy/solar';
import { calculateGeometryBreakdown } from '../engine/geometry/phalakaGeometry';
import { PhalakaCanvas } from '../components/simulation/PhalakaCanvas';
import { ControlPanel } from '../components/simulation/ControlPanel';
import { MeasurementPanel } from '../components/simulation/MeasurementPanel';
import { SunPathGraph } from '../components/simulation/SunPathGraph';
import { DisclaimerBanner } from '../components/common/DisclaimerBanner';
import { HelpCircle } from 'lucide-react';

export const Simulation: React.FC = () => {
  // Observation State
  const [date, setDate] = useState<Date>(() => new Date('2026-09-21T12:00:00')); // Autumnal Equinox default
  const [timeStr, setTimeStr] = useState<string>('12:00');
  const [location, setLocation] = useState<GeoLocation>(HISTORICAL_LOCATIONS[0]); // Default: Ujjain, India

  // Instrument State
  const [indexAngle, setIndexAngle] = useState<number>(66.8); // Default near equinox noon altitude

  // Visual Guides State
  const [guides, setGuides] = useState<VisualGuidesConfig>({
    showLabels: true,
    showAngles: true,
    showProjections: true,
    showSunRay: true,
    showShadow: true,
    showGrid: false,
  });

  // Calculate Solar Position
  const solarPosition = useMemo(() => {
    return calculateSolarPosition(
      date,
      timeStr,
      location.latitude,
      location.longitude,
      location.timezoneOffset || 0
    );
  }, [date, timeStr, location]);

  // Calculate Geometry Projections
  const geometry = useMemo(() => {
    return calculateGeometryBreakdown(indexAngle);
  }, [indexAngle]);

  // Daily Solar Trajectory Points for graph
  const solarPath = useMemo(() => {
    return getDailySolarPath(
      date,
      location.latitude,
      location.longitude,
      location.timezoneOffset || 0
    );
  }, [date, location]);

  // Current decimal hour for the graph
  const currentHour = useMemo(() => {
    const [h, m] = timeStr.split(':').map(Number);
    return (h || 0) + (m || 0) / 60;
  }, [timeStr]);

  // Reset to historical baseline (Equinox noon at Ujjain)
  const handleReset = () => {
    setDate(new Date('2026-09-21T12:00:00'));
    setTimeStr('12:00');
    setLocation(HISTORICAL_LOCATIONS[0]);
    setIndexAngle(66.8);
    setGuides({
      showLabels: true,
      showAngles: true,
      showProjections: true,
      showSunRay: true,
      showShadow: true,
      showGrid: false,
    });
  };

  return (
    <div className="simulation-layout">
      {/* Top Banner with Historical Disclaimer */}
      <DisclaimerBanner compact />

      {/* Main Simulation Layout: 3D Scene + Control/Telemetry Sidebar */}
      <div className="simulation-grid">
        {/* Left / Center: Interactive 3D Canvas Column */}
        <div className="simulation-canvas-col">
          <PhalakaCanvas
            indexAngle={indexAngle}
            onAngleChange={setIndexAngle}
            solarPosition={solarPosition}
            geometry={geometry}
            guides={guides}
          />

          {/* Quick Interaction Tips */}
          <div className="bg-slate-900 border border-slate-800 rounded-md p-3 text-xs text-slate-400 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-amber-400 shrink-0" />
              <span>
                <strong>Interaction:</strong> Drag to orbit camera. Scroll to zoom. Use view buttons above to switch camera perspective.
              </span>
            </div>
            <button
              onClick={() => {
                if (solarPosition.isDaylight) {
                  setIndexAngle(parseFloat(solarPosition.altitude.toFixed(1)));
                }
              }}
              className="text-amber-400 hover:text-amber-300 font-semibold underline text-xs whitespace-nowrap ml-2"
              style={{ background: 'none', border: 'none', cursor: 'pointer' }}
            >
              Align to Sun ({solarPosition.altitude.toFixed(1)}°)
            </button>
          </div>
        </div>

        {/* Right Sidebar: Controls & Live Telemetry Column */}
        <div className="simulation-sidebar-col">
          {/* Observation Telemetry Readout */}
          <MeasurementPanel
            date={date}
            timeStr={timeStr}
            location={location}
            solarPosition={solarPosition}
            geometry={geometry}
          />

          {/* Simulation Controls (Time, Location, Arm Angle, Guides) */}
          <ControlPanel
            date={date}
            onDateChange={setDate}
            timeStr={timeStr}
            onTimeChange={setTimeStr}
            location={location}
            onLocationChange={setLocation}
            indexAngle={indexAngle}
            onIndexAngleChange={setIndexAngle}
            solarAltitude={solarPosition.altitude}
            isDaylight={solarPosition.isDaylight}
            guides={guides}
            onGuidesChange={setGuides}
            onReset={handleReset}
          />
        </div>
      </div>

      {/* Daily Solar Path Chart Section */}
      <SunPathGraph
        solarPath={solarPath}
        currentHour={currentHour}
        currentTimeStr={timeStr}
        solarPosition={solarPosition}
      />

      {/* Sanskrit Instrument Anatomy & Terminology Bar */}
      <div className="museum-card flex flex-col gap-3">
        <h3 className="font-serif text-sm font-bold text-amber-200 uppercase tracking-wider">
          Phalaka Yantra Anatomical Reference (यन्त्र परिभाषा)
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 text-xs">
          {GLOSSARY_TERMS.slice(0, 5).map((term) => (
            <div key={term.transliteration} className="bg-slate-900 p-3 rounded border border-slate-800">
              <div className="text-amber-400 font-bold font-serif">{term.sanskrit} ({term.transliteration})</div>
              <div className="text-slate-200 font-medium text-xs mt-0.5">{term.meaning}</div>
              <div className="text-slate-400 text-xs mt-1 leading-relaxed">{term.historicalContext}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
