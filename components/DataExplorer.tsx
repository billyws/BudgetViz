
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { BUDGET_DATA, formatCurrency } from '../constants';
import { Search, ArrowUpDown, Filter, Check, ChevronDown, ChevronRight, ArrowLeft, Info, Zap, Heart, Landmark, Briefcase } from 'lucide-react';

const CATEGORIES = ['Sector', 'Agency', 'Province', 'Revenue'];

const DataExplorer: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>(['Sector', 'Province', 'Revenue']);
  
  const [drillDownId, setDrillDownId] = useState<string | null>(null);
  const [drillDownName, setDrillDownName] = useState<string | null>(null);

  const [sortKey, setSortKey] = useState<'name' | 'description' | 'allocation2026'>('allocation2026');
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc');

  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsCategoryDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handleDrillDown = (id: string, name: string) => {
    setDrillDownId(id);
    setDrillDownName(name);
    setSearchTerm('');
  };

  const clearDrillDown = () => {
    setDrillDownId(null);
    setDrillDownName(null);
  };

  const filteredData = useMemo(() => {
    return BUDGET_DATA.filter(item => {
      if (drillDownId) {
        return item.parentId === drillDownId;
      }

      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            (item.description && item.description.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(item.category);

      return matchesSearch && matchesCategory;
    }).sort((a, b) => {
      if (sortKey === 'name') {
        return sortOrder === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
      } else if (sortKey === 'allocation2026') {
        return sortOrder === 'asc' ? a.allocation2026 - b.allocation2026 : b.allocation2026 - a.allocation2026;
      }
      return 0;
    });
  }, [searchTerm, selectedCategories, sortKey, sortOrder, drillDownId]);

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

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden flex flex-col h-full animate-fade-in">
      <div className="p-6 border-b border-slate-100 bg-slate-50/30">
        <div className="flex flex-col gap-6">
           <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                {drillDownId && (
                  <button 
                    onClick={clearDrillDown}
                    className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-700 bg-white shadow-sm"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                )}
                <div>
                  <h2 className="text-xl font-bold text-slate-800">
                    {drillDownId ? `${drillDownName} Breakdown` : 'Budget Explorer'}
                  </h2>
                  {drillDownId && <p className="text-xs text-slate-500 font-medium">Viewing Vol 2 A-D: Districts & Flagship Projects</p>}
                </div>
              </div>
           </div>

          {!drillDownId ? (
            <div className="flex flex-col md:flex-row gap-4 items-end bg-white p-4 rounded-xl border border-slate-200 shadow-sm relative z-20">
              <div className="relative w-full md:flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search sectors, agencies, provinces..."
                    className="pl-9 pr-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full bg-slate-50"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
              </div>

              <div className="flex flex-col gap-1 w-full md:w-auto relative" ref={dropdownRef}>
                  <button
                    onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
                    className="flex items-center justify-between gap-2 px-4 py-2.5 bg-white border border-slate-300 rounded-lg text-sm text-slate-700 hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100 min-w-[180px]"
                  >
                    <span className="truncate flex items-center gap-2">
                      <Filter className="w-4 h-4 text-slate-400" />
                      {selectedCategories.length === 0 ? 'Select Category' : `${selectedCategories.length} Categories`}
                    </span>
                    <ChevronDown className="w-4 h-4 text-slate-500" />
                  </button>
                  {isCategoryDropdownOpen && (
                    <div className="absolute top-full mt-2 w-full min-w-[200px] bg-white border border-slate-200 rounded-xl shadow-xl z-50 p-2">
                      {CATEGORIES.map(cat => (
                        <label key={cat} className="flex items-center px-3 py-2.5 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors group">
                          <div className={`w-4 h-4 border rounded mr-3 flex items-center justify-center ${selectedCategories.includes(cat) ? 'bg-blue-600 border-blue-600' : 'border-slate-300'}`}>
                              {selectedCategories.includes(cat) && <Check className="w-3 h-3 text-white" />}
                          </div>
                          <input type="checkbox" className="hidden" checked={selectedCategories.includes(cat)} onChange={() => toggleCategory(cat)} />
                          <span className="text-sm text-slate-700 font-medium">{cat}</span>
                        </label>
                      ))}
                    </div>
                  )}
              </div>
            </div>
          ) : (
            <div className="bg-blue-900 text-white p-4 rounded-xl flex flex-col md:flex-row items-center justify-between gap-4">
               <div className="flex items-start gap-3">
                  <div className="p-2 bg-blue-800 rounded-lg mt-1"><Info className="w-5 h-5 text-blue-300" /></div>
                  <div>
                    <h4 className="font-bold text-sm">Provincial Priorities (Volume 2)</h4>
                    <p className="text-xs text-blue-200 leading-relaxed max-w-xl">
                      Allocations reflect DSIP, Provincial Capitals, and key sector projects targeted for the 2026 fiscal year.
                    </p>
                  </div>
               </div>
            </div>
          )}
        </div>
      </div>

      <div className="overflow-x-auto flex-1">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-50 sticky top-0 z-10 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider cursor-pointer hover:bg-slate-100" onClick={() => toggleSort('name')}>
                Entity / Project Name <SortIcon active={sortKey === 'name'} />
              </th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Type</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right cursor-pointer hover:bg-slate-100" onClick={() => toggleSort('allocation2026')}>
                2026 Projection <SortIcon active={sortKey === 'allocation2026'} />
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredData.map((item) => (
              <tr key={item.id} className="hover:bg-blue-50/30 transition-colors group">
                <td className="px-6 py-4">
                  {item.category === 'Province' && !drillDownId ? (
                    <button onClick={() => handleDrillDown(item.id, item.name)} className="flex items-center gap-3 text-left group">
                      <div className="p-2 bg-slate-100 rounded-lg group-hover:bg-blue-100 transition-colors">
                        <Landmark className="w-4 h-4 text-slate-500 group-hover:text-blue-600" />
                      </div>
                      <div>
                        <div className="font-bold text-blue-700 group-hover:underline">{item.name}</div>
                        <div className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">View Districts & Projects</div>
                      </div>
                    </button>
                  ) : (
                    <div className="flex items-center gap-3">
                       <div className={`p-2 rounded-lg ${item.category === 'Agency' ? 'bg-amber-50 text-amber-600' : 'bg-slate-50 text-slate-400'}`}>
                          {item.category === 'Agency' ? <Briefcase className="w-4 h-4" /> : <Landmark className="w-4 h-4" />}
                       </div>
                       <div>
                         <div className="font-bold text-slate-800 text-sm">{item.name}</div>
                         {item.description && <div className="text-[10px] text-slate-400 font-medium">{item.description}</div>}
                       </div>
                    </div>
                  )}
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest
                    ${item.category === 'Sector' ? 'bg-slate-100 text-slate-600' : 
                      item.category === 'Agency' ? 'bg-amber-100 text-amber-800' :
                      item.category === 'Province' ? 'bg-indigo-100 text-indigo-800' :
                      'bg-blue-100 text-blue-800'}`}>
                    {item.category === 'Agency' ? 'Flagship Project' : item.category}
                  </span>
                </td>
                <td className="px-6 py-4 text-right font-mono text-sm font-bold text-slate-800">
                    {formatCurrency(item.allocation2026)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredData.length === 0 && (
          <div className="p-16 text-center text-slate-500">
            <p className="text-slate-800 font-bold text-lg">No records found.</p>
            {drillDownId && (
              <button onClick={clearDrillDown} className="mt-4 text-blue-600 font-bold hover:underline">
                Return to Provincial Overview
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DataExplorer;
