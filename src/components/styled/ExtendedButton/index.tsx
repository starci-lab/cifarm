import { Button, ButtonProps } from "@/components"
import React, { useEffect, useRef } from "react"
import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

export interface ExtendedButtonProps extends ButtonProps {
  isLoading?: boolean;
  onTap?: () => void;
  onPress?: (pressTime: number) => void;
}

export const ExtendedButton = ({
    children,
    isLoading,
    onTap,
    onPress,
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
            disabled={isLoading || props.disabled}
            className={cn("rounded-lg cursor", props.className)}
        >
            {isLoading && <Loader2 className="w-5 h-5 animate-spin" />}
            {children}
        </Button>
    )
}
