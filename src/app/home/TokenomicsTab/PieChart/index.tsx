import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent, Image } from "@/components"
import { Pie, PieChart as RechartsPieChart } from "recharts"
import React, { FC } from "react"

export const distributionData = [
    { section: "Airdrop", percentage: 30, fill: "hsl(var(--chart-1))", description: "Fully unlocked at TGE" },
    { section: "Liquidity Pool", percentage: 25, fill: "hsl(var(--chart-2))", description: "Fully unlocked at TGE" },
    { section: "CEO Listing", percentage: 5, fill: "hsl(var(--chart-3))", description: "Locked for 1 month after TGE" },
    { section: "Vault Treasury", percentage: 30, fill: "hsl(var(--chart-4))", description: "50% unlocked at TGE, then 5-month cliff for remaining" },
    { section: "Team", percentage: 5, fill: "hsl(var(--chart-5))", description: "Locked for 5 months, then unlocks over 1 month cliff" },
    { section: "Marketing", percentage: 5, fill: "hsl(var(--chart-6))", description: "Locked for 1 month after TGE" },
    { section: "Early Investors", percentage: 10, fill: "hsl(var(--chart-7))", description: "Locked for 3 months, then unlocks with a 1-month cliff" },
]

export const PieChart: FC = () => {
    

    const chartConfig = {
        airdrop: {
            label: "Airdrop",
            color: "hsl(var(--chart-1))",
        },
        liquidityPool: {
            label: "Liquidity Pool",
            color: "hsl(var(--chart-2))",
        },
        ceoListing: {
            label: "CEO Listing",
            color: "hsl(var(--chart-3))",
        },
        vaultTreasury: {
            label: "Vault Treasury",
            color: "hsl(var(--chart-4))",
        },
        team: {
            label: "Team",
            color: "hsl(var(--chart-5))",
        },
        marketing: {
            label: "Marketing",
            color: "hsl(var(--chart-6))",
        },
        earlyInvestors: {
            label: "Early Investors",
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
                        data={distributionData}
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


