import React from 'react';
import { Lightbulb, AlertTriangle, AlertCircle, CheckCircle } from 'lucide-react';

interface WarningBannerProps {
  type: 'warning' | 'error' | 'success' | 'info';
  message: string;
  label?: string;
}

export const WarningBanner: React.FC<WarningBannerProps> = ({ type, message, label }) => {
  if (type === 'info') {
      return (
        <div className="relative pl-4 border-l-2 border-defisim-accent bg-defisim-accentDim/5 rounded-r-lg p-4 mb-8">
            <h4 className="text-xs font-mono font-bold text-defisim-accent mb-2 uppercase tracking-wider flex items-center gap-2">
                <Lightbulb className="w-3 h-3" />
                {label || "Problem Context"}
            </h4>
            <p className="text-sm text-defisim-muted leading-relaxed">
                {message}
            </p>
        </div>
      )
  }

  const styles = {
    warning: 'bg-yellow-900/20 border-yellow-600/50 text-yellow-500',
    error: 'bg-red-900/20 border-red-600/50 text-red-500',
    success: 'bg-green-900/20 border-green-600/50 text-green-500',
  };

  return (
    <div className={`flex items-center p-3 border rounded mb-6 text-sm ${styles[type] || styles.warning}`}>
      <span className="font-mono mr-2">[{type.toUpperCase()}]</span>
      <span>{message}</span>
    </div>
  );
};