export interface IRoadMap {
    phase: string
    description: string
    image: string
    icon: string
    features: Array<string>
    type: 1 | 2 | 3 // 1: completed (green), 2: in progress (yellow), 3: upcoming (gray)
} 

export const roadmapConstants: Array<IRoadMap> = [
    {
        phase: "Phase 1 - 22/9",
        description: "Release the Cifarm MVP on Aptos Testnet",
        image: "/landing/background.png",
        icon: "/$CARROT.png",
        features: [
            "Planting and harvesting crops",
            "Feeding and raising animals",
            "Purchasing and selling animals, and crops",
        ],
        type: 1, // completed
    },
    {
        phase: "Phase 2 - Late Nov 2024",
        description: "Add More Features",
        image: "/landing/background.png",
        icon: "/$CAULI.png",
        features: ["New animals (10+)", "New pets (10+)", "New crops (20+)"],
        type: 1, 
    },
    {
        phase: "Phase 3 - Late Dec 2024",
        description: "Raising the Cifarm community",
        image: "/landing/background.png",
        icon: "/icons/roadside-stand.png",
        features: [
            "Launch the Cifarm community on Telegram",
            "Launch in-game events where players can claim $CAU tokens through airdrops",
        ],
        type: 2,
    },
    {
        phase: "Phase 4 - Early Jan 2025",
        description: "Presale tokens, create NFT marketplace",
        image: "/landing/background.png",
        icon: "/icons/nft-marketplace.png",
        features: ["Presale tokens", "Create NFT marketplace"],
        type: 3, // upcoming
    },
    {
        phase: "Phase 5 - Feb 2025",
        description: "Release the stable version",
        image: "/landing/background.png",
        icon: "/icons/neighbors.png",
        features: ["Release the stable version of Cifarm on AptosC-Chain Mainnet"],
        type: 3, // upcoming
    },
] 