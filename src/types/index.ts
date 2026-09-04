/**
 * Types and interfaces for the Phalaka Yantra simulation.
 */

// Geographic location of the observer
export interface GeoLocation {
  name: string;
  latitude: number; // in decimal degrees (-90 to +90)
  longitude: number; // in decimal degrees (-180 to +180)
  timezoneOffset?: number; // in hours from UTC
  description?: string;
}

// Astronomical solar position parameters
export interface SolarPosition {
  altitude: number; // degrees above horizon (-90 to +90)
  azimuth: number; // degrees clockwise from North (0 to 360)
  zenithDistance: number; // degrees from zenith (0 to 180, = 90 - altitude)
  declination: number; // degrees
  hourAngle: number; // degrees
  equationOfTime: number; // minutes
  isDaylight: boolean;
  sunriseTime: string; // HH:MM
  sunsetTime: string; // HH:MM
  solarNoonAltitude: number; // degrees
}

// Hourly solar altitude point for the Sun-path graph
export interface SolarPathPoint {
  hour: number; // 0 to 24 (fractional)
  label: string; // e.g., "06:00"
  altitude: number; // degrees
  isDaylight: boolean;
}

// Physical configuration of the Phalaka Yantra
export interface PhalakaConfig {
  boardWidth: number; // width of rectangular wooden board (traditionally 60 angulas)
  boardHeight: number; // height of rectangular board (traditionally 30 angulas, 1:2 ratio)
  boardThickness: number;
  circleRadius: number; // radius of inscribed graduated circle
  pivotOffset: { x: number; y: number; z: number };
  indexArmLength: number; // length of movable sighting pointer
  indexArmWidth: number;
  pinLength: number; // protrusion of central gnomon pin (śanku)
  scaleDivisions: number; // 360 degrees or 60 ghatikas
}

// Geometric right-triangle and projection values
export interface GeometryBreakdown {
  indexAngle: number; // current arm angle in degrees (measured from vertical or horizontal)
  angleInRadians: number;
  hypotenuse: number; // radius or pointer length
  opposite: number; // vertical projection: R * sin(angle)
  adjacent: number; // horizontal projection: R * cos(angle)
  jya: number; // Indian R-sine (traditionally R=120 or R=3438 liptas)
  kotijya: number; // Indian R-cosine
  triJyaRadius: number; // R value used for Indian trigonometric system
  tanAngle: number;
  secAngle: number;
}

// Visual guides and overlay toggles
export interface VisualGuidesConfig {
  showLabels: boolean;
  showAngles: boolean;
  showProjections: boolean;
  showSunRay: boolean;
  showShadow: boolean;
  showGrid: boolean;
}

// Navigation page identifiers
export type NavigationPage = 'home' | 'simulation' | 'geometry' | 'history' | 'about';
