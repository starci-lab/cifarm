import { LineShadowText } from "@/components"
import React from "react"

interface SplitTitleProps {
    primaryText: string
    secondaryText: string
    shadowColor?: string
}

export const SplitTitle = ({ primaryText, secondaryText, shadowColor = "#FFFF2E" }: SplitTitleProps) => (
    <h1 className="text-balance text-5xl sm:text-6xl font-bold leading-none tracking-tighter md:text-7xl lg:text-8xl text-left">
        <span className="text-primary-2">{primaryText}</span>
        <LineShadowText className="italic" shadowColor={shadowColor}>
            {secondaryText}
        </LineShadowText>
    </h1>
) 