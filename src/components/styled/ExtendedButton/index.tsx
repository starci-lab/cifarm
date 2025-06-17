"use client"

import { Button, ButtonProps } from "@/components"
import React, { useEffect, useRef } from "react"
import { Spinner } from "../Spinner"
import { cn } from "@/utils"

export interface ExtendedButtonProps extends ButtonProps {
  isLoading?: boolean;
  onTap?: () => void;
  onPress?: (pressTime: number) => void;
  pulseColor?: string;
  duration?: string;
  classNames?: {
    base?: string;
    container?: string;
  }
}

export const ExtendedButton = ({
    children,
    isLoading,
    onTap,
    onPress,
    pulseColor,
    disabled,
    variant = "solid",
    size = "default",
    duration = "1.5s",
    classNames = {
        base: "",
        container: "",
    },
    ...props
}: ExtendedButtonProps) => {
    const ref = useRef<HTMLButtonElement | null>(null)

    useEffect(() => {
        if (!onTap) return
    
        let hammer: HammerManager | null = null
        let isMounted = true
        const setup = async () => {
            const Hammer = (await import("hammerjs")).default
            if (!isMounted || !ref.current) return
            hammer = new Hammer(ref.current)
            hammer.on("tap", onTap)
        }
        setup()
        return () => {
            isMounted = false
            if (hammer) {
                hammer.off("tap")
                hammer.destroy()
            }
        }
    }, [onTap])

    const pressTime = useRef(0)
    useEffect(() => {
        if (!onPress) return
    
        let hammer: HammerManager | null = null
        let isMounted = true
    
        const setup = async () => {
            const Hammer = (await import("hammerjs")).default
            if (!isMounted || !ref.current) return
    
            hammer = new Hammer(ref.current)
            hammer.on("press", (event) => {
                pressTime.current = event.deltaTime
            })
            hammer.on("pressup", (event) => {
                onPress(event.deltaTime - pressTime.current)
            })
        }
    
        setup()
    
        return () => {
            isMounted = false
            if (hammer) {
                hammer.off("press")
                hammer.off("pressup")
                hammer.destroy()
            }
        }
    }, [onPress])
    

    return (
        <Button
            ref={ref}
            {...props}
            size={size}
            variant={variant}
            disabled={isLoading || disabled}
            className={cn(
                "relative",
                classNames.base,
                props.className)}
            style={{
                "--pulse-color": pulseColor,
                "--duration": duration,
            } as React.CSSProperties}
        >
            {
                variant === "icon" ? (
                    children
                ) : (
                    <div className={cn(
                        "relative z-10 flex items-center gap-2 w-full text-inherit justify-center",
                        classNames.container
                    )}>
                        {isLoading && <Spinner />}
                        {children}
                    </div>
                )
            }
            {
                pulseColor && (
                    <div className="absolute left-1/2 top-1/2 size-full -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-lg bg-inherit" />
                )
            }
        </Button>
    )
}
