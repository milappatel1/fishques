import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { BarChart3, Fish, Clock, TrendingUp, Target, Award, RotateCcw } from 'lucide-react';
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
        <h1 className="text-3xl font-bold text-blue-900 mb-2 flex items-center gap-2">
          <BarChart3 className="w-8 h-8" />
          Fishing Statistics
        </h1>
        <p className="text-blue-700">Track your fishing progress and achievements</p>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-blue-800">
              <Fish className="w-5 h-5" />
              Total Fish Caught
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-900 mb-2">
              {formatNumber(gameState.totalFishCaught)}
            </div>
            <p className="text-sm text-blue-600">Lifetime catches</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-green-800">
              <TrendingUp className="w-5 h-5" />
              Fish Per Second
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-900 mb-2">
              {gameState.fishPerSecond.toFixed(1)}
            </div>
            <p className="text-sm text-green-600">Automatic generation</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-orange-800">
              <Target className="w-5 h-5" />
              Click Efficiency
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-900 mb-2">
              {fishingEfficiency.toFixed(1)}%
            </div>
            <p className="text-sm text-orange-600">Success rate</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-purple-800">
              <Clock className="w-5 h-5" />
              Session Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-900 mb-2">
              {formatTime(sessionTime)}
            </div>
            <p className="text-sm text-purple-600">Current session</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-cyan-50 to-cyan-100 border-cyan-200">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-cyan-800">
              <Fish className="w-5 h-5" />
              Clicks This Session
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-cyan-900 mb-2">
              {clicksThisSession}
            </div>
            <p className="text-sm text-cyan-600">{averageClickRate.toFixed(1)} per minute</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-yellow-800">
              <Award className="w-5 h-5" />
              Prestige Level
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-yellow-900 mb-2">
              {gameState.prestigeLevel}
            </div>
            <p className="text-sm text-yellow-600">Rebirths completed</p>
          </CardContent>
        </Card>
      </div>

      {/* Achievements Section */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-900">
            <Award className="w-6 h-6" />
            Achievements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {achievements.map((achievement, index) => (
              <div key={index} className="flex items-center gap-4 p-4 rounded-lg border bg-gray-50">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  achievement.completed ? 'bg-green-500' : 'bg-gray-300'
                }`}>
                  {achievement.completed ? (
                    <Award className="w-6 h-6 text-white" />
                  ) : (
                    <Award className="w-6 h-6 text-gray-600" />
                  )}
                </div>
                
                <div className="flex-1">
                  <h3 className={`font-semibold ${
                    achievement.completed ? 'text-green-800' : 'text-gray-800'
                  }`}>
                    {achievement.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">{achievement.description}</p>
                  
                  <div className="flex items-center gap-2">
                    <Progress 
                      value={(achievement.progress / achievement.target) * 100} 
                      className="flex-1 h-2"
                    />
                    <span className="text-sm font-medium text-gray-700 min-w-fit">
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