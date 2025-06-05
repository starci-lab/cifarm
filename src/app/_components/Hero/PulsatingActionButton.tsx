import { ExtendedButton } from "@/components"
import { Plant } from "@phosphor-icons/react"
import React, { useState } from "react"

interface PulsatingActionButtonProps {
    onClick: () => void
    children: React.ReactNode
}

export const PulsatingActionButton = ({ onClick, children }: PulsatingActionButtonProps) => {
    const [, setIsHovering] = useState(false)

    return (
        <ExtendedButton
            onClick={onClick}
            color="primary"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
        >
            <div className="flex items-center gap-2">
                {children}
                <Plant />
            </div>
        </ExtendedButton>
    )
} 