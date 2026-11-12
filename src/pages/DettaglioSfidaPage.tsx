import React from 'react';
import { DiaryEntry } from '../types/wireframe';
import { CoffeeSketchIllustration, GenericPhotoSketch } from '../components/WireframeAsset';
import { Calendar, CheckCircle, Award } from 'lucide-react';

interface DettaglioSfidaPageProps {
  entry: DiaryEntry;
}

export const DettaglioSfidaPage: React.FC<DettaglioSfidaPageProps> = ({ entry }) => {
  const isCoffee = entry.title.toLowerCase().includes('caffè');

  return (
    <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 bg-white text-black">
      {/* Verification Stamp Banner */}
      <div className="flex items-center justify-between border-b-2 border-black pb-2">
        <div className="flex items-center gap-1.5">
          <CheckCircle className="w-4 h-4 text-black stroke-[2.5]" />
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-black">
            SFIDA COMPLETATA CON SUCCESSO
          </span>
        </div>
        <span className="text-[10px] font-mono border border-black bg-neutral-100 px-1.5 py-0.5 rounded font-bold">
          +{entry.rewardCoins} MONETINE
        </span>
      </div>

      {/* REQUISITO:
          "In questa pagina si trova in grande la foto caricata quando si ha completato la sfida"
      */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono text-neutral-600 uppercase">
            Allegato Fotografico Ufficiale
          </span>
          <span className="text-[10px] font-mono text-neutral-500">
            {entry.completedAt}
          </span>
        </div>

        {isCoffee ? (
          <CoffeeSketchIllustration className="w-full h-64 shadow-[4px_4px_0px_#000]" />
        ) : (
          <GenericPhotoSketch
            title={entry.title}
            className="w-full h-64 shadow-[4px_4px_0px_#000]"
          />
        )}
      </div>

      {/* REQUISITO:
          "con sotto la spiegazione della sfida"
      */}
      <div className="border-2 border-black rounded-2xl p-4 bg-neutral-50 shadow-[3px_3px_0px_#000] space-y-3">
        <div>
          <span className="text-[10px] font-mono uppercase bg-black text-white px-2 py-0.5 rounded font-bold">
            SPIEGAZIONE DELLA SFIDA
          </span>
          <h2 className="text-base font-bold text-black mt-2 leading-snug">
            {entry.title}
          </h2>
        </div>

        <p className="text-xs text-neutral-700 leading-relaxed font-normal border-l-2 border-black pl-3 py-1 bg-white">
          {entry.description}
        </p>

        <div className="pt-2 border-t border-dashed border-neutral-300 flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-1 text-neutral-600">
            <Calendar className="w-3.5 h-3.5" />
            <span>Completata: {entry.completedAt}</span>
          </div>
          <div className="flex items-center gap-1 font-bold">
            <Award className="w-3.5 h-3.5" />
            <span>Verificata</span>
          </div>
        </div>
      </div>
    </div>
  );
};
