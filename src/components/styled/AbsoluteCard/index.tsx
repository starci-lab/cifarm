import { cn } from "@/lib/utils"
import React, { FC, PropsWithChildren } from "react"

interface AbsoluteCardProps extends PropsWithChildren {
  classNames: {
    container?: string;
    content?: string;
  };
}

export const AbsoluteCard: FC<AbsoluteCardProps> = ({
    children,
    classNames,
}) => {
    return (
        <div className={cn("relative", classNames.container)}>
            <div
                className={cn(
                    "relative",
                    "w-16 h-16",
                    classNames.content
                )}
            >
                {children}
            </div>
        </div>
    )
}