import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  ScatterChart,
  Scatter,
  ZAxis,
  CartesianGrid,
  Legend
} from 'recharts';
import { PorscheSale } from '../data/porscheSalesData';
import { BarChart3, TrendingUp, CreditCard, Activity, Landmark } from 'lucide-react';

interface ChartsProps {
  filteredSales: PorscheSale[];
}

const PORSCHE_COLORS = {
  guardsRed: '#D5001C',
  jetBlack: '#0B0B0C',
  metallicSilver: '#94A3B8',
  speedYellow: '#FFCC00',
  indigo: '#6366F1',
  cyan: '#06B6D4',
  emerald: '#10B981',
  zinc700: '#3F3F46',
  orange: '#F97316'
};

// Donut Chart Custom Colors
const STATUS_COLORS: Record<string, string> = {
  'Delivered': '#10B981',      // Emerald
  'Shipped': '#06B6D4',        // Cyan
  'In Transit': '#F97316',     // Orange
  'Awaiting Delivery': '#8B5CF6', // Purple
  'Awaiting Pickup': '#EC4899', // Pink
  'Pending': '#EAB308',        // Yellow
  'Pending Approval': '#3B82F6', // Blue
  'Pending Review': '#14B8A6',   // Teal
  'Cancelled': '#EF4444'        // Red
};

export const Charts: React.FC<ChartsProps> = ({ filteredSales }) => {
  // Chart 1: Revenue & Units by Model Family
  const familyData = React.useMemo(() => {
    const data: Record<string, { name: string; receita: number; quantidade: number }> = {};
    filteredSales.forEach((s) => {
      if (!data[s.family]) {
        data[s.family] = { name: s.family, receita: 0, quantidade: 0 };
      }
      data[s.family].receita += s.price;
      data[s.family].quantidade += 1;
    });
    return Object.values(data).sort((a, b) => b.receita - a.receita);
  }, [filteredSales]);

  // Chart 2: Sales Trend Over Time (grouped by month/year)
  const trendData = React.useMemo(() => {
    const groups: Record<string, { key: string; receita: number; volume: number }> = {};
    filteredSales.forEach((s) => {
      if (s.saleDate && s.saleDate !== 'INVALID') {
        const yearMonth = s.saleDate.substring(0, 7); // "YYYY-MM"
        if (!groups[yearMonth]) {
          groups[yearMonth] = { key: yearMonth, receita: 0, volume: 0 };
        }
        groups[yearMonth].receita += s.price;
        groups[yearMonth].volume += 1;
      }
    });

    const formatMonthLabel = (ym: string) => {
      const [year, month] = ym.split('-');
      const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
      const monthIdx = parseInt(month, 10) - 1;
      return `${months[monthIdx] || month}/${year.substring(2)}`;
    };

    return Object.values(groups)
      .sort((a, b) => a.key.localeCompare(b.key))
      .map(item => ({
        ...item,
        label: formatMonthLabel(item.key)
      }));
  }, [filteredSales]);

  // Chart 3: Payment Methods Preference
  const payMethodData = React.useMemo(() => {
    const data: Record<string, { name: string; valor: number; quantidade: number }> = {};
    filteredSales.forEach((s) => {
      if (!data[s.payMethod]) {
        data[s.payMethod] = { name: s.payMethod, valor: 0, quantidade: 0 };
      }
      data[s.payMethod].valor += s.price;
      data[s.payMethod].quantidade += 1;
    });
    return Object.values(data).sort((a, b) => b.quantidade - a.quantidade);
  }, [filteredSales]);

  // Chart 4: Delivery Status Distribution (Donut Chart)
  const statusData = React.useMemo(() => {
    const data: Record<string, { name: string; value: number }> = {};
    filteredSales.forEach((s) => {
      if (!data[s.deliveryStatus]) {
        data[s.deliveryStatus] = { name: s.deliveryStatus, value: 0 };
      }
      data[s.deliveryStatus].value += 1;
    });
    return Object.values(data);
  }, [filteredSales]);

  // Chart 5: Scatter Price vs Mileage
  const scatterData = React.useMemo(() => {
    return filteredSales.map((s) => ({
      name: s.model,
      price: s.price,
      mileage: s.mileage,
      year: s.modelYear,
      id: s.saleId
    }));
  }, [filteredSales]);

  // Formatter Helpers
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(val);
  };

  // Custom Tooltips
  const CustomTooltipBar = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-black/80 backdrop-blur-md border border-white/10 p-3 rounded-lg shadow-xl font-sans">
          <p className="text-xs font-bold text-white mb-1.5">{data.name}</p>
          <p className="text-xs text-red-400 font-mono">Faturamento: {formatCurrency(data.receita)}</p>
          <p className="text-xs text-zinc-400">Veículos Vendidos: <span className="text-white font-semibold font-mono">{data.quantidade}</span></p>
        </div>
      );
    }
    return null;
  };

  const CustomTooltipTrend = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-black/80 backdrop-blur-md border border-white/10 p-3 rounded-lg shadow-xl font-sans">
          <p className="text-xs font-bold text-white mb-1.5">Período: {data.label}</p>
          <p className="text-xs text-red-400 font-mono">Receita: {formatCurrency(data.receita)}</p>
          <p className="text-xs text-zinc-400">Volume: <span className="text-white font-semibold font-mono">{data.volume} vends.</span></p>
        </div>
      );
    }
    return null;
  };

  const CustomTooltipPay = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-black/80 backdrop-blur-md border border-white/10 p-3 rounded-lg shadow-xl font-sans">
          <p className="text-xs font-bold text-white mb-1.5">{data.name}</p>
          <p className="text-xs text-indigo-300 font-mono">Volume de Vendas: {data.quantidade} trans.</p>
          <p className="text-xs text-zinc-400">Soma de Valores: <span className="text-white font-semibold font-mono">{formatCurrency(data.valor)}</span></p>
        </div>
      );
    }
    return null;
  };

  const CustomTooltipScatter = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-black/80 backdrop-blur-md border border-white/10 p-3.5 rounded-lg shadow-xl font-sans space-y-1">
          <p className="text-xs font-bold text-white border-b border-white/10 pb-1 mb-1">{data.name} ({data.year})</p>
          <p className="text-xs text-emerald-400 font-mono">Preço: {formatCurrency(data.price)}</p>
          <p className="text-xs text-cyan-400 font-mono">Uso: {new Intl.NumberFormat('pt-BR').format(data.mileage)} km</p>
          <p className="text-[10px] text-zinc-500 font-mono">ID da Venda: #{data.id}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Chart 1: Receita por Família (Bar) - Column span 7 */}
      <div id="chart-receita-familia" className="lg:col-span-7 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] flex flex-col justify-between">
        <div className="flex items-center gap-2 border-b border-white/10 pb-3 mb-4">
          <BarChart3 className="w-5 h-5 text-red-500" />
          <div>
            <h3 className="font-display text-sm font-bold text-white">Receita por Família de Modelos</h3>
            <p className="text-xs text-zinc-500">Divisão do faturamento consolidado por categoria de veículo</p>
          </div>
        </div>
        
        <div className="h-[280px] w-full">
          {familyData.length === 0 ? (
            <div className="h-full flex items-center justify-center text-zinc-500 text-xs font-sans">
              Sem dados com os filtros selecionados.
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={familyData} margin={{ top: 10, right: 10, left: 20, bottom: 5 }}>
                <defs>
                  <linearGradient id="barRedGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#ef4444" stopOpacity={0.9} />
                    <stop offset="100%" stopColor="#991b1b" stopOpacity={0.6} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="rgba(255, 255, 255, 0.08)" strokeDasharray="3 3" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  stroke="#71717a" 
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false}
                />
                <YAxis 
                  stroke="#71717a" 
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false}
                  tickFormatter={(val) => `$${val / 1000}k`}
                />
                <Tooltip content={<CustomTooltipBar />} cursor={{ fill: 'rgba(255, 255, 255, 0.03)' }} />
                <Bar dataKey="receita" fill="url(#barRedGradient)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* Chart 2: Distribuição Logística (Donut) - Column span 5 */}
      <div id="chart-status-entrega" className="lg:col-span-5 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] flex flex-col justify-between">
        <div className="flex items-center gap-2 border-b border-white/10 pb-3 mb-4">
          <Activity className="w-5 h-5 text-amber-500" />
          <div>
            <h3 className="font-display text-sm font-bold text-white">Status das Entregas</h3>
            <p className="text-xs text-zinc-500">Distribuição operacional do status logístico dos pedidos</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 h-[280px]">
          <div className="w-full sm:w-1/2 h-[200px] sm:h-full relative">
            {statusData.length === 0 ? (
              <div className="h-full flex items-center justify-center text-zinc-500 text-xs font-sans">
                Nenhum veículo
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={80}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {statusData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={STATUS_COLORS[entry.name] || PORSCHE_COLORS.zinc700} 
                      />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value} veículos`, 'Quantidade']} />
                </PieChart>
              </ResponsiveContainer>
            )}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
              <span className="text-zinc-500 text-[10px] uppercase font-bold tracking-wider">Total</span>
              <p className="text-2xl font-bold font-display text-white font-mono leading-none">{filteredSales.length}</p>
            </div>
          </div>

          <div className="w-full sm:w-1/2 max-h-[220px] overflow-y-auto pr-2 space-y-1.5 text-xs">
            {statusData.map((item, idx) => {
              const color = STATUS_COLORS[item.name] || PORSCHE_COLORS.zinc700;
              const pct = filteredSales.length > 0 ? (item.value / filteredSales.length) * 100 : 0;
              return (
                <div key={idx} className="flex items-center justify-between p-1.5 rounded bg-white/5 border border-white/5">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: color }} />
                    <span className="text-zinc-300 truncate max-w-[100px]">{item.name}</span>
                  </div>
                  <div className="font-mono text-zinc-400 space-x-1">
                    <span className="text-white font-semibold">{item.value}</span>
                    <span className="text-[10px]">({pct.toFixed(0)}%)</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Chart 3: Histórico de Vendas Mensal (Area) - Column span 8 */}
      <div id="chart-historico-vendas" className="lg:col-span-8 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] flex flex-col justify-between">
        <div className="flex items-center gap-2 border-b border-white/10 pb-3 mb-4">
          <TrendingUp className="w-5 h-5 text-red-500" />
          <div>
            <h3 className="font-display text-sm font-bold text-white">Evolução e Tendência de Faturamento</h3>
            <p className="text-xs text-zinc-500">Histórico de faturamento acumulado por mês (exclui datas inválidas)</p>
          </div>
        </div>

        <div className="h-[280px] w-full">
          {trendData.length === 0 ? (
            <div className="h-full flex items-center justify-center text-zinc-500 text-xs font-sans">
              Insira datas válidas nos filtros para plotar o histórico.
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData} margin={{ top: 10, right: 10, left: 20, bottom: 5 }}>
                <defs>
                  <linearGradient id="areaRedGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#dc2626" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#dc2626" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="rgba(255, 255, 255, 0.08)" strokeDasharray="3 3" vertical={false} />
                <XAxis 
                  dataKey="label" 
                  stroke="#71717a" 
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false}
                />
                <YAxis 
                  stroke="#71717a" 
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false}
                  tickFormatter={(val) => `$${val / 1000}k`}
                />
                <Tooltip content={<CustomTooltipTrend />} cursor={{ stroke: '#52525b', strokeWidth: 1 }} />
                <Area 
                  type="monotone" 
                  dataKey="receita" 
                  stroke="#ef4444" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#areaRedGradient)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* Chart 4: Métodos de Pagamento (Bar horizontal) - Column span 4 */}
      <div id="chart-metodo-pagamento" className="lg:col-span-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] flex flex-col justify-between">
        <div className="flex items-center gap-2 border-b border-white/10 pb-3 mb-4">
          <CreditCard className="w-5 h-5 text-indigo-400" />
          <div>
            <h3 className="font-display text-sm font-bold text-white">Meios de Pagamento Preferidos</h3>
            <p className="text-xs text-zinc-500">Volume de transações por modalidade financeira</p>
          </div>
        </div>

        <div className="h-[280px] w-full">
          {payMethodData.length === 0 ? (
            <div className="h-full flex items-center justify-center text-zinc-500 text-xs font-sans">
              Sem dados.
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart 
                data={payMethodData} 
                layout="vertical"
                margin={{ top: 10, right: 10, left: 10, bottom: 5 }}
              >
                <CartesianGrid stroke="rgba(255, 255, 255, 0.08)" strokeDasharray="3 3" horizontal={false} />
                <XAxis 
                  type="number"
                  stroke="#71717a" 
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false}
                />
                <YAxis 
                  dataKey="name" 
                  type="category"
                  stroke="#71717a" 
                  fontSize={9} 
                  tickLine={false} 
                  axisLine={false}
                  width={90}
                />
                <Tooltip content={<CustomTooltipPay />} cursor={{ fill: 'rgba(255, 255, 255, 0.02)' }} />
                <Bar dataKey="quantidade" fill="#6366F1" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* Chart 5: Correlação Preço vs Quilometragem (Scatter Chart) - Column span 12 */}
      <div id="chart-preco-km" className="lg:col-span-12 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] flex flex-col justify-between">
        <div className="flex items-center gap-2 border-b border-white/10 pb-3 mb-4">
          <Landmark className="w-5 h-5 text-cyan-400" />
          <div>
            <h3 className="font-display text-sm font-bold text-white">Análise de Desvalorização: Preço vs. Quilometragem</h3>
            <p className="text-xs text-zinc-500">Dispersão correlacionando o valor de venda (USD) com a quilometragem rodada (km)</p>
          </div>
        </div>

        <div className="h-[300px] w-full">
          {scatterData.length === 0 ? (
            <div className="h-full flex items-center justify-center text-zinc-500 text-xs font-sans">
              Sem dados.
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 20, right: 20, bottom: 10, left: 20 }}>
                <CartesianGrid stroke="rgba(255, 255, 255, 0.08)" strokeDasharray="3 3" />
                <XAxis 
                  type="number" 
                  dataKey="mileage" 
                  name="Quilometragem" 
                  unit=" km" 
                  stroke="#71717a"
                  fontSize={10}
                  tickFormatter={(val) => `${val / 1000}k`}
                />
                <YAxis 
                  type="number" 
                  dataKey="price" 
                  name="Preço" 
                  unit=" USD" 
                  stroke="#71717a"
                  fontSize={10}
                  tickFormatter={(val) => `$${val / 1000}k`}
                />
                <ZAxis type="number" range={[50, 150]} />
                <Tooltip content={<CustomTooltipScatter />} cursor={{ strokeDasharray: '3 3' }} />
                <Scatter name="Veículos" data={scatterData} fill="#06B6D4">
                  {scatterData.map((entry, index) => {
                    // Give new cars a special reddish/golden color
                    const color = entry.mileage === 0 
                      ? PORSCHE_COLORS.guardsRed 
                      : (entry.price > 180000 ? PORSCHE_COLORS.speedYellow : PORSCHE_COLORS.cyan);
                    return <Cell key={`cell-${index}`} fill={color} />;
                  })}
                </Scatter>
                <Legend 
                  content={() => (
                    <div className="flex items-center justify-center gap-6 text-[11px] text-zinc-400 mt-3 font-sans">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: PORSCHE_COLORS.guardsRed }} />
                        <span>Novo (0 km)</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: PORSCHE_COLORS.speedYellow }} />
                        <span>Premium Especial ({`>`}$180k)</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: PORSCHE_COLORS.cyan }} />
                        <span>Seminovos padrão</span>
                      </div>
                    </div>
                  )}
                />
              </ScatterChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  );
};
