import test from 'node:test';
import assert from 'node:assert/strict';
import {
  acceptChallenge,
  cancelChallenge,
  completeChallengeWithPhoto,
  buyShopItem,
  toggleFurnitureInCasa,
  unlockLand,
  AppState,
} from './wireframeLogic';
import { Challenge, FurnitureItem, Land, UserProfile } from '../types/wireframe';

const mockChallenges: Challenge[] = [
  {
    id: 'ch-1',
    title: 'bere caffè la mattina',
    description: 'Bevi una tazza di caffè appena sveglio per iniziare con energia.',
    category: 'giornaliere',
    rewardCoins: 10,
    status: 'available',
  },
  {
    id: 'ch-2',
    title: 'Passeggiata di 30 minuti',
    description: 'Fai una passeggiata all’aria aperta.',
    category: 'settimanali',
    rewardCoins: 25,
    status: 'available',
  },
];

const mockProfile: UserProfile = {
  username: 'Alex_Wireframe',
  userId: '@alex99',
  coins: 50,
  completedChallengesCount: 1,
};

const mockLands: Land[] = [
  { id: 1, name: 'Casa', isUnlocked: true, unlockCost: 0, description: 'La tua dimora' },
  { id: 2, name: 'Giardino Zen', isUnlocked: false, unlockCost: 30, description: 'Spazio verde' },
  { id: 3, name: 'Parco Avventura', isUnlocked: false, unlockCost: 50, description: 'Zona sportiva' },
  { id: 4, name: 'Torre Panoramica', isUnlocked: false, unlockCost: 100, description: 'Vista mozzafiato' },
];

const mockShop: FurnitureItem[] = [
  { id: 'furn-1', name: 'Poltrona Minimal', cost: 20, iconName: 'Armchair' },
  { id: 'furn-2', name: 'Lampada Wireframe', cost: 15, iconName: 'Lamp' },
];

const initialAppState: AppState = {
  challenges: mockChallenges,
  diaryEntries: [],
  lands: mockLands,
  arredi: [],
  negozio: mockShop,
  profile: mockProfile,
};

test('acceptChallenge changes challenge status to accepted', () => {
  const updated = acceptChallenge(mockChallenges, 'ch-1');
  const target = updated.find((c) => c.id === 'ch-1');
  assert.equal(target?.status, 'accepted');
  // other challenges remain available
  assert.equal(updated.find((c) => c.id === 'ch-2')?.status, 'available');
});

test('cancelChallenge returns accepted challenge back to available', () => {
  const accepted = acceptChallenge(mockChallenges, 'ch-1');
  const cancelled = cancelChallenge(accepted, 'ch-1');
  assert.equal(cancelled.find((c) => c.id === 'ch-1')?.status, 'available');
});

test('completeChallengeWithPhoto awards coins, updates completed count, and adds to diario', () => {
  const acceptedState: AppState = {
    ...initialAppState,
    challenges: acceptChallenge(mockChallenges, 'ch-1'),
  };

  const result = completeChallengeWithPhoto(
    acceptedState,
    'ch-1',
    'data:image/svg+xml;base64,mock'
  );

  assert.equal(result.success, true);
  assert.equal(result.earnedCoins, 10);
  assert.equal(result.newState?.profile.coins, 60); // 50 + 10
  assert.equal(result.newState?.profile.completedChallengesCount, 2);
  assert.equal(result.newState?.diaryEntries.length, 1);
  assert.equal(result.newState?.diaryEntries[0].title, 'bere caffè la mattina');
  assert.equal(result.newState?.challenges.find((c) => c.id === 'ch-1')?.status, 'completed');
});

test('buyShopItem deducts coins, moves item from shop to arredi', () => {
  const result = buyShopItem(initialAppState, 'furn-1');
  assert.equal(result.success, true);
  assert.equal(result.newState?.profile.coins, 30); // 50 - 20
  assert.equal(result.newState?.negozio.length, 1);
  assert.equal(result.newState?.arredi.length, 1);
  assert.equal(result.newState?.arredi[0].name, 'Poltrona Minimal');
  assert.equal(result.isShopNowEmpty, false);
});

test('buyShopItem detects when shop is completely empty', () => {
  const singleItemState: AppState = {
    ...initialAppState,
    negozio: [{ id: 'item-last', name: 'Orologio', cost: 10, iconName: 'Clock' }],
  };
  const result = buyShopItem(singleItemState, 'item-last');
  assert.equal(result.success, true);
  assert.equal(result.isShopNowEmpty, true);
  assert.equal(result.newState?.negozio.length, 0);
});

test('buyShopItem fails with insufficient coins', () => {
  const poorState: AppState = {
    ...initialAppState,
    profile: { ...mockProfile, coins: 5 },
  };
  const result = buyShopItem(poorState, 'furn-1');
  assert.equal(result.success, false);
  assert.match(result.errorMessage || '', /Monete insufficienti/);
});

test('toggleFurnitureInCasa toggles isPlacedInCasa property', () => {
  const arredi: FurnitureItem[] = [
    { id: 'f-1', name: 'Tavolo', cost: 20, iconName: 'Table', isPlacedInCasa: false },
  ];
  const placed = toggleFurnitureInCasa(arredi, 'f-1');
  assert.equal(placed[0].isPlacedInCasa, true);
  const unplaced = toggleFurnitureInCasa(placed, 'f-1');
  assert.equal(unplaced[0].isPlacedInCasa, false);
});

test('unlockLand unlocks land and deducts coins', () => {
  const result = unlockLand(mockLands, mockProfile, 2);
  assert.equal(result.success, true);
  assert.equal(result.updatedProfile?.coins, 20); // 50 - 30
  assert.equal(result.updatedLands?.find((l) => l.id === 2)?.isUnlocked, true);
});
