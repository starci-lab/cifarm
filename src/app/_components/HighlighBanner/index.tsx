import React from "react"

interface HighlightBannerProps {
    text: string
    icon?: React.ReactNode
}

export const HighlightBanner = ({ text, icon }: HighlightBannerProps) => (
    <div className="flex text-secondary items-center space-x-2 bg-content-2 w-fit px-3 py-1.5 rounded-full">
        <div>
            {text}
        </div>
        {icon}
    </div>
) 