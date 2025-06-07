"use client"

import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { cn } from "@/lib/utils"
import { IconWrapper } from "../styled/IconWrapper"
import { CaretLeft, X } from "@phosphor-icons/react"
import { Separator } from "../ui"
import { useIsMobile } from "@/hooks"
const Dialog = DialogPrimitive.Root

const DialogTrigger = DialogPrimitive.Trigger

const DialogPortal = DialogPrimitive.Portal

const DialogClose = DialogPrimitive.Close

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
    <DialogPrimitive.Overlay
        ref={ref}
        className={cn(
            "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
            className
        )}
        {...props}
    />
))
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => {
    const isMobile = useIsMobile()
    return (
        <DialogPortal>
            <DialogOverlay />
            <DialogPrimitive.Content
                ref={ref}
                className={cn(
                    {
                        "rounded-b-none rounded-t-lg": isMobile,
                        "fixed z-50 bg-background shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out": isMobile,
                        "inset-x-0 bottom-0 border-t border-border data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom": isMobile,
                    },
                    // SM and up: center screen
                    { 
                        "fixed bottom-0 left-0 w-full rounded-t-lg p-0 z-50 border shadow-lg": !isMobile,
                        "data-[state=open]:animate-zoom-in-center data-[state=closed]:animate-zoom-out-center": !isMobile,
                        "top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] bottom-auto w-full max-w-[calc(100%-2rem)] rounded-lg origin-center": !isMobile,
                    },
                    // Style
                    "bg-content-4 grid",
                    className
                )}
                onOpenAutoFocus={(event) => event.preventDefault()}
                {...props}
            >
                {children}
            
            </DialogPrimitive.Content>
        </DialogPortal>
    )
})
DialogContent.displayName = DialogPrimitive.Content.displayName

const DialogHeader = ({
    className,
    children,
    hideCloseButton,    
    ...props
}: React.HTMLAttributes<HTMLDivElement> & {
    hideCloseButton?: boolean;
}) => (
    <div>
        <div
            className={cn(
                "flex items-center justify-between text-foreground px-4 py-3",
                className
            )}
            {...props}
        >
            {children}
            {!hideCloseButton && (
                <DialogClose
                    className="text-muted-foreground"
                >
                    <X />
                </DialogClose>
            )}
        </div>
        <Separator variant="secondary" />
    </div>
)

DialogHeader.displayName = "DialogHeader"

const DialogBody = ({
    className,
    children,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
    <div className={cn("p-4", className)} {...props}>
        {children}
    </div>
)
DialogBody.displayName = "DialogBody"
const DialogFooter = ({
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
    <div>
        <Separator variant="secondary" />
        <div
            className={cn("flex flex-col gap-2 sm:flex-row p-4", className)}
            {...props}
        />
    </div>
)

DialogFooter.displayName = "DialogFooter"

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title> & {
    showLeftChevron?: boolean;
    onLeftChevronClick?: () => void;
        }
        >(({ className, showLeftChevron, onLeftChevronClick, children, ...props }, ref) => (
            <DialogPrimitive.Title
                ref={ref}
                className={cn(
                    "text-xl font-bold leading-none tracking-tight",
                    showLeftChevron && "flex flex-row items-center gap-2",
                    className
                )}
                {...props}
            >
                {showLeftChevron && (
                    <IconWrapper
                        classNames={{
                            base: "text-muted-foreground",
                        }}
                    >
                        <CaretLeft onClick={onLeftChevronClick} />
                    </IconWrapper>
                )}
                {children}
            </DialogPrimitive.Title>
        ))
DialogTitle.displayName = DialogPrimitive.Title.displayName

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
    <DialogPrimitive.Description
        ref={ref}
        className={cn("text-sm text-muted-foreground", className)}
        {...props}
    />
))
DialogDescription.displayName = DialogPrimitive.Description.displayName

export {
    Dialog,
    DialogPortal,
    DialogOverlay,
    DialogTrigger,
    DialogClose,
    DialogContent,
    DialogHeader,
    DialogFooter,
    DialogTitle,
    DialogDescription,
    DialogBody,
}
