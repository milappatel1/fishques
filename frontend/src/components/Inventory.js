import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Coins, Package } from 'lucide-react';
import { mockInventory } from '../mock';

const Inventory = ({ gameState, onSellFish }) => {
  const [inventory, setInventory] = useState(mockInventory);

  const getRarityColor = (rarity) => {
    switch (rarity) {
      case 'common': return 'bg-gray-100 text-gray-800 border-gray-300';
      case 'uncommon': return 'bg-green-100 text-green-800 border-green-300';
      case 'rare': return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'epic': return 'bg-purple-100 text-purple-800 border-purple-300';
      case 'legendary': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const sellFish = (fishId, quantity = 1) => {
    const fish = inventory.find(f => f.id === fishId);
    if (fish && fish.quantity >= quantity) {
      const totalValue = fish.value * quantity;
      onSellFish(totalValue);
      
      setInventory(prev => 
        prev.map(f => 
          f.id === fishId 
            ? { ...f, quantity: f.quantity - quantity }
            : f
        ).filter(f => f.quantity > 0)
      );
    }
  };

  const sellAll = (fishId) => {
    const fish = inventory.find(f => f.id === fishId);
    if (fish) {
      sellFish(fishId, fish.quantity);
    }
  };

  const totalValue = inventory.reduce((sum, fish) => sum + (fish.value * fish.quantity), 0);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-blue-900 mb-2 flex items-center gap-2">
          <Package className="w-8 h-8" />
          Fish Inventory
        </h1>
        <p className="text-blue-700">Manage and sell your caught fish</p>
        
        <Card className="mt-4 bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Coins className="w-6 h-6 text-yellow-600" />
                <span className="font-semibold text-yellow-900">Total Inventory Value:</span>
              </div>
              <div className="text-2xl font-bold text-yellow-800">
                {totalValue} coins
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {inventory.length === 0 ? (
        <Card className="text-center p-8">
          <CardContent>
            <div className="text-6xl mb-4">🎣</div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">Empty Inventory</h3>
            <p className="text-gray-500">Go catch some fish to fill your inventory!</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {inventory.map((fish) => (
            <Card key={fish.id} className="hover:shadow-lg transition-shadow duration-200">
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
                    <span className="text-gray-600">Value each:</span>
                    <span className="font-semibold">{fish.value} coins</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Total value:</span>
                    <span className="font-bold text-green-600">{fish.value * fish.quantity} coins</span>
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