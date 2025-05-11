"use client"

import React from "react"
import { Spacer, SpinePlayer, WrappedAnimation, Image } from "@/components"
import { HighlightBanner } from "../HighlighBanner"
import { TrophyIcon } from "lucide-react"
import { AnimalAge, assetAnimalMap, assetFruitMap } from "@/modules/assets"
import { AnimalId, FruitId } from "@/modules/entities"

export const Intro = () => {
    return (
        <div>
            <div className="grid grid-cols-2 gap-12">
                <div className="relative">
                    <Image className="absolute bottom-0 left-1/2 w-2/5 -translate-x-1/2" src={assetFruitMap[FruitId.Apple].base.stages[4].assetUrl ?? ""} />
                    <SpinePlayer 
                        jsonUrl={assetAnimalMap[AnimalId.Cow].base.ages[AnimalAge.Adult].spine?.json.assetUrl ?? ""}
                        atlasUrl={assetAnimalMap[AnimalId.Cow].base.ages[AnimalAge.Adult].spine?.atlas.assetUrl ?? ""}
                        animation="idle"
                        scale={0.5}
                        className="absolute w-2/5 bottom-0 left-[10%]"
                    />
                    <SpinePlayer 
                        jsonUrl={assetAnimalMap[AnimalId.Chicken].base.ages[AnimalAge.Adult].spine?.json.assetUrl ?? ""}
                        atlasUrl={assetAnimalMap[AnimalId.Chicken].base.ages[AnimalAge.Adult].spine?.atlas.assetUrl ?? ""}
                        animation="idle"
                        scale={0.5}
                        className="absolute w-2/5 bottom-0 right-[10%]"
                    />
                </div>
                <div>
                    <div className="text-3xl text-text-contrast">
            New concepts for MMOs
                    </div>
                    <Spacer y={4}/>
                    <WrappedAnimation type="fade-slide" direction="up" delay={0.3}>
                        <div className="text-text-default text-base sm:text-lg md:text-xl max-w-xl text-left leading-relaxed">
                        CiFarm is a social MMO game where players can farm, steal, and earn rewards. It features a unique business model designed to create long-term value and high user engagement across game seasons.
                        </div>
                    </WrappedAnimation>
                    <Spacer y={4}/>
                    <div className="flex gap-2">
                        <div className="flex gap-2 flex-col">
                            <HighlightBanner text="Competitive gameplay mechanics" icon={<TrophyIcon className="w-5 h-5"/>} />
                            <HighlightBanner text="Unique business model" icon={<TrophyIcon className="w-5 h-5"/>} />
                            <HighlightBanner text="Massive social features" icon={<TrophyIcon className="w-5 h-5"/>} />
                        </div>
                        <div className="flex gap-2 flex-col" >
                            <HighlightBanner text="Signature Art Style & Animation" icon={<TrophyIcon className="w-5 h-5"/>} />
                            <HighlightBanner text="Seasonal rewards" icon={<TrophyIcon className="w-5 h-5"/>} />
                            <HighlightBanner text="The best farming game" icon={<TrophyIcon className="w-5 h-5"/>} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
