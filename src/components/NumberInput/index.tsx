import React from "react"
import { Input, InputProps } from "@heroui/react"
import { sanitizeNumericInput } from "@/modules/common"

export type NumberInputProps = InputProps

export const NumberInput = (props: NumberInputProps) => {
    const onValueChange = (value: string) => {
        const sanitizeInput = sanitizeNumericInput(value)
        if (sanitizeInput != null) {
            if (props.onValueChange) {
                props.onValueChange(sanitizeInput)
            }
        }
    }

    return (
        <Input
            {...props}
            placeholder="0"
            onValueChange={onValueChange}
        />
    )
}