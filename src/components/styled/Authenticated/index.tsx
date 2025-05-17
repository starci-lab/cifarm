import { BlurEffect, Container, ScaledImage } from "@/components"
import React, { FC } from "react"

export const AuthenticatedScene: FC = () => {
    return (
        <Container centerContent>
            <BlurEffect />
            <BlurEffect position="center" />
            <div className="flex flex-col items-center justify-center">
                <ScaledImage
                    src="https://cifarm.sgp1.cdn.digitaloceanspaces.com/stacy/loading.png"
                />
                <div className="text-2xl text-secondary">Authenticated. Redirecting...</div>
            </div>
        </Container>
    )
}