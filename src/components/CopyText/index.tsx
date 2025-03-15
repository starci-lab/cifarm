import { Snippet } from "@heroui/react"
import React from "react"
export interface CopyTextProps {
    text: string 
    copyString: string
}
export const CopyText = ({ text, copyString }: CopyTextProps) => {
    return (
        <div className="flex items-center gap-2">
            <div className="text-sm">{text}</div>
            <Snippet codeString={copyString} size="sm" hideSymbol classNames={{
                base: "gap-0 bg-inherit p-0",
            }}/>
        </div>
    )
}