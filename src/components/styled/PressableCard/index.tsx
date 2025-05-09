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
            variant="default"
            size="icon"
            onClick={onClick}
            className={cn("text-start justify-start w-full p-3 hover:text-inherit","whitespace-normal rounded-lg border-none h-fit", base, !showBorder && "border-none border-0 shadow-none", className)}
            {...props}
        >
            {children}
        </ExtendedButton>
    )
}
