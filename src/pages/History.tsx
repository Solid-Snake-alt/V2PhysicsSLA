import React from 'react';
import { HISTORICAL_VERSES, GLOSSARY_TERMS } from '../data/historical';
import { BookOpen, Scroll, Award, ShieldAlert, Sparkles } from 'lucide-react';
import { DisclaimerBanner } from '../components/common/DisclaimerBanner';

export const History: React.FC = () => {
  return (
    <div className="flex flex-col gap-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col gap-3 text-left">
        <div className="flex items-center gap-2">
          <span className="badge-gold">Historical Scholarship</span>
          <span className="text-xs text-amber-400 font-mono">12th-Century Sanskrit Treatise</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-white">
          The Phalaka Yantra in Ancient Indian Astronomy
        </h1>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          Comprehensive historical background, verbatim Sanskrit verses from Bhāskara II's <em>Siddhānta-śiromaṇi</em> (c. 1150 CE), and operational methodology of medieval Indian observational astronomy.
        </p>
      </div>

      <DisclaimerBanner />

      {/* 1. Who was Bhāskara II? */}
      <section className="museum-card flex flex-col gap-4">
        <div className="flex items-center gap-2 text-amber-400">
          <Award className="w-5 h-5" />
          <h2 className="text-lg font-serif font-bold text-white">
            Bhāskarācārya (Bhāskara II, c. 1114–1185 CE)
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Bhāskarācārya was one of the most celebrated mathematicians and astronomers of classical India. Born in Bijapur/Sahyadri region, he became the director of the renowned astronomical observatory at <strong>Ujjain</strong>, succeeding the intellectual lineage of Varāhamihira and Brahmagupta.
        </p>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          His crowning treatise, the <em>Siddhānta-śiromaṇi</em> ("Crown of Treatises"), completed around 1150 CE when he was 36 years old, is divided into four major parts:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <div className="bg-slate-900 p-3 rounded border border-slate-800">
            <span className="font-bold text-amber-300 block font-serif">1. Līlāvatī</span>
            <span className="text-slate-400 text-[11px]">Arithmetic, geometry, permutations, and practical problem solving.</span>
          </div>
          <div className="bg-slate-900 p-3 rounded border border-slate-800">
            <span className="font-bold text-amber-300 block font-serif">2. Bījagaṇita</span>
            <span className="text-slate-400 text-[11px]">Algebra, indeterminate quadratic equations (Cakravala method).</span>
          </div>
          <div className="bg-slate-900 p-3 rounded border border-slate-800">
            <span className="font-bold text-amber-300 block font-serif">3. Grahagaṇita</span>
            <span className="text-slate-400 text-[11px]">Mathematical astronomy, planetary motions, conjunctions, and eclipses.</span>
          </div>
          <div className="bg-slate-900 p-3 rounded border border-slate-800 border-amber-500/30">
            <span className="font-bold text-amber-400 block font-serif">4. Golādhyāya</span>
            <span className="text-slate-300 text-[11px]">Celestial sphere, armillary spheres, and the <em>Yantrādhyāya</em> (instruments).</span>
          </div>
        </div>
      </section>

      {/* 2. Original Sanskrit Verses */}
      <section className="flex flex-col gap-4">
        <div className="flex items-center gap-2 text-amber-400">
          <Scroll className="w-5 h-5" />
          <h2 className="text-lg font-serif font-bold text-white">
            Original Verses from the Yantrādhyāya
          </h2>
        </div>

        <div className="flex flex-col gap-4">
          {HISTORICAL_VERSES.map((v, i) => (
            <div key={i} className="museum-card-gold flex flex-col gap-3">
              <div className="flex justify-between items-center border-b border-amber-900/60 pb-2 text-xs">
                <span className="font-serif font-bold text-amber-300">{v.chapter}</span>
                <span className="font-mono text-amber-400 bg-slate-950 px-2 py-0.5 rounded border border-amber-500/30">
                  {v.verseNumber}
                </span>
              </div>

              {/* Sanskrit Text in Devanagari */}
              <div className="bg-slate-950/80 p-3.5 rounded border border-amber-900/40 text-center">
                <p className="font-serif text-base sm:text-lg text-amber-200 tracking-wide leading-loose">
                  {v.sanskrit}
                </p>
              </div>

              {/* Transliteration */}
              <div className="text-xs font-mono text-slate-400 italic px-1">
                {v.transliteration}
              </div>

              {/* English Translation */}
              <div className="text-xs sm:text-sm text-slate-200 bg-slate-900/60 p-3 rounded border border-slate-800">
                <strong className="text-amber-300 font-serif">Translation: </strong>
                {v.translation}
              </div>

              {/* Scholarly Notes */}
              <div className="text-xs text-slate-400 bg-[#161a24] p-2.5 rounded border border-slate-800 leading-relaxed">
                <strong className="text-slate-300">Scholarly Commentary: </strong>
                {v.scholarlyNotes}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Physical Construction & How Observations Were Made */}
      <section className="museum-card flex flex-col gap-4">
        <h2 className="text-lg font-serif font-bold text-white">
          Physical Construction & Operational Procedure
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs text-slate-300 leading-relaxed">
          <div className="flex flex-col gap-2 bg-slate-900/60 p-3.5 rounded border border-slate-800">
            <span className="font-serif font-bold text-amber-300 text-sm">
              1. Physical Construction
            </span>
            <p>
              • <strong>Plank (Phalaka):</strong> A fine, unwarped plank of wood or cast brass plate, proportioned in a 1:2 ratio (30 aṅgulas high by 60 aṅgulas wide). An aṅgula (finger width) is approx. 1.8–2.0 cm.
            </p>
            <p>
              • <strong>Inscribed Circle (Vṛtta):</strong> A circle inscribed at the center, graduated into 360 degrees (bhāgas) and 60 ghaṭikās (1 ghaṭikā = 6°).
            </p>
            <p>
              • <strong>Central Pin (Śaṅku):</strong> A slender cylindrical peg inserted firmly at the center perpendicular to the face.
            </p>
            <p>
              • <strong>Index Arm (Paṭṭikā):</strong> A sighting arm with pointer tip pivoted at the central pin.
            </p>
            <p>
              • <strong>Plumb Line (Avalambaka):</strong> Suspended from the top edge to verify true vertical orientation.
            </p>
          </div>

          <div className="flex flex-col gap-2 bg-slate-900/60 p-3.5 rounded border border-slate-800">
            <span className="font-serif font-bold text-sky-300 text-sm">
              2. Observation Method
            </span>
            <p>
              • <strong>Vertical Alignment:</strong> The observer ensures the board hangs strictly plumb using the thread and weight (avalambaka).
            </p>
            <p>
              • <strong>Azimuthal Orientation:</strong> The board is turned to face directly along the azimuth plane of the Sun.
            </p>
            <p>
              • <strong>Shadow Alignment:</strong> As sunlight strikes the instrument, the central śaṅku casts a shadow. The observer rotates the paṭṭikā until its axis coincides with the shadow or sights through vanes on the arm directly toward the solar disk.
            </p>
            <p>
              • <strong>Direct Reading:</strong> The pointer immediately indicates the solar altitude (<em>unnata</em>) and zenith distance (<em>nata</em>) on the graduated circumference.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Complete Sanskrit Terminology Glossary */}
      <section className="museum-card flex flex-col gap-4">
        <div className="flex items-center gap-2 text-amber-400">
          <BookOpen className="w-5 h-5" />
          <h2 className="text-lg font-serif font-bold text-white">
            Sanskrit Astronomical Glossary (यन्त्र परिभाषा कोष)
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-700 text-slate-400 font-mono">
                <th className="py-2.5 px-3">Sanskrit</th>
                <th className="py-2.5 px-3">Transliteration</th>
                <th className="py-2.5 px-3">Literal Meaning</th>
                <th className="py-2.5 px-3">Astronomical Function</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 font-sans">
              {GLOSSARY_TERMS.map((term) => (
                <tr key={term.transliteration} className="hover:bg-slate-900/40">
                  <td className="py-2.5 px-3 font-serif font-bold text-amber-300 text-sm">
                    {term.sanskrit}
                  </td>
                  <td className="py-2.5 px-3 font-mono text-slate-300">
                    {term.transliteration}
                  </td>
                  <td className="py-2.5 px-3 text-slate-300">
                    {term.meaning}
                  </td>
                  <td className="py-2.5 px-3 text-slate-400">
                    {term.historicalContext}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};
