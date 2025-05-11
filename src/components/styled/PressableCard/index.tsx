import React, { FC } from "react"
import { ExtendedButton, ExtendedButtonProps } from "../ExtendedButton" 
import { cn } from "@/lib/utils"
import { cva } from "class-variance-authority"

export interface PressableCardProps extends ExtendedButtonProps {
  showBorder?: boolean;
  classNames?: {
    base?: string;
  }
  className?: string;
}

const pressableCardVariants = cva("rounded-lg p-3", {
    variants: {
        variant: {
            default: "bg-card hover:bg-card-hover",
            destructive:
        "bg-destructive text-destructive-foreground hover:bg-destructive/90",
            outline:
        "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
            secondary: "bg-content2/50 text-foreground hover:bg-content2/25",
            ghost: "hover:bg-accent hover:text-accent-foreground",
            "ghost-secondary": "hover:bg-accent/40 hover:text-accent-foreground",
            link: "text-primary underline-offset-4 hover:underline",
        },
    },
    defaultVariants: {
        variant: "default",
    },
})

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
            size="default"
            onClick={onClick}
            className={cn(
                pressableCardVariants({ variant: props.variant }),
                "text-start justify-start w-full hover:text-inherit",
                "whitespace-normal h-fit", 
                base, 
                !showBorder && "border-none border-0 shadow-none", 
                className
            )}
            {...props}
        >
            {children}
        </ExtendedButton>
    )
}
