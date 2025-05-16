import React, { FC } from "react"
import { cn } from "@/lib/utils"
import { cva } from "class-variance-authority"
import { Button, ButtonProps } from "@/components/ui"
import { Spinner } from "@/components"

export interface PressableCardProps extends ButtonProps {
  showBorder?: boolean;
  classNames?: {
    base?: string;
  }
  isLoading?: boolean;
  className?: string;
  color?: "default" | "gradient" | "destructive" | "secondary" | "ghost" | "link" | "highlight" | "primary" | "gradient-secondary";
  hoverAnimated?: boolean;
}

const pressableCardVariants = cva("rounded-lg p-3", {
    variants: {
        color: {
            default: "bg-content-2 hover:bg-content-3/60 transition-colors duration-200",
            gradient: "bg-gradient-to-r from-card-1 to-card-2 hover:bg-gradient-to-r hover:from-card-1/90 hover:to-card-2/90",
            destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
            secondary: "bg-content2/50 text-foreground hover:bg-content2/25",
            ghost: "hover:bg-accent hover:text-accent-foreground",
            link: "text-primary underline-offset-4 hover:underline",
            highlight: "bg-gradient-to-r from-card-1 to-card-2 hover:bg-gradient-to-r hover:from-card-1/90 hover:to-card-2/90",
            primary: "bg-primary hover:bg-primary/75 text-background",
            "gradient-secondary": "bg-gradient-secondary hover:bg-gradient-secondary-hover text-background"
        },
        hoverAnimated: {
            true: "hover:-translate-y-2 transition-transform duration-500",
        },
    },
    defaultVariants: {
        color: "default",
        hoverAnimated: false,
    },
})

export const PressableCard: FC<PressableCardProps> = ({
    children,
    onClick,
    classNames = {},
    className,
    isLoading,
    color = "default",
    hoverAnimated = false,
    ...props
}: PressableCardProps) => {
    const { base } = classNames
    return (
        <Button
            size="default"
            onClick={onClick}
            removeClassName
            className={cn(
                pressableCardVariants({ color, hoverAnimated }),
                "text-start justify-start w-full hover:text-inherit",
                "whitespace-normal h-fit", 
                base, 
                className
            )}
            {...props}
            disabled={isLoading || props.disabled}
        >
            <div className="flex items-center gap-2 w-full">
                {isLoading && <Spinner />}
                {children}
            </div>
        </Button>
    )
}
