import { Ripple } from "@/components"
import Image from "next/image"
import React from "react"

interface FeaturedImageProps {
    src: string
    alt: string
    width?: number
    height?: number
}

export const FeaturedImage = ({ src, alt, width = 600, height = 600 }: FeaturedImageProps) => (
    <div className="relative z-0 w-full h-full overflow-hidden min-h-[400px] lg:min-h-[600px] flex items-center justify-center">
        <Ripple mainCircleSize={12} mainCircleOpacity={0.3} numCircles={10} className="absolute inset-0" />
        <div className="relative w-full h-full max-w-xl mx-auto">
            <Image
                src={src}
                alt={alt}
                width={width}
                height={height}
                className="w-full h-auto object-cover rounded-lg"
                priority
            />
        </div>
    </div>
) 