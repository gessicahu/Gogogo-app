import React from 'react';
import { UserProfile } from '../types/wireframe';
import { User, ChevronRight, FileText, Sliders, Bell, Award, Coins } from 'lucide-react';

interface ProfiloPageProps {
  profile: UserProfile;
  onOpenDati: () => void;
  onOpenPreferenze: () => void;
  onOpenNotifiche: () => void;
}

export const ProfiloPage: React.FC<ProfiloPageProps> = ({
  profile,
  onOpenDati,
  onOpenPreferenze,
  onOpenNotifiche,
}) => {
  return (
    <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 bg-white text-black">
      {/* Header */}
      <div className="border-b-2 border-black pb-2 flex items-center justify-between">
        <h2 className="text-xl font-black uppercase tracking-tight text-black font-sans">
          Profilo Utente
        </h2>
        <span className="text-[10px] font-mono border border-black px-1.5 py-0.5 rounded bg-neutral-100 font-bold">
          ACCOUNT ATTIVO
        </span>
      </div>

      {/* REQUISITO:
          "In questa pagina si trova una scheda di account con:
           - la foto profilo,
           - il nome utente,
           - ID,
           - la quantità di monete,
           - e il numero di sfide completate."
      */}
      <div className="w-full bg-white border-2 border-black rounded-3xl p-4 shadow-[4px_4px_0px_#000] relative overflow-hidden">
        <div className="flex items-center gap-3.5 mb-4">
          {/* Foto profilo wireframe */}
          <div className="w-16 h-16 rounded-2xl border-2 border-black bg-neutral-100 flex items-center justify-center shrink-0 relative overflow-hidden shadow-[2px_2px_0px_#000]">
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none text-neutral-300"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line x1="0" y1="0" x2="100%" y2="100%" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="100%" y1="0" x2="0" y2="100%" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
            </svg>
            <User className="w-8 h-8 text-black stroke-[2] relative z-10" />
            <span className="absolute bottom-0 inset-x-0 bg-black text-white text-[7px] font-mono text-center py-0.5">
              AVATAR
            </span>
          </div>

          {/* Nome utente e ID */}
          <div className="flex-1">
            <span className="text-[10px] font-mono uppercase bg-neutral-100 border border-black px-1.5 py-0.2 rounded font-bold">
              ID: {profile.userId}
            </span>
            <h3 className="text-base font-bold text-black mt-1 leading-snug">
              {profile.username}
            </h3>
            <p className="text-[11px] text-neutral-600 line-clamp-1 mt-0.5">
              {profile.bio || 'Nessuna bio impostata'}
            </p>
          </div>
        </div>

        {/* Quantità di monete e numero di sfide completate */}
        <div className="grid grid-cols-2 gap-2.5 pt-3 border-t-2 border-dashed border-neutral-300">
          <div className="bg-neutral-50 border border-black rounded-xl p-2.5 text-center">
            <span className="text-[10px] font-mono uppercase text-neutral-500 block">
              Monete Disponibili
            </span>
            <div className="flex items-center justify-center gap-1 font-mono font-bold text-base text-black mt-0.5">
              <div className="w-4 h-4 rounded-full border border-black bg-white flex items-center justify-center text-[9px]">
                ¢
              </div>
              <span className="tabular-nums">{profile.coins}</span>
            </div>
          </div>

          <div className="bg-neutral-50 border border-black rounded-xl p-2.5 text-center">
            <span className="text-[10px] font-mono uppercase text-neutral-500 block">
              Sfide Completate
            </span>
            <div className="flex items-center justify-center gap-1 font-mono font-bold text-base text-black mt-0.5">
              <Award className="w-4 h-4 text-black stroke-[2]" />
              <span className="tabular-nums">{profile.completedChallengesCount}</span>
            </div>
          </div>
        </div>
      </div>

      {/* REQUISITO:
          "Sotto questa scheda ci sono altre 3 schede rettangolari con angoli arrotondati.
           Le schede si chiamano Dati, Preferenze e Notifiche, che a loro volta si potranno aprire
           in una nuova pagina con scritta 'Dati', 'Preferenze' e 'Notifiche' in alto al centro
           a seconda della pagina in cui si trova."
      */}
      <div className="space-y-3 pt-2">
        <span className="text-xs font-mono font-bold uppercase tracking-wider text-black">
          Impostazioni Account
        </span>

        {/* 1. Scheda Dati */}
        <button
          onClick={onOpenDati}
          aria-label="Apri impostazioni Dati"
          className="w-full bg-white hover:bg-neutral-50 active:translate-y-0.5 border-2 border-black rounded-2xl p-4 shadow-[3px_3px_0px_#000] flex items-center justify-between text-left transition-all cursor-pointer group"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl border-2 border-black bg-neutral-100 group-hover:bg-black group-hover:text-white flex items-center justify-center transition-colors">
              <FileText className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-black uppercase font-mono tracking-wider">
                Dati
              </h3>
              <p className="text-xs text-neutral-600 mt-0.5">
                Modifica nome utente, ID e dati account
              </p>
            </div>
          </div>

          <ChevronRight className="w-5 h-5 text-black stroke-[2.5] group-hover:translate-x-1 transition-transform" />
        </button>

        {/* 2. Scheda Preferenze */}
        <button
          onClick={onOpenPreferenze}
          aria-label="Apri impostazioni Preferenze"
          className="w-full bg-white hover:bg-neutral-50 active:translate-y-0.5 border-2 border-black rounded-2xl p-4 shadow-[3px_3px_0px_#000] flex items-center justify-between text-left transition-all cursor-pointer group"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl border-2 border-black bg-neutral-100 group-hover:bg-black group-hover:text-white flex items-center justify-center transition-colors">
              <Sliders className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-black uppercase font-mono tracking-wider">
                Preferenze
              </h3>
              <p className="text-xs text-neutral-600 mt-0.5">
                Abitudini, hobby e piaceri per sfide su misura
              </p>
            </div>
          </div>

          <ChevronRight className="w-5 h-5 text-black stroke-[2.5] group-hover:translate-x-1 transition-transform" />
        </button>

        {/* 3. Scheda Notifiche */}
        <button
          onClick={onOpenNotifiche}
          aria-label="Apri impostazioni Notifiche"
          className="w-full bg-white hover:bg-neutral-50 active:translate-y-0.5 border-2 border-black rounded-2xl p-4 shadow-[3px_3px_0px_#000] flex items-center justify-between text-left transition-all cursor-pointer group"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl border-2 border-black bg-neutral-100 group-hover:bg-black group-hover:text-white flex items-center justify-center transition-colors">
              <Bell className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-black uppercase font-mono tracking-wider">
                Notifiche
              </h3>
              <p className="text-xs text-neutral-600 mt-0.5">
                Avvisi giornalieri, scadenze e promemoria
              </p>
            </div>
          </div>

          <ChevronRight className="w-5 h-5 text-black stroke-[2.5] group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};
