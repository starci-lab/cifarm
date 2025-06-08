import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
    "inline-flex items-center rounded-md px-2.5 py-0.5",
    {
        variants: {
            variant: {
                default:
          "bg-secondary/50 text-foreground",
                primary:
          "bg-primary/50 text-foreground",
                secondary:
          "bg-secondary/50 text-foreground",
                destructive:
          "bg-destructive/50 text-destructive",
                outline: "text-foreground",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
    return (
        <div className={cn(badgeVariants({ variant }), className)} {...props} />
    )
}

export { Badge, badgeVariants }
