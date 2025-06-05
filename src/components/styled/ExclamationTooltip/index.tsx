import React, { FC } from "react"
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { WarningCircle } from "@phosphor-icons/react"
import { cn } from "@/lib/utils"
interface ExclamationTooltipProps {
  message: string;
  className?: string;
  classNames?: {
    icon?: string;
  };
}

export const ExclamationTooltip: FC<ExclamationTooltipProps> = ({
    message,
    classNames,
    className,
}) => {
    const { icon: iconClassName } = classNames || {}
    return (
        <Tooltip>
            <TooltipTrigger>
                <WarningCircle
                    className={cn("w-4 h-4 text-muted-foreground", className, iconClassName)}
                />
            </TooltipTrigger>
            <TooltipContent>{message}</TooltipContent>
        </Tooltip>
    )
}
