import React, { useState } from 'react';
import { FurnitureItem } from '../types/wireframe';
import { ShoppingBag, Check, Coins, AlertCircle } from 'lucide-react';

interface NegozioPageProps {
  negozio: FurnitureItem[];
  userCoins: number;
  onBuyItem: (itemId: string) => { success: boolean; errorMessage?: string };
  onGoToArredi: () => void;
}

export const NegozioPage: React.FC<NegozioPageProps> = ({
  negozio,
  userCoins,
  onBuyItem,
  onGoToArredi,
}) => {
  const [purchaseFeedback, setPurchaseFeedback] = useState<string | null>(null);

  const handleBuy = (item: FurnitureItem) => {
    const res = onBuyItem(item.id);
    if (!res.success) {
      setPurchaseFeedback(res.errorMessage || 'Monete insufficienti!');
      setTimeout(() => setPurchaseFeedback(null), 2500);
    } else {
      setPurchaseFeedback(`Hai acquistato: ${item.name}!`);
      setTimeout(() => setPurchaseFeedback(null), 2000);
    }
  };

  return (
    <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 bg-white text-black flex flex-col justify-between">
      <div>
        {/* Header & Wallet Banner */}
        <div className="border-b-2 border-black pb-2 mb-3 flex items-center justify-between">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-black">
              Negozio Arredi
            </span>
            <p className="text-xs text-neutral-600">
              Usa le tue monetine per arredare GoLand.
            </p>
          </div>

          <div className="flex items-center gap-1 px-2 py-1 bg-neutral-100 border-2 border-black rounded-full font-mono text-xs font-bold shadow-[1px_1px_0px_#000]">
            <div className="w-3.5 h-3.5 rounded-full border border-black bg-white flex items-center justify-center text-[9px]">
              ¢
            </div>
            <span>{userCoins} monete</span>
          </div>
        </div>

        {/* Temporary Feedback Notification Banner */}
        {purchaseFeedback && (
          <div className="mb-3 p-2.5 bg-black text-white border-2 border-black rounded-xl text-center text-xs font-mono font-bold uppercase tracking-wider flex items-center justify-center gap-2 animate-in fade-in">
            <Check className="w-4 h-4 stroke-[3]" />
            <span>{purchaseFeedback}</span>
          </div>
        )}

        {/* REQUISITO CHIAVE:
            "Quando si finirà di comprare tutto sulla pagina vuota si troverà la scritta
            “Hai già comprato tutto!” in centro pagina."
        */}
        {negozio.length === 0 ? (
          <div className="py-20 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 rounded-full border-2 border-black bg-neutral-100 flex items-center justify-center mb-3 shadow-[3px_3px_0px_#000]">
              <Check className="w-8 h-8 text-black stroke-[3]" />
            </div>
            <h2 className="text-base font-bold text-black uppercase font-mono tracking-wider">
              Hai già comprato tutto!
            </h2>
            <p className="text-xs font-mono text-neutral-500 mt-1 max-w-[240px]">
              Tutti gli articoli disponibili sono stati acquistati e trasferiti nella pagina Arredi.
            </p>
            <button
              onClick={onGoToArredi}
              className="mt-5 py-2.5 px-4 bg-black text-white hover:bg-neutral-800 border-2 border-black rounded-xl font-bold text-xs uppercase tracking-wider shadow-[3px_3px_0px_#71717a] active:translate-y-0.5 cursor-pointer"
            >
              Vai alla pagina Arredi
            </button>
          </div>
        ) : (
          /* Negozio Items List */
          <div className="space-y-3">
            {negozio.map((item) => {
              const canAfford = userCoins >= item.cost;

              return (
                <div
                  key={item.id}
                  className="w-full bg-white border-2 border-black rounded-2xl p-3 shadow-[3px_3px_0px_#000] flex items-center justify-between gap-3"
                >
                  <div className="w-12 h-12 rounded-xl border-2 border-black bg-neutral-100 flex items-center justify-center shrink-0">
                    <ShoppingBag className="w-6 h-6 text-black stroke-[2]" />
                  </div>

                  <div className="flex-1">
                    <h3 className="text-xs font-bold text-black leading-snug">
                      {item.name}
                    </h3>
                    <div className="flex items-center gap-1 text-xs font-mono font-bold text-neutral-700 mt-0.5">
                      <div className="w-3 h-3 rounded-full border border-black bg-white flex items-center justify-center text-[8px]">
                        ¢
                      </div>
                      <span>Prezzo: {item.cost} monetine</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleBuy(item)}
                    aria-label={`Compra ${item.name} per ${item.cost} monete`}
                    className={`py-2 px-3 rounded-xl border-2 border-black text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${
                      canAfford
                        ? 'bg-black text-white hover:bg-neutral-800 shadow-[2px_2px_0px_#71717a] active:translate-y-0.5'
                        : 'bg-neutral-200 text-neutral-500 border-neutral-400 cursor-not-allowed'
                    }`}
                  >
                    Compra
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {negozio.length > 0 && (
        <div className="pt-4 border-t border-dashed border-neutral-300">
          <button
            onClick={onGoToArredi}
            className="w-full py-2.5 bg-neutral-100 hover:bg-neutral-200 border-2 border-black rounded-xl text-xs font-mono font-bold uppercase tracking-wider text-black flex items-center justify-center gap-1.5"
          >
            <span>Vedi i tuoi Arredi ➔</span>
          </button>
        </div>
      )}
    </div>
  );
};
