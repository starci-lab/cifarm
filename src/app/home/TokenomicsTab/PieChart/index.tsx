import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent, Image } from "@/components"
import { Pie, PieChart as RechartsPieChart } from "recharts"
import React, { FC } from "react"

export const PieChart: FC = () => {
    const chartData = [
        { section: "marketing", percentage: 5 },
        { section: "team", percentage: 10, fill: "var(--color-team)" },
        { section: "community", percentage: 20, fill: "var(--color-community)" },
        { section: "staking", percentage: 20, fill: "var(--color-staking)" },
        { section: "treasury", percentage: 20, fill: "var(--color-treasury)" },
        { section: "preSale", percentage: 10, fill: "var(--color-preSale)" },
        { section: "publicSale", percentage: 5, fill: "var(--color-publicSale)" },
        { section: "other", percentage: 10, fill: "var(--color-other)" },
    ]

    const chartConfig = {
        marketing: {
            label: "Marketing",
        },
        team: {
            label: "Chrome",
            color: "hsl(var(--chart-1))",
        },
        community: {
            label: "Community",
            color: "hsl(var(--chart-2))",
        },
        staking: {
            label: "Staking",
            color: "hsl(var(--chart-3))",
        },
        treasury: {
            label: "Treasury",
            color: "hsl(var(--chart-4))",
        },
        preSale: {
            label: "Pre Sale",
            color: "hsl(var(--chart-5))",
        },
        publicSale: {
            label: "Public Sale",
            color: "hsl(var(--chart-6))",
        },
        other: {
            label: "Other",
            color: "hsl(var(--chart-7))",
        },
    } satisfies ChartConfig
    return (
        <div className="relative md:w-fit w-full"> 
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full grid place-items-center">
                <div className="flex flex-col items-center gap-2">
                    <Image src="https://cifarm.sgp1.cdn.digitaloceanspaces.com/cifarm.png" alt="logo" className="w-12 h-12" />
                    <div>$CIFARM</div>
                </div>
            </div> 
            <ChartContainer
                config={chartConfig}    
                className="aspect-square max-w-[350px] w-[350px] relative mx-auto"
            >
                <RechartsPieChart className="z-50">
                    <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent hideLabel />}
                    />
                    <Pie
                        data={chartData}
                        dataKey="percentage"
                        nameKey="section"
                        innerRadius={80}
                        strokeWidth={5}
                    >
                    </Pie>
                </RechartsPieChart>
            </ChartContainer> 
        </div>
    )
}


