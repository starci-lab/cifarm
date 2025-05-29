import { BlurEffect, Container, Image } from "@/components"
import React, { FC } from "react"

export interface LoadingSceneProps {
    title?: string
}

export const LoadingScene: FC<LoadingSceneProps> = ({ title }) => {
    return (
        <Container centerContent>
            <BlurEffect />
            <BlurEffect position="center" />
            <div className="flex flex-col items-center justify-center gap-4">
                <Image
                    src="/logo.png"
                    className="w-40 h-40 rounded-full ring-2 ring-white"
                />
                {
                    title && (
                        <div className="text-2xl font-bold">
                            {title}
                        </div>
                    )
                }
            </div>
        </Container>
    )
}