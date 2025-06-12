import { BlurEffect, Card, CardContent, CardHeader, CardTitle, ExtendedBadge, ExtendedTable, Image, Spacer, Title } from "@/components"
import { ExtendedButton } from "@/components"
import React, { FC } from "react"
import { MainVisual } from "../MainVisual"
import { pathConstants } from "@/constants"
import { useGraphQLQueryLeaderboardSwr, useRouterWithSearchParams } from "@/hooks"
import { Plant, ShareNetwork } from "@phosphor-icons/react"
import { useIsMobile } from "@/hooks/useIsMobile"
import { cn } from "@/lib/utils"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useDisclosure } from "react-use-disclosure"
import { GRAPHQL_QUERY_LEADERBOARD_SWR, REFERRAL_DISCLOSURE } from "@/app/constants"
import { ColumnDef } from "@tanstack/react-table"
const tags = [{ name: "Farming" }, { name: "Social" }, { name: "Strategy" }]

export interface TableData {
    username: string
    level: number
    avatarUrl: string
}
export const OverviewTab: FC = () => {
    const router = useRouterWithSearchParams()
    const isMobile = useIsMobile()
    const { open } = useSingletonHook<ReturnType<typeof useDisclosure>>(REFERRAL_DISCLOSURE)
    const { swr: leaderboardSwr } = useSingletonHook<
     ReturnType<typeof useGraphQLQueryLeaderboardSwr>
    >(GRAPHQL_QUERY_LEADERBOARD_SWR)

    const tableData: Array<TableData> = leaderboardSwr.data?.data.leaderboard.data.map((user) => {
        if (!user) return null
        return {
            username: user.username ?? "",
            level: user.level ?? 0,
            avatarUrl: user.avatarUrl ?? "",
        }
    }).filter((user) => user !== null) ?? []

    const columns: Array<ColumnDef<TableData>> = [
        {
            accessorKey: "assets",
            header: "Assets",
            cell: ({ row }) => {
                const asset = row.original.avatarUrl
                return (
                    <div className="flex items-center gap-2">
                        <div className="relative">
                            <Image src={asset} alt={asset} className="w-12 h-12 rounded-lg" />
                        </div>
                        <div>
                            <div className="text-xl">{row.original.username}</div>
                            <div className="text-muted-foreground">Lv. {row.original.level}</div>
                        </div>
                    </div>
                )
            }
        },
        {
            accessorKey: "balance",
            header: "Earnings",
            cell: (
                //{ row }
            ) => {
                //TODO: get earnings from the backend
                //console.log(row.original)
                return <div>0 USDC</div>
            }
        },
    ]

    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="col-span-1 md:col-span-2 lg:col-span-2">
                    <MainVisual />
                </div>
                <div className="flex flex-col gap-3 mt-4 md:mt-0 min-w-[200px] col-span-1 md:col-span-2 lg:col-span-1">
                    <ExtendedButton
                        className={cn("items-center justify-center gap-2 w-full z-50", {
                            "hidden": isMobile,
                        })}
                        size="lg"
                        onClick={() => {
                            router.push(pathConstants.play)
                        }}
                    >
                        <Plant size={28} height={28} />
                        <div className="text-xl">Play</div>
                    </ExtendedButton>
                    <BlurEffect size="sm" position="top" className="-z-20 hover:opacity-80 transition-opacity duration-200" />
                    <ExtendedButton className="flex items-center justify-center gap-2 w-full md:w-auto z-10" color="secondary"
                        variant="flat"
                        onClick={open}
                    >
                        <ShareNetwork />
                        Referral
                    </ExtendedButton>

                    <Card variant="default">
                        <CardHeader>
                            <CardTitle>Details</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-wrap gap-2">
                                {tags.map((tag, index) => (
                                    <ExtendedBadge
                                        key={index}
                                        variant="secondary"
                                    >
                                        {tag.name}
                                    </ExtendedBadge>
                                ))}
                            </div>
                            <Spacer y={4} />
                            <div className="flex justify-between gap-2">
                                <div className="flex items-center gap-2">Game Framework</div>
                                <div className="flex items-center gap-1">
                                    <Image src="https://i0.wp.com/technotip.com/wp-content/uploads/phaser/phaser-logo.png?w=840" className="h-8" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
            <Spacer y={!isMobile ? 6 : 4} />
            <div>
                <Title
                    title="Description"
                    classNames={{
                        title: "text-2xl",
                        tooltip: "w-6 h-6"
                    }}
                />
                <Spacer y={4} />
                <Card variant="default">
                    <CardContent>
                        <div className="text-justify">
                        CiFarm is a social farming game where players can farm, steal, and earn rewards in a competitive and engaging environment. The game features a unique economic model designed to foster long-term value and maintain high user engagement across multiple game seasons.
                            <br />
                            <br />
                        Unlike typical play-to-earn games, CiFarm operates on its own internal market with a self-contained supply and demand system. This means CiFarm does not rely on external markets or unsustainable revenue models (like Ponzi schemes) to function.
                            <br />
                            <br />
To succeed in CiFarm, the key is active participation—players who consistently engage with the game will have the greatest chance of winning and earning rewards.
                        </div>
                    </CardContent>
                </Card>
            </div>
            <Spacer y={6} />
            <div>
                <Title
                    title="Leaderboard"
                    classNames={{
                        title: "text-2xl",
                        tooltip: "w-6 h-6"
                    }}
                    tooltipString="The top 10 players with the highest earnings."
                />
                <Spacer y={4} />
                <ExtendedTable
                    data={tableData}
                    columns={columns}
                    showPagination={false}
                    showSelectedRowText={false}
                />
            </div>
        </div> 
    )
}
