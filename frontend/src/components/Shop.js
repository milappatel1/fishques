import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ShoppingBag, TrendingUp, Zap, Star } from 'lucide-react';
const Shop = ({ gameState, onPurchaseBuilding, onPurchaseUpgrade }) => {
  const buildings = gameState.buildings || [];
  const upgrades = gameState.upgrades || [];

  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  const getIcon = (iconName) => {
    const icons = {
      'fishing-rod': '🎣',
      'net': '🕸️',
      'ship': '🚢',
      'home': '🏘️',
      'hook': '🪝',
      'shield': '🛡️',
      'star': '⭐',
      'zap': '⚡',
      'clock': '⏰',
      'crown': '👑',
      'target': '🎯',
      'radar': '📡',
      'user': '👤',
      'flash': '💨',
      'gem': '💎',
      'trending-up': '📈',
      'heart': '❤️',
      'compass': '🧭',
      'bolt': '⚡',
      'wand': '🪄',
      'globe': '🌍',
      'award': '🏆',
      'octopus': '🐙',
      'cloud-lightning': '⛈️',
      'trident': '🔱',
      'book': '📚',
      'clock-3': '🕒',
      'infinity': '♾️',
      'shuffle': '🔀',
      'rocket': '🚀',
      'eye': '👁️',
      'atom': '⚛️',
      'orbit': '🌐',
      'magnet': '🧲',
      'waves': '🌊',
      'message-circle': '💬',
      'sun': '☀️',
      'dna': '🧬',
      'layers': '📚',
      'cpu': '💻',
      'sparkles': '✨',
      'repeat': '🔄',
      'circle': '⚫',
      'portal': '🌀'
    };
    return icons[iconName] || '🎣';
  };

  const purchaseBuilding = (buildingId, quantity = 1) => {
    const building = buildings.find(b => b.id === buildingId);
    const totalCost = getBulkCost(building, quantity);
    if (building && gameState.coins >= totalCost) {
      const updatedBuildings = buildings.map(b =>
        b.id === buildingId
          ? { ...b, owned: b.owned + quantity, cost: Math.floor(b.cost * Math.pow(1.15, quantity)) }
          : b
      );
      const buildingWithTotalCost = { ...building, cost: totalCost, multiplier: building.multiplier * quantity };
      onPurchaseBuilding(buildingWithTotalCost, updatedBuildings);
    }
  };

  const getBulkCost = (building, quantity) => {
    let totalCost = 0;
    let currentCost = building.cost;
    for (let i = 0; i < quantity; i++) {
      totalCost += currentCost;
      currentCost = Math.floor(currentCost * 1.15);
    }
    return totalCost;
  };

  const purchaseUpgrade = (upgradeId) => {
    const upgrade = upgrades.find(u => u.id === upgradeId);
    if (upgrade && gameState.coins >= upgrade.cost && !upgrade.purchased) {
      const updatedUpgrades = upgrades.map(u =>
        u.id === upgradeId
          ? { ...u, purchased: true }
          : u
      );
      onPurchaseUpgrade(upgrade, updatedUpgrades);
    }
  };

  const groupUpgradesByTier = (upgrades) => {
    const tiers = {};
    upgrades.forEach(upgrade => {
      const tier = upgrade.tier || 1;
      if (!tiers[tier]) tiers[tier] = [];
      tiers[tier].push(upgrade);
    });
    return tiers;
  };

  const upgradesByTier = groupUpgradesByTier(upgrades);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-100 mb-2 flex items-center gap-2">
          <ShoppingBag className="w-8 h-8" />
          Fishing Shop
        </h1>
        <p className="text-slate-300">Upgrade your fishing operation</p>
      </div>

      <Tabs defaultValue="buildings" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="buildings" className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Buildings
          </TabsTrigger>
          <TabsTrigger value="upgrades" className="flex items-center gap-2">
            <Zap className="w-4 h-4" />
            Upgrades
          </TabsTrigger>
        </TabsList>

        <TabsContent value="buildings">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {buildings.map((building) => {
              const canAfford = gameState.coins >= building.cost;
              
              return (
                <Card key={building.id} className={`hover:shadow-lg transition-all duration-200 bg-slate-800 ${
                  canAfford ? 'border-green-700 hover:border-green-600' : 'border-slate-700 opacity-75'
                }`}>
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{getIcon(building.icon)}</span>
                        <span className="text-lg">{building.name}</span>
                      </div>
                      {building.owned > 0 && (
                        <Badge variant="secondary">
                          Owned: {building.owned}
                        </Badge>
                      )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-300 mb-4">{building.description}</p>

                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Effect:</span>
                        <span className="font-semibold text-slate-200">
                          {building.effect === 'fishPerClick' ? 'Fish per click' : 'Fish per second'}
                          +{building.multiplier}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Cost:</span>
                        <span className={`font-bold ${canAfford ? 'text-green-400' : 'text-red-400'}`}>
                          {formatNumber(building.cost)} coins
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Button 
                        onClick={() => purchaseBuilding(building.id, 1)}
                        disabled={!canAfford}
                        className={`w-full ${canAfford 
                          ? 'bg-green-600 hover:bg-green-700' 
                          : 'bg-gray-400 cursor-not-allowed'
                        }`}
                      >
                        {canAfford ? 'Buy 1' : 'Not enough coins'}
                      </Button>
                      
                      {building.owned > 0 && (
                        <div className="grid grid-cols-3 gap-1">
                          {[10, 25, 100].map(qty => {
                            const bulkCost = getBulkCost(building, qty);
                            const canAffordBulk = gameState.coins >= bulkCost;
                            return (
                              <Button
                                key={qty}
                                onClick={() => purchaseBuilding(building.id, qty)}
                                disabled={!canAffordBulk}
                                variant="outline"
                                size="sm"
                                className={canAffordBulk ? "hover:bg-green-50" : "opacity-50"}
                              >
                                Buy {qty}
                              </Button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="upgrades">
          <div className="space-y-8">
            {Object.entries(upgradesByTier).map(([tier, tierUpgrades]) => (
              <div key={tier}>
                <h3 className="text-2xl font-bold text-slate-100 mb-4 flex items-center gap-2">
                  <Star className="w-6 h-6" />
                  Tier {tier} Upgrades
                  <Badge variant="outline" className="ml-2 bg-slate-800 text-slate-200 border-slate-600">
                    {tierUpgrades.filter(u => u.purchased).length}/{tierUpgrades.length} Owned
                  </Badge>
                </h3>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                  {tierUpgrades.map((upgrade) => {
                    const canAfford = gameState.coins >= upgrade.cost && !upgrade.purchased;
                    
                    return (
                      <Card key={upgrade.id} className={`hover:shadow-lg transition-all duration-200 ${
                        upgrade.purchased
                          ? 'border-yellow-700 bg-yellow-900/30'
                          : canAfford
                            ? 'border-green-700 hover:border-green-600 bg-slate-800'
                            : 'border-slate-700 opacity-75 bg-slate-800'
                      }`}>
                        <CardHeader className="pb-3">
                          <CardTitle className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-2">
                              <span className="text-xl">{getIcon(upgrade.icon)}</span>
                              <span className="text-base font-semibold">{upgrade.name}</span>
                            </div>
                            {upgrade.purchased && (
                              <Badge className="bg-yellow-500 hover:bg-yellow-600 text-xs">
                                ✓
                              </Badge>
                            )}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <p className="text-slate-300 mb-3 text-sm">{upgrade.description}</p>

                          <div className="space-y-1 mb-3 text-xs">
                            <div className="flex justify-between">
                              <span className="text-slate-400">Effect:</span>
                              <span className="font-semibold text-slate-200">
                                {upgrade.multiplier}x
                              </span>
                            </div>
                            {!upgrade.purchased && (
                              <div className="flex justify-between">
                                <span className="text-slate-400">Cost:</span>
                                <span className={`font-bold ${canAfford ? 'text-green-400' : 'text-red-400'}`}>
                                  {formatNumber(upgrade.cost)}
                                </span>
                              </div>
                            )}
                          </div>

                          <Button 
                            onClick={() => purchaseUpgrade(upgrade.id)}
                            disabled={!canAfford || upgrade.purchased}
                            size="sm"
                            className={`w-full ${
                              upgrade.purchased 
                                ? 'bg-yellow-500 cursor-default' 
                                : canAfford 
                                  ? 'bg-green-600 hover:bg-green-700' 
                                  : 'bg-gray-400 cursor-not-allowed'
                            }`}
                          >
                            {upgrade.purchased 
                              ? 'Owned' 
                              : canAfford 
                                ? 'Buy' 
                                : 'Locked'
                            }
                          </Button>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Shop;