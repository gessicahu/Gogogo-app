import {
  Challenge,
  DiaryEntry,
  FurnitureItem,
  Land,
  UserProfile,
  UserPreferences,
  UserNotifications,
} from '../types/wireframe';

export const initialChallenges: Challenge[] = [
  {
    id: 'ch-coffee',
    title: 'bere caffè la mattina',
    description: 'Bevi una tazza di caffè o tè caldo appena sveglio per ricaricare le energie e iniziare la giornata con positività.',
    category: 'giornaliere',
    rewardCoins: 10,
    status: 'completed', // Already completed by default and present in Diario
  },
  {
    id: 'ch-water',
    title: 'Bere 2 litri d’acqua',
    description: 'Mantieni l’idratazione ottimale durante tutto l’arco della giornata bevendo almeno due litri d’acqua.',
    category: 'giornaliere',
    rewardCoins: 15,
    status: 'available',
  },
  {
    id: 'ch-read',
    title: 'Leggere 15 pagine',
    description: 'Dedica almeno 15 minuti alla lettura di un buon libro prima di andare a dormire.',
    category: 'giornaliere',
    rewardCoins: 15,
    status: 'available',
  },
  {
    id: 'ch-run',
    title: 'Corsa di 5 km',
    description: 'Completa una sessione di corsa o camminata veloce di almeno 5 chilometri durante la settimana.',
    category: 'settimanali',
    rewardCoins: 35,
    status: 'available',
  },
  {
    id: 'ch-cooking',
    title: 'Cucinare una ricetta sana',
    description: 'Sperimenta una ricetta vegetariana o ricca di nutrienti fatta completamente in casa.',
    category: 'settimanali',
    rewardCoins: 30,
    status: 'available',
  },
  {
    id: 'ch-cleanup',
    title: 'Decluttering della camera',
    description: 'Riordina e organizza l’armadio o la tua postazione di lavoro eliminando il superfluo.',
    category: 'settimanali',
    rewardCoins: 40,
    status: 'available',
  },
  {
    id: 'ch-museum',
    title: 'Visita a una mostra o museo',
    description: 'Trascorri un pomeriggio culturale visitando una galleria d’arte o un museo della tua città.',
    category: 'mensili',
    rewardCoins: 80,
    status: 'available',
  },
  {
    id: 'ch-digital-detox',
    title: 'Weekend Digital Detox',
    description: 'Trascorri 24 ore consecutive senza social network e schermi per riconnetterti con la realtà.',
    category: 'mensili',
    rewardCoins: 100,
    status: 'available',
  },
];

export const initialDiaryEntries: DiaryEntry[] = [
  {
    id: 'diary-coffee-default',
    challengeId: 'ch-coffee',
    title: 'bere caffè la mattina',
    description: 'Bevi una tazza di caffè appena sveglio per ricaricare le energie e iniziare la giornata con positività.',
    photoUrl: 'coffee_wireframe_sketch',
    completedAt: '12 Nov 2026 · 08:15',
    rewardCoins: 10,
  },
  {
    id: 'diary-walk-sample',
    challengeId: 'ch-sample-walk',
    title: 'Passeggiata mattutina al parco',
    description: 'Fatta una camminata rigenerante tra i vialetti alberati all’alba.',
    photoUrl: 'park_wireframe_sketch',
    completedAt: '10 Nov 2026 · 07:45',
    rewardCoins: 20,
  },
];

export const initialLands: Land[] = [
  {
    id: 1,
    name: 'Casa',
    isUnlocked: true,
    unlockCost: 0,
    description: 'La tua dimora principale: arreda la stanza con gli oggetti del negozio.',
  },
  {
    id: 2,
    name: 'Giardino Botanico',
    isUnlocked: false,
    unlockCost: 40,
    description: 'Un’oasi verde rilassante con piante esotiche e una fontana in pietra.',
  },
  {
    id: 3,
    name: 'Studio Creativo',
    isUnlocked: false,
    unlockCost: 75,
    description: 'Laboratorio per idee, pittura e nuove sfide intellettuali.',
  },
  {
    id: 4,
    name: 'Osservatorio Stelle',
    isUnlocked: false,
    unlockCost: 120,
    description: 'Cupola panoramica con telescopio per osservare le costellazioni.',
  },
];

export const initialShopItems: FurnitureItem[] = [
  {
    id: 'furn-sofa',
    name: 'Divano Wireframe 3 Posti',
    cost: 25,
    iconName: 'Armchair',
  },
  {
    id: 'furn-plant',
    name: 'Pianta Monstera in Vaso',
    cost: 15,
    iconName: 'Flower2',
  },
  {
    id: 'furn-lamp',
    name: 'Lampada da Terra Minimal',
    cost: 20,
    iconName: 'LampFloor',
  },
  {
    id: 'furn-desk',
    name: 'Scrivania da Lavoro in Legno',
    cost: 35,
    iconName: 'LayoutGrid',
  },
  {
    id: 'furn-clock',
    name: 'Orologio da Parete Bauhaus',
    cost: 10,
    iconName: 'Clock',
  },
  {
    id: 'furn-bookshelf',
    name: 'Libreria Modulare a Parete',
    cost: 30,
    iconName: 'Library',
  },
];

export const initialArredi: FurnitureItem[] = [
  {
    id: 'furn-tappeto',
    name: 'Tappeto Geometrico',
    cost: 15,
    iconName: 'SquareDashed',
    isPlacedInCasa: true,
  },
];

export const initialProfile: UserProfile = {
  username: 'Marco Rossi',
  userId: '@marco_go99',
  coins: 65,
  completedChallengesCount: 2,
  bio: 'Appassionato di buone abitudini, caffè all’alba e passeggiate.',
  avatarUrl: 'user_avatar_wireframe',
};

export const initialPreferences: UserPreferences = {
  hobbies: ['Lettura', 'Fitness', 'Cucina sana', 'Fotografia'],
  lifestyle: ['Sveglia presto', 'Outdoor', 'Musica acustica'],
  challengeIntensity: 'media',
};

export const initialNotifications: UserNotifications = {
  dailyReminders: true,
  challengeDeadlines: true,
  unlockAlerts: true,
  notificationTime: '08:30',
};
