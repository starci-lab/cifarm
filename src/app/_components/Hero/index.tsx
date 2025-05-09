"use client"

import { useRouter } from "next/navigation"
import { Trophy, Users, LucideIcon } from "lucide-react"
import React from "react"
import { AnnouncementBanner } from "./AnnouncementBanner"
import { FeatureItem } from "./FeatureItem"
import { PulsatingActionButton } from "./PulsatingActionButton"
import { FeaturedImage } from "./FeaturedImage"
import { SplitTitle } from "./SplitTitle"
import { WrappedAnimation } from "@/components"

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
    primaryText = "Ci",
    secondaryText = "Farm",
    description = "CiFarm is a social farming game where players can farm, steal, and earn rewards. It features a unique business model designed to create long-term value and high user engagement across game seasons.",
    imageSrc = "/placeholder.svg?height=600&width=600",
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
        <div className="relative flex flex-col items-center justify-center min-h-[90vh] text-center overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-16 lg:py-12 h-full relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 h-full items-center">
                    <div className="space-y-6 md:space-y-8 z-10">
                        <WrappedAnimation type="fade" delay={0.1}>
                            <AnnouncementBanner text={announcementText} />
                        </WrappedAnimation>

                        <WrappedAnimation type="fade-slide" direction="up" delay={0.2}>
                            <SplitTitle primaryText={primaryText} secondaryText={secondaryText} />
                        </WrappedAnimation>

                        <WrappedAnimation type="fade-slide" direction="up" delay={0.3}>
                            <p className="text-gray-300 text-base sm:text-lg md:text-xl max-w-xl text-left leading-relaxed">
                                {description}
                            </p>
                        </WrappedAnimation>

                        <WrappedAnimation type="fade-slide" direction="up" delay={0.4}>
                            <div className="flex flex-col sm:flex-row gap-4 items-start">
                                <PulsatingActionButton onClick={() => router.push("/home")}>
                                    {buttonText}
                                </PulsatingActionButton>
                            </div>
                        </WrappedAnimation>

                        <WrappedAnimation type="fade-slide" direction="up" delay={0.5}>
                            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-primary-2 mt-8">
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

                    <WrappedAnimation type="scale" delay={0.6}>
                        <FeaturedImage src={imageSrc} alt={imageAlt} />
                    </WrappedAnimation>
                </div>
            </div>
        </div>
    )
}
