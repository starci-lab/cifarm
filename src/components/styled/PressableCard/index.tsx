import React, { FC, PropsWithChildren } from "react"
import { Button } from "../../ui/button"
import { cn } from "@/lib/utils"

export interface PressableCardProps extends PropsWithChildren {
  onClick?: () => void;
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
}: PressableCardProps) => {
    const { base } = classNames
    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={onClick}
            className={cn("justify-start w-full p-3","whitespace-normal rounded-xl border bg-card text-card-foreground shadow h-fit", base, !showBorder && "border-none border-0 shadow-none", className)}
        >
            {children}
        </Button>
    )
}
