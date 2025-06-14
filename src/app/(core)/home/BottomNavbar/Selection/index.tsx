import { cn } from "@/lib/utils"
import React, { FC, ReactNode } from "react"

export interface SelectionProps {
    name: string
    icon: ReactNode
    onClick: () => void
    selected?: boolean
}

export const Selection: FC<SelectionProps> = ({ name, icon, onClick, selected = false }) => {
    return (
        <button onClick={onClick}>
            <div className={cn("flex flex-col gap-1 items-center rounded-lg p-2", {
                "text-secondary transition-all duration-200 bg-content-2": selected,
                "text-muted-foreground hover:text-secondary hover:bg-content-2 transition-all duration-200": !selected,
            })}>
                {icon}
                <div className="text-sm">{name}</div>
            </div>
        </button>
    )
}
