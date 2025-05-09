"use client"

import { Button } from "@/components"
import { ClipboardIcon } from "@heroicons/react/24/solid" // You can replace this with a ShadCN icon if needed
import React, { useState } from "react"

export interface CopyTextProps {
    text: string
    copyString: string
}

export const CopyText = ({ text, copyString }: CopyTextProps) => {
    const [copied, setCopied] = useState(false)

    const handleCopy = async () => {
        await navigator.clipboard.writeText(copyString)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <div className="flex items-center gap-2">
            <div className="text-sm">{text}</div>
            <div className="flex items-center gap-2">
                <Button variant="outline" onClick={handleCopy}>
                    {copied ? "Copied!" : "Copy"}
                </Button>
                <ClipboardIcon className="w-5 h-5 text-gray-500" />
            </div>
        </div>
    )
}