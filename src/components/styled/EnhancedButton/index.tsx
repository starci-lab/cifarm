import { Button, ButtonProps } from "@/components"
import React from "react"
import { Loader2 } from "lucide-react"

interface EnhancedButtonProps extends ButtonProps {
  isLoading?: boolean;
}

export const EnhancedButton = ({
    children,
    isLoading,
    ...props
}: EnhancedButtonProps) => {
    return (
        <Button {...props} disabled={isLoading || props.disabled}>
            {isLoading && <Loader2 className="w-5 h-5 animate-spin" />}
            {children}
        </Button>
    )
}
