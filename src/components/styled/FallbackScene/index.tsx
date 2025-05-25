import { BlurEffect, Container, Image, Spacer } from "@/components"
import React, { FC } from "react"

export enum FallbackSceneType {
    Authenticated,
    Unauthenticated,
    NotFound404,
    Authenticating,

}
export interface FallbackSceneProps {
    type?: FallbackSceneType
}
export const FallbackScene: FC<FallbackSceneProps> = ({
    type = FallbackSceneType.Authenticated,
}) => {
    const imageMap = {
        [FallbackSceneType.Authenticated]: "https://cifarm.sgp1.cdn.digitaloceanspaces.com/stacy/authenticated.png",
        [FallbackSceneType.Unauthenticated]: "https://cifarm.sgp1.cdn.digitaloceanspaces.com/stacy/unauthenticated.png",
        [FallbackSceneType.NotFound404]: "https://cifarm.sgp1.cdn.digitaloceanspaces.com/stacy/not-found-404.png",
        [FallbackSceneType.Authenticating]: "https://cifarm.sgp1.cdn.digitaloceanspaces.com/stacy/authenticating.png",
    }
    const textMap = {
        [FallbackSceneType.Authenticated]: "Authenticated. Redirecting...",
        [FallbackSceneType.Unauthenticated]: "Unauthenticated. Redirecting...",
        [FallbackSceneType.NotFound404]: "Page not found.",
        [FallbackSceneType.Authenticating]: "Authenticating. Please wait...",
    }
    return (
        <Container centerContent>
            <BlurEffect />
            <BlurEffect position="center" />
            <div className="flex flex-col items-center justify-center">
                <Image
                    className="w-80 aspect-square object-contain "
                    src={
                        imageMap[type]
                    }
                    alt={ imageMap[type] }
                />
                <Spacer y={4}/>
                <div className="text-2xl">{
                    textMap[type]
                }</div>
            </div>
        </Container>
    )
}