import React from "react"
import { Input } from "@/components/ui/input"
// import { sanitizeNumericInput } from "@/modules/common"

// export interface NumberInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
//     onChange: (value: string) => void
// }

export const NumberInput = (props) => {
    // const onChange = (value: string) => {
    //     const sanitizeInput = sanitizeNumericInput(value)
    //     if (sanitizeInput != null) {
    //         if (props.onChange) {
    //             props.onChange(sanitizeInput)
    //         }
    //     }
    // }

    return (
        <Input
            {...props}
            placeholder="0"
        />
    )
}