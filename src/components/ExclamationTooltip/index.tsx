import React, { FC } from "react"
import { cn, Tooltip } from "@heroui/react"
import { ExclamationCircleIcon } from "@heroicons/react/24/outline"

interface ExclamationTooltipProps {
    message: string
    className?: string
}
export const ExclamationTooltip : FC<ExclamationTooltipProps> = ({ message, className }: ExclamationTooltipProps) => {
    return (
        <Tooltip content={message}>
            <ExclamationCircleIcon className={cn("w-5 h-5", className, "text-primary")}/> 
        </Tooltip>
    )
}