import React from "react"
import Image from "next/image"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { IRoadMap } from "@/constants"

interface RoadmapCardProps {
    item: IRoadMap
}

export const RoadmapCard: React.FC<RoadmapCardProps> = ({ item }) => {
    return (
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
    )
} 