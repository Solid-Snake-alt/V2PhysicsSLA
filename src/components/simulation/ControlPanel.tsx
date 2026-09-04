import React, { useState, useEffect } from 'react';
import { GeoLocation, VisualGuidesConfig } from '../../types';
import { HISTORICAL_LOCATIONS } from '../../data/historical';
import {
  Calendar,
  Clock,
  MapPin,
  Sliders,
  Sun,
  Eye,
  RotateCcw,
  Play,
  Pause,
  Target,
  Sparkles
} from 'lucide-react';

interface ControlPanelProps {
  date: Date;
  onDateChange: (date: Date) => void;
  timeStr: string;
  onTimeChange: (time: string) => void;
  location: GeoLocation;
  onLocationChange: (loc: GeoLocation) => void;
  indexAngle: number;
  onIndexAngleChange: (angle: number) => void;
  solarAltitude: number;
  isDaylight: boolean;
  guides: VisualGuidesConfig;
  onGuidesChange: (guides: VisualGuidesConfig) => void;
  onReset: () => void;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({
  date,
  onDateChange,
  timeStr,
  onTimeChange,
  location,
  onLocationChange,
  indexAngle,
  onIndexAngleChange,
  solarAltitude,
  isDaylight,
  guides,
  onGuidesChange,
  onReset,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTab, setActiveTab] = useState<'observation' | 'instrument' | 'guides'>('observation');

  // Time-scrub animation loop
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      const [h, m] = timeStr.split(':').map(Number);
      let totalMinutes = (h * 60 + m + 5) % 1440; // advance 5 minutes per tick
      const nextH = Math.floor(totalMinutes / 60);
      const nextM = totalMinutes % 60;
      onTimeChange(`${nextH.toString().padStart(2, '0')}:${nextM.toString().padStart(2, '0')}`);
    }, 150);

    return () => clearInterval(interval);
  }, [isPlaying, timeStr, onTimeChange]);

  // Convert timeStr "HH:MM" to minutes for slider
  const [hours, minutes] = timeStr.split(':').map(Number);
  const currentMinutes = (hours || 0) * 60 + (minutes || 0);

  const handleSliderTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    const total = parseInt(e.target.value, 10);
    const h = Math.floor(total / 60);
    const m = total % 60;
    onTimeChange(`${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`);
  };

  const handleLocationPreset = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = HISTORICAL_LOCATIONS.find((l) => l.name === e.target.value);
    if (selected) {
      onLocationChange(selected);
    }
  };

  const snapArmToSun = () => {
    if (solarAltitude > 0) {
      onIndexAngleChange(parseFloat(solarAltitude.toFixed(1)));
    } else {
      onIndexAngleChange(0);
    }
  };

  return (
    <div className="museum-card flex flex-col gap-4 text-sm">
      {/* Header Tabs */}
      <div className="flex border-b border-slate-700/80 pb-2.5 justify-between items-center">
        <div className="flex gap-1.5">
          <button
            onClick={() => setActiveTab('observation')}
            className={`btn-subtle px-3 py-1.5 ${activeTab === 'observation' ? 'active' : ''}`}
          >
            <Clock className="w-3.5 h-3.5" /> Time & Site
          </button>
          <button
            onClick={() => setActiveTab('instrument')}
            className={`btn-subtle px-3 py-1.5 ${activeTab === 'instrument' ? 'active' : ''}`}
          >
            <Sliders className="w-3.5 h-3.5" /> Arm Control
          </button>
          <button
            onClick={() => setActiveTab('guides')}
            className={`btn-subtle px-3 py-1.5 ${activeTab === 'guides' ? 'active' : ''}`}
          >
            <Eye className="w-3.5 h-3.5" /> Guides
          </button>
        </div>
        <button
          onClick={onReset}
          className="text-slate-400 hover:text-amber-300 transition-colors p-1"
          title="Reset all settings to default"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* TAB 1: Observation Controls */}
      {activeTab === 'observation' && (
        <div className="flex flex-col gap-3.5">
          {/* Date Selector */}
          <div>
            <label className="text-xs text-slate-400 font-medium flex items-center gap-1.5 mb-1.5">
              <Calendar className="w-3.5 h-3.5 text-amber-400" /> Observation Date:
            </label>
            <input
              type="date"
              value={date.toISOString().split('T')[0]}
              onChange={(e) => onDateChange(new Date(e.target.value + 'T12:00:00'))}
              className="input-field"
            />
          </div>

          {/* Time Scrubber Slider */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs text-slate-400 font-medium flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-amber-400" /> Local Time:
              </label>
              <span className="font-mono text-amber-300 font-bold bg-slate-900 px-2 py-0.5 rounded border border-slate-700">
                {timeStr}:00
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="1439"
              step="5"
              value={currentMinutes}
              onChange={handleSliderTime}
            />
            {/* Play/Pause day simulation */}
            <div className="flex justify-between items-center mt-2">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className={`btn-subtle text-xs px-2.5 py-1 ${isPlaying ? 'bg-amber-900/30 text-amber-300 border-amber-600/50' : ''}`}
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-3.5 h-3.5" /> Pause Solar Scrub
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5" /> Animate Day Path
                  </>
                )}
              </button>
              <div className="flex gap-1 text-[10px] text-slate-400">
                <button
                  onClick={() => onTimeChange('06:00')}
                  className="hover:text-amber-300 bg-slate-800 px-1.5 py-0.5 rounded"
                >
                  Dawn
                </button>
                <button
                  onClick={() => onTimeChange('12:00')}
                  className="hover:text-amber-300 bg-slate-800 px-1.5 py-0.5 rounded"
                >
                  Noon
                </button>
                <button
                  onClick={() => onTimeChange('18:00')}
                  className="hover:text-amber-300 bg-slate-800 px-1.5 py-0.5 rounded"
                >
                  Dusk
                </button>
              </div>
            </div>
          </div>

          {/* Location Presets & Custom Coordinates */}
          <div>
            <label className="text-xs text-slate-400 font-medium flex items-center gap-1.5 mb-1.5">
              <MapPin className="w-3.5 h-3.5 text-amber-400" /> Observing Site (City / Meridian):
            </label>
            <select
              value={location.name}
              onChange={handleLocationPreset}
              className="input-field mb-2"
            >
              {HISTORICAL_LOCATIONS.map((loc) => (
                <option key={loc.name} value={loc.name}>
                  {loc.name} ({loc.latitude > 0 ? `${loc.latitude}°N` : `${Math.abs(loc.latitude)}°S`})
                </option>
              ))}
            </select>
            {location.description && (
              <p className="text-[11px] text-slate-400 italic bg-slate-900/60 p-2 rounded border border-slate-800">
                {location.description}
              </p>
            )}
          </div>

          {/* Coordinates Grid */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <span className="text-slate-400 block mb-1">Latitude (°):</span>
              <input
                type="number"
                step="0.001"
                min="-90"
                max="90"
                value={location.latitude}
                onChange={(e) =>
                  onLocationChange({ ...location, name: 'Custom Site', latitude: parseFloat(e.target.value) || 0 })
                }
                className="input-field font-mono"
              />
            </div>
            <div>
              <span className="text-slate-400 block mb-1">Longitude (°):</span>
              <input
                type="number"
                step="0.001"
                min="-180"
                max="180"
                value={location.longitude}
                onChange={(e) =>
                  onLocationChange({ ...location, name: 'Custom Site', longitude: parseFloat(e.target.value) || 0 })
                }
                className="input-field font-mono"
              />
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Instrument & Index Arm Controls */}
      {activeTab === 'instrument' && (
        <div className="flex flex-col gap-4">
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs text-slate-300 font-medium flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-amber-400" /> Paṭṭikā (Index Arm) Angle:
              </label>
              <span className="font-mono text-amber-300 font-bold bg-slate-900 px-2 py-0.5 rounded border border-amber-500/30">
                {indexAngle.toFixed(1)}°
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="90"
              step="0.1"
              value={indexAngle}
              onChange={(e) => onIndexAngleChange(parseFloat(e.target.value))}
            />
            <div className="flex justify-between text-[11px] text-slate-500 mt-1 font-mono">
              <span>0° (Horizon)</span>
              <span>45°</span>
              <span>90° (Zenith)</span>
            </div>
          </div>

          {/* Quick Alignment Action */}
          <div className="bg-amber-950/20 border border-amber-700/40 p-3 rounded-md flex flex-col gap-2">
            <div className="flex items-center gap-2 text-amber-300 font-medium text-xs">
              <Target className="w-4 h-4 text-amber-400" />
              <span>Observation Alignment:</span>
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              In historical practice, the astronomer rotates the movable arm until the slit vanes align with the solar disk, or until the central pin's shadow falls along the arm.
            </p>
            <button
              onClick={snapArmToSun}
              disabled={!isDaylight}
              className={`btn-gold text-xs py-1.5 w-full justify-center ${!isDaylight ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              {isDaylight ? `Align Arm to Sun Altitude (${solarAltitude.toFixed(1)}°)` : 'Sun is Below Horizon (Night)'}
            </button>
          </div>

          {/* Quick presets */}
          <div className="flex gap-2 text-xs">
            <button
              onClick={() => onIndexAngleChange(0)}
              className="btn-subtle flex-1 justify-center"
            >
              Set Horizon (0°)
            </button>
            <button
              onClick={() => onIndexAngleChange(45)}
              className="btn-subtle flex-1 justify-center"
            >
              Set 45°
            </button>
            <button
              onClick={() => onIndexAngleChange(90)}
              className="btn-subtle flex-1 justify-center"
            >
              Set Zenith (90°)
            </button>
          </div>
        </div>
      )}

      {/* TAB 3: Visual Guides Toggles */}
      {activeTab === 'guides' && (
        <div className="flex flex-col gap-3 py-1">
          <p className="text-xs text-slate-400">
            Toggle educational measurement overlays and coordinate annotations in the 3D scene:
          </p>
          <label className="toggle-checkbox">
            <input
              type="checkbox"
              checked={guides.showLabels}
              onChange={(e) => onGuidesChange({ ...guides, showLabels: e.target.checked })}
            />
            <span>Show 3D Component Anatomical Labels</span>
          </label>

          <label className="toggle-checkbox">
            <input
              type="checkbox"
              checked={guides.showAngles}
              onChange={(e) => onGuidesChange({ ...guides, showAngles: e.target.checked })}
            />
            <span>Show Altitude Angle Arc (θ)</span>
          </label>

          <label className="toggle-checkbox">
            <input
              type="checkbox"
              checked={guides.showProjections}
              onChange={(e) => onGuidesChange({ ...guides, showProjections: e.target.checked })}
            />
            <span>Show Right-Triangle Projections (Opposite / Adjacent)</span>
          </label>

          <label className="toggle-checkbox">
            <input
              type="checkbox"
              checked={guides.showSunRay}
              onChange={(e) => onGuidesChange({ ...guides, showSunRay: e.target.checked })}
            />
            <span>Show Golden Solar Sighting Ray</span>
          </label>

          <label className="toggle-checkbox">
            <input
              type="checkbox"
              checked={guides.showGrid}
              onChange={(e) => onGuidesChange({ ...guides, showGrid: e.target.checked })}
            />
            <span>Show Ground Horizon Calibration Grid</span>
          </label>
        </div>
      )}
    </div>
  );
};
