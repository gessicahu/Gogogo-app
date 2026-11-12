import React from 'react';
import { ChevronLeft, Coins } from 'lucide-react';
import { PageId } from '../types/wireframe';

interface TopBarProps {
  currentPage: PageId;
  coins: number;
  customTitle?: string;
  onNavigateBack: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  currentPage,
  coins,
  customTitle,
  onNavigateBack,
}) => {
  // Main tab pages
  const isMainTab = ['sfide', 'goland', 'diario', 'profilo'].includes(currentPage);
  const showCoinCounter = currentPage === 'sfide' || currentPage === 'goland';

  // Compute title
  let title = '';
  switch (currentPage) {
    case 'sfide':
      title = 'Sfide';
      break;
    case 'goland':
      title = 'GoLand';
      break;
    case 'diario':
      title = 'Diario';
      break;
    case 'profilo':
      title = 'Profilo';
      break;
    case 'casa':
      title = 'Casa';
      break;
    case 'arredi':
      title = 'Arredi';
      break;
    case 'negozio':
      title = 'Negozio';
      break;
    case 'dettaglio_sfida':
      title = customTitle || 'bere caffè la mattina';
      break;
    case 'dati':
      title = 'Dati';
      break;
    case 'preferenze':
      title = 'Preferenze';
      break;
    case 'notifiche':
      title = 'Notifiche';
      break;
    default:
      title = '';
  }

  return (
    <header className="sticky top-0 z-30 w-full bg-white border-b-2 border-black px-3 py-2.5 flex items-center justify-between min-h-[52px]">
      {/* Left Slot: Back arrow on subpages, empty placeholder on main tabs */}
      <div className="w-12 flex items-center justify-start">
        {!isMainTab ? (
          <button
            onClick={onNavigateBack}
            aria-label="Torna indietro"
            className="w-9 h-9 rounded-lg border-2 border-black bg-white hover:bg-neutral-100 active:bg-neutral-200 flex items-center justify-center transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5 text-black stroke-[2.5]" />
          </button>
        ) : (
          <div className="w-9 h-9" />
        )}
      </div>

      {/* Center Slot: Title centered */}
      <div className="flex-1 text-center px-1">
        <h1 className="text-base font-bold text-black tracking-tight truncate uppercase font-sans">
          {title}
        </h1>
      </div>

      {/* Right Slot: Coin counter for Sfide and GoLand */}
      <div className="w-16 flex items-center justify-end">
        {showCoinCounter ? (
          <div
            className="flex items-center gap-1.5 px-2 py-1 border-2 border-black rounded-full bg-neutral-50 shadow-[1px_1px_0px_#000]"
            title={`Monete: ${coins}`}
          >
            <div className="w-4 h-4 rounded-full border border-black bg-white flex items-center justify-center">
              <span className="text-[10px] font-black font-mono leading-none">¢</span>
            </div>
            <span className="text-xs font-mono font-bold text-black tabular-nums">
              {coins}
            </span>
          </div>
        ) : (
          <div className="w-16" />
        )}
      </div>
    </header>
  );
};
