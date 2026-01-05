
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { formatCurrency } from '../constants';
import { fetchBudgetData } from '../services/geminiService';
import { MapPin, Info, TrendingUp, Users, Landmark, Zap, Globe, ArrowLeft, Maximize2, Map as MapIcon } from 'lucide-react';

declare var L: any; // Leaflet global

// Metadata for Provinces (Lat/Lng and approximate zoom center)
const PROVINCE_MAP_METADATA = [
  { id: 'PROV-15', name: 'Sandaun', lat: -3.5, lng: 141.5, zoom: 8 },
  { id: 'PROV-14', name: 'East Sepik', lat: -4.0, lng: 143.5, zoom: 8 },
  { id: 'PROV-13', name: 'Madang', lat: -5.2, lng: 145.5, zoom: 8 },
  { id: 'PROV-02', name: 'Morobe', lat: -6.5, lng: 147.0, zoom: 8 },
  { id: 'PROV-17', name: 'Enga', lat: -5.4, lng: 143.4, zoom: 9 },
  { id: 'PROV-05', name: 'Western Highlands', lat: -5.8, lng: 144.3, zoom: 9 },
  { id: 'PROV-22', name: 'Jiwaka', lat: -6.0, lng: 144.6, zoom: 9 },
  { id: 'PROV-10', name: 'Chimbu', lat: -6.1, lng: 145.0, zoom: 9 },
  { id: 'PROV-11', name: 'Eastern Highlands', lat: -6.3, lng: 145.5, zoom: 9 },
  { id: 'PROV-03', name: 'Southern Highlands', lat: -6.3, lng: 143.8, zoom: 9 },
  { id: 'PROV-21', name: 'Hela', lat: -6.0, lng: 142.8, zoom: 9 },
  { id: 'PROV-04', name: 'Western', lat: -7.5, lng: 142.0, zoom: 7 },
  { id: 'PROV-06', name: 'Gulf', lat: -7.4, lng: 144.5, zoom: 8 },
  { id: 'PROV-07', name: 'Central', lat: -9.4, lng: 147.3, zoom: 8 },
  { id: 'PROV-01', name: 'NCD', lat: -9.48, lng: 147.18, zoom: 11 },
  { id: 'PROV-09', name: 'Oro', lat: -9.0, lng: 148.5, zoom: 8 },
  { id: 'PROV-08', name: 'Milne Bay', lat: -10.5, lng: 150.5, zoom: 8 },
  { id: 'PROV-20', name: 'Manus', lat: -2.1, lng: 147.0, zoom: 9 },
  { id: 'PROV-19', name: 'New Ireland', lat: -3.0, lng: 151.5, zoom: 8 },
  { id: 'PROV-18', name: 'West New Britain', lat: -5.8, lng: 149.5, zoom: 8 },
  { id: 'PROV-12', name: 'East New Britain', lat: -4.8, lng: 152.0, zoom: 8 },
  { id: 'PROV-16', name: 'Bougainville (AROB)', lat: -6.0, lng: 155.0, zoom: 8 },
];

// District coordinate offsets for visualization (relative to province center)
// This simulates a detailed drill-down without needing a massive GeoJSON database.
const getDistrictCoords = (provinceId: string, index: number, total: number) => {
  const province = PROVINCE_MAP_METADATA.find(p => p.id === provinceId);
  if (!province) return { lat: 0, lng: 0 };
  
  // Create a small grid/circle of points around the province center
  const angle = (index / total) * 2 * Math.PI;
  const radius = 0.35; // Lat/Lng degrees offset
  return {
    lat: province.lat + Math.sin(angle) * radius,
    lng: province.lng + Math.cos(angle) * radius
  };
};

const ProvincialMap: React.FC = () => {
  const [viewLevel, setViewLevel] = useState<'national' | 'provincial'>('national');
  const [selectedProvId, setSelectedProvId] = useState<string | null>('PROV-01');
  const [selectedDistId, setSelectedDistId] = useState<string | null>(null);
  const [budgetData, setBudgetData] = useState<any[]>([]);
  const mapRef = useRef<any>(null);
  const markerGroupRef = useRef<any>(null);

  useEffect(() => {
    const getData = async () => {
      const data = await fetchBudgetData();
      setBudgetData(data);
    };
    getData();
  }, []);

  // Process data for the current view
  const displayData = useMemo(() => {
    if (viewLevel === 'national') {
      return PROVINCE_MAP_METADATA.map(meta => {
        const province = budgetData.find(b => b.id === meta.id);
        const subItems = budgetData.filter(b => b.parentId === meta.id);
        const dsip = subItems.filter(i => i.category === 'District').length * 10000000;
        const projects = subItems.filter(i => i.category === 'Agency').reduce((acc, curr) => acc + curr.allocation2026, 0);
        const population = province?.population || 1;
        const total = province?.allocation2026 || 0;
        return { ...meta, total, dsip, projects, population, perCapita: total / population };
      });
    } else {
      // District drill down
      const province = PROVINCE_MAP_METADATA.find(p => p.id === selectedProvId);
      const districts = budgetData.filter(b => b.parentId === selectedProvId && b.category === 'District');
      const provBudget = budgetData.find(b => b.id === selectedProvId);
      const provPop = provBudget?.population || 1;
      
      return districts.map((dist, idx) => {
        const coords = getDistrictCoords(selectedProvId!, idx, districts.length);
        // Distribute population roughly for district per-capita visualization
        const distPop = provPop / districts.length; 
        return {
          id: dist.id,
          name: dist.name,
          lat: coords.lat,
          lng: coords.lng,
          total: dist.allocation2026,
          population: distPop,
          perCapita: dist.allocation2026 / distPop,
          description: dist.description || 'District SIP Allocation'
        };
      });
    }
  }, [viewLevel, selectedProvId, budgetData]);


  const activeEntity = useMemo(() => {
    if (viewLevel === 'national') {
      return displayData.find(p => p.id === selectedProvId) || displayData[0];
    } else {
      return displayData.find(d => d.id === selectedDistId) || displayData[0];
    }
  }, [viewLevel, selectedProvId, selectedDistId, displayData]);

  const getColor = (perCapita: number) => {
    if (perCapita > 2000) return '#1e3a8a'; // High
    if (perCapita > 1500) return '#3b82f6'; // Med-High
    if (perCapita > 1000) return '#60a5fa'; // Med
    return '#93c5fd'; // Base
  };

  const handleEntityClick = (id: string) => {
    if (viewLevel === 'national') {
      setSelectedProvId(id);
      // Optional: zoom in automatically or wait for "drill down" button
    } else {
      setSelectedDistId(id);
    }
  };

  const drillDown = (provId: string) => {
    const meta = PROVINCE_MAP_METADATA.find(p => p.id === provId);
    if (meta && mapRef.current) {
      mapRef.current.flyTo([meta.lat, meta.lng], meta.zoom, { duration: 1.5 });
      setSelectedProvId(provId);
      setViewLevel('provincial');
      setSelectedDistId(null);
    }
  };

  const backToNational = () => {
    if (mapRef.current) {
      mapRef.current.flyTo([-6.0, 147.0], 6, { duration: 1.5 });
      setViewLevel('national');
      setSelectedDistId(null);
    }
  };

  useEffect(() => {
    if (typeof L === 'undefined') return;

    if (!mapRef.current) {
      mapRef.current = L.map('budget-map').setView([-6.0, 147.0], 6);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(mapRef.current);
      markerGroupRef.current = L.layerGroup().addTo(mapRef.current);
    }

    // Clear existing markers
    markerGroupRef.current.clearLayers();

    // Render new markers based on current displayData
    displayData.forEach((item: any) => {
      const isSelected = (viewLevel === 'national' ? selectedProvId : selectedDistId) === item.id;
      
      const marker = L.circleMarker([item.lat, item.lng], {
        radius: isSelected ? 16 : 10,
        fillColor: getColor(item.perCapita),
        color: isSelected ? '#1e3a8a' : '#fff',
        weight: isSelected ? 3 : 1,
        opacity: 1,
        fillOpacity: 0.8
      })
      .addTo(markerGroupRef.current)
      .on('click', (e: any) => {
        L.DomEvent.stopPropagation(e);
        handleEntityClick(item.id);
      })
      .bindTooltip(`<b>${item.name}</b><br/>Per Capita: ${formatCurrency(item.perCapita)}`, {
        direction: 'top'
      });
    });

  }, [displayData, viewLevel, selectedProvId, selectedDistId]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in h-full">
      {/* Map Column */}
      <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-100 p-6 flex flex-col min-h-[550px] relative">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            {viewLevel === 'provincial' && (
              <button 
                onClick={backToNational}
                className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-600 bg-slate-50 border border-slate-200"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            )}
            <div>
              <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                <Globe className={`w-5 h-5 ${viewLevel === 'national' ? 'text-blue-600' : 'text-emerald-600'}`} />
                {viewLevel === 'national' ? 'National Overview' : `${activeEntity.name} District Map`}
              </h2>
              <p className="text-sm text-slate-500">
                {viewLevel === 'national' ? '22 Provinces of Papua New Guinea' : `Detailed breakdown for ${PROVINCE_MAP_METADATA.find(p => p.id === selectedProvId)?.name}`}
              </p>
            </div>
          </div>
          <div className="flex gap-2 text-[10px] font-bold uppercase tracking-tighter">
             <div className="flex items-center gap-1"><div className="w-3 h-3 bg-blue-900 rounded"></div> &gt; K2k</div>
             <div className="flex items-center gap-1"><div className="w-3 h-3 bg-blue-500 rounded"></div> &gt; K1.5k</div>
             <div className="flex items-center gap-1"><div className="w-3 h-3 bg-blue-200 rounded"></div> Base</div>
          </div>
        </div>

        <div className="flex-1 relative bg-slate-100 rounded-xl overflow-hidden border border-slate-100">
          <div id="budget-map" className="w-full h-full z-0" style={{ minHeight: '400px' }}></div>
          
          <div className="absolute bottom-4 left-4 flex flex-col gap-2 z-[1000]">
            <div className="bg-white/90 backdrop-blur px-3 py-2 rounded-lg border border-slate-200 text-[10px] text-slate-700 font-bold shadow-sm">
              <Info className="w-3 h-3 inline mr-1 text-blue-600" />
              Interactive OSM Base Layer • Volume 2 A-D Alignment
            </div>
            {viewLevel === 'national' && (
               <div className="bg-blue-600 text-white px-3 py-2 rounded-lg text-xs font-bold shadow-lg animate-pulse">
                  Click a province marker to zoom in
               </div>
            )}
          </div>
        </div>
      </div>

      {/* Details Column */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 flex flex-col h-full">
        <div className="border-b border-slate-100 pb-4 mb-6">
           <div className="flex items-center gap-2 text-blue-600 mb-1">
              <MapPin className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-widest">
                {viewLevel === 'national' ? 'Province Details' : 'District Details'}
              </span>
           </div>
           <h3 className="text-2xl font-black text-blue-900 leading-tight">{activeEntity.name}</h3>
           {viewLevel === 'national' && (
             <div className="flex items-center gap-2 mt-2">
                <Users className="w-4 h-4 text-slate-400" />
                <span className="text-sm font-medium text-slate-600">
                  Pop. Estimate: {activeEntity.population.toLocaleString()}
                </span>
             </div>
           )}
        </div>

        <div className="space-y-6 flex-1 overflow-y-auto pr-1">
          {/* Main Stat Card */}
          <div className={`rounded-xl p-5 border shadow-sm transition-colors ${viewLevel === 'national' ? 'bg-blue-50 border-blue-100' : 'bg-emerald-50 border-emerald-100'}`}>
             <p className={`text-xs font-bold uppercase tracking-widest mb-1 ${viewLevel === 'national' ? 'text-blue-600' : 'text-emerald-600'}`}>
                Per Capita Allocation (2026)
             </p>
             <h4 className={`text-3xl font-black ${viewLevel === 'national' ? 'text-blue-900' : 'text-emerald-900'}`}>
                {formatCurrency(activeEntity.perCapita)}
             </h4>
             <p className="text-[10px] text-slate-500 mt-1 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                Comparative Service Delivery Intensity
             </p>
          </div>

          <div className="space-y-4">
             <h5 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                {viewLevel === 'national' ? 'Sub-National Grants' : 'District Project Fund'}
             </h5>
             
             {viewLevel === 'national' ? (
                <>
                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100 hover:border-blue-200 transition-colors cursor-pointer" onClick={() => drillDown(activeEntity.id)}>
                    <div className="flex items-center gap-3">
                      <Landmark className="w-4 h-4 text-emerald-600" />
                      <span className="text-sm font-bold text-slate-700">District SIP Funds</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm">{formatCurrency(activeEntity.dsip)}</span>
                      <Maximize2 className="w-3 h-3 text-slate-400" />
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100">
                    <div className="flex items-center gap-3">
                      <Zap className="w-4 h-4 text-amber-600" />
                      <span className="text-sm font-bold text-slate-700">Flagship Projects</span>
                    </div>
                    <span className="font-mono text-sm">{formatCurrency(activeEntity.projects)}</span>
                  </div>
                </>
             ) : (
                <div className="bg-emerald-50/50 p-4 rounded-lg border border-emerald-100">
                   <p className="text-sm text-slate-700 font-medium mb-3">
                      {activeEntity.description}
                   </p>
                   <div className="flex justify-between items-center py-2 border-t border-emerald-100">
                      <span className="text-xs font-bold text-slate-500 uppercase">Direct Funding</span>
                      <span className="text-sm font-black text-emerald-800">{formatCurrency(activeEntity.total)}</span>
                   </div>
                </div>
             )}
          </div>

          {viewLevel === 'national' ? (
            <div className="mt-4">
               <button 
                 onClick={() => drillDown(activeEntity.id)}
                 className="w-full py-3 bg-blue-900 hover:bg-blue-800 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-md group"
               >
                 <MapIcon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                 Explore {activeEntity.name} Districts
               </button>
            </div>
          ) : (
            <div className="mt-4">
               <button 
                 onClick={backToNational}
                 className="w-full py-3 border-2 border-slate-200 text-slate-600 rounded-xl font-bold hover:bg-slate-50 transition-colors"
               >
                 Return to National View
               </button>
            </div>
          )}
        </div>

        <div className="mt-6 p-4 bg-slate-900 rounded-xl text-white flex gap-3 items-start shadow-xl">
           <Info className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
           <p className="text-[11px] text-slate-300 leading-snug">
             <strong>Perspective:</strong> {viewLevel === 'national' 
                ? "Allocations reflect Vol 2 itemized project lists. Click a province to see DSIP distribution." 
                : "Districts receive a standard K10M DSIP, but total per-capita varies based on population and local project priority."}
           </p>
        </div>
      </div>
    </div>
  );
};

export default ProvincialMap;
