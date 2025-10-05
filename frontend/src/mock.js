// Mock data for the fishing clicker game

export const mockGameState = {
  fish: 125,
  coins: 45,
  fishPerSecond: 2.5,
  fishPerClick: 1,
  totalFishCaught: 1250,
  prestigeLevel: 0
};

export const mockInventory = [
  { id: 1, name: "Common Trout", quantity: 15, value: 2, rarity: "common", image: "🐟" },
  { id: 2, name: "Golden Bass", quantity: 8, value: 5, rarity: "uncommon", image: "🐠" },
  { id: 3, name: "Rainbow Salmon", quantity: 3, value: 12, rarity: "rare", image: "🌈" },
  { id: 4, name: "Legendary Tuna", quantity: 1, value: 50, rarity: "legendary", image: "⭐" },
  { id: 5, name: "Ancient Cod", quantity: 2, value: 25, rarity: "epic", image: "💎" }
];

export const mockBuildings = [
  {
    id: 1,
    name: "Fishing Rod",
    description: "A simple rod that increases fish per click",
    cost: 15,
    owned: 3,
    effect: "fishPerClick",
    multiplier: 1,
    icon: "fishing-rod"
  },
  {
    id: 2,
    name: "Fishing Net",
    description: "Automatically catches fish over time",
    cost: 100,
    owned: 1,
    effect: "fishPerSecond",
    multiplier: 0.5,
    icon: "net"
  },
  {
    id: 3,
    name: "Fishing Boat",
    description: "A boat that ventures into deeper waters",
    cost: 500,
    owned: 0,
    effect: "fishPerSecond",
    multiplier: 2,
    icon: "ship"
  },
  {
    id: 4,
    name: "Fishing Village",
    description: "A whole village dedicated to fishing",
    cost: 2500,
    owned: 0,
    effect: "fishPerSecond",
    multiplier: 10,
    icon: "home"
  }
];

export const mockUpgrades = [
  {
    id: 1,
    name: "Better Hook",
    description: "Doubles the efficiency of fishing rods",
    cost: 500,
    purchased: false,
    effect: "fishingRodMultiplier",
    multiplier: 2,
    icon: "hook"
  },
  {
    id: 2,
    name: "Reinforced Net",
    description: "Nets catch fish 50% faster",
    cost: 1000,
    purchased: false,
    effect: "netMultiplier",
    multiplier: 1.5,
    icon: "shield"
  },
  {
    id: 3,
    name: "Lucky Charm",
    description: "10% chance to catch rare fish",
    cost: 750,
    purchased: false,
    effect: "rareFishChance",
    multiplier: 0.1,
    icon: "star"
  }
];

export const fishTypes = [
  { name: "Common Trout", value: 2, rarity: "common", chance: 0.6 },
  { name: "Golden Bass", value: 5, rarity: "uncommon", chance: 0.25 },
  { name: "Rainbow Salmon", value: 12, rarity: "rare", chance: 0.1 },
  { name: "Ancient Cod", value: 25, rarity: "epic", chance: 0.04 },
  { name: "Legendary Tuna", value: 50, rarity: "legendary", chance: 0.01 }
];