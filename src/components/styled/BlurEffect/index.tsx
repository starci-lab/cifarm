import React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const blurEffectVariants = cva(
    "absolute rounded-full -z-10",
    {
        variants: {
            variant: {
                primary: "bg-primary/80",
                secondary: "bg-secondary/80",
                accent: "bg-accent/80",
            },
            size: {
                sm: "w-48 h-24 blur-[50px]",
                md: "w-72 h-36 blur-[100px]",
                lg: "w-96 h-48 blur-[150px]",
            },
            position: {
                top: "-top-10 left-1/2 -translate-x-1/2",
                bottom: "bottom-0 left-1/2 -translate-x-1/2",
                center: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
            },
            animate: {
                none: "",
                zoom: "animate-blur-zoom",
            }
        },
        defaultVariants: {
            variant: "primary",
            size: "md",
            position: "top",
            animate: "none"
        }
    }
)

interface BlurEffectProps
    extends React.HTMLAttributes<HTMLDivElement>,
        VariantProps<typeof blurEffectVariants> {}

export function BlurEffect({
    className,
    variant,
    size,
    position,
    animate,
    ...props
}: BlurEffectProps) {
    return (
        <div
            className={cn(blurEffectVariants({ variant, size, position, animate }), className)}
            {...props}
        />
    )
} 