import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';

const FishingArea = ({ onCatch, gameState }) => {
  const [isClicking, setIsClicking] = useState(false);
  const [floatingNumbers, setFloatingNumbers] = useState([]);
  const [ripples, setRipples] = useState([]);

  const handleClick = (e) => {
    setIsClicking(true);
    setTimeout(() => setIsClicking(false), 150);
    
    // Create floating number effect
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const newFloating = {
      id: Date.now(),
      x,
      y,
      value: `+${gameState.fishPerClick}`
    };
    
    setFloatingNumbers(prev => [...prev, newFloating]);
    setTimeout(() => {
      setFloatingNumbers(prev => prev.filter(f => f.id !== newFloating.id));
    }, 1000);

    // Create ripple effect
    const newRipple = {
      id: Date.now() + 1,
      x,
      y
    };
    
    setRipples(prev => [...prev, newRipple]);
    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== newRipple.id));
    }, 600);
    
    onCatch();
  };

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
            <h2 className="text-2xl font-bold text-blue-900 mb-2">Cast Your Line!</h2>
            <p className="text-blue-700">Click to catch fish</p>
          </div>
          
          {/* Clickable Fish */}
          <div className="relative">
            <Button
              onClick={handleClick}
              className={`w-48 h-48 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 border-4 border-white shadow-2xl transition-all duration-150 ${
                isClicking ? 'scale-95' : 'scale-100 hover:scale-105'
              }`}
            >
              <div className="text-8xl filter drop-shadow-lg">
                🎣
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