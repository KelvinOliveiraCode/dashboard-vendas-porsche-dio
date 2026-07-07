import React from 'react';
import { ChevronUp, ChevronDown, ChevronsUpDown, HelpCircle, Eye, ArrowRight } from 'lucide-react';
import { PorscheSale } from '../data/porscheSalesData';

interface SalesTableProps {
  sales: PorscheSale[];
  onSelectSale: (sale: PorscheSale) => void;
}

type SortField = 'saleId' | 'saleDate' | 'model' | 'modelYear' | 'price' | 'mileage' | 'payMethod' | 'city' | 'deliveryStatus';
type SortOrder = 'asc' | 'desc';

export const SalesTable: React.FC<SalesTableProps> = ({ sales, onSelectSale }) => {
  // Sorting state
  const [sortField, setSortField] = React.useState<SortField>('saleId');
  const [sortOrder, setSortOrder] = React.useState<SortOrder>('asc');

  // Pagination state
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 12;

  // Handle sort request
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
    setCurrentPage(1); // Reset page on sort
  };

  // Sort logic
  const sortedSales = React.useMemo(() => {
    return [...sales].sort((a, b) => {
      let valA = a[sortField];
      let valB = b[sortField];

      // Handle INVALID date values nicely (put them last/first)
      if (sortField === 'saleDate') {
        if (valA === 'INVALID') valA = '0000-00-00';
        if (valB === 'INVALID') valB = '0000-00-00';
      }

      if (typeof valA === 'string' && typeof valB === 'string') {
        return sortOrder === 'asc' 
          ? valA.localeCompare(valB) 
          : valB.localeCompare(valA);
      } else {
        // numbers
        return sortOrder === 'asc' 
          ? (valA as number) - (valB as number) 
          : (valB as number) - (valA as number);
      }
    });
  }, [sales, sortField, sortOrder]);

  // Reset page when data changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [sales]);

  // Paginated data
  const totalPages = Math.ceil(sortedSales.length / itemsPerPage) || 1;
  const paginatedSales = React.useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return sortedSales.slice(start, start + itemsPerPage);
  }, [sortedSales, currentPage]);

  // Status styling map
  const getStatusStyle = (status: string) => {
    const base = "px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wider uppercase border text-center inline-block shrink-0 ";
    switch (status) {
      case 'Delivered':
        return base + "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
      case 'Shipped':
        return base + "bg-cyan-500/10 text-cyan-400 border-cyan-500/20";
      case 'In Transit':
        return base + "bg-orange-500/10 text-orange-400 border-orange-500/20";
      case 'Awaiting Delivery':
        return base + "bg-violet-500/10 text-violet-400 border-violet-500/20";
      case 'Awaiting Pickup':
        return base + "bg-pink-500/10 text-pink-400 border-pink-500/20";
      case 'Pending':
        return base + "bg-yellow-500/10 text-yellow-400 border-yellow-500/20";
      case 'Pending Approval':
        return base + "bg-blue-500/10 text-blue-400 border-blue-500/20";
      case 'Pending Review':
        return base + "bg-teal-500/10 text-teal-400 border-teal-500/20";
      case 'Cancelled':
        return base + "bg-red-500/10 text-red-400 border-red-500/20";
      default:
        return base + "bg-zinc-800 text-zinc-300 border-zinc-700";
    }
  };

  // Header render with arrows
  const renderHeader = (label: string, field: SortField, align: 'left' | 'right' | 'center' = 'left') => {
    const isSorted = sortField === field;
    const alignmentClass = align === 'right' ? 'justify-end' : align === 'center' ? 'justify-center' : 'justify-start';
    
    return (
      <th 
        onClick={() => handleSort(field)}
        className={`px-4 py-3.5 text-xs font-semibold text-zinc-400 cursor-pointer select-none hover:bg-white/5 transition-colors ${
          align === 'right' ? 'text-right' : align === 'center' ? 'text-center' : 'text-left'
        }`}
      >
        <div className={`flex items-center gap-1.5 ${alignmentClass}`}>
          <span>{label}</span>
          {isSorted ? (
            sortOrder === 'asc' ? <ChevronUp className="w-3.5 h-3.5 text-red-500" /> : <ChevronDown className="w-3.5 h-3.5 text-red-500" />
          ) : (
            <ChevronsUpDown className="w-3.5 h-3.5 text-zinc-600 group-hover:text-zinc-400" />
          )}
        </div>
      </th>
    );
  };

  return (
    <div id="sales-table-panel" className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-md shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] flex flex-col justify-between">
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4 mb-4">
          <div>
            <h3 className="font-display text-base font-bold text-white">Listagem Geral de Transações</h3>
            <p className="text-xs text-zinc-500">Resultados da busca ({sales.length} veículos encontrados)</p>
          </div>
          <div className="text-xs text-zinc-400 font-mono bg-white/5 px-3 py-1.5 rounded-lg border border-white/10">
            Página <span className="text-white font-bold">{currentPage}</span> de <span className="text-white font-bold">{totalPages}</span>
          </div>
        </div>

        {/* Responsive Table Wrapper */}
        <div className="overflow-x-auto rounded-xl border border-white/10 bg-white/5">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="bg-white/5 border-b border-white/10">
                {renderHeader('ID', 'saleId', 'center')}
                {renderHeader('Data Venda', 'saleDate')}
                {renderHeader('Modelo Porsche', 'model')}
                {renderHeader('Ano Mod.', 'modelYear', 'center')}
                {renderHeader('Preço (USD)', 'price', 'right')}
                {renderHeader('Quilometragem', 'mileage', 'right')}
                {renderHeader('Pagamento', 'payMethod')}
                {renderHeader('Cidade / UF', 'city')}
                {renderHeader('Status Entrega', 'deliveryStatus', 'center')}
                <th className="px-4 py-3.5 text-xs font-semibold text-zinc-400 text-center w-24">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {paginatedSales.length === 0 ? (
                <tr>
                  <td colSpan={10} className="px-4 py-12 text-center text-zinc-500 text-sm font-sans">
                    Nenhum veículo corresponde aos filtros selecionados.
                  </td>
                </tr>
              ) : (
                paginatedSales.map((sale) => (
                  <tr 
                    key={sale.saleId}
                    onClick={() => onSelectSale(sale)}
                    className="group border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer"
                  >
                    {/* ID */}
                    <td className="px-4 py-3 text-center text-xs font-mono text-zinc-500 group-hover:text-zinc-300">
                      #{sale.saleId}
                    </td>
                    
                    {/* Date */}
                    <td className="px-4 py-3 text-xs font-medium text-zinc-300">
                      {sale.saleDate === 'INVALID' ? (
                        <span className="text-zinc-600 font-mono italic">Sem Data</span>
                      ) : (
                        <span className="font-mono">
                          {new Date(sale.saleDate + 'T00:00:00').toLocaleDateString('pt-BR')}
                        </span>
                      )}
                    </td>

                    {/* Model */}
                    <td className="px-4 py-3 text-xs font-bold text-white group-hover:text-red-400 transition-colors">
                      <div className="flex items-center gap-2">
                        <span className="px-1.5 py-0.5 rounded text-[9px] bg-red-600/10 text-red-500 border border-red-500/10 font-mono font-bold leading-none uppercase">
                          {sale.family.split(' ')[0]}
                        </span>
                        <span>{sale.model}</span>
                      </div>
                    </td>

                    {/* Model Year */}
                    <td className="px-4 py-3 text-center text-xs font-mono text-zinc-300">
                      {sale.modelYear}
                    </td>

                    {/* Price */}
                    <td className="px-4 py-3 text-right text-xs font-bold font-mono text-emerald-400">
                      {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(sale.price)}
                    </td>

                    {/* Mileage */}
                    <td className="px-4 py-3 text-right text-xs font-mono">
                      {sale.mileage === 0 ? (
                        <span className="text-cyan-400 font-bold uppercase tracking-wider text-[10px] bg-cyan-950/20 border border-cyan-500/10 px-1.5 py-0.5 rounded">Novo (0 km)</span>
                      ) : (
                        <span className="text-zinc-300">{new Intl.NumberFormat('pt-BR').format(sale.mileage)} km</span>
                      )}
                    </td>

                    {/* Pay Method */}
                    <td className="px-4 py-3 text-xs text-zinc-300 font-medium">
                      {sale.payMethod}
                    </td>

                    {/* Location */}
                    <td className="px-4 py-3 text-xs text-zinc-300 truncate max-w-[150px]" title={`${sale.city}, ${sale.state}`}>
                      {sale.city} <span className="text-zinc-500 font-semibold font-mono text-[10px] ml-1 px-1 bg-white/5 rounded">{sale.state}</span>
                    </td>

                    {/* Status badge */}
                    <td className="px-4 py-3 text-center">
                      <span className={getStatusStyle(sale.deliveryStatus)}>
                        {sale.deliveryStatus === 'Delivered' ? 'Entregue' : 
                         sale.deliveryStatus === 'Cancelled' ? 'Cancelado' : 
                         sale.deliveryStatus === 'In Transit' ? 'Em Trânsito' : 
                         sale.deliveryStatus === 'Shipped' ? 'Enviado' : 
                         sale.deliveryStatus === 'Awaiting Pickup' ? 'Aguardando Retirada' :
                         sale.deliveryStatus === 'Pending Approval' ? 'Pendente Aprov.' :
                         sale.deliveryStatus === 'Awaiting Delivery' ? 'Aguardando Entg.' :
                         sale.deliveryStatus === 'Pending Review' ? 'Em Revisão' :
                         sale.deliveryStatus === 'Pending' ? 'Pendente' : sale.deliveryStatus}
                      </span>
                    </td>

                    {/* Actions button */}
                    <td className="px-4 py-3 text-center">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectSale(sale);
                        }}
                        className="p-1.5 text-zinc-500 hover:text-red-500 hover:bg-white/10 rounded-lg transition-all cursor-pointer inline-flex items-center gap-1 text-[11px]"
                        title="Ver Ficha Técnica"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span className="hidden group-hover:inline-block font-medium">Ficha</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-5 pt-4 border-t border-white/10">
          <div className="text-xs text-zinc-500">
            Mostrando registros de <span className="text-white font-mono font-bold">{(currentPage - 1) * itemsPerPage + 1}</span> a{' '}
            <span className="text-white font-mono font-bold">
              {Math.min(currentPage * itemsPerPage, sales.length)}
            </span>{' '}
            de um total de <span className="text-red-500 font-mono font-bold">{sales.length}</span> veículos.
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border ${
                currentPage === 1 
                  ? 'bg-transparent border-white/5 text-zinc-600 cursor-not-allowed' 
                  : 'bg-white/5 hover:bg-white/10 border-white/10 text-zinc-300 hover:text-white cursor-pointer transition-all'
              }`}
            >
              Anterior
            </button>
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }).map((_, i) => {
                const pageNum = i + 1;
                // Only show current page, first, last, and neighbors
                if (
                  pageNum === 1 || 
                  pageNum === totalPages || 
                  Math.abs(pageNum - currentPage) <= 1
                ) {
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`w-8 h-8 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                        currentPage === pageNum 
                          ? 'bg-red-600 text-white' 
                          : 'bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white border border-white/10'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                } else if (
                  (pageNum === 2 && currentPage > 3) ||
                  (pageNum === totalPages - 1 && currentPage < totalPages - 2)
                ) {
                  return <span key={pageNum} className="text-zinc-600 px-1 text-xs">...</span>;
                }
                return null;
              })}
            </div>
            <button
              onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border ${
                currentPage === totalPages 
                  ? 'bg-transparent border-white/5 text-zinc-600 cursor-not-allowed' 
                  : 'bg-white/5 hover:bg-white/10 border-white/10 text-zinc-300 hover:text-white cursor-pointer transition-all'
              }`}
            >
              Próximo
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
