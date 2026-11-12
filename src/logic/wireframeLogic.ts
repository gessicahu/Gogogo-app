import {
  Challenge,
  DiaryEntry,
  FurnitureItem,
  Land,
  UserProfile,
} from '../types/wireframe';

export interface AppState {
  challenges: Challenge[];
  diaryEntries: DiaryEntry[];
  lands: Land[];
  arredi: FurnitureItem[];
  negozio: FurnitureItem[];
  profile: UserProfile;
}

/**
 * Accetta una sfida: imposta lo stato della sfida su 'accepted'.
 * Solo una sfida alla volta o più sfide possono essere accettate.
 */
export function acceptChallenge(
  challenges: Challenge[],
  challengeId: string
): Challenge[] {
  return challenges.map((c) =>
    c.id === challengeId ? { ...c, status: 'accepted' as const } : c
  );
}

/**
 * Annulla una sfida accettata: torna a 'available'.
 */
export function cancelChallenge(
  challenges: Challenge[],
  challengeId: string
): Challenge[] {
  return challenges.map((c) =>
    c.id === challengeId ? { ...c, status: 'available' as const } : c
  );
}

/**
 * Completa una sfida scattando una foto:
 * - Aggiunge la scheda completata al Diario
 * - Aggiunge le monete guadagnate al profilo
 * - Incrementa il contatore delle sfide completate
 * - Imposta lo stato della sfida su 'completed'
 */
export function completeChallengeWithPhoto(
  state: AppState,
  challengeId: string,
  photoUrl: string
): {
  success: boolean;
  newState?: AppState;
  errorMessage?: string;
  earnedCoins?: number;
} {
  const target = state.challenges.find((c) => c.id === challengeId);
  if (!target) {
    return { success: false, errorMessage: 'Sfida non trovata' };
  }

  const earnedCoins = target.rewardCoins;

  const updatedChallenges = state.challenges.map((c) =>
    c.id === challengeId ? { ...c, status: 'completed' as const } : c
  );

  const newDiaryEntry: DiaryEntry = {
    id: `diary-${Date.now()}-${target.id}`,
    challengeId: target.id,
    title: target.title,
    description: target.description,
    photoUrl: photoUrl || 'wireframe_placeholder_photo',
    completedAt: 'Oggi',
    rewardCoins: earnedCoins,
  };

  const updatedProfile: UserProfile = {
    ...state.profile,
    coins: state.profile.coins + earnedCoins,
    completedChallengesCount: state.profile.completedChallengesCount + 1,
  };

  return {
    success: true,
    earnedCoins,
    newState: {
      ...state,
      challenges: updatedChallenges,
      diaryEntries: [newDiaryEntry, ...state.diaryEntries],
      profile: updatedProfile,
    },
  };
}

/**
 * Compra un oggetto dal negozio:
 * - Verifica disponibilità monetine
 * - Scala le monetine
 * - Rimuove dal Negozio
 * - Aggiunge agli Arredi
 */
export function buyShopItem(
  state: AppState,
  itemId: string
): {
  success: boolean;
  newState?: AppState;
  errorMessage?: string;
  isShopNowEmpty?: boolean;
} {
  const item = state.negozio.find((i) => i.id === itemId);
  if (!item) {
    return { success: false, errorMessage: 'Oggetto non trovato nel negozio' };
  }

  if (state.profile.coins < item.cost) {
    return {
      success: false,
      errorMessage: `Monete insufficienti! Ti servono ${item.cost} monete, ne hai ${state.profile.coins}.`,
    };
  }

  const updatedProfile: UserProfile = {
    ...state.profile,
    coins: state.profile.coins - item.cost,
  };

  const updatedNegozio = state.negozio.filter((i) => i.id !== itemId);
  const updatedArredi: FurnitureItem[] = [
    ...state.arredi,
    { ...item, isPlacedInCasa: false },
  ];

  return {
    success: true,
    isShopNowEmpty: updatedNegozio.length === 0,
    newState: {
      ...state,
      profile: updatedProfile,
      negozio: updatedNegozio,
      arredi: updatedArredi,
    },
  };
}

/**
 * Posiziona o rimuove un arredo dalla Casa
 */
export function toggleFurnitureInCasa(
  arredi: FurnitureItem[],
  itemId: string
): FurnitureItem[] {
  return arredi.map((f) =>
    f.id === itemId ? { ...f, isPlacedInCasa: !f.isPlacedInCasa } : f
  );
}

/**
 * Sblocca un terreno in GoLand con monetine
 */
export function unlockLand(
  lands: Land[],
  profile: UserProfile,
  landId: number
): {
  success: boolean;
  updatedLands?: Land[];
  updatedProfile?: UserProfile;
  errorMessage?: string;
} {
  const land = lands.find((l) => l.id === landId);
  if (!land) {
    return { success: false, errorMessage: 'Terreno non trovato' };
  }
  if (land.isUnlocked) {
    return { success: false, errorMessage: 'Terreno già sbloccato' };
  }
  if (profile.coins < land.unlockCost) {
    return {
      success: false,
      errorMessage: `Monete insufficienti! Richiede ${land.unlockCost} monete.`,
    };
  }

  const updatedProfile = {
    ...profile,
    coins: profile.coins - land.unlockCost,
  };

  const updatedLands = lands.map((l) =>
    l.id === landId ? { ...l, isUnlocked: true } : l
  );

  return {
    success: true,
    updatedLands,
    updatedProfile,
  };
}
