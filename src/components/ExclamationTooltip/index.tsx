import React, { FC } from "react"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { ExclamationCircleIcon } from "@heroicons/react/24/outline"

interface ExclamationTooltipProps {
    message: string
    className?: string
}

export const ExclamationTooltip: FC<ExclamationTooltipProps> = ({ message, className }) => {
    return (
        <Tooltip>
            <TooltipTrigger>
                <ExclamationCircleIcon className={`w-5 h-5 text-primary ${className}`} />
            </TooltipTrigger>
            <TooltipContent>
                {message}
            </TooltipContent>
        </Tooltip>
    )
}