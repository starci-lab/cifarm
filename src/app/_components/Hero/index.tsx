"use client"

import { useRouter } from "next/navigation"
import React from "react"
import { AnnouncementBanner } from "./AnnouncementBanner"
import { FeatureItem, FeatureItemProps } from "./FeatureItem"
import { PulsatingActionButton } from "./PulsatingActionButton"
import { FeaturedImage } from "./FeaturedImage"
import { Image, Separator, Spacer, WrappedAnimation } from "@/components"
import { assetProductMap } from "@/modules/assets"
import { ProductId } from "@/modules/entities"
import { Trophy, Users } from "@phosphor-icons/react"

const features: Array<FeatureItemProps> = [
    {
        icon: <Trophy />,
        title: "Seasonal Rewards",
        description: "Earn as you play"
    },
    {
        icon: <Users />,
        title: "Social Gaming",
        description: "Play with friends"
    }
]

export const Hero = () => {
    const router = useRouter()

    return (
        <div>
            <div>
                <div className="flex flex-col items-center xl:flex-row gap-10 mt-10">
                    <div>
                        <WrappedAnimation type="fade" delay={0.1}>
                            <AnnouncementBanner text={"ACT 1: Golden Sprout Festival"}
                                link="https://docs.cifarm.xyz/docs/act/act-1"
                            />
                        </WrappedAnimation>
                        <Spacer y={4}/>
                        <WrappedAnimation type="fade-slide" direction="down" delay={0.3}>
                            <div className="flex flex-col gap-2">
                                <div className="flex gap-2 items-center">
                                    <div className="text-4xl text-foreground">Farm, Thief, Earn</div>
                                    <div className="flex gap-2">
                                        <Image src={assetProductMap[ProductId.Apple].base.assetUrl} className="h-auto w-10 h-10 rounded-full" />
                                        <Image src={assetProductMap[ProductId.Banana].base.assetUrl} className="h-auto w-10 h-10 rounded-full" />
                                    </div>
                                </div>
                                <div className="text-4xl text-foreground text-start">then sell them for <span className="text-primary">crypto</span>
                                </div>
                            </div>
                        </WrappedAnimation>
                        <Spacer y={4}/>
                        <WrappedAnimation type="fade-slide" direction="up" delay={0.3}>
                            <div className="text-text-default text-base sm:text-lg md:text-xl max-w-xl text-left leading-relaxed">
                            CiFarm is a social farming game where players can farm, steal, and earn rewards. It features a unique business model designed to create long-term value and high user engagement across game seasons.
                            </div>
                        </WrappedAnimation>
                        <Spacer y={4}/>
                        <WrappedAnimation type="fade-slide" direction="up" delay={0.4}>
                            <div className="flex flex-col sm:flex-row gap-4 items-start">
                                <PulsatingActionButton onClick={() => router.push("/home")}>
                                    Play now
                                </PulsatingActionButton>
                            </div>
                        </WrappedAnimation>
                        <WrappedAnimation type="fade-slide" direction="up" delay={0.5}>
                            <Separator variant="secondary" className="my-4" />
                            <div className="flex gap-4 self-center">
                                {features.map((feature, index) => (
                                    <FeatureItem
                                        key={index}
                                        icon={feature.icon}
                                        title={feature.title}
                                        description={feature.description}
                                    />
                                ))}
                            </div>
                        </WrappedAnimation>
                    </div>

                    <div className="flex-1">
                        <WrappedAnimation type="scale" delay={0.6}>
                            <div className="animate-float">
                                <FeaturedImage />
                            </div>
                        </WrappedAnimation>
                    </div>
                </div>
            </div>
        </div>
    )
}
