import React, { useState, useMemo, useRef, useEffect } from 'react';
import { BUDGET_DATA, formatCurrency } from '../constants';
import { ArrowRightLeft, TrendingUp, TrendingDown, Search, ChevronDown, Check, BarChart2 } from 'lucide-react';
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
  
  // Item Comparison State
  const [item1Id, setItem1Id] = useState(BUDGET_DATA[0].id);
  const [item2Id, setItem2Id] = useState(BUDGET_DATA[1].id);

  const item1 = BUDGET_DATA.find(i => i.id === item1Id);
  const item2 = BUDGET_DATA.find(i => i.id === item2Id);

  // Provincial Comparison Data
  const provincialData = useMemo(() => {
    return BUDGET_DATA
      .filter(i => i.category === 'Province')
      .sort((a, b) => b.allocation2026 - a.allocation2026) // Sort by size
      .map(p => ({
        name: p.name,
        '2024': p.allocation2024,
        '2025': p.allocation2025,
        '2026': p.allocation2026,
      }));
  }, []);

  const selectOptions = useMemo(() => BUDGET_DATA.map(i => ({ id: i.id, name: i.name })), []);

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
        <div className="text-center mb-6">
          <h3 className="text-lg font-bold text-slate-800">Provincial Allocations (2024-2026)</h3>
          <p className="text-sm text-slate-500">Side-by-side comparison of budget growth across provinces</p>
        </div>
        
        <div className="h-[500px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={provincialData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} interval={0} fontSize={12} />
              <YAxis tickFormatter={(val) => `K${(val / 1000000).toFixed(0)}M`} />
              <Tooltip 
                formatter={(value: number) => formatCurrency(value)}
                contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0' }}
              />
              <Legend verticalAlign="top" />
              <Bar dataKey="2024" fill="#94a3b8" name="2024 (Actual)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="2025" fill="#3b82f6" name="2025 (Estimate)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="2026" fill="#10b981" name="2026 (Projected)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
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
