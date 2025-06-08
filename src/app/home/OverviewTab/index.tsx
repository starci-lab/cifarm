import { BlurEffect, Card, CardContent, CardHeader, CardTitle, ExtendedBadge, Image, Spacer } from "@/components"
import { ExtendedButton } from "@/components"
import React, { FC } from "react"
import { MainVisual } from "../MainVisual"
import { pathConstants } from "@/constants"
import { useRouterWithSearchParams } from "@/hooks"
import { Plant, ShareNetwork } from "@phosphor-icons/react"
import { useIsMobile } from "@/hooks/useIsMobile"
import { cn } from "@/lib/utils"
import { useSingletonHook } from "@/modules/singleton-hook"
import { useDisclosure } from "react-use-disclosure"
import { REFERRAL_DISCLOSURE } from "@/app/constants"
const tags = [{ name: "Farming" }, { name: "Social" }, { name: "Strategy" }]

export const OverviewTab: FC = () => {
    const router = useRouterWithSearchParams()
    const isMobile = useIsMobile()
    const { open } = useSingletonHook<ReturnType<typeof useDisclosure>>(REFERRAL_DISCLOSURE)
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
            <Card variant="default">
                <CardHeader>
                    <CardTitle>Description</CardTitle>
                </CardHeader>
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
            <Spacer y={6} />
            <Card variant="default">
                <CardHeader>
                    <CardTitle>Leaderboard</CardTitle>
                </CardHeader>
                <CardContent>
                    Coming soon
                </CardContent>
            </Card>
        </div> 
    )
}
