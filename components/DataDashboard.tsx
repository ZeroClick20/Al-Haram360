import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { ChartDataPoint } from '../types';

interface DataDashboardProps {
  title: string;
  data: ChartDataPoint[];
  metricLabel: string;
  metricValue: string;
}

export const DataDashboard: React.FC<DataDashboardProps> = ({ title, data, metricLabel, metricValue }) => {
  return (
    <div className="bg-dex-card border border-slate-700 rounded-xl p-6 shadow-lg mb-8">
      <div className="flex justify-between items-end mb-6">
        <div>
          <h3 className="text-lg font-semibold text-slate-100">{title}</h3>
          <p className="text-sm text-slate-400">Live Network Simulation</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-slate-400">{metricLabel}</p>
          <p className="text-2xl font-bold text-dex-accent">{metricValue}</p>
        </div>
      </div>
      
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
            <XAxis 
              dataKey="name" 
              stroke="#94a3b8" 
              tick={{fill: '#94a3b8', fontSize: 12}}
              axisLine={{stroke: '#475569'}}
            />
            <YAxis 
              stroke="#94a3b8" 
              tick={{fill: '#94a3b8', fontSize: 12}}
              axisLine={{stroke: '#475569'}}
            />
            <Tooltip 
              contentStyle={{backgroundColor: '#1e293b', borderColor: '#475569', color: '#f1f5f9'}}
              cursor={{fill: 'rgba(59, 130, 246, 0.1)'}}
            />
            <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};