import React, { useMemo } from 'react';
import * as THREE from 'three';
import { Html } from '@react-three/drei';
import { VisualGuidesConfig, GeometryBreakdown } from '../../types';
import { PHALAKA_CONFIG } from '../../data/historical';

interface MeasurementGuidesProps {
  guides: VisualGuidesConfig;
  geometry: GeometryBreakdown;
  solarAltitude: number;
}

/**
 * 3D Measurement Guides Component
 *
 * Renders:
 * - Dynamic right-triangle breakdown (opposite, adjacent, hypotenuse)
 * - Measurement angle arc from horizontal
 * - 3D museum labels for instrument anatomy
 */
export const MeasurementGuides: React.FC<MeasurementGuidesProps> = ({
  guides,
  geometry,
}) => {
  const { showLabels, showAngles, showProjections, showGrid } = guides;
  const { indexAngle, opposite, adjacent } = geometry;

  const zPos = PHALAKA_CONFIG.boardThickness / 2 + 0.055;

  // Arc curve segment points for lineSegments
  const arcGeometry = useMemo(() => {
    const points: THREE.Vector3[] = [];
    const arcRadius = 0.55;
    const steps = 32;
    const maxRad = (indexAngle * Math.PI) / 180;

    for (let i = 0; i < steps; i++) {
      const theta1 = (i / steps) * maxRad;
      const theta2 = ((i + 1) / steps) * maxRad;
      points.push(
        new THREE.Vector3(arcRadius * Math.cos(theta1), arcRadius * Math.sin(theta1), zPos),
        new THREE.Vector3(arcRadius * Math.cos(theta2), arcRadius * Math.sin(theta2), zPos)
      );
    }
    return new THREE.BufferGeometry().setFromPoints(points);
  }, [indexAngle, zPos]);

  // Triangle segment points:
  // Base: (0, 0) -> (adjacent, 0)
  // Height: (adjacent, 0) -> (adjacent, opposite)
  // Hypotenuse: (adjacent, opposite) -> (0, 0)
  const triangleGeometry = useMemo(() => {
    const p0 = new THREE.Vector3(0, 0, zPos);
    const p1 = new THREE.Vector3(adjacent, 0, zPos);
    const p2 = new THREE.Vector3(adjacent, opposite, zPos);

    return new THREE.BufferGeometry().setFromPoints([
      p0, p1, // adjacent (base)
      p1, p2, // opposite (height)
      p2, p0, // hypotenuse
    ]);
  }, [adjacent, opposite, zPos]);

  // Right-angle square indicator
  const rightAngleGeometry = useMemo(() => {
    if (adjacent <= 0.15 || opposite <= 0.15) return null;
    const s = 0.08;
    return new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(adjacent - s, 0, zPos),
      new THREE.Vector3(adjacent - s, s, zPos),
      new THREE.Vector3(adjacent - s, s, zPos),
      new THREE.Vector3(adjacent, s, zPos),
    ]);
  }, [adjacent, opposite, zPos]);

  return (
    <group>
      {/* 1. Right-Triangle Projections */}
      {showProjections && (
        <group>
          {/* Triangle edges */}
          <lineSegments geometry={triangleGeometry}>
            <lineBasicMaterial color="#38bdf8" linewidth={2.5} />
          </lineSegments>

          {/* Right-angle square indicator at (adjacent, 0) */}
          {rightAngleGeometry && (
            <lineSegments geometry={rightAngleGeometry}>
              <lineBasicMaterial color="#94a3b8" linewidth={1.5} />
            </lineSegments>
          )}

          {/* Label on Vertical Leg */}
          {showLabels && opposite > 0.25 && (
            <Html position={[adjacent + 0.08, opposite / 2, zPos]} center>
              <div className="bg-slate-900/90 text-rose-300 text-[10px] px-1.5 py-0.5 rounded border border-rose-500/30 whitespace-nowrap font-mono shadow">
                Opp: {opposite} (Jyā)
              </div>
            </Html>
          )}

          {/* Label on Horizontal Leg */}
          {showLabels && adjacent > 0.25 && (
            <Html position={[adjacent / 2, -0.1, zPos]} center>
              <div className="bg-slate-900/90 text-teal-300 text-[10px] px-1.5 py-0.5 rounded border border-teal-500/30 whitespace-nowrap font-mono shadow">
                Adj: {adjacent} (Koṭijyā)
              </div>
            </Html>
          )}
        </group>
      )}

      {/* 2. Angle Arc & Angle Readout */}
      {showAngles && indexAngle > 0.5 && (
        <group>
          <lineSegments geometry={arcGeometry}>
            <lineBasicMaterial color="#fbbf24" linewidth={2} />
          </lineSegments>

          {/* Angle readout badge floating near arc */}
          <Html
            position={[
              0.65 * Math.cos(((indexAngle / 2) * Math.PI) / 180),
              0.65 * Math.sin(((indexAngle / 2) * Math.PI) / 180),
              zPos + 0.02,
            ]}
            center
          >
            <div className="bg-amber-950/90 text-amber-300 font-mono text-[11px] font-bold px-1.5 py-0.5 rounded border border-amber-500/40 shadow-lg pointer-events-none">
              θ = {indexAngle}°
            </div>
          </Html>
        </group>
      )}

      {/* 3. Component Labels (Historical Anatomy) */}
      {showLabels && (
        <group>
          {/* Board Label */}
          <Html position={[-PHALAKA_CONFIG.boardWidth * 0.4, PHALAKA_CONFIG.boardHeight * 0.38, zPos]} center>
            <div className="bg-slate-950/85 text-amber-200/90 text-xs px-2 py-0.5 rounded border border-amber-900/40 pointer-events-none whitespace-nowrap">
              <span className="font-serif font-bold">Phalaka</span> (फलक — Wooden Board)
            </div>
          </Html>

          {/* Sighting Arm (Paṭṭikā) */}
          <Html
            position={[
              (PHALAKA_CONFIG.indexArmLength * 0.65) * Math.cos((indexAngle * Math.PI) / 180) + 0.05,
              (PHALAKA_CONFIG.indexArmLength * 0.65) * Math.sin((indexAngle * Math.PI) / 180) + 0.12,
              zPos + 0.04,
            ]}
            center
          >
            <div className="bg-slate-950/85 text-amber-300 text-[11px] px-1.5 py-0.5 rounded border border-amber-600/40 pointer-events-none whitespace-nowrap">
              <span className="font-serif">Paṭṭikā</span> (पट्टिका — Index Arm)
            </div>
          </Html>

          {/* Pivot / Śaṅku */}
          <Html position={[0, -0.22, zPos + 0.2]} center>
            <div className="bg-slate-950/85 text-yellow-200 text-[11px] px-1.5 py-0.5 rounded border border-yellow-600/40 pointer-events-none whitespace-nowrap">
              <span className="font-serif">Śaṅku</span> (शङ्कु — Central Gnomon Pin)
            </div>
          </Html>

          {/* Plumb Line (Avalambaka) */}
          <Html position={[-0.32, 0.6, zPos]} center>
            <div className="bg-slate-950/85 text-slate-300 text-[10px] px-1.5 py-0.5 rounded border border-slate-700 pointer-events-none whitespace-nowrap">
              <span className="font-serif">Avalambaka</span> (अवलम्बक — Plumb Line)
            </div>
          </Html>
        </group>
      )}

      {/* 4. Measurement Grid */}
      {showGrid && (
        <gridHelper
          args={[12, 24, '#c5a059', '#1e293b']}
          position={[0, -2.18, 0]}
        />
      )}
    </group>
  );
};
