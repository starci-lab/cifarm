import React, { FC } from "react"
import { ExclamationTooltip } from "../ExclamationTooltip"
import { cn } from "@/lib/utils"

export interface TitleProps {
  title: string;
  tooltipString?: string;
  icon?: React.ReactNode;
  classNames?: {
    title?: string;
    tooltip?: string;
  };
}

export const Title: FC<TitleProps> = ({
    title,
    tooltipString,
    icon,
    classNames = {},
}: TitleProps) => {
    const {
        title: titleClassName,
        tooltip: tooltipClassName,
    } = classNames
    return (
        <div className="flex items-center gap-2 text-secondary">
            <div className="flex items-center gap-1">
                {icon}
                <div
                    className={cn(
                        titleClassName
                    )}
                >
                    {title}
                </div>
            </div>
            {tooltipString && <ExclamationTooltip message={tooltipString} className={tooltipClassName} />}
        </div>
    )
}
