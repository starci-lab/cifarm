import React, { FC } from "react"
import { cn } from "@/lib/utils"
import { ArrowSquareOut } from "@phosphor-icons/react"

export interface SelectionProps {
    title: string
    selected: boolean
    icon: React.ReactNode
    isExternal?: boolean
    onClick?: () => void
}

export const Selection: FC<SelectionProps> = ({ title, selected, icon, isExternal = false, onClick }) => {
    return (
        <button className={cn("px-3 py-2 rounded-lg", {
            "bg-content-2 text-secondary": selected,
            "hover:bg-content-2 hover:text-secondary text-muted-foreground": !selected,
        })} onClick={onClick}>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div>{icon}</div>
                    <div>{title}</div>
                </div>
                {isExternal && <ArrowSquareOut />}
            </div>
        </button>
    )
}