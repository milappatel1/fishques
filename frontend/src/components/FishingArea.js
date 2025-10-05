import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Progress } from './ui/progress';

const FishingArea = ({ onCatch, gameState, onUpdateFishingState }) => {
  const [isClicking, setIsClicking] = useState(false);
  const [floatingNumbers, setFloatingNumbers] = useState([]);
  const [ripples, setRipples] = useState([]);
  const [castingTimer, setCastingTimer] = useState(null);
  const [reelingTimer, setReelingTimer] = useState(null);

  const handleCast = () => {
    if (gameState.fishingState !== 'ready') return;
    
    setIsClicking(true);
    onUpdateFishingState('casting', 0, 0);
    
    // Start casting progress
    const timer = setInterval(() => {
      onUpdateFishingState('casting', prev => {
        const newProgress = prev.castingProgress + 10;
        if (newProgress >= 100) {
          clearInterval(timer);
          onUpdateFishingState('waiting', 100, 0);
          setTimeout(() => setIsClicking(false), 150);
          return 100;
        }
        return newProgress;
      });
    }, 100);
    
    setCastingTimer(timer);
  };

  const handleReel = () => {
    if (gameState.fishingState !== 'waiting') return;
    
    setIsClicking(true);
    onUpdateFishingState('reeling', gameState.castingProgress, 0);
    
    // Start reeling progress  
    const timer = setInterval(() => {
      onUpdateFishingState('reeling', gameState.castingProgress, prev => {
        const newProgress = prev.reelingProgress + 8;
        if (newProgress >= 100) {
          clearInterval(timer);
          // Fish caught!
          completeFishing();
          return 100;
        }
        return newProgress;
      });
    }, 100);
    
    setReelingTimer(timer);
  };

  const completeFishing = () => {
    // Create floating number effect
    const newFloating = {
      id: Date.now(),
      x: 150,
      y: 100,
      value: `+${gameState.fishPerClick}`
    };
    
    setFloatingNumbers(prev => [...prev, newFloating]);
    setTimeout(() => {
      setFloatingNumbers(prev => prev.filter(f => f.id !== newFloating.id));
    }, 1000);

    // Create ripple effect
    const newRipple = {
      id: Date.now() + 1,
      x: 150,
      y: 150
    };
    
    setRipples(prev => [...prev, newRipple]);
    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== newRipple.id));
    }, 600);
    
    onCatch();
    setTimeout(() => {
      onUpdateFishingState('ready', 0, 0);
      setIsClicking(false);
    }, 500);
  };

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      if (castingTimer) clearInterval(castingTimer);
      if (reelingTimer) clearInterval(reelingTimer);
    };
  }, [castingTimer, reelingTimer]);

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 relative">
      {/* Ocean Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-cyan-300 via-blue-400 to-blue-600 opacity-20"></div>
      
      {/* Floating Fish Animation */}
      <div className="absolute top-10 left-10 animate-bounce">
        <div className="text-4xl opacity-30">🐟</div>
      </div>
      <div className="absolute top-20 right-20 animate-pulse">
        <div className="text-3xl opacity-40">🐠</div>
      </div>
      <div className="absolute bottom-32 left-32 animate-bounce" style={{ animationDelay: '1s' }}>
        <div className="text-2xl opacity-35">🦈</div>
      </div>

      {/* Main Fishing Area */}
      <Card className="bg-white/10 backdrop-blur-sm border-2 border-blue-300 shadow-2xl relative overflow-hidden">
        <CardContent className="p-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-blue-900 mb-2">
              {gameState.fishingState === 'ready' && 'Cast Your Line!'}
              {gameState.fishingState === 'casting' && 'Casting...'}
              {gameState.fishingState === 'waiting' && 'Reel It In!'}
              {gameState.fishingState === 'reeling' && 'Reeling...'}
            </h2>
            <p className="text-blue-700">
              {gameState.fishingState === 'ready' && 'Click "Cast" to start fishing'}
              {gameState.fishingState === 'casting' && 'Casting your line into the water...'}
              {gameState.fishingState === 'waiting' && 'Click "Reel In" to catch the fish!'}
              {gameState.fishingState === 'reeling' && 'Reeling in your catch...'}
            </p>
          </div>

          {/* Progress Bars */}
          {(gameState.fishingState === 'casting' || gameState.fishingState === 'reeling') && (
            <div className="mb-4 w-full max-w-md mx-auto">
              {gameState.fishingState === 'casting' && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-blue-700">
                    <span>Casting Progress</span>
                    <span>{Math.round(gameState.castingProgress)}%</span>
                  </div>
                  <Progress value={gameState.castingProgress} className="w-full" />
                </div>
              )}
              {gameState.fishingState === 'reeling' && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-blue-700">
                    <span>Reeling Progress</span>
                    <span>{Math.round(gameState.reelingProgress)}%</span>
                  </div>
                  <Progress value={gameState.reelingProgress} className="w-full" />
                </div>
              )}
            </div>
          )}
          
          {/* Fishing Buttons */}
          <div className="relative flex gap-4 justify-center">
            <Button
              onClick={handleCast}
              disabled={gameState.fishingState !== 'ready'}
              className={`w-32 h-32 rounded-full bg-gradient-to-br from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 border-4 border-white shadow-2xl transition-all duration-150 ${
                gameState.fishingState === 'ready' ? 'scale-100 hover:scale-105' : 'scale-95 opacity-50'
              }`}
            >
              <div className="text-center">
                <div className="text-3xl filter drop-shadow-lg">🎯</div>
                <div className="text-sm font-bold text-white mt-1">CAST</div>
              </div>
            </Button>

            <Button
              onClick={handleReel}
              disabled={gameState.fishingState !== 'waiting'}
              className={`w-32 h-32 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 hover:from-orange-500 hover:to-orange-700 border-4 border-white shadow-2xl transition-all duration-150 ${
                gameState.fishingState === 'waiting' ? 'scale-100 hover:scale-105' : 'scale-95 opacity-50'
              }`}
            >
              <div className="text-center">
                <div className="text-3xl filter drop-shadow-lg">🎣</div>
                <div className="text-sm font-bold text-white mt-1">REEL IN</div>
              </div>
            </Button>

            {/* Floating Numbers */}
            {floatingNumbers.map((floating) => (
              <div
                key={floating.id}
                className="absolute pointer-events-none animate-ping"
                style={{
                  left: floating.x,
                  top: floating.y,
                  animationDuration: '1s'
                }}
              >
                <span className="text-2xl font-bold text-yellow-500 drop-shadow-lg">
                  {floating.value}
                </span>
              </div>
            ))}

            {/* Ripple Effects */}
            {ripples.map((ripple) => (
              <div
                key={ripple.id}
                className="absolute pointer-events-none"
                style={{
                  left: ripple.x - 25,
                  top: ripple.y - 25,
                }}
              >
                <div className="w-12 h-12 border-4 border-blue-400 rounded-full animate-ping opacity-75"></div>
              </div>
            ))}
          </div>

          <div className="mt-6 text-center">
            <p className="text-blue-800 font-medium">
              Total Caught: {gameState.totalFishCaught.toLocaleString()}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FishingArea;