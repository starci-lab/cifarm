import React from "react"
import Image from "next/image"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface IRoadMap {
  phase: string
  description: string
  image: string
  icon: string
  features: Array<string>
  type: 1 | 2 | 3 // 1: completed (green), 2: in progress (yellow), 3: upcoming (gray)
}

export const ROADMAP_DATA: Array<IRoadMap> = [
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

export const Roadmap = () => {
    return (
        <div className="w-full">
            <Carousel
                opts={{
                    align: "start",
                    loop: true,
                }}
                className="w-full"
            >
                <CarouselContent>
                    {ROADMAP_DATA.map((item, index) => (
                        <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                            <Card
                                className={cn(
                                    "border-none transition-all duration-300 h-full",
                                    item.type === 1
                                        ? "bg-gradient-to-br from-sidebar-primary-foreground/40 to-sidebar-primary-foreground/20 hover:from-sidebar-primary-foreground/50 hover:to-sidebar-primary-foreground/30"
                                        : item.type === 2
                                            ? "bg-gradient-to-br from-amber-900/40 to-amber-800/20 hover:from-amber-800/50 hover:to-amber-700/30"
                                            : "bg-gradient-to-br from-gray-800/40 to-gray-700/20 hover:from-gray-700/50 hover:to-gray-600/30",
                                )}
                            >
                                <CardHeader className="h-24 pb-0">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div
                                            className={cn(
                                                "relative w-12 h-12 rounded-full p-2  self-start",
                                                item.type === 1 ? "bg-green-800/50" : item.type === 2 ? "bg-amber-800/50" : "bg-gray-700/50",
                                            )}
                                        >
                                            <Image
                                                src={item.icon || "/placeholder.svg"}
                                                alt="Phase icon"
                                                fill
                                                className="object-contain p-1"
                                            />
                                        </div>
                                        <div>
                                            <h3
                                                className={cn(
                                                    "text-xl font-bold",
                                                    item.type === 1 ? "text-green-400" : item.type === 2 ? "text-amber-400" : "text-gray-300",
                                                )}
                                            >
                                                {item.phase}
                                            </h3>
                                            <p className="text-sm text-gray-400">{item.description}</p>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="p-6 flex flex-col pt-0">
                                    
                                    <div className="flex flex-col">
                                        <div className="relative w-full h-48 mb-4 flex-grow">
                                            <Image
                                                src={item.image}
                                                alt={`${item.phase} illustration`}
                                                fill
                                                className="object-cover rounded-lg bg-center"
                                            />
                                        </div>
                                        <ul className="space-y-2 flex-1">
                                            {item.features.map((feature, featureIndex) => (
                                                <li key={featureIndex} className="flex items-start gap-2">
                                                    <div
                                                        className={cn(
                                                            "w-1.5 h-1.5 rounded-full mt-2",
                                                            item.type === 1 ? "bg-green-500" : item.type === 2 ? "bg-amber-500" : "bg-gray-500",
                                                        )}
                                                    />
                                                    <span className="text-sm text-gray-300">{feature}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </CardContent>
                            </Card>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <div className="flex justify-center gap-4 mt-8">
                    <CarouselPrevious variant="secondary" className="static translate-y-0" />
                    <CarouselNext variant="secondary" className="static translate-y-0" />
                </div>
            </Carousel>
        </div>
    )
}
