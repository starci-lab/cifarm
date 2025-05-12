import { ExtendedButton } from "@/components"
import { Gamepad2 } from "lucide-react"
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
            variant={"gradient"}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
        >
            <div className="flex items-center gap-2">
                {children}
                <Gamepad2 className={`w-5 h-5 transition-transform ${isHovering ? "translate-x-1" : ""}`} />
            </div>
        </ExtendedButton>
    )
} 