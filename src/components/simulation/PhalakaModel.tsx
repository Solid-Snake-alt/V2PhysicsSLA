import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { PHALAKA_CONFIG } from '../../data/historical';

interface PhalakaModelProps {
  indexAngle: number; // in degrees (0° to 90°)
  onAngleChange?: (newAngle: number) => void;
  showLabels?: boolean;
  shadowPinProps?: {
    solarAltitude: number;
    solarAzimuth: number;
    isDaylight: boolean;
  };
}

/**
 * Procedural 3D Model of the Phalaka Yantra
 *
 * Constructed directly with Three.js primitives for lightweight performance,
 * zero external asset dependencies, and authentic physical proportions.
 */
export const PhalakaModel: React.FC<PhalakaModelProps> = ({
  indexAngle,
  showLabels = true,
  shadowPinProps,
}) => {
  const armRef = useRef<THREE.Group>(null);

  // Precompute dial graduation ticks geometry in a single BufferGeometry for high performance
  const tickGeometry = useMemo(() => {
    const points: THREE.Vector3[] = [];
    const radius = PHALAKA_CONFIG.circleRadius;

    // Graduated arc: 0° to 180°
    for (let deg = 0; deg <= 180; deg += 1) {
      const rad = (deg * Math.PI) / 180;
      const isMajor = deg % 10 === 0;
      const isMid = deg % 5 === 0 && !isMajor;

      let tickLen = 0.025;
      if (isMajor) tickLen = 0.065;
      else if (isMid) tickLen = 0.045;

      const cos = Math.cos(rad);
      const sin = Math.sin(rad);

      points.push(
        new THREE.Vector3((radius - tickLen) * cos, (radius - tickLen) * sin, 0),
        new THREE.Vector3(radius * cos, radius * sin, 0)
      );
    }
    return new THREE.BufferGeometry().setFromPoints(points);
  }, []);

  // Arm rotation in radians (0° = horizontal along X, 90° = vertical along Y)
  const armRotationZ = (indexAngle * Math.PI) / 180;

  // Plumb line points
  const plumbPoints = useMemo(() => {
    return new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0, 0, 0.03),
      new THREE.Vector3(0, -PHALAKA_CONFIG.boardHeight * 0.8, 0.03),
    ]);
  }, []);

  return (
    <group position={[0, 0, 0]}>
      {/* 1. Main Rectangular Board (Phalaka) — Teak / Sandalwood finish */}
      <mesh receiveShadow castShadow position={[0, 0, 0]}>
        <boxGeometry
          args={[
            PHALAKA_CONFIG.boardWidth,
            PHALAKA_CONFIG.boardHeight,
            PHALAKA_CONFIG.boardThickness,
          ]}
        />
        <meshStandardMaterial
          color="#422817" // Rich aged teak wood tone
          roughness={0.75}
          metalness={0.1}
        />
      </mesh>

      {/* Brass Edge Trim / Border Framing */}
      <mesh position={[0, 0, PHALAKA_CONFIG.boardThickness / 2 + 0.002]}>
        <ringGeometry
          args={[
            PHALAKA_CONFIG.circleRadius + 0.08,
            PHALAKA_CONFIG.circleRadius + 0.1,
            64,
          ]}
        />
        <meshStandardMaterial
          color="#d4af37"
          roughness={0.35}
          metalness={0.8}
        />
      </mesh>

      {/* Decorative Outer Bevel border on Board */}
      <lineSegments position={[0, 0, PHALAKA_CONFIG.boardThickness / 2 + 0.005]}>
        <edgesGeometry
          args={[
            new THREE.BoxGeometry(
              PHALAKA_CONFIG.boardWidth - 0.1,
              PHALAKA_CONFIG.boardHeight - 0.1,
              0.01
            ),
          ]}
        />
        <lineBasicMaterial color="#c5a059" linewidth={2} />
      </lineSegments>

      {/* 2. Inscribed Dial Face (Aged parchment / bronze inlay plate) */}
      <mesh
        receiveShadow
        position={[0, 0, PHALAKA_CONFIG.boardThickness / 2 + 0.002]}
      >
        <circleGeometry args={[PHALAKA_CONFIG.circleRadius + 0.06, 64]} />
        <meshStandardMaterial
          color="#221c15" // Dark bronze / parchment background
          roughness={0.8}
          metalness={0.25}
        />
      </mesh>

      {/* Inner graduated ring band */}
      <mesh position={[0, 0, PHALAKA_CONFIG.boardThickness / 2 + 0.004]}>
        <ringGeometry
          args={[
            PHALAKA_CONFIG.circleRadius - 0.08,
            PHALAKA_CONFIG.circleRadius,
            64,
          ]}
        />
        <meshStandardMaterial
          color="#8c7042"
          roughness={0.4}
          metalness={0.7}
        />
      </mesh>

      {/* Horizontal & Vertical Reference Meridian Lines (Karkaṭa / Akṣa lines) */}
      {/* Horizontal Base Line */}
      <mesh position={[0, 0, PHALAKA_CONFIG.boardThickness / 2 + 0.006]}>
        <planeGeometry args={[PHALAKA_CONFIG.circleRadius * 2.1, 0.015]} />
        <meshBasicMaterial color="#e6ca65" />
      </mesh>
      {/* Vertical Zenith Line */}
      <mesh position={[0, 0, PHALAKA_CONFIG.boardThickness / 2 + 0.006]}>
        <planeGeometry args={[0.015, PHALAKA_CONFIG.circleRadius * 2.1]} />
        <meshBasicMaterial color="#e6ca65" />
      </mesh>

      {/* 3. Graduated Ticks on Dial (Combined lineSegments) */}
      <group position={[0, 0, PHALAKA_CONFIG.boardThickness / 2 + 0.007]}>
        <lineSegments geometry={tickGeometry}>
          <lineBasicMaterial color="#d4af37" linewidth={1.5} />
        </lineSegments>
      </group>

      {/* 4. Movable Sighting Index Arm (Paṭṭikā) */}
      <group
        ref={armRef}
        position={[0, 0, PHALAKA_CONFIG.boardThickness / 2 + 0.03]}
        rotation={[0, 0, armRotationZ]}
      >
        {/* Main arm bar with brass sheen */}
        <mesh castShadow position={[PHALAKA_CONFIG.indexArmLength / 2, 0, 0]}>
          <boxGeometry
            args={[
              PHALAKA_CONFIG.indexArmLength,
              PHALAKA_CONFIG.indexArmWidth,
              0.025,
            ]}
          />
          <meshStandardMaterial
            color="#d4af37" // Polished antique brass
            roughness={0.3}
            metalness={0.85}
          />
        </mesh>

        {/* Pointer tip at outer radius */}
        <mesh
          castShadow
          position={[PHALAKA_CONFIG.indexArmLength + 0.04, 0, 0]}
          rotation={[0, 0, -Math.PI / 2]}
        >
          <coneGeometry args={[0.045, 0.1, 4]} />
          <meshStandardMaterial
            color="#f59e0b"
            roughness={0.25}
            metalness={0.9}
          />
        </mesh>

        {/* Pointer center indicator groove */}
        <lineSegments position={[PHALAKA_CONFIG.indexArmLength / 2, 0, 0.015]}>
          <edgesGeometry
            args={[new THREE.BoxGeometry(PHALAKA_CONFIG.indexArmLength * 0.8, 0.005, 0.005)]}
          />
          <lineBasicMaterial color="#111827" />
        </lineSegments>

        {/* Sight Vane / Peg (Śalākā) on the movable arm */}
        <mesh castShadow position={[PHALAKA_CONFIG.indexArmLength * 0.85, 0, 0.04]}>
          <boxGeometry args={[0.02, 0.06, 0.07]} />
          <meshStandardMaterial color="#c5a059" roughness={0.3} metalness={0.8} />
        </mesh>
      </group>

      {/* 5. Central Pivot & Gnomon Pin (Śaṅku / Akṣa) */}
      <group position={[0, 0, PHALAKA_CONFIG.boardThickness / 2 + 0.03]}>
        {/* Pivot Collar Disk */}
        <mesh castShadow>
          <cylinderGeometry args={[0.12, 0.14, 0.04, 32]} />
          <meshStandardMaterial
            color="#8c7042"
            roughness={0.4}
            metalness={0.7}
          />
        </mesh>

        {/* Central Gnomon Pin (casts solar shadow on dial) */}
        <mesh
          castShadow
          position={[0, 0, PHALAKA_CONFIG.pinLength / 2]}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <cylinderGeometry args={[0.022, 0.022, PHALAKA_CONFIG.pinLength, 16]} />
          <meshStandardMaterial
            color="#e6ca65"
            roughness={0.25}
            metalness={0.9}
          />
        </mesh>

        {/* Pin Tip Finial */}
        <mesh position={[0, 0, PHALAKA_CONFIG.pinLength + 0.02]}>
          <sphereGeometry args={[0.035, 16, 16]} />
          <meshStandardMaterial
            color="#f59e0b"
            roughness={0.2}
            metalness={0.9}
          />
        </mesh>
      </group>

      {/* 6. Plumb Line & Bob (Avalambaka / Sūtra) */}
      <group position={[0, PHALAKA_CONFIG.boardHeight / 2 - 0.08, PHALAKA_CONFIG.boardThickness / 2 + 0.02]}>
        {/* Top Suspension Peg */}
        <mesh castShadow rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 0.08, 16]} />
          <meshStandardMaterial color="#d4af37" metalness={0.8} />
        </mesh>

        {/* Plumb Thread (Sūtra) hanging vertically */}
        <lineSegments geometry={plumbPoints}>
          <lineBasicMaterial color="#f3cf7a" linewidth={1.5} />
        </lineSegments>

        {/* Conical Plumb Bob at bottom */}
        <mesh
          castShadow
          position={[0, -PHALAKA_CONFIG.boardHeight * 0.8 - 0.08, 0.03]}
          rotation={[0, 0, Math.PI]}
        >
          <coneGeometry args={[0.045, 0.12, 16]} />
          <meshStandardMaterial
            color="#c5a059"
            roughness={0.3}
            metalness={0.85}
          />
        </mesh>
      </group>

      {/* 7. Wooden Mounting Stand / Table Support */}
      <group position={[0, -PHALAKA_CONFIG.boardHeight / 2 - 0.15, 0]}>
        {/* Base beam */}
        <mesh receiveShadow castShadow>
          <boxGeometry args={[PHALAKA_CONFIG.boardWidth * 0.85, 0.12, 0.45]} />
          <meshStandardMaterial color="#2d1a0e" roughness={0.8} />
        </mesh>
        {/* Left upright slot */}
        <mesh receiveShadow castShadow position={[-PHALAKA_CONFIG.boardWidth * 0.35, 0.15, 0]}>
          <boxGeometry args={[0.12, 0.2, 0.25]} />
          <meshStandardMaterial color="#2d1a0e" roughness={0.8} />
        </mesh>
        {/* Right upright slot */}
        <mesh receiveShadow castShadow position={[PHALAKA_CONFIG.boardWidth * 0.35, 0.15, 0]}>
          <boxGeometry args={[0.12, 0.2, 0.25]} />
          <meshStandardMaterial color="#2d1a0e" roughness={0.8} />
        </mesh>
      </group>
    </group>
  );
};
