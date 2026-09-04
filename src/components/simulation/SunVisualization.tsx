import React, { useMemo } from 'react';
import * as THREE from 'three';
import { SolarPosition } from '../../types';

interface SunVisualizationProps {
  solarPosition: SolarPosition;
  showSunRay?: boolean;
}

/**
 * 3D Sun Visualization Component
 *
 * Places the Sun in the celestial hemisphere according to calculated altitude and azimuth.
 * Altitude: angle above the horizon (0° to 90°).
 * Azimuth: angle clockwise from North.
 * Provides directional sunlight casting real shadows on the Phalaka Yantra.
 */
export const SunVisualization: React.FC<SunVisualizationProps> = ({
  solarPosition,
  showSunRay = true,
}) => {
  const { altitude, azimuth, isDaylight } = solarPosition;

  // Sky radius for placing the visual Sun representation
  const skyRadius = 8.5;

  // Convert spherical horizontal coordinates (altitude, azimuth) to 3D Cartesian (X, Y, Z)
  const sunPosition = useMemo(() => {
    const altRad = (Math.max(-15, altitude) * Math.PI) / 180;
    const azRad = (azimuth * Math.PI) / 180;

    const x = skyRadius * Math.cos(altRad) * Math.sin(azRad);
    const y = skyRadius * Math.sin(altRad);
    const z = skyRadius * Math.cos(altRad) * -Math.cos(azRad);

    return new THREE.Vector3(x, Math.max(-2, y), z);
  }, [altitude, azimuth]);

  // Points for the golden sighting ray from Sun to the central gnomon pin
  const rayGeometry = useMemo(() => {
    return new THREE.BufferGeometry().setFromPoints([
      sunPosition,
      new THREE.Vector3(0, 0, 0.38),
    ]);
  }, [sunPosition]);

  return (
    <group>
      {/* Directional Sunlight shining onto the instrument */}
      <directionalLight
        position={sunPosition}
        intensity={isDaylight ? 2.4 : 0.15}
        color={altitude < 10 ? '#f97316' : '#fff7ed'}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-near={0.5}
        shadow-camera-far={25}
        shadow-camera-left={-5}
        shadow-camera-right={5}
        shadow-camera-top={5}
        shadow-camera-bottom={-5}
        shadow-bias={-0.0005}
      />

      {/* Sun Sphere & Visual Corona */}
      {isDaylight && (
        <group position={sunPosition}>
          {/* Glowing Sun core */}
          <mesh>
            <sphereGeometry args={[0.42, 32, 32]} />
            <meshBasicMaterial color={altitude < 12 ? '#fb923c' : '#fde047'} />
          </mesh>

          {/* Soft outer glow halo */}
          <mesh>
            <sphereGeometry args={[0.65, 24, 24]} />
            <meshBasicMaterial
              color="#f59e0b"
              transparent
              opacity={0.35}
              blending={THREE.AdditiveBlending}
            />
          </mesh>

          {/* Secondary ambient flare */}
          <mesh>
            <sphereGeometry args={[0.95, 16, 16]} />
            <meshBasicMaterial
              color="#d97706"
              transparent
              opacity={0.15}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
        </group>
      )}

      {/* Sighting Ray Line connecting the Sun to the central pivot pin */}
      {isDaylight && showSunRay && (
        <lineSegments geometry={rayGeometry}>
          <lineBasicMaterial
            color="#fbbf24"
            linewidth={2}
            transparent
            opacity={0.65}
          />
        </lineSegments>
      )}

      {/* Ground Horizon Disc & Subtle Celestial Meridian Ring */}
      <group position={[0, -2.2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        {/* Ground plate */}
        <mesh receiveShadow>
          <ringGeometry args={[0, skyRadius * 1.1, 64]} />
          <meshStandardMaterial color="#0e131d" roughness={0.9} metalness={0.1} />
        </mesh>

        {/* Horizon circular boundary */}
        <lineSegments>
          <edgesGeometry args={[new THREE.RingGeometry(skyRadius * 0.98, skyRadius, 64)]} />
          <lineBasicMaterial color="#334155" />
        </lineSegments>

        {/* Cardinal Grid Crosshairs */}
        <lineSegments>
          <bufferGeometry
            attach="geometry"
            {...new THREE.BufferGeometry().setFromPoints([
              new THREE.Vector3(-skyRadius, 0, 0),
              new THREE.Vector3(skyRadius, 0, 0),
              new THREE.Vector3(0, -skyRadius, 0),
              new THREE.Vector3(0, skyRadius, 0),
            ])}
          />
          <lineBasicMaterial color="#1e293b" />
        </lineSegments>
      </group>
    </group>
  );
};
