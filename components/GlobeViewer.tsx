import React, { useRef, useEffect, useState, useMemo } from 'react';
import Globe, { GlobeMethods } from 'react-globe.gl';
import { StockData, Region } from '../types';
import { REGION_COLORS } from '../constants';

interface GlobeViewerProps {
  data: StockData[];
  onCountryClick: (data: StockData) => void;
  selectedId: string | null;
  activeRegion: Region | null;
  isTouring: boolean;
}

const GlobeViewer: React.FC<GlobeViewerProps> = ({ 
  data, 
  onCountryClick, 
  selectedId, 
  activeRegion, 
  isTouring 
}) => {
  const globeEl = useRef<GlobeMethods | undefined>(undefined);
  const [dimensions, setDimensions] = useState({ width: window.innerWidth, height: window.innerHeight });

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Filter Data
  const visibleData = useMemo(() => {
    if (!activeRegion) return data;
    return data.filter(d => d.region === activeRegion);
  }, [data, activeRegion]);

  // Focus on selected country
  useEffect(() => {
    if (selectedId && globeEl.current) {
      const country = data.find(d => d.id === selectedId);
      if (country) {
        globeEl.current.pointOfView({ lat: country.lat, lng: country.lng, altitude: 1.5 }, 1000);
      }
    }
  }, [selectedId, data]);

  // Tour Mode Logic
  useEffect(() => {
    let tourInterval: ReturnType<typeof setInterval>;
    if (isTouring && globeEl.current) {
        let index = 0;
        const tourStep = () => {
            if (index >= visibleData.length) index = 0;
            const target = visibleData[index];
            globeEl.current?.pointOfView({ lat: target.lat, lng: target.lng, altitude: 1.8 }, 2000);
            onCountryClick(target); // Auto select the country
            index++;
        };
        
        tourStep(); // Start immediately
        tourInterval = setInterval(tourStep, 6000); // Move every 6 seconds
    }

    return () => {
        if (tourInterval) clearInterval(tourInterval);
    };
  }, [isTouring, visibleData, onCountryClick]);


  // Auto Rotation when idle (and not touring/selected)
  useEffect(() => {
    if (globeEl.current) {
      globeEl.current.controls().autoRotate = !selectedId && !isTouring;
      globeEl.current.controls().autoRotateSpeed = 0.5;
    }
  }, [selectedId, isTouring]);

  return (
    <div className="cursor-move">
      <Globe
        ref={globeEl}
        width={dimensions.width}
        height={dimensions.height}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
        backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
        
        // Atmosphere
        atmosphereColor="#3b82f6"
        atmosphereAltitude={0.15}

        // Labels (The clickable dots)
        labelsData={visibleData}
        labelLat={d => (d as StockData).lat}
        labelLng={d => (d as StockData).lng}
        labelText={d => (d as StockData).country}
        labelSize={d => (d as StockData).id === selectedId ? 1.5 : 0.5}
        labelDotRadius={d => (d as StockData).id === selectedId ? 1.2 : 0.6}
        labelColor={d => (d as StockData).id === selectedId ? '#ffffff' : REGION_COLORS[(d as StockData).region]}
        labelResolution={2}
        
        // Interaction
        onLabelClick={(d) => onCountryClick(d as StockData)}
        
        // Rings for visual flair
        ringsData={visibleData}
        ringColor={d => (color: any) => `rgba(${parseInt(REGION_COLORS[(d as StockData).region].slice(1,3), 16)}, ${parseInt(REGION_COLORS[(d as StockData).region].slice(3,5), 16)}, ${parseInt(REGION_COLORS[(d as StockData).region].slice(5,7), 16)}, ${color})`}
        ringMaxRadius={d => (d as StockData).id === selectedId ? 8 : 3}
        ringPropagationSpeed={2}
        ringRepeatPeriod={1000}
      />
    </div>
  );
};

export default GlobeViewer;