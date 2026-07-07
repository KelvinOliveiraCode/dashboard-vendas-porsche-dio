import React from 'react';
import { 
  X, 
  Printer, 
  Download, 
  Cpu, 
  Zap, 
  MapPin, 
  Compass, 
  DollarSign, 
  Gauge, 
  Calendar, 
  FileText, 
  ShieldCheck, 
  CheckCircle,
  HelpCircle
} from 'lucide-react';
import { PorscheSale } from '../data/porscheSalesData';

interface VehicleDetailModalProps {
  sale: PorscheSale | null;
  onClose: () => void;
}

interface SpecItem {
  engine: string;
  power: string;
  acceleration: string;
  type: 'Combustão' | 'Híbrido Plug-in' | 'Elétrico';
  drivetrain: string;
}

export const VehicleDetailModal: React.FC<VehicleDetailModalProps> = ({ sale, onClose }) => {
  const [isExporting, setIsExporting] = React.useState(false);
  const [exportSuccess, setExportSuccess] = React.useState(false);

  React.useEffect(() => {
    if (!sale) {
      setExportSuccess(false);
    }
  }, [sale]);

  if (!sale) return null;

  // Real specifications lookup based on Porsche model name
  const getSpecs = (modelName: string): SpecItem => {
    const m = modelName.toLowerCase();
    
    if (m.includes('gt3 rs')) {
      return { engine: '4.0L Aspirado Boxer 6', power: '525 cv', acceleration: '3.2s', type: 'Combustão', drivetrain: 'Traseira (RWD)' };
    }
    if (m.includes('gt3')) {
      return { engine: '4.0L Aspirado Boxer 6', power: '510 cv', acceleration: '3.4s', type: 'Combustão', drivetrain: 'Traseira (RWD)' };
    }
    if (m.includes('turbo s')) {
      if (m.includes('taycan')) {
        return { engine: 'Dois Motores Elétricos síncronos', power: '761 cv', acceleration: '2.8s', type: 'Elétrico', drivetrain: 'Integral (AWD)' };
      }
      return { engine: '3.8L Biturbo Boxer 6', power: '650 cv', acceleration: '2.7s', type: 'Combustão', drivetrain: 'Integral (AWD)' };
    }
    if (m.includes('turbo gt')) {
      return { engine: '4.0L Biturbo V8', power: '640 cv', acceleration: '3.3s', type: 'Combustão', drivetrain: 'Integral (AWD)' };
    }
    if (m.includes('turbo')) {
      if (m.includes('taycan')) {
        return { engine: 'Dois Motores Elétricos', power: '680 cv', acceleration: '3.2s', type: 'Elétrico', drivetrain: 'Integral (AWD)' };
      }
      return { engine: '3.8L Biturbo Boxer 6', power: '580 cv', acceleration: '2.8s', type: 'Combustão', drivetrain: 'Integral (AWD)' };
    }
    if (m.includes('gt4 rs')) {
      return { engine: '4.0L Aspirado Boxer 6', power: '500 cv', acceleration: '3.4s', type: 'Combustão', drivetrain: 'Traseira (RWD)' };
    }
    if (m.includes('gts')) {
      if (m.includes('911')) {
        return { engine: '3.0L Biturbo Boxer 6', power: '480 cv', acceleration: '3.3s', type: 'Combustão', drivetrain: 'Traseira (RWD)' };
      }
      if (m.includes('taycan')) {
        return { engine: 'Dois Motores Elétricos', power: '598 cv', acceleration: '3.7s', type: 'Elétrico', drivetrain: 'Integral (AWD)' };
      }
      if (m.includes('macan')) {
        return { engine: '2.9L Biturbo V6', power: '440 cv', acceleration: '4.3s', type: 'Combustão', drivetrain: 'Integral (AWD)' };
      }
      return { engine: '4.0L Aspirado Boxer 6', power: '400 cv', acceleration: '4.0s', type: 'Combustão', drivetrain: 'Traseira (RWD)' };
    }
    if (m.includes('spyder rs')) {
      return { engine: '4.0L Aspirado Boxer 6', power: '500 cv', acceleration: '3.4s', type: 'Combustão', drivetrain: 'Traseira (RWD)' };
    }
    if (m.includes('e-hybrid') || m.includes('hybrid')) {
      return { engine: '3.0L V6 Turbo + Motor Elétrico', power: '470 cv', acceleration: '4.9s', type: 'Híbrido Plug-in', drivetrain: 'Integral (AWD)' };
    }
    if (m.includes('electric')) {
      return { engine: 'Dois Motores Elétricos (E-Performance)', power: '408 cv', acceleration: '5.2s', type: 'Elétrico', drivetrain: 'Integral (AWD)' };
    }
    if (m.includes('carrera s') || m.includes('targa 4s')) {
      return { engine: '3.0L Biturbo Boxer 6', power: '450 cv', acceleration: '3.7s', type: 'Combustão', drivetrain: 'Integral (AWD)' };
    }
    if (m.includes('carrera') || m.includes('targa')) {
      return { engine: '3.0L Biturbo Boxer 6', power: '385 cv', acceleration: '4.0s', type: 'Combustão', drivetrain: 'Traseira (RWD)' };
    }
    if (m.includes('dakar')) {
      return { engine: '3.0L Biturbo Boxer 6', power: '480 cv', acceleration: '3.4s', type: 'Combustão', drivetrain: 'Integral (AWD)' };
    }
    if (m.includes('cayman s') || m.includes('boxster s')) {
      return { engine: '2.5L Turbo Boxer 4', power: '350 cv', acceleration: '4.6s', type: 'Combustão', drivetrain: 'Traseira (RWD)' };
    }
    if (m.includes('cayman') || m.includes('boxster')) {
      return { engine: '2.0L Turbo Boxer 4', power: '300 cv', acceleration: '4.9s', type: 'Combustão', drivetrain: 'Traseira (RWD)' };
    }
    if (m.includes('macan s')) {
      return { engine: '2.9L Biturbo V6', power: '380 cv', acceleration: '4.8s', type: 'Combustão', drivetrain: 'Integral (AWD)' };
    }
    if (m.includes('macan t')) {
      return { engine: '2.0L Turbo 4 cil.', power: '265 cv', acceleration: '6.2s', type: 'Combustão', drivetrain: 'Integral (AWD)' };
    }
    if (m.includes('macan')) {
      return { engine: '2.0L Turbo 4 cil.', power: '265 cv', acceleration: '6.4s', type: 'Combustão', drivetrain: 'Integral (AWD)' };
    }
    if (m.includes('cayenne s')) {
      return { engine: '4.0L Biturbo V8', power: '474 cv', acceleration: '4.7s', type: 'Combustão', drivetrain: 'Integral (AWD)' };
    }
    if (m.includes('cayenne')) {
      return { engine: '3.0L Turbo V6', power: '353 cv', acceleration: '5.7s', type: 'Combustão', drivetrain: 'Integral (AWD)' };
    }
    if (m.includes('panamera 4s')) {
      return { engine: '2.9L Biturbo V6', power: '440 cv', acceleration: '4.1s', type: 'Combustão', drivetrain: 'Integral (AWD)' };
    }
    if (m.includes('panamera 4')) {
      return { engine: '2.9L Biturbo V6', power: '330 cv', acceleration: '5.3s', type: 'Combustão', drivetrain: 'Integral (AWD)' };
    }
    if (m.includes('panamera')) {
      return { engine: '2.9L Biturbo V6', power: '330 cv', acceleration: '5.6s', type: 'Combustão', drivetrain: 'Traseira (RWD)' };
    }

    return { engine: 'E-Performance / Boxer Twin-Scroll', power: '420 cv', acceleration: '4.2s', type: 'Combustão', drivetrain: 'Integral (AWD)' };
  };

  const specs = getSpecs(sale.model);

  // Generate Receipt Simulation
  const handleExport = () => {
    setIsExporting(true);
    setExportSuccess(false);
    setTimeout(() => {
      setIsExporting(false);
      setExportSuccess(true);
    }, 1800);
  };

  const formattedPrice = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2
  }).format(sale.price);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div 
        id="vehicle-sheet-modal"
        className="relative w-full max-w-4xl bg-black/40 border border-white/10 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
      >
        {/* Background Gradients */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-red-600/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-zinc-800/5 rounded-full blur-3xl pointer-events-none"></div>

        {/* Left Side: Aesthetic Porsche Branding Card */}
        <div className="relative md:w-5/12 bg-white/5 p-6 md:p-8 flex flex-col justify-between border-r border-white/10 overflow-hidden shrink-0">
          {/* Carbon style backplate overlay */}
          <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#e10600_1px,transparent_1px)] [background-size:16px_16px]"></div>
          
          <div className="relative">
            <div className="flex items-center gap-2 mb-6">
              <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-red-500 bg-red-600/10 border border-red-500/15 px-2.5 py-1 rounded">
                Porsche AG
              </span>
              <span className="text-zinc-500 text-[10px] font-mono">Chassis No. #{sale.saleId + 10000}</span>
            </div>

            <div className="space-y-1">
              <span className="text-xs uppercase font-medium text-zinc-500 tracking-wider">Certificado de Venda</span>
              <h2 className="text-2xl md:text-3xl font-display font-black text-white tracking-tight leading-none mb-2">
                {sale.model}
              </h2>
              <div className="flex flex-wrap gap-1.5 mt-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-white/5 border border-white/10 text-zinc-300">
                  MY {sale.modelYear}
                </span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                  specs.type === 'Elétrico' ? 'bg-cyan-950/30 text-cyan-400 border border-cyan-500/10' :
                  specs.type === 'Híbrido Plug-in' ? 'bg-emerald-950/30 text-emerald-400 border border-emerald-500/10' :
                  'bg-red-950/30 text-red-400 border border-red-500/10'
                }`}>
                  {specs.type}
                </span>
              </div>
            </div>
          </div>

          {/* Pricing indicator */}
          <div className="relative mt-8 md:mt-0 pt-6 border-t border-white/10">
            <span className="text-xs text-zinc-500 block uppercase tracking-wider mb-1">Preço de Fechamento</span>
            <div className="text-3xl md:text-4xl font-display font-black text-emerald-400 font-mono">
              {formattedPrice}
            </div>
            <div className="flex items-center gap-1 text-[11px] text-zinc-500 mt-2">
              <Compass className="w-3.5 h-3.5 text-red-500" />
              <span>Transacionado via {sale.payMethod}</span>
            </div>
          </div>

          {/* Porsche Signature Line */}
          <div className="relative mt-6 pt-4 border-t border-white/10 text-[10px] text-zinc-600 font-mono">
            <span>OFFICIAL FACTORY ARCHIVES</span>
            <div className="h-6 mt-1 flex items-end">
              <span className="border-b border-white/10 w-24"></span>
              <span className="ml-2">Dr. Ing. h.c. F. Porsche AG</span>
            </div>
          </div>
        </div>

        {/* Right Side: Specific Details and Specs sheet */}
        <div className="flex-1 p-6 md:p-8 flex flex-col justify-between overflow-y-auto">
          {/* Close trigger */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white rounded-full border border-white/10 cursor-pointer transition-colors z-10"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="space-y-6">
            <div>
              <h3 className="font-display text-xs font-bold uppercase tracking-widest text-zinc-400 border-b border-white/10 pb-2 mb-4 flex items-center gap-2">
                <Cpu className="w-4 h-4 text-red-500" /> Especificações Técnicas de Fábrica
              </h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 border border-white/5 rounded-xl p-3">
                  <span className="text-[10px] text-zinc-500 block uppercase">Motorização</span>
                  <span className="text-xs font-bold text-white font-mono">{specs.engine}</span>
                </div>
                <div className="bg-white/5 border border-white/5 rounded-xl p-3">
                  <span className="text-[10px] text-zinc-500 block uppercase">Potência Máxima</span>
                  <span className="text-xs font-bold text-white font-mono">{specs.power}</span>
                </div>
                <div className="bg-white/5 border border-white/5 rounded-xl p-3">
                  <span className="text-[10px] text-zinc-500 block uppercase">Aceleração 0-100 km/h</span>
                  <span className="text-xs font-bold text-red-400 font-mono">{specs.acceleration}</span>
                </div>
                <div className="bg-white/5 border border-white/5 rounded-xl p-3">
                  <span className="text-[10px] text-zinc-500 block uppercase">Transmissão</span>
                  <span className="text-xs font-bold text-white font-mono">{specs.drivetrain}</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-display text-xs font-bold uppercase tracking-widest text-zinc-400 border-b border-white/10 pb-2 mb-4 flex items-center gap-2">
                <FileText className="w-4 h-4 text-red-500" /> Registro da Transação
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
                <div className="space-y-0.5">
                  <span className="text-[10px] text-zinc-500 uppercase block">Data do Contrato</span>
                  <span className="font-bold text-zinc-200">
                    {sale.saleDate === 'INVALID' ? (
                      <span className="text-zinc-600 italic">Data não inserida</span>
                    ) : (
                      new Date(sale.saleDate + 'T00:00:00').toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' })
                    )}
                  </span>
                </div>
                <div className="space-y-0.5">
                  <span className="text-[10px] text-zinc-500 uppercase block">Quilometragem de Entrega</span>
                  <span className="font-bold text-zinc-200 font-mono">
                    {sale.mileage === 0 ? 'Zero Km (0 km)' : `${new Intl.NumberFormat('pt-BR').format(sale.mileage)} km`}
                  </span>
                </div>
                <div className="space-y-0.5">
                  <span className="text-[10px] text-zinc-500 uppercase block">Ponto de Venda / Cidade</span>
                  <span className="font-bold text-zinc-200 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                    <span>{sale.city}, {sale.state}</span>
                  </span>
                </div>
                <div className="space-y-0.5">
                  <span className="text-[10px] text-zinc-500 uppercase block">Método Logístico</span>
                  <span className="font-bold text-zinc-200">
                    {sale.deliveryStatus === 'Delivered' ? 'Entrega Concluída' :
                     sale.deliveryStatus === 'Cancelled' ? 'Cancelado pelo Comprador' :
                     sale.deliveryStatus === 'In Transit' ? 'Em Rota (Segurado)' :
                     sale.deliveryStatus === 'Shipped' ? 'Postado em Contêiner' :
                     sale.deliveryStatus === 'Awaiting Pickup' ? 'Pronto para Retirada' :
                     sale.deliveryStatus === 'Pending Approval' ? 'Aguardando Liberação' :
                     sale.deliveryStatus === 'Awaiting Delivery' ? 'Aguardando Despacho' :
                     sale.deliveryStatus === 'Pending Review' ? 'Em Auditoria' :
                     sale.deliveryStatus === 'Pending' ? 'Fila de Logística' : sale.deliveryStatus}
                  </span>
                </div>
                <div className="space-y-0.5">
                  <span className="text-[10px] text-zinc-500 uppercase block">Garantia Integrada</span>
                  <span className="font-bold text-zinc-200 flex items-center gap-1 text-emerald-400">
                    <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                    <span>Porsche Approved (24 meses)</span>
                  </span>
                </div>
                <div className="space-y-0.5">
                  <span className="text-[10px] text-zinc-500 uppercase block">ID da Transação</span>
                  <span className="font-bold text-zinc-400 font-mono">#PS-{sale.saleId + 24000}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Footer bar */}
          <div className="mt-8 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center gap-3">
            <button
              onClick={handleExport}
              disabled={isExporting}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 bg-red-600 hover:bg-red-700 disabled:bg-zinc-800 text-white rounded-xl text-xs font-bold transition-all cursor-pointer shadow-lg shadow-red-600/10 active:scale-[0.98]"
            >
              {isExporting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Gerando Certificado...</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>Gerar Recibo Porsche</span>
                </>
              )}
            </button>
            <button
              onClick={() => window.print()}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 hover:text-white rounded-xl text-xs font-bold transition-all cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Imprimir Ficha</span>
            </button>

            {exportSuccess && (
              <span className="text-xs text-emerald-400 font-medium flex items-center gap-1.5 animate-bounce mt-2 sm:mt-0">
                <CheckCircle className="w-4 h-4" /> Recibo PDF gerado com sucesso!
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
