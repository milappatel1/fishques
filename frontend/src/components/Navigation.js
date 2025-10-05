import React from 'react';
import { Button } from './ui/button';
import { Fish, Package, ShoppingBag, ChartBar as BarChart3, Settings } from 'lucide-react';

const Navigation = ({ currentPage, setCurrentPage }) => {
  const navItems = [
    { id: 'game', label: 'Fish', icon: Fish },
    { id: 'inventory', label: 'Inventory', icon: Package },
    { id: 'shop', label: 'Shop', icon: ShoppingBag },
    { id: 'stats', label: 'Stats', icon: BarChart3 },
  ];

  return (
    <nav className="bg-gradient-to-r from-slate-700 to-slate-800 p-4 shadow-lg">
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
                    ? 'bg-slate-600 text-slate-100 shadow-md'
                    : 'text-slate-300 hover:bg-slate-600/50 hover:text-slate-100'
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