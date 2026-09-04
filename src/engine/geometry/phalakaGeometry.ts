/**
 * Geometry Calculation Engine for Phalaka Yantra
 *
 * Implements both:
 * 1. Modern Analytical Trigonometry:
 *    - Right triangle relationships:
 *      opposite = hypotenuse · sin(θ)
 *      adjacent = hypotenuse · cos(θ)
 *      hypotenuse² = opposite² + adjacent²
 *
 * 2. Historical Indian Trigonometric Tri-jya System (त्रिभज्या):
 *    - In classical Siddhāntic astronomy (Āryabhaṭa, Brahmagupta, Bhāskara II),
 *      trigonometric functions were lengths of chords/half-chords in a circle of defined radius R (Tri-jya).
 *    - Standard Siddhāntic R = 120 units (or 3438' minutes of arc).
 *    - Jyā (ज्या) = R · sin(θ)
 *    - Koṭijyā (कोटिज्या) = R · cos(θ)
 *    - Śara (शर / versine) = R - Koṭijyā
 *
 * NOTE: Modern notation and software coordinates are computational aids
 * to explain and reconstruct the geometric principles used by Bhāskara II.
 */

import { GeometryBreakdown } from '../../types';
import { PHALAKA_CONFIG } from '../../data/historical';

export const TRI_JYA_RADIUS = 120; // Classical Siddhāntic sine-radius

/**
 * Calculates geometric projections and right-triangle values for an index arm angle.
 *
 * @param indexAngleDeg Angle of the pointer arm in degrees (0° to 90°)
 * @param radius Physical arm length or circle radius
 */
export function calculateGeometryBreakdown(
  indexAngleDeg: number,
  radius: number = PHALAKA_CONFIG.indexArmLength
): GeometryBreakdown {
  // Clamp angle to physical quadrant 0° to 90°
  const clampedDeg = Math.max(0, Math.min(90, indexAngleDeg));
  const rad = (clampedDeg * Math.PI) / 180;

  // Modern right-triangle trigonometry
  const opposite = radius * Math.sin(rad); // vertical leg (height)
  const adjacent = radius * Math.cos(rad); // horizontal leg (base)

  // Classical Indian Tri-jya values (scaled to R = 120)
  const jya = TRI_JYA_RADIUS * Math.sin(rad);
  const kotijya = TRI_JYA_RADIUS * Math.cos(rad);

  const tanAngle = Math.abs(adjacent) > 0.0001 ? Math.tan(rad) : Infinity;
  const secAngle = Math.abs(adjacent) > 0.0001 ? 1 / Math.cos(rad) : Infinity;

  return {
    indexAngle: parseFloat(clampedDeg.toFixed(2)),
    angleInRadians: parseFloat(rad.toFixed(4)),
    hypotenuse: parseFloat(radius.toFixed(3)),
    opposite: parseFloat(opposite.toFixed(3)),
    adjacent: parseFloat(adjacent.toFixed(3)),
    jya: parseFloat(jya.toFixed(2)),
    kotijya: parseFloat(kotijya.toFixed(2)),
    triJyaRadius: TRI_JYA_RADIUS,
    tanAngle: parseFloat(tanAngle.toFixed(3)),
    secAngle: parseFloat(secAngle.toFixed(3)),
  };
}

/**
 * Calculates the shadow vector cast by the central pin (śaṅku) on the vertical board
 * when illuminated by the Sun at given altitude and relative azimuth.
 *
 * @param solarAltitude Solar altitude above horizon in degrees
 * @param pinLength Length of central protruding pin
 */
export function calculatePinShadow(
  solarAltitude: number,
  pinLength: number = PHALAKA_CONFIG.pinLength
): { length: number; angleDeg: number; isVisible: boolean } {
  if (solarAltitude <= 0) {
    return { length: 0, angleDeg: 0, isVisible: false };
  }

  const altRad = (solarAltitude * Math.PI) / 180;
  // On a vertical board aligned along the solar azimuth,
  // the ray arrives at angle solarAltitude above horizontal.
  // The pin is normal to the board (along Z axis).
  // Shadow length on board = pinLength * tan(90° - altitude) = pinLength / tan(altitude)
  const zenithRad = (90 - solarAltitude) * (Math.PI / 180);
  const shadowLength = pinLength * Math.tan(zenithRad);

  return {
    length: parseFloat(shadowLength.toFixed(3)),
    angleDeg: parseFloat((90 - solarAltitude).toFixed(2)), // shadow points downward along zenith angle
    isVisible: true,
  };
}

/**
 * Converts an angular degree measurement into classical Indian time units:
 * 1 civil day = 60 ghaṭikās
 * 360° = 60 ghaṭikās => 1 ghaṭikā = 6° (24 minutes)
 * 1 vighaṭikā (pala) = 6' arc (24 seconds)
 */
export function degreesToGhatikas(degrees: number): {
  ghatikas: number;
  vighatikas: number;
  formatted: string;
} {
  const totalGhatikas = degrees / 6;
  const g = Math.floor(totalGhatikas);
  const v = Math.round((totalGhatikas - g) * 60);

  return {
    ghatikas: g,
    vighatikas: v,
    formatted: `${g} ghaṭikās ${v} vighaṭikās`,
  };
}
