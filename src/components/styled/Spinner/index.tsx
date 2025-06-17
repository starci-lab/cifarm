import { CircleNotch } from "@phosphor-icons/react"
import React, { FC } from "react"
import { cn } from "@/utils"

export interface SpinnerProps {
    className?: string
}
export const Spinner: FC<SpinnerProps> = ({ className }) => {
    return <CircleNotch className={cn("animate-spin", className)} />
}


