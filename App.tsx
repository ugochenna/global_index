import React, { useState, useCallback } from 'react';
import GlobeViewer from './components/GlobeViewer';
import InfoPanel from './components/InfoPanel';
import ControlBar from './components/ControlBar';
import { GLOSSARY } from './constants';
import { useStockData } from './hooks/useStockData';
import { StockData, Region } from './types';
import { HelpCircle, RefreshCw } from 'lucide-react';

const App: React.FC = () => {
  const { stockData, lastUpdated, isLoading, refresh } = useStockData();
  const [selectedCountry, setSelectedCountry] = useState<StockData | null>(null);
  const [activeRegion, setActiveRegion] = useState<Region | null>(null);
  const [isTouring, setIsTouring] = useState(false);
  const [showGlossary, setShowGlossary] = useState(false);

  const handleCountryClick = useCallback((data: StockData) => {
    // If we click manually during a tour, stop the tour
    if (isTouring) {
        setIsTouring(false);
    }
    setSelectedCountry(data);
  }, [isTouring]);

  const handleSearch = (id: string) => {
    const found = stockData.find(d => d.id === id);
    if (found) {
      setSelectedCountry(found);
      setIsTouring(false);
      // Ensure the searched country is visible by clearing any active region filter
      // This fixes the bug where searching for a country outside the current filter wouldn't show the marker
      setActiveRegion(null);
    }
  };

  const handleRegionFilter = (region: Region | null) => {
    setActiveRegion(region);
    setSelectedCountry(null); // Clear selection when changing filter
    setIsTouring(false);
  };

  const handleToggleTour = () => {
    setIsTouring(!isTouring);
    if (!isTouring) {
        // Clear selection to let tour start freshly
        setSelectedCountry(null);
    }
  };

  return (
    <div className="relative w-full h-screen bg-slate-950 overflow-hidden">
      
      {/* 3D Globe Layer */}
      <GlobeViewer
        data={stockData}
        onCountryClick={handleCountryClick}
        selectedId={selectedCountry?.id || null}
        activeRegion={activeRegion}
        isTouring={isTouring}
      />

      {/* Brand Header */}
      <div className="absolute top-4 left-4 z-20 pointer-events-none">
        <h1 className="text-3xl font-black text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] tracking-tight">
          Global<span className="text-blue-500">Markets</span> 3D
        </h1>
        <p className="text-blue-200 text-sm font-medium drop-shadow-md bg-slate-900/50 px-2 py-1 rounded inline-block">
          TeenVestor Learning Hub
        </p>
      </div>

      {/* Data Status Indicator */}
      <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
        {lastUpdated && (
          <span className="text-xs text-slate-400 bg-slate-900/70 px-2 py-1 rounded">
            Updated: {new Date(lastUpdated).toLocaleString()}
          </span>
        )}
        <button
          onClick={refresh}
          disabled={isLoading}
          className="p-2 bg-slate-800/80 hover:bg-slate-700 text-white rounded-full transition-colors disabled:opacity-50"
          title="Refresh data"
        >
          <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {/* Info Panel Overlay */}
      <InfoPanel
        data={selectedCountry}
        onClose={() => setSelectedCountry(null)}
        lastUpdated={lastUpdated}
      />

      {/* Bottom Controls */}
      <ControlBar
        onSearch={handleSearch}
        onFilterRegion={handleRegionFilter}
        activeRegion={activeRegion}
        isTouring={isTouring}
        onToggleTour={handleToggleTour}
        stockData={stockData}
      />

      {/* Glossary / Help Button */}
      <div className="absolute bottom-6 right-6 z-30">
        <button 
          onClick={() => setShowGlossary(!showGlossary)}
          className="bg-slate-800/80 hover:bg-blue-600 text-white p-3 rounded-full shadow-lg border border-slate-600 transition-colors"
          title="Learn Terms"
        >
          <HelpCircle className="w-6 h-6" />
        </button>

        {/* Glossary Popover */}
        {showGlossary && (
            <div className="absolute bottom-14 right-0 w-72 bg-slate-900/95 border border-slate-600 rounded-xl p-4 shadow-2xl text-white backdrop-blur-sm animate-in fade-in slide-in-from-bottom-5">
                <h3 className="font-bold text-blue-400 mb-3 text-lg">Key Terms</h3>
                <div className="space-y-4 max-h-64 overflow-y-auto custom-scrollbar pr-2">
                    {GLOSSARY.map((item, idx) => (
                        <div key={idx}>
                            <p className="text-xs font-bold text-slate-300 uppercase">{item.term}</p>
                            <p className="text-sm text-slate-400 leading-snug">{item.definition}</p>
                        </div>
                    ))}
                </div>
            </div>
        )}
      </div>

      {/* Start Instruction Overlay (Disappears on interaction) */}
      {!selectedCountry && !isTouring && !activeRegion && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none z-10 animate-pulse">
            <div className="bg-black/40 backdrop-blur-sm px-6 py-4 rounded-2xl border border-white/10">
                <p className="text-white text-lg font-light">Drag to Rotate • Scroll to Zoom</p>
                <p className="text-blue-300 font-bold mt-1">Click a country to explore!</p>
            </div>
        </div>
      )}

    </div>
  );
};

export default App;