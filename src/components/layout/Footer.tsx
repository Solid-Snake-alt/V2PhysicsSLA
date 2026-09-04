import React from 'react';
import { NavigationPage } from '../../types';
import { Compass, BookOpen } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: NavigationPage) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Brand & Attribution */}
        <div className="footer-brand">
          <div className="flex items-center gap-2 font-serif text-sm font-bold text-amber-200">
            <Compass className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Phalaka Yantra Interactive Simulation</span>
          </div>
          <p className="text-xs text-slate-400">
            Based on the <em>Yantrādhyāya</em> of the <em>Siddhānta-śiromaṇi</em> by Bhāskarācārya (c. 1150 CE).
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-links">
          <button onClick={() => onNavigate('home')}>
            Home
          </button>
          <button onClick={() => onNavigate('simulation')}>
            3D Simulation Lab
          </button>
          <button onClick={() => onNavigate('geometry')}>
            Geometric Analysis
          </button>
          <button onClick={() => onNavigate('history')}>
            Historical Manuscripts
          </button>
          <button onClick={() => onNavigate('about')}>
            Academic Methodology
          </button>
        </div>

        {/* Scholarly notice */}
        <div className="footer-notice">
          <BookOpen className="w-4 h-4 text-amber-400 shrink-0" />
          <span>Educational Scientific Reconstruction Project</span>
        </div>
      </div>
    </footer>
  );
};
