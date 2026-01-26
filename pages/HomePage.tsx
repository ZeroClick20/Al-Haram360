import React from 'react';
import { QUERIES } from '../constants';
import { PageType } from '../types';
import { Wrench, Zap, Activity, Globe } from 'lucide-react';

interface HomePageProps {
    onNavigate: (slug: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const cards = [
    { type: PageType.ERROR_RESOLUTION, icon: <Wrench className="w-6 h-6 text-red-400"/>, title: "Error Resolution", desc: "Fix reverts, failed swaps, and gas errors." },
    { type: PageType.REAL_TIME_DATA, icon: <Activity className="w-6 h-6 text-green-400"/>, title: "Live Data", desc: "Monitor slippage, gas, and mempool status." },
    { type: PageType.PROGRAMMATIC_TOOL, icon: <Zap className="w-6 h-6 text-yellow-400"/>, title: "Dev Tools", desc: "Generate scripts for Web3.py and Ethers.js." },
    { type: PageType.NETWORK_TOOL, icon: <Globe className="w-6 h-6 text-blue-400"/>, title: "Network Utilities", desc: "Bridge tokens and fix RPC connection issues." },
  ];

  return (
    <div className="p-6 md:p-12 max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
          Master the <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Dark Forest</span>
        </h1>
        <p className="text-xl text-slate-400 max-w-2xl mx-auto">
          The ultimate toolkit for resolving DEX errors, optimizing slippage, and debugging transaction failures on EVM & Solana.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {cards.map((card) => (
          <div key={card.title} className="bg-dex-card border border-slate-700 p-6 rounded-xl hover:border-dex-accent transition-colors">
            <div className="mb-4 bg-slate-800 w-12 h-12 rounded-lg flex items-center justify-center">
                {card.icon}
            </div>
            <h3 className="text-lg font-bold text-white mb-2">{card.title}</h3>
            <p className="text-sm text-slate-400">{card.desc}</p>
          </div>
        ))}
      </div>

      <div className="bg-dex-card border border-slate-700 rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-slate-700 bg-slate-800/50">
            <h2 className="text-xl font-bold text-white">Recent Diagnostic Queries</h2>
        </div>
        <div className="divide-y divide-slate-700">
            {QUERIES.slice(0, 6).map(q => (
                <div key={q.id} className="p-4 hover:bg-slate-800/50 flex items-center justify-between group cursor-pointer" onClick={() => onNavigate(q.slug)}>
                    <div>
                        <p className="text-white font-medium group-hover:text-dex-accent transition-colors">{q.rawQuery}</p>
                        <p className="text-xs text-slate-500 mt-1">{q.pageType.replace('_', ' ')} • ID: {q.id}</p>
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                         <div className="px-3 py-1 bg-dex-accent text-white text-xs rounded-full font-bold">Fix Now</div>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};