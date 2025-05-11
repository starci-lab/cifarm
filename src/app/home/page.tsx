"use client"
import React, { FC } from "react"
import { Card, ExtendedButton, Header, Image, Spacer } from "@/components"
import { useRouterWithSearchParams } from "@/hooks"
import { pathConstants } from "@/constants"
import { MainVisual } from "./MainVisual"
import { Share2Icon } from "lucide-react"

const Page: FC = () => {
    const router = useRouterWithSearchParams()
    return (
        <div>
            <Header title="Home" />
            <Spacer y={6}/>
            <div className="flex gap-4 items-center">   
                <Image src="https://cifarm.sgp1.cdn.digitaloceanspaces.com/logo.png" alt="logo" className="w-20 h-20 rounded-lg" />
                <div>
                    <div className="text-4xl font-bold text-text-default">CiFarm</div>
                    <div className="text-text-secondary">Cuong Dep Trai</div>
                </div>
            </div>
            <Spacer y={6} />
            <div className="flex flex-col md:flex-row md:gap-4">
                <div className="w-full md:flex-1">
                    <MainVisual isBlur={true} />
                </div>

                <div className="flex flex-col gap-3 mt-4 md:mt-0 md:w-[200px]">
                    <ExtendedButton
                        size="xl"
                        variant={"gradient"}
                        className="w-full md:w-[200px]"
                        onClick={() => {
                            router.push(pathConstants.play)
                        }}
                    >
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

export default Page
