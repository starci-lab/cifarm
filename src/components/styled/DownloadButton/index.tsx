import { toast } from "@/components"
import React, { FC } from "react"
import { Button } from "@/components"
import { Download } from "@phosphor-icons/react"

export interface DownloadButtonProps {
  code: string;
  overrideIcon?: React.ReactNode;
  filename: string;
}

// method to copy text to clipboard, to allow mannual copy of the code
export const downloadText = (text: string, filename: string) => {
    const a = document.createElement("a")
    a.href = "data:text/plain;charset=utf-8," + encodeURIComponent(text)
    a.download = filename
    a.click()
    toast({
        title: "Downloaded",
    })
}

export const DownloadButton: FC<DownloadButtonProps> = ({
    code,
    overrideIcon,
    filename,
}) => {
    return (
        <Button
            variant="flat"
            size="icon"
            color="secondary"
            onClick={() => {
                downloadText(code, filename)
            }}
        >
            {overrideIcon || <Download />}
        </Button>
    )
}
