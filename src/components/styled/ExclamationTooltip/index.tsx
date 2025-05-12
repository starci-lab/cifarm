import React, { FC } from "react"
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { CircleAlertIcon } from "lucide-react"
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
                <CircleAlertIcon
                    className={cn("w-[18px] h-[18px] text-secondary", className, iconClassName)}
                />
            </TooltipTrigger>
            <TooltipContent>{message}</TooltipContent>
        </Tooltip>
    )
}
