import React from 'react';
import { SolarPosition, GeometryBreakdown, GeoLocation } from '../../types';
import { degreesToGhatikas } from '../../engine/geometry/phalakaGeometry';
import { Compass, Sun, Triangle, CheckCircle, AlertCircle, Clock } from 'lucide-react';

interface MeasurementPanelProps {
  date: Date;
  timeStr: string;
  location: GeoLocation;
  solarPosition: SolarPosition;
  geometry: GeometryBreakdown;
}

export const MeasurementPanel: React.FC<MeasurementPanelProps> = ({
  date,
  timeStr,
  location,
  solarPosition,
  geometry,
}) => {
  const { altitude, azimuth, zenithDistance, declination, hourAngle, isDaylight } = solarPosition;
  const { indexAngle, opposite, adjacent, hypotenuse, jya, kotijya, triJyaRadius } = geometry;

  // Angular difference between arm and actual Sun altitude
  const angleDelta = Math.abs(indexAngle - altitude);
  const isAligned = isDaylight && angleDelta < 0.5;

  // Indian classical time representation from zenith distance
  const timeInGhatikas = degreesToGhatikas(zenithDistance);

  return (
    <div className="museum-card flex flex-col gap-4 font-sans text-xs">
      {/* Title & Status Badge */}
      <div className="flex justify-between items-center border-b border-slate-700/80 pb-2.5">
        <div>
          <h3 className="font-serif text-sm font-bold text-amber-200 uppercase tracking-wider">
            Observation & Telemetry
          </h3>
          <span className="text-[11px] text-slate-400">Live Scientific Telemetry</span>
        </div>
        <div className="flex items-center gap-1.5">
          {isAligned ? (
            <span className="badge-gold flex items-center gap-1">
              <CheckCircle className="w-3 h-3 text-emerald-400" /> SIGHTED
            </span>
          ) : isDaylight ? (
            <span className="badge-info flex items-center gap-1">
              <AlertCircle className="w-3 h-3 text-amber-400" /> Δ {angleDelta.toFixed(1)}°
            </span>
          ) : (
            <span className="badge-gold bg-indigo-950 text-indigo-300 border-indigo-700">
              NIGHT
            </span>
          )}
        </div>
      </div>

      {/* 1. Observation Context */}
      <div className="bg-slate-900/60 p-2.5 rounded border border-slate-800 flex flex-col gap-1">
        <div className="text-[11px] uppercase tracking-wider font-semibold text-slate-400">
          Observation Conditions
        </div>
        <div className="grid grid-cols-2 gap-x-2 gap-y-1 font-mono text-[11px] text-slate-300">
          <div>Date: <span className="text-white">{date.toLocaleDateString('en-GB')}</span></div>
          <div>Time: <span className="text-amber-300">{timeStr} Local</span></div>
          <div>Lat: <span className="text-white">{location.latitude.toFixed(3)}°</span></div>
          <div>Lon: <span className="text-white">{location.longitude.toFixed(3)}°</span></div>
        </div>
      </div>

      {/* 2. Solar Position Section */}
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center gap-1.5 text-amber-300 font-semibold text-xs">
          <Sun className="w-3.5 h-3.5 text-amber-400" />
          <span>Solar Coordinates (Topocentric)</span>
        </div>

        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="bg-slate-900/80 p-2 rounded border border-slate-800">
            <span className="text-[10px] text-slate-400 block">Altitude (Unnata)</span>
            <span className={`font-mono text-sm font-bold ${altitude > 0 ? 'text-amber-400' : 'text-slate-500'}`}>
              {altitude.toFixed(2)}°
            </span>
          </div>

          <div className="bg-slate-900/80 p-2 rounded border border-slate-800">
            <span className="text-[10px] text-slate-400 block">Azimuth</span>
            <span className="font-mono text-sm font-bold text-sky-300">
              {azimuth.toFixed(2)}°
            </span>
          </div>

          <div className="bg-slate-900/80 p-2 rounded border border-slate-800">
            <span className="text-[10px] text-slate-400 block">Zenith (Nata)</span>
            <span className="font-mono text-sm font-bold text-purple-300">
              {zenithDistance.toFixed(2)}°
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 text-[11px] font-mono text-slate-400 px-1 mt-0.5">
          <div>Declination: <span className="text-slate-200">{declination.toFixed(2)}°</span></div>
          <div>Hour Angle: <span className="text-slate-200">{hourAngle.toFixed(2)}°</span></div>
        </div>
      </div>

      {/* 3. Instrument Sighting Status */}
      <div className="border-t border-slate-800 pt-2.5 flex flex-col gap-1.5">
        <div className="flex items-center gap-1.5 text-amber-300 font-semibold text-xs">
          <Compass className="w-3.5 h-3.5 text-amber-400" />
          <span>Instrument Paṭṭikā Status</span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="bg-slate-900/80 p-2 rounded border border-slate-800">
            <span className="text-[10px] text-slate-400 block">Index Arm Angle (θ)</span>
            <span className="font-mono text-sm font-bold text-amber-300">
              {indexAngle.toFixed(2)}°
            </span>
          </div>
          <div className="bg-slate-900/80 p-2 rounded border border-slate-800">
            <span className="text-[10px] text-slate-400 block">Alignment Error</span>
            <span
              className={`font-mono text-sm font-bold ${
                isAligned ? 'text-emerald-400' : 'text-rose-400'
              }`}
            >
              {isDaylight ? `${angleDelta.toFixed(2)}°` : 'N/A (Night)'}
            </span>
          </div>
        </div>
      </div>

      {/* 4. Geometric & Trigonometric Projections */}
      <div className="border-t border-slate-800 pt-2.5 flex flex-col gap-1.5">
        <div className="flex items-center gap-1.5 text-sky-300 font-semibold text-xs">
          <Triangle className="w-3.5 h-3.5 text-sky-400" />
          <span>Geometric Projections</span>
        </div>

        <div className="bg-slate-950/60 p-2.5 rounded border border-slate-800 flex flex-col gap-2 font-mono text-[11px]">
          <div className="flex justify-between items-center text-rose-300">
            <span>Vertical Leg (Opposite = R · sin θ):</span>
            <span className="font-bold">{opposite}</span>
          </div>
          <div className="flex justify-between items-center text-teal-300">
            <span>Horizontal Leg (Adjacent = R · cos θ):</span>
            <span className="font-bold">{adjacent}</span>
          </div>
          <div className="flex justify-between items-center text-slate-400">
            <span>Radius / Hypotenuse (R):</span>
            <span className="font-bold text-slate-200">{hypotenuse}</span>
          </div>

          <div className="border-t border-slate-800 pt-1.5 flex justify-between text-[10px] text-amber-200/80">
            <span>Indian Tri-jya (R = {triJyaRadius}):</span>
            <span>Jyā = {jya} | Koṭijyā = {kotijya}</span>
          </div>
        </div>
      </div>

      {/* 5. Historical Indian Time equivalent */}
      <div className="border-t border-slate-800 pt-2 text-[11px] text-slate-400 flex items-center justify-between">
        <span className="flex items-center gap-1">
          <Clock className="w-3 h-3 text-amber-400" /> Nata (Zenith) Time:
        </span>
        <span className="font-mono text-amber-300 font-semibold">
          {timeInGhatikas.formatted}
        </span>
      </div>
    </div>
  );
};
