import { BlurEffect, Container, Image, Spacer } from "@/components"
import React, { FC } from "react"

export enum SubSceneType {
    Authenticated,
    Unauthenticated,
    NotFound404,
}
export interface SubSceneProps {
    type?: SubSceneType
}
export const SubScene: FC<SubSceneProps> = ({
    type = SubSceneType.Authenticated,
}) => {
    const imageMap = {
        [SubSceneType.Authenticated]: "https://cifarm.sgp1.cdn.digitaloceanspaces.com/stacy/authenticated.png",
        [SubSceneType.Unauthenticated]: "https://cifarm.sgp1.cdn.digitaloceanspaces.com/stacy/unauthenticated.png",
        [SubSceneType.NotFound404]: "https://cifarm.sgp1.cdn.digitaloceanspaces.com/stacy/not-found-404.png",
    }
    const textMap = {
        [SubSceneType.Authenticated]: "Authenticated. Redirecting...",
        [SubSceneType.Unauthenticated]: "Unauthenticated. Redirecting...",
        [SubSceneType.NotFound404]: "Page not found.",
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