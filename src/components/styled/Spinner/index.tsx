import { CircleNotch } from "@phosphor-icons/react"
import React, { FC } from "react"

export interface SpinnerProps {
    className?: string
}
export const Spinner: FC<SpinnerProps> = () => {
    return <CircleNotch />
}


