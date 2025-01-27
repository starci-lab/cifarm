import React, { FC } from "react"
import { cn, Tooltip } from "@heroui/react"
import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline"
import { Size } from "@/modules/common"

interface QuestionTooltipProps {
    message: string
    size?: Size
}
export const QuestionTooltip : FC<QuestionTooltipProps> = ({ message, size }: QuestionTooltipProps) => {
    size = size || "md"
    const sizeMap: Record<Size, string> = {
        sm: "w-4 h-4",
        md: "w-[18px] h-[18px]",
        lg: "w-5 h-5",
        xl: "w-6 h-6",
    }
    return (
        <Tooltip content={message}>
            <QuestionMarkCircleIcon className={cn(sizeMap[size], "text-foreground-500")}/> 
        </Tooltip>
    )
}