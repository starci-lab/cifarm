import React, { FC } from "react"
import { ExtendedButton, ExtendedButtonProps } from "../ExtendedButton" 
import { cn } from "@/lib/utils"

export interface PressableCardProps extends ExtendedButtonProps {
  showBorder?: boolean;
  classNames?: {
    base?: string;
  }
  className?: string;
}

export const PressableCard: FC<PressableCardProps> = ({
    children,
    onClick,
    classNames = {},
    showBorder = true,
    className,
    ...props
}: PressableCardProps) => {
    const { base } = classNames
    return (
        <ExtendedButton
            variant="ghost"
            size="icon"
            onClick={onClick}
            className={cn("text-start justify-start w-full p-3 hover:bg-content1/75 hover:text-inherit","whitespace-normal rounded-lg border-none bg-content1 h-fit", base, !showBorder && "border-none border-0 shadow-none", className)}
            {...props}
        >
            <div className="w-full">
                {children}
            </div>
        </ExtendedButton>
    )
}
