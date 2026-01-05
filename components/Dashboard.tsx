
import React, { useState, useMemo } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, 
  PieChart, Pie, Cell, Label
} from 'recharts';
import { BUDGET_DATA, SECTOR_DATA_2026, REVENUE_DATA_2026, COLORS, formatCurrency, formatBillions, KPMG_INSIGHTS, FISCAL_METRICS } from '../constants';
import { TrendingUp, Wallet, Activity, Zap, AlertTriangle, CheckCircle, Users, Coins, TrendingDown, Landmark, ChevronRight, ArrowLeft, ArrowUpRight } from 'lucide-react';

const Dashboard: React.FC = () => {
  const [activeSectorId, setActiveSectorId] = useState<string | null>(null);
  const [activeRevenueId, setActiveRevenueId] = useState<string | null>(null);

  const totalBudget2026 = FISCAL_METRICS.totalExpenditure;
  const totalRevenue2026 = FISCAL_METRICS.totalRevenue;

  // Efficiency data
  const expenditureSplitData = [
    { name: 'Operational', value: FISCAL_METRICS.operationalExp, color: '#3B82F6' },
    { name: 'Capital / PIP', value: FISCAL_METRICS.capitalExp, color: '#60A5FA' },
    { name: 'Interest/Debt', value: totalBudget2026 - (FISCAL_METRICS.operationalExp + FISCAL_METRICS.capitalExp), color: '#93C5FD' }
  ];

  const perCapitaData = [
    { name: 'National Avg', value: FISCAL_METRICS.nationalPerCapita, type: 'Total' },
    { name: 'Education', value: 480, type: 'Sector' },
    { name: 'Health (PHA)', value: 144, type: 'Sector' },
    { name: 'Infrastructure', value: 666, type: 'Sector' }
  ];

  // Top Spending Priorities (Top 6 Sectors)
  const topPriorities = useMemo(() => {
    return SECTOR_DATA_2026.slice(0, 6);
  }, []);

  // Primary Revenue Streams (Top 5 Revenue Items)
  const topRevenue = useMemo(() => {
    return REVENUE_DATA_2026.slice(0, 5);
  }, []);

  // Drill-down data logic
  const sectorDrillDownData = useMemo(() => {
    if (!activeSectorId) return SECTOR_DATA_2026;
    return BUDGET_DATA
      .filter(b => b.parentId === activeSectorId)
      .map((b, index) => ({
        name: b.name,
        value: b.allocation2026,
        color: COLORS[index % COLORS.length],
        id: b.id
      }));
  }, [activeSectorId]);

  const revenueDrillDownData = useMemo(() => {
    if (!activeRevenueId) return REVENUE_DATA_2026;
    return BUDGET_DATA
      .filter(b => b.parentId === activeRevenueId)
      .map((b, index) => ({
        name: b.name,
        value: b.allocation2026,
        color: ['#10B981', '#059669', '#047857', '#065F46', '#064E3B'][index % 5],
        id: b.id
      }));
  }, [activeRevenueId]);

  const activeSectorName = BUDGET_DATA.find(b => b.id === activeSectorId)?.name || "All Sectors";
  const activeRevenueName = BUDGET_DATA.find(b => b.id === activeRevenueId)?.name || "All Sources";

  return (
    <div className="space-y-6 animate-fade-in">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-500 font-medium">Total Expenditure</p>
            <h3 className="text-2xl font-bold text-slate-800">{formatBillions(totalBudget2026)}</h3>
          </div>
          <div className="p-3 bg-blue-50 rounded-full">
            <Wallet className="w-6 h-6 text-blue-600" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-500 font-medium">Total Revenue</p>
            <h3 className="text-2xl font-bold text-emerald-600">{formatBillions(totalRevenue2026)}</h3>
            <p className="text-[10px] text-slate-400 mt-1 uppercase font-bold tracking-tighter">88% Internally Funded</p>
          </div>
          <div className="p-3 bg-emerald-50 rounded-full">
            <Coins className="w-6 h-6 text-emerald-600" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-500 font-medium">Deficit % of GDP</p>
            <h3 className="text-2xl font-bold text-slate-800">{FISCAL_METRICS.deficitGdp}%</h3>
            <div className="flex items-center gap-1 mt-1">
              <TrendingDown className="w-3 h-3 text-emerald-500" />
              <p className="text-xs text-emerald-500 font-medium">Consolidation Path</p>
            </div>
          </div>
          <div className="p-3 bg-indigo-50 rounded-full">
            <Activity className="w-6 h-6 text-indigo-600" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-500 font-medium">Debt-to-GDP Ratio</p>
            <h3 className="text-2xl font-bold text-slate-800">{FISCAL_METRICS.debtGdp}%</h3>
            <div className="flex items-center gap-1 mt-1">
              <TrendingDown className="w-3 h-3 text-emerald-500" />
              <p className="text-xs text-emerald-500 font-medium">Targeted Reduction</p>
            </div>
          </div>
          <div className="p-3 bg-slate-50 rounded-full">
            <Landmark className="w-6 h-6 text-slate-600" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Interactive Expenditure Drill-down */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex flex-col min-h-[450px]">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                Expenditure by Sector
              </h3>
              <p className="text-xs text-slate-500">{activeSectorId ? `Drill-down: ${activeSectorName}` : 'Click slice to explore agencies'}</p>
            </div>
            {activeSectorId && (
              <button 
                onClick={() => setActiveSectorId(null)}
                className="flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-800 bg-blue-50 px-2 py-1 rounded"
              >
                <ArrowLeft className="w-3 h-3" /> Back
              </button>
            )}
          </div>
          <div className="flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie 
                  data={sectorDrillDownData} 
                  innerRadius={70} 
                  outerRadius={100} 
                  dataKey="value" 
                  paddingAngle={5}
                  onClick={(data) => {
                    if (!activeSectorId && data.id) setActiveSectorId(data.id);
                  }}
                  className="cursor-pointer focus:outline-none"
                >
                  {sectorDrillDownData.map((entry, index) => (
                    <Cell key={`cell-exp-${index}`} fill={entry.color} />
                  ))}
                  <Label 
                    value={activeSectorId ? activeSectorName : "Sectors"} 
                    position="center" 
                    style={{ fontSize: '12px', fontWeight: 'bold', fill: '#1e293b' }}
                  />
                </Pie>
                <Tooltip formatter={(val: number) => formatCurrency(val)} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {sectorDrillDownData.slice(0, 4).map((item, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></div>
                <span className="text-[10px] font-bold text-slate-600 truncate">{item.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Revenue Drill-down */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex flex-col min-h-[450px]">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <Coins className="w-5 h-5 text-emerald-600" />
                Revenue Generation Sources
              </h3>
              <p className="text-xs text-slate-500">{activeRevenueId ? `Drill-down: ${activeRevenueName}` : 'Click slice to see details'}</p>
            </div>
            {activeRevenueId && (
              <button 
                onClick={() => setActiveRevenueId(null)}
                className="flex items-center gap-1 text-xs font-bold text-emerald-600 hover:text-emerald-800 bg-emerald-50 px-2 py-1 rounded"
              >
                <ArrowLeft className="w-3 h-3" /> Back
              </button>
            )}
          </div>
          <div className="flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie 
                  data={revenueDrillDownData} 
                  innerRadius={70} 
                  outerRadius={100} 
                  dataKey="value" 
                  paddingAngle={5}
                  onClick={(data) => {
                    if (!activeRevenueId && data.id) setActiveRevenueId(data.id);
                  }}
                  className="cursor-pointer focus:outline-none"
                >
                  {revenueDrillDownData.map((entry, index) => (
                    <Cell key={`cell-rev-${index}`} fill={entry.color} />
                  ))}
                  <Label 
                    value={activeRevenueId ? activeRevenueName : "Sources"} 
                    position="center" 
                    style={{ fontSize: '12px', fontWeight: 'bold', fill: '#1e293b' }}
                  />
                </Pie>
                <Tooltip formatter={(val: number) => formatCurrency(val)} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {revenueDrillDownData.slice(0, 4).map((item, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></div>
                <span className="text-[10px] font-bold text-slate-600 truncate">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top 2026 Spending Priorities */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-500" />
            Top 2026 Spending Priorities
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topPriorities} layout="vertical" margin={{ left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} opacity={0.3} />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" width={110} tick={{ fontSize: 10, fontWeight: 'bold' }} />
                <Tooltip formatter={(val: number) => formatCurrency(val)} />
                <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={20}>
                  {topPriorities.map((entry, index) => (
                    <Cell key={`cell-tp-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 bg-slate-50 p-3 rounded-lg flex justify-between items-center">
            <span className="text-[11px] font-bold text-slate-500 uppercase">Lead Priority</span>
            <span className="text-xs font-black text-blue-700 uppercase">{topPriorities[0].name}</span>
          </div>
        </div>

        {/* Primary Revenue Streams */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
            <ArrowUpRight className="w-5 h-5 text-emerald-500" />
            Primary Revenue Streams
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topRevenue} layout="vertical" margin={{ left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} opacity={0.3} />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" width={110} tick={{ fontSize: 10, fontWeight: 'bold' }} />
                <Tooltip formatter={(val: number) => formatCurrency(val)} />
                <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={20}>
                  {topRevenue.map((entry, index) => (
                    <Cell key={`cell-tr-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 bg-slate-50 p-3 rounded-lg flex justify-between items-center">
            <span className="text-[11px] font-bold text-slate-500 uppercase">Top Contributor</span>
            <span className="text-xs font-black text-emerald-700 uppercase">{topRevenue[0].name}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Spending Efficiency (Kept for context) */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
            <Zap className="w-5 h-5 text-indigo-500" />
            Spending Efficiency: Op vs Cap
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={expenditureSplitData} innerRadius={60} outerRadius={90} dataKey="value" paddingAngle={5}>
                  {expenditureSplitData.map((entry, index) => (
                    <Cell key={`cell-eff-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(val: number) => formatCurrency(val)} />
                <Legend verticalAlign="bottom" height={36}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 p-4 bg-slate-50 rounded-lg">
             <div className="flex justify-between items-center text-xs font-bold text-slate-500 uppercase">
                <span>Total Capital / PIP</span>
                <span className="text-blue-600 font-black">{formatBillions(FISCAL_METRICS.capitalExp)}</span>
             </div>
          </div>
        </div>

        {/* Per Capita Analysis (Kept for context) */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
            <Users className="w-5 h-5 text-purple-500" />
            Social Context: Per Capita Analysis
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={perCapitaData} layout="vertical" margin={{ left: 20 }}>
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" width={100} tick={{ fontSize: 11, fontWeight: 'bold' }} />
                <Tooltip formatter={(val: number) => `PGK ${val.toLocaleString()} / person`} />
                <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={25}>
                   {perCapitaData.map((entry, index) => (
                     <Cell key={`cell-pc-${index}`} fill={entry.type === 'Total' ? '#4F46E5' : '#818CF8'} />
                   ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 p-4 bg-slate-50 rounded-lg">
             <p className="text-[10px] text-slate-500 italic">National average spending is approximately K3,035 per person for the 2026 fiscal year.</p>
          </div>
        </div>
      </div>

      {/* Analysis Section */}
      <div className="bg-slate-800 rounded-xl shadow-sm overflow-hidden text-white border border-slate-700">
        <div className="p-6 border-b border-slate-700 flex justify-between items-center">
          <div>
            <h3 className="text-lg font-bold">2026 Strategy Perspectives</h3>
            <p className="text-slate-400 text-sm">Key updates from Volume 1 & Strategy Papers</p>
          </div>
          <div className="hidden md:block">
             <Landmark className="w-8 h-8 text-slate-600" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 bg-slate-700 gap-px border-t border-slate-700">
           {KPMG_INSIGHTS.map((insight, idx) => (
             <div key={idx} className="p-6 bg-slate-800 hover:bg-slate-750 transition-colors">
                <div className="flex items-center gap-2 mb-2">
                  {insight.sentiment === 'warning' && <AlertTriangle className="w-5 h-5 text-amber-500" />}
                  {insight.sentiment === 'positive' && <CheckCircle className="w-5 h-5 text-green-500" />}
                  <h4 className="font-semibold text-slate-200 text-sm">{insight.title}</h4>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">{insight.description}</p>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
