export type MainTab = 'sfide' | 'goland' | 'diario' | 'profilo';

export type SubPage =
  | 'casa'
  | 'arredi'
  | 'negozio'
  | 'dettaglio_sfida'
  | 'dati'
  | 'preferenze'
  | 'notifiche';

export type PageId = MainTab | SubPage;

export type ChallengeCategory = 'giornaliere' | 'settimanali' | 'mensili';

export interface Challenge {
  id: string;
  title: string;
  description: string;
  category: ChallengeCategory;
  rewardCoins: number;
  status: 'available' | 'accepted' | 'completed';
}

export interface DiaryEntry {
  id: string;
  challengeId?: string;
  title: string;
  description: string;
  photoUrl: string;
  completedAt: string;
  rewardCoins: number;
}

export interface Land {
  id: number;
  name: string;
  isUnlocked: boolean;
  unlockCost: number;
  description: string;
}

export interface FurnitureItem {
  id: string;
  name: string;
  cost: number;
  isPlacedInCasa?: boolean;
  iconName: string;
}

export interface UserProfile {
  username: string;
  userId: string;
  coins: number;
  completedChallengesCount: number;
  avatarUrl?: string;
  bio?: string;
}

export interface UserPreferences {
  hobbies: string[];
  lifestyle: string[];
  challengeIntensity: 'bassa' | 'media' | 'alta';
}

export interface UserNotifications {
  dailyReminders: boolean;
  challengeDeadlines: boolean;
  unlockAlerts: boolean;
  notificationTime: string;
}
