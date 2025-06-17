"use client"

import * as React from "react"
import * as SeparatorPrimitive from "@radix-ui/react-separator"

import { cn } from "@/utils"
import { cva } from "class-variance-authority"

const separatorVariants = cva("shrink-0", {
    variants: {
        variant: {
            primary: "bg-border",
            secondary: "bg-muted-foreground/10",
        },
    },
    defaultVariants: {
        variant: "primary",
    },
})


const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root> & { variant?: "primary" | "secondary" }
>(
    (
        { className, orientation = "horizontal", decorative = true, variant = "primary", ...props },
        ref
    ) => (
        <SeparatorPrimitive.Root
            ref={ref}
            decorative={decorative}
            orientation={orientation}
            className={cn(
                separatorVariants({ variant }),
                orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
                className
            )}
            {...props}
        />
    )
)
Separator.displayName = SeparatorPrimitive.Root.displayName

export { Separator }
