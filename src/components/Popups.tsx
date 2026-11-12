import React, { useState } from 'react';
import { X, RotateCw, Camera, Check, AlertCircle, Coins, Lock, Trash2 } from 'lucide-react';
import { Challenge, Land } from '../types/wireframe';
import { WireframeImagePlaceholder } from './WireframeAsset';

/* -------------------------------------------------------------
 * 1. Pop-up Dettagli Sfida (con stato Errore / Rinvio)
 * -----------------------------------------------------------*/
interface ChallengeDetailModalProps {
  challenge: Challenge;
  isOpen: boolean;
  onClose: () => void;
  onAccept: (challengeId: string) => void;
}

export const ChallengeDetailModal: React.FC<ChallengeDetailModalProps> = ({
  challenge,
  isOpen,
  onClose,
  onAccept,
}) => {
  const [hasError, setHasError] = useState<boolean>(false);
  const [isAccepted, setIsAccepted] = useState<boolean>(false);
  const [isRetrying, setIsRetrying] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleAcceptClick = () => {
    setIsAccepted(true);
    setTimeout(() => {
      onAccept(challenge.id);
      setIsAccepted(false);
      onClose();
    }, 1100);
  };

  const handleRetry = () => {
    setIsRetrying(true);
    setTimeout(() => {
      setIsRetrying(false);
      setHasError(false);
    }, 450);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-challenge-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-[2px]"
    >
      <div className="relative w-full max-w-[340px] bg-white border-2 border-black rounded-2xl shadow-[6px_6px_0px_#000] p-5 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header bar of popup */}
        <div className="flex items-center justify-between pb-3 mb-3 border-b-2 border-black">
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-mono uppercase bg-neutral-200 border border-black px-1.5 py-0.5 font-bold">
              POP-UP // {challenge.category.toUpperCase()}
            </span>
          </div>

          <div className="flex items-center gap-1">
            {/* Toggle to simulate error state for wireframe testing */}
            <button
              onClick={() => setHasError(!hasError)}
              title="Testa stato errore / icona di rinvio"
              className="text-[10px] font-mono border border-black px-1.5 py-0.5 rounded bg-neutral-100 hover:bg-neutral-200"
            >
              {hasError ? 'Ripristina' : 'Simula Errore'}
            </button>
            <button
              onClick={onClose}
              aria-label="Chiudi popup"
              className="w-7 h-7 rounded border border-black flex items-center justify-center hover:bg-neutral-100"
            >
              <X className="w-4 h-4 text-black stroke-[2.5]" />
            </button>
          </div>
        </div>

        {/* ERROR STATE: In caso di errore di caricamento del pop-up e malfunzionamento del bottone */}
        {hasError ? (
          <div className="py-8 flex flex-col items-center justify-center text-center">
            <div className="w-12 h-12 rounded-full border-2 border-black bg-neutral-100 flex items-center justify-center mb-3">
              <AlertCircle className="w-6 h-6 text-black stroke-[2]" />
            </div>
            <p className="text-xs font-mono text-neutral-600 mb-4 px-2">
              Errore di caricamento del pop-up e malfunzionamento del bottone.
            </p>

            {/* Bottone con l'icona di rinvio in mezzo al pop-up */}
            <button
              onClick={handleRetry}
              aria-label="Riprova caricamento"
              className="w-14 h-14 rounded-2xl border-2 border-black bg-black text-white hover:bg-neutral-800 flex items-center justify-center shadow-[3px_3px_0px_#71717a] active:translate-y-0.5 transition-transform"
            >
              <RotateCw
                className={`w-7 h-7 text-white stroke-[2.5] ${
                  isRetrying ? 'animate-spin' : ''
                }`}
              />
            </button>
            <span className="text-[10px] font-mono font-bold mt-2 uppercase tracking-wider">
              Premi per rinvio
            </span>
          </div>
        ) : (
          /* NORMAL POP-UP CONTENT */
          <div>
            <div className="mb-4">
              <h2
                id="modal-challenge-title"
                className="text-base font-bold text-black tracking-tight mb-2 leading-snug"
              >
                {challenge.title}
              </h2>
              <p className="text-xs font-normal text-neutral-700 leading-relaxed border-l-2 border-black pl-2.5 py-0.5 bg-neutral-50 mb-3">
                {challenge.description}
              </p>

              {/* Wireframe Placeholder for challenge visual */}
              <WireframeImagePlaceholder
                label="[ SCHEMA_SFIDA ]"
                aspectRatio="aspect-[16/7]"
                className="rounded-lg mb-3"
              />

              <div className="flex items-center justify-between text-xs font-mono bg-neutral-100 border border-black p-2 rounded-lg">
                <span className="font-medium text-neutral-800">Ricompensa:</span>
                <div className="flex items-center gap-1 font-bold">
                  <div className="w-3.5 h-3.5 rounded-full border border-black bg-white flex items-center justify-center text-[9px]">
                    ¢
                  </div>
                  <span>+{challenge.rewardCoins} monetine</span>
                </div>
              </div>
            </div>

            {/* Bottom center button "accetta la sfida" */}
            <div className="flex flex-col items-center justify-center pt-2">
              {isAccepted ? (
                <div className="w-full py-2.5 bg-black text-white border-2 border-black rounded-xl text-center font-bold text-xs flex items-center justify-center gap-2 animate-bounce">
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>Sfida accettata!</span>
                </div>
              ) : (
                <button
                  onClick={handleAcceptClick}
                  className="w-full py-2.5 px-4 bg-black text-white hover:bg-neutral-800 border-2 border-black rounded-xl font-bold text-xs uppercase tracking-wider shadow-[3px_3px_0px_#52525b] active:translate-y-0.5 cursor-pointer transition-all flex items-center justify-center gap-2"
                >
                  <span>accetta la sfida</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

/* -------------------------------------------------------------
 * 2. Pop-up Sfida Accettata (Annulla o Scatta Foto)
 * -----------------------------------------------------------*/
interface AcceptedChallengeModalProps {
  challenge: Challenge;
  isOpen: boolean;
  onClose: () => void;
  onCancel: (challengeId: string) => void;
  onCompleteWithPhoto: (challengeId: string, photoDataUrl: string) => void;
}

export const AcceptedChallengeModal: React.FC<AcceptedChallengeModalProps> = ({
  challenge,
  isOpen,
  onClose,
  onCancel,
  onCompleteWithPhoto,
}) => {
  const [cancelStatus, setCancelStatus] = useState<string | null>(null);
  const [isCameraActive, setIsCameraActive] = useState<boolean>(false);
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCancelClick = () => {
    setCancelStatus('Annullo riuscito');
    setTimeout(() => {
      onCancel(challenge.id);
      setCancelStatus(null);
      onClose();
    }, 1100);
  };

  const handleSimulatePhotoSnap = () => {
    // Generate an instant low-fi wireframe photo representation
    const photoSketch = 'captured_wireframe_photo';
    setCapturedPhoto(photoSketch);
    setIsCameraActive(false);
  };

  const handleConfirmCompletion = () => {
    onCompleteWithPhoto(challenge.id, capturedPhoto || 'captured_wireframe_photo');
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-accepted-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-[2px]"
    >
      <div className="relative w-full max-w-[340px] bg-white border-2 border-black rounded-2xl shadow-[6px_6px_0px_#000] p-5 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 mb-3 border-b-2 border-black">
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-mono uppercase bg-black text-white px-2 py-0.5 rounded font-bold">
              SFIDA IN CORSO
            </span>
          </div>
          <button
            onClick={onClose}
            aria-label="Chiudi popup"
            className="w-7 h-7 rounded border border-black flex items-center justify-center hover:bg-neutral-100"
          >
            <X className="w-4 h-4 text-black stroke-[2.5]" />
          </button>
        </div>

        {/* Cancel Feedback Banner */}
        {cancelStatus ? (
          <div className="py-8 flex flex-col items-center justify-center text-center">
            <div className="w-12 h-12 rounded-full border-2 border-black bg-neutral-100 flex items-center justify-center mb-2">
              <Check className="w-6 h-6 text-black stroke-[3]" />
            </div>
            <p className="text-sm font-bold text-black uppercase tracking-wider">
              {cancelStatus}
            </p>
            <span className="text-[11px] font-mono text-neutral-500 mt-1">
              La scheda ritornerà al posto di prima.
            </span>
          </div>
        ) : (
          <div>
            <h2
              id="modal-accepted-title"
              className="text-base font-bold text-black tracking-tight mb-1"
            >
              {challenge.title}
            </h2>
            <p className="text-xs text-neutral-600 mb-3 leading-relaxed">
              {challenge.description}
            </p>

            {/* Wireframe Camera Viewfinder Section */}
            {isCameraActive ? (
              <div className="bg-black text-white p-3 rounded-xl border-2 border-black mb-3 text-center">
                <div className="relative h-40 border border-dashed border-neutral-400 rounded-lg flex flex-col items-center justify-center mb-3 overflow-hidden bg-neutral-900">
                  {/* Viewfinder crosshairs */}
                  <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-white" />
                  <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-white" />
                  <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-white" />
                  <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-white" />
                  <div className="w-6 h-6 rounded-full border border-white flex items-center justify-center opacity-60">
                    <div className="w-1.5 h-1.5 bg-white rounded-full" />
                  </div>
                  <span className="text-[10px] font-mono mt-2 text-neutral-300">
                    INQUADRA E SCATTA
                  </span>
                </div>

                <div className="flex gap-2 justify-center">
                  <button
                    onClick={handleSimulatePhotoSnap}
                    className="py-2 px-4 bg-white text-black font-bold text-xs rounded-lg uppercase tracking-wider flex items-center gap-1.5 hover:bg-neutral-200"
                  >
                    <Camera className="w-4 h-4" />
                    <span>Scatta</span>
                  </button>
                  <button
                    onClick={() => setIsCameraActive(false)}
                    className="py-2 px-3 border border-neutral-500 text-neutral-300 text-xs rounded-lg hover:text-white"
                  >
                    Annulla vista
                  </button>
                </div>
              </div>
            ) : capturedPhoto ? (
              <div className="mb-3 border-2 border-black rounded-xl p-3 bg-neutral-50">
                <div className="h-32 bg-white border border-black rounded-lg flex flex-col items-center justify-center relative mb-2 overflow-hidden">
                  <div className="w-10 h-10 rounded-full border-2 border-black bg-neutral-100 flex items-center justify-center mb-1">
                    <Check className="w-5 h-5 text-black stroke-[3]" />
                  </div>
                  <span className="text-xs font-mono font-bold uppercase text-black">
                    FOTO_ACQUISITA.RAW
                  </span>
                  <span className="text-[10px] font-mono text-neutral-500">
                    Pronta per l’invio al Diario
                  </span>
                </div>

                <button
                  onClick={handleConfirmCompletion}
                  className="w-full py-2.5 bg-black text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-neutral-800 flex items-center justify-center gap-2 shadow-[2px_2px_0px_#52525b]"
                >
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>Conferma e guadagna +{challenge.rewardCoins} monete</span>
                </button>
              </div>
            ) : (
              <div className="space-y-2.5">
                {/* Main Action: Scatta una foto */}
                <button
                  onClick={() => setIsCameraActive(true)}
                  className="w-full py-3 px-4 bg-black text-white hover:bg-neutral-800 border-2 border-black rounded-xl font-bold text-xs uppercase tracking-wider shadow-[3px_3px_0px_#52525b] active:translate-y-0.5 cursor-pointer transition-all flex items-center justify-center gap-2"
                >
                  <Camera className="w-4 h-4 stroke-[2.5]" />
                  <span>Scatta foto per completare</span>
                </button>

                {/* Cancel Challenge Action */}
                <button
                  onClick={handleCancelClick}
                  className="w-full py-2 px-4 bg-white text-neutral-700 hover:bg-neutral-100 border-2 border-black rounded-xl font-semibold text-xs tracking-wide cursor-pointer transition-all flex items-center justify-center gap-1.5"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Annulla la sfida</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

/* -------------------------------------------------------------
 * 3. Pop-up Sblocco Terreno GoLand
 * -----------------------------------------------------------*/
interface UnlockLandModalProps {
  land: Land | null;
  isOpen: boolean;
  userCoins: number;
  onClose: () => void;
  onUnlock: (landId: number) => void;
}

export const UnlockLandModal: React.FC<UnlockLandModalProps> = ({
  land,
  isOpen,
  userCoins,
  onClose,
  onUnlock,
}) => {
  if (!isOpen || !land) return null;

  const canAfford = userCoins >= land.unlockCost;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-unlock-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-[2px]"
    >
      <div className="relative w-full max-w-[320px] bg-white border-2 border-black rounded-2xl shadow-[6px_6px_0px_#000] p-5 animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between pb-2 mb-3 border-b-2 border-black">
          <span className="text-[10px] font-mono uppercase bg-neutral-100 border border-black px-1.5 py-0.5 font-bold">
            SBLOCCA TERRENO
          </span>
          <button
            onClick={onClose}
            aria-label="Chiudi popup"
            className="w-7 h-7 rounded border border-black flex items-center justify-center hover:bg-neutral-100"
          >
            <X className="w-4 h-4 text-black stroke-[2.5]" />
          </button>
        </div>

        <div className="flex flex-col items-center text-center my-3">
          <div className="w-14 h-14 rounded-2xl border-2 border-black bg-neutral-100 flex items-center justify-center mb-3">
            <Lock className="w-7 h-7 text-black stroke-[2.5]" />
          </div>
          <h2 id="modal-unlock-title" className="text-base font-bold text-black mb-1">
            {land.name}
          </h2>
          <p className="text-xs text-neutral-600 mb-4 px-2">
            {land.description}
          </p>

          <div className="w-full bg-neutral-100 border border-black rounded-xl p-2.5 mb-4 flex items-center justify-between text-xs font-mono">
            <span>Costo di sblocco:</span>
            <div className="flex items-center gap-1 font-bold">
              <div className="w-4 h-4 rounded-full border border-black bg-white flex items-center justify-center text-[10px]">
                ¢
              </div>
              <span>{land.unlockCost} monete</span>
            </div>
          </div>

          {canAfford ? (
            <button
              onClick={() => {
                onUnlock(land.id);
                onClose();
              }}
              className="w-full py-2.5 bg-black text-white hover:bg-neutral-800 border-2 border-black rounded-xl font-bold text-xs uppercase tracking-wider shadow-[3px_3px_0px_#52525b] active:translate-y-0.5"
            >
              Compra e sblocca ora
            </button>
          ) : (
            <div className="w-full">
              <button
                disabled
                className="w-full py-2.5 bg-neutral-300 text-neutral-600 border-2 border-neutral-400 rounded-xl font-bold text-xs uppercase tracking-wider cursor-not-allowed mb-2"
              >
                Monete insufficienti
              </button>
              <p className="text-[10px] font-mono text-neutral-500">
                Ti mancano {land.unlockCost - userCoins} monetine. Completa altre sfide!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
