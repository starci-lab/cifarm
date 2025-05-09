"use client"
import React, { FC } from "react"
import { ExtendedButton, Header, Image, Spacer } from "@/components"
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
                    <div className="text-4xl font-bold">CiFarm</div>
                    <div className="text-sm text-gray-500">Cuong Dep Trai</div>
                </div>
            </div>
            <Spacer y={6} />
            <div className="flex gap-4">
                <MainVisual />
                <div className="flex flex-col gap-2">
                    <ExtendedButton size="xl" className="w-[200px]" useGradientBg onClick={() => {
                        router.push(pathConstants.play)
                    }}>
                        Play
                    </ExtendedButton>
                    <ExtendedButton className="flex gap-2">
                        <Share2Icon className="w-4 h-4" />
                        <div>Share</div>
                    </ExtendedButton>
                </div>
            </div>
        </div>
    )
}

export default Page
