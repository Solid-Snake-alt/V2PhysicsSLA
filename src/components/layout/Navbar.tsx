import React, { useState } from 'react';
import { NavigationPage } from '../../types';
import { Compass, Sparkles, BookOpen, Triangle, Info, Menu, X } from 'lucide-react';

interface NavbarProps {
  currentPage: NavigationPage;
  onNavigate: (page: NavigationPage) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: NavigationPage; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'home', label: 'Home', icon: Sparkles },
    { id: 'simulation', label: '3D Simulation', icon: Compass },
    { id: 'geometry', label: 'Geometry & Math', icon: Triangle },
    { id: 'history', label: 'History & Verses', icon: BookOpen },
    { id: 'about', label: 'About & Sources', icon: Info },
  ];

  const handleNav = (page: NavigationPage) => {
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  return (
    <header className="navbar">
      <div className="navbar-container">
        {/* Brand Logo & Title */}
        <button onClick={() => handleNav('home')} className="navbar-brand">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-400 to-amber-700 flex items-center justify-center p-0.5 shadow-md">
            <div className="w-full h-full rounded-full bg-[#0b0f17] flex items-center justify-center border border-amber-400/40">
              <Compass className="w-5 h-5 text-amber-300" />
            </div>
          </div>
          <div>
            <div className="font-serif font-bold text-base tracking-wider text-amber-200">
              PHALAKA YANTRA
            </div>
            <div className="text-xs text-slate-400 font-medium tracking-wide uppercase">
              फलक यंत्र • Bhāskara II (1150 CE)
            </div>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="navbar-nav-desktop">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className={`navbar-nav-item ${isActive ? 'active' : ''}`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
          <button
            onClick={() => handleNav('simulation')}
            className="btn-gold"
            style={{ padding: '0.5rem 1rem', fontSize: '0.85rem', marginLeft: '0.5rem' }}
          >
            Launch Lab
          </button>
        </nav>

        {/* Mobile menu trigger button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="navbar-mobile-toggle"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="navbar-mobile-menu">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className={`navbar-nav-item ${isActive ? 'active' : ''}`}
                style={{ width: '100%', justifyContent: 'flex-start', padding: '0.75rem 1rem' }}
              >
                <Icon className="w-4 h-4 text-amber-400" />
                <span>{item.label}</span>
              </button>
            );
          })}
          <button
            onClick={() => handleNav('simulation')}
            className="btn-gold"
            style={{ width: '100%', justifyContent: 'center', marginTop: '0.5rem' }}
          >
            Launch Lab
          </button>
        </div>
      )}
    </header>
  );
};
