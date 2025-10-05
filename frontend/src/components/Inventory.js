import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Coins, Package } from 'lucide-react';
const Inventory = ({ gameState, onSellFish }) => {
  const inventory = gameState.inventory || [];

  const getRarityColor = (rarity) => {
    switch (rarity) {
      case 'common': return 'bg-gray-700 text-gray-200 border-gray-600';
      case 'uncommon': return 'bg-green-900 text-green-200 border-green-700';
      case 'rare': return 'bg-blue-900 text-blue-200 border-blue-700';
      case 'epic': return 'bg-purple-900 text-purple-200 border-purple-700';
      case 'legendary': return 'bg-yellow-900 text-yellow-200 border-yellow-700';
      default: return 'bg-gray-700 text-gray-200 border-gray-600';
    }
  };

  const sellFish = (fishId, quantity = 1) => {
    const fish = inventory.find(f => f.id === fishId);
    if (fish && fish.quantity >= quantity) {
      const totalValue = fish.value * quantity;
      const updatedInventory = inventory
        .map(f =>
          f.id === fishId
            ? { ...f, quantity: f.quantity - quantity }
            : f
        )
        .filter(f => f.quantity > 0);
      onSellFish(totalValue, updatedInventory);
    }
  };

  const sellAll = (fishId) => {
    const fish = inventory.find(f => f.id === fishId);
    if (fish) {
      sellFish(fishId, fish.quantity);
    }
  };

  const totalValue = inventory.reduce((sum, fish) => sum + (fish.value * fish.quantity), 0);

  const sellAllFish = () => {
    if (totalValue > 0) {
      const confirmSell = window.confirm(
        `Are you sure you want to sell all fish for ${totalValue} coins?`
      );

      if (confirmSell) {
        onSellFish(totalValue, []);
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-100 mb-2 flex items-center gap-2">
          <Package className="w-8 h-8" />
          Fish Inventory
        </h1>
        <p className="text-slate-300">Manage and sell your caught fish</p>

        <Card className="mt-4 bg-gradient-to-r from-yellow-900 to-orange-900 border-yellow-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Coins className="w-6 h-6 text-yellow-300" />
                <span className="font-semibold text-yellow-100">Total Inventory Value:</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-2xl font-bold text-yellow-200">
                  {totalValue} coins
                </div>
                {totalValue > 0 && (
                  <Button
                    onClick={sellAllFish}
                    className="bg-red-600 hover:bg-red-700 text-white font-bold"
                  >
                    Sell All Fish
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {inventory.length === 0 ? (
        <Card className="text-center p-8 bg-slate-800 border-slate-700">
          <CardContent>
            <div className="text-6xl mb-4">🎣</div>
            <h3 className="text-xl font-semibold text-slate-300 mb-2">Empty Inventory</h3>
            <p className="text-slate-400">Go catch some fish to fill your inventory!</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {inventory.map((fish) => (
            <Card key={fish.id} className="hover:shadow-lg transition-shadow duration-200 bg-slate-800 border-slate-700">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center justify-between">
                  <span className="text-lg">{fish.name}</span>
                  <Badge className={getRarityColor(fish.rarity)}>
                    {fish.rarity}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-4">
                  <div className="text-4xl mb-2">{fish.image}</div>
                  <div className="text-2xl font-bold text-blue-600">×{fish.quantity}</div>
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Value each:</span>
                    <span className="font-semibold text-slate-200">{fish.value} coins</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Total value:</span>
                    <span className="font-bold text-green-400">{fish.value * fish.quantity} coins</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Button 
                    onClick={() => sellFish(fish.id, 1)}
                    variant="outline"
                    className="w-full"
                    disabled={fish.quantity < 1}
                  >
                    Sell 1 for {fish.value} coins
                  </Button>
                  
                  {fish.quantity > 1 && (
                    <Button 
                      onClick={() => sellAll(fish.id)}
                      className="w-full bg-green-600 hover:bg-green-700"
                    >
                      Sell All for {fish.value * fish.quantity} coins
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Inventory;