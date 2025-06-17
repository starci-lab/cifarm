import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/utils"

const buttonVariants = cva(
    "inline-flex items-center justify-center text-base gap-2 whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
    {
        variants: {
            color: {
                default: "bg-content-2 hover:bg-content-3 text-foreground",
                primary: "bg-primary hover:bg-primary/75 light text-background",
                secondary: "bg-secondary hover:bg-secondary/75 text-background",
                destructive: "bg-destructive hover:bg-destructive/90 text-destructive-foreground",
                highlight: "bg-button-highlight hover:bg-button-highlight/75 text-text",
                ghost: "hover:bg-secondary/50 text-foreground",
                link: "text-primary hover:underline underline-offset-4",
                gradient: "bg-gradient-button hover:bg-gradient-button/75 text-background",
                "gradient-secondary": "bg-gradient-secondary hover:bg-gradient-secondary-hover text-background",
            },
            variant: {
                solid: "rounded-lg",
                outline: "border border-input rounded-lg bg-background",
                ghost: "rounded-lg bg-transparent",
                icon: "flex rounded-lg",
                pill: "rounded-full",
                flat: "rounded-lg", // no border, no bg
            },
            size: {
                default: "h-10 px-4 py-2",
                sm: "h-8 px-3 text-sm",
                lg: "h-12 px-6 text-base",
                xl: "h-14 px-8 text-lg",
                icon: "h-10 w-10 p-0 min-w-10 min-h-10",
            },
        },
        defaultVariants: {
            color: "primary",
            variant: "solid",
            size: "default",
        },
        compoundVariants: [
            {
                variant: "flat",
                color: "primary",
                className: "text-primary bg-content-2 hover:bg-content-3",
            },
            {
                variant: "flat",
                color: "secondary",
                className: "text-secondary bg-content-2 hover:bg-content-3",
            },
            {
                variant: "flat",
                color: "destructive",
                className: "text-destructive bg-content-2 hover:bg-content-3",
            },
            {
                variant: "flat",
                color: "default",
                className: "text-foreground bg-content-2 hover:bg-content-3",
            },
            {
                variant: "flat",
                color: "highlight",
                className: "text-text bg-content-2 hover:bg-content-3",
            },
        ],  
    }
)
  

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  removeClassName?: boolean,
  color?: "default" | "primary" | "secondary" | "destructive" | "highlight" | "ghost" | "link" | "gradient" | "gradient-secondary"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, color, asChild = false, removeClassName = false, ...props }, ref) => {
        const Comp = asChild ? Slot : "button"
        return (
            <Comp
                className={removeClassName ? className : cn(buttonVariants({ size, color, variant, className }))}
                ref={ref}
                {...props}
            />
        )
    }
)
Button.displayName = "Button"

export { Button, buttonVariants }
