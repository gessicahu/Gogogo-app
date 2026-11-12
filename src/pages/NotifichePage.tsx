import React, { useState } from 'react';
import { UserNotifications } from '../types/wireframe';
import { Bell, Check, Clock, Volume2, Save } from 'lucide-react';

interface NotifichePageProps {
  notifications: UserNotifications;
  onSaveNotifications: (updated: UserNotifications) => void;
}

export const NotifichePage: React.FC<NotifichePageProps> = ({
  notifications,
  onSaveNotifications,
}) => {
  const [dailyReminders, setDailyReminders] = useState(notifications.dailyReminders);
  const [challengeDeadlines, setChallengeDeadlines] = useState(notifications.challengeDeadlines);
  const [unlockAlerts, setUnlockAlerts] = useState(notifications.unlockAlerts);
  const [reminderTime, setReminderTime] = useState(notifications.notificationTime);
  const [savedFeedback, setSavedFeedback] = useState(false);

  const handleSave = () => {
    onSaveNotifications({
      dailyReminders,
      challengeDeadlines,
      unlockAlerts,
      notificationTime: reminderTime,
    });
    setSavedFeedback(true);
    setTimeout(() => setSavedFeedback(false), 2200);
  };

  return (
    <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 bg-white text-black">
      {/* Header */}
      <div className="border-b-2 border-black pb-2 flex items-center justify-between">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-black">
            Gestione Avvisi
          </span>
          <p className="text-xs text-neutral-600">
            Configura notifiche push e promemoria sfide quotidiane.
          </p>
        </div>
        <span className="text-[10px] font-mono border border-black px-1.5 py-0.5 rounded bg-neutral-100 font-bold">
          PUSH ATTIVE
        </span>
      </div>

      {savedFeedback && (
        <div className="p-2.5 bg-black text-white border-2 border-black rounded-xl text-center text-xs font-mono font-bold uppercase tracking-wider flex items-center justify-center gap-2 animate-in fade-in">
          <Check className="w-4 h-4 stroke-[3]" />
          <span>Impostazioni notifiche salvate!</span>
        </div>
      )}

      {/* Toggles */}
      <div className="space-y-3">
        {/* Toggle 1: Promemoria giornaliero */}
        <div className="flex items-center justify-between p-3 border-2 border-black rounded-2xl bg-white shadow-[2px_2px_0px_#000]">
          <div>
            <h3 className="text-xs font-bold text-black font-mono uppercase tracking-wider">
              Promemoria Quotidiano Sfide
            </h3>
            <p className="text-[11px] text-neutral-600">
              Ricevi un avviso per ricordarti di completare la sfida del giorno.
            </p>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={dailyReminders}
            onClick={() => setDailyReminders(!dailyReminders)}
            className={`w-12 h-6 border-2 border-black rounded-full transition-colors relative cursor-pointer ${
              dailyReminders ? 'bg-black' : 'bg-neutral-200'
            }`}
          >
            <div
              className={`w-4 h-4 rounded-full border border-black bg-white absolute top-0.5 transition-transform ${
                dailyReminders ? 'right-0.5' : 'left-0.5'
              }`}
            />
          </button>
        </div>

        {/* Toggle 2: Scadenza sfide */}
        <div className="flex items-center justify-between p-3 border-2 border-black rounded-2xl bg-white shadow-[2px_2px_0px_#000]">
          <div>
            <h3 className="text-xs font-bold text-black font-mono uppercase tracking-wider">
              Avviso Scadenze Settimanali
            </h3>
            <p className="text-[11px] text-neutral-600">
              Notifica 6 ore prima della fine della settimana o mese.
            </p>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={challengeDeadlines}
            onClick={() => setChallengeDeadlines(!challengeDeadlines)}
            className={`w-12 h-6 border-2 border-black rounded-full transition-colors relative cursor-pointer ${
              challengeDeadlines ? 'bg-black' : 'bg-neutral-200'
            }`}
          >
            <div
              className={`w-4 h-4 rounded-full border border-black bg-white absolute top-0.5 transition-transform ${
                challengeDeadlines ? 'right-0.5' : 'left-0.5'
              }`}
            />
          </button>
        </div>

        {/* Toggle 3: Notifiche sblocchi GoLand */}
        <div className="flex items-center justify-between p-3 border-2 border-black rounded-2xl bg-white shadow-[2px_2px_0px_#000]">
          <div>
            <h3 className="text-xs font-bold text-black font-mono uppercase tracking-wider">
              Avviso Monete e Sblocchi
            </h3>
            <p className="text-[11px] text-neutral-600">
              Notifica quando hai abbastanza monetine per un nuovo terreno.
            </p>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={unlockAlerts}
            onClick={() => setUnlockAlerts(!unlockAlerts)}
            className={`w-12 h-6 border-2 border-black rounded-full transition-colors relative cursor-pointer ${
              unlockAlerts ? 'bg-black' : 'bg-neutral-200'
            }`}
          >
            <div
              className={`w-4 h-4 rounded-full border border-black bg-white absolute top-0.5 transition-transform ${
                unlockAlerts ? 'right-0.5' : 'left-0.5'
              }`}
            />
          </button>
        </div>

        {/* Orario Promemoria */}
        <div className="p-3 border-2 border-black rounded-2xl bg-neutral-50 shadow-[2px_2px_0px_#000]">
          <label
            htmlFor="reminder-time-input"
            className="block text-xs font-mono font-bold uppercase tracking-wider text-black mb-1"
          >
            Orario Preferito del Promemoria
          </label>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-black" />
            <input
              id="reminder-time-input"
              type="time"
              value={reminderTime}
              onChange={(e) => setReminderTime(e.target.value)}
              className="px-3 py-1.5 bg-white border-2 border-black rounded-xl text-xs font-mono font-bold text-black"
            />
          </div>
        </div>
      </div>

      <div className="pt-2">
        <button
          onClick={handleSave}
          className="w-full py-3 bg-black text-white hover:bg-neutral-800 border-2 border-black rounded-xl font-bold text-xs uppercase tracking-wider shadow-[3px_3px_0px_#71717a] active:translate-y-0.5 cursor-pointer transition-all flex items-center justify-center gap-2"
        >
          <Save className="w-4 h-4 stroke-[2.5]" />
          <span>Salva Impostazioni</span>
        </button>
      </div>
    </div>
  );
};
