import React, { useState } from 'react';
import { Wifi, Signal, Battery, Smartphone, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
import { PageId } from '../types/wireframe';

interface IPhone17FrameProps {
  children: React.ReactNode;
  currentPage: PageId;
  onNavigateTo: (page: PageId) => void;
  onResetData: () => void;
}

export const IPhone17Frame: React.FC<IPhone17FrameProps> = ({
  children,
  currentPage,
  onNavigateTo,
  onResetData,
}) => {
  const [zoomLevel, setZoomLevel] = useState<'fit' | '100%'>('fit');

  // List of all 9+ screens for designer quick jump
  const allScreens: { id: PageId; label: string }[] = [
    { id: 'sfide', label: '1. Sfide' },
    { id: 'goland', label: '2. GoLand' },
    { id: 'casa', label: '3. Casa' },
    { id: 'arredi', label: '4. Arredi' },
    { id: 'negozio', label: '5. Negozio' },
    { id: 'diario', label: '6. Diario' },
    { id: 'dettaglio_sfida', label: '7. bere caffè' },
    { id: 'profilo', label: '8. Profilo' },
    { id: 'dati', label: '9. Dati' },
    { id: 'preferenze', label: '10. Preferenze' },
    { id: 'notifiche', label: '11. Notifiche' },
  ];

  return (
    <div className="min-h-screen w-full bg-neutral-200 text-black flex flex-col items-center justify-start p-2 sm:p-6 font-sans relative overflow-x-hidden selection:bg-black selection:text-white">
      {/* Background blueprint grid for wireframe workbench */}
      <div
        className="fixed inset-0 pointer-events-none opacity-25"
        style={{
          backgroundImage:
            'radial-gradient(#000 1px, transparent 1px), radial-gradient(#000 1px, #e5e5e5 1px)',
          backgroundSize: '20px 20px',
        }}
      />

      {/* Top Workbench Toolbar (Responsive & Accessible) */}
      <header className="relative z-20 w-full max-w-4xl bg-white border-2 border-black rounded-2xl p-3 shadow-[4px_4px_0px_#000] mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-black text-white flex items-center justify-center font-bold">
            <Smartphone className="w-5 h-5 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xs font-mono font-black uppercase tracking-wider text-black">
                iPhone 17 Pro Max
              </h1>
              <span className="text-[10px] font-mono bg-neutral-100 border border-black px-1.5 py-0.2 rounded font-bold">
                Low-Fidelity Wireframe B&W
              </span>
            </div>
            <p className="text-[11px] text-neutral-600 hidden sm:block">
              Mockup mobile interattivo a 9 pagine · Bianco e nero
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 ml-auto">
          <button
            onClick={() => setZoomLevel(zoomLevel === 'fit' ? '100%' : 'fit')}
            title="Adatta zoom schermo"
            className="flex items-center gap-1.5 py-1 px-2.5 rounded-lg border border-black text-xs font-mono bg-neutral-100 hover:bg-neutral-200 transition-colors"
          >
            {zoomLevel === 'fit' ? <ZoomIn className="w-3.5 h-3.5" /> : <ZoomOut className="w-3.5 h-3.5" />}
            <span>{zoomLevel === 'fit' ? 'Zoom 100%' : 'Adatta Schermo'}</span>
          </button>

          <button
            onClick={onResetData}
            title="Ripristina dati demo iniziali"
            className="flex items-center gap-1.5 py-1 px-2.5 rounded-lg border border-black text-xs font-mono bg-white hover:bg-neutral-100 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset Demo</span>
          </button>
        </div>

        {/* Screen quick navigator bar */}
        <div className="w-full pt-2 border-t border-neutral-300 flex items-center gap-1 overflow-x-auto pb-1 text-xs">
          <span className="text-[10px] font-mono text-neutral-500 uppercase whitespace-nowrap shrink-0 mr-1">
            Naviga Schermata:
          </span>
          {allScreens.map((screen) => {
            const isActive = currentPage === screen.id;
            return (
              <button
                key={screen.id}
                onClick={() => onNavigateTo(screen.id)}
                className={`px-2 py-0.5 rounded-md border text-[11px] font-mono whitespace-nowrap shrink-0 transition-colors ${
                  isActive
                    ? 'bg-black text-white border-black font-bold'
                    : 'bg-white text-neutral-700 border-neutral-300 hover:border-black'
                }`}
              >
                {screen.label}
              </button>
            );
          })}
        </div>
      </header>

      {/* Main iPhone 17 Pro Max Bezel Frame */}
      <main
        className={`relative z-10 transition-transform origin-top ${
          zoomLevel === 'fit' ? 'scale-95 sm:scale-100' : 'scale-100'
        }`}
      >
        <div
          style={{ width: '430px', height: '915px' }}
          className="relative max-w-[94vw] bg-black rounded-[52px] p-[10px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5),_0_0_0_2px_#52525b] border-4 border-neutral-900 flex flex-col overflow-hidden"
        >
          {/* Outer edge buttons (Vol up, Vol down, Power) */}
          <div className="absolute -left-[14px] top-28 w-[4px] h-12 bg-neutral-800 rounded-l-md border border-neutral-900" />
          <div className="absolute -left-[14px] top-44 w-[4px] h-12 bg-neutral-800 rounded-l-md border border-neutral-900" />
          <div className="absolute -right-[14px] top-32 w-[4px] h-16 bg-neutral-800 rounded-r-md border border-neutral-900" />

          {/* iPhone 17 Pro Max Display Screen */}
          <div className="w-full h-full bg-white rounded-[44px] overflow-hidden flex flex-col relative border-2 border-black">
            {/* iOS Status Bar with Dynamic Island */}
            <div className="w-full h-11 bg-white shrink-0 px-6 pt-2 pb-1 flex items-center justify-between text-black relative z-40 select-none">
              {/* Time */}
              <span className="text-xs font-mono font-bold tracking-tight">09:41</span>

              {/* Dynamic Island pill */}
              <div className="absolute left-1/2 -translate-x-1/2 top-2 w-[114px] h-[30px] bg-black rounded-full flex items-center justify-between px-3 text-white shadow-sm">
                <div className="w-2.5 h-2.5 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center">
                  <div className="w-1 h-1 rounded-full bg-neutral-700" />
                </div>
                <div className="w-2.5 h-2.5 rounded-full bg-neutral-900 border border-neutral-800" />
              </div>

              {/* Status Bar Icons */}
              <div className="flex items-center gap-1.5">
                <Signal className="w-3.5 h-3.5 stroke-[2.5]" />
                <Wifi className="w-3.5 h-3.5 stroke-[2.5]" />
                <div className="w-5 h-2.5 rounded-sm border border-black p-0.5 flex items-center">
                  <div className="h-full w-full bg-black rounded-2xs" />
                </div>
              </div>
            </div>

            {/* Inner App Container with Content */}
            <div className="w-full flex-1 flex flex-col overflow-hidden relative bg-white">
              {children}
            </div>

            {/* iOS Home Indicator Bar */}
            <div className="w-full h-6 bg-white shrink-0 flex items-center justify-center pb-1 relative z-40 select-none">
              <div className="w-32 h-1 bg-black/80 rounded-full" />
            </div>
          </div>
        </div>
      </main>

      {/* Footer Specs Note */}
      <footer className="relative z-10 text-center py-4 text-xs font-mono text-neutral-600">
        Wireframe Low-Fidelity · Specifica iPhone 17 Pro Max · Tutti i pulsanti sono interattivi
      </footer>
    </div>
  );
};
