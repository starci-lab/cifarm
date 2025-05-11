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
                    <div className="text-4xl font-bold text-text-default">CiFarm</div>
                    <div className="text-sm text-text-secondary">Cuong Dep Trai</div>
                </div>
            </div>
            <Spacer y={6} />
            <div className="flex gap-4">
                <MainVisual />
                <div className="flex flex-col gap-2">
                    <ExtendedButton size="xl" variant={"gradient"} className="w-[200px]" onClick={() => {
                        router.push(pathConstants.play)
                    }}>
                        Play
                    </ExtendedButton>
                    <ExtendedButton className="flex gap-2">
                        <Share2Icon className="w-4 h-4" />
                        Share
                    </ExtendedButton>
                </div>
            </div>
        </div>
    )
}

export default Page
