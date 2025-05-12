"use client"

import { useRouter } from "next/navigation"
import { Trophy, Users, LucideIcon } from "lucide-react"
import React from "react"
import { AnnouncementBanner } from "./AnnouncementBanner"
import { FeatureItem } from "./FeatureItem"
import { PulsatingActionButton } from "./PulsatingActionButton"
import { FeaturedImage } from "./FeaturedImage"
import { Image, Separator, Spacer, WrappedAnimation } from "@/components"
import { assetProductMap } from "@/modules/assets"
import { ProductId } from "@/modules/entities"

interface HeroProps {
    announcementText?: string
    primaryText?: string
    secondaryText?: string
    description?: string
    imageSrc?: string
    imageAlt?: string
    buttonText?: string
    features?: Array<{
        icon: LucideIcon
        title: string
        description: string
    }>
}

export const Hero = ({
    announcementText = "New Season Starting Soon",
    description = "CiFarm is a social farming game where players can farm, steal, and earn rewards. It features a unique business model designed to create long-term value and high user engagement across game seasons.",
    imageSrc = "https://static.vecteezy.com/system/resources/previews/008/505/420/non_2x/island-summer-with-tree-palm-3d-illustration-png.png",
    imageAlt = "CiFarm game illustration",
    buttonText = "Play Now",
    features = [
        {
            icon: Trophy,
            title: "Seasonal Rewards",
            description: "Earn as you play"
        },
        {
            icon: Users,
            title: "Social Gaming",
            description: "Play with friends"
        }
    ]
}: HeroProps) => {
    const router = useRouter()

    return (
        <div>
            <div>
                <div className="flex flex-col items-center xl:flex-row gap-10 mt-10">
                    <div>
                        <WrappedAnimation type="fade" delay={0.1}>
                            <AnnouncementBanner text={announcementText} />
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
                                <div className="text-4xl text-foreground text-start">then sell them for <span className="text-secondary">crypto</span>
                                </div>
                            </div>
                        </WrappedAnimation>
                        <Spacer y={4}/>
                        <WrappedAnimation type="fade-slide" direction="up" delay={0.3}>
                            <div className="text-text-default text-base sm:text-lg md:text-xl max-w-xl text-left leading-relaxed">
                                {description}
                            </div>
                        </WrappedAnimation>
                        <Spacer y={4}/>
                        <WrappedAnimation type="fade-slide" direction="up" delay={0.4}>
                            <div className="flex flex-col sm:flex-row gap-4 items-start">
                                <PulsatingActionButton onClick={() => router.push("/home")}>
                                    {buttonText}
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
                                <FeaturedImage src={imageSrc} alt={imageAlt} />
                            </div>
                        </WrappedAnimation>
                    </div>
                </div>
            </div>
        </div>
    )
}
