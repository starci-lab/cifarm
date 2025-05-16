"use client"

import React, { FC } from "react"
import { PieChart, Pie, Cell } from "recharts"
import { Image } from "@/components"

interface AvatarChartProps {
    avatarUrl: string
    exp: number          // 0–1 (e.g. 0.4)
    quota: number        // 0–1 (e.g. 0.8)
}

export const AvatarChart: FC<AvatarChartProps> = ({ avatarUrl, exp, quota }) => {
    const safeQuota = Math.max(quota, 1)
    const safeExp = Math.max(exp, 1)
    const expRatio = safeExp / safeQuota
    const chartData = [
        { name: "Exp", value: expRatio, color: "hsl(var(--primary))", },
        { name: "Remaining", value: 1 - expRatio, color: "hsl(var(--content-2))" }
    ]

    return (
        <div className="relative aspect-square h-[160px] w-[160px]">
            {/* The chart itself */}
            <PieChart width={160} height={160}>
                <Pie
                    data={chartData}
                    dataKey="value"
                    startAngle={90}
                    endAngle={-270}
                    innerRadius={72}
                    outerRadius={80}
                    stroke="none"
                    isAnimationActive={false}
                >
                    {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                </Pie>
            </PieChart>

            {/* The centered div */}
            <Image src={avatarUrl} alt="Avatar" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full w-[144px] h-[144px]" />
        </div>
    )
}
