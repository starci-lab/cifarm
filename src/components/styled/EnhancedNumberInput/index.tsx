import React, { FC } from "react"
import { EnhancedInput, EnhancedInputProps } from "../EnhancedInput"
import { sanitizeNumericInput } from "@/modules/common"

export interface EnhancedNumberInputProps extends Omit<EnhancedInputProps, "onValueChange"> {
    onValueChange: (value: string) => void
}

export const EnhancedNumberInput: FC<EnhancedNumberInputProps> = (props) => {
    const onValueChange = (value: string) => {
        const sanitizeInput = sanitizeNumericInput(value)
        if (sanitizeInput != null) {
            if (props.onValueChange) {
                props.onValueChange(sanitizeInput)
            }
        }
    }

    return (
        <EnhancedInput
            {...props}
            onValueChange={onValueChange}
            placeholder="0"
        />
    )
}