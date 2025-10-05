import React, { useState, useEffect } from "react";
import "./App.css";
import { Toaster } from './components/ui/toaster';
import { toast } from './hooks/use-toast';
import GameHeader from './components/GameHeader';
import Navigation from './components/Navigation';
import FishingArea from './components/FishingArea';
import Inventory from './components/Inventory';
import Shop from './components/Shop';
import Stats from './components/Stats';
import { mockGameState, fishTypes } from './mock';

function App() {
  const [currentPage, setCurrentPage] = useState('game');
  const [gameState, setGameState] = useState({
    ...mockGameState,
    inventory: mockGameState.inventory || [],
    buildings: mockGameState.buildings || [],
    upgrades: mockGameState.upgrades || []
  });

  // Auto-save to localStorage
  useEffect(() => {
    const savedGame = localStorage.getItem('fishingClickerGame');
    if (savedGame) {
      try {
        const parsedGame = JSON.parse(savedGame);
        setGameState(parsedGame);
      } catch (error) {
        console.error('Error loading saved game:', error);
      }
    }
  }, []);

  // Save game state to localStorage
  useEffect(() => {
    localStorage.setItem('fishingClickerGame', JSON.stringify(gameState));
  }, [gameState]);

  // Auto-generate fish per second
  useEffect(() => {
    if (gameState.fishPerSecond > 0) {
      const interval = setInterval(() => {
        setGameState(prev => ({
          ...prev,
          fish: prev.fish + prev.fishPerSecond,
          totalFishCaught: prev.totalFishCaught + prev.fishPerSecond
        }));
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [gameState.fishPerSecond]);

  const handleFishCatch = () => {
    const randomValue = Math.random();
    let cumulativeChance = 0;
    let caughtFish = null;

    for (const fish of fishTypes) {
      cumulativeChance += fish.chance;
      if (randomValue <= cumulativeChance) {
        caughtFish = fish;
        break;
      }
    }

    if (caughtFish) {
      setGameState(prev => {
        const existingFish = prev.inventory.find(f => f.name === caughtFish.name);
        let updatedInventory;

        if (existingFish) {
          updatedInventory = prev.inventory.map(f =>
            f.name === caughtFish.name
              ? { ...f, quantity: f.quantity + prev.fishPerClick }
              : f
          );
        } else {
          const fishEmojis = { 'Common Trout': '🐟', 'Golden Bass': '🐠', 'Rainbow Salmon': '🌈', 'Ancient Cod': '💎', 'Legendary Tuna': '⭐' };
          updatedInventory = [...prev.inventory, {
            id: Date.now(),
            name: caughtFish.name,
            quantity: prev.fishPerClick,
            value: caughtFish.value,
            rarity: caughtFish.rarity,
            image: fishEmojis[caughtFish.name] || '🐟'
          }];
        }

        return {
          ...prev,
          fish: prev.fish + prev.fishPerClick,
          totalFishCaught: prev.totalFishCaught + prev.fishPerClick,
          inventory: updatedInventory
        };
      });

      if (caughtFish.rarity !== 'common') {
        toast({
          title: `${caughtFish.rarity.toUpperCase()} CATCH!`,
          description: `You caught a ${caughtFish.name}! Worth ${caughtFish.value} coins.`,
          duration: 3000,
        });
      }
    }
  };

  const handleUpdateFishingState = (newState, castingProgress, reelingProgress) => {
    if (typeof castingProgress === 'function') {
      setGameState(prev => ({
        ...prev,
        fishingState: newState,
        castingProgress: castingProgress(prev)
      }));
    } else if (typeof reelingProgress === 'function') {
      setGameState(prev => ({
        ...prev,
        fishingState: newState,
        reelingProgress: reelingProgress(prev)
      }));
    } else {
      setGameState(prev => ({
        ...prev,
        fishingState: newState,
        castingProgress: castingProgress !== undefined ? castingProgress : prev.castingProgress,
        reelingProgress: reelingProgress !== undefined ? reelingProgress : prev.reelingProgress
      }));
    }
  };

  const handleResetGame = () => {
    const confirmReset = window.confirm(
      "Are you sure you want to reset your game? This will delete all progress and cannot be undone!"
    );
    
    if (confirmReset) {
      localStorage.removeItem('fishingClickerGame');
      setGameState({
        ...mockGameState,
        fish: 0,
        coins: 0,
        fishPerSecond: 0,
        fishPerClick: 1,
        totalFishCaught: 0,
        prestigeLevel: 0,
        fishingState: 'ready',
        castingProgress: 0,
        reelingProgress: 0,
        inventory: [],
        buildings: mockGameState.buildings,
        upgrades: mockGameState.upgrades
      });
      
      toast({
        title: "Game Reset!",
        description: "Your fishing adventure begins anew.",
        duration: 3000,
      });
    }
  };

  const handleSellFish = (coinValue, updatedInventory) => {
    setGameState(prev => ({
      ...prev,
      coins: prev.coins + coinValue,
      inventory: updatedInventory
    }));

    toast({
      title: "Fish Sold!",
      description: `You earned ${coinValue} coins.`,
      duration: 2000,
    });
  };

  const handlePurchaseBuilding = (building, updatedBuildings) => {
    setGameState(prev => ({
      ...prev,
      coins: prev.coins - building.cost,
      fishPerSecond: building.effect === 'fishPerSecond'
        ? prev.fishPerSecond + building.multiplier
        : prev.fishPerSecond,
      fishPerClick: building.effect === 'fishPerClick'
        ? prev.fishPerClick + building.multiplier
        : prev.fishPerClick,
      buildings: updatedBuildings
    }));

    toast({
      title: "Building Purchased!",
      description: `You bought a ${building.name}.`,
      duration: 2000,
    });
  };

  const handlePurchaseUpgrade = (upgrade, updatedUpgrades) => {
    setGameState(prev => ({
      ...prev,
      coins: prev.coins - upgrade.cost,
      upgrades: updatedUpgrades
    }));

    toast({
      title: "Upgrade Purchased!",
      description: `You bought ${upgrade.name}.`,
      duration: 2000,
    });
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'game':
        return (
          <div className="flex flex-1 min-h-0">
            <FishingArea 
              onCatch={handleFishCatch} 
              gameState={gameState}
              onUpdateFishingState={handleUpdateFishingState}
            />
          </div>
        );
      case 'inventory':
        return <Inventory gameState={gameState} onSellFish={handleSellFish} />;
      case 'shop':
        return (
          <Shop 
            gameState={gameState} 
            onPurchaseBuilding={handlePurchaseBuilding}
            onPurchaseUpgrade={handlePurchaseUpgrade}
          />
        );
      case 'stats':
        return <Stats gameState={gameState} onResetGame={handleResetGame} />;
      default:
        return <div>Page not found</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 flex flex-col">
      <GameHeader gameState={gameState} />
      <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {renderCurrentPage()}
      </div>

      <Toaster />
    </div>
  );
}

export default App;
