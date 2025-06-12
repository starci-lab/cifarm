"use client"

import { useToast } from "@/hooks"
import {
    Toast,
    ToastClose,
    ToastDescription,
    ToastProvider,
    ToastTitle,
    ToastViewport,
} from "@/components/ui/toast"
import React from "react"
import { cn } from "@/lib/utils"
import { CheckCircle, XCircle } from "@phosphor-icons/react"

export function Toaster() {
    const { toasts } = useToast()
    // render icon based on color
    const renderIcon = (color: string | undefined) => {
        if (!color || color === "success") return <CheckCircle className="text-background" />
        if (color === "destructive") return <XCircle className="text-background" />
        return null
    }
    return (
        <ToastProvider>
            {toasts.map(({ id, title, color, description, ...props }) => {
                return (
                    <Toast key={id} {...props}>
                        <div className="flex items-stretch gap-2">
                            <div className={cn("grid place-items-center p-2", {
                                "bg-success": !color || color === "success",
                                "bg-warning": color === "warning",
                                "bg-destructive": color === "destructive",
                            })}>
                                {renderIcon(color)}
                            </div>
                            <div className="grid gap-1 p-2">
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
