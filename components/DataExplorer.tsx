import React, { useState, useMemo } from 'react';
import { BUDGET_DATA, formatCurrency } from '../constants';
import { Search, ArrowUpDown, Filter, Check } from 'lucide-react';

const CATEGORIES = ['Sector', 'Agency', 'Province'];

const DataExplorer: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  // Multi-select state for categories
  const [selectedCategories, setSelectedCategories] = useState<string[]>(['Sector', 'Agency', 'Province']);
  // Year Range Filter
  const [yearRange, setYearRange] = useState<[number, number]>([2024, 2026]);
  
  const [sortKey, setSortKey] = useState<'name' | 'description' | 'allocation2026'>('allocation2026');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const filteredData = useMemo(() => {
    return BUDGET_DATA.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            item.description?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(item.category);

      return matchesSearch && matchesCategory;
    }).sort((a, b) => {
      if (sortKey === 'name') {
        return sortOrder === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
      } else if (sortKey === 'description') {
        return sortOrder === 'asc' 
          ? (a.description || '').localeCompare(b.description || '') 
          : (b.description || '').localeCompare(a.description || '');
      } else {
        // Default to sorting by 2026 amount
        return sortOrder === 'asc' ? a.allocation2026 - b.allocation2026 : b.allocation2026 - a.allocation2026;
      }
    });
  }, [searchTerm, selectedCategories, sortKey, sortOrder]);

  const toggleSort = (key: 'name' | 'description' | 'allocation2026') => {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('desc');
    }
  };

  const SortIcon = ({ active }: { active: boolean }) => (
    <ArrowUpDown className={`w-3 h-3 ml-1 inline-block ${active ? 'text-blue-600' : 'text-slate-400'}`} />
  );

  const isYearVisible = (year: number) => year >= yearRange[0] && year <= yearRange[1];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden flex flex-col h-full animate-fade-in">
      <div className="p-6 border-b border-slate-100">
        <div className="flex flex-col gap-6">
           <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <h2 className="text-xl font-bold text-slate-800">Budget Explorer</h2>
           </div>

          <div className="flex flex-col md:flex-row gap-6 items-start bg-slate-50 p-4 rounded-lg">
             {/* Search Input */}
             <div className="relative w-full md:flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search sectors, agencies, provinces..."
                  className="pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full bg-white"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
             </div>

             {/* Multi-select Filters */}
             <div className="flex flex-col gap-2 w-full md:w-auto">
                <label className="text-xs font-semibold text-slate-500 uppercase flex items-center gap-1">
                  <Filter className="w-3 h-3" /> Categories
                </label>
                <div className="flex flex-wrap gap-2">
                  {CATEGORIES.map(cat => {
                    const isSelected = selectedCategories.includes(cat);
                    return (
                      <button
                        key={cat}
                        onClick={() => toggleCategory(cat)}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors flex items-center gap-1
                          ${isSelected 
                            ? 'bg-blue-600 border-blue-600 text-white shadow-sm' 
                            : 'bg-white border-slate-300 text-slate-600 hover:border-slate-400'}`}
                      >
                        {isSelected && <Check className="w-3 h-3" />}
                        {cat === 'Agency' ? 'Depts & Agencies' : cat}
                      </button>
                    )
                  })}
                </div>
             </div>

             {/* Year Range Slider */}
             <div className="w-full md:w-48 space-y-2">
               <label className="text-xs font-semibold text-slate-500 uppercase flex justify-between">
                 <span>Period</span>
                 <span className="text-blue-600 font-medium">{yearRange[0]} - {yearRange[1]}</span>
               </label>
               <div className="px-1 relative">
                  <input 
                    type="range" 
                    min="2024" 
                    max="2026" 
                    step="1"
                    value={yearRange[1]}
                    onChange={(e) => {
                      const val = parseInt(e.target.value);
                      if (val >= yearRange[0]) setYearRange([yearRange[0], val]);
                    }}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-mono">
                    <span>2024</span>
                    <span>2025</span>
                    <span>2026</span>
                  </div>
               </div>
             </div>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto flex-1">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-50 sticky top-0 z-10">
            <tr>
              <th 
                className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider cursor-pointer hover:bg-slate-100 w-1/4"
                onClick={() => toggleSort('name')}
              >
                Item Name <SortIcon active={sortKey === 'name'} />
              </th>
              <th 
                className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider cursor-pointer hover:bg-slate-100 w-1/3"
                onClick={() => toggleSort('description')}
              >
                Description <SortIcon active={sortKey === 'description'} />
              </th>
              <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Category</th>
              
              {isYearVisible(2024) && (
                <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">2024 Actual</th>
              )}
              {isYearVisible(2025) && (
                <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">2025 Est.</th>
              )}
              {isYearVisible(2026) && (
                <th 
                  className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right cursor-pointer hover:bg-slate-100"
                  onClick={() => toggleSort('allocation2026')}
                >
                  2026 Proj. <SortIcon active={sortKey === 'allocation2026'} />
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredData.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="font-medium text-slate-800">{item.name}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-xs text-slate-500">{item.description}</div>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                    ${item.category === 'Sector' ? 'bg-blue-100 text-blue-800' : 
                      item.category === 'Province' ? 'bg-green-100 text-green-800' : 
                      'bg-purple-100 text-purple-800'}`}>
                    {item.category === 'Agency' ? 'Dept/Agency' : item.category}
                  </span>
                </td>
                
                {isYearVisible(2024) && (
                  <td className="px-6 py-4 text-right text-slate-600 font-mono text-sm">
                    {formatCurrency(item.allocation2024)}
                  </td>
                )}
                {isYearVisible(2025) && (
                  <td className="px-6 py-4 text-right text-slate-600 font-mono text-sm">
                    {formatCurrency(item.allocation2025)}
                  </td>
                )}
                {isYearVisible(2026) && (
                  <td className="px-6 py-4 text-right font-mono text-sm font-semibold text-slate-800">
                    {formatCurrency(item.allocation2026)}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
        {filteredData.length === 0 && (
          <div className="p-8 text-center text-slate-500">
            No results found. Try adjusting your filters.
          </div>
        )}
      </div>
    </div>
  );
};

export default DataExplorer;