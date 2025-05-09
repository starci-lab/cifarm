import { cn } from "@/lib/utils"
import { Loader2 } from "lucide-react"
import React, { FC } from "react"

export interface SpinnerProps {
    className?: string
}
export const Spinner: FC<SpinnerProps> = ({ className }) => {
    return <Loader2 className={cn("w-6 h-6 animate-spin", className)} />
}


