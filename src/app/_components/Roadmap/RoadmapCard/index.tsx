"use client"

import type React from "react"
import Image from "next/image"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { CheckCircle2, Clock, CalendarClock } from "lucide-react"
import type { IRoadMap } from "@/constants"

interface RoadmapCardProps {
  item: IRoadMap
}

export const RoadmapCard: React.FC<RoadmapCardProps> = ({ item }) => {
    // Status configuration based on type
    const statusConfig = {
        1: {
            // Completed
            label: "Completed",
            color: "bg-emerald-50 hover:bg-emerald-100 border-emerald-200",
            iconBg: "bg-emerald-100 text-emerald-700",
            textColor: "text-emerald-700",
            icon: <CheckCircle2 className="h-4 w-4" />,
            bulletColor: "bg-emerald-500",
        },
        2: {
            // In Progress
            label: "In Progress",
            color: "bg-amber-50 hover:bg-amber-100 border-amber-200",
            iconBg: "bg-amber-100 text-amber-700",
            textColor: "text-amber-700",
            icon: <Clock className="h-4 w-4" />,
            bulletColor: "bg-amber-500",
        },
        3: {
            // Upcoming
            label: "Upcoming",
            color: "bg-slate-50 hover:bg-slate-100 border-slate-200",
            iconBg: "bg-slate-100 text-slate-600",
            textColor: "text-slate-600",
            icon: <CalendarClock className="h-4 w-4" />,
            bulletColor: "bg-slate-400",
        },
    }[item.type]

    return (
        <Card className={cn("border transition-all duration-300 h-full group hover:shadow-md", statusConfig.color)}>
            <CardHeader className="pb-2">
                <div className="flex justify-between items-start mb-2">
                    <Badge variant="outline" className={cn("px-2 py-1 font-medium", statusConfig.textColor)}>
                        <span className="flex items-center gap-1.5">
                            {statusConfig.icon}
                            {statusConfig.label}
                        </span>
                    </Badge>
                </div>

                <div className="flex items-center gap-4 mt-2">
                    <div
                        className={cn(
                            "relative w-14 h-14 rounded-full p-2 flex-shrink-0 transition-transform group-hover:scale-105",
                            statusConfig.iconBg,
                        )}
                    >
                        <Image
                            src={item.icon || "/placeholder.svg"}
                            alt={`${item.phase} icon`}
                            fill
                            className="object-contain p-2"
                        />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-slate-800">{item.phase}</h3>
                        <p className="text-sm text-slate-600 mt-1">{item.description}</p>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="pt-4">
                <div className="space-y-3">
                    {item.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-start gap-3">
                            <div className={cn("w-2 h-2 rounded-full mt-1.5 flex-shrink-0", statusConfig.bulletColor)} />
                            <span className="text-sm text-slate-700">{feature}</span>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}
