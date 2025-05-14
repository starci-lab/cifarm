import { BlurEffect, Card, CardContent, CardHeader, CardTitle, Separator, Tooltip, TooltipContent, TooltipTrigger } from "@/components"
import { ExtendedButton } from "@/components"
import React, { FC } from "react"
import { MainVisual } from "../MainVisual"
import { pathConstants } from "@/constants"
import { PanelTop, Share2Icon } from "lucide-react"
import { useRouterWithSearchParams } from "@/hooks"

const tags = [{ name: "Early Access" }, { name: "Farming" }, { name: "Strategy" }]

export const OverviewTab: FC = () => {
    const router = useRouterWithSearchParams()
    return (
        <div>
            <div className="flex flex-col md:flex-row md:gap-4">
                <div className="w-full md:flex-1">
                    <MainVisual />
                </div>

                <div className="flex flex-col gap-3 mt-4 md:mt-0 md:w-[200px] relative">
                    <ExtendedButton
                        variant={"gradient-secondary"}
                        className="flex items-center justify-center gap-2 w-full md:w-auto relative"
                        size="lg"
                        onClick={() => {
                            router.push(pathConstants.play)
                        }}
                    >
                        Play
                    </ExtendedButton>
                    <BlurEffect size="sm" position="top" className="-z-20 hover:opacity-80 transition-opacity duration-200" />

                    <ExtendedButton className="flex items-center justify-center gap-2 w-full md:w-auto z-10" variant="secondary">
                        <Share2Icon className="w-4 h-4" />
                        Share
                    </ExtendedButton>

                    <Card variant="default">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-xl font-bold text-foreground">Details</CardTitle>
                        </CardHeader>
                        <Separator />
                        <CardContent>
                            <div className="flex flex-wrap gap-2">
                                {tags.map((tag, index) => (
                                    <div
                                        key={index}
                                        className="bg-secondary px-2 py-[0.5px] rounded-md text-[12px] font-semibold text-background hover:bg-secondary/75 transition-colors duration-200"
                                    >
                                        {tag.name}
                                    </div>
                                ))}
                            </div>
                            <div className="flex justify-between gap-2 mt-4">
                                <div className="flex items-center gap-2 font-light text-[12px]">PLATFORM</div>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <PanelTop className="w-4 h-4" />
                                    </TooltipTrigger>
                                    <TooltipContent className="text-sm">Web</TooltipContent>
                                </Tooltip>
                            </div>
                            <div className="flex justify-between gap-2 mt-2">
                                <div className="flex items-center gap-2 font-light text-[12px]">DEVELOPED BY</div>
                                <div className="text-[12px]">Cifarm</div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Description Section */}
            <div className="mt-8">
                <h2 className="text-xl font-bold mb-4 text-foreground">Description</h2>
                <Card className="p-6">
                    <p className="text-muted-foreground">
                    CiFarm is a social farming game where players can farm, steal, and earn rewards. It features a unique business model designed to create long-term value and high user engagement across game seasons.
                    </p>
                </Card>
            </div>
        </div>
        
    )
}
