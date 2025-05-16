import { useToast } from "@/hooks"
import React, { FC } from "react"
import { Button } from "@/components"
import { Copy } from "@phosphor-icons/react"

export interface SnippetProps {
  code: string;
}

export const Snippet: FC<SnippetProps> = ({
    code,
}) => {
    const { toast } = useToast()

    return (
        <Button
            variant="flat"
            size="icon"
            color="secondary"
            onClick={async () => {
                await navigator.clipboard.writeText(code)
                toast({
                    title: "Copied to clipboard",
                })
            }}
        >
            <Copy />
        </Button>
    )
}
