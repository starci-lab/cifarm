import React, { FC } from "react"
import { cn } from "@/lib/utils"
import { ExternalLinkIcon } from "lucide-react"
export interface SelectionProps {
    title: string
    selected: boolean
    icon: React.ReactNode
    isExternal?: boolean
}

export const Selection: FC<SelectionProps> = ({ title, selected, icon, isExternal = false }) => {
    return (
        <div className={cn("px-3 py-2 rounded-full hover:bg-sidebar-foreground/50", {
            "bg-sidebar-foreground/50": selected,
            "hover:bg-sidebar-foreground/50": !selected
        })}>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className={cn({
                        "text-sidebar-primary-foreground": selected
                    })}>{icon}</div>
                    <div className={cn({
                        "text-sidebar-primary-foreground": selected
                    })}>{title}</div>
                </div>
                {isExternal && <ExternalLinkIcon className="w-3.5 h-3.5" />}
            </div>
        </div>
    )
}