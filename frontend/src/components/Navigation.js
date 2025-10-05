import React from 'react';
import { Button } from './ui/button';
import { Fish, Package, ShoppingBag, BarChart3, Settings } from 'lucide-react';

const Navigation = ({ currentPage, setCurrentPage }) => {
  const navItems = [
    { id: 'game', label: 'Fish', icon: Fish },
    { id: 'inventory', label: 'Inventory', icon: Package },
    { id: 'shop', label: 'Shop', icon: ShoppingBag },
    { id: 'stats', label: 'Stats', icon: BarChart3 },
  ];

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-cyan-600 p-4 shadow-lg">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-center space-x-2">
          {navItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = currentPage === item.id;
            
            return (
              <Button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                variant={isActive ? "secondary" : "ghost"}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                  isActive 
                    ? 'bg-white text-blue-600 shadow-md' 
                    : 'text-white hover:bg-white/20 hover:text-white'
                }`}
              >
                <IconComponent className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </Button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;