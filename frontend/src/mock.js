// Mock data for the fishing clicker game

export const mockGameState = {
  fish: 125,
  coins: 45,
  fishPerSecond: 2.5,
  fishPerClick: 1,
  totalFishCaught: 1250,
  prestigeLevel: 0,
  fishingState: 'ready', // 'ready', 'casting', 'reeling', 'caught'
  castingProgress: 0,
  reelingProgress: 0
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
  // Tier 1 Upgrades (Basic)
  {
    id: 1,
    name: "Better Hook",
    description: "Doubles the efficiency of fishing rods",
    cost: 500,
    purchased: false,
    effect: "fishingRodMultiplier",
    multiplier: 2,
    icon: "hook",
    tier: 1
  },
  {
    id: 2,
    name: "Reinforced Net",
    description: "Nets catch fish 50% faster",
    cost: 1000,
    purchased: false,
    effect: "netMultiplier",
    multiplier: 1.5,
    icon: "shield",
    tier: 1
  },
  {
    id: 3,
    name: "Lucky Charm",
    description: "10% chance to catch rare fish",
    cost: 750,
    purchased: false,
    effect: "rareFishChance",
    multiplier: 0.1,
    icon: "star",
    tier: 1
  },
  {
    id: 4,
    name: "Sharp Line",
    description: "Fish per click +1",
    cost: 300,
    purchased: false,
    effect: "fishPerClick",
    multiplier: 1,
    icon: "zap",
    tier: 1
  },
  {
    id: 5,
    name: "Fast Reel",
    description: "Reduces casting time by 20%",
    cost: 800,
    purchased: false,
    effect: "castingSpeed",
    multiplier: 0.8,
    icon: "clock",
    tier: 1
  },
  
  // Tier 2 Upgrades (Intermediate)
  {
    id: 6,
    name: "Golden Rod",
    description: "Triples fishing rod efficiency",
    cost: 2500,
    purchased: false,
    effect: "fishingRodMultiplier",
    multiplier: 3,
    icon: "crown",
    tier: 2
  },
  {
    id: 7,
    name: "Mega Net",
    description: "Nets generate 2x more fish",
    cost: 5000,
    purchased: false,
    effect: "netMultiplier",
    multiplier: 2,
    icon: "target",
    tier: 2
  },
  {
    id: 8,
    name: "Sonar System",
    description: "Boats find fish 50% faster",
    cost: 7500,
    purchased: false,
    effect: "boatMultiplier",
    multiplier: 1.5,
    icon: "radar",
    tier: 2
  },
  {
    id: 9,
    name: "Master Angler",
    description: "Fish per click +3",
    cost: 4000,
    purchased: false,
    effect: "fishPerClick",
    multiplier: 3,
    icon: "user",
    tier: 2
  },
  {
    id: 10,
    name: "Speed Casting",
    description: "Cast and reel 40% faster",
    cost: 6000,
    purchased: false,
    effect: "castingSpeed",
    multiplier: 0.6,
    icon: "flash",
    tier: 2
  },
  
  // Tier 3 Upgrades (Advanced)
  {
    id: 11,
    name: "Diamond Hook",
    description: "Fishing rods are 5x more effective",
    cost: 15000,
    purchased: false,
    effect: "fishingRodMultiplier",
    multiplier: 5,
    icon: "gem",
    tier: 3
  },
  {
    id: 12,
    name: "Trawling Expert",
    description: "All buildings produce 25% more",
    cost: 20000,
    purchased: false,
    effect: "globalMultiplier",
    multiplier: 1.25,
    icon: "trending-up",
    tier: 3
  },
  {
    id: 13,
    name: "Fish Whisperer",
    description: "Rare fish appear 2x more often",
    cost: 18000,
    purchased: false,
    effect: "rareFishChance",
    multiplier: 2,
    icon: "heart",
    tier: 3
  },
  {
    id: 14,
    name: "Deep Sea Explorer",
    description: "Villages produce 3x more fish",
    cost: 25000,
    purchased: false,
    effect: "villageMultiplier",
    multiplier: 3,
    icon: "compass",
    tier: 3
  },
  {
    id: 15,
    name: "Lightning Cast",
    description: "Instant casting and reeling",
    cost: 30000,
    purchased: false,
    effect: "castingSpeed",
    multiplier: 0.1,
    icon: "bolt",
    tier: 3
  },
  
  // Tier 4 Upgrades (Expert)
  {
    id: 16,
    name: "Mythical Rod",
    description: "Fishing rods effectiveness x10",
    cost: 75000,
    purchased: false,
    effect: "fishingRodMultiplier",
    multiplier: 10,
    icon: "wand",
    tier: 4
  },
  {
    id: 17,
    name: "Ocean Master",
    description: "All production doubled",
    cost: 100000,
    purchased: false,
    effect: "globalMultiplier",
    multiplier: 2,
    icon: "globe",
    tier: 4
  },
  {
    id: 18,
    name: "Legendary Lure",
    description: "Fish per click +10",
    cost: 85000,
    purchased: false,
    effect: "fishPerClick",
    multiplier: 10,
    icon: "award",
    tier: 4
  },
  {
    id: 19,
    name: "Kraken Caller",
    description: "Legendary fish chance +5%",
    cost: 90000,
    purchased: false,
    effect: "rareFishChance",
    multiplier: 5,
    icon: "octopus",
    tier: 4
  },
  {
    id: 20,
    name: "Storm Fisher",
    description: "Weather doesn't affect fishing",
    cost: 80000,
    purchased: false,
    effect: "weatherResistance",
    multiplier: 1,
    icon: "cloud-lightning",
    tier: 4
  },

  // Tier 5 Upgrades (Master)
  {
    id: 21,
    name: "Poseidon's Trident",
    description: "All fishing effectiveness x5",
    cost: 250000,
    purchased: false,
    effect: "globalMultiplier",
    multiplier: 5,
    icon: "trident",
    tier: 5
  },
  {
    id: 22,
    name: "Ancient Knowledge",
    description: "Unlock secret fishing spots",
    cost: 300000,
    purchased: false,
    effect: "secretSpots",
    multiplier: 1,
    icon: "book",
    tier: 5
  },
  {
    id: 23,
    name: "Time Manipulation",
    description: "All timers 90% faster",
    cost: 275000,
    purchased: false,
    effect: "timeMultiplier",
    multiplier: 0.1,
    icon: "clock-3",
    tier: 5
  },
  {
    id: 24,
    name: "Dimensional Rod",
    description: "Catch fish from other dimensions",
    cost: 350000,
    purchased: false,
    effect: "dimensionalFishing",
    multiplier: 1,
    icon: "infinity",
    tier: 5
  },
  {
    id: 25,
    name: "Fish Teleporter",
    description: "Fish per second x10",
    cost: 400000,
    purchased: false,
    effect: "fishPerSecondMultiplier",
    multiplier: 10,
    icon: "shuffle",
    tier: 5
  },

  // Tier 6 Upgrades (Grandmaster)
  {
    id: 26,
    name: "Cosmic Fisher",
    description: "Fish in space and time",
    cost: 1000000,
    purchased: false,
    effect: "cosmicFishing",
    multiplier: 1,
    icon: "rocket",
    tier: 6
  },
  {
    id: 27,
    name: "Reality Bender",
    description: "All multipliers x2",
    cost: 1200000,
    purchased: false,
    effect: "realityBending",
    multiplier: 2,
    icon: "eye",
    tier: 6
  },
  {
    id: 28,
    name: "Quantum Entanglement",
    description: "Fish catch themselves",
    cost: 1500000,
    purchased: false,
    effect: "quantumFishing",
    multiplier: 1,
    icon: "atom",
    tier: 6
  },
  {
    id: 29,
    name: "Universal Net",
    description: "Catch fish from all universes",
    cost: 1800000,
    purchased: false,
    effect: "universalNet",
    multiplier: 1,
    icon: "orbit",
    tier: 6
  },
  {
    id: 30,
    name: "Omnipotent Angler",
    description: "Transcend mortal fishing",
    cost: 2500000,
    purchased: false,
    effect: "omnipotence",
    multiplier: 1,
    icon: "crown",
    tier: 6
  },

  // Additional Creative Upgrades (31-50)
  {
    id: 31,
    name: "Magnetic Lure",
    description: "Fish are drawn to your hook",
    cost: 1250,
    purchased: false,
    effect: "fishPerClick",
    multiplier: 2,
    icon: "magnet",
    tier: 2
  },
  {
    id: 32,
    name: "Underwater Breathing",
    description: "Dive for rare fish",
    cost: 3500,
    purchased: false,
    effect: "rareFishChance",
    multiplier: 1.5,
    icon: "waves",
    tier: 2
  },
  {
    id: 33,
    name: "Fish Translator",
    description: "Communicate with fish for better catches",
    cost: 5500,
    purchased: false,
    effect: "fishPerClick",
    multiplier: 4,
    icon: "message-circle",
    tier: 2
  },
  {
    id: 34,
    name: "Bait Master",
    description: "Perfect bait every time",
    cost: 8500,
    purchased: false,
    effect: "fishPerSecondMultiplier",
    multiplier: 1.5,
    icon: "target",
    tier: 3
  },
  {
    id: 35,
    name: "Weather Control",
    description: "Control weather for optimal fishing",
    cost: 12000,
    purchased: false,
    effect: "globalMultiplier",
    multiplier: 1.3,
    icon: "sun",
    tier: 3
  },
  {
    id: 36,
    name: "Tide Master",
    description: "Control ocean tides",
    cost: 22000,
    purchased: false,
    effect: "fishPerSecondMultiplier",
    multiplier: 2,
    icon: "waves",
    tier: 3
  },
  {
    id: 37,
    name: "Fish Radar",
    description: "Detect fish locations instantly",
    cost: 35000,
    purchased: false,
    effect: "fishPerClick",
    multiplier: 8,
    icon: "radar",
    tier: 4
  },
  {
    id: 38,
    name: "Genetic Enhancement",
    description: "Create super fish breeds",
    cost: 50000,
    purchased: false,
    effect: "rareFishChance",
    multiplier: 3,
    icon: "dna",
    tier: 4
  },
  {
    id: 39,
    name: "Quantum Hooks",
    description: "Hooks exist in multiple states",
    cost: 75000,
    purchased: false,
    effect: "fishPerClick",
    multiplier: 15,
    icon: "atom",
    tier: 4
  },
  {
    id: 40,
    name: "Temporal Fishing",
    description: "Fish from past and future",
    cost: 125000,
    purchased: false,
    effect: "fishPerSecondMultiplier",
    multiplier: 5,
    icon: "clock",
    tier: 5
  },
  {
    id: 41,
    name: "Parallel Universe Rod",
    description: "Fish in parallel dimensions",
    cost: 200000,
    purchased: false,
    effect: "globalMultiplier",
    multiplier: 3,
    icon: "layers",
    tier: 5
  },
  {
    id: 42,
    name: "AI Assistant",
    description: "AI optimizes your fishing strategy",
    cost: 300000,
    purchased: false,
    effect: "fishPerClick",
    multiplier: 25,
    icon: "cpu",
    tier: 5
  },
  {
    id: 43,
    name: "Nano Bots",
    description: "Microscopic fishing helpers",
    cost: 450000,
    purchased: false,
    effect: "fishPerSecondMultiplier",
    multiplier: 8,
    icon: "zap",
    tier: 5
  },
  {
    id: 44,
    name: "Holographic Fish",
    description: "Create fish from pure energy",
    cost: 600000,
    purchased: false,
    effect: "fishPerClick",
    multiplier: 50,
    icon: "sparkles",
    tier: 6
  },
  {
    id: 45,
    name: "Matter Converter",
    description: "Convert anything into fish",
    cost: 800000,
    purchased: false,
    effect: "globalMultiplier",
    multiplier: 8,
    icon: "repeat",
    tier: 6
  },
  {
    id: 46,
    name: "Black Hole Net",
    description: "Fish cannot escape gravity",
    cost: 1100000,
    purchased: false,
    effect: "fishPerSecondMultiplier",
    multiplier: 15,
    icon: "circle",
    tier: 6
  },
  {
    id: 47,
    name: "Multiverse Gateway",
    description: "Access infinite fishing worlds",
    cost: 1600000,
    purchased: false,
    effect: "fishPerClick",
    multiplier: 100,
    icon: "portal",
    tier: 6
  },
  {
    id: 48,
    name: "God Mode Fishing",
    description: "Omniscient fishing abilities",
    cost: 2200000,
    purchased: false,
    effect: "globalMultiplier",
    multiplier: 20,
    icon: "crown",
    tier: 6
  },
  {
    id: 49,
    name: "Infinity Rod",
    description: "Infinite fishing power",
    cost: 3000000,
    purchased: false,
    effect: "fishPerClick",
    multiplier: 500,
    icon: "infinity",
    tier: 6
  },
  {
    id: 50,
    name: "Ultimate Transcendence",
    description: "Become one with all fish",
    cost: 5000000,
    purchased: false,
    effect: "transcendence",
    multiplier: 1000,
    icon: "sun",
    tier: 6
  }
];

export const fishTypes = [
  { name: "Common Trout", value: 2, rarity: "common", chance: 0.6 },
  { name: "Golden Bass", value: 5, rarity: "uncommon", chance: 0.25 },
  { name: "Rainbow Salmon", value: 12, rarity: "rare", chance: 0.1 },
  { name: "Ancient Cod", value: 25, rarity: "epic", chance: 0.04 },
  { name: "Legendary Tuna", value: 50, rarity: "legendary", chance: 0.01 }
];