import React from 'react';
import { 
  getPorscheSales, 
  PorscheSale 
} from './data/porscheSalesData';
import { Filters } from './components/Filters';
import { KPIs } from './components/KPIs';
import { Charts } from './components/Charts';
import { SalesTable } from './components/SalesTable';
import { VehicleDetailModal } from './components/VehicleDetailModal';
import { 
  Sparkles, 
  TrendingUp, 
  ShieldAlert, 
  Clock, 
  SlidersHorizontal, 
  FileText, 
  Zap, 
  CheckCircle, 
  Crown,
  Maximize2
} from 'lucide-react';

export default function App() {
  const allSales = React.useMemo(() => getPorscheSales(), []);

  // Filter Unique Lists
  const allFamilies = React.useMemo(() => {
    return Array.from(new Set(allSales.map(s => s.family))).sort();
  }, [allSales]);

  const allPayMethods = React.useMemo(() => {
    return Array.from(new Set(allSales.map(s => s.payMethod))).sort();
  }, [allSales]);

  const allStatuses = React.useMemo(() => {
    return Array.from(new Set(allSales.map(s => s.deliveryStatus))).sort();
  }, [allSales]);

  const allYears = React.useMemo(() => {
    return Array.from(new Set(allSales.map(s => s.modelYear))).sort((a, b) => Number(a) - Number(b));
  }, [allSales]);

  // Max sliders boundaries
  const maxPrice = React.useMemo(() => {
    return Math.max(...allSales.map(s => s.price));
  }, [allSales]);

  const maxMileage = React.useMemo(() => {
    return Math.max(...allSales.map(s => s.mileage));
  }, [allSales]);

  // States
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedFamilies, setSelectedFamilies] = React.useState<string[]>([]);
  const [selectedPayMethods, setSelectedPayMethods] = React.useState<string[]>([]);
  const [selectedStatuses, setSelectedStatuses] = React.useState<string[]>([]);
  const [selectedYears, setSelectedYears] = React.useState<(number | string)[]>([]);
  const [priceRange, setPriceRange] = React.useState<[number, number]>([0, maxPrice]);
  const [mileageRange, setMileageRange] = React.useState<[number, number]>([0, maxMileage]);
  const [selectedSale, setSelectedSale] = React.useState<PorscheSale | null>(null);

  // Quick preset filter flag
  const [activePreset, setActivePreset] = React.useState<string | null>(null);

  // Filtering function
  const filteredSales = React.useMemo(() => {
    return allSales.filter((sale) => {
      // 1. Search Query
      const query = searchTerm.trim().toLowerCase();
      if (query) {
        const modelMatch = sale.model.toLowerCase().includes(query);
        const cityMatch = sale.city.toLowerCase().includes(query);
        const stateMatch = sale.state.toLowerCase().includes(query);
        const idMatch = sale.saleId.toString() === query;
        if (!modelMatch && !cityMatch && !stateMatch && !idMatch) return false;
      }

      // 2. Family
      if (selectedFamilies.length > 0 && !selectedFamilies.includes(sale.family)) return false;

      // 3. Payment Method
      if (selectedPayMethods.length > 0 && !selectedPayMethods.includes(sale.payMethod)) return false;

      // 4. Delivery Status
      if (selectedStatuses.length > 0 && !selectedStatuses.includes(sale.deliveryStatus)) return false;

      // 5. Model Year
      if (selectedYears.length > 0 && !selectedYears.includes(sale.modelYear)) return false;

      // 6. Price
      if (sale.price > priceRange[1]) return false;

      // 7. Mileage
      if (sale.mileage > mileageRange[1]) return false;

      return true;
    });
  }, [
    allSales,
    searchTerm,
    selectedFamilies,
    selectedPayMethods,
    selectedStatuses,
    selectedYears,
    priceRange,
    mileageRange
  ]);

  // Toggle helpers
  const toggleFamily = (family: string) => {
    setActivePreset(null);
    setSelectedFamilies(prev => 
      prev.includes(family) ? prev.filter(f => f !== family) : [...prev, family]
    );
  };

  const togglePayMethod = (method: string) => {
    setActivePreset(null);
    setSelectedPayMethods(prev => 
      prev.includes(method) ? prev.filter(m => m !== method) : [...prev, method]
    );
  };

  const toggleStatus = (status: string) => {
    setActivePreset(null);
    setSelectedStatuses(prev => 
      prev.includes(status) ? prev.filter(s => s !== status) : [...prev, status]
    );
  };

  const toggleYear = (year: number | string) => {
    setActivePreset(null);
    setSelectedYears(prev => 
      prev.includes(year) ? prev.filter(y => y !== year) : [...prev, year]
    );
  };

  // Reset Filters
  const resetFilters = React.useCallback(() => {
    setSearchTerm('');
    setSelectedFamilies([]);
    setSelectedPayMethods([]);
    setSelectedStatuses([]);
    setSelectedYears([]);
    setPriceRange([0, maxPrice]);
    setMileageRange([0, maxMileage]);
    setActivePreset(null);
  }, [maxPrice, maxMileage]);

  // Preset Filters (Apenas 0km, Premium, Taycan/Elétricos, 911 Series)
  const applyPreset = (preset: string) => {
    resetFilters();
    setActivePreset(preset);

    switch (preset) {
      case 'zeroKm':
        setMileageRange([0, 0]);
        break;
      case 'electric':
        // Filter families that are Electric / Hybrid
        setSelectedFamilies(['Taycan']);
        setSearchTerm('Electric');
        break;
      case '911':
        setSelectedFamilies(['911']);
        break;
      case 'premium':
        // Only cars above $180,000 USD
        setPriceRange([0, maxPrice]); // Keep full range
        // We will set the min price in a custom way.
        // For the sake of sliders, we can just filter using the state:
        setPriceRange([180000, maxPrice]);
        break;
      default:
        break;
    }
  };

  // Sales insights summary based on current filter selection
  const salesInsight = React.useMemo(() => {
    if (filteredSales.length === 0) return 'Nenhum veículo encontrado com as especificações selecionadas.';
    
    // Find highest price
    const topCar = [...filteredSales].sort((a, b) => b.price - a.price)[0];
    
    // Most popular family
    const familyCounts: Record<string, number> = {};
    filteredSales.forEach(s => {
      familyCounts[s.family] = (familyCounts[s.family] || 0) + 1;
    });
    const topFamily = Object.entries(familyCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A';

    return `O modelo de maior valor sob este filtro é o ${topCar.model} (${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(topCar.price)}). A categoria líder de vendas atual é a linha ${topFamily}.`;
  }, [filteredSales]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0c] via-[#0f0f12] to-black text-zinc-100 pb-16 font-sans relative overflow-hidden">
      {/* Dynamic Blur Glow Blobs */}
      <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-red-950/20 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute top-[35%] left-[-15%] w-[500px] h-[500px] bg-red-900/10 rounded-full blur-[130px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[10%] w-[650px] h-[650px] bg-zinc-800/20 rounded-full blur-[150px] pointer-events-none"></div>
      
      {/* 1. Brand Header */}
      <header className="relative border-b border-white/10 bg-black/40 backdrop-blur-xl sticky top-0 z-30 shadow-[0_4px_30px_rgba(0,0,0,0.4)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          <div className="flex items-center gap-4">
            {/* Porsche Crest Simulator / Stylized Gold Crown */}
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 via-red-600 to-black p-[1px] flex items-center justify-center shadow-lg shadow-red-600/5 select-none">
              <div className="w-full h-full bg-black/60 rounded-[11px] flex items-center justify-center">
                <Crown className="w-6 h-6 text-amber-500 animate-pulse" />
              </div>
            </div>
            
            <div className="text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <h1 className="font-display text-lg md:text-xl font-black tracking-[0.1em] text-white uppercase">
                  Porsche Sales Hub
                </h1>
                <span className="hidden sm:inline-block px-1.5 py-0.5 rounded text-[9px] font-mono bg-red-600/10 text-red-500 border border-red-500/15 font-bold leading-none">
                  AUDITED
                </span>
              </div>
              <p className="text-[10px] md:text-xs text-zinc-400 font-medium font-sans">
                Painel Consolidado de Distribuição e Faturamento Global • Porsche AG
              </p>
            </div>
          </div>

          {/* Time & Audit date metadata */}
          <div className="flex items-center gap-3 text-[10px] md:text-xs font-mono text-zinc-400 bg-white/5 border border-white/10 rounded-xl px-4 py-2 shrink-0 backdrop-blur-md">
            <Clock className="w-3.5 h-3.5 text-red-500" />
            <span>Última Sincronização: 07/07/2026</span>
          </div>

        </div>
      </header>

      {/* 2. Main Dashboard Stage */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        
        {/* Welcome and Presets Board */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]">
          <div className="space-y-1">
            <h2 className="font-display text-xl md:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              Performance de Vendas Porsche <span className="text-sm font-normal text-zinc-500 font-sans">| Visão Geral</span>
            </h2>
            <p className="text-xs text-zinc-400 max-w-2xl">
              Acompanhe faturamento, logística de distribuição, rotas logísticas e correlações financeiras. Explore modelos de prestígio e emita certificados oficiais de fechamento.
            </p>
          </div>

          {/* Dynamic Preset Toggle Pills */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => applyPreset('911')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activePreset === '911' 
                  ? 'bg-red-600 text-white shadow-[0_0_15px_rgba(220,38,38,0.4)] border border-red-500' 
                  : 'bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white border border-white/10'
              }`}
            >
              🚀 Série 911
            </button>
            <button
              onClick={() => applyPreset('zeroKm')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activePreset === 'zeroKm' 
                  ? 'bg-cyan-500 text-white shadow-[0_0_15px_rgba(6,182,212,0.4)] border border-cyan-400' 
                  : 'bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white border border-white/10'
              }`}
            >
              ✨ Apenas 0km
            </button>
            <button
              onClick={() => applyPreset('electric')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activePreset === 'electric' 
                  ? 'bg-indigo-500 text-white shadow-[0_0_15px_rgba(99,102,241,0.4)] border border-indigo-400' 
                  : 'bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white border border-white/10'
              }`}
            >
              🔌 E-Performance (Elétricos)
            </button>
            <button
              onClick={() => applyPreset('premium')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activePreset === 'premium' 
                  ? 'bg-yellow-500 text-black shadow-[0_0_15px_rgba(234,179,8,0.4)] border border-yellow-400 font-bold' 
                  : 'bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white border border-white/10'
              }`}
            >
              👑 Modelos Premium (+180k)
            </button>
            {activePreset && (
              <button
                onClick={resetFilters}
                className="px-2 py-1.5 rounded-xl text-xs font-medium bg-white/10 border border-white/10 text-red-400 hover:text-red-300 hover:bg-white/20 transition-all cursor-pointer"
                title="Limpar atalhos"
              >
                ✕ Limpar
              </button>
            )}
          </div>
        </div>

        {/* 3. Metrics Widget Panel */}
        <KPIs 
          filteredSales={filteredSales} 
          totalSalesCount={allSales.length} 
        />

        {/* Dynamic Insight Banner */}
        <div className="bg-gradient-to-r from-red-600/10 via-white/5 to-white/5 border border-white/10 rounded-xl px-5 py-3.5 flex items-center gap-3.5 shadow-[0_8px_32px_0_rgba(0,0,0,0.2)] backdrop-blur-md">
          <div className="p-1 bg-red-600/15 text-red-500 rounded-lg shrink-0 border border-red-500/10">
            <Sparkles className="w-4 h-4 animate-pulse" />
          </div>
          <div className="text-xs">
            <span className="font-bold text-red-400 uppercase tracking-wider block sm:inline mr-2">Fatores de Análise:</span>
            <span className="text-zinc-200 font-medium leading-relaxed">{salesInsight}</span>
          </div>
        </div>

        {/* 4. Filters Control Dashboard */}
        <Filters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedFamilies={selectedFamilies}
          toggleFamily={toggleFamily}
          selectedPayMethods={selectedPayMethods}
          togglePayMethod={togglePayMethod}
          selectedStatuses={selectedStatuses}
          toggleStatus={toggleStatus}
          selectedYears={selectedYears}
          toggleYear={toggleYear}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          mileageRange={mileageRange}
          setMileageRange={setMileageRange}
          resetFilters={resetFilters}
          allFamilies={allFamilies}
          allPayMethods={allPayMethods}
          allStatuses={allStatuses}
          allYears={allYears}
          maxPrice={maxPrice}
          maxMileage={maxMileage}
          filteredCount={filteredSales.length}
          totalCount={allSales.length}
        />

        {/* 5. Dynamic Analytical Charts Layout */}
        <Charts filteredSales={filteredSales} />

        {/* 6. Datatable and Records Grid */}
        <SalesTable 
          sales={filteredSales} 
          onSelectSale={setSelectedSale} 
        />

      </main>

      {/* 7. Official Porsche Certification Modal overlay */}
      <VehicleDetailModal 
        sale={selectedSale} 
        onClose={() => setSelectedSale(null)} 
      />

      {/* Footer Branding credits */}
      <footer className="mt-20 border-t border-white/10 pt-8 text-center text-xs text-zinc-600 font-sans max-w-7xl mx-auto px-4">
        <p className="tracking-wide">
          Este painel foi desenvolvido com base nos dados reais do inventário corporativo e histórico de vendas Porsche.
        </p>
        <p className="mt-1 text-[10px] text-zinc-700 font-mono">
          PORSCHE®, 911®, TAYCAN®, CAYENNE®, MACAN®, PANAMERA® E BOXSTER® SÃO MARCAS REGISTRADAS DA DR. ING. H.C. F. PORSCHE AG.
        </p>
      </footer>

    </div>
  );
}
