"use client"

import React, { FC } from "react"
import { Container } from "../Container"
import { AnimalAge } from "@/modules/assets"
import { FruitId } from "@/modules/entities"
import { assetFruitMap } from "@/modules/assets"
import { Image, SpinePlayer } from "@/components"
import { assetAnimalMap } from "@/modules/assets"
import { AnimalId } from "@/modules/entities"

export const LoadingScreen: FC = () => {
    return (
        <Container>
            <div className="h-full w-full relative">
                <Image className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" src={assetFruitMap[FruitId.Apple].base.stages[4].assetUrl ?? ""} />
                <SpinePlayer 
                    jsonUrl={assetAnimalMap[AnimalId.Cow].base.ages[AnimalAge.Adult].spine?.json.assetUrl ?? ""}
                    atlasUrl={assetAnimalMap[AnimalId.Cow].base.ages[AnimalAge.Adult].spine?.atlas.assetUrl ?? ""}
                    animation="idle"
                    scale={0.5}
                    className="absolute bottom-[20%] left-[20%]"
                />
                <SpinePlayer 
                    jsonUrl={assetAnimalMap[AnimalId.Chicken].base.ages[AnimalAge.Adult].spine?.json.assetUrl ?? ""}
                    atlasUrl={assetAnimalMap[AnimalId.Chicken].base.ages[AnimalAge.Adult].spine?.atlas.assetUrl ?? ""}
                    animation="idle"
                    scale={0.5}
                    className="absolute bottom-[20%] right-[20%]"
                />
                <div className="text-2xl font-bold absolute bottom-[15%] left-1/2 -translate-x-1/2">Loading...</div>
            </div>
        </Container>
    )
}