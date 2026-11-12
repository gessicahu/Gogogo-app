import React from 'react';
import { DiaryEntry } from '../types/wireframe';
import { BookOpen, Camera, ChevronRight } from 'lucide-react';
import { CoffeeSketchIllustration } from '../components/WireframeAsset';

interface DiarioPageProps {
  diaryEntries: DiaryEntry[];
  onOpenDiaryEntry: (entry: DiaryEntry) => void;
}

export const DiarioPage: React.FC<DiarioPageProps> = ({
  diaryEntries,
  onOpenDiaryEntry,
}) => {
  return (
    <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 bg-white text-black">
      {/* Header section */}
      <div className="border-b-2 border-black pb-2 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-black uppercase tracking-tight text-black font-sans">
            Diario Sfide
          </h2>
          <p className="text-xs font-mono text-neutral-600">
            Archivio fotografico delle sfide completate
          </p>
        </div>
        <span className="text-[10px] font-mono border border-black px-1.5 py-0.5 rounded bg-neutral-100 font-bold">
          {diaryEntries.length} COMPLETATE
        </span>
      </div>

      {/* REQUISITO:
          "Ci sono una serie di schede quadrate con angoli arrotondati.
           Le schede sono due per fila e sono le sfide già completate.
           Cliccando sopra alle schede quadrate porterà ad una nuova pagina di nome 'bere caffè la mattina'."
      */}
      {diaryEntries.length === 0 ? (
        <div className="border-2 border-dashed border-black rounded-2xl p-6 text-center bg-neutral-50 my-6">
          <BookOpen className="w-10 h-10 text-neutral-400 stroke-[1.5] mx-auto mb-2" />
          <h3 className="text-sm font-bold text-black uppercase font-mono mb-1">
            Nessuna sfida completata
          </h3>
          <p className="text-xs text-neutral-600 max-w-[240px] mx-auto">
            Accetta una sfida dalla pagina "Sfide", scatta una foto e comparirà qui nel tuo Diario!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3.5 pt-1">
          {diaryEntries.map((entry) => {
            const isCoffee = entry.title.toLowerCase().includes('caffè');

            return (
              <div
                key={entry.id}
                onClick={() => onOpenDiaryEntry(entry)}
                role="button"
                tabIndex={0}
                aria-label={`Apri dettaglio sfida: ${entry.title}`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    onOpenDiaryEntry(entry);
                  }
                }}
                className="aspect-square bg-white border-2 border-black rounded-2xl p-3 shadow-[3px_3px_0px_#000] hover:bg-neutral-50 active:translate-y-0.5 transition-all cursor-pointer flex flex-col justify-between text-left group"
              >
                {/* Photo thumbnail */}
                <div className="w-full flex-1 rounded-xl border border-black bg-neutral-100 overflow-hidden flex flex-col items-center justify-center relative p-1.5">
                  {isCoffee ? (
                    <div className="w-full h-full flex items-center justify-center">
                      {/* Mini Coffee wireframe icon */}
                      <svg
                        viewBox="0 0 100 80"
                        className="w-12 h-10 stroke-black fill-none"
                        strokeWidth="2"
                      >
                        <ellipse cx="50" cy="25" rx="20" ry="6" fill="#fff" />
                        <path d="M30 25 L 35 60 Q 50 68, 65 60 L 70 25" fill="#fff" />
                        <path d="M70 30 Q 82 35, 80 48 Q 78 56, 66 54" />
                        <ellipse cx="50" cy="65" rx="30" ry="8" fill="#fff" />
                      </svg>
                    </div>
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center">
                      <Camera className="w-6 h-6 text-black stroke-[2]" />
                      <span className="text-[9px] font-mono text-neutral-500 mt-1 uppercase">
                        [FOTO_SFIDA]
                      </span>
                    </div>
                  )}

                  <div className="absolute top-1 left-1 bg-black text-white text-[8px] font-mono px-1 rounded">
                    RAW
                  </div>
                </div>

                {/* Title & Metadata */}
                <div className="mt-2">
                  <h3 className="text-xs font-bold text-black leading-snug line-clamp-2">
                    {entry.title}
                  </h3>
                  <div className="flex items-center justify-between text-[10px] font-mono text-neutral-500 mt-0.5">
                    <span>{entry.completedAt}</span>
                    <span className="font-bold text-black">+{entry.rewardCoins} ¢</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
