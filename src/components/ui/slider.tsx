"use client"

import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"
import { cn } from "@/lib/utils"
import { cva, VariantProps } from "class-variance-authority"

// Track background
const sliderVariants = cva("relative h-2.5 my-1.5 w-full grow overflow-hidden rounded-full", {
    variants: {
        color: {
            default: "bg-foreground/20",
            primary: "bg-primary/30",
            secondary: "bg-secondary/30",
        },
    },
    defaultVariants: {
        color: "default",
    },
})

// Range foreground
const rangeVariants = cva("absolute h-full", {
    variants: {
        color: {
            default: "bg-foreground",
            primary: "bg-primary",
            secondary: "bg-secondary",
        },
    },
    defaultVariants: {
        color: "default",
    },
})

// Thumb color
const thumbVariants = cva(
    "block h-5 w-5 rounded-full border shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
    {
        variants: {
            color: {
                default: "ring-2 bg-background ring-foreground",
                primary: "ring-2 bg-primary ring-primary/60",
                secondary: "ring-2 bg-secondary ring-secondary/60",
            },
        },
        defaultVariants: {
            color: "default",
        },
    }
)

export interface SliderProps
  extends React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>,
    VariantProps<typeof sliderVariants> {
    color?: "default" | "primary" | "secondary"
}

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  SliderProps
>(({ className, color = "default", ...props }, ref) => (
    <SliderPrimitive.Root
        ref={ref}
        className={cn("relative flex w-full touch-none select-none items-center", className)}
        {...props}
    >
        <SliderPrimitive.Track className={sliderVariants({ color })}>
            <SliderPrimitive.Range className={rangeVariants({ color })} />
        </SliderPrimitive.Track>
        <SliderPrimitive.Thumb className={thumbVariants({ color })} />
    </SliderPrimitive.Root>
))
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
