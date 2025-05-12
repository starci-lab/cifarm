import { Card } from "@/components"
import { ExtendedButton } from "@/components"
import React, { FC } from "react"
import { MainVisual } from "../MainVisual"
import { pathConstants } from "@/constants"
import { PlayIcon, Share2Icon } from "lucide-react"
import { useRouterWithSearchParams } from "@/hooks"

export const OverviewTab: FC = () => {
    const router = useRouterWithSearchParams()
    return (
        <div>
            <div className="flex flex-col md:flex-row md:gap-4">
                <div className="w-full md:flex-1">
                    <MainVisual />
                </div>

                <div className="flex flex-col gap-3 mt-4 md:mt-0 md:w-[200px]">
                    <ExtendedButton
                        variant={"gradient"}
                        className="flex justify-center md:justify-start gap-2 w-full md:w-auto"
                        size="lg"
                        onClick={() => {
                            router.push(pathConstants.play)
                        }}
                    >
                        <PlayIcon className="w-4 h-4" />
                        Play
                    </ExtendedButton>

                    <ExtendedButton className="flex justify-center md:justify-start gap-2 w-full md:w-auto">
                        <Share2Icon className="w-4 h-4" />
                        Share
                    </ExtendedButton>
                </div>
            </div>

            {/* Description Section */}
            <div className="mt-8">
                <h2 className="text-2xl font-bold mb-4 text-text-secondary">Description</h2>
                <Card className="p-6">
                    <p className="text-text-secondary">
                    CiFarm is a social farming game where players can farm, steal, and earn rewards. It features a unique business model designed to create long-term value and high user engagement across game seasons.
                    </p>
                </Card>
            </div>
        </div>
        
    )
}
