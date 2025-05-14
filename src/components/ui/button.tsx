import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
    "inline-flex items-center text-base justify-center gap-2 whitespace-nowrap rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
    {
        variants: {
            variant: {
                default:
          "bg-primary hover:bg-primary/75 text-background transition-colors duration-200",
                gradient:
          "bg-gradient-button hover:bg-gradient-button/75",
                highlight:
          "bg-button-highlight hover:bg-button-highlight/75 text-text",
                destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
                outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
                secondary:
          "bg-content-2 hover:bg-content-3 text-secondary",
                ghost: "hover:bg-accent hover:text-accent-foreground",
                "ghost-secondary": "hover:bg-accent/40 hover:text-accent-foreground",
                link: "text-primary underline-offset-4 hover:underline",
                icon: "rounded-full hover:bg-accent/20 flex",
                "gradient-secondary": "bg-gradient-secondary hover:bg-gradient-secondary-hover text-background transition-colors duration-200",
            },
            size: {
                default: "h-10 px-4 py-2",
                lg: "h-12 rounded-md px-4 py-2",
                sm: "h-8 rounded-md px-3 text-xs",
                icon: "w-10 h-10 px-0",
                xl: "h-12 rounded-lg px-12 text-xl",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  removeClassName?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, removeClassName = false, ...props }, ref) => {
        const Comp = asChild ? Slot : "button"
        return (
            <Comp
                className={removeClassName ? className : cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            />
        )
    }
)
Button.displayName = "Button"

export { Button, buttonVariants }
