/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  MainTab,
  PageId,
  Challenge,
  DiaryEntry,
  Land,
  FurnitureItem,
  UserProfile,
  UserPreferences,
  UserNotifications,
} from './types/wireframe';
import {
  initialChallenges,
  initialDiaryEntries,
  initialLands,
  initialShopItems,
  initialArredi,
  initialProfile,
  initialPreferences,
  initialNotifications,
} from './data/initialData';
import {
  acceptChallenge,
  cancelChallenge,
  completeChallengeWithPhoto,
  buyShopItem,
  toggleFurnitureInCasa,
  unlockLand,
  AppState,
} from './logic/wireframeLogic';

import { IPhone17Frame } from './components/IPhone17Frame';
import { TopBar } from './components/TopBar';
import { BottomNavBar } from './components/BottomNavBar';
import {
  ChallengeDetailModal,
  AcceptedChallengeModal,
  UnlockLandModal,
} from './components/Popups';

import { SfidePage } from './pages/SfidePage';
import { GoLandPage } from './pages/GoLandPage';
import { CasaPage } from './pages/CasaPage';
import { ArrediPage } from './pages/ArrediPage';
import { NegozioPage } from './pages/NegozioPage';
import { DiarioPage } from './pages/DiarioPage';
import { DettaglioSfidaPage } from './pages/DettaglioSfidaPage';
import { ProfiloPage } from './pages/ProfiloPage';
import { DatiPage } from './pages/DatiPage';
import { PreferenzePage } from './pages/PreferenzePage';
import { NotifichePage } from './pages/NotifichePage';

export default function App() {
  // Navigation State
  const [currentPage, setCurrentPage] = useState<PageId>('sfide');
  const [activeMainTab, setActiveMainTab] = useState<MainTab>('sfide');

  // Selected item states for detail views
  const [selectedAvailableChallenge, setSelectedAvailableChallenge] = useState<Challenge | null>(null);
  const [selectedAcceptedChallenge, setSelectedAcceptedChallenge] = useState<Challenge | null>(null);
  const [selectedLockedLand, setSelectedLockedLand] = useState<Land | null>(null);
  const [selectedDiaryEntry, setSelectedDiaryEntry] = useState<DiaryEntry | null>(initialDiaryEntries[0]);

  // Application Data State
  const [challenges, setChallenges] = useState<Challenge[]>(initialChallenges);
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>(initialDiaryEntries);
  const [lands, setLands] = useState<Land[]>(initialLands);
  const [negozio, setNegozio] = useState<FurnitureItem[]>(initialShopItems);
  const [arredi, setArredi] = useState<FurnitureItem[]>(initialArredi);
  const [profile, setProfile] = useState<UserProfile>(initialProfile);
  const [preferences, setPreferences] = useState<UserPreferences>(initialPreferences);
  const [notifications, setNotifications] = useState<UserNotifications>(initialNotifications);

  // Helper for current AppState
  const currentAppState: AppState = {
    challenges,
    diaryEntries,
    lands,
    negozio,
    arredi,
    profile,
  };

  // Reset to initial demo state
  const handleResetData = () => {
    setChallenges(initialChallenges);
    setDiaryEntries(initialDiaryEntries);
    setLands(initialLands);
    setNegozio(initialShopItems);
    setArredi(initialArredi);
    setProfile(initialProfile);
    setPreferences(initialPreferences);
    setNotifications(initialNotifications);
    setCurrentPage('sfide');
    setActiveMainTab('sfide');
  };

  // Main Tab Navigation
  const handleSelectTab = (tab: MainTab) => {
    setActiveMainTab(tab);
    setCurrentPage(tab);
  };

  // Back Navigation handler
  const handleNavigateBack = () => {
    switch (currentPage) {
      case 'casa':
        setCurrentPage('goland');
        setActiveMainTab('goland');
        break;
      case 'arredi':
      case 'negozio':
        setCurrentPage('casa');
        break;
      case 'dettaglio_sfida':
        setCurrentPage('diario');
        setActiveMainTab('diario');
        break;
      case 'dati':
      case 'preferenze':
      case 'notifiche':
        setCurrentPage('profilo');
        setActiveMainTab('profilo');
        break;
      default:
        setCurrentPage('sfide');
        setActiveMainTab('sfide');
    }
  };

  // Challenge Actions
  const handleAcceptChallenge = (challengeId: string) => {
    setChallenges((prev) => acceptChallenge(prev, challengeId));
  };

  const handleCancelChallenge = (challengeId: string) => {
    setChallenges((prev) => cancelChallenge(prev, challengeId));
  };

  const handleCompleteChallenge = (challengeId: string, photoDataUrl: string) => {
    const result = completeChallengeWithPhoto(currentAppState, challengeId, photoDataUrl);
    if (result.success && result.newState) {
      setChallenges(result.newState.challenges);
      setDiaryEntries(result.newState.diaryEntries);
      setProfile(result.newState.profile);
    }
  };

  // Land Unlock
  const handleUnlockLand = (landId: number) => {
    const result = unlockLand(lands, profile, landId);
    if (result.success && result.updatedLands && result.updatedProfile) {
      setLands(result.updatedLands);
      setProfile(result.updatedProfile);
    }
  };

  // Shop purchase
  const handleBuyItem = (itemId: string) => {
    const result = buyShopItem(currentAppState, itemId);
    if (result.success && result.newState) {
      setNegozio(result.newState.negozio);
      setArredi(result.newState.arredi);
      setProfile(result.newState.profile);
      return { success: true };
    }
    return { success: false, errorMessage: result.errorMessage };
  };

  // Furniture placement in Casa
  const handleTogglePlaceFurniture = (itemId: string) => {
    setArredi((prev) => toggleFurnitureInCasa(prev, itemId));
  };

  // Profile Save
  const handleSaveProfile = (updated: Partial<UserProfile>) => {
    setProfile((prev) => ({ ...prev, ...updated }));
  };

  // Direct page navigation
  const handleNavigateTo = (page: PageId) => {
    setCurrentPage(page);
    if (page === 'sfide' || page === 'goland' || page === 'diario' || page === 'profilo') {
      setActiveMainTab(page);
    }
  };

  // Whether bottom bar is shown: "presente nelle pagine 'Sfide', 'GoLand', 'Diario' e 'Profilo'"
  const showBottomNavBar = ['sfide', 'goland', 'diario', 'profilo'].includes(currentPage);

  return (
    <IPhone17Frame
      currentPage={currentPage}
      onNavigateTo={handleNavigateTo}
      onResetData={handleResetData}
    >
      {/* Persistent Top Bar */}
      <TopBar
        currentPage={currentPage}
        coins={profile.coins}
        customTitle={selectedDiaryEntry?.title}
        onNavigateBack={handleNavigateBack}
      />

      {/* Main Page View Switcher */}
      <div className="flex-1 flex flex-col overflow-hidden relative">
        {currentPage === 'sfide' && (
          <SfidePage
            challenges={challenges}
            onSelectAvailableChallenge={(challenge) => setSelectedAvailableChallenge(challenge)}
            onSelectAcceptedChallenge={(challenge) => setSelectedAcceptedChallenge(challenge)}
          />
        )}

        {currentPage === 'goland' && (
          <GoLandPage
            lands={lands}
            onOpenCasa={() => setCurrentPage('casa')}
            onSelectLockedLand={(land) => setSelectedLockedLand(land)}
          />
        )}

        {currentPage === 'casa' && (
          <CasaPage
            arredi={arredi}
            onOpenArredi={() => setCurrentPage('arredi')}
            onOpenNegozio={() => setCurrentPage('negozio')}
          />
        )}

        {currentPage === 'arredi' && (
          <ArrediPage
            arredi={arredi}
            onTogglePlaceInCasa={handleTogglePlaceFurniture}
            onGoToShop={() => setCurrentPage('negozio')}
          />
        )}

        {currentPage === 'negozio' && (
          <NegozioPage
            negozio={negozio}
            userCoins={profile.coins}
            onBuyItem={handleBuyItem}
            onGoToArredi={() => setCurrentPage('arredi')}
          />
        )}

        {currentPage === 'diario' && (
          <DiarioPage
            diaryEntries={diaryEntries}
            onOpenDiaryEntry={(entry) => {
              setSelectedDiaryEntry(entry);
              setCurrentPage('dettaglio_sfida');
            }}
          />
        )}

        {currentPage === 'dettaglio_sfida' && selectedDiaryEntry && (
          <DettaglioSfidaPage entry={selectedDiaryEntry} />
        )}

        {currentPage === 'profilo' && (
          <ProfiloPage
            profile={profile}
            onOpenDati={() => setCurrentPage('dati')}
            onOpenPreferenze={() => setCurrentPage('preferenze')}
            onOpenNotifiche={() => setCurrentPage('notifiche')}
          />
        )}

        {currentPage === 'dati' && (
          <DatiPage
            profile={profile}
            onSaveProfile={handleSaveProfile}
          />
        )}

        {currentPage === 'preferenze' && (
          <PreferenzePage
            preferences={preferences}
            onSavePreferences={setPreferences}
          />
        )}

        {currentPage === 'notifiche' && (
          <NotifichePage
            notifications={notifications}
            onSaveNotifications={setNotifications}
          />
        )}
      </div>

      {/* Persistent Bottom Bar on Sfide, GoLand, Diario, Profilo */}
      {showBottomNavBar && (
        <BottomNavBar
          currentTab={activeMainTab}
          onSelectTab={handleSelectTab}
        />
      )}

      {/* Modal 1: Available Challenge Details (with error/retry simulation) */}
      {selectedAvailableChallenge && (
        <ChallengeDetailModal
          challenge={selectedAvailableChallenge}
          isOpen={!!selectedAvailableChallenge}
          onClose={() => setSelectedAvailableChallenge(null)}
          onAccept={handleAcceptChallenge}
        />
      )}

      {/* Modal 2: Accepted Challenge (Cancel or Camera capture) */}
      {selectedAcceptedChallenge && (
        <AcceptedChallengeModal
          challenge={selectedAcceptedChallenge}
          isOpen={!!selectedAcceptedChallenge}
          onClose={() => setSelectedAcceptedChallenge(null)}
          onCancel={handleCancelChallenge}
          onCompleteWithPhoto={handleCompleteChallenge}
        />
      )}

      {/* Modal 3: Unlock Land Modal */}
      {selectedLockedLand && (
        <UnlockLandModal
          land={selectedLockedLand}
          isOpen={!!selectedLockedLand}
          userCoins={profile.coins}
          onClose={() => setSelectedLockedLand(null)}
          onUnlock={handleUnlockLand}
        />
      )}
    </IPhone17Frame>
  );
}
