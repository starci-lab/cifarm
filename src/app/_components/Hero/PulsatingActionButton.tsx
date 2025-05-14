import { ExtendedButton } from "@/components"
import { GameController } from "@phosphor-icons/react"
import React, { useState } from "react"

interface PulsatingActionButtonProps {
    onClick: () => void
    children: React.ReactNode
}

export const PulsatingActionButton = ({ onClick, children }: PulsatingActionButtonProps) => {
    const [isHovering, setIsHovering] = useState(false)

    return (
        <ExtendedButton
            onClick={onClick}
            variant="default"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
        >
            <div className="flex items-center gap-2">
                {children}
                <GameController />
            </div>
        </ExtendedButton>
    )
} 