import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { ChartBar as BarChart3, Fish, Clock, TrendingUp, Target, Award, RotateCcw } from 'lucide-react';
import { Button } from './ui/button';

const Stats = ({ gameState, onResetGame }) => {
  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(2) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(2) + 'K';
    return num.toLocaleString();
  };

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    
    if (hours > 0) {
      return `${hours}h ${minutes}m ${secs}s`;
    } else if (minutes > 0) {
      return `${minutes}m ${secs}s`;
    } else {
      return `${secs}s`;
    }
  };

  // Mock additional stats
  const sessionTime = 1245; // seconds
  const clicksThisSession = 127;
  const averageClickRate = clicksThisSession / (sessionTime / 60); // clicks per minute
  const fishingEfficiency = (gameState.totalFishCaught / clicksThisSession * 100) || 100;
  
  // Achievement progress
  const achievements = [
    { 
      name: "First Catch", 
      description: "Catch your first fish", 
      progress: Math.min(gameState.totalFishCaught, 1),
      target: 1,
      completed: gameState.totalFishCaught >= 1
    },
    { 
      name: "Fishing Apprentice", 
      description: "Catch 100 fish", 
      progress: Math.min(gameState.totalFishCaught, 100),
      target: 100,
      completed: gameState.totalFishCaught >= 100
    },
    { 
      name: "Fish Master", 
      description: "Catch 1,000 fish", 
      progress: Math.min(gameState.totalFishCaught, 1000),
      target: 1000,
      completed: gameState.totalFishCaught >= 1000
    },
    { 
      name: "Wealthy Angler", 
      description: "Accumulate 10,000 coins", 
      progress: Math.min(gameState.coins, 10000),
      target: 10000,
      completed: gameState.coins >= 10000
    }
  ];

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-100 mb-2 flex items-center gap-2">
              <BarChart3 className="w-8 h-8" />
              Fishing Statistics
            </h1>
            <p className="text-slate-300">Track your fishing progress and achievements</p>
          </div>
          
          <Button 
            onClick={onResetGame}
            variant="destructive"
            className="bg-red-600 hover:bg-red-700 text-white flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            Reset Game
          </Button>
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card className="bg-gradient-to-br from-blue-900 to-blue-950 border-blue-700">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-blue-200">
              <Fish className="w-5 h-5" />
              Total Fish Caught
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-100 mb-2">
              {formatNumber(gameState.totalFishCaught)}
            </div>
            <p className="text-sm text-blue-300">Lifetime catches</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-900 to-green-950 border-green-700">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-green-200">
              <TrendingUp className="w-5 h-5" />
              Fish Per Second
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-100 mb-2">
              {gameState.fishPerSecond.toFixed(1)}
            </div>
            <p className="text-sm text-green-300">Automatic generation</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-900 to-orange-950 border-orange-700">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-orange-200">
              <Target className="w-5 h-5" />
              Click Efficiency
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-100 mb-2">
              {fishingEfficiency.toFixed(1)}%
            </div>
            <p className="text-sm text-orange-300">Success rate</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-900 to-purple-950 border-purple-700">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-purple-200">
              <Clock className="w-5 h-5" />
              Session Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-100 mb-2">
              {formatTime(sessionTime)}
            </div>
            <p className="text-sm text-purple-300">Current session</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-cyan-900 to-cyan-950 border-cyan-700">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-cyan-200">
              <Fish className="w-5 h-5" />
              Clicks This Session
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-cyan-100 mb-2">
              {clicksThisSession}
            </div>
            <p className="text-sm text-cyan-300">{averageClickRate.toFixed(1)} per minute</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-900 to-yellow-950 border-yellow-700">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-yellow-200">
              <Award className="w-5 h-5" />
              Prestige Level
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-yellow-100 mb-2">
              {gameState.prestigeLevel}
            </div>
            <p className="text-sm text-yellow-300">Rebirths completed</p>
          </CardContent>
        </Card>
      </div>

      {/* Achievements Section */}
      <Card className="mb-8 bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-slate-100">
            <Award className="w-6 h-6" />
            Achievements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {achievements.map((achievement, index) => (
              <div key={index} className="flex items-center gap-4 p-4 rounded-lg border border-slate-700 bg-slate-900">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  achievement.completed ? 'bg-green-600' : 'bg-slate-700'
                }`}>
                  {achievement.completed ? (
                    <Award className="w-6 h-6 text-white" />
                  ) : (
                    <Award className="w-6 h-6 text-slate-400" />
                  )}
                </div>

                <div className="flex-1">
                  <h3 className={`font-semibold ${
                    achievement.completed ? 'text-green-300' : 'text-slate-300'
                  }`}>
                    {achievement.name}
                  </h3>
                  <p className="text-sm text-slate-400 mb-2">{achievement.description}</p>

                  <div className="flex items-center gap-2">
                    <Progress
                      value={(achievement.progress / achievement.target) * 100}
                      className="flex-1 h-2"
                    />
                    <span className="text-sm font-medium text-slate-300 min-w-fit">
                      {formatNumber(achievement.progress)} / {formatNumber(achievement.target)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Stats;