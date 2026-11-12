import React from 'react';
import { FurnitureItem } from '../types/wireframe';
import { Armchair, ShoppingBag, PlusCircle, CheckCircle } from 'lucide-react';

interface CasaPageProps {
  arredi: FurnitureItem[];
  onOpenArredi: () => void;
  onOpenNegozio: () => void;
}

export const CasaPage: React.FC<CasaPageProps> = ({
  arredi,
  onOpenArredi,
  onOpenNegozio,
}) => {
  const placedItems = arredi.filter((item) => item.isPlacedInCasa);

  return (
    <div className="flex-1 flex flex-col justify-between p-4 bg-white text-black overflow-y-auto">
      {/* Top Description / Blueprint Header */}
      <div className="border-b-2 border-black pb-2 mb-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-black">
            Planimetria Casa · Wireframe
          </span>
          <span className="text-[10px] font-mono border border-black px-1.5 py-0.5 rounded bg-neutral-100 font-bold">
            {placedItems.length} OGGETTI INSERITI
          </span>
        </div>
        <p className="text-xs text-neutral-600 mt-1">
          Visualizza gli arredi posizionati o vai al Negozio per comprarne di nuovi.
        </p>
      </div>

      {/* Center: Interactive House Room Blueprint Floor */}
      <div className="flex-1 min-h-[320px] border-2 border-black rounded-3xl bg-neutral-50 relative p-4 flex flex-col justify-between overflow-hidden shadow-[4px_4px_0px_#000]">
        {/* Isometric Grid Background */}
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />

        {/* Room Header Stamp */}
        <div className="relative z-10 flex items-center justify-between">
          <span className="text-[10px] font-mono bg-white border border-black px-2 py-0.5 rounded font-bold">
            STANZA_PRINCIPALE // ZONA_A
          </span>
          <span className="text-[10px] font-mono text-neutral-500">
            SCALA 1:50
          </span>
        </div>

        {/* Room Illustration with Placed Furniture */}
        <div className="relative z-10 my-auto py-4">
          {placedItems.length === 0 ? (
            <div className="border-2 border-dashed border-neutral-400 rounded-2xl p-6 text-center bg-white/80">
              <Armchair className="w-8 h-8 text-neutral-400 stroke-[1.5] mx-auto mb-2" />
              <p className="text-xs font-mono font-bold text-black uppercase">
                Casa vuota
              </p>
              <p className="text-[11px] font-mono text-neutral-500 mt-1 max-w-[200px] mx-auto">
                Tocca il bottone Arredi o Negozio qui in basso per arredare la tua casa!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              {placedItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white border-2 border-black rounded-xl p-3 shadow-[2px_2px_0px_#000] flex flex-col items-center text-center animate-in fade-in zoom-in-95"
                >
                  <div className="w-10 h-10 rounded-lg border border-black bg-neutral-100 flex items-center justify-center mb-1.5">
                    <Armchair className="w-5 h-5 text-black stroke-[2]" />
                  </div>
                  <span className="text-xs font-bold text-black leading-tight">
                    {item.name}
                  </span>
                  <span className="text-[10px] font-mono text-neutral-500 mt-0.5">
                    Posizionato
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Door and Wall Wireframe Markers */}
        <div className="relative z-10 flex items-center justify-between pt-2 border-t border-black/40 text-[9px] font-mono text-neutral-600">
          <span>PORTA_INGRESSO [APERTURA 90°]</span>
          <span>PARETE_NORD</span>
        </div>
      </div>

      {/* In basso si trovano due icone quadrate con bordo arrotondato:
          - Una con l'immagine di un arredo ("arredo")
          - L'altro di un negozio ("negozio")
          Cliccandoci sopra si aprirà un'altra pagina di nome "arredo" o "negozio".
      */}
      <div className="pt-4">
        <p className="text-[11px] font-mono font-bold text-center uppercase tracking-wider text-neutral-600 mb-2">
          Gestione Casa & Acquisti
        </p>

        <div className="grid grid-cols-2 gap-4">
          {/* Bottone 1: Arredo */}
          <button
            onClick={onOpenArredi}
            aria-label="Apri pagina Arredi"
            className="flex flex-col items-center justify-center p-4 bg-white hover:bg-neutral-100 active:translate-y-0.5 border-2 border-black rounded-2xl shadow-[4px_4px_0px_#000] transition-all cursor-pointer group"
          >
            <div className="w-14 h-14 rounded-xl border-2 border-black bg-neutral-100 group-hover:bg-black group-hover:text-white flex items-center justify-center mb-2 transition-colors">
              <Armchair className="w-7 h-7 stroke-[2.5]" />
            </div>
            <span className="text-sm font-bold text-black uppercase font-mono tracking-wider">
              Arredi
            </span>
            <span className="text-[10px] font-mono text-neutral-500 mt-0.5">
              {arredi.length} posseduti
            </span>
          </button>

          {/* Bottone 2: Negozio */}
          <button
            onClick={onOpenNegozio}
            aria-label="Apri pagina Negozio"
            className="flex flex-col items-center justify-center p-4 bg-white hover:bg-neutral-100 active:translate-y-0.5 border-2 border-black rounded-2xl shadow-[4px_4px_0px_#000] transition-all cursor-pointer group"
          >
            <div className="w-14 h-14 rounded-xl border-2 border-black bg-neutral-100 group-hover:bg-black group-hover:text-white flex items-center justify-center mb-2 transition-colors">
              <ShoppingBag className="w-7 h-7 stroke-[2.5]" />
            </div>
            <span className="text-sm font-bold text-black uppercase font-mono tracking-wider">
              Negozio
            </span>
            <span className="text-[10px] font-mono text-neutral-500 mt-0.5">
              Compra oggetti
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
