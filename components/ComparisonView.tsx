import React, { useState, useMemo, useRef, useEffect } from 'react';
import { formatCurrency } from '../constants';
import { fetchBudgetData } from '../services/geminiService';
import { ArrowRightLeft, TrendingUp, TrendingDown, Search, ChevronDown, Check, BarChart2, Users, Receipt, Globe } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';

// --- Internal Searchable Select Component ---
interface SearchableSelectProps {
  options: { id: string; name: string }[];
  value: string;
  onChange: (value: string) => void;
  label: string;
}

const SearchableSelect: React.FC<SearchableSelectProps> = ({ options, value, onChange, label }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const wrapperRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find(o => o.id === value);

  const filteredOptions = useMemo(() => {
    return options.filter(option => 
      option.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [options, searchTerm]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [wrapperRef]);

  return (
    <div className="w-full relative" ref={wrapperRef}>
      <label className="block text-sm font-medium text-slate-700 mb-2">{label}</label>
      <div 
        className="w-full p-2 border border-slate-300 rounded-lg flex justify-between items-center cursor-pointer bg-white focus-within:ring-2 focus-within:ring-blue-500"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-slate-800 truncate">{selectedOption?.name || 'Select item...'}</span>
        <ChevronDown className="w-4 h-4 text-slate-500" />
      </div>

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-slate-200 rounded-lg shadow-lg max-h-60 overflow-hidden flex flex-col">
          <div className="p-2 border-b border-slate-100 bg-slate-50">
            <div className="flex items-center bg-white border border-slate-200 rounded-md px-2">
              <Search className="w-4 h-4 text-slate-400" />
              <input
                type="text"
                className="w-full p-2 text-sm focus:outline-none"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                autoFocus
              />
            </div>
          </div>
          <div className="overflow-y-auto flex-1">
            {filteredOptions.length === 0 ? (
               <div className="p-3 text-sm text-slate-500 text-center">No results found</div>
            ) : (
              filteredOptions.map(option => (
                <div
                  key={option.id}
                  className={`p-2 px-3 text-sm cursor-pointer hover:bg-blue-50 flex items-center justify-between ${option.id === value ? 'bg-blue-50 text-blue-700 font-medium' : 'text-slate-700'}`}
                  onClick={() => {
                    onChange(option.id);
                    setIsOpen(false);
                    setSearchTerm('');
                  }}
                >
                  {option.name}
                  {option.id === value && <Check className="w-4 h-4" />}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const ComparisonView: React.FC = () => {
  const [mode, setMode] = useState<'item' | 'province'>('item');
  const [metric, setMetric] = useState<'total' | 'perCapita'>('total');
  const [budgetData, setBudgetData] = useState<any[]>([]);
  
  // Item Comparison State
  const [item1Id, setItem1Id] = useState<string | null>(null);
  const [item2Id, setItem2Id] = useState<string | null>(null);

  useEffect(() => {
    const getData = async () => {
      const data = await fetchBudgetData();
      setBudgetData(data);
      if (data.length > 1) {
        setItem1Id(data[0].id);
        setItem2Id(data[1].id);
      }
    };
    getData();
  }, []);

  const item1 = budgetData.find(i => i.id === item1Id);
  const item2 = budgetData.find(i => i.id === item2Id);

  // Provincial Comparison Data
  const provincialData = useMemo(() => {
    return budgetData
      .filter(i => i.category === 'Province')
      .map(p => {
        const population = p.population || 1;
        const value2026 = metric === 'total' ? p.allocation2026 : p.allocation2026 / population;
        return {
          name: p.name,
          population: p.population,
          value: value2026,
          // Store raw values for tooltip
          total: p.allocation2026,
          perCapita: p.allocation2026 / population
        };
      })
      .sort((a, b) => b.value - a.value); // Sort by selected metric
  }, [metric, budgetData]);

  // Calculate National Statistics
  const nationalStats = useMemo(() => {
    const totalAllocatedBudget = budgetData
      .filter(b => b.category === 'Sector')
      .reduce((sum, item) => sum + item.allocation2026, 0);
    
    const totalPopulation = budgetData
      .filter(b => b.category === 'Province')
      .reduce((sum, item) => sum + (item.population || 0), 0);
    
    const nationalPerCapita = totalAllocatedBudget / totalPopulation;

    return { totalPopulation, nationalPerCapita };
  }, [budgetData]);

  const selectOptions = useMemo(() => budgetData.map(i => ({ id: i.id, name: i.name })), [budgetData]);

  const getGrowth = (current: number, previous: number) => {
    const percent = ((current - previous) / previous) * 100;
    return (
      <span className={`text-sm font-bold flex items-center ${percent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
        {percent >= 0 ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
        {Math.abs(percent).toFixed(1)}%
      </span>
    );
  };

  const renderItemComparison = () => {
    if (!item1 || !item2) return null;

    const compareData = [
      { name: '2024 (Actual)', [item1.name]: item1.allocation2024, [item2.name]: item2.allocation2024 },
      { name: '2025 (Est)', [item1.name]: item1.allocation2025, [item2.name]: item2.allocation2025 },
      { name: '2026 (Proj)', [item1.name]: item1.allocation2026, [item2.name]: item2.allocation2026 },
    ];

    return (
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row gap-6 items-center justify-center mb-8">
          <div className="w-full md:w-1/3 z-20">
            <SearchableSelect 
              label="First Item"
              options={selectOptions}
              value={item1Id}
              onChange={setItem1Id}
            />
          </div>

          <div className="bg-slate-100 p-2 rounded-full mt-6">
            <ArrowRightLeft className="text-slate-500" />
          </div>

          <div className="w-full md:w-1/3 z-10">
            <SearchableSelect 
              label="Second Item"
              options={selectOptions}
              value={item2Id}
              onChange={setItem2Id}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card 1 */}
          <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
            <h3 className="text-xl font-bold text-slate-800 mb-2">{item1.name}</h3>
            <p className="text-sm text-slate-600 mb-4">{item1.description}</p>
            <div className="space-y-3">
              <div className="flex justify-between items-center pb-2 border-b border-blue-200">
                <span className="text-slate-600">2026 Allocation</span>
                <span className="text-lg font-bold text-blue-900">{formatCurrency(item1.allocation2026)}</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-blue-200">
                <span className="text-slate-600">Growth (25-26)</span>
                {getGrowth(item1.allocation2026, item1.allocation2025)}
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-orange-50 p-6 rounded-lg border border-orange-100">
            <h3 className="text-xl font-bold text-slate-800 mb-2">{item2.name}</h3>
            <p className="text-sm text-slate-600 mb-4">{item2.description}</p>
             <div className="space-y-3">
              <div className="flex justify-between items-center pb-2 border-b border-orange-200">
                <span className="text-slate-600">2026 Allocation</span>
                <span className="text-lg font-bold text-orange-900">{formatCurrency(item2.allocation2026)}</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-orange-200">
                <span className="text-slate-600">Growth (25-26)</span>
                {getGrowth(item2.allocation2026, item2.allocation2025)}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 h-80">
           <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={compareData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" />
              <YAxis tickFormatter={(val) => `K${(val / 1000000).toFixed(0)}M`} />
              <Tooltip 
                 formatter={(value: number) => formatCurrency(value)}
                 contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0' }}
              />
              <Legend />
              <Bar dataKey={item1.name} fill="#3b82f6" radius={[4, 4, 0, 0]} />
              <Bar dataKey={item2.name} fill="#f97316" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  };

  const renderProvincialComparison = () => {
    return (
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <div>
            <h3 className="text-lg font-bold text-slate-800">Provincial Analysis 2026</h3>
            <p className="text-sm text-slate-500">Based on National Statistical Office (NSO) Population Projections</p>
          </div>
          
          <div className="flex bg-slate-100 p-1 rounded-lg">
             <button
              onClick={() => setMetric('total')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                metric === 'total' ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <Receipt className="w-3.5 h-3.5" />
              Total Allocation
            </button>
            <button
              onClick={() => setMetric('perCapita')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                metric === 'perCapita' ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              Per Capita
            </button>
          </div>
        </div>
        
        <div className="h-[500px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={provincialData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} interval={0} fontSize={12} />
              <YAxis tickFormatter={(val) => metric === 'total' ? `K${(val / 1000000).toFixed(0)}M` : `K${val}`} />
              <Tooltip 
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-white p-3 border border-slate-200 rounded-lg shadow-md">
                        <p className="font-bold text-slate-800 mb-2">{data.name}</p>
                        <p className="text-xs text-slate-500 mb-1">Population: <span className="font-mono font-medium text-slate-700">{data.population?.toLocaleString()}</span></p>
                        <p className="text-xs text-slate-500 mb-1">Total Allocation: <span className="font-mono font-medium text-blue-600">{formatCurrency(data.total)}</span></p>
                        <p className="text-xs text-slate-500">Per Capita: <span className="font-mono font-medium text-green-600">{formatCurrency(data.perCapita)}/person</span></p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Legend verticalAlign="top" />
              <Bar 
                dataKey="value" 
                fill={metric === 'total' ? '#3b82f6' : '#10b981'} 
                name={metric === 'total' ? "Total Allocation (PGK)" : "Allocation Per Capita (PGK)"} 
                radius={[4, 4, 0, 0]} 
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Automated Analysis Section */}
        <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 mt-4">
          <div className="flex items-center justify-between mb-4">
             <h4 className="text-sm font-bold text-slate-700">Budget Review & Analysis</h4>
             <div className="flex items-center gap-2 bg-blue-100 px-3 py-1 rounded-full text-blue-800 text-xs font-semibold">
                <Globe className="w-3 h-3" />
                National Average: {formatCurrency(nationalStats.nationalPerCapita)} per capita
             </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-600">
            <div>
              <span className="font-semibold text-blue-700">Highest {metric === 'total' ? 'Allocation' : 'Per Capita'}:</span> {provincialData[0]?.name || "N/A"}
              <div className="text-xs text-slate-500 mt-1">
                Receives {provincialData[0] ? (metric === 'total' ? formatCurrency(provincialData[0].value) : `${formatCurrency(provincialData[0].value)} per person`) : "No data"}.
              </div>
            </div>
            <div>
              <span className="font-semibold text-red-600">Lowest {metric === 'total' ? 'Allocation' : 'Per Capita'}:</span> {provincialData[provincialData.length - 1]?.name || "N/A"}
               <div className="text-xs text-slate-500 mt-1">
                Receives {provincialData.length > 0 ? (metric === 'total' ? formatCurrency(provincialData[provincialData.length - 1].value) : `${formatCurrency(provincialData[provincialData.length - 1].value)} per person`) : "No data"}.
              </div>
            </div>
          </div>
          <p className="text-xs text-slate-400 mt-3 italic border-t border-slate-200 pt-2">
            * Note: Disparities in per capita spending often reflect specific development grants (e.g., Mining projects, LNG) or the cost of service delivery in remote areas. National Average calculated based on Total Budget ({formatCurrency(nationalStats.nationalPerCapita * nationalStats.totalPopulation)}) divided by Estimated Population ({nationalStats.totalPopulation.toLocaleString()}).
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 min-h-[600px] animate-fade-in">
      <div className="flex justify-center mb-8 border-b border-slate-100 pb-4">
        <div className="flex p-1 bg-slate-100 rounded-lg">
          <button
            onClick={() => setMode('item')}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
              mode === 'item' ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <ArrowRightLeft className="w-4 h-4" />
            Compare Items
          </button>
          <button
            onClick={() => setMode('province')}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
              mode === 'province' ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <BarChart2 className="w-4 h-4" />
            Provincial Overview
          </button>
        </div>
      </div>

      {mode === 'item' ? renderItemComparison() : renderProvincialComparison()}
    </div>
  );
};

export default ComparisonView;