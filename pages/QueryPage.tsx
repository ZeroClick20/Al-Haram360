import React, { useEffect, useState } from 'react';
import { QUERIES } from '../constants';
import { InteractiveTool } from '../components/InteractiveTool';
import { WarningBanner } from '../components/WarningBanner';
import { ArrowLeft, Zap, DollarSign, Layers, Activity } from 'lucide-react';

interface QueryPageProps {
  slug: string;
  onNavigate: (slug: string) => void;
}

// Small Stat Card Component
const StatCard = ({ icon: Icon, label, value, sub }: any) => (
    <div className="bg-[#0a0a0a] border border-defisim-border rounded-lg p-4 flex items-center gap-4">
        <div className="p-2 bg-[#111] rounded border border-defisim-border text-defisim-accent">
            <Icon className="w-5 h-5" />
        </div>
        <div>
            <div className="text-[10px] uppercase tracking-wider text-defisim-muted font-mono mb-0.5">{label}</div>
            <div className="text-lg font-bold text-white font-mono">{value} <span className="text-xs text-defisim-muted font-sans font-normal">{sub}</span></div>
        </div>
    </div>
);

export const QueryPage: React.FC<QueryPageProps> = ({ slug, onNavigate }) => {
  const config = QUERIES.find(q => q.slug === slug);
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    window.scrollTo(0,0);
    setLogs([
        `[INIT] System initialized for query ID: ${config?.id || 'UNKNOWN'}`,
        `[NET] Connected to ETH Mainnet (RPC: 145ms)`,
        `[DATA] Fetching pool reserves... OK`,
        `[WARN] Detected high congestion in block #166706714`,
    ]);
  }, [slug, config]);

  if (!config) return <div className="p-10 text-center text-defisim-muted">Query not found.</div>;

  return (
    <div className="max-w-[1600px] mx-auto p-6 lg:p-8">
      {/* Back Link */}
      <button 
        onClick={() => onNavigate('')} 
        className="flex items-center gap-2 text-sm text-defisim-muted hover:text-white mb-6 transition-colors group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Back to Dashboard
      </button>

      {/* Header Section */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
            <span className="px-2 py-1 bg-defisim-accentDim border border-defisim-accent/30 text-defisim-accent rounded text-[10px] font-mono uppercase tracking-wider">
                {config.pageType.replace('_', ' ')}
            </span>
            <span className="font-mono text-xs text-defisim-muted">ID: {config.slug}</span>
        </div>
        
        <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight tracking-tight font-sans">
            "{config.rawQuery}"
        </h1>

        <WarningBanner 
            type="info" 
            message={config.problemContext} 
            label="Problem Context"
        />
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard icon={Zap} label="Gas Price" value="21" sub="Gwei" />
          <StatCard icon={DollarSign} label="ETH Price" value="$2854.54" />
          <StatCard icon={Layers} label="Block Height" value="#166,706,714" />
          <StatCard icon={Activity} label="Congestion" value="MEDIUM" />
      </div>

      {/* Main Content Split: Simulator Left, Terminal Right */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        
        {/* Left: Interactive Tool */}
        <div className="lg:col-span-3">
             <InteractiveTool 
                actionType={config.primaryAction} 
                title="" 
             />
        </div>

        {/* Right: Console/Log Output */}
        <div className="lg:col-span-2">
            <div className="border border-defisim-border rounded-xl bg-black h-full min-h-[400px] flex flex-col font-mono text-sm">
                <div className="border-b border-defisim-border p-3 flex items-center gap-2 bg-[#0a0a0a]">
                    <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-green-500/80"></div>
                    </div>
                    <div className="ml-3 text-defisim-muted text-xs">simulation_output.log</div>
                </div>
                <div className="p-4 space-y-2 text-defisim-muted flex-1 overflow-y-auto font-mono text-xs">
                    {logs.map((log, i) => (
                        <div key={i} className="hover:text-white transition-colors cursor-default">
                            <span className="text-defisim-border mr-2">{i+1}</span>
                            {log}
                        </div>
                    ))}
                    <div className="animate-pulse text-defisim-accent">_</div>
                </div>
                <div className="p-2 border-t border-defisim-border text-[10px] text-right text-defisim-muted bg-[#0a0a0a]">
                    Powered by Replit
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};