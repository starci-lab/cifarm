import React, { FC } from "react"
import { ExclamationTooltip } from "../ExclamationTooltip"

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
        <div className="flex items-center gap-1 text-secondary leading-none text-lg">
            <div className="flex items-center gap-1">
                {icon}
                <div
                    className={
                        titleClassName
                    }
                >
                    {title}
                </div>
            </div>
            {tooltipString && <ExclamationTooltip message={tooltipString} className={tooltipClassName} />}
        </div>
    )
}
