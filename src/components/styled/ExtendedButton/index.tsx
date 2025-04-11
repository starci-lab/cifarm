import { Button, ButtonProps } from "@/components"
import React, { useEffect, useRef } from "react"
import { Loader2 } from "lucide-react"
import Hammer from "hammerjs"

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
        if (!onTap) {
            return
        }
        const hammer = new Hammer(ref.current as HTMLElement)
        hammer.on("tap", () => {
            onTap?.()
        })
        return () => {
            hammer.destroy()
        }
    }, [onTap])

    const pressTime = useRef(0)
    
    useEffect(() => {
        if (!onPress) {
            return
        }
        const hammer = new Hammer(ref.current as HTMLElement)
        
        hammer.on("press", (event) => {
            pressTime.current = event.deltaTime
        })
        hammer.on("pressup", (event) => {
            onPress?.(event.deltaTime - pressTime.current)
        })
        return () => {
            hammer.destroy()
        }
    }, [onPress])

    return (
        <Button ref={ref} {...props} disabled={isLoading || props.disabled}>
            {isLoading && <Loader2 className="w-5 h-5 animate-spin" />}
            {children}
        </Button>
    )
}
