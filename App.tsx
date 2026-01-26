import React, { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { QueryPage } from './pages/QueryPage';
import { HomePage } from './pages/HomePage';
import { Menu, X, Wallet, Terminal } from 'lucide-react';

export default function App() {
  const [currentSlug, setCurrentSlug] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#/', '');
      setCurrentSlug(hash);
      setMobileMenuOpen(false);
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); 

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = (slug: string) => {
    window.location.hash = `/${slug}`;
  };

  return (
    <div className="flex flex-col h-screen bg-defisim-bg text-defisim-text font-sans overflow-hidden">
        
      {/* Top Header Bar (From Screenshot) */}
      <header className="h-16 border-b border-defisim-border bg-defisim-bg/80 backdrop-blur flex items-center justify-between px-6 shrink-0 z-50">
        <div className="flex items-center gap-8">
            <div className="flex items-center gap-2 font-mono font-bold text-lg tracking-tight text-white">
                <div className="bg-defisim-accent text-black p-1 rounded-sm">
                    <Terminal size={16} strokeWidth={3} />
                </div>
                DeFiSim.OS
            </div>
            
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-defisim-muted">
                <button onClick={() => navigate('')} className="hover:text-white transition-colors">Dashboard</button>
                <button className="hover:text-white transition-colors">History</button>
            </nav>
        </div>

        <div className="flex items-center gap-4">
             {/* Network Pill */}
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#111] border border-defisim-border">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-xs font-medium text-defisim-muted">Ethereum Mainnet</span>
            </div>
            
            {/* Connect Wallet Button */}
            <button className="flex items-center gap-2 bg-defisim-accent hover:bg-defisim-accent/90 text-black font-bold text-xs px-4 py-2 rounded transition-colors uppercase tracking-wide">
                <Wallet size={14} />
                Connect Wallet
            </button>
            
            {/* Mobile Toggle */}
            <button 
                className="md:hidden text-defisim-muted"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
                {mobileMenuOpen ? <X /> : <Menu />}
            </button>
        </div>
      </header>

      {/* Main Layout Area */}
      <div className="flex flex-1 overflow-hidden">
          
        {/* Sidebar */}
        <div className={`
            fixed inset-y-0 left-0 z-40 w-64 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 mt-16 md:mt-0 bg-defisim-bg border-r border-defisim-border
            ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>
            <Navigation currentSlug={currentSlug} onNavigate={navigate} />
        </div>

        {/* Content */}
        <main className="flex-1 overflow-y-auto w-full relative bg-defisim-bg">
            {currentSlug === '' ? (
            <HomePage onNavigate={navigate} />
            ) : (
            <QueryPage slug={currentSlug} onNavigate={navigate} />
            )}
        </main>
      </div>

      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 md:hidden mt-16"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </div>
  );
}