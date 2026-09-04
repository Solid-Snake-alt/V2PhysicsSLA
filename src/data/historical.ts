import { GeoLocation, PhalakaConfig } from '../types';

/**
 * Historical Configuration and Scholarly Data for Phalaka Yantra
 *
 * Primary Historical Source:
 * Bhāskara II (Bhāskarācārya, c. 1114–1185 CE), Siddhānta-śiromaṇi,
 * Golādhyāya, Yantrādhyāya (Chapter on Astronomical Instruments), Verses 33–42.
 */

export const PHALAKA_CONFIG: PhalakaConfig = {
  // Traditional proportions: A flat rectangular board of wood or brass.
  // Bhaskara II specifies a rectangular board having a ratio of 1:2 (typically 30 angulas high by 60 angulas wide).
  // For 3D Three.js rendering units, we normalize to convenient scene scale.
  boardWidth: 6.0,        // corresponds to 60 units (angulas)
  boardHeight: 3.0,       // corresponds to 30 units (angulas)
  boardThickness: 0.15,   // sturdy wooden plank with brass edge banding
  circleRadius: 1.35,     // inscribed circular graduated ring
  pivotOffset: { x: 0, y: 0.1, z: 0.08 },
  indexArmLength: 1.45,   // movable sighting arm (paṭṭikā)
  indexArmWidth: 0.1,
  pinLength: 0.6,         // central shadow pin (śaṅku / akṣa)
  scaleDivisions: 360,    // 360 degrees, also marked with 60 ghaṭikās (1 ghaṭikā = 6 degrees = 24 minutes)
};

/**
 * Historical observing sites and modern comparison benchmarks.
 * Ujjain (Avanti) was considered the prime meridian (Greenwich equivalent) of ancient Indian astronomy.
 */
export const HISTORICAL_LOCATIONS: GeoLocation[] = [
  {
    name: 'Ujjain (Ancient Avanti), India',
    latitude: 23.1765,
    longitude: 75.7885,
    timezoneOffset: 5.5,
    description: 'The ancient zero meridian of Indian astronomers; home to the legendary observatory and the baseline for the Siddhāntic astronomical ephemerides.',
  },
  {
    name: 'Varanasi (Kashi), India',
    latitude: 25.3176,
    longitude: 82.9739,
    timezoneOffset: 5.5,
    description: 'Historic center of classical Indian scholarly mathematics and astronomical manuscript culture.',
  },
  {
    name: 'Patan (Pāṭaliputra / Gujarat area)',
    latitude: 23.8493,
    longitude: 72.1266,
    timezoneOffset: 5.5,
    description: 'Near Western Indian astronomical school active during the post-Bhāskara era.',
  },
  {
    name: 'Delhi (Jantar Mantar site)',
    latitude: 28.6271,
    longitude: 77.2166,
    timezoneOffset: 5.5,
    description: 'Location of Sawai Jai Singh II’s 18th-century masonry observatory instruments.',
  },
  {
    name: 'Alexandria, Egypt',
    latitude: 31.2001,
    longitude: 29.9187,
    timezoneOffset: 2.0,
    description: 'Historical Greek observatory of Claudius Ptolemy (Almagest context).',
  },
  {
    name: 'Greenwich, London, UK',
    latitude: 51.4769,
    longitude: -0.0005,
    timezoneOffset: 0.0,
    description: 'Modern International Prime Meridian (UTC baseline).',
  },
  {
    name: 'Tokyo, Japan',
    latitude: 35.6762,
    longitude: 139.6503,
    timezoneOffset: 9.0,
    description: 'Eastern hemisphere modern comparison location.',
  },
  {
    name: 'New York, USA',
    latitude: 40.7128,
    longitude: -74.0060,
    timezoneOffset: -5.0,
    description: 'Western hemisphere modern comparison location.',
  }
];

/**
 * Sanskrit Astronomical Terminology Glossary
 */
export interface GlossaryTerm {
  sanskrit: string;
  transliteration: string;
  meaning: string;
  historicalContext: string;
}

export const GLOSSARY_TERMS: GlossaryTerm[] = [
  {
    sanskrit: 'फलक',
    transliteration: 'Phalaka',
    meaning: 'Plank or flat board',
    historicalContext: 'A rectangular board crafted from seasoned timber or metal, traditionally 30 by 60 aṅgulas, suspended vertically or mounted on a stand.'
  },
  {
    sanskrit: 'यन्त्र',
    transliteration: 'Yantra',
    meaning: 'Machine, apparatus, or astronomical instrument',
    historicalContext: 'Astronomical measuring instruments classified systematically in the Yantrādhyāya of Indian treatises.'
  },
  {
    sanskrit: 'शङ्कु',
    transliteration: 'Śaṅku',
    meaning: 'Pin, peg, or gnomon',
    historicalContext: 'A central rod or pin projecting perpendicular to the board at the center of the graduated circle, casting a shadow to indicate solar altitude.'
  },
  {
    sanskrit: 'पट्टिका',
    transliteration: 'Paṭṭikā',
    meaning: 'Index arm, alidade, or sighting strip',
    historicalContext: 'A movable strip pivoted at the center pin, equipped with sights or used to read the graduated scale directly.'
  },
  {
    sanskrit: 'अवलम्बक / सूत्र',
    transliteration: 'Avalambaka / Sūtra',
    meaning: 'Plumb line and bob',
    historicalContext: 'A thread weighted with a lead or brass weight suspended to verify that the board is oriented plumb (strictly vertical) during measurement.'
  },
  {
    sanskrit: 'उन्नत',
    transliteration: 'Unnata',
    meaning: 'Altitude (elevation above the horizon)',
    historicalContext: 'The angle of the celestial body above the local horizon, measured along the vertical circle from 0° at horizon to 90° at zenith.'
  },
  {
    sanskrit: 'नत',
    transliteration: 'Nata',
    meaning: 'Zenith distance (co-altitude)',
    historicalContext: 'The angular distance of the Sun from the local zenith: Nata = 90° - Unnata.'
  },
  {
    sanskrit: 'घटिका / नाडी',
    transliteration: 'Ghaṭikā / Nāḍī',
    meaning: 'Unit of time equal to 24 minutes',
    historicalContext: '1 civil day (ahorātra) = 60 ghaṭikās. 1 ghaṭikā = 60 vighaṭikās (or palas) = 24 modern solar minutes. 1 ghaṭikā corresponds to 6° of celestial rotation.'
  },
  {
    sanskrit: 'ज्या',
    transliteration: 'Jyā (or Ardhajyā)',
    meaning: 'Chord-sine (R · sin θ)',
    historicalContext: 'The classical Indian trigonometric function representing the half-chord in a circle of defined radius R (commonly R = 120 or R = 3438 minutes of arc).'
  },
  {
    sanskrit: 'कोटिज्या',
    transliteration: 'Koṭijyā',
    meaning: 'Cosine (R · cos θ)',
    historicalContext: 'The sine of the complementary arc (zenith distance companion to altitude).'
  }
];

/**
 * Historical Sanskrit Verses from Siddhānta-śiromaṇi (Yantrādhyāya)
 */
export interface HistoricalVerse {
  chapter: string;
  verseNumber: string;
  sanskrit: string;
  transliteration: string;
  translation: string;
  scholarlyNotes: string;
}

export const HISTORICAL_VERSES: HistoricalVerse[] = [
  {
    chapter: 'Siddhānta-śiromaṇi, Yantrādhyāya',
    verseNumber: 'Verses 33–34',
    sanskrit: 'फलकं चतुरस्रं स्यात् त्रिंशदङ्गुलमुच्छ्रितम् । षष्ट्यङ्गुलं च विस्तीर्णं वृत्तं तत्रोल्लिखेद् बुधः ॥',
    transliteration: 'phalakaṁ caturasraṁ syāt triṁśadaṅgulamucchritam | ṣaṣṭyaṅgulaṁ ca vistīrṇaṁ vṛttaṁ tatrollikhed budhaḥ ||',
    translation: 'A rectangular board should be made, thirty aṅgulas in height and sixty aṅgulas in width. Upon it, a wise person should incise a circle.',
    scholarlyNotes: 'Bhāskara II gives explicit proportions: height = 30 aṅgulas, width = 60 aṅgulas (1:2 aspect ratio). An aṅgula is roughly the width of a finger (approx. 1.8 to 2.0 cm), yielding a board approximately 60 cm high by 120 cm wide.'
  },
  {
    chapter: 'Siddhānta-śiromaṇi, Yantrādhyāya',
    verseNumber: 'Verse 35',
    sanskrit: 'तन्मध्ये स्थापयेच्छङ्कुं पट्टिकां भ्रमयेत् ततः । छायां दृष्ट्वा विचिन्त्यैवं नतोन्नातांशकान् क्रमात् ॥',
    transliteration: 'tanmadhye sthāpayecchaṅkuṁ paṭṭikāṁ bhramayet tataḥ | chāyāṁ dṛṣṭvā vicintyaivaṁ natonnātāṁśakān kramāt ||',
    translation: 'In its center one should fix a gnomon pin (śaṅku). Then rotate the index arm (paṭṭikā). Having observed the shadow, one calculates the zenith distance (nata) and altitude (unnata) degrees in proper order.',
    scholarlyNotes: 'Describes the operational method: using either direct sighting with the index arm or aligning the shadow cast by the perpendicular central pin onto the scale.'
  }
];
