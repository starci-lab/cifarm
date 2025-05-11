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
                    ? "bg-text-teal text-text"
                    : item.type === 2
                        ? "bg-selection-active-text"
                        : "bg-text-foreground",
            )}
        >
            <CardHeader className="h-24 pb-0">
                <div className="flex items-center gap-3 mb-4">
                    <div
                        className={cn(
                            "relative w-12 h-12 rounded-full p-2 self-start",
                            item.type === 1 ? "bg-primary-1/50" : item.type === 2 ? "bg-accent/50" : "bg-muted/50",
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
                                "text-xl font-bold text-text",
                            )}
                        >
                            {item.phase}
                        </h3>
                        <p className="text-sm">{item.description}</p>
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
                                        item.type === 1 ? "bg-primary" : item.type === 2 ? "bg-text-highlight" : "bg-text-contrast",
                                    )}
                                />
                                <span className="text-sm">{feature}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </CardContent>
        </Card>
    )
} 