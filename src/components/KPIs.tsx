import React from 'react';
import { DollarSign, ShieldAlert, Sparkles, TrendingUp, Gauge, CheckCircle2, ShoppingBag } from 'lucide-react';
import { PorscheSale } from '../data/porscheSalesData';

interface KPIsProps {
  filteredSales: PorscheSale[];
  totalSalesCount: number;
}

export const KPIs: React.FC<KPIsProps> = ({ filteredSales, totalSalesCount }) => {
  // Calculations
  const revenue = filteredSales.reduce((acc, curr) => acc + curr.price, 0);
  const count = filteredSales.length;
  const avgPrice = count > 0 ? revenue / count : 0;
  
  const avgMileage = count > 0 
    ? filteredSales.reduce((acc, curr) => acc + curr.mileage, 0) / count 
    : 0;

  const brandNewCount = filteredSales.filter(s => s.mileage === 0).length;
  const brandNewPct = count > 0 ? (brandNewCount / count) * 100 : 0;

  const deliveredCount = filteredSales.filter(s => 
    ['Delivered', 'Shipped'].includes(s.deliveryStatus)
  ).length;
  const deliveryPct = count > 0 ? (deliveredCount / count) * 100 : 0;

  // Let's find the most expensive vehicle in the current filter
  const highestPriceSale = filteredSales.length > 0 
    ? [...filteredSales].sort((a, b) => b.price - a.price)[0]
    : null;

  // Number Format Helpers
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {/* KPI 1: Faturamento Total */}
      <div id="kpi-faturamento" className="relative overflow-hidden bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5 hover:border-white/20 transition-all duration-300 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] group">
        {/* Glow effect on hover */}
        <div className="absolute -right-10 -top-10 w-28 h-28 bg-red-600/10 rounded-full blur-2xl group-hover:bg-red-600/15 transition-all duration-500"></div>
        
        <div className="flex justify-between items-start mb-3">
          <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Faturamento Total</span>
          <div className="p-1.5 bg-red-600/10 text-red-500 rounded-lg border border-red-500/15">
            <DollarSign className="w-4 h-4" />
          </div>
        </div>
        
        <div className="space-y-1">
          <h3 className="text-xl sm:text-2xl font-display font-bold tracking-tight text-white font-mono">
            {formatCurrency(revenue)}
          </h3>
          <p className="text-[11px] text-zinc-500 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5 text-red-500" />
            <span>Volume de caixa consolidado</span>
          </p>
        </div>
      </div>

      {/* KPI 2: Veículos Vendidos */}
      <div id="kpi-vendas" className="relative overflow-hidden bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5 hover:border-white/20 transition-all duration-300 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] group">
        <div className="absolute -right-10 -top-10 w-28 h-28 bg-zinc-700/10 rounded-full blur-2xl group-hover:bg-zinc-700/15 transition-all duration-500"></div>
        
        <div className="flex justify-between items-start mb-3">
          <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Veículos Vendidos</span>
          <div className="p-1.5 bg-white/5 text-zinc-300 rounded-lg border border-white/10">
            <ShoppingBag className="w-4 h-4" />
          </div>
        </div>
        
        <div className="space-y-1">
          <h3 className="text-xl sm:text-2xl font-display font-bold tracking-tight text-white font-mono">
            {count} <span className="text-xs font-normal text-zinc-400 font-sans">unid.</span>
          </h3>
          <p className="text-[11px] text-zinc-500">
            Representa <span className="text-white font-mono">{((count / totalSalesCount) * 100).toFixed(1)}%</span> do estoque histórico
          </p>
        </div>
      </div>

      {/* KPI 3: Ticket Médio */}
      <div id="kpi-ticket" className="relative overflow-hidden bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5 hover:border-white/20 transition-all duration-300 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] group">
        <div className="absolute -right-10 -top-10 w-28 h-28 bg-yellow-500/10 rounded-full blur-2xl group-hover:bg-yellow-500/15 transition-all duration-500"></div>
        
        <div className="flex justify-between items-start mb-3">
          <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Ticket Médio</span>
          <div className="p-1.5 bg-yellow-500/10 text-yellow-500 rounded-lg border border-yellow-500/15">
            <Sparkles className="w-4 h-4" />
          </div>
        </div>
        
        <div className="space-y-1">
          <h3 className="text-xl sm:text-2xl font-display font-bold tracking-tight text-white font-mono">
            {formatCurrency(avgPrice)}
          </h3>
          <p className="text-[11px] text-zinc-500 truncate" title={highestPriceSale ? `Máx: ${highestPriceSale.model}` : ''}>
            {highestPriceSale ? (
              <span>Modelo Premium: <strong className="text-zinc-300">{highestPriceSale.model.split(' ')[0]}</strong></span>
            ) : (
              <span>Média de valor por unidade</span>
            )}
          </p>
        </div>
      </div>

      {/* KPI 4: Quilometragem Média */}
      <div id="kpi-quilometragem" className="relative overflow-hidden bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5 hover:border-white/20 transition-all duration-300 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] group">
        <div className="absolute -right-10 -top-10 w-28 h-28 bg-cyan-500/10 rounded-full blur-2xl group-hover:bg-cyan-500/15 transition-all duration-500"></div>
        
        <div className="flex justify-between items-start mb-3">
          <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Km Média / Novos</span>
          <div className="p-1.5 bg-cyan-500/10 text-cyan-400 rounded-lg border border-cyan-500/15">
            <Gauge className="w-4 h-4" />
          </div>
        </div>
        
        <div className="space-y-1">
          <h3 className="text-xl sm:text-2xl font-display font-bold tracking-tight text-white font-mono">
            {new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 0 }).format(avgMileage)} <span className="text-xs font-normal text-zinc-400 font-sans">km</span>
          </h3>
          <p className="text-[11px] text-zinc-500">
            <span className="text-cyan-400 font-mono font-bold">{brandNewPct.toFixed(0)}%</span> saíram zero-quilômetro (0 km)
          </p>
        </div>
      </div>

      {/* KPI 5: Eficiência Logística with custom red accent border */}
      <div id="kpi-entrega" className="relative overflow-hidden bg-white/5 backdrop-blur-md border border-white/10 border-l-4 border-l-red-600 rounded-2xl p-5 hover:border-white/20 transition-all duration-300 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] group">
        <div className="absolute -right-10 -top-10 w-28 h-28 bg-emerald-500/10 rounded-full blur-2xl group-hover:bg-emerald-500/15 transition-all duration-500"></div>
        
        <div className="flex justify-between items-start mb-3">
          <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Entregas Despachadas</span>
          <div className="p-1.5 bg-emerald-500/10 text-emerald-400 rounded-lg border border-emerald-500/15">
            <CheckCircle2 className="w-4 h-4" />
          </div>
        </div>
        
        <div className="space-y-1">
          <h3 className="text-xl sm:text-2xl font-display font-bold tracking-tight text-white font-mono">
            {deliveryPct.toFixed(1)}%
          </h3>
          <p className="text-[11px] text-zinc-500">
            <span className="text-emerald-400 font-mono">{deliveredCount}</span> veículos entregues ou em rota
          </p>
        </div>
      </div>
    </div>
  );
};
