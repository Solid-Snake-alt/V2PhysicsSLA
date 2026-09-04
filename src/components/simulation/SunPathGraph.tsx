import React, { useMemo } from 'react';
import { SolarPathPoint, SolarPosition } from '../../types';
import { Sun, ArrowUp, ArrowDown } from 'lucide-react';

interface SunPathGraphProps {
  solarPath: SolarPathPoint[];
  currentHour: number; // e.g., 14.5
  currentTimeStr: string;
  solarPosition: SolarPosition;
}

/**
 * Clean Educational Sun-Path Chart (SVG Implementation)
 *
 * Plots the daily trajectory of solar altitude from midnight to midnight.
 * Highlights current time position, sunrise, sunset, and solar noon altitude.
 */
export const SunPathGraph: React.FC<SunPathGraphProps> = ({
  solarPath,
  currentHour,
  currentTimeStr,
  solarPosition,
}) => {
  const width = 640;
  const height = 180;
  const padding = { top: 20, right: 30, bottom: 30, left: 40 };

  const graphWidth = width - padding.left - padding.right;
  const graphHeight = height - padding.top - padding.bottom;

  // Y-axis range: from -30° (night depth) to +90° (zenith)
  const minAlt = -30;
  const maxAlt = 90;

  const getX = (hour: number) => padding.left + (hour / 24) * graphWidth;
  const getY = (alt: number) =>
    padding.top + graphHeight - ((alt - minAlt) / (maxAlt - minAlt)) * graphHeight;

  // Compute SVG polyline path
  const pathD = useMemo(() => {
    if (!solarPath || solarPath.length === 0) return '';
    return solarPath
      .map((pt, i) => {
        const x = getX(pt.hour);
        const y = getY(pt.altitude);
        return `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
      })
      .join(' ');
  }, [solarPath]);

  // Horizon Y (altitude = 0°)
  const horizonY = getY(0);

  // Current position on curve
  const currentX = getX(currentHour);
  const currentY = getY(solarPosition.altitude);

  return (
    <div className="museum-card flex flex-col gap-2.5">
      <div className="flex justify-between items-center text-xs">
        <span className="font-serif font-bold text-amber-200 uppercase tracking-wider flex items-center gap-1.5">
          <Sun className="w-3.5 h-3.5 text-amber-400" />
          Daily Solar Altitude Trajectory
        </span>
        <div className="flex gap-3 text-[11px] font-mono text-slate-400">
          <span className="flex items-center gap-1 text-amber-400">
            <ArrowUp className="w-3 h-3" /> Rise: {solarPosition.sunriseTime}
          </span>
          <span className="flex items-center gap-1 text-purple-400">
            <ArrowDown className="w-3 h-3" /> Set: {solarPosition.sunsetTime}
          </span>
          <span className="text-yellow-300">
            Noon: {solarPosition.solarNoonAltitude}°
          </span>
        </div>
      </div>

      <div className="relative w-full overflow-x-auto">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-auto select-none"
          style={{ minWidth: '420px' }}
        >
          {/* Background Grids */}
          {/* Horizon Line (0°) */}
          <line
            x1={padding.left}
            y1={horizonY}
            x2={width - padding.right}
            y2={horizonY}
            stroke="#475569"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />
          <text
            x={width - padding.right + 4}
            y={horizonY + 3}
            fill="#94a3b8"
            fontSize="9"
            fontFamily="monospace"
          >
            0°
          </text>

          {/* 45° Altitude Grid */}
          <line
            x1={padding.left}
            y1={getY(45)}
            x2={width - padding.right}
            y2={getY(45)}
            stroke="#1e293b"
            strokeWidth="1"
          />
          <text
            x={padding.left - 24}
            y={getY(45) + 3}
            fill="#64748b"
            fontSize="9"
            fontFamily="monospace"
          >
            45°
          </text>

          {/* 90° Zenith Grid */}
          <line
            x1={padding.left}
            y1={getY(90)}
            x2={width - padding.right}
            y2={getY(90)}
            stroke="#1e293b"
            strokeWidth="1"
          />
          <text
            x={padding.left - 24}
            y={getY(90) + 3}
            fill="#64748b"
            fontSize="9"
            fontFamily="monospace"
          >
            90°
          </text>

          {/* Time Hour Ticks along X-axis */}
          {[0, 3, 6, 9, 12, 15, 18, 21, 24].map((hr) => {
            const x = getX(hr);
            return (
              <g key={hr}>
                <line
                  x1={x}
                  y1={height - padding.bottom}
                  x2={x}
                  y2={height - padding.bottom + 4}
                  stroke="#475569"
                />
                <text
                  x={x}
                  y={height - padding.bottom + 16}
                  fill="#94a3b8"
                  fontSize="9"
                  fontFamily="monospace"
                  textAnchor="middle"
                >
                  {`${hr.toString().padStart(2, '0')}:00`}
                </text>
              </g>
            );
          })}

          {/* Solar Curve Stroke */}
          <path
            d={pathD}
            fill="none"
            stroke="#fbbf24"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* Current Time Vertical Line */}
          <line
            x1={currentX}
            y1={padding.top}
            x2={currentX}
            y2={height - padding.bottom}
            stroke="#38bdf8"
            strokeWidth="1.5"
            strokeDasharray="3 3"
          />

          {/* Current Solar Altitude Marker Dot */}
          <circle
            cx={currentX}
            cy={currentY}
            r="5"
            fill="#fbbf24"
            stroke="#0f172a"
            strokeWidth="2"
          />
          <circle
            cx={currentX}
            cy={currentY}
            r="8"
            fill="none"
            stroke="#fbbf24"
            strokeWidth="1.5"
            opacity="0.6"
          />

          {/* Current Altitude Tooltip Badge */}
          <g transform={`translate(${Math.min(width - 110, Math.max(padding.left, currentX - 45))}, ${Math.max(12, currentY - 24)})`}>
            <rect
              width="90"
              height="18"
              rx="4"
              fill="#090d16"
              stroke="#fbbf24"
              strokeWidth="1"
            />
            <text
              x="45"
              y="12"
              fill="#fde047"
              fontSize="10"
              fontFamily="monospace"
              fontWeight="bold"
              textAnchor="middle"
            >
              {currentTimeStr} | {solarPosition.altitude.toFixed(1)}°
            </text>
          </g>
        </svg>
      </div>
    </div>
  );
};
