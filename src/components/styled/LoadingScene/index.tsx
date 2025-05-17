import { BlurEffect, Container, Image } from "@/components"
import React, { FC } from "react"

export const LoadingScene: FC = () => {
    return (
        <Container centerContent>
            <BlurEffect />
            <BlurEffect position="center" />
            <Image
                src="/logo.png"
                className="w-40 h-40 rounded-full ring-2 ring-white"
            />
        </Container>
    )
}