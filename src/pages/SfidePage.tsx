import React from 'react';
import { Challenge, ChallengeCategory } from '../types/wireframe';
import { Calendar, Clock, Trophy, Camera, ChevronRight, CheckCircle2 } from 'lucide-react';

interface SfidePageProps {
  challenges: Challenge[];
  onSelectAvailableChallenge: (challenge: Challenge) => void;
  onSelectAcceptedChallenge: (challenge: Challenge) => void;
}

export const SfidePage: React.FC<SfidePageProps> = ({
  challenges,
  onSelectAvailableChallenge,
  onSelectAcceptedChallenge,
}) => {
  // Separate accepted challenges from available ones
  const acceptedChallenges = challenges.filter((c) => c.status === 'accepted');

  const categories: { key: ChallengeCategory; label: string; icon: React.ElementType }[] = [
    { key: 'giornaliere', label: 'Sfide giornaliere', icon: Clock },
    { key: 'settimanali', label: 'Sfide settimanali', icon: Calendar },
    { key: 'mensili', label: 'Sfide mensili', icon: Trophy },
  ];

  return (
    <div className="flex-1 overflow-y-auto px-4 py-4 space-y-5 bg-white text-black">
      {/* In alto a sinistra la scritta "Le mie sfide" */}
      <div className="flex items-center justify-between border-b-2 border-black pb-2">
        <h2 className="text-xl font-black uppercase tracking-tight text-black font-sans">
          Le mie sfide
        </h2>
        <span className="text-[10px] font-mono border border-black px-1.5 py-0.5 rounded bg-neutral-100 font-bold">
          LIVELLO 1 · INIZIATO
        </span>
      </div>

      {/* Hero Section:
          "Sotto al centro la scritta 'Let’s Go! Inizia una nuova sfida'.
           Le sfide accettate andranno in cima alla pagina andando a sostituire la scritta
           'Let’s Go! Inizia una nuova sfida', che compare solo in caso non ci fossero sfide accettate."
      */}
      {acceptedChallenges.length === 0 ? (
        <div className="w-full border-2 border-dashed border-black rounded-2xl p-5 text-center bg-neutral-50 flex flex-col items-center justify-center min-h-[110px]">
          <span className="text-sm font-mono font-bold uppercase tracking-wider text-black">
            Let’s Go! Inizia una nuova sfida
          </span>
          <p className="text-xs font-mono text-neutral-500 mt-1 max-w-[260px]">
            Scegli una sfida tra giornaliere, settimanali o mensili qui sotto per cominciare.
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold uppercase tracking-wide text-black flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-black animate-ping inline-block" />
              Sfida Accettata (Tocca per scattare foto o annullare):
            </span>
            <span className="text-[10px] font-mono bg-black text-white px-1.5 py-0.5 rounded font-bold">
              {acceptedChallenges.length} ATTIVA
            </span>
          </div>

          {acceptedChallenges.map((challenge) => (
            <div
              key={challenge.id}
              onClick={() => onSelectAcceptedChallenge(challenge)}
              role="button"
              tabIndex={0}
              aria-label={`Sfida attiva: ${challenge.title}. Clicca per completare o annullare.`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  onSelectAcceptedChallenge(challenge);
                }
              }}
              className="w-full bg-neutral-100 border-2 border-black rounded-2xl p-3.5 shadow-[4px_4px_0px_#000] hover:bg-neutral-200 active:translate-y-0.5 transition-all cursor-pointer text-left flex items-center justify-between gap-3"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-mono font-bold uppercase bg-black text-white px-2 py-0.5 rounded">
                    In Corso
                  </span>
                  <span className="text-xs font-mono text-neutral-600 font-semibold">
                    +{challenge.rewardCoins} monete
                  </span>
                </div>
                <h3 className="text-sm font-bold text-black leading-tight">
                  {challenge.title}
                </h3>
                <p className="text-xs text-neutral-700 line-clamp-1 mt-0.5">
                  {challenge.description}
                </p>
              </div>

              <div className="w-10 h-10 rounded-xl border-2 border-black bg-white flex flex-col items-center justify-center shrink-0">
                <Camera className="w-5 h-5 text-black stroke-[2.5]" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Sotto sono presenti una serie di schede rettangolari con angoli arrotondati,
          divisi in: sfide giornaliere, sfide settimanali e sfide mensili.
      */}
      <div className="space-y-5 pt-1">
        {categories.map((cat) => {
          const categoryChallenges = challenges.filter(
            (c) => c.category === cat.key && c.status === 'available'
          );
          const CatIcon = cat.icon;

          return (
            <div key={cat.key} className="space-y-2.5">
              <div className="flex items-center gap-2 pb-1 border-b border-neutral-300">
                <CatIcon className="w-4 h-4 text-black stroke-[2.5]" />
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-black">
                  {cat.label}
                </h3>
                <span className="text-[10px] font-mono text-neutral-500 ml-auto">
                  {categoryChallenges.length} disponibili
                </span>
              </div>

              {categoryChallenges.length === 0 ? (
                <div className="p-3 border border-dashed border-neutral-400 rounded-xl text-center text-xs font-mono text-neutral-500 bg-neutral-50">
                  Nessuna sfida disponibile al momento.
                </div>
              ) : (
                <div className="space-y-2">
                  {categoryChallenges.map((challenge) => (
                    <div
                      key={challenge.id}
                      onClick={() => onSelectAvailableChallenge(challenge)}
                      role="button"
                      tabIndex={0}
                      aria-label={`Sfida: ${challenge.title}. Clicca per visualizzare i dettagli.`}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          onSelectAvailableChallenge(challenge);
                        }
                      }}
                      className="w-full bg-white border-2 border-black rounded-2xl p-3 shadow-[2px_2px_0px_#000] hover:bg-neutral-50 active:translate-y-0.5 transition-all cursor-pointer text-left flex items-center justify-between gap-3 group"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-1.5 mb-1">
                          <span className="text-[10px] font-mono uppercase bg-neutral-100 border border-black px-1.5 py-0.2 rounded font-bold">
                            {cat.key}
                          </span>
                          <span className="text-xs font-mono font-bold text-black">
                            +{challenge.rewardCoins} ¢
                          </span>
                        </div>
                        <h4 className="text-xs font-bold text-black leading-snug">
                          {challenge.title}
                        </h4>
                        <p className="text-[11px] text-neutral-600 line-clamp-1 mt-0.5">
                          {challenge.description}
                        </p>
                      </div>

                      <div className="w-8 h-8 rounded-lg border border-black bg-neutral-100 flex items-center justify-center shrink-0 group-hover:bg-black group-hover:text-white transition-colors">
                        <ChevronRight className="w-4 h-4 stroke-[2.5]" />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
