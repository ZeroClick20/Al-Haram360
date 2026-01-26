import React from 'react';
import { NAVIGATION_LINKS, QUERIES } from '../constants';
import { PageType } from '../types';

interface NavProps {
  currentSlug: string;
  onNavigate: (slug: string) => void;
}

export const Navigation: React.FC<NavProps> = ({ currentSlug, onNavigate }) => {
  return (
    <nav className="w-full md:w-64 border-r border-defisim-border h-full flex flex-col overflow-y-auto bg-defisim-bg/50 backdrop-blur-sm">
      <div className="p-4 pt-6">
        <div className="text-xs font-mono text-defisim-muted mb-4 px-2 uppercase tracking-widest">Navigation</div>
        
        <div className="space-y-8">
          {NAVIGATION_LINKS.map(group => (
            <div key={group.label}>
              <h3 className="flex items-center gap-2 text-sm font-bold text-white mb-3 px-2">
                {group.label === 'Error Fixes' && <span className="text-orange-500">⚠️</span>}
                {group.label === 'Network Tools' && <span className="text-purple-500">🛡️</span>}
                {group.label === 'Dev Tools' && <span className="text-white">#</span>}
                {group.label === 'Live Data' && <span className="text-blue-500">⚡</span>}
                {group.label.replace('Error Fixes', 'Error Resolution')}
              </h3>
              <ul className="space-y-1">
                {QUERIES.filter(q => q.pageType === group.type).map(query => (
                  <li key={query.id}>
                    <button
                      onClick={() => onNavigate(query.slug)}
                      className={`w-full text-left px-3 py-2 text-[13px] transition-all duration-200 border-l-2
                          ${currentSlug === query.slug 
                              ? 'bg-defisim-accentDim text-defisim-accent border-defisim-accent font-medium' 
                              : 'border-transparent text-defisim-muted hover:text-white hover:bg-white/5'
                          }`}
                    >
                      {/* Truncate for cleaner look similar to screenshot */}
                      {query.slug.split('-').slice(0, 4).join(' ')}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
};