import React from 'react';
import { Search, SlidersHorizontal, RotateCcw, Calendar, DollarSign, Gauge, Car, CreditCard, Activity } from 'lucide-react';

interface FiltersProps {
  searchTerm: string;
  setSearchTerm: (val: string) => void;
  selectedFamilies: string[];
  toggleFamily: (family: string) => void;
  selectedPayMethods: string[];
  togglePayMethod: (method: string) => void;
  selectedStatuses: string[];
  toggleStatus: (status: string) => void;
  selectedYears: (number | string)[];
  toggleYear: (year: number | string) => void;
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  mileageRange: [number, number];
  setMileageRange: (range: [number, number]) => void;
  resetFilters: () => void;
  allFamilies: string[];
  allPayMethods: string[];
  allStatuses: string[];
  allYears: (number | string)[];
  maxPrice: number;
  maxMileage: number;
  filteredCount: number;
  totalCount: number;
}

export const Filters: React.FC<FiltersProps> = ({
  searchTerm,
  setSearchTerm,
  selectedFamilies,
  toggleFamily,
  selectedPayMethods,
  togglePayMethod,
  selectedStatuses,
  toggleStatus,
  selectedYears,
  toggleYear,
  priceRange,
  setPriceRange,
  mileageRange,
  setMileageRange,
  resetFilters,
  allFamilies,
  allPayMethods,
  allStatuses,
  allYears,
  maxPrice,
  maxMileage,
  filteredCount,
  totalCount,
}) => {
  const [isOpen, setIsOpen] = React.useState(true);

  return (
    <div id="filter-panel" className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-md shadow-2xl transition-all duration-300">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-4 mb-5">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-red-600/10 text-red-500 rounded-lg border border-red-500/20">
            <SlidersHorizontal className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-display text-lg font-bold tracking-tight text-white flex items-center gap-2">
              Painel de Filtros <span className="text-xs font-mono font-normal text-zinc-400">({filteredCount} de {totalCount} veículos)</span>
            </h2>
            <p className="text-xs text-zinc-400">Refine a busca por modelos, valores, períodos e localizações</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={resetFilters}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold border border-white/10 bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white transition-all cursor-pointer"
            title="Resetar filtros"
          >
            <RotateCcw className="w-3.5 h-3.5 text-red-500" />
            Limpar Filtros
          </button>
          
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden px-3 py-1.5 rounded-lg text-xs font-semibold bg-white/10 border border-white/10 text-white cursor-pointer hover:bg-white/20"
          >
            {isOpen ? 'Ocultar' : 'Mostrar'} Filtros
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Col 1: Search & Sliders */}
          <div className="md:col-span-4 space-y-5">
            {/* Search Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-zinc-400 flex items-center gap-1.5">
                <Search className="w-3.5 h-3.5 text-zinc-500" />
                Busca de Modelos e Cidades
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Ex: 911 Turbo, Boston, MA..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 pl-10 text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-red-600 focus:border-red-500 transition-all shadow-inner"
                />
                <Search className="absolute left-3.5 top-3 w-4 h-4 text-zinc-500 pointer-events-none" />
                {searchTerm && (
                  <button 
                    onClick={() => setSearchTerm('')} 
                    className="absolute right-3.5 top-2.5 text-xs text-zinc-500 hover:text-zinc-300"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>

            {/* Price Slider */}
            <div className="space-y-2 bg-white/5 border border-white/10 rounded-xl p-3.5">
              <div className="flex justify-between items-center text-xs font-medium">
                <span className="text-zinc-400 flex items-center gap-1.5">
                  <DollarSign className="w-3.5 h-3.5 text-emerald-500" />
                  Preço Máximo
                </span>
                <span className="font-mono text-emerald-400 text-xs">
                  {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'USD' }).format(priceRange[1])}
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={maxPrice}
                step={5000}
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], parseFloat(e.target.value)])}
                className="w-full accent-red-600 cursor-pointer h-1.5 bg-white/10 rounded-lg appearance-none"
              />
              <div className="flex justify-between text-[10px] text-zinc-500 font-mono">
                <span>$0</span>
                <span>Max: {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(maxPrice)}</span>
              </div>
            </div>

            {/* Mileage Slider */}
            <div className="space-y-2 bg-white/5 border border-white/10 rounded-xl p-3.5">
              <div className="flex justify-between items-center text-xs font-medium">
                <span className="text-zinc-400 flex items-center gap-1.5">
                  <Gauge className="w-3.5 h-3.5 text-cyan-500" />
                  Quilometragem Máxima
                </span>
                <span className="font-mono text-cyan-400 text-xs">
                  {new Intl.NumberFormat('pt-BR').format(mileageRange[1])} km
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={maxMileage}
                step={500}
                value={mileageRange[1]}
                onChange={(e) => setMileageRange([mileageRange[0], parseFloat(e.target.value)])}
                className="w-full accent-red-600 cursor-pointer h-1.5 bg-white/10 rounded-lg appearance-none"
              />
              <div className="flex justify-between text-[10px] text-zinc-500 font-mono">
                <span>Novo (0 km)</span>
                <span>Max: {new Intl.NumberFormat('pt-BR').format(maxMileage)} km</span>
              </div>
            </div>
          </div>

          {/* Col 2: Porsche Families */}
          <div className="md:col-span-3 space-y-2">
            <label className="text-xs font-medium text-zinc-400 flex items-center gap-1.5 mb-1">
              <Car className="w-3.5 h-3.5 text-red-500" />
              Gama de Modelos (Família)
            </label>
            <div className="flex flex-col gap-1.5 max-h-[190px] overflow-y-auto pr-1">
              {allFamilies.map((family) => {
                const isSelected = selectedFamilies.includes(family);
                return (
                  <button
                    key={family}
                    onClick={() => toggleFamily(family)}
                    className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all text-left border ${
                      isSelected
                        ? 'bg-red-950/25 border-red-500/50 text-red-400 shadow-sm'
                        : 'bg-white/5 border border-white/5 text-zinc-300 hover:bg-white/10'
                    }`}
                  >
                    <span>{family}</span>
                    <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded-md ${isSelected ? 'bg-red-500/20 text-red-300' : 'bg-white/10 text-zinc-500'}`}>
                      {isSelected ? '✓' : ''}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Col 3: Year Select & Pay Method */}
          <div className="md:col-span-3 space-y-4">
            {/* Year filter */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-zinc-400 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-yellow-500" />
                Ano do Modelo (Model Year)
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                {allYears.sort().map((year) => {
                  const isSelected = selectedYears.includes(year);
                  return (
                    <button
                      key={year}
                      onClick={() => toggleYear(year)}
                      className={`py-1.5 px-2 rounded-lg text-center text-xs font-mono transition-all border ${
                        isSelected
                          ? 'bg-yellow-500/10 border-yellow-500/50 text-yellow-400'
                          : 'bg-white/5 border border-white/5 text-zinc-400 hover:bg-white/10'
                      }`}
                    >
                      {year}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Payment Method filter */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-zinc-400 flex items-center gap-1.5">
                <CreditCard className="w-3.5 h-3.5 text-indigo-400" />
                Forma de Pagamento
              </label>
              <div className="flex flex-wrap gap-1.5">
                {allPayMethods.map((method) => {
                  const isSelected = selectedPayMethods.includes(method);
                  return (
                    <button
                      key={method}
                      onClick={() => togglePayMethod(method)}
                      className={`px-2.5 py-1 rounded-full text-[10px] font-medium transition-all border ${
                        isSelected
                          ? 'bg-indigo-500/15 border-indigo-500/40 text-indigo-300'
                          : 'bg-white/5 border border-white/5 text-zinc-400 hover:bg-white/10'
                      }`}
                    >
                      {method}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Col 4: Delivery Status */}
          <div className="md:col-span-2 space-y-2">
            <label className="text-xs font-medium text-zinc-400 flex items-center gap-1.5 mb-1">
              <Activity className="w-3.5 h-3.5 text-amber-500" />
              Status de Entrega
            </label>
            <div className="flex flex-col gap-1.5 max-h-[190px] overflow-y-auto pr-1">
              {allStatuses.map((status) => {
                const isSelected = selectedStatuses.includes(status);
                return (
                  <button
                    key={status}
                    onClick={() => toggleStatus(status)}
                    className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg text-[10px] font-medium transition-all border text-left ${
                      isSelected
                        ? 'bg-amber-500/15 border-amber-500/40 text-amber-300'
                        : 'bg-white/5 border border-white/5 text-zinc-400 hover:bg-white/10'
                    }`}
                  >
                    <span>{status}</span>
                    <span className="text-[9px] text-zinc-500">{isSelected ? '✓' : ''}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
