"use client"

import React from "react"
import { Spacer, SpinePlayer, WrappedAnimation, Image } from "@/components"
import { HighlightBanner } from "../HighlighBanner"
import { AnimalAge, assetAnimalMap, assetFruitMap } from "@/modules/assets"
import { AnimalId, FruitId } from "@/modules/entities"
import { Trophy } from "@phosphor-icons/react"

export const Intro = () => {
    return (
        <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                <div className="relative min-h-[400px]">
                    <WrappedAnimation type="fade" delay={0.2}>
                        <Image className="absolute bottom-0 left-1/2 w-2/5 -translate-x-1/2" src={assetFruitMap[FruitId.Apple].base.stages[4].assetUrl ?? ""} />
                    </WrappedAnimation>
                    <WrappedAnimation type="fade" delay={0.3}>
                        <SpinePlayer 
                            jsonUrl={assetAnimalMap[AnimalId.Cow].base.ages[AnimalAge.Adult].spine?.json.assetUrl ?? ""}
                            atlasUrl={assetAnimalMap[AnimalId.Cow].base.ages[AnimalAge.Adult].spine?.atlas.assetUrl ?? ""}
                            animation="idle"
                            scale={0.5}
                            className="absolute w-2/5 bottom-0 left-[10%]"
                        />
                    </WrappedAnimation>
                    <WrappedAnimation type="fade" delay={0.3}>
                        <SpinePlayer 
                            jsonUrl={assetAnimalMap[AnimalId.Chicken].base.ages[AnimalAge.Adult].spine?.json.assetUrl ?? ""}
                            atlasUrl={assetAnimalMap[AnimalId.Chicken].base.ages[AnimalAge.Adult].spine?.atlas.assetUrl ?? ""}
                            animation="idle"
                            scale={0.5}
                            className="absolute w-2/5 bottom-0 right-[10%]"
                        />
                    </WrappedAnimation>
                </div>
                <div className="flex flex-col justify-center">
                    <WrappedAnimation type="fade-slide" direction="down" delay={0.4}>
                        <div className="text-3xl text-foreground font-bold">
                            New concepts for MMO
                        </div>
                    </WrappedAnimation>
                    <Spacer y={4}/>
                    <WrappedAnimation type="fade-slide" direction="up" delay={0.5}>
                        <div className="text-text-default text-base sm:text-lg md:text-xl max-w-xl text-left leading-relaxed">
                            CiFarm is a social MMO game where players can farm, steal, and earn rewards. It features a unique business model designed to create long-term value and high user engagement across game seasons.
                        </div>
                    </WrappedAnimation>
                    <Spacer y={4}/>
                    <WrappedAnimation type="fade-slide" direction="up" delay={0.6}>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="flex flex-col gap-2">
                                <HighlightBanner text="Competitive gameplay mechanics" icon={<Trophy />} />
                                <HighlightBanner text="Unique business model" icon={<Trophy />} />
                                <HighlightBanner text="Massive social features" icon={<Trophy />} />
                            </div>
                            <div className="flex flex-col gap-2">
                                <HighlightBanner text="Signature Art Style & Animation" icon={<Trophy />} />
                                <HighlightBanner text="Seasonal rewards" icon={<Trophy />} />
                                <HighlightBanner text="The best farming game" icon={<Trophy />} />
                            </div>
                        </div>
                    </WrappedAnimation>
                </div>
            </div>
        </div>
    )
}
