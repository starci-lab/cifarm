import React, { FC } from "react"
import { ScaledImage } from "@/components"

interface StateContainerProps {
    assetUrl: string
}

export const StateContainer: FC<StateContainerProps> = ({ assetUrl }) => {
    return (
        <div className="w-12 h-12 min-w-12 min-h-12 relative">
            <ScaledImage
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                src={assetUrl}
            />
        </div>
    )
}


