import React from 'react';
import { FurnitureItem } from '../types/wireframe';
import { Armchair, Check, Plus, Home } from 'lucide-react';

interface ArrediPageProps {
  arredi: FurnitureItem[];
  onTogglePlaceInCasa: (itemId: string) => void;
  onGoToShop: () => void;
}

export const ArrediPage: React.FC<ArrediPageProps> = ({
  arredi,
  onTogglePlaceInCasa,
  onGoToShop,
}) => {
  return (
    <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 bg-white text-black">
      {/* Header Info */}
      <div className="border-b-2 border-black pb-2 flex items-center justify-between">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-black">
            I Tuoi Arredi
          </span>
          <p className="text-xs text-neutral-600">
            Tocca un oggetto per posizionarlo o toglierlo dalla Casa.
          </p>
        </div>
        <span className="text-[10px] font-mono border border-black px-1.5 py-0.5 rounded bg-neutral-100 font-bold">
          {arredi.length} ACQUISTATI
        </span>
      </div>

      {/* Empty State */}
      {arredi.length === 0 ? (
        <div className="border-2 border-dashed border-black rounded-2xl p-6 text-center bg-neutral-50 my-6">
          <Armchair className="w-10 h-10 text-neutral-400 stroke-[1.5] mx-auto mb-2" />
          <h3 className="text-sm font-bold text-black uppercase font-mono mb-1">
            Nessun arredo posseduto
          </h3>
          <p className="text-xs text-neutral-600 mb-4 max-w-[240px] mx-auto">
            Non hai ancora acquistato nessun oggetto nel negozio. Usa le tue monetine per comprarne!
          </p>
          <button
            onClick={onGoToShop}
            className="py-2.5 px-4 bg-black text-white hover:bg-neutral-800 border-2 border-black rounded-xl font-bold text-xs uppercase tracking-wider shadow-[3px_3px_0px_#71717a] active:translate-y-0.5 cursor-pointer"
          >
            Vai al Negozio
          </button>
        </div>
      ) : (
        /* Grid of purchased furniture items */
        <div className="grid grid-cols-2 gap-3 pt-1">
          {arredi.map((item) => {
            const isPlaced = item.isPlacedInCasa;

            return (
              <div
                key={item.id}
                onClick={() => onTogglePlaceInCasa(item.id)}
                role="button"
                tabIndex={0}
                aria-label={`${item.name}. ${isPlaced ? 'Posizionato in casa. Clicca per toglierlo.' : 'Non posizionato. Clicca per posizionarlo in casa.'}`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    onTogglePlaceInCasa(item.id);
                  }
                }}
                className={`border-2 border-black rounded-2xl p-3 shadow-[3px_3px_0px_#000] active:translate-y-0.5 transition-all cursor-pointer text-center flex flex-col items-center justify-between min-h-[145px] ${
                  isPlaced ? 'bg-neutral-100 ring-2 ring-black' : 'bg-white hover:bg-neutral-50'
                }`}
              >
                {/* Wireframe box preview */}
                <div className="w-12 h-12 rounded-xl border-2 border-black bg-white flex items-center justify-center mb-2 shadow-[1px_1px_0px_#000]">
                  <Armchair className="w-6 h-6 text-black stroke-[2]" />
                </div>

                <div className="w-full">
                  <h3 className="text-xs font-bold text-black leading-tight line-clamp-1">
                    {item.name}
                  </h3>
                  <span className="text-[10px] font-mono text-neutral-500 block mt-0.5">
                    Prezzo: {item.cost} ¢
                  </span>
                </div>

                {/* Status action button inside wireframe card */}
                <div
                  className={`w-full mt-2 py-1 px-2 rounded-lg border border-black text-[10px] font-mono font-bold uppercase tracking-wider flex items-center justify-center gap-1 ${
                    isPlaced
                      ? 'bg-black text-white'
                      : 'bg-white text-black hover:bg-neutral-100'
                  }`}
                >
                  {isPlaced ? (
                    <>
                      <Check className="w-3 h-3 stroke-[3]" />
                      <span>Arreda Casa ✓</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-3 h-3 stroke-[3]" />
                      <span>Posiziona</span>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
