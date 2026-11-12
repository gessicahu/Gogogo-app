import React from 'react';
import { Land } from '../types/wireframe';
import { Lock, Home, Sparkles, ChevronRight } from 'lucide-react';
import { WireframeImagePlaceholder } from '../components/WireframeAsset';

interface GoLandPageProps {
  lands: Land[];
  onOpenCasa: () => void;
  onSelectLockedLand: (land: Land) => void;
}

export const GoLandPage: React.FC<GoLandPageProps> = ({
  lands,
  onOpenCasa,
  onSelectLockedLand,
}) => {
  return (
    <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 bg-white text-black">
      {/* Header section with wireframe map concept */}
      <div className="border-b-2 border-black pb-2 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-black uppercase tracking-tight text-black font-sans">
            Mondo GoLand
          </h2>
          <p className="text-xs font-mono text-neutral-600">
            Esplora territori e sblocca nuove zone
          </p>
        </div>
        <span className="text-[10px] font-mono border border-black px-1.5 py-0.5 rounded bg-neutral-100 font-bold">
          4 ZONE TOTALI
        </span>
      </div>

      {/* 4 schede rettangolari con angoli arrotondati:
          La prima apre "Casa".
          Le ultime 3 sono bloccate con lucchetto al centro, cliccandoci dà la possibilità di sbloccarlo.
      */}
      <div className="space-y-3.5 pt-1">
        {lands.map((land, index) => {
          const isFirstCard = index === 0;

          if (isFirstCard) {
            // First card: Casa
            return (
              <div
                key={land.id}
                onClick={onOpenCasa}
                role="button"
                tabIndex={0}
                aria-label="Apri la tua Casa"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') onOpenCasa();
                }}
                className="w-full bg-white border-2 border-black rounded-2xl p-4 shadow-[4px_4px_0px_#000] hover:bg-neutral-50 active:translate-y-0.5 transition-all cursor-pointer text-left relative overflow-hidden group"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg border-2 border-black bg-neutral-100 flex items-center justify-center">
                      <Home className="w-4 h-4 text-black stroke-[2.5]" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono bg-black text-white px-1.5 py-0.2 rounded font-bold uppercase">
                        Zona 1 · Sbloccata
                      </span>
                      <h3 className="text-base font-bold text-black leading-tight">
                        {land.name}
                      </h3>
                    </div>
                  </div>

                  <div className="flex items-center text-xs font-mono font-bold text-black gap-1 group-hover:translate-x-0.5 transition-transform">
                    <span>Entra</span>
                    <ChevronRight className="w-4 h-4 stroke-[2.5]" />
                  </div>
                </div>

                <p className="text-xs text-neutral-600 mb-3">
                  {land.description}
                </p>

                {/* Wireframe isometric room sketch preview */}
                <div className="w-full h-24 border border-dashed border-black rounded-xl bg-neutral-100 flex items-center justify-center relative overflow-hidden">
                  <svg
                    viewBox="0 0 160 80"
                    className="w-40 h-20 text-neutral-400 stroke-black fill-none"
                    strokeWidth="1.5"
                  >
                    {/* Isometric room floor */}
                    <polygon points="80,10 145,40 80,70 15,40" fill="#fff" stroke="#000" strokeWidth="2" />
                    <line x1="80" y1="10" x2="80" y2="40" stroke="#000" strokeDasharray="2 2" />
                    <line x1="15" y1="40" x2="80" y2="40" stroke="#000" strokeDasharray="2 2" />
                    <line x1="145" y1="40" x2="80" y2="40" stroke="#000" strokeDasharray="2 2" />
                  </svg>
                  <span className="absolute bottom-1 right-2 text-[9px] font-mono bg-white border border-black px-1 rounded">
                    [VISTA_STANZA_CASA]
                  </span>
                </div>
              </div>
            );
          }

          // Last 3 cards: locked lands with lock icon in center
          const isUnlocked = land.isUnlocked;

          return (
            <div
              key={land.id}
              onClick={() => onSelectLockedLand(land)}
              role="button"
              tabIndex={0}
              aria-label={`${land.name}: ${isUnlocked ? 'Sbloccato' : 'Bloccato, tocca per sbloccare'}`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') onSelectLockedLand(land);
              }}
              className={`w-full border-2 border-black rounded-2xl p-4 shadow-[3px_3px_0px_#000] active:translate-y-0.5 transition-all cursor-pointer text-left relative overflow-hidden ${
                isUnlocked
                  ? 'bg-neutral-50 hover:bg-neutral-100'
                  : 'bg-neutral-100 hover:bg-neutral-200'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono uppercase bg-neutral-200 border border-black px-1.5 py-0.5 rounded font-bold">
                  Zona {land.id} · {isUnlocked ? 'SBLOCCATA' : 'BLOCCATA'}
                </span>
                {!isUnlocked && (
                  <div className="flex items-center gap-1 text-xs font-mono font-bold text-black">
                    <div className="w-3.5 h-3.5 rounded-full border border-black bg-white flex items-center justify-center text-[9px]">
                      ¢
                    </div>
                    <span>{land.unlockCost}</span>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-black">
                    {land.name}
                  </h3>
                  <p className="text-xs text-neutral-600 mt-0.5">
                    {land.description}
                  </p>
                </div>

                {/* Centro con icona del lucchetto (o sbloccato) */}
                <div className="w-12 h-12 rounded-xl border-2 border-black bg-white flex items-center justify-center shrink-0 ml-3 shadow-[2px_2px_0px_#000]">
                  {isUnlocked ? (
                    <Sparkles className="w-6 h-6 text-black stroke-[2.5]" />
                  ) : (
                    <Lock className="w-6 h-6 text-black stroke-[2.5]" />
                  )}
                </div>
              </div>

              {!isUnlocked && (
                <div className="mt-3 pt-2 border-t border-dashed border-neutral-400 flex items-center justify-between text-[11px] font-mono text-neutral-700">
                  <span>Tocca per comprare e sbloccare</span>
                  <span className="font-bold underline">Sblocca ➔</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
