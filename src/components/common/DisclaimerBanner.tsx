import React from 'react';
import { ShieldCheck, Info } from 'lucide-react';

interface DisclaimerBannerProps {
  compact?: boolean;
}

export const DisclaimerBanner: React.FC<DisclaimerBannerProps> = ({ compact = false }) => {
  if (compact) {
    return (
      <div className="bg-amber-950/20 border border-amber-800/40 rounded px-3 py-1.5 text-[11px] text-amber-200/90 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span>
            <strong>Historical Reconstruction:</strong> Dimensions & physical components follow Bhāskara II’s <em>Siddhānta-śiromaṇi</em> (12th c.). Solar positions utilize modern topocentric algorithms.
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="historical-callout">
      <div className="flex items-start gap-2.5">
        <Info className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
        <div className="text-xs text-slate-300 leading-relaxed">
          <span className="font-serif font-bold text-amber-300 block mb-0.5 text-sm">
            Academic Demarcation: Historical Source vs. Modern Computational Model
          </span>
          This educational application reconstructs the physical architecture of the <strong>Phalaka Yantra</strong> described by <strong>Bhāskara II (1150 CE)</strong> in the <em>Yantrādhyāya</em>. The dimensions (1:2 rectangular plank, graduated circle, central śaṅku pin, and paṭṭikā arm) are directly derived from the historical Sanskrit text. In contrast, coordinates, solar ephemerides, and decimal degrees are rendered using modern computational astronomy (NOAA / Meeus algorithm) to aid contemporary students in understanding ancient observational geometry.
        </div>
      </div>
    </div>
  );
};
