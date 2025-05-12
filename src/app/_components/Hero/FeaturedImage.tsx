import React from "react"
import { BlurEffect, Image } from "@/components"


export const FeaturedImage = () => (
    <div className="relative z-0 w-full h-full min-h-[400px] lg:min-h-[600px] flex items-center justify-center">
        <BlurEffect variant="secondary" size="lg" position="center" />
        <div className="relative w-full h-full mx-auto">
            <Image
                src={"https://cifarm.sgp1.cdn.digitaloceanspaces.com/float_map.png"}
                alt={"CiFarm game illustration"}
                className="w-full h-auto object-cover rounded-lg"
            />
        </div>
    </div>
) 