import React, { useState, useEffect } from 'react';
import { NavigationPage } from './types';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Home } from './pages/Home';
import { Simulation } from './pages/Simulation';
import { Geometry } from './pages/Geometry';
import { History } from './pages/History';
import { About } from './pages/About';

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<NavigationPage>('home');

  // Listen to hash changes if any
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as NavigationPage;
      if (['home', 'simulation', 'geometry', 'history', 'about'].includes(hash)) {
        setCurrentPage(hash);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (page: NavigationPage) => {
    setCurrentPage(page);
    window.location.hash = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="app-container">
      {/* Navigation Header */}
      <Navbar currentPage={currentPage} onNavigate={handleNavigate} />

      {/* Main Page View */}
      <main className="main-content">
        {currentPage === 'home' && <Home onNavigate={handleNavigate} />}
        {currentPage === 'simulation' && <Simulation />}
        {currentPage === 'geometry' && <Geometry />}
        {currentPage === 'history' && <History />}
        {currentPage === 'about' && <About />}
      </main>

      {/* Academic Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
};

export default App;
