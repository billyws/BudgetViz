import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, 
  PieChart, Pie, Cell, AreaChart, Area
} from 'recharts';
import { BUDGET_DATA, SECTOR_DATA_2026, COLORS, formatCurrency, formatBillions, KPMG_INSIGHTS } from '../constants';
import { TrendingUp, Wallet, Landmark, Activity, Zap, AlertTriangle, CheckCircle, Info } from 'lucide-react';

const Dashboard: React.FC = () => {
  // Aggregate data for totals (Using Sector category as the primary aggregator to avoid double counting Agencies/Provinces if they are subsets)
  const totalBudget2026 = BUDGET_DATA
    .filter(i => i.category === 'Sector')
    .reduce((acc, curr) => acc + curr.allocation2026, 0);

  const totalBudget2025 = BUDGET_DATA
    .filter(i => i.category === 'Sector')
    .reduce((acc, curr) => acc + curr.allocation2025, 0);

  const growthRate = ((totalBudget2026 - totalBudget2025) / totalBudget2025) * 100;

  const provinceData = BUDGET_DATA
    .filter(i => i.category === 'Province')
    .sort((a, b) => b.allocation2026 - a.allocation2026);

  // Calculate sector growth rates for top risers
  const sectorGrowthData = BUDGET_DATA
    .filter(i => i.category === 'Sector')
    .map(item => ({
      name: item.name,
      growth: ((item.allocation2026 - item.allocation2025) / item.allocation2025) * 100
    }))
    .sort((a, b) => b.growth - a.growth)
    .slice(0, 5); // Top 5

  const trendData = [
    { year: '2024', amount: 24500000000 },
    { year: '2025', amount: 26500000000 },
    { year: '2026', amount: 29500000000 }, // Simulated total
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-500 font-medium">Total Budget 2026</p>
            <h3 className="text-2xl font-bold text-slate-800">{formatBillions(totalBudget2026)}</h3>
          </div>
          <div className="p-3 bg-blue-50 rounded-full">
            <Wallet className="w-6 h-6 text-blue-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-500 font-medium">YoY Growth</p>
            <h3 className="text-2xl font-bold text-green-600">+{growthRate.toFixed(1)}%</h3>
            <p className="text-xs text-green-600/80 font-medium mt-1">2025 vs 2026</p>
          </div>
          <div className="p-3 bg-green-50 rounded-full">
            <TrendingUp className="w-6 h-6 text-green-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-500 font-medium">Top Sector</p>
            <h3 className="text-2xl font-bold text-slate-800">Infrastructure</h3>
          </div>
          <div className="p-3 bg-orange-50 rounded-full">
            <Activity className="w-6 h-6 text-orange-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-500 font-medium">Provinces Funded</p>
            <h3 className="text-2xl font-bold text-slate-800">22</h3>
          </div>
          <div className="p-3 bg-purple-50 rounded-full">
            <Landmark className="w-6 h-6 text-purple-600" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sector Distribution */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-bold text-slate-800 mb-4">2026 Sector Allocation</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={SECTOR_DATA_2026}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {SECTOR_DATA_2026.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: number) => formatCurrency(value)}
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0' }}
                />
                <Legend layout="vertical" verticalAlign="middle" align="right" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Fastest Growing Sectors */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
           <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-slate-800">Fastest Growing Sectors (25-26)</h3>
            <div className="p-2 bg-yellow-50 rounded-full">
              <Zap className="w-5 h-5 text-yellow-500" />
            </div>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={sectorGrowthData}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                <XAxis type="number" tickFormatter={(val) => `+${val}%`} />
                <YAxis dataKey="name" type="category" width={150} tick={{fontSize: 12}} />
                <Tooltip 
                  cursor={{fill: 'transparent'}}
                  formatter={(value: number) => [`+${value.toFixed(1)}%`, 'Growth']}
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0' }}
                />
                <Bar dataKey="growth" fill="#10B981" radius={[0, 4, 4, 0]} barSize={25} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
         {/* Historical Trend */}
         <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-bold text-slate-800 mb-4">Total Budget Trend (3 Years)</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={trendData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="year" />
                <YAxis tickFormatter={(val) => `K${val / 1000000000}B`} />
                <Tooltip 
                  formatter={(value: number) => formatCurrency(value)}
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0' }}
                />
                <Area type="monotone" dataKey="amount" stroke="#0088FE" fill="#0088FE" fillOpacity={0.1} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Provincial Breakdown */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-bold text-slate-800 mb-4">Top Provincial Allocations (2026)</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={provinceData}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                <XAxis type="number" tickFormatter={(val) => `K${val / 1000000}M`} />
                <YAxis dataKey="name" type="category" width={150} tick={{fontSize: 12}} />
                <Tooltip 
                  cursor={{fill: 'transparent'}}
                  formatter={(value: number) => formatCurrency(value)}
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0' }}
                />
                <Bar dataKey="allocation2026" fill="#00C49F" radius={[0, 4, 4, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* External Analysis Section */}
      <div className="bg-slate-800 rounded-xl shadow-sm overflow-hidden text-white">
        <div className="p-6 border-b border-slate-700 flex justify-between items-center">
          <div>
            <h3 className="text-lg font-bold">External Analysis: KPMG Perspective</h3>
            <p className="text-slate-400 text-sm">Independent review of the 2026 Budget Strategy</p>
          </div>
          <a href="#" className="text-blue-400 text-sm hover:underline flex items-center gap-1">
             Read Full Report <Info className="w-4 h-4" />
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-slate-700">
           {KPMG_INSIGHTS.map((insight, idx) => (
             <div key={idx} className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  {insight.sentiment === 'warning' && <AlertTriangle className="w-5 h-5 text-amber-500" />}
                  {insight.sentiment === 'negative' && <AlertTriangle className="w-5 h-5 text-red-500" />}
                  {insight.sentiment === 'positive' && <CheckCircle className="w-5 h-5 text-green-500" />}
                  <h4 className="font-semibold text-slate-200">{insight.title}</h4>
                </div>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {insight.description}
                </p>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;