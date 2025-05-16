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
        phase: "Phase 1 - Q4 2024",
        description: "Social engagement",
        image: "/landing/background.png",
        icon: "/$CARROT.png",
        features: [
            "The CiFarm demo has been announced",
            "Planting and harvesting crops",
            "Feeding and raising animals",
            "Purchasing and selling animals, and crops",
        ],
        type: 1,
    },
    {
        phase: "Phase 2 - Q1 2025",
        description: "Gameplay",
        image: "/landing/background.png",
        icon: "/$CAULI.png",
        features: ["CiFarm Alpha is on air! We've got 2,000 early users"],
        type: 1, 
    },
    {
        phase: "Phase 3 - Q2 2025",
        description: "Start the first season",
        image: "/landing/background.png",
        icon: "/icons/roadside-stand.png",
        features: [
            "CiFarm Beta is coming with NFTs and the first season",
            "Attract seed funding",
        ],
        type: 2,
    },
    {
        phase: "Phase 4 - Q3 2025",
        description: "Conduct TGE through DEX and CEX",
        image: "/landing/background.png",
        icon: "/icons/neighbors.png",
        features: [
            "Add more game mechanics",
            "Add more game content",
            "Add more game features",
        ],
        type: 3, // upcoming
    },
] 