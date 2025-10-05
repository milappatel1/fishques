import React from 'react';
import { Fish, Coins, TrendingUp, Clock } from 'lucide-react';
import { Card, CardContent } from './ui/card';

const GameHeader = ({ gameState }) => {
  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return Math.floor(num).toString();
  };

  return (
    <div className="w-full bg-gradient-to-r from-blue-50 to-cyan-50 p-4 border-b-2 border-blue-200">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-900 mb-4 text-center">
          🎣 Fishing Clicker
        </h1>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="bg-white/80 backdrop-blur-sm border-blue-200">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Fish className="w-6 h-6 text-blue-600" />
                <span className="font-semibold text-blue-900">Fish</span>
              </div>
              <div className="text-2xl font-bold text-blue-800">
                {formatNumber(gameState.fish)}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-yellow-200">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Coins className="w-6 h-6 text-yellow-600" />
                <span className="font-semibold text-yellow-900">Coins</span>
              </div>
              <div className="text-2xl font-bold text-yellow-800">
                {formatNumber(gameState.coins)}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-green-200">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <TrendingUp className="w-6 h-6 text-green-600" />
                <span className="font-semibold text-green-900">Per Second</span>
              </div>
              <div className="text-2xl font-bold text-green-800">
                {gameState.fishPerSecond.toFixed(1)}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-orange-200">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Clock className="w-6 h-6 text-orange-600" />
                <span className="font-semibold text-orange-900">Per Click</span>
              </div>
              <div className="text-2xl font-bold text-orange-800">
                {gameState.fishPerClick}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default GameHeader;