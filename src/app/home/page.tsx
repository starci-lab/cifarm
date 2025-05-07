"use client"
import React, { FC } from "react"
import { ExtendedButton, Header, Image, Spacer } from "@/components"

const Page: FC = () => {
    return (
        <div>
            <Header title="Home" />
            <Spacer y={6}/>
            <Image src="/background.png" alt="Home" className="w-full rounded-lg" />
            <Spacer y={4}/>
            <div className="flex items-center gap-2">
                <ExtendedButton>
                                    Play Now
                </ExtendedButton>
                <div className="text-sm text-muted-foreground">
                                    5 playings
                </div>
            </div>
        </div>
    )
}

export default Page
