"use client"

import { useToast } from "@/components"
import {
    Toast,
    ToastClose,
    ToastDescription,
    ToastProvider,
    ToastTitle,
    ToastViewport,
} from "@/components/ui/toast"
import React from "react"
import { cn } from "@/utils"
import { CheckCircle, XCircle } from "@phosphor-icons/react"

export function Toaster() {
    const { toasts } = useToast()
    // render icon based on color
    const renderIcon = (variant: "default" | "destructive" | null | undefined) => {
        if (!variant || variant === "default") return <CheckCircle className="text-background" />
        if (variant === "destructive") return <XCircle className="text-background" />
        return null
    }
    return (
        <ToastProvider>
            {toasts.map(({ id, title, variant, description, ...props }) => {
                return (
                    <Toast key={id} {...props}>
                        <div className="flex items-stretch gap-2">
                            <div className={cn("grid place-items-center p-2", {
                                "bg-success": !variant || variant === "default",
                                "bg-destructive": variant === "destructive",
                            })}>
                                {renderIcon(variant)}
                            </div>
                            <div className="grid gap-1 p-2 items-center">
                                {title && <ToastTitle>{title}</ToastTitle>}
                                {description && (
                                    <ToastDescription>{description}</ToastDescription>
                                )}
                            </div>
                        </div>
                        <ToastClose />
                    </Toast>
                )
            })}
            <ToastViewport />
        </ToastProvider>
    )
}
