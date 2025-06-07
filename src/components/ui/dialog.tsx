"use client"

import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { cn } from "@/lib/utils"
import { IconWrapper } from "../styled/IconWrapper"
import { CaretLeft, X } from "@phosphor-icons/react"
import { Separator } from "../ui"
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
>(({ className, children, ...props }, ref) => (
    <DialogPortal>
        <DialogOverlay />
        <DialogPrimitive.Content
            ref={ref}
            className={cn(
                "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] rounded-lg border p-0 shadow-lg duration-200 sm:max-w-lg",
                "bg-content-4",
                className
            )}
            onOpenAutoFocus={(event) => event.preventDefault()}
            {...props}
        >
            {children}
            
        </DialogPrimitive.Content>
    </DialogPortal>
))
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
