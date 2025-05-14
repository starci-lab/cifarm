import { useToast } from "@/hooks"
import { cn } from "@/lib/utils"
import React, { FC } from "react"
import { Button } from "@/components"
import { Copy } from "@phosphor-icons/react";

export interface SnippetProps {
  code: string;
  classNames?: Partial<{
    copyIcon: string;
  }>;
}

export const Snippet: FC<SnippetProps> = ({
    code,
    classNames: { copyIcon } = {},
}) => {
    const { toast } = useToast()

    return (
        <Button
            variant="ghost-secondary"
            size="icon"
            className="min-w-9 min-h-9"
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
