import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ShoppingBag, TrendingUp, Zap, Star } from 'lucide-react';
import { mockBuildings, mockUpgrades } from '../mock';

const Shop = ({ gameState, onPurchaseBuilding, onPurchaseUpgrade }) => {
  const [buildings, setBuildings] = useState(mockBuildings);
  const [upgrades, setUpgrades] = useState(mockUpgrades);

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
      'star': '⭐'
    };
    return icons[iconName] || '🎣';
  };

  const purchaseBuilding = (buildingId, quantity = 1) => {
    const building = buildings.find(b => b.id === buildingId);
    if (building && gameState.coins >= (building.cost * quantity)) {
      // Purchase multiple buildings
      for (let i = 0; i < quantity; i++) {
        onPurchaseBuilding(building);
      }
      setBuildings(prev => 
        prev.map(b => 
          b.id === buildingId 
            ? { ...b, owned: b.owned + quantity, cost: Math.floor(b.cost * Math.pow(1.15, quantity)) }
            : b
        )
      );
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
      onPurchaseUpgrade(upgrade);
      setUpgrades(prev => 
        prev.map(u => 
          u.id === upgradeId 
            ? { ...u, purchased: true }
            : u
        )
      );
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-blue-900 mb-2 flex items-center gap-2">
          <ShoppingBag className="w-8 h-8" />
          Fishing Shop
        </h1>
        <p className="text-blue-700">Upgrade your fishing operation</p>
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
                <Card key={building.id} className={`hover:shadow-lg transition-all duration-200 ${
                  canAfford ? 'border-green-200 hover:border-green-300' : 'border-gray-200 opacity-75'
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
                    <p className="text-gray-600 mb-4">{building.description}</p>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Effect:</span>
                        <span className="font-semibold">
                          {building.effect === 'fishPerClick' ? 'Fish per click' : 'Fish per second'} 
                          +{building.multiplier}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Cost:</span>
                        <span className={`font-bold ${canAfford ? 'text-green-600' : 'text-red-600'}`}>
                          {formatNumber(building.cost)} coins
                        </span>
                      </div>
                    </div>

                    <Button 
                      onClick={() => purchaseBuilding(building.id)}
                      disabled={!canAfford}
                      className={`w-full ${canAfford 
                        ? 'bg-green-600 hover:bg-green-700' 
                        : 'bg-gray-400 cursor-not-allowed'
                      }`}
                    >
                      {canAfford ? 'Purchase' : 'Not enough coins'}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="upgrades">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {upgrades.map((upgrade) => {
              const canAfford = gameState.coins >= upgrade.cost && !upgrade.purchased;
              
              return (
                <Card key={upgrade.id} className={`hover:shadow-lg transition-all duration-200 ${
                  upgrade.purchased 
                    ? 'border-yellow-200 bg-yellow-50' 
                    : canAfford 
                      ? 'border-green-200 hover:border-green-300' 
                      : 'border-gray-200 opacity-75'
                }`}>
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{getIcon(upgrade.icon)}</span>
                        <span className="text-lg">{upgrade.name}</span>
                      </div>
                      {upgrade.purchased && (
                        <Badge className="bg-yellow-500 hover:bg-yellow-600">
                          <Star className="w-3 h-3 mr-1" />
                          Purchased
                        </Badge>
                      )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{upgrade.description}</p>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Effect:</span>
                        <span className="font-semibold">
                          {upgrade.multiplier}x multiplier
                        </span>
                      </div>
                      {!upgrade.purchased && (
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Cost:</span>
                          <span className={`font-bold ${canAfford ? 'text-green-600' : 'text-red-600'}`}>
                            {formatNumber(upgrade.cost)} coins
                          </span>
                        </div>
                      )}
                    </div>

                    <Button 
                      onClick={() => purchaseUpgrade(upgrade.id)}
                      disabled={!canAfford || upgrade.purchased}
                      className={`w-full ${
                        upgrade.purchased 
                          ? 'bg-yellow-500 cursor-default' 
                          : canAfford 
                            ? 'bg-green-600 hover:bg-green-700' 
                            : 'bg-gray-400 cursor-not-allowed'
                      }`}
                    >
                      {upgrade.purchased 
                        ? 'Purchased!' 
                        : canAfford 
                          ? 'Purchase' 
                          : 'Not enough coins'
                      }
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Shop;