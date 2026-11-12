import React, { useState } from 'react';
import { UserProfile } from '../types/wireframe';
import { Check, Camera, User, Save } from 'lucide-react';

interface DatiPageProps {
  profile: UserProfile;
  onSaveProfile: (updated: Partial<UserProfile>) => void;
}

export const DatiPage: React.FC<DatiPageProps> = ({ profile, onSaveProfile }) => {
  const [username, setUsername] = useState(profile.username);
  const [userId, setUserId] = useState(profile.userId);
  const [bio, setBio] = useState(profile.bio || '');
  const [savedFeedback, setSavedFeedback] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveProfile({
      username: username.trim() || profile.username,
      userId: userId.trim().startsWith('@') ? userId.trim() : `@${userId.trim()}`,
      bio: bio.trim(),
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
            Modifica Dati Account
          </span>
          <p className="text-xs text-neutral-600">
            I cambiamenti verranno aggiornati nella scheda del tuo Profilo.
          </p>
        </div>
        <span className="text-[10px] font-mono border border-black px-1.5 py-0.5 rounded bg-neutral-100 font-bold">
          LIVELLO 1
        </span>
      </div>

      {savedFeedback && (
        <div className="p-3 bg-black text-white border-2 border-black rounded-xl text-center text-xs font-mono font-bold uppercase tracking-wider flex items-center justify-center gap-2 animate-in fade-in">
          <Check className="w-4 h-4 stroke-[3]" />
          <span>Dati della scheda account aggiornati!</span>
        </div>
      )}

      {/* Avatar wireframe box */}
      <div className="flex flex-col items-center justify-center py-2">
        <div className="relative w-20 h-20 rounded-2xl border-2 border-black bg-neutral-100 flex items-center justify-center overflow-hidden mb-2 shadow-[2px_2px_0px_#000]">
          <User className="w-10 h-10 text-black stroke-[2]" />
          <button
            type="button"
            className="absolute bottom-1 right-1 w-6 h-6 rounded-lg bg-black text-white flex items-center justify-center border border-white"
            title="Cambia avatar wireframe"
          >
            <Camera className="w-3.5 h-3.5" />
          </button>
        </div>
        <span className="text-[10px] font-mono text-neutral-500 uppercase">
          [FOTO_PROFILO_WIREFRAME]
        </span>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="username-input"
            className="block text-xs font-mono font-bold uppercase tracking-wider text-black mb-1"
          >
            Nome Utente
          </label>
          <input
            id="username-input"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full px-3 py-2.5 bg-neutral-50 border-2 border-black rounded-xl text-xs font-sans text-black focus:outline-none focus:bg-white shadow-[2px_2px_0px_#000]"
          />
        </div>

        <div>
          <label
            htmlFor="userid-input"
            className="block text-xs font-mono font-bold uppercase tracking-wider text-black mb-1"
          >
            ID Account
          </label>
          <input
            id="userid-input"
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
            className="w-full px-3 py-2.5 bg-neutral-50 border-2 border-black rounded-xl text-xs font-mono text-black focus:outline-none focus:bg-white shadow-[2px_2px_0px_#000]"
          />
        </div>

        <div>
          <label
            htmlFor="bio-input"
            className="block text-xs font-mono font-bold uppercase tracking-wider text-black mb-1"
          >
            Biografia Breve
          </label>
          <textarea
            id="bio-input"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={3}
            className="w-full px-3 py-2 bg-neutral-50 border-2 border-black rounded-xl text-xs font-sans text-black focus:outline-none focus:bg-white shadow-[2px_2px_0px_#000] resize-none"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-black text-white hover:bg-neutral-800 border-2 border-black rounded-xl font-bold text-xs uppercase tracking-wider shadow-[3px_3px_0px_#71717a] active:translate-y-0.5 cursor-pointer transition-all flex items-center justify-center gap-2"
        >
          <Save className="w-4 h-4 stroke-[2.5]" />
          <span>Salva Modifiche Scheda</span>
        </button>
      </form>
    </div>
  );
};
