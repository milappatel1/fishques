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
    <div className="w-full bg-gradient-to-r from-slate-800 to-slate-900 p-4 border-b-2 border-slate-700">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-100 mb-4 text-center">
          🎣 Fishing Clicker
        </h1>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="bg-slate-800/80 backdrop-blur-sm border-blue-700">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Fish className="w-6 h-6 text-blue-400" />
                <span className="font-semibold text-blue-200">Fish</span>
              </div>
              <div className="text-2xl font-bold text-blue-300">
                {formatNumber(gameState.fish)}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/80 backdrop-blur-sm border-yellow-700">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Coins className="w-6 h-6 text-yellow-400" />
                <span className="font-semibold text-yellow-200">Coins</span>
              </div>
              <div className="text-2xl font-bold text-yellow-300">
                {formatNumber(gameState.coins)}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/80 backdrop-blur-sm border-green-700">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <TrendingUp className="w-6 h-6 text-green-400" />
                <span className="font-semibold text-green-200">Per Second</span>
              </div>
              <div className="text-2xl font-bold text-green-300">
                {gameState.fishPerSecond.toFixed(1)}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/80 backdrop-blur-sm border-orange-700">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Clock className="w-6 h-6 text-orange-400" />
                <span className="font-semibold text-orange-200">Per Click</span>
              </div>
              <div className="text-2xl font-bold text-orange-300">
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