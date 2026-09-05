import React, { useMemo } from 'react';
import * as THREE from 'three';
import { Html, Line } from '@react-three/drei';
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
 *
 * Label placement strategy
 * -------------------------
 * Every label is anchored to an actual physical (or geometric) point on the
 * instrument, then nudged outward along a well-defined direction (radial,
 * perpendicular-to-arm, or a fixed board-relative offset) so it never sits on
 * top of the mesh it describes, and stays clear of the *other* labels. A thin
 * dashed "leader line" ties each nudged label back to its anchor point so the
 * association remains obvious even though the label itself lives a little
 * further away. Anatomical labels (`showLabels`) are visually distinct from,
 * and rendered independently of, the mathematical construction overlay
 * (`showAngles` / `showProjections`) so the two groups can be toggled apart
 * to reduce clutter — anatomy is shown by default, geometry overlay is
 * opt-in (see Simulation.tsx default guides state).
 */
export const MeasurementGuides: React.FC<MeasurementGuidesProps> = ({
  guides,
  geometry,
}) => {
  const { showLabels, showAngles, showProjections, showGrid } = guides;
  const { indexAngle, opposite, adjacent } = geometry;

  const zPos = PHALAKA_CONFIG.boardThickness / 2 + 0.055;
  const armAngleRad = (indexAngle * Math.PI) / 180;

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

  // --- Anatomical label anchor points (physical components) -------------
  // Board label: fixed corner of the board, well clear of the dial circle.
  const boardLabelPos: [number, number, number] = [
    -PHALAKA_CONFIG.boardWidth * 0.4,
    PHALAKA_CONFIG.boardHeight * 0.38,
    zPos,
  ];

  // Index arm (Paṭṭikā): anchor at the physical arm tip, label pushed further
  // out along a slightly rotated radius so it reads beside the pointer
  // instead of on the extension of the arm itself, at any arm angle.
  const armTipPos: [number, number, number] = [
    PHALAKA_CONFIG.indexArmLength * Math.cos(armAngleRad),
    PHALAKA_CONFIG.indexArmLength * Math.sin(armAngleRad),
    zPos + 0.04,
  ];
  const armLabelAngleRad = armAngleRad - (8 * Math.PI) / 180;
  const armLabelRadius = PHALAKA_CONFIG.indexArmLength * 1.16;
  const armLabelPos: [number, number, number] = [
    armLabelRadius * Math.cos(armLabelAngleRad),
    armLabelRadius * Math.sin(armLabelAngleRad),
    zPos + 0.05,
  ];

  // Śaṅku (central gnomon pin): anchor at the pivot, label offset below-right
  // so it never collides with the arm sweep (which stays in the upper
  // quadrant) or the plumb line (which stays on the vertical centerline).
  const pivotAnchorPos: [number, number, number] = [0, 0, zPos + 0.06];
  const pivotLabelPos: [number, number, number] = [0.4, -0.55, zPos + 0.2];

  // Avalambaka (plumb line): anchor partway down the hanging thread, label
  // offset to the left of the board's vertical centerline.
  const plumbLabelY = 1.0;
  const plumbAnchorPos: [number, number, number] = [0, plumbLabelY, zPos];
  const plumbLabelPos: [number, number, number] = [-0.85, plumbLabelY, zPos];

  return (
    <group>
      {/* 1. Right-Triangle Projections (mathematical construction overlay) */}
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
          {opposite > 0.25 && (
            <Html position={[adjacent + 0.16, opposite / 2, zPos]} center pointerEvents="none" zIndexRange={[40, 0]}>
              <div className="bg-slate-900/90 text-rose-300 text-[10px] px-1.5 py-0.5 rounded border border-rose-500/30 whitespace-nowrap font-mono shadow">
                Opp: {opposite} (Jyā)
              </div>
            </Html>
          )}

          {/* Label on Horizontal Leg */}
          {adjacent > 0.25 && (
            <Html position={[adjacent / 2, -0.2, zPos]} center pointerEvents="none" zIndexRange={[40, 0]}>
              <div className="bg-slate-900/90 text-teal-300 text-[10px] px-1.5 py-0.5 rounded border border-teal-500/30 whitespace-nowrap font-mono shadow">
                Adj: {adjacent} (Koṭijyā)
              </div>
            </Html>
          )}
        </group>
      )}

      {/* 2. Angle Arc & Angle Readout (mathematical construction overlay) */}
      {showAngles && indexAngle > 0.5 && (
        <group>
          <lineSegments geometry={arcGeometry}>
            <lineBasicMaterial color="#fbbf24" linewidth={2} />
          </lineSegments>

          {/* Angle readout badge floating near arc */}
          <Html
            position={[
              0.72 * Math.cos(((indexAngle / 2) * Math.PI) / 180),
              0.72 * Math.sin(((indexAngle / 2) * Math.PI) / 180),
              zPos + 0.02,
            ]}
            center
            pointerEvents="none"
            zIndexRange={[40, 0]}
          >
            <div className="bg-amber-950/90 text-amber-300 font-mono text-[11px] font-bold px-1.5 py-0.5 rounded border border-amber-500/40 shadow-lg">
              θ = {indexAngle}°
            </div>
          </Html>
        </group>
      )}

      {/* 3. Component Labels (Historical Anatomy) — default-visible group */}
      {showLabels && (
        <group>
          {/* Board Label — upper-left corner, clear of the dial markings */}
          <Html position={boardLabelPos} center pointerEvents="none" zIndexRange={[80, 0]}>
            <div className="bg-slate-950/85 text-amber-200/90 text-xs px-2 py-0.5 rounded border border-amber-900/40 whitespace-nowrap">
              <span className="font-serif font-bold">Phalaka</span> (फलक — Wooden Board)
            </div>
          </Html>

          {/* Sighting Arm (Paṭṭikā) — leader line from tip to offset label */}
          <Line
            points={[armTipPos, armLabelPos]}
            color="#d4af37"
            lineWidth={1}
            transparent
            opacity={0.5}
            dashed
            dashSize={0.03}
            gapSize={0.03}
          />
          <Html position={armLabelPos} center pointerEvents="none" zIndexRange={[80, 0]}>
            <div className="bg-slate-950/85 text-amber-300 text-[11px] px-1.5 py-0.5 rounded border border-amber-600/40 whitespace-nowrap">
              <span className="font-serif">Paṭṭikā</span> (पट्टिका — Index Arm)
            </div>
          </Html>

          {/* Pivot / Śaṅku — leader line from pivot to offset label below */}
          <Line
            points={[pivotAnchorPos, pivotLabelPos]}
            color="#eab308"
            lineWidth={1}
            transparent
            opacity={0.5}
            dashed
            dashSize={0.03}
            gapSize={0.03}
          />
          <Html position={pivotLabelPos} center pointerEvents="none" zIndexRange={[80, 0]}>
            <div className="bg-slate-950/85 text-yellow-200 text-[11px] px-1.5 py-0.5 rounded border border-yellow-600/40 whitespace-nowrap">
              <span className="font-serif">Śaṅku</span> (शङ्कु — Central Gnomon Pin)
            </div>
          </Html>

          {/* Plumb Line (Avalambaka) — leader line to the left-offset label */}
          <Line
            points={[plumbAnchorPos, plumbLabelPos]}
            color="#cbd5e1"
            lineWidth={1}
            transparent
            opacity={0.4}
            dashed
            dashSize={0.03}
            gapSize={0.03}
          />
          <Html position={plumbLabelPos} center pointerEvents="none" zIndexRange={[80, 0]}>
            <div className="bg-slate-950/85 text-slate-300 text-[10px] px-1.5 py-0.5 rounded border border-slate-700 whitespace-nowrap">
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
