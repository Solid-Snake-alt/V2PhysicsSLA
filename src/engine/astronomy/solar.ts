/**
 * Astronomy Calculation Engine — Solar Position Algorithm
 *
 * Implements standard solar position approximations based on:
 * - Jean Meeus, Astronomical Algorithms (2nd Ed.)
 * - NOAA Solar Calculator Formulation
 *
 * Coordinate systems used:
 * - Geocentric Equatorial Coordinates: Declination (δ), Right Ascension (α)
 * - Topocentric Horizontal Coordinates: Altitude (h / unnata), Azimuth (A), Zenith Distance (z / nata)
 *
 * Assumptions:
 * - Standard mean atmospheric refraction near horizon approximated where h > -1°
 * - Earth treated as an oblate spheroid / standard geoid for geographic lat/long
 * - True Solar Time vs Mean Solar Time accounts for Equation of Time
 */

import { SolarPosition, SolarPathPoint } from '../../types';

const RAD2DEG = 180 / Math.PI;
const DEG2RAD = Math.PI / 180;

/**
 * Calculates Julian Day number from a JavaScript Date object (UTC time).
 */
export function getJulianDay(date: Date): number {
  const time = date.getTime();
  return time / 86400000 + 2440587.5;
}

/**
 * Calculates centuries since J2000.0 (January 1, 2000, 12:00 TT).
 */
export function getJulianCenturies(jd: number): number {
  return (jd - 2451545.0) / 36525.0;
}

/**
 * Normalizes an angle in degrees to the [0, 360) range.
 */
function normalizeDegrees(deg: number): number {
  let res = deg % 360;
  if (res < 0) res += 360;
  return res;
}

/**
 * Calculates the solar position for a given date, time, latitude, and longitude.
 *
 * @param date Observation date (year, month, day)
 * @param timeStr Time of observation in "HH:MM" or "HH:MM:SS" local time
 * @param latitude Observer latitude in decimal degrees (-90 to +90)
 * @param longitude Observer longitude in decimal degrees (-180 to +180)
 * @param tzOffset Timezone offset in hours from UTC (e.g. +5.5 for IST)
 */
export function calculateSolarPosition(
  date: Date,
  timeStr: string,
  latitude: number,
  longitude: number,
  tzOffset: number = 0
): SolarPosition {
  // Parse time components
  const [hStr, mStr, sStr] = timeStr.split(':');
  const hours = parseInt(hStr || '12', 10);
  const minutes = parseInt(mStr || '0', 10);
  const seconds = parseInt(sStr || '0', 10);

  // Construct UTC date
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();

  // Decimal hours in local time
  const localDecimalHours = hours + minutes / 60 + seconds / 3600;
  // Decimal hours in UTC
  const utcDecimalHours = localDecimalHours - tzOffset;

  // Exact UTC timestamp
  const utcDate = new Date(Date.UTC(year, month, day, 0, 0, 0) + utcDecimalHours * 3600000);
  const jd = getJulianDay(utcDate);
  const T = getJulianCenturies(jd);

  // Geometric Mean Longitude of the Sun (degrees)
  const L0 = normalizeDegrees(280.46646 + T * (36000.76983 + T * 0.0003032));

  // Geometric Mean Anomaly of the Sun (degrees)
  const M = 357.52911 + T * (35999.05029 - 0.0001537 * T);
  const Mrad = M * DEG2RAD;

  // Earth's orbit eccentricity
  const e = 0.016708634 - T * (0.000042037 + 0.0000001267 * T);

  // Sun Equation of Center (degrees)
  const C =
    Math.sin(Mrad) * (1.914602 - T * (0.004817 + 0.000014 * T)) +
    Math.sin(2 * Mrad) * (0.019993 - 0.000101 * T) +
    Math.sin(3 * Mrad) * 0.000289;

  // Sun True Longitude (degrees)
  const sunTrueLong = L0 + C;

  // Sun Apparent Longitude (degrees) - corrected for nutation and aberration
  const omega = 125.04 - 1934.136 * T;
  const lambda = sunTrueLong - 0.00569 - 0.00478 * Math.sin(omega * DEG2RAD);
  const lambdaRad = lambda * DEG2RAD;

  // Mean Obliquity of the Ecliptic (degrees)
  const eps0 = 23 + (26 + (21.448 - T * (46.815 + T * (0.00059 - T * 0.001813))) / 60) / 60;
  // Corrected Obliquity
  const eps = (eps0 + 0.00256 * Math.cos(omega * DEG2RAD)) * DEG2RAD;

  // Solar Declination (degrees)
  const sinDec = Math.sin(eps) * Math.sin(lambdaRad);
  const declination = Math.asin(sinDec) * RAD2DEG;
  const decRad = declination * DEG2RAD;

  // Equation of Time (minutes)
  const y = Math.tan(eps / 2) * Math.tan(eps / 2);
  const L0rad = L0 * DEG2RAD;
  const eqTime =
    4 *
    RAD2DEG *
    (y * Math.sin(2 * L0rad) -
      2 * e * Math.sin(Mrad) +
      4 * e * y * Math.sin(Mrad) * Math.cos(2 * L0rad) -
      0.5 * y * y * Math.sin(4 * L0rad) -
      1.25 * e * e * Math.sin(2 * Mrad));

  // Time offset in minutes: Longitude correction + Equation of Time
  const timeOffset = eqTime + 4 * longitude - 60 * tzOffset;

  // True Solar Time (minutes since midnight)
  const tst = hours * 60 + minutes + seconds / 60 + timeOffset;
  let trueSolarMinutes = tst % 1440;
  if (trueSolarMinutes < 0) trueSolarMinutes += 1440;

  // Solar Hour Angle (degrees, 0° at solar noon, negative before noon, positive after noon)
  let hourAngle = trueSolarMinutes / 4 - 180;
  if (hourAngle < -180) hourAngle += 360;
  const haRad = hourAngle * DEG2RAD;

  // Topocentric Horizon Coordinates
  const latRad = latitude * DEG2RAD;

  // Solar Altitude (Elevation)
  // sin(h) = sin(lat) * sin(dec) + cos(lat) * cos(dec) * cos(ha)
  const sinAltitude = Math.sin(latRad) * Math.sin(decRad) + Math.cos(latRad) * Math.cos(decRad) * Math.cos(haRad);
  // Clamp between -1 and 1 to prevent floating-point NaN
  const clampedSinAlt = Math.max(-1, Math.min(1, sinAltitude));
  let altitude = Math.asin(clampedSinAlt) * RAD2DEG;

  // Solar Azimuth (measured clockwise from North = 0°)
  // cos(Az) = (sin(dec) - sin(lat) * sin(alt)) / (cos(lat) * cos(alt))
  const cosAlt = Math.cos(altitude * DEG2RAD);
  let azimuth = 180;
  if (Math.abs(cosAlt) > 0.0001) {
    const cosAz = (Math.sin(decRad) - Math.sin(latRad) * sinAltitude) / (Math.cos(latRad) * cosAlt);
    const clampedCosAz = Math.max(-1, Math.min(1, cosAz));
    const azRad = Math.acos(clampedCosAz);
    azimuth = hourAngle > 0 ? 360 - azRad * RAD2DEG : azRad * RAD2DEG;
    azimuth = normalizeDegrees(azimuth);
  }

  // Zenith Distance (nata in Sanskrit): z = 90° - altitude
  const zenithDistance = Math.max(0, 90 - altitude);

  // Solar noon altitude: 90° - |latitude - declination|
  const solarNoonAltitude = Math.max(0, 90 - Math.abs(latitude - declination));

  // Sunrise and Sunset calculation (standard geometric depression of 90°50' = 90.833° for atmospheric refraction and solar disc)
  const zenithRad = 90.833 * DEG2RAD;
  const cosHaSunrise = (Math.cos(zenithRad) - Math.sin(latRad) * Math.sin(decRad)) / (Math.cos(latRad) * Math.cos(decRad));

  let sunriseTime = '--:--';
  let sunsetTime = '--:--';
  let isDaylight = altitude > 0;

  if (cosHaSunrise >= 1) {
    // Polar night (sun never rises)
    sunriseTime = 'Polar Night';
    sunsetTime = 'Polar Night';
    isDaylight = false;
  } else if (cosHaSunrise <= -1) {
    // Midnight sun (sun never sets)
    sunriseTime = 'Midnight Sun';
    sunsetTime = 'Midnight Sun';
    isDaylight = true;
  } else {
    const haSunriseDeg = Math.acos(cosHaSunrise) * RAD2DEG;
    // Solar noon in local minutes
    const solarNoonMinutes = 720 - timeOffset;
    const sunriseMinutes = solarNoonMinutes - haSunriseDeg * 4;
    const sunsetMinutes = solarNoonMinutes + haSunriseDeg * 4;

    sunriseTime = formatMinutesToHHMM(sunriseMinutes);
    sunsetTime = formatMinutesToHHMM(sunsetMinutes);
  }

  return {
    altitude: parseFloat(altitude.toFixed(2)),
    azimuth: parseFloat(azimuth.toFixed(2)),
    zenithDistance: parseFloat(zenithDistance.toFixed(2)),
    declination: parseFloat(declination.toFixed(2)),
    hourAngle: parseFloat(hourAngle.toFixed(2)),
    equationOfTime: parseFloat(eqTime.toFixed(2)),
    isDaylight,
    sunriseTime,
    sunsetTime,
    solarNoonAltitude: parseFloat(solarNoonAltitude.toFixed(2)),
  };
}

/**
 * Helper to format minutes past midnight to "HH:MM"
 */
function formatMinutesToHHMM(totalMinutes: number): string {
  let m = totalMinutes % 1440;
  if (m < 0) m += 1440;
  const hrs = Math.floor(m / 60);
  const mins = Math.floor(m % 60);
  return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
}

/**
 * Generates an array of solar altitudes across 24 hours of the given day
 * to plot the daily solar path curve.
 */
export function getDailySolarPath(
  date: Date,
  latitude: number,
  longitude: number,
  tzOffset: number = 0
): SolarPathPoint[] {
  const points: SolarPathPoint[] = [];

  // Sample every 30 minutes (49 points from 00:00 to 24:00)
  for (let i = 0; i <= 48; i++) {
    const totalMinutes = i * 30;
    const hours = Math.floor(totalMinutes / 60);
    const mins = totalMinutes % 60;
    const timeStr = `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;

    const pos = calculateSolarPosition(date, timeStr, latitude, longitude, tzOffset);

    points.push({
      hour: totalMinutes / 60,
      label: timeStr,
      altitude: pos.altitude,
      isDaylight: pos.altitude > 0,
    });
  }

  return points;
}
