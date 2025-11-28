import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { X, Info } from 'lucide-react';
import { StockData, ComparisonData } from '../types';
import { US_GDP } from '../constants';

interface InfoPanelProps {
  data: StockData | null;
  onClose: () => void;
  lastUpdated?: string | null;
}

const InfoPanel: React.FC<InfoPanelProps> = ({ data, onClose, lastUpdated }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Reset selected index when the country changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [data?.id]);

  if (!data) return null;

  // Prepare Chart Data
  const chartData: ComparisonData[] = [
    { name: data.country, gdp: data.gdp, fill: '#3b82f6' },
  ];

  if (data.id !== 'usa') {
    chartData.push({ name: 'USA', gdp: US_GDP, fill: '#475569' });
  }

  // Determine which index data to show
  const hasMultipleIndices = data.indices && data.indices.length > 0;
  
  const activeIndex = hasMultipleIndices && data.indices
    ? data.indices[selectedIndex]
    : {
        name: data.indexName,
        value: data.marketValue,
        notes: data.notes
      };

  return (
    <div className="absolute top-4 right-4 z-20 w-full max-w-md bg-slate-900/90 backdrop-blur-md border border-slate-700 text-white rounded-xl shadow-2xl overflow-hidden animate-in slide-in-from-right duration-300">
      
      {/* Header */}
      <div className="bg-slate-800/80 p-4 flex justify-between items-center border-b border-slate-700">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <span className="text-2xl">{data.flag}</span>
          {data.country}
        </h2>
        <button onClick={onClose} className="p-1 hover:bg-slate-700 rounded-full transition-colors">
          <X className="w-5 h-5 text-slate-400" />
        </button>
      </div>

      <div className="p-5 overflow-y-auto max-h-[80vh] custom-scrollbar space-y-6">
        
        {/* Market Section */}
        <section className="space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm uppercase tracking-wider">
                <Info className="w-4 h-4" /> Stock Market
            </div>
            
            {/* Multiple Index Tabs */}
            {hasMultipleIndices && data.indices && (
                <div className="flex gap-2 mb-3 overflow-x-auto pb-2 custom-scrollbar">
                    {data.indices.map((idx, i) => (
                        <button
                            key={idx.name}
                            onClick={() => setSelectedIndex(i)}
                            className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all border ${
                                selectedIndex === i 
                                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50' 
                                : 'bg-slate-800 text-slate-400 border-slate-700 hover:bg-slate-700'
                            }`}
                        >
                            {idx.name}
                        </button>
                    ))}
                </div>
            )}

            <div className="bg-slate-800 p-3 rounded-lg border border-slate-700 transition-all duration-300">
                <h3 className="text-lg font-bold text-white">{activeIndex.name}</h3>
                <p className="text-slate-400 text-sm mt-1 mb-2 italic min-h-[3rem]">"{activeIndex.notes}"</p>
                <div className="flex justify-between items-end border-t border-slate-700 pt-2 mt-2">
                    <div>
                        <span className="text-slate-400 text-sm">Index Value</span>
                        {lastUpdated && (
                            <div className="text-xs text-slate-500">
                                as of {new Date(lastUpdated).toLocaleDateString('en-US', {
                                    month: 'short',
                                    day: 'numeric',
                                    year: 'numeric',
                                    hour: 'numeric',
                                    minute: '2-digit'
                                })}
                            </div>
                        )}
                    </div>
                    <span className="text-xl font-mono text-emerald-400 font-bold">{activeIndex.value}</span>
                </div>
            </div>
        </section>

        {/* Currency Section */}
        <section className="space-y-2">
             <div className="flex items-center gap-2 text-blue-400 font-semibold text-sm uppercase tracking-wider">
                <span className="text-lg">💱</span> Currency
            </div>
            <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-800 p-3 rounded-lg border border-slate-700">
                    <div className="text-xs text-slate-400">Currency</div>
                    <div className="font-semibold">{data.currency} ({data.currencySymbol})</div>
                </div>
                <div className="bg-slate-800 p-3 rounded-lg border border-slate-700">
                    <div className="text-xs text-slate-400">Exchange Rate</div>
                    <div className="font-semibold text-sm">{data.exchangeRate}</div>
                </div>
            </div>
        </section>

        {/* Economics Section */}
        <section className="space-y-2">
             <div className="flex items-center gap-2 text-purple-400 font-semibold text-sm uppercase tracking-wider">
                <span className="text-lg">🌍</span> Economy (GDP)
            </div>
            <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
                <div className="text-sm text-slate-400 mb-2">GDP Comparison (Trillions USD)</div>
                <div className="h-32 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={chartData} layout="vertical">
                            <XAxis type="number" hide />
                            <YAxis dataKey="name" type="category" width={80} tick={{fill: '#94a3b8', fontSize: 12}} />
                            <Tooltip 
                                contentStyle={{backgroundColor: '#1e293b', borderColor: '#334155', color: '#fff'}}
                                itemStyle={{color: '#fff'}}
                                cursor={{fill: 'transparent'}}
                            />
                            <Bar dataKey="gdp" radius={[0, 4, 4, 0]} barSize={20}>
                                {chartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.fill} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                <div className="mt-2 text-xs text-slate-500 text-center">
                    Higher bar = Bigger economy
                </div>
            </div>
        </section>

        {/* Fun Fact */}
        <div className="bg-amber-900/30 border border-amber-700/50 p-4 rounded-lg">
            <h4 className="flex items-center gap-2 text-amber-400 font-bold text-sm mb-1">
                <span>💡</span> Fun Fact
            </h4>
            <p className="text-amber-100 text-sm leading-relaxed">
                {data.funFact}
            </p>
        </div>
      </div>
    </div>
  );
};

export default InfoPanel;