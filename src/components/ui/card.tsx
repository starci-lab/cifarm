import * as React from "react"

import { cn } from "@/lib/utils"
import { cva } from "class-variance-authority"
import { Separator } from "./separator"

const cardVariants = cva("transition-transform duration-200 dark:border-none", {
    variants: {
        variant: {
            default: "rounded-lg",
            flat: "rounded-none shadow-none",
            bordered: "rounded-lg border",
        },
        color: {
            default: "bg-content-2",
            secondary: "bg-card-secondary",
            destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
            outline: "bg-background hover:bg-accent hover:text-accent-foreground",
            ghost: "hover:bg-accent hover:text-accent-foreground",
            "ghost-secondary": "hover:bg-accent/40 hover:text-accent-foreground",
            link: "text-primary underline-offset-4 hover:underline",
        },
    },
    defaultVariants: {
        variant: "default",
        color: "default",
    },
})
  

const Card = React.forwardRef<
  HTMLDivElement | HTMLButtonElement,
  React.HTMLAttributes<HTMLDivElement | HTMLButtonElement> & {
    variant?: "default" | "flat" | "bordered";
    color?: "default" | "secondary" | "destructive" | "outline" | "ghost" | "ghost-secondary" | "link";
    pressable?: boolean;
    disabled?: boolean;
  }
>(({ className, variant, color, pressable, disabled, ...props }, ref) => {
    if (pressable) {

        return (<button
            ref={ref as React.RefObject<HTMLButtonElement>}
            disabled={disabled}
            className={cn(
                cardVariants({ variant, color }), 
                "transition-all hover:-translate-y-2 duration-200 hover:shadow-lg", 
                "disabled:opacity-50 disabled:cursor-not-allowed",
                "flex flex-col items-start justify-start text-left", // <- THIS IS KEY
                className)}
            {...props}
        />)
    }
    return (
        <div
            ref={ref as React.RefObject<HTMLDivElement>}
            className={cn(cardVariants({ variant, color }), className)}
            {...props}
        />
    )
})
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <>
        <div
            ref={ref}
            className={cn("flex flex-col space-y-1.5 p-4", className)}
            {...props}
        />
        <Separator />
    </>
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn("font-semibold text-xl leading-none text-secondary", className)}
        {...props}
    />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn("text-sm text-muted-foreground", className)}
        {...props}
    />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-4", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <>
        <Separator />
        <div
            ref={ref}
            className={cn("flex items-center p-4 gap-2", className)}
            {...props}
        />
    </>
))
CardFooter.displayName = "CardFooter"

const CardBody = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-4", className)} {...props} />
))
CardBody.displayName = "CardBody"

export {
    Card,
    CardHeader,
    CardFooter,
    CardTitle,
    CardDescription,
    CardContent,
    CardBody,
}
