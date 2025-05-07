import { IconSelection, Image } from "@/components"
import React, { FC } from "react"

export const SuiConnect: FC = () => {
    return (
        <IconSelection
            icon={<Image src="/sui.svg" alt="Sui" className="w-10 h-10" />}
            onClick={() => {}}
            text="Sui"
            description="Not connected"
        />
    )
}
