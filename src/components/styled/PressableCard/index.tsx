import React, { FC } from "react"
import { cn } from "@/lib/utils"
import { cva } from "class-variance-authority"
import { Button } from "@/components/ui"
import { ButtonProps } from "react-day-picker"
import { Spinner } from "@/components"

export interface PressableCardProps extends ButtonProps {
  showBorder?: boolean;
  classNames?: {
    base?: string;
  }
  isLoading?: boolean;
  className?: string;
  variant?: "default" | "gradient" | "destructive" | "outline" | "secondary" | "ghost" | "ghost-secondary" | "link" | "icon" | "highlight";
}

const pressableCardVariants = cva("rounded-lg p-3", {
    variants: {
        variant: {
            default: "bg-content-2 hover:bg-content-3 transition-colors duration-200",
            gradient: "bg-gradient-to-r from-card-1 to-card-2 hover:bg-gradient-to-r hover:from-card-1/90 hover:to-card-2/90",
            destructive:
        "bg-destructive text-destructive-foreground hover:bg-destructive/90",
            outline:
        "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
            secondary: "bg-content2/50 text-foreground hover:bg-content2/25",
            ghost: "hover:bg-accent hover:text-accent-foreground",
            "ghost-secondary": "hover:bg-accent/40 hover:text-accent-foreground",
            link: "text-primary underline-offset-4 hover:underline",
            icon: "rounded-full hover:bg-accent/20",
            highlight: "bg-gradient-to-r from-card-1 to-card-2 hover:bg-gradient-to-r hover:from-card-1/90 hover:to-card-2/90",
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
    className,
    isLoading,
    variant = "default",
    ...props
}: PressableCardProps) => {
    const { base } = classNames
    return (
        <Button
            size="default"
            onClick={onClick}
            removeClassName
            className={cn(
                pressableCardVariants({ variant }),
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
