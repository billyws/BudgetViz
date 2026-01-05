
import React, { useState } from 'react';
import { LayoutDashboard, Table, ArrowRightLeft, FileText, Menu, X, Landmark, ExternalLink, Map } from 'lucide-react';
import Dashboard from './components/Dashboard';
import DataExplorer from './components/DataExplorer';
import ComparisonView from './components/ComparisonView';
import ProvincialMap from './components/ProvincialMap';
import { ViewMode } from './types';
import { KPMG_REPORT_URL, TREASURY_URL } from './constants';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewMode>(ViewMode.DASHBOARD);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const renderContent = () => {
    switch (currentView) {
      case ViewMode.DASHBOARD:
        return <Dashboard />;
      case ViewMode.EXPLORER:
        return <DataExplorer />;
      case ViewMode.COMPARE:
        return <ComparisonView />;
      case ViewMode.MAP:
        return <ProvincialMap />;
      default:
        return <Dashboard />;
    }
  };

  const NavItem = ({ mode, icon: Icon, label }: { mode: ViewMode, icon: any, label: string }) => (
    <button
      onClick={() => {
        setCurrentView(mode);
        setMobileMenuOpen(false);
      }}
      className={`flex items-center gap-3 px-4 py-3 rounded-lg w-full transition-colors ${
        currentView === mode 
          ? 'bg-blue-50 text-blue-700 font-medium' 
          : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
      }`}
    >
      <Icon className="w-5 h-5" />
      <span>{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row font-sans">
      {/* Sidebar (Desktop) */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-slate-200 h-screen sticky top-0">
        <div className="p-6 border-b border-slate-100">
          <div className="flex items-center gap-2 text-blue-800">
            <div className="bg-blue-600 p-2 rounded-lg">
               <Landmark className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-lg leading-tight">PNG Budget</h1>
              <span className="text-xs text-slate-500 font-medium">2026 Dashboard</span>
            </div>
          </div>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <NavItem mode={ViewMode.DASHBOARD} icon={LayoutDashboard} label="Overview" />
          <NavItem mode={ViewMode.MAP} icon={Map} label="Provincial Map" />
          <NavItem mode={ViewMode.EXPLORER} icon={Table} label="Data Explorer" />
          <NavItem mode={ViewMode.COMPARE} icon={ArrowRightLeft} label="Comparison" />
        </nav>

        <div className="p-4 border-t border-slate-100 space-y-4">
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
            <h4 className="text-xs font-semibold text-slate-500 uppercase mb-2">Government Source</h4>
            <p className="text-xs text-slate-400 mb-2">
              Based on projected 2026 National Budget Strategy.
            </p>
            <a 
              href={TREASURY_URL} 
              target="_blank" 
              rel="noreferrer"
              className="text-xs text-blue-600 hover:underline inline-flex items-center gap-1"
            >
              <FileText className="w-3 h-3" />
              Treasury Dept
            </a>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
            <h4 className="text-xs font-semibold text-blue-800 uppercase mb-2">Independent View</h4>
            <a 
              href={KPMG_REPORT_URL}
              target="_blank" 
              rel="noreferrer"
              className="text-xs text-blue-600 hover:underline inline-flex items-center gap-1 leading-snug"
            >
              <ExternalLink className="w-3 h-3 flex-shrink-0" />
              KPMG Budget Analysis
            </a>
          </div>
        </div>
      </aside>

      {/* Mobile Header */}
      <header className="md:hidden bg-white border-b border-slate-200 p-4 flex justify-between items-center sticky top-0 z-20">
        <div className="flex items-center gap-2 text-blue-800">
          <div className="bg-blue-600 p-1.5 rounded-lg">
             <Landmark className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold">PNG Budget 2026</span>
        </div>
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X className="text-slate-600" /> : <Menu className="text-slate-600" />}
        </button>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-10 bg-white pt-20 px-4">
           <nav className="space-y-2">
            <NavItem mode={ViewMode.DASHBOARD} icon={LayoutDashboard} label="Overview" />
            <NavItem mode={ViewMode.MAP} icon={Map} label="Provincial Map" />
            <NavItem mode={ViewMode.EXPLORER} icon={Table} label="Data Explorer" />
            <NavItem mode={ViewMode.COMPARE} icon={ArrowRightLeft} label="Comparison" />
          </nav>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto h-screen">
        <div className="max-w-7xl mx-auto">
          <header className="mb-8 hidden md:block">
            <h2 className="text-2xl font-bold text-slate-800">
              {currentView === ViewMode.DASHBOARD && 'Executive Summary'}
              {currentView === ViewMode.MAP && 'Provincial Equity Map'}
              {currentView === ViewMode.EXPLORER && 'Detailed Allocations'}
              {currentView === ViewMode.COMPARE && 'Budget Comparison'}
            </h2>
            <p className="text-slate-500">
              Analyzing the 2026 National Budget Strategy Paper
            </p>
          </header>
          
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default App;
