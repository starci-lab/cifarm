import { toast } from "@/components"
import React, { FC } from "react"
import { Button } from "@/components"
import { Copy } from "@phosphor-icons/react"

export interface SnippetProps {
  code: string;
  overrideIcon?: React.ReactNode;
}

// method to copy text to clipboard, to allow mannual copy of the code
export const copyTextToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({
        title: "Copied to clipboard",
    })
}

export const Snippet: FC<SnippetProps> = ({
    code,
    overrideIcon,
}) => {
    return (
        <Button
            variant="flat"
            size="icon"
            color="secondary"
            onClick={() => {
                copyTextToClipboard(code)
            }}
        >
            {overrideIcon || <Copy />}
        </Button>
    )
}
