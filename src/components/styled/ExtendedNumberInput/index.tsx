import React, { FC } from "react"
import { ExtendedInput, ExtendedInputProps } from "../ExtendedInput"
import { sanitizeNumericInput } from "@/modules/common"

export interface ExtendedNumberInputProps extends Omit<ExtendedInputProps, "onValueChange"> {
    onValueChange: (value: string) => void
}

export const ExtendedNumberInput: FC<ExtendedNumberInputProps> = (props) => {
    const onValueChange = (value: string) => {
        const sanitizeInput = sanitizeNumericInput(value)
        if (sanitizeInput != null) {
            if (props.onValueChange) {
                props.onValueChange(sanitizeInput)
            }
        }
    }

    return (
        <ExtendedInput
            {...props}
            onValueChange={onValueChange}
            placeholder="0"
        />
    )
}