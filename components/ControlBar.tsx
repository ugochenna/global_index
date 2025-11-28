import React, { useState } from 'react';
import { Search, Globe, Play, Square } from 'lucide-react';
import { Region, StockData } from '../types';

interface ControlBarProps {
  onSearch: (id: string) => void;
  onFilterRegion: (region: Region | null) => void;
  activeRegion: Region | null;
  isTouring: boolean;
  onToggleTour: () => void;
  stockData: StockData[];
}

const ControlBar: React.FC<ControlBarProps> = ({
  onSearch,
  onFilterRegion,
  activeRegion,
  isTouring,
  onToggleTour,
  stockData
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<StockData[]>([]);
  const [noResults, setNoResults] = useState(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    setNoResults(false);
    
    if (term.length > 1) {
      const results = stockData.filter(item =>
        item.country.toLowerCase().includes(term.toLowerCase()) ||
        item.indexName.toLowerCase().includes(term.toLowerCase())
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  const handleSelectResult = (id: string) => {
    onSearch(id);
    setSearchTerm('');
    setSearchResults([]);
    setNoResults(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      let targetId = null;

      if (searchResults.length > 0) {
        targetId = searchResults[0].id;
      } else if (searchTerm.length > 1) {
        // Fallback: If user types and hits enter quickly before results render, try to find a match
        const results = stockData.filter(item =>
          item.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.indexName.toLowerCase().includes(searchTerm.toLowerCase())
        );
        if (results.length > 0) {
          targetId = results[0].id;
        }
      }

      if (targetId) {
        handleSelectResult(targetId);
      } else {
        // Trigger visual feedback for no results
        setNoResults(true);
        // Reset the feedback state after animation/delay
        setTimeout(() => setNoResults(false), 1000);
      }
    }
  };

  return (
    <div className="absolute bottom-6 left-0 right-0 z-20 flex flex-col items-center gap-4 px-4 pointer-events-none">
      
      {/* Search Bar - Floats above controls */}
      <div className="relative w-full max-w-md pointer-events-auto">
        <div className="relative">
          <input
            type="text"
            placeholder={noResults ? "Country not found" : "Search country and press Enter..."}
            value={searchTerm}
            onChange={handleSearchChange}
            onKeyDown={handleKeyDown}
            className={`w-full pl-10 pr-4 py-3 bg-slate-900/90 backdrop-blur-md border rounded-full text-white placeholder-slate-400 focus:outline-none focus:ring-2 shadow-xl transition-colors duration-300
              ${noResults 
                ? 'border-red-500 ring-2 ring-red-500/50 placeholder-red-300' 
                : 'border-slate-600 focus:ring-blue-500'
              }`}
          />
          <Search className={`absolute left-3 top-3.5 w-5 h-5 ${noResults ? 'text-red-400' : 'text-slate-400'}`} />
        </div>
        
        {/* Search Results Dropdown */}
        {searchResults.length > 0 && (
          <div className="absolute bottom-14 left-0 right-0 bg-slate-800 border border-slate-700 rounded-lg shadow-xl overflow-hidden max-h-48 overflow-y-auto">
            {searchResults.map(item => (
              <button
                key={item.id}
                onClick={() => handleSelectResult(item.id)}
                className="w-full text-left px-4 py-2 text-white hover:bg-slate-700 flex items-center gap-2 border-b border-slate-700/50 last:border-0"
              >
                <span>{item.flag}</span>
                <span className="font-medium">{item.country}</span>
                <span className="text-xs text-slate-400 ml-auto">{item.indexName}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Main Control Deck */}
      <div className="flex flex-wrap items-center justify-center gap-2 pointer-events-auto bg-slate-900/80 backdrop-blur-md p-2 rounded-2xl border border-slate-700/50 shadow-2xl">
        
        {/* Tour Toggle */}
        <button
          onClick={onToggleTour}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${
            isTouring 
              ? 'bg-rose-500 text-white shadow-[0_0_15px_rgba(244,63,94,0.5)]' 
              : 'bg-emerald-500 text-white hover:bg-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.3)]'
          }`}
        >
          {isTouring ? <Square className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
          {isTouring ? 'Stop Tour' : 'Start Tour'}
        </button>

        <div className="w-px h-8 bg-slate-700 mx-2 hidden md:block"></div>

        {/* Region Filters */}
        <div className="flex items-center gap-1 overflow-x-auto max-w-[60vw] md:max-w-none no-scrollbar">
            <button
                onClick={() => onFilterRegion(null)}
                className={`px-3 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1 ${
                    activeRegion === null ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-slate-800'
                }`}
            >
               <Globe className="w-3 h-3" /> All
            </button>
            {Object.values(Region).map(region => (
                <button
                    key={region}
                    onClick={() => onFilterRegion(region)}
                    className={`px-3 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                        activeRegion === region ? 'bg-slate-700 text-white border border-slate-500' : 'text-slate-400 hover:text-white hover:bg-slate-800'
                    }`}
                >
                    {region}
                </button>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ControlBar;