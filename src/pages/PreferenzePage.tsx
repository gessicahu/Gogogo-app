import React, { useState } from 'react';
import { UserPreferences } from '../types/wireframe';
import { Check, Sparkles, SlidersHorizontal, Save } from 'lucide-react';

interface PreferenzePageProps {
  preferences: UserPreferences;
  onSavePreferences: (updated: UserPreferences) => void;
}

export const PreferenzePage: React.FC<PreferenzePageProps> = ({
  preferences,
  onSavePreferences,
}) => {
  const [selectedHobbies, setSelectedHobbies] = useState<string[]>(preferences.hobbies);
  const [selectedLifestyle, setSelectedLifestyle] = useState<string[]>(preferences.lifestyle);
  const [intensity, setIntensity] = useState<UserPreferences['challengeIntensity']>(
    preferences.challengeIntensity
  );
  const [savedFeedback, setSavedFeedback] = useState(false);

  const availableHobbies = [
    'Lettura',
    'Fitness',
    'Cucina sana',
    'Fotografia',
    'Meditazione',
    'Corsa',
    'Pittura',
    'Giardinaggio',
    'Digital Detox',
    'Musica',
  ];

  const availableLifestyle = [
    'Sveglia presto',
    'Outdoor & Natura',
    'Focus Studio/Lavoro',
    'Sociale & Amici',
    'Minimalismo',
  ];

  const toggleHobby = (hobby: string) => {
    if (selectedHobbies.includes(hobby)) {
      setSelectedHobbies(selectedHobbies.filter((h) => h !== hobby));
    } else {
      setSelectedHobbies([...selectedHobbies, hobby]);
    }
  };

  const toggleLifestyle = (item: string) => {
    if (selectedLifestyle.includes(item)) {
      setSelectedLifestyle(selectedLifestyle.filter((l) => l !== item));
    } else {
      setSelectedLifestyle([...selectedLifestyle, item]);
    }
  };

  const handleSave = () => {
    onSavePreferences({
      hobbies: selectedHobbies,
      lifestyle: selectedLifestyle,
      challengeIntensity: intensity,
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
            Personalizzazione Sfide
          </span>
          <p className="text-xs text-neutral-600">
            Scegli abitudini, hobby e piaceri per generare sfide su misura.
          </p>
        </div>
        <span className="text-[10px] font-mono border border-black px-1.5 py-0.5 rounded bg-neutral-100 font-bold">
          {selectedHobbies.length} SCELTI
        </span>
      </div>

      {savedFeedback && (
        <div className="p-2.5 bg-black text-white border-2 border-black rounded-xl text-center text-xs font-mono font-bold uppercase tracking-wider flex items-center justify-center gap-2 animate-in fade-in">
          <Check className="w-4 h-4 stroke-[3]" />
          <span>Preferenze salvate! Algoritmo sfide aggiornato.</span>
        </div>
      )}

      {/* 1. Hobby e Interessi */}
      <div className="space-y-2">
        <label className="block text-xs font-mono font-bold uppercase tracking-wider text-black">
          1. I Tuoi Hobby & Piaceri
        </label>
        <div className="flex flex-wrap gap-2">
          {availableHobbies.map((hobby) => {
            const isSelected = selectedHobbies.includes(hobby);
            return (
              <button
                key={hobby}
                type="button"
                onClick={() => toggleHobby(hobby)}
                aria-pressed={isSelected}
                className={`py-1.5 px-3 rounded-xl border-2 border-black text-xs font-mono transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-black text-white font-bold shadow-[2px_2px_0px_#52525b]'
                    : 'bg-white text-black hover:bg-neutral-100 font-medium'
                }`}
              >
                {isSelected ? `✓ ${hobby}` : hobby}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Stile di Vita e Abitudini */}
      <div className="space-y-2 pt-2 border-t border-neutral-300">
        <label className="block text-xs font-mono font-bold uppercase tracking-wider text-black">
          2. Stile di Vita & Abitudini Quotidiane
        </label>
        <div className="flex flex-wrap gap-2">
          {availableLifestyle.map((life) => {
            const isSelected = selectedLifestyle.includes(life);
            return (
              <button
                key={life}
                type="button"
                onClick={() => toggleLifestyle(life)}
                aria-pressed={isSelected}
                className={`py-1.5 px-3 rounded-xl border-2 border-black text-xs font-mono transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-black text-white font-bold shadow-[2px_2px_0px_#52525b]'
                    : 'bg-white text-black hover:bg-neutral-100 font-medium'
                }`}
              >
                {isSelected ? `✓ ${life}` : life}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Intensità Sfide */}
      <div className="space-y-2 pt-2 border-t border-neutral-300">
        <label className="block text-xs font-mono font-bold uppercase tracking-wider text-black">
          3. Livello d’Impegno Desiderato
        </label>
        <div className="grid grid-cols-3 gap-2">
          {(['bassa', 'media', 'alta'] as const).map((lvl) => (
            <button
              key={lvl}
              type="button"
              onClick={() => setIntensity(lvl)}
              className={`py-2 rounded-xl border-2 border-black text-xs font-mono uppercase tracking-wider font-bold transition-all ${
                intensity === lvl
                  ? 'bg-black text-white shadow-[2px_2px_0px_#52525b]'
                  : 'bg-neutral-50 text-black hover:bg-neutral-100'
              }`}
            >
              {lvl}
            </button>
          ))}
        </div>
      </div>

      {/* Save Button */}
      <div className="pt-2">
        <button
          onClick={handleSave}
          className="w-full py-3 bg-black text-white hover:bg-neutral-800 border-2 border-black rounded-xl font-bold text-xs uppercase tracking-wider shadow-[3px_3px_0px_#71717a] active:translate-y-0.5 cursor-pointer transition-all flex items-center justify-center gap-2"
        >
          <Save className="w-4 h-4 stroke-[2.5]" />
          <span>Salva Preferenze</span>
        </button>
      </div>
    </div>
  );
};
