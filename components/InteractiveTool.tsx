import React, { useState } from 'react';
import { ActionType, SimulationResult } from '../types';
import { simulateOnChainAction } from '../services/onChainAPI';
import { Terminal, Play, Loader2 } from 'lucide-react';

interface ToolProps {
  actionType: ActionType;
  title: string;
}

export const InteractiveTool: React.FC<ToolProps> = ({ actionType, title }) => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SimulationResult | null>(null);
  const [inputVal, setInputVal] = useState('');
  const [slippage, setSlippage] = useState(0.5);

  const handleExecute = async () => {
    setLoading(true);
    setResult(null);
    const params = {
      tokenSymbol: inputVal,
      txHash: inputVal,
      slippage: slippage,
      isTaxToken: inputVal.toLowerCase().includes('pepe') || inputVal.toLowerCase().includes('safe')
    };
    try {
      const res = await simulateOnChainAction(actionType, params);
      setResult(res);
    } catch (e) {
      setResult({ success: false, message: 'Simulation failed due to network error.' });
    } finally {
      setLoading(false);
    }
  };

  const renderInputArea = () => {
    return (
        <div className="space-y-4">
            <div className="font-mono text-xs text-defisim-muted uppercase mb-1">
                {actionType === ActionType.GAS_ESTIMATE ? 'Token Address / Pair' : 
                 actionType === ActionType.TX_LOOKUP ? 'Transaction Hash' : 'Input Parameter'}
            </div>
            <div className="flex items-center gap-2">
                <input 
                    type="text" 
                    className="w-full bg-[#050505] border border-defisim-border rounded-md px-4 py-3 text-white focus:border-defisim-accent focus:ring-1 focus:ring-defisim-accent outline-none font-mono text-sm placeholder-defisim-muted/50 transition-all"
                    placeholder={actionType === ActionType.GAS_ESTIMATE ? "0x..." : "Enter value..."}
                    value={inputVal}
                    onChange={(e) => setInputVal(e.target.value)}
                />
                 {actionType === ActionType.GAS_ESTIMATE && (
                     <div className="bg-[#111] border border-defisim-border px-3 py-3 rounded-md text-white font-mono text-sm">ETH</div>
                 )}
            </div>
            
            {(actionType === ActionType.SLIPPAGE_ADJUST || actionType === ActionType.SWAP_FIX) && (
                 <div className="pt-2">
                    <div className="flex justify-between text-xs font-mono text-defisim-muted mb-2">
                        <span>SLIPPAGE TOLERANCE</span>
                        <span className="text-defisim-accent">{slippage}%</span>
                    </div>
                    <input 
                        type="range" 
                        min="0.1" 
                        max="20" 
                        step="0.1"
                        value={slippage}
                        onChange={(e) => setSlippage(parseFloat(e.target.value))}
                        className="w-full h-1 bg-defisim-border rounded-lg appearance-none cursor-pointer accent-defisim-accent"
                    />
                 </div>
            )}
        </div>
    );
  };

  return (
    <div className="border border-defisim-border rounded-xl p-0 overflow-hidden bg-defisim-card/50">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-defisim-border bg-[#0a0a0a]">
            <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-defisim-accent" />
                <h2 className="text-sm font-mono font-bold text-white tracking-wide">Transaction Simulator</h2>
            </div>
            <span className="text-[10px] font-mono text-defisim-muted uppercase tracking-widest">READY_STATE</span>
        </div>

        <div className="p-6">
            {renderInputArea()}

            <div className="mt-8 flex justify-center">
                 <button
                    onClick={handleExecute}
                    disabled={loading}
                    className={`rounded hover:bg-defisim-accent/90 transition-all w-12 h-12 flex items-center justify-center border border-defisim-border
                        ${loading ? 'bg-defisim-border' : 'bg-[#111] group hover:border-defisim-accent'}`}
                >
                    {loading ? (
                        <Loader2 className="w-5 h-5 text-defisim-accent animate-spin" />
                    ) : (
                        <Play className="w-5 h-5 text-defisim-muted group-hover:text-defisim-accent fill-current" />
                    )}
                </button>
            </div>
        </div>
        
        {/* Output Log - Part of the simulator tool */}
        {result && (
            <div className="border-t border-defisim-border p-4 bg-black font-mono text-xs">
                <div className={`mb-1 ${result.success ? 'text-defisim-accent' : 'text-red-500'}`}>
                    {/* التعديل هنا لضمان قبول العلامة كـ نص */}
                    {"> "} {result.message}
                </div>
                {result.data && (
                    <pre className="text-defisim-muted overflow-x-auto">
                        {JSON.stringify(result.data, null, 2)}
                    </pre>
                )}
            </div>
        )}
    </div>
  );
};
